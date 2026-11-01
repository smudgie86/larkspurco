"""Make a 'showcase' PDF (one preview image per page) for products that aren't a single PDF.
Usage: python3 -I showcase.py out.pdf ITEM [ITEM ...]
ITEM: path.pdf@N  (page N)  |  path.pdf@"some text" (first page containing text)  |  image.png
Optional suffix ~crop trims surrounding white space. Pages are white-backed images."""
import sys, os, subprocess, tempfile, re
from PIL import Image, ImageChops

out = sys.argv[1]
items = sys.argv[2:]
tmp = tempfile.mkdtemp()
imgs = []


def find_page(pdf, text):
    n = int(re.search(r'Pages:\s+(\d+)', subprocess.run(['pdfinfo', pdf], capture_output=True, text=True).stdout).group(1))
    for i in range(1, n + 1):
        t = subprocess.run(['pdftotext', '-f', str(i), '-l', str(i), pdf, '-'], capture_output=True, text=True).stdout
        if text in t:
            return i
    raise SystemExit(f'text not found: {text} in {pdf}')


def trim(im, pad=40):
    bg = Image.new(im.mode, im.size, (255, 255, 255))
    box = ImageChops.difference(im, bg).getbbox()
    if box:
        im = im.crop(box)
    w, h = im.size
    o = Image.new('RGB', (w + 2 * pad, h + 2 * pad), (255, 255, 255))
    o.paste(im, (pad, pad))
    return o


for k, it in enumerate(items):
    crop = it.endswith('~crop')
    it = it[:-5] if crop else it
    if '.pdf@' in it:
        pdf, sel = it.split('.pdf@')
        pdf += '.pdf'
        n = int(sel) if sel.isdigit() else find_page(pdf, sel)
        base = os.path.join(tmp, f'p{k}')
        subprocess.run(['pdftoppm', '-r', os.environ.get('SHOWCASE_DPI', '150'), '-png', '-singlefile', '-f', str(n), '-l', str(n), pdf, base], check=True)
        im = Image.open(base + '.png').convert('RGB')
    else:
        im = Image.open(it).convert('RGB')
    if crop:
        im = trim(im)
    w, h = im.size
    if w > 1800:
        im = im.resize((1800, int(h * 1800 / w)), Image.LANCZOS)
    imgs.append(im)
imgs[0].save(out, save_all=True, append_images=imgs[1:], resolution=170)
print('showcase pages:', len(imgs))
