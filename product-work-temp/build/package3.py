"""Assemble Larkspur-Product-Line-3: customer files, upload zips, listing images, pins and free samples."""
import os, shutil, zipfile, glob

B = os.path.dirname(os.path.abspath(__file__))
S = os.path.dirname(B)
OUT = os.path.join(S, 'Larkspur-Product-Line-3')
P1, P2 = os.path.join(S, 'Larkspur-Product-Line'), os.path.join(S, 'Larkspur-Product-Line-2')
o = lambda *p: os.path.join(B, 'out', *p)
shutil.rmtree(OUT, ignore_errors=True)


def both(folder, pre):
    return [os.path.join(folder, f'{pre}-A4.pdf'), os.path.join(folder, f'{pre}-Letter.pdf')]


SH = {'money': [o('sheets/money/ADHD Money Dashboard.xlsx'), o('sheets/money/ADHD Money Dashboard - EXAMPLE.xlsx')],
      'books': [o('sheets/bookkeeping/UK Sole Trader Bookkeeping.xlsx'), o('sheets/bookkeeping/UK Sole Trader Bookkeeping - EXAMPLE.xlsx')],
      'etsy': [o('sheets/etsy/Etsy Seller Profit & Inventory.xlsx'), o('sheets/etsy/Etsy Seller Profit & Inventory - EXAMPLE.xlsx')]}

# (folder name, marketing slug, zip name, {path in zip: [files]}, free sample)
PRODUCTS = [
    ('01 The Just in Case Binder', 'legacy', 'Just-in-Case-Binder',
     {'': both(o('legacy'), 'Just-in-Case-Binder') + [o('legacy/xlsx/Life Admin Register.xlsx'), o('legacy/xlsx/Life Admin Register - EXAMPLE.xlsx')]},
     o('legacy/FREE-SAMPLE-Just-in-Case-Binder.pdf')),
    ('02 When Someone Dies - UK Guide and Templates', 'bereavement', 'When-Someone-Dies-UK',
     {'': both(o('bereavement'), 'When-Someone-Dies-UK-Guide') + [o('howto-ofs/START-HERE-How-to-edit-and-print-A4.pdf')],
      'Editable templates (Word)': sorted(glob.glob(o('bereavement/word/*.docx')))},
     o('bereavement/FREE-SAMPLE-When-Someone-Dies-UK-Guide.pdf')),
    ('03 The Wedding Mega Bundle', 'wedding-bundle', 'Wedding-Mega-Bundle',
     {'': [o('howto-wedding/START-HERE-How-to-edit-and-print-A4.pdf')],
      'The Calm Wedding Planner': both(os.path.join(P2, '20 The Calm Wedding Planner'), 'Calm-Wedding-Planner'),
      'Budget and Guest Manager (spreadsheet)': [o('wedding-bundle/xlsx/Wedding Budget & Guest Manager.xlsx'), o('wedding-bundle/xlsx/Wedding Budget & Guest Manager - EXAMPLE.xlsx')],
      'Editable stationery (PowerPoint)': sorted(glob.glob(o('wedding-bundle/pptx/*.pptx')))}, None),
    ('04 The ADHD Money Dashboard (spreadsheet)', 'sheet-money', 'ADHD-Money-Dashboard', {'': SH['money']}, None),
    ('05 UK Sole Trader Bookkeeping (spreadsheet)', 'sheet-books', 'UK-Sole-Trader-Bookkeeping', {'': SH['books']}, None),
    ('06 Etsy Seller Profit and Inventory (spreadsheet)', 'sheet-etsy', 'Etsy-Seller-Profit-Inventory', {'': SH['etsy']}, None),
    ('07 BUNDLE - The Busy Brain Collection', 'bundle-busy', 'Busy-Brain-Collection',
     {'': [o('bundle-busy/START-HERE-Busy-Brain-Collection-A4.pdf')],
      '1 28-Day Task Paralysis Reset': both(os.path.join(P1, '2 28-Day Task Paralysis Reset'), '28-Day-Task-Paralysis-Reset'),
      '2 30-Day ADHD Money Reset': both(os.path.join(P1, '4 30-Day ADHD Money Reset'), '30-Day-ADHD-Money-Reset'),
      '3 Low-Spoon Kitchen': both(os.path.join(P1, '3 Low-Spoon Kitchen'), 'Low-Spoon-Kitchen'),
      '4 ADHD Christmas Survival Guide': both(os.path.join(P1, '1 ADHD Christmas Survival Guide'), 'ADHD-Christmas-Survival-Guide'),
      '5 2027 Gentle Planner': both(os.path.join(P2, '04 The 2027 Gentle Planner'), '2027-Gentle-Planner-Monday-Start') + both(os.path.join(P2, '04 The 2027 Gentle Planner'), '2027-Gentle-Planner-Sunday-Start'),
      '6 Kids Visual Routine Charts': both(os.path.join(P2, "17 Kids' Visual Routine Charts"), 'Kids-Visual-Routine-Charts'),
      '7 ADHD-Friendly Revision Planner': both(os.path.join(P2, '18 The ADHD-Friendly Revision Planner'), 'ADHD-Friendly-Revision-Planner'),
      '8 BONUS ADHD Money Dashboard (spreadsheet)': SH['money']}, None),
    ('08 BUNDLE - The Small Business Vault', 'bundle-biz', 'Small-Business-Vault',
     {'': [o('bundle-biz/START-HERE-Small-Business-Vault-A4.pdf')],
      '1 ADHD Small Business Planner': both(os.path.join(P2, '11 The ADHD Small Business Planner'), 'ADHD-Small-Business-Planner'),
      '2 30-Day Side Hustle Starter': both(os.path.join(P2, '16 The 30-Day Side Hustle Starter'), '30-Day-Side-Hustle-Starter'),
      '3 Etsy and Handmade Seller Planner': both(os.path.join(P2, '12 The Etsy & Handmade Seller Planner'), 'Etsy-Handmade-Seller-Planner'),
      '4 Craft Fair and Market Stall Planner': both(os.path.join(P2, '13 The Craft Fair & Market Stall Planner'), 'Craft-Fair-Market-Stall-Planner'),
      '5 Social Media and Pinterest Content Planner': both(os.path.join(P2, '15 The Social Media & Pinterest Content Planner'), 'Social-Media-Pinterest-Content-Planner'),
      '6 UK Small Business Bookkeeping Kit': both(os.path.join(P2, '14 The UK Small Business Bookkeeping Kit'), 'UK-Small-Business-Bookkeeping-Kit'),
      '7 Pet Sitter and Dog Walker Business Kit': both(os.path.join(P2, '10 The Pet Sitter & Dog Walker Business Kit'), 'Pet-Sitter-Dog-Walker-Business-Kit'),
      '8 SPREADSHEET UK Sole Trader Bookkeeping': SH['books'],
      '9 SPREADSHEET Etsy Seller Profit and Inventory': SH['etsy']}, None),
    ('09 BUNDLE - The Puzzle Vault', 'bundle-puzzles', 'Puzzle-Vault',
     {'': [o('bundle-puzzles/START-HERE-Puzzle-Vault-A4.pdf')],
      '1 Super Bumper Christmas': both(os.path.join(P2, '01 Super Bumper Large Print Christmas Puzzle Pack'), 'Super-Bumper-Large-Print-Christmas-Puzzle-Pack'),
      '2 Super Bumper Scotland': both(os.path.join(P2, '02 Super Bumper Large Print Scotland Puzzle Pack'), 'Super-Bumper-Large-Print-Scotland-Puzzle-Pack'),
      '3 Super Bumper Days Gone By': both(os.path.join(P2, '03 Super Bumper Large Print Puzzle Pack- Days Gone By'), 'Super-Bumper-Large-Print-Nostalgia-Puzzle-Pack'),
      '4 Christmas and Winter': both(os.path.join(P1, '5 Large Print Christmas Puzzle Pack'), 'Large-Print-Christmas-Winter-Puzzle-Pack'),
      '5 Scotland': both(os.path.join(P1, '6 Large Print Scotland Puzzle Pack'), 'Large-Print-Scotland-Puzzle-Pack')}, None),
    ('10 BUNDLE - The Pet Parent Bundle', 'bundle-pets', 'Pet-Parent-Bundle',
     {'': [o('bundle-pets/START-HERE-Pet-Parent-Bundle-A4.pdf')],
      '1 28-Day Puppy Plan': both(os.path.join(P2, '06 The 28-Day Puppy Plan'), '28-Day-Puppy-Plan'),
      '2 Rescue Dog Settling-In Guide': both(os.path.join(P2, '09 The Rescue Dog Settling-In Guide'), 'Rescue-Dog-Settling-In-Guide'),
      '3 Dog Care and Health Planner': both(os.path.join(P2, '07 The Dog Care & Health Planner'), 'Dog-Care-and-Health-Planner'),
      '4 Cat Care and Health Planner': both(os.path.join(P2, '08 The Cat Care & Health Planner'), 'Cat-Care-and-Health-Planner')}, None),
]

report = []
for folder, slug, zname, files, sample in PRODUCTS:
    d = os.path.join(OUT, folder)
    cust = os.path.join(d, 'Customer files')
    os.makedirs(cust)
    zpath = os.path.join(d, f'UPLOAD-TO-ETSY-{zname}.zip')
    n = 0
    with zipfile.ZipFile(zpath, 'w', zipfile.ZIP_DEFLATED) as z:
        for sub, lst in files.items():
            for f in lst:
                assert os.path.exists(f), f
                arc = os.path.join(zname, sub, os.path.basename(f)) if sub else os.path.join(zname, os.path.basename(f))
                z.write(f, arc)
                dst = os.path.join(cust, sub) if sub else cust
                os.makedirs(dst, exist_ok=True)
                shutil.copy2(f, dst)
                n += 1
    mk = o(slug, 'marketing')
    for sub, pat in [('Etsy listing images', 'etsy-*.jpg'), ('Pinterest pins', 'pin-*.jpg')]:
        os.makedirs(os.path.join(d, sub))
        for f in sorted(glob.glob(os.path.join(mk, pat))):
            shutil.copy2(f, os.path.join(d, sub))
    if sample:
        shutil.copy2(sample, d)
    mb = os.path.getsize(zpath) / 1048576
    report.append(f'{folder}: {n} files, zip {mb:.1f}MB, images {len(glob.glob(os.path.join(mk, "etsy-*.jpg")))}')
    assert mb < 20, 'zip over Etsy 20MB limit'
print('\n'.join(report))
