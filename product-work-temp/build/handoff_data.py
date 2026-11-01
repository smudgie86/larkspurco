"""Collect every listing (36) from the three delivery folders into one list of dicts."""
import os, re, json, glob

S = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BATCHES = [
    ('Larkspur-Product-Line', 'Listing copy, pins and image prompts.md',
     ['christmas', 'paralysis', 'kitchen', 'money', 'puzzles-christmas', 'puzzles-scotland']),
    ('Larkspur-Product-Line-2', 'Listing copy - 20 new products.md',
     ['bumper-xmas', 'bumper-scot', 'bumper-every', 'planner2027', 'digital2027', 'puppy', 'dogcare', 'catcare', 'rescue', 'petbiz', 'adhdbiz', 'etsyseller', 'craftfair', 'bookkeeping', 'content', 'sidehustle', 'kidsroutine', 'revision', 'moving', 'wedding']),
    ('Larkspur-Product-Line-3', 'Listing copy - premium products and bundles.md',
     ['legacy', 'bereavement', 'wedding-bundle', 'sheet-money', 'sheet-books', 'sheet-etsy', 'bundle-busy', 'bundle-biz', 'bundle-puzzles', 'bundle-pets']),
    ('Larkspur-Product-Line-4', 'Listing copy - batch 4.md', ['biblestudy', 'school2027', 'journal90', 'pocket-quest', 'pocket-set']),
]
SECTION = {}
for k in ['christmas', 'paralysis', 'kitchen', 'money']: SECTION[k] = 'ADHD-friendly planners'
for k in ['puzzles-christmas', 'puzzles-scotland', 'bumper-xmas', 'bumper-scot', 'bumper-every']: SECTION[k] = 'Large print puzzles'
for k in ['planner2027', 'digital2027']: SECTION[k] = '2027 planners'
for k in ['puppy', 'dogcare', 'catcare', 'rescue']: SECTION[k] = 'Pets'
for k in ['petbiz', 'adhdbiz', 'etsyseller', 'craftfair', 'bookkeeping', 'content', 'sidehustle']: SECTION[k] = 'Small business'
for k in ['kidsroutine', 'revision']: SECTION[k] = 'Family & study'
for k in ['moving', 'legacy', 'bereavement']: SECTION[k] = 'Life admin'
for k in ['wedding', 'wedding-bundle']: SECTION[k] = 'Weddings'
for k in ['sheet-money', 'sheet-books', 'sheet-etsy']: SECTION[k] = 'Spreadsheets'
for k in ['bundle-busy', 'bundle-biz', 'bundle-puzzles', 'bundle-pets']: SECTION[k] = 'Bundles'
SECTION['biblestudy'] = 'Faith'
SECTION['school2027'] = 'Family & study'
SECTION['journal90'] = 'Journals'
for k in ['pocket-quest', 'pocket-set']: SECTION[k] = 'Pocket books'
WAVE = {}
for k in ['christmas', 'puzzles-christmas', 'bumper-xmas', 'bundle-puzzles', 'planner2027', 'digital2027', 'bundle-busy', 'puzzles-scotland', 'bumper-scot', 'legacy', 'craftfair', 'petbiz']: WAVE[k] = 1
for k in ['wedding', 'wedding-bundle', 'money', 'sheet-money', 'bookkeeping', 'sheet-books', 'bundle-biz', 'adhdbiz', 'sidehustle', 'content', 'etsyseller', 'sheet-etsy', 'bumper-every']: WAVE[k] = 2
for k in ['paralysis', 'kitchen', 'moving', 'revision', 'kidsroutine', 'puppy', 'rescue', 'dogcare', 'catcare', 'bundle-pets', 'bereavement']: WAVE[k] = 3
for k in ['pocket-quest', 'pocket-set']: WAVE[k] = 1
for k in ['biblestudy', 'school2027', 'journal90']: WAVE[k] = 2
WAVE_DUE = {1: 'Fri 6 Nov 2026', 2: 'Fri 20 Nov 2026', 3: 'Fri 4 Dec 2026'}
CATEGORY = {
    'Large print puzzles': 'Paper & Party Supplies › Paper (or search "puzzle book" / "word search")',
    '2027 planners': 'Paper & Party Supplies › Paper › Calendars & Planners',
    'Spreadsheets': 'Search "spreadsheet template" / "budget template" and pick the closest digital template category',
    'Weddings': 'Weddings › Invitations & Paper (stationery) or Calendars & Planners (planner)',
    'Journals': 'Books, Movies & Music › Books (journals) or Paper › Calendars & Planners',
    'Pocket books': 'Paper & Party Supplies › Paper › Notebooks & Journals',
}
DEFAULT_CAT = 'Paper & Party Supplies › Paper › Calendars & Planners'


def code_after(sec, label):
    m = re.search(re.escape(label) + r'.*?```\n(.*?)\n```', sec, re.S)
    return m.group(1).strip() if m else ''


def parse_md(path):
    txt = open(path, encoding='utf-8').read()
    secs = re.split(r'\n## ', txt)
    out = []
    for s in secs:
        if '**Etsy title**' not in s:
            continue
        name = s.split('\n', 1)[0].strip()
        price = re.search(r'\*\*Suggested price:\*\*\s*(£[\d.]+)', s).group(1)
        pins = re.findall(r'^\d+\. \*\*(.+?)\*\*\s*\n\s+(.+)$', s, re.M)
        pm = re.search(r'photo prompt.*?\n\n((?:- .*\n?)+)', s, re.I | re.S)
        prompts = [l[2:].strip() for l in pm.group(1).strip().split('\n')] if pm else []
        out.append(dict(name=name, price=price, title=code_after(s, '**Etsy title**'), tags=code_after(s, '**13 tags**'),
                        desc=code_after(s, '**Description**'), pins=pins, prompts=prompts))
    return out


def collect():
    feat = json.load(open(os.path.join(S, 'qa', 'handoff-feat.json')))
    rows = []
    n = 0
    for zi, (folder, md, slugs) in enumerate(BATCHES, 1):
        listings = [l for l in parse_md(os.path.join(S, folder, md)) if 'optional extra listing' not in l['name']]
        dirs = sorted([d for d in os.listdir(os.path.join(S, folder)) if os.path.isdir(os.path.join(S, folder, d))], key=lambda d: int(d.split()[0]))
        assert len(listings) == len(slugs) == len(dirs), (folder, len(listings), len(slugs), len(dirs))
        for slug, L, d in zip(slugs, listings, dirs):
            n += 1
            full = os.path.join(S, folder, d)
            zips = [os.path.basename(f) for f in glob.glob(os.path.join(full, 'UPLOAD-TO-ETSY-*.zip'))]
            if zips:
                files = zips
            else:
                files = sorted(os.path.basename(f) for f in glob.glob(os.path.join(full, '*.pdf')) if not os.path.basename(f).startswith('FREE'))
            sample = [os.path.basename(f) for f in glob.glob(os.path.join(full, 'FREE-SAMPLE*.pdf'))]
            imgs = sorted(os.listdir(os.path.join(full, 'Etsy listing images')))
            pins = sorted(os.listdir(os.path.join(full, 'Pinterest pins')))
            sec = SECTION[slug]
            rows.append(dict(n=n, slug=slug, zip=folder + '.zip', folder=d, section=sec, wave=WAVE[slug], due=WAVE_DUE[WAVE[slug]],
                             category=CATEGORY.get(sec, DEFAULT_CAT), files=files, sample=sample[0] if sample else '', images=imgs, pinimgs=pins,
                             feat=feat[slug], **L))
    return rows


if __name__ == '__main__':
    rows = collect()
    print(len(rows))
    for r in rows:
        print(r['n'], r['wave'], r['price'], r['name'][:40], len(r['title']), len(r['tags'].split(',')), len(r['desc']), len(r['pins']), len(r['images']), len(r['pinimgs']), r['files'][:2])
