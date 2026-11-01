"""Turn Chromium's named-destination links into direct page links (better GoodNotes support)."""
import sys, pypdf
from pypdf.generic import ArrayObject, NameObject, NullObject, NumberObject
f = sys.argv[1]
r = pypdf.PdfReader(f)
w = pypdf.PdfWriter(clone_from=r)
names = {k: v for k, v in r.named_destinations.items()}
pages = {id(p.indirect_reference): i for i, p in enumerate(r.pages)}
idx = {}
for name, d in names.items():
    pn = r.get_destination_page_number(d)
    idx[name.lstrip('/')] = pn
n = 0
for page in w.pages:
    for a in page.get('/Annots') or []:
        o = a.get_object()
        d = o.get('/Dest')
        if d is not None and not isinstance(d, ArrayObject):
            key = str(d).lstrip('/')
            if key in idx:
                o[NameObject('/Dest')] = ArrayObject([w.pages[idx[key]].indirect_reference, NameObject('/Fit')])
                n += 1
w.write(f)
print('links fixed', n)
