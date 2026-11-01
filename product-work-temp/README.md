# Larkspur & Co. — product work handoff (temporary)

**Temporary folder.** It holds paid products for the Etsy shop (LarkspurCoDigital). It lives on the branch `claude/amazing-faraday-3zxjzz`, not `main`, so the website (larkspurco.uk, served by GitHub Pages) is not affected. Don't merge this folder into `main`, and delete it once the other sessions have what they need.

Last updated: 1 November 2026.

## What's here

| Folder | What it is |
|---|---|
| `Larkspur-Product-Line/` | Batch 1: 6 products (ADHD Christmas guide, Task Paralysis Reset, Low-Spoon Kitchen, ADHD Money Reset, 2 large print puzzle packs) |
| `Larkspur-Product-Line-2/` | Batch 2: 20 products (3 super bumper puzzle packs, 2027 printable + GoodNotes digital planner, 5 pet, 6 business, 4 life products) |
| `Larkspur-Product-Line-3/` | Batch 3: Just in Case Binder, When Someone Dies guide + Word templates, Wedding Mega Bundle, 3 spreadsheets, 4 bundles |
| `Larkspur-Product-Line-4/` | Batch 4: Bible Study Planner, 2027 School Planner, The Gentle 90 guided journal, Pocket Quest, Pocket Book Collection (6 A6 books) |
| `Larkspur-Etsy-Handoff/` | Brief (Word + PDF) and tracker (xlsx) for the Etsy/social lead: all 41 listings, 180-post social calendar, owner decisions |
| `build/` | Everything used to make the products: scripts, product definitions, fonts (OFL), images, data |
| `qa/` | Only what the build needs (template preview images, feature data). Other QA renders are regenerated |

Every product folder has: the customer files (PDFs, or an `UPLOAD-TO-ETSY-*.zip` for batches 3–4), `Etsy listing images/` (etsy-1 is the main photo), `Pinterest pins/` and usually a `FREE-SAMPLE-*.pdf`. Each batch folder has a **Listing copy** markdown file with Etsy titles, 13 tags, descriptions, pin copy and lifestyle photo prompts. The tracker in `Larkspur-Etsy-Handoff/` has all of it in one sheet.

The original delivery zips (`Larkspur-Product-Line*.zip`) aren't committed. Re-zip a batch folder to recreate one.

## Owner decisions (28 Oct 2026)

- Discount codes are live on all social pages.
- The owner ticks Etsy's AI disclosure box (it's already part of their workflow). No AI line in descriptions.
- Use the suggested prices (see tracker / listing copy).
- Black Friday sale: yes, Fri 27 – Mon 30 Nov 2026 (percentage still to agree; 25% suggested).
- Free samples: on hold until the owner builds a website/blog.
- Still open: ads budget (never advertise the bereavement guide), which social accounts the lead uses, who approves posts.
- Lifestyle photos: the owner generates images in ComfyUI on their own machine from the prompts, and sends them back with blank pages/screens so the real product can be composited in.

## Standing rules

- Never put paid product files on `main` or anywhere the website serves.
- No model identifiers in commits.
- UK spelling, calm and kind tone, no hype. Planning tools are not medical, legal, financial or tax advice.
- Brand: clay #CC8B6D / #94502F / #F3E1D6, cream #FBF7F1, ink #3A352F, sage #7C8B6B / #47503E / #E4E9DD, Poppins (plus Cormorant Garamond for wedding/memorial templates). Pocket books use the lavender "Quest Book" look.
- Puzzle books are published under the imprint Robertson & McGarrigle Books.

## Rebuilding (any cloud session)

Requirements: Node with Playwright (Chromium preinstalled), Python 3 with pypdf, openpyxl, python-docx, python-pptx, reportlab and Pillow, plus LibreOffice (`soffice`) and poppler (`pdftoppm`). Install the fonts first: `mkdir -p ~/.fonts && cp build/fonts/*.ttf build/fonts/ofl/*.ttf ~/.fonts && fc-cache -f`.

Run everything from `build/`. Output goes to `build/out/<slug>/`.

- **PDF products:** `node render.js <slug>` (slugs = files in `build/products/`). It renders A4 + US Letter, checks for overflow, adds fillable fields when `fillable: true`, and fixes links for the digital planner.
- **Listing images and pins:** `node marketing.js <slug>`; extra images via `node extra.js legacy|bereavement`.
- **Free samples:** `node freebie.js <slug>`.
- **Spreadsheets:** `python3 lifeadmin.py out/legacy/xlsx`, `python3 wedsheet.py out/wedding-bundle/xlsx`, `python3 booksheet.py out/sheets/bookkeeping`, `python3 etsysheet.py out/sheets/etsy`, `python3 moneysheet.py out/sheets/money`. Check them with `python3 -I xlcheck.py <file.xlsx> [--pdf outdir]`, which recalculates in LibreOffice and reports formula errors.
- **Word templates:** `python3 ofs.py out/bereavement/word`. **PowerPoint stationery:** `python3 wedppt.py out/wedding-bundle/pptx`.
- **Pocket books:** `node pocket.js` builds the A6 PDFs, then `impose.py` creates the print-at-home A4 versions (double-sided, flip on long edge, cut, stack, fold, staple).
- **Bundles:** `bundles.js`, `bundlemeta.js`, `bundleshow.py` (they read the batch folders).
- **Packaging:** `package3.py`, `package4.py`. **Listing copy:** `listing2.js`, `listing3.js`, `listing4.js`. **Handoff:** `handoff_feat.js`, then `handoff_tracker.py` and `handoff_brief.py`.
- Run Python scripts that read downloaded files with `python3 -I`.

## Facts checked (October 2026)

- UK bank holidays 2027–28 from GOV.UK (`build/data/bank-holidays.json`).
- Tax 2026/27 (England, Wales, NI): personal allowance £12,570; basic rate to £50,270; higher rate to £125,140; Class 4 NI 6% / 2%; mileage 45p then 25p after 10,000 miles. Making Tax Digital: over £50k from April 2026, over £30k from April 2027, over £20k planned from April 2028.
- Etsy UK fees: listing $0.20, transaction 6.5%, processing 4% + £0.20, regulatory operating fee 0.48% (from June 2026), 20% VAT on fees.
- Bereavement: register a death within 5 days (England, Wales, NI) or 8 days (Scotland). Tell Us Once is not available in NI. The probate fee rose to £526 in July 2026, so the guide doesn't quote it. Unused pensions count for Inheritance Tax from 6 April 2027.
- Scripture is quoted from the World English Bible (public domain). Readings in the order of service are public domain.

## Ideas not yet built

- Academic-year 2027/28 school planner (sells from June 2027; 2028 bank holidays are already in the data).
- Christian women's devotional journal.
- Single £2.95 listings for the other five pocket books.
- Website/blog with the free samples as downloads.
