"""Listing & social tracker for the Etsy lead. Usage: python3 handoff_tracker.py out.xlsx"""
import sys, re, datetime as dt
from openpyxl.styles import Alignment
from xl import *
from handoff_data import collect

rows = collect()
by = {r['slug']: r for r in rows}
clean = lambda s: re.sub(r'<br>', ' ', s.replace('&amp;', '&')).strip()

# ---------- social copy ----------
FMT = {'Spreadsheets': 'Excel + Google Sheets', 'Bundles': 'instant download bundle', 'Pocket books': 'A6 pocket book to print, fold and staple at home'}


def hashtags(r):
    tags = [t.strip() for t in r['tags'].split(',')]
    hs = ['#' + re.sub(r'[^a-z0-9]', '', t.lower()) for t in tags[:6]]
    return ' '.join(hs + ['#larkspurco', '#etsyuk'])


def caption(r):
    f = r['feat']
    feats = '\n'.join(f'• {clean(h)}: {clean(t)}' for h, t in f['features'][:3])
    fmt = FMT.get(r['section'], 'printable PDF, A4 + US Letter')
    if r['slug'] == 'digital2027':
        fmt = 'digital planner for GoodNotes and other PDF apps'
    if r['slug'] in ('legacy', 'bereavement', 'wedding-bundle'):
        fmt = {'legacy': 'printable + fillable PDF and spreadsheet', 'bereavement': 'printable + fillable PDF and editable Word templates',
               'wedding-bundle': 'planner, spreadsheet and editable stationery'}[r['slug']]
    if r['slug'] == 'bereavement':
        return (f"{clean(f['sub'])}\n\nA calm, practical guide for the weeks after someone dies, written for England & Wales, Scotland and Northern Ireland, "
                "with space to keep track of every call, form and reference number.\n\nIf it would help you or someone you know, you'll find it in our Etsy shop (link in bio).\n\n#bereavementsupport #griefsupport #larkspurco")
    return f"{clean(f['sub'])}\n\n{feats}\n\nInstant download ({fmt}). Find it in our Etsy shop: link in bio.\n\n{hashtags(r)}"


def reel(r):
    if r['section'] == 'Spreadsheets':
        return 'Screen recording (10–15s): type one entry, then cut to the dashboard updating. On-screen text: "' + r['pins'][0][0] + '"'
    if r['slug'] == 'bereavement':
        return 'No Reel or TikTok. Pinterest only (informational pins).'
    if r['section'] == 'Bundles':
        return 'Covers fanning out one by one, ending on the "What\'s inside" page. On-screen text: "' + r['pins'][0][0] + '"'
    return 'Flip-through (8–12s): cover, then 4–5 inside pages. On-screen text: "' + r['pins'][0][0] + '". End card: "Instant download · Larkspur & Co. on Etsy"'


# ---------- calendar ----------
START = dt.date(2026, 11, 2)
WEEKS = [
    ('Christmas calm & puzzles', ['christmas', 'puzzles-christmas', 'bumper-xmas', 'bundle-puzzles']),
    ('Plan 2027 gently', ['planner2027', 'digital2027', 'bundle-busy', 'pocket-quest']),
    ('Scotland & market season', ['puzzles-scotland', 'bumper-scot', 'craftfair', 'petbiz']),
    ('Black Friday sale & stocking fillers', ['pocket-set', 'legacy', 'bundle-puzzles', 'bundle-busy']),
    ('Small business year-end', ['adhdbiz', 'sidehustle', 'etsyseller', 'sheet-etsy', 'content', 'bundle-biz', 'bereavement']),
    ('Engagement season', ['wedding', 'wedding-bundle', 'bumper-every']),
    ('A calmer Christmas week', ['christmas', 'kitchen', 'journal90', 'paralysis', 'bereavement']),
    ('New year money', ['money', 'sheet-money']),
    ('New Year reset', ['biblestudy', 'journal90', 'paralysis', 'money', 'sheet-money', 'planner2027', 'bundle-busy', 'bereavement']),
    ('Self Assessment month', ['bookkeeping', 'sheet-books', 'bundle-biz', 'moving']),
    ('New dogs & cats', ['puppy', 'rescue', 'dogcare', 'catcare', 'bundle-pets']),
    ('Back to school, revision & Burns Night', ['school2027', 'revision', 'kidsroutine', 'puzzles-scotland', 'bumper-scot']),
]
cal = []
pin_next = {}
pin_last = {}
for wi, (theme, slugs) in enumerate(WEEKS):
    wk = START + dt.timedelta(weeks=wi)
    for j, s in enumerate(slugs):
        r = by[s]
        # Pinterest: next unused pin, at least a week after the last pin to the same listing
        k = pin_next.get(s, 0)
        if k < len(r['pinimgs']) and (s not in pin_last or (wk - pin_last[s]).days >= 7):
            t, d = r['pins'][k]
            cal.append([wk, theme, 'Pinterest', r['name'], f"{r['zip']} › {r['folder']} › Pinterest pins › {r['pinimgs'][k]}", f'{t}\n{d}'])
            pin_next[s], pin_last[s] = k + 1, wk
        if s == 'bereavement':
            continue
        if j < 3:
            cal.append([wk, theme, 'Instagram + Facebook', r['name'], f"{r['zip']} › {r['folder']} › Etsy listing images (carousel: etsy-1 to etsy-5)", caption(r)])
        if j == 0 or (j == 1 and len(slugs) > 3):
            cal.append([wk, theme, 'TikTok / Reels', r['name'], 'Film from the PDF pages or spreadsheet (see idea)', reel(r)])
# remaining pins for anything with pins left: schedule two and four weeks later
extra = []
for s, k in pin_next.items():
    r = by[s]
    wk = pin_last[s]
    while k < len(r['pinimgs']):
        wk = wk + dt.timedelta(weeks=2)
        t, d = r['pins'][k]
        extra.append([wk, 'Evergreen Pinterest', 'Pinterest', r['name'], f"{r['zip']} › {r['folder']} › Pinterest pins › {r['pinimgs'][k]}", f'{t}\n{d}'])
        k += 1
cal = sorted(cal + extra, key=lambda x: (x[0], ['Pinterest', 'Instagram + Facebook', 'TikTok / Reels'].index(x[2])))
assert {by[s]['name'] for w in WEEKS for s in w[1]} == {r['name'] for r in rows}, 'every listing must appear in the calendar'

# ---------- workbook ----------
wb = new_wb()
start_here(wb, 'Etsy & Social Tracker',
           f'Everything needed to list {len(rows)} products on Etsy and promote them on Pinterest, Instagram, Facebook and TikTok. '
           'Read the handoff brief first, then work through the Listings tab wave by wave.',
           [('Listings', 'One row per Etsy listing: title, tags, description, price, files to upload, images and shop section. Copy each cell straight into Etsy. Update the Status column as you go.'),
            ('Social calendar', '12 weeks of posts from 2 November 2026: which asset, which platform and the copy. Mark each one Scheduled or Posted.'),
            ('Social copy', 'A ready caption, Reel idea and all Pinterest pin titles for every product, if you want to post outside the calendar.'),
            ('Shop setup', 'One-off jobs: shop sections, discount code, announcement and so on.'),
            ('Owner decisions', 'What the owner has decided (discount codes, AI box, prices, Black Friday, free samples). Add new questions at the bottom.')],
           extra=[('Where the files are', ['Every file path starts with one of four zips: Larkspur-Product-Line.zip (6 products), Larkspur-Product-Line-2.zip (20 products), Larkspur-Product-Line-3.zip (10 products) and Larkspur-Product-Line-4.zip (5 products). Inside each, every product has its own folder with "Etsy listing images" and "Pinterest pins".'])])

L_ = sheet(wb, 'Listings', tab=CLAY, widths=[3, 5, 6, 14, 28, 8, 18, 46, 6, 46, 70, 40, 24, 26, 36, 34, 14, 24, 30])
title(L_, 'Etsy listings', 'Work through Wave 1, then 2, then 3. Title length is checked automatically (Etsy limit 140).')
H = ['#', 'Wave', 'List by', 'Product', 'Price', 'Shop section', 'Etsy title', 'Chars', '13 tags (paste as-is)', 'Description (paste as-is)', 'Digital files to upload', 'Listing photos (in this order)', 'Free sample', 'Folder', 'Suggested category', 'Status', 'Etsy listing URL', 'Notes']
header(L_, 5, H, col=2, height=34)
srt = sorted(rows, key=lambda r: (r['wave'], r['n']))
for i, r in enumerate(srt):
    rr = 6 + i
    vals = [r['n'], r['wave'], r['due'], r['name'], r['price'], r['section'], r['title'], f'=LEN(H{rr})', r['tags'], r['desc'],
            '\n'.join(r['files']), '\n'.join(r['images']), r['sample'] or '–', f"{r['zip']} › {r['folder']}", r['category'], 'To do', '', '']
    for j, v in enumerate(vals):
        c = L_.cell(row=rr, column=2 + j, value=v)
        c.font = font(9)
        c.alignment = Alignment(wrap_text=True, vertical='top')
        c.border = BOTTOM
        if (i % 2):
            c.fill = fill(CREAM)
    L_.row_dimensions[rr].height = 90
calc_style(L_, 6, 5 + len(srt), [9], '0')
dropdown(L_, f'Q6:Q{5 + len(srt)}', ['To do', 'In progress', 'Draft: ready for owner', 'Live', 'Needs owner'])
highlight(L_, f'Q6:Q{5 + len(srt)}', '$Q6="Live"', SAGE_LIGHT)
highlight(L_, f'Q6:Q{5 + len(srt)}', '$Q6="Needs owner"', 'F5D0C5')
highlight(L_, f'I6:I{5 + len(srt)}', '$I6>140', 'F5D0C5')
L_.freeze_panes = 'F6'
L_.auto_filter.ref = f'B5:S{5 + len(srt)}'
r = 7 + len(srt)
note(L_, r, 2, '="Live: "&COUNTIF(Q6:Q' + str(5 + len(srt)) + ',"Live")&" of ' + str(len(srt)) + ' listings"', 11, SAGE_DEEP, True, merge_to=6)

C_ = sheet(wb, 'Social calendar', tab=SAGE, widths=[3, 13, 26, 18, 30, 48, 70, 13, 30])
title(C_, 'Social calendar · from 2 Nov 2026', '12 themed weeks to 24 Jan, then evergreen pins into February. Link every pin to its Etsy listing.')
header(C_, 5, ['Week of', 'Theme', 'Platform', 'Product', 'Asset (zip › folder › file)', 'Copy', 'Status', 'Notes'], col=2, height=28)
for i, row in enumerate(cal):
    rr = 6 + i
    for j, v in enumerate(row + ['To do', '']):
        c = C_.cell(row=rr, column=2 + j, value=v)
        c.font = font(9)
        c.alignment = Alignment(wrap_text=True, vertical='top')
        c.border = BOTTOM
        if j == 0:
            c.number_format = 'dd mmm yyyy'
    if row[2] == 'Pinterest':
        C_.cell(row=rr, column=4).fill = fill(CLAY_LIGHT)
    elif row[2].startswith('Instagram'):
        C_.cell(row=rr, column=4).fill = fill(SAGE_LIGHT)
    else:
        C_.cell(row=rr, column=4).fill = fill(CREAM)
    C_.row_dimensions[rr].height = 75 if row[2] != 'Pinterest' else 32
dropdown(C_, f'H6:H{5 + len(cal)}', ['To do', 'Scheduled', 'Posted', 'Skipped'])
highlight(C_, f'H6:H{5 + len(cal)}', '$H6="Posted"', SAGE_LIGHT)
C_.auto_filter.ref = f'B5:I{5 + len(cal)}'

S_ = sheet(wb, 'Social copy', tab=SAGE, widths=[3, 30, 60, 50, 50, 50, 50, 50])
title(S_, 'Social copy for every product', 'Edit freely to suit each platform. Keep it calm, kind and plain-spoken.')
header(S_, 5, ['Product', 'Instagram / Facebook caption', 'Reel / TikTok idea', 'Pin 1 (title / description)', 'Pin 2', 'Pin 3', 'Extra pin ideas (reuse any pin image)'], col=2, height=28)
for i, r in enumerate(sorted(rows, key=lambda r: r['n'])):
    rr = 6 + i
    pins = [f'{t}\n{d}' for t, d in r['pins']]
    vals = [r['name'], caption(r), reel(r)] + (pins + ['', '', ''])[:3] + ['\n\n'.join(pins[3:]) or '–']
    for j, v in enumerate(vals):
        c = S_.cell(row=rr, column=2 + j, value=v)
        c.font = font(9)
        c.alignment = Alignment(wrap_text=True, vertical='top')
        c.border = BOTTOM
        if i % 2:
            c.fill = fill(CREAM)
    S_.row_dimensions[rr].height = 150
S_.freeze_panes = 'C6'

T_ = sheet(wb, 'Shop setup', tab=CLAY_DEEP, widths=[3, 50, 70, 14])
title(T_, 'Shop setup (one-off jobs)', 'Do these before Wave 1 goes live.')
header(T_, 5, ['Job', 'Details', 'Done?'], col=2)
jobs = [('Create shop sections', 'ADHD-friendly planners · 2027 planners · Journals · Faith · Large print puzzles · Pets · Small business · Family & study · Life admin · Weddings · Pocket books · Spreadsheets · Bundles'),
        ('Social discount codes', 'DONE: already live on all social pages. Make sure each post mentions the right code.'),
        ('Shop announcement', 'Short line, e.g. "Calm, practical printables and spreadsheets, designed in Glasgow. New: 2027 planners and large print puzzle packs."'),
        ('Check digital listing settings', 'Type: Digital files. Who made it: I did. What is it: A finished product. When was it made: 2020–2026. Renewal: automatic.'),
        ('Pinterest boards', 'One board per shop section. Free samples are on hold until the website and blog are ready.'),
        ('Black Friday sale', 'Set up an Etsy sale in Shop Manager › Marketing › Sales and discounts for Fri 27 Nov – Mon 30 Nov 2026 (Black Friday to Cyber Monday). Agree the percentage with the owner (suggestion: 25% off). Schedule it by 20 Nov so it shows in Etsy\'s sale promotions.'),
        ('Link bundles from single listings', 'After the bundles are live, add one line near the top of each included product\'s description, e.g. "Save over 50% with The Busy Brain Collection" plus the bundle name (Etsy doesn\'t allow clickable links in descriptions).'),
        ('Old bundle ideas: do not list', 'The earlier "Busy Brain Bundle" (4 products) and the bundle ideas in the 20-product copy are replaced by the four new bundles.'),
        ('Lifestyle photos (later)', 'The owner generates lifestyle images from the prompts in the listing copy files; they get the real product placed in, then you add them as extra listing photos.')]
for i, (a, b) in enumerate(jobs):
    rr = 6 + i
    for j, v in enumerate([a, b, '']):
        c = T_.cell(row=rr, column=2 + j, value=v)
        c.font, c.border = font(10, j == 0), BOTTOM
        c.alignment = Alignment(wrap_text=True, vertical='top')
    T_.row_dimensions[rr].height = 48
dropdown(T_, 'D6:D20', ['Yes', 'No'])

Q_ = sheet(wb, 'Owner decisions', tab=CLAY, widths=[3, 50, 60, 30])
title(Q_, 'Owner decisions', 'Answered on 28 October 2026. Add new questions at the bottom.')
header(Q_, 5, ['Question', 'Decision / notes', 'Status'], col=2)
qs = [('Discount code for social posts', 'DONE: codes are live on all social pages.', 'Live'),
      ('AI disclosure', 'DONE: the owner ticks Etsy\'s AI box as part of the listing workflow. Set Status to "Draft: ready for owner" when a listing is ready for that step.', 'Owner handles'),
      ('Prices', 'Use the suggested prices in the Listings tab.', 'Agreed'),
      ('Black Friday sale', 'Yes. Etsy sale Fri 27 Nov – Mon 30 Nov 2026. Agree the percentage with the owner (suggestion: 25% off).', 'Yes'),
      ('Free samples', 'On hold until the owner builds the website and blog. Don\'t publish them yet.', 'Later'),
      ('Paid ads?', 'Not decided. Never run ads for the bereavement guide.', ''),
      ('Which social accounts do I post from, and who approves posts?', '', '')]
for i, (a, b, c3) in enumerate(qs):
    rr = 6 + i
    for j, v in enumerate([a, b, c3]):
        c = Q_.cell(row=rr, column=2 + j, value=v)
        c.font, c.border = font(10, j == 0), BOTTOM
        c.alignment = Alignment(wrap_text=True, vertical='top')
        if j == 2:
            c.fill = fill(CREAM)
    Q_.row_dimensions[rr].height = 40
wb.active = 0
wb.save(sys.argv[1])
print('listings', len(rows), 'calendar rows', len(cal))
