"""Assemble Larkspur-Product-Line-4."""
import os, shutil, zipfile, glob
B = os.path.dirname(os.path.abspath(__file__)); S = os.path.dirname(B)
OUT = os.path.join(S, 'Larkspur-Product-Line-4')
o = lambda *p: os.path.join(B, 'out', *p)
shutil.rmtree(OUT, ignore_errors=True)
POCKET = ['Quest', 'Today', 'Lists', 'Prayer', 'Gratitude', 'Notes']
guide = o('howto-pocket/START-HERE-How-to-print-your-pocket-books-A4.pdf')
P = [
    ('01 The Bible Study Planner', 'biblestudy', [o('biblestudy/Bible-Study-Planner-A4.pdf'), o('biblestudy/Bible-Study-Planner-Letter.pdf')], None, o('biblestudy/FREE-SAMPLE-Bible-Study-Planner.pdf')),
    ('02 The 2027 School Planner', 'school2027', [o('school2027/2027-School-Planner-A4.pdf'), o('school2027/2027-School-Planner-Letter.pdf')], None, o('school2027/FREE-SAMPLE-2027-School-Planner.pdf')),
    ('03 The Gentle 90 Guided Journal', 'journal90', [o('journal90/Gentle-90-Guided-Journal-A4.pdf'), o('journal90/Gentle-90-Guided-Journal-Letter.pdf')], None, o('journal90/FREE-SAMPLE-Gentle-90-Guided-Journal.pdf')),
    ('04 Pocket Quest (A6)', 'pocket-quest', [guide, o('pocket/Pocket-Quest-A6-pages.pdf'), o('pocket/Pocket-Quest-PRINT-AT-HOME-A4.pdf')], 'Pocket-Quest', None),
    ('05 The Pocket Book Collection (A6)', 'pocket-set', [guide] + [o(f'pocket/Pocket-{k}-{v}.pdf') for k in POCKET for v in ('A6-pages', 'PRINT-AT-HOME-A4')], 'Pocket-Book-Collection', None),
]
for folder, slug, files, zname, sample in P:
    d = os.path.join(OUT, folder); os.makedirs(d)
    for f in files: assert os.path.exists(f), f
    if zname:
        with zipfile.ZipFile(os.path.join(d, f'UPLOAD-TO-ETSY-{zname}.zip'), 'w', zipfile.ZIP_DEFLATED) as z:
            for f in files: z.write(f, os.path.join(zname, os.path.basename(f)))
        cust = os.path.join(d, 'Customer files'); os.makedirs(cust)
        for f in files: shutil.copy2(f, cust)
    else:
        for f in files: shutil.copy2(f, d)
    for sub, pat in [('Etsy listing images', 'etsy-*.jpg'), ('Pinterest pins', 'pin-*.jpg')]:
        os.makedirs(os.path.join(d, sub))
        for f in sorted(glob.glob(o(slug, 'marketing', pat))): shutil.copy2(f, os.path.join(d, sub))
    if sample: shutil.copy2(sample, d)
    print(folder, len(files), 'files')
