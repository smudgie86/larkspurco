# Usage: python3 sheets.py <pdf> <outprefix> [cols] [rows]
import sys, subprocess, glob, os, tempfile
from PIL import Image
pdf, out = sys.argv[1], sys.argv[2]
cols = int(sys.argv[3]) if len(sys.argv) > 3 else 4
rows = int(sys.argv[4]) if len(sys.argv) > 4 else 3
d = tempfile.mkdtemp()
subprocess.run(['pdftoppm', '-r', '55', '-png', pdf, f'{d}/p'], check=True)
files = sorted(glob.glob(f'{d}/p-*.png'))
ims = [Image.open(f) for f in files]
w, h = ims[0].size
per = cols * rows
for s in range(0, len(ims), per):
    sheet = Image.new('RGB', (cols * w + (cols + 1) * 8, rows * h + (rows + 1) * 8), (120, 120, 120))
    for i, im in enumerate(ims[s:s + per]):
        sheet.paste(im, (8 + (i % cols) * (w + 8), 8 + (i // cols) * (h + 8)))
    sheet.save(f'{out}-{s // per + 1}.png')
print(len(ims), 'pages ->', (len(ims) + per - 1) // per, 'sheets')
