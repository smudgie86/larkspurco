"""Impose a 32-page (multiple of 8) A6 PDF onto A4 for print-at-home saddle-stitched booklets.
Print double-sided (flip on long edge), cut each A4 in half, stack, fold, staple.
Usage: python3 -I impose.py in-A6.pdf out-A4.pdf"""
import sys, io
from pypdf import PdfReader, PdfWriter, Transformation, PageObject
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm

src, dst = sys.argv[1:3]
r = PdfReader(src)
n = len(r.pages)
assert n % 8 == 0, n
A4W, A4H = 595.28, 841.89
CW, CH = A4W / 2, A4H / 2                      # one A6 cell
pw, ph = float(r.pages[0].mediabox.width), float(r.pages[0].mediabox.height)
S = 0.95


def marks(label):
    b = io.BytesIO()
    c = canvas.Canvas(b, pagesize=(A4W, A4H))
    c.setStrokeColorRGB(.6, .6, .6)
    c.setLineWidth(.4)
    for x0, x1 in ((0, 4 * mm), (A4W - 4 * mm, A4W)):
        c.line(x0, CH, x1, CH)
    c.setFillColorRGB(.55, .55, .55)
    c.setFont('Helvetica', 5)
    c.drawCentredString(A4W / 2, CH - 7, label)  # sits in the white gap at the fold line area between halves
    c.save()
    b.seek(0)
    return PdfReader(b).pages[0]


def place(page, idx, col, row):
    """col 0/1 = left/right, row 0/1 = top/bottom half."""
    src_p = r.pages[idx - 1]
    tx = col * CW + (CW - pw * S) / 2
    ty = (1 - row) * CH + (CH - ph * S) / 2
    page.merge_transformed_page(src_p, Transformation().scale(S, S).translate(tx, ty))


w = PdfWriter()
sheets = n // 4
for j in range(sheets // 2):
    front = PageObject.create_blank_page(width=A4W, height=A4H)
    back = PageObject.create_blank_page(width=A4W, height=A4H)
    for row, k in enumerate((2 * j, 2 * j + 1)):
        place(front, n - 2 * k, 0, row)
        place(front, 2 * k + 1, 1, row)
        place(back, 2 * k + 2, 0, row)
        place(back, n - 2 * k - 1, 1, row)
    front.merge_page(marks(f'cut here · sheet {j + 1} of {sheets // 2}'))
    back.merge_page(marks(''))
    w.add_page(front)
    w.add_page(back)
w.write(dst)
print('imposed', n, 'pages onto', len(w.pages), 'A4 sides')
