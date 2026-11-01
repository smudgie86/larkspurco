"""Etsy & social handoff brief (Word). Usage: python3 handoff_brief.py out.docx"""
import sys
from collections import Counter
from docx import Document
from docx.shared import Pt, Mm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
from handoff_data import collect, WAVE_DUE

rows = collect()
SAGE, CLAY, INK, SOFT = '47503E', '94502F', '3A352F', '6B655C'
d = Document()
s = d.sections[0]
s.page_width, s.page_height = Mm(210), Mm(297)
for side in ('left_margin', 'right_margin'):
    setattr(s, side, Mm(20))
s.top_margin = s.bottom_margin = Mm(18)
st = d.styles['Normal']
st.font.name, st.font.size = 'Arial', Pt(10)
st.element.rPr.rFonts.set(qn('w:eastAsia'), 'Arial')
st.paragraph_format.space_after = Pt(5)
st.paragraph_format.line_spacing = 1.15
for lvl, size, col in [(1, 15, SAGE), (2, 12, CLAY)]:
    h = d.styles[f'Heading {lvl}']
    h.font.name, h.font.size, h.font.bold = 'Arial', Pt(size), True
    h.font.color.rgb = RGBColor.from_string(col)
    h.element.rPr.rFonts.set(qn('w:eastAsia'), 'Arial')
    h.paragraph_format.space_before = Pt(14 if lvl == 1 else 10)
    h.paragraph_format.space_after = Pt(4)
s.footer.paragraphs[0].text = 'Larkspur & Co. · Etsy & social handoff · October 2026'
s.footer.paragraphs[0].runs[0].font.size = Pt(8)
s.footer.paragraphs[0].runs[0].font.color.rgb = RGBColor.from_string(SOFT)


def P(text='', bold=False, size=None, color=None, italic=False, after=None):
    p = d.add_paragraph()
    for i, part in enumerate(text.split('**')):
        r = p.add_run(part)
        r.bold = bold or (i % 2 == 1)
        r.italic = italic
        if size:
            r.font.size = Pt(size)
        if color:
            r.font.color.rgb = RGBColor.from_string(color)
    if after is not None:
        p.paragraph_format.space_after = Pt(after)
    return p


def B(items, style='List Bullet'):
    for t in items:
        p = d.add_paragraph(style=style)
        for i, part in enumerate(t.split('**')):
            r = p.add_run(part)
            r.bold = i % 2 == 1
        p.paragraph_format.space_after = Pt(2)


def shade(cell, hexcol):
    tcPr = cell._tc.get_or_add_tcPr()
    sh = OxmlElement('w:shd')
    sh.set(qn('w:val'), 'clear')
    sh.set(qn('w:color'), 'auto')
    sh.set(qn('w:fill'), hexcol)
    tcPr.append(sh)


def T(headers, data, widths):
    t = d.add_table(rows=1, cols=len(headers))
    t.style = 'Table Grid'
    t.alignment = WD_TABLE_ALIGNMENT.CENTER
    for i, h in enumerate(headers):
        c = t.rows[0].cells[i]
        c.text = ''
        r = c.paragraphs[0].add_run(h)
        r.bold, r.font.size = True, Pt(9)
        r.font.color.rgb = RGBColor(255, 255, 255)
        shade(c, SAGE)
    for k, row in enumerate(data):
        cells = t.add_row().cells
        for i, v in enumerate(row):
            cells[i].text = ''
            r = cells[i].paragraphs[0].add_run(str(v))
            r.font.size = Pt(9)
            if k % 2:
                shade(cells[i], 'FBF7F1')
    t.autofit = False
    tblPr = t._tbl.tblPr
    lay = OxmlElement('w:tblLayout')
    lay.set(qn('w:type'), 'fixed')
    tblPr.append(lay)
    for gc, w in zip(t._tbl.tblGrid.findall(qn('w:gridCol')), widths):
        gc.set(qn('w:w'), str(int(w / 25.4 * 1440)))
    for row in t.rows:
        for i, w in enumerate(widths):
            row.cells[i].width = Mm(w)
    d.add_paragraph().paragraph_format.space_after = Pt(2)
    return t


# ---------- title ----------
p = P('LARKSPUR & CO.', True, 9, CLAY, after=2)
p = P('Etsy & social handoff', True, 24, SAGE, after=2)
P(f'Brief for listing {len(rows)} products on Etsy and promoting them on Pinterest, Instagram, Facebook and TikTok', size=11, color=SOFT, after=10)
T(['At a glance', ''], [['Shop', 'etsy.com/shop/LarkspurCoDigital · larkspurco.uk'],
             ['What you\'re listing', f'{len(rows)} listings: 29 printables, 3 premium kits, 3 spreadsheets, 4 bundles and 2 pocket book listings'],
             ['Deadline', f'Wave 1 by {WAVE_DUE[1]} · Wave 2 by {WAVE_DUE[2]} · Wave 3 by {WAVE_DUE[3]}'],
             ['Social', '12-week plan starting Monday 2 November 2026 (in the tracker)'],
             ['Decisions', 'See section 7 and the "Owner decisions" tab in the tracker']], [40, 130])

d.add_heading('1. What you\'ve been given', 1)
B(['**This brief** (read it once, start to finish).',
   '**Larkspur Etsy & Social Tracker.xlsx**: your working file. Every listing\'s title, tags, description, price, files and photos, ready to copy into Etsy, plus the social calendar, captions and a status column for everything.',
   '**Four product zips** (sent separately by the owner): **Larkspur-Product-Line.zip** (6 products), **Larkspur-Product-Line-2.zip** (20 products), **Larkspur-Product-Line-3.zip** (10 products, including the bundles) and **Larkspur-Product-Line-4.zip** (5 products: faith, school, journal and pocket books).',
   '**Listing copy (reference)**: the original copy documents. The tracker already contains everything in them; use these only if you want the full write-up for a product.'])
P('Inside each zip, every product has its own numbered folder containing:')
B(['**The customer files**: either the PDFs (A4 and US Letter) or one **UPLOAD-TO-ETSY** zip. The tracker tells you which.',
   '**Etsy listing images**: etsy-1.jpg, etsy-2.jpg and so on (2000 × 2000). etsy-1 is always the main photo.',
   '**Pinterest pins**: pin-1.jpg to pin-3.jpg (1000 × 1500).',
   '**FREE-SAMPLE PDF** (most printables): a short free version. Don\'t upload this to Etsy; see section 6.'])

d.add_heading('2. Priorities and timeline', 1)
P('List in three waves, most seasonal first. Within a wave, list single products before the bundles that contain them.')
waves = {w: [r for r in rows if r['wave'] == w] for w in (1, 2, 3)}
why = {1: 'Christmas gifts, puzzles, 2027 planners and pocket-book stocking fillers sell from now to early January.',
       2: 'Engagement season, New Year resets (money, faith, journaling), the new school term and the 31 January Self Assessment deadline.',
       3: 'New Year resets, new pets after Christmas, exam season, plus evergreen products.'}
T(['Wave', 'List by', 'Why now', 'Listings'],
  [[f'Wave {w}', WAVE_DUE[w], why[w], '; '.join(r['name'] for r in waves[w])] for w in (1, 2, 3)], [14, 24, 40, 92])

d.add_heading('3. How to create each listing', 1)
P('Open the **Listings** tab in the tracker, filter by Wave, and for each row:')
B(['Shop Manager › Listings › **Add a listing**.',
   '**Photos**: upload the images from the product\'s "Etsy listing images" folder in order (etsy-1 first). Add short alt text for each, e.g. "Page preview of the large print word search".',
   '**About this listing**: Type **Digital files**. Who made it: **I did**. What is it: **A finished product**. When was it made: the most recent range (e.g. **2020–2026**).',
   '**Category**: start with the suggestion in the tracker, then pick the closest match Etsy offers.',
   '**Title, tags, description**: paste from the tracker exactly as written. Titles and tags are already within Etsy\'s limits (140 characters; 13 tags of 20 characters or fewer).',
   '**Price**: from the tracker (agreed by the owner). Quantity: Etsy handles this automatically for digital files.',
   '**Digital files**: upload the files listed in the tracker\'s "Digital files to upload" column. Where it says UPLOAD-TO-ETSY zip, upload that zip, not its contents.',
   '**Shop section**: from the tracker. Personalisation: off. Renewal: automatic.',
   'Save as a draft and check the preview (photo order, line breaks in the description). The owner ticks Etsy\'s AI disclosure box as part of the existing workflow, so set Status to **Draft: ready for owner** unless the owner has asked you to publish. Once it\'s live, paste the link into the tracker and set Status to **Live**.'], 'List Number')
d.add_heading('Etsy limits to know', 2)
B(['Up to 5 digital files per listing, 20MB each. Every file here is well under that.',
   'Etsy doesn\'t allow clickable links in descriptions, so refer to other listings by name (e.g. "Save over 50% with The Busy Brain Collection").',
   'The descriptions mention "the discount code from the post". The codes are already live on all the social pages, so make sure posts mention the right one.'])

d.add_heading('4. Shop setup (do these first)', 1)
B(['Create the shop sections: ' + ' · '.join(sorted(set(r['section'] for r in rows), key=lambda x: ['ADHD-friendly planners', '2027 planners', 'Journals', 'Faith', 'Large print puzzles', 'Pets', 'Small business', 'Family & study', 'Life admin', 'Weddings', 'Pocket books', 'Spreadsheets', 'Bundles'].index(x))) + '.',
   '**Black Friday sale:** set up an Etsy sale for Friday 27 – Monday 30 November 2026 (Shop Manager › Marketing › Sales and discounts). Agree the percentage with the owner (suggestion: 25% off) and schedule it by 20 November.',
   'Update the shop announcement to mention the new 2027 planners and puzzle packs (and the sale, from 27 November).',
   '**Pocket books:** list The Pocket Book Collection and Pocket Quest. The other five pocket books can become £2.95 single listings later.',
   'After the bundles are live, add a line to each included product\'s description pointing to its bundle.',
   'Do **not** list the older bundle ideas mentioned in the first two copy documents (the 4-product "Busy Brain Bundle", "Pet Lover\'s Bundle", "Small Business Bundle", "Super Bumper Trio"). The four new bundles replace them.'])
bund = [r for r in rows if r['section'] == 'Bundles']
T(['Bundle', 'Price', 'What\'s in it'], [
    ['The Busy Brain Collection', '£29.95', 'Task Paralysis Reset, ADHD Money Reset, Low-Spoon Kitchen, ADHD Christmas Survival Guide, 2027 Gentle Planner, Kids\' Routine Charts, Revision Planner + ADHD Money Dashboard spreadsheet (51% off)'],
    ['The Small Business Vault', '£39.95', 'ADHD Small Business Planner, Side Hustle Starter, Etsy Seller Planner, Craft Fair Planner, Content Planner, Bookkeeping Kit, Pet Sitter Business Kit + Bookkeeping and Etsy spreadsheets (52% off)'],
    ['The Puzzle Vault', '£19.95', 'All five large print puzzle packs, 519 puzzles (31% off)'],
    ['The Pet Parent Bundle', '£14.95', 'Puppy Plan, Rescue Dog Guide, Dog Care Planner, Cat Care Planner (34% off)']], [45, 18, 107])

d.add_heading('5. Social media', 1)
P('Everything is in the tracker: the **Social calendar** tab says what to post each week, on which platform, with which image and what copy. The **Social copy** tab has a caption, Reel idea and pin copy for every product if you want to post more.')
cal_counts = 'Roughly 3 Instagram/Facebook posts, 1–2 Reels/TikToks and 3–13 Pinterest pins a week.'
B([f'**Volume:** {cal_counts} Batch-schedule a week at a time (Meta Business Suite for Instagram and Facebook, Pinterest\'s own scheduler, TikTok\'s scheduler or a tool like Metricool).',
   '**Only post a product once its listing is live.** Every pin and post must link to (or say how to find) the live Etsy listing.',
   '**Pinterest:** one board per shop section. Link every pin to the listing URL, use the pin title and description from the calendar, and never pin the same listing more than once a week. Pinterest rewards steady pinning over months, so keep going after the 12 weeks by re-using pin images with the extra pin ideas.',
   '**Instagram and Facebook:** post the listing images as a carousel (etsy-1 to etsy-5). Captions are ready; adjust hashtags if you like. Put the shop link in the bio.',
   '**TikTok and Reels:** short, calm flip-throughs of the pages (or a screen recording for the spreadsheets). You\'ll need the PDFs open on a tablet or screen, or printed pages. Ideas are in the calendar.',
   '**Stories:** share every new post to Stories with a link sticker to the listing.'])
d.add_heading('Voice and rules', 2)
B(['Calm, kind and plain-spoken. UK spelling. No shouting, no "MUST HAVE", no fake urgency or countdown timers.',
   'ADHD and wellbeing products: never shame, diagnose or promise to "fix" anyone. "Designed for busy brains", not "cure your ADHD".',
   'Money, tax and legal products: these are planning tools, not advice. Never say otherwise, and don\'t promise savings or tax outcomes.',
   '**When Someone Dies:** Pinterest only, using the informational pins in the calendar. No Instagram/TikTok promotion, no discounts, no ads and no urgency, unless the owner decides otherwise.',
   'Don\'t post the full PDFs or spreadsheets anywhere public. Previews and the free samples only.',
   'Reply to comments and messages kindly and promptly; pass anything about refunds, file problems or custom requests to the owner.'])

d.add_heading('6. Free samples', 1)
P('Most printables have a FREE-SAMPLE PDF (a few pages of the product). Don\'t upload them to Etsy or post them yet: they\'re on hold until the owner builds the website and blog, where they\'ll be used as free downloads.')

d.add_heading('7. Owner decisions (agreed)', 1)
B(['**Discount codes:** live on all social pages.',
   '**AI disclosure:** the owner ticks Etsy\'s AI box as part of the listing workflow. No extra line in descriptions.',
   '**Prices:** use the suggested prices in the tracker.',
   '**Black Friday:** yes. Etsy sale Friday 27 – Monday 30 November 2026. Feature it in that week\'s posts.',
   '**Free samples:** on hold until the website and blog are built.',
   '**Still open:** ads budget (never for the bereavement guide), which accounts you post from, and who approves posts.'])

d.add_heading('8. Coming later', 1)
B(['**Lifestyle photos:** each product has an image prompt in the listing copy documents. The owner will generate these and get the real product placed into them. Add them to the listings as extra photos (after the existing ones).',
   '**Seasonal refresh:** in early January, swap the Christmas-themed main photos and social posts for New Year themes, and keep the 2027 planners prominent until March.',
   '**Each April:** the spreadsheets use 2026/27 UK tax rates and October 2026 Etsy fees. Flag to the owner when rates change so the files and descriptions can be updated.'])

d.add_heading('9. Before you publish each listing: checklist', 1)
B(['Main photo is etsy-1, and all listing images are in order.',
   'Title, tags and description pasted in full.',
   'Correct files uploaded (check the file names against the tracker).',
   'Price, shop section and category set; type is Digital files.',
   'Preview looks right on a phone (open the draft in the Etsy app).',
   'Status set to Draft: ready for owner (for the AI box), then Live with the link once published.'], 'List Bullet')

d.add_heading(f'Appendix: all {len(rows)} listings', 1)
T(['#', 'Product', 'Price', 'Wave', 'Section', 'Zip › folder'],
  [[r['n'], r['name'], r['price'], r['wave'], r['section'], f"{r['zip'].replace('Larkspur-Product-Line', 'LPL').replace('.zip', '')} › {r['folder']}"] for r in rows], [8, 50, 14, 13, 32, 53])
P('LPL = Larkspur-Product-Line.zip, LPL-2 = Larkspur-Product-Line-2.zip, LPL-3 = Larkspur-Product-Line-3.zip, LPL-4 = Larkspur-Product-Line-4.zip.', size=8, color=SOFT)
d.save(sys.argv[1])
print('ok')
