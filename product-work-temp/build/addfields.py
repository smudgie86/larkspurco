"""Add fillable form fields to a rendered PDF.
Usage: python3 addfields.py in.pdf fields.json out.pdf
fields.json: [{"p": pageIndex, "t": "text"|"multi"|"check", "x":, "y":, "w":, "h":, "pw":, "ph":}] in CSS px (96dpi), page-relative.
"""
import json, sys
from pypdf import PdfReader, PdfWriter
from pypdf.generic import (ArrayObject, BooleanObject, DictionaryObject, FloatObject, NameObject,
                           NumberObject, TextStringObject, DecodedStreamObject)

src, fj, dst = sys.argv[1:4]
fields = json.load(open(fj))
r = PdfReader(src)
w = PdfWriter(clone_from=r)

PX = 0.75  # css px -> pt
ink = '0.23 0.21 0.18 rg'

helv = DictionaryObject({NameObject('/Type'): NameObject('/Font'), NameObject('/Subtype'): NameObject('/Type1'),
                         NameObject('/BaseFont'): NameObject('/Helvetica'), NameObject('/Encoding'): NameObject('/WinAnsiEncoding')})
zadb = DictionaryObject({NameObject('/Type'): NameObject('/Font'), NameObject('/Subtype'): NameObject('/Type1'),
                         NameObject('/BaseFont'): NameObject('/ZapfDingbats')})
helv_ref = w._add_object(helv)
zadb_ref = w._add_object(zadb)
fonts = DictionaryObject({NameObject('/Helv'): helv_ref, NameObject('/ZaDb'): zadb_ref})


def stream(content, bbox):
    s = DecodedStreamObject()
    s.set_data(content.encode('latin-1'))
    s.update({NameObject('/Type'): NameObject('/XObject'), NameObject('/Subtype'): NameObject('/Form'),
              NameObject('/BBox'): ArrayObject([FloatObject(0), FloatObject(0), FloatObject(bbox[0]), FloatObject(bbox[1])]),
              NameObject('/Resources'): DictionaryObject({NameObject('/Font'): fonts})})
    return w._add_object(s)


all_refs = ArrayObject()
for i, f in enumerate(fields):
    page = w.pages[f['p']]
    ph_pt = float(page.mediabox.height)
    x1 = f['x'] * PX
    y2 = ph_pt - f['y'] * PX
    x2 = x1 + f['w'] * PX
    y1 = y2 - f['h'] * PX
    d = DictionaryObject()
    d.update({NameObject('/Type'): NameObject('/Annot'), NameObject('/Subtype'): NameObject('/Widget'),
              NameObject('/Rect'): ArrayObject([FloatObject(x1), FloatObject(y1), FloatObject(x2), FloatObject(y2)]),
              NameObject('/F'): NumberObject(4), NameObject('/T'): TextStringObject(f"p{f['p'] + 1}_{i}"),
              NameObject('/P'): page.indirect_reference})
    if f['t'] == 'check':
        sz = (x2 - x1, y2 - y1)
        on = stream(f"q {ink} BT /ZaDb {sz[1] * 0.8:.2f} Tf {sz[0] * 0.12:.2f} {sz[1] * 0.2:.2f} Td (4) Tj ET Q", sz)
        off = stream('', sz)
        d.update({NameObject('/FT'): NameObject('/Btn'), NameObject('/V'): NameObject('/Off'), NameObject('/AS'): NameObject('/Off'),
                  NameObject('/DA'): TextStringObject(f'/ZaDb 0 Tf {ink}'),
                  NameObject('/MK'): DictionaryObject({NameObject('/CA'): TextStringObject('4')}),
                  NameObject('/AP'): DictionaryObject({NameObject('/N'): DictionaryObject({NameObject('/Yes'): on, NameObject('/Off'): off})})})
    else:
        d.update({NameObject('/FT'): NameObject('/Tx'), NameObject('/DA'): TextStringObject(f"/Helv 9 Tf {ink}")})
        if f['t'] == 'multi':
            d[NameObject('/Ff')] = NumberObject(4096)
    ref = w._add_object(d)
    if '/Annots' not in page:
        page[NameObject('/Annots')] = ArrayObject()
    page['/Annots'].append(ref)
    all_refs.append(ref)

w._root_object[NameObject('/AcroForm')] = DictionaryObject({
    NameObject('/Fields'): all_refs, NameObject('/NeedAppearances'): BooleanObject(True),
    NameObject('/DR'): DictionaryObject({NameObject('/Font'): fonts}), NameObject('/DA'): TextStringObject(f'/Helv 9 Tf {ink}')})
w.write(dst)
print('fields', len(all_refs))
