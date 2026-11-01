// Listing copy for the 10 premium products and bundles, with Etsy limit checks.
const fs = require('fs');
const path = require('path');

const ITEMS = [
  ['legacy', 'UPLOAD-TO-ETSY-Just-in-Case-Binder.zip', 'Fillable PDF guide (A4 + US Letter) and an Excel / Google Sheets spreadsheet with a filled-in example', 'pdfsheet'],
  ['bereavement', 'UPLOAD-TO-ETSY-When-Someone-Dies-UK.zip', 'Fillable PDF guide (A4 + US Letter), 6 editable Word templates and a how-to-edit guide', 'templates'],
  ['wedding-bundle', 'UPLOAD-TO-ETSY-Wedding-Mega-Bundle.zip', 'Printable planner (A4 + US Letter), spreadsheet, 4 editable PowerPoint stationery files and a how-to-edit guide', 'templates'],
  ['sheet-money', 'UPLOAD-TO-ETSY-ADHD-Money-Dashboard.zip', 'Spreadsheet (.xlsx) plus a filled-in example', 'sheet'],
  ['sheet-books', 'UPLOAD-TO-ETSY-UK-Sole-Trader-Bookkeeping.zip', 'Spreadsheet (.xlsx) plus a filled-in example', 'sheet'],
  ['sheet-etsy', 'UPLOAD-TO-ETSY-Etsy-Seller-Profit-Inventory.zip', 'Spreadsheet (.xlsx) plus a filled-in example', 'sheet'],
  ['bundle-busy', 'UPLOAD-TO-ETSY-Busy-Brain-Collection.zip', '7 PDFs (A4 + US Letter), 1 spreadsheet and a start-here guide', 'bundle'],
  ['bundle-biz', 'UPLOAD-TO-ETSY-Small-Business-Vault.zip', '7 PDFs (A4 + US Letter), 2 spreadsheets and a start-here guide', 'bundle'],
  ['bundle-puzzles', 'UPLOAD-TO-ETSY-Puzzle-Vault.zip', '5 puzzle pack PDFs (A4 + US Letter) and a start-here guide', 'bundle'],
  ['bundle-pets', 'UPLOAD-TO-ETSY-Pet-Parent-Bundle.zip', '4 PDFs (A4 + US Letter) and a start-here guide', 'bundle'],
];
const STYLE = 'soft natural window light, warm cream and muted sage green palette with terracotta accents, calm Scandinavian styling, uncluttered, photorealistic';
const HOW = {
  pdfsheet: 'HOW TO USE:\n1. Download the zip file from Etsy (Purchases and reviews) and unzip it\n2. Type into the PDF on a computer (Adobe Acrobat Reader is free), or print it and fill it in by hand\n3. Open the spreadsheet in Excel, Google Sheets or Numbers',
  templates: 'HOW TO USE:\n1. Download the zip file from Etsy (Purchases and reviews) and unzip it\n2. Open the "START HERE" guide and install the two free fonts\n3. Edit the templates, save as PDF and print at home or at a print shop',
  sheet: 'HOW TO USE:\n1. Download the zip file from Etsy (Purchases and reviews) and unzip it\n2. Open in Excel or Numbers, or upload to Google Drive and open with Google Sheets\n3. Start on the "Start here" tab',
  bundle: 'HOW TO USE:\n1. Download the zip file from Etsy (Purchases and reviews) and unzip it\n2. Open the START HERE guide\n3. Print what you need, as many times as you like',
};

const errs = [];
const out = [];
const w = (s) => out.push(s);
const plain = (s) => s.replace(/&amp;/g, '&').replace(/<br>/g, ' ');
w('# Larkspur & Co. — premium products and bundles: listing copy, pins and image prompts\n');
w('Ten new listings: three premium guides and kits, three spreadsheets, and four bundles. Each product folder has an **UPLOAD-TO-ETSY** zip (the file buyers download), listing images, Pinterest pins and, where it makes sense, a free sample.\n');
w('## Quick reference\n');
w('| # | Listing | Price | Upload | Images |\n|---|---|---|---|---|');
const all = ITEMS.map(([slug, zip, what, kind], i) => {
  const p = require(`./products/${slug}.js`);
  const L = p.meta.listing;
  if (L.title.length > 140) errs.push(`${slug}: title ${L.title.length}`);
  if (L.tags.length !== 13) errs.push(`${slug}: ${L.tags.length} tags`);
  L.tags.forEach((t) => { if (t.length > 20) errs.push(`${slug}: tag "${t}"`); });
  if (new Set(L.tags).size !== 13) errs.push(`${slug}: duplicate tag`);
  const imgs = fs.readdirSync(path.join(__dirname, 'out', slug, 'marketing')).filter((f) => f.startsWith('etsy-')).length;
  w(`| ${i + 1} | ${plain(p.title)} | ${L.price} | ${zip} | ${imgs} |`);
  return { slug, zip, what, kind, p, L, imgs };
});
if (errs.length) { console.error(errs.join('\n')); process.exit(1); }

w('\n## Before you list\n');
w('- **Upload the zip**, not the loose files. Etsy allows up to 5 files of 20MB each per digital listing; every zip here is under 15MB.');
w('- **Listing photos:** upload `etsy-1.jpg` first, then the rest in order. Etsy allows 10 photos, so you have room for lifestyle photos made from the prompts below.');
w('- **AI disclosure:** Etsy asks sellers to be open about how items are made. These products were designed with AI assistance, so check Etsy\'s current creativity standards and add the disclosure it asks for. A line such as *"Designed by Larkspur & Co. with the help of AI tools"* at the end of each description is a simple, honest option.');
w('- **Canva:** the Word and PowerPoint templates can be imported into Canva (Create a design › Import file). If you ever sell Canva versions, share them as template links and only use free Canva elements or your own artwork.');
w('- **Fees and rates change.** The Etsy fee defaults (checked October 2026) and the 2026/27 UK tax rates are editable in the spreadsheets. Re-check them each April and whenever Etsy announces a change.');
w('- **Bundles vs single listings:** keep the individual listings live too. Bundles work best linked from each single listing ("Save over 50% with the Busy Brain Collection").\n');

let group = '';
const G = { legacy: 'Premium guides & kits', 'sheet-money': 'Spreadsheets', 'bundle-busy': 'Bundles' };
all.forEach(({ slug, zip, what, kind, p, L, imgs }) => {
  if (G[slug]) { w(`\n---\n\n# ${G[slug]}\n`); }
  w(`\n## ${plain(p.title)}\n`);
  w(`**Suggested price:** ${L.price} · **Upload:** \`${zip}\` · **Listing images:** ${imgs}${['legacy', 'bereavement'].includes(slug) ? ' · **Free sample:** included (use as a lead magnet on your site or Pinterest)' : ''}\n`);
  w(`**Etsy title** (${L.title.length}/140)\n\n\`\`\`\n${L.title}\n\`\`\`\n`);
  w(`**13 tags**\n\n\`\`\`\n${L.tags.join(', ')}\n\`\`\`\n`);
  const desc = `${L.hook}\n\n${L.body.map(plain).join('\n\n')}\n\nYOU'LL RECEIVE:\n• ${what}\n• Instant download: nothing will be posted\n\n${HOW[kind]}\n\nDesigned with care in Glasgow by Larkspur & Co. For personal use only: please don't share or resell the files.\n\nFound us on TikTok, Instagram or Pinterest? Remember to use the discount code from the post at checkout.`;
  w('**Description**\n\n```\n' + desc + '\n```\n');
  w('**Pinterest pins** (link each to the listing; space pins to the same link at least a week apart)\n');
  L.pinCopy.forEach(([t, d], i) => w(`${i + 1}. **${t}**  \n   ${d}`));
  w('\n**Lifestyle photo prompt** (generate with a blank screen or blank pages and send it back so I can place the real product in):\n');
  L.prompts.forEach((pr) => w(`- ${pr.includes('photorealistic') ? pr : pr + ', ' + STYLE}`));
});

w('\n---\n\n## Launch order\n');
w('1. **Now (late October – November):** The Puzzle Vault (Christmas gifting), The Busy Brain Collection (2027 planner season), The Just in Case Binder (gift for parents, New Year organising).');
w('2. **December – January:** The Wedding Mega Bundle (engagement season peaks over Christmas and New Year), UK Sole Trader Bookkeeping (31 January Self Assessment deadline), ADHD Money Dashboard (New Year money resets), Small Business Vault.');
w('3. **Any time:** When Someone Dies (steady, year-round need; promote gently, never with urgency or discounts tied to grief), Etsy Seller Profit & Inventory, Pet Parent Bundle (busy after Christmas, when many families get a new dog).\n');
w('## Facts checked for these products (October 2026)\n');
w('- **Bereavement:** death registration within 5 days in England, Wales and NI (after the medical examiner confirms in England and Wales) and 8 days in Scotland; Tell Us Once reference valid 28 days and not available in Northern Ireland (the NI Bereavement Service covers DWP and HMRC); Funeral Expenses Payment (England, Wales, NI) and Funeral Support Payment (Scotland) claimed within 6 months of the funeral; Bereavement Support Payment full amount if claimed within 3 months. Probate fees rose in July 2026 (to £526 for estates over £5,000), so the guide points to GOV.UK rather than quoting fees.');
w('- **Inheritance Tax:** most unused pension funds count towards the estate for deaths on or after 6 April 2027 (Finance Act 2026). Both the binder and the guide mention this.');
w('- **Organ donation:** opt-out systems in all four UK nations. **Wills:** marriage revokes a will in England, Wales and NI but not Scotland.');
w('- **Support lines:** Samaritans 116 123; Cruse 0808 808 1677; Cruse Scotland 0808 802 6161; Marie Curie 0800 090 2309.');
w('- **Tax 2026/27 (England, Wales, NI):** personal allowance £12,570, basic rate to £50,270, higher to £125,140; Class 4 NI 6% and 2%; mileage 45p then 25p after 10,000 miles; use-of-home flat rates £10/£18/£26. Scottish bands vary by source, so the spreadsheet lets Scottish users enter their own.');
w('- **Making Tax Digital:** from April 2026 over £50,000, April 2027 over £30,000, April 2028 planned over £20,000.');
w('- **Etsy fees (UK sellers):** listing $0.20 (about £0.16), transaction 6.5%, payment processing 4% + £0.20, regulatory operating fee 0.48% (raised from 0.32% in June 2026), 20% VAT on fees unless VAT-registered, Offsite Ads 15%.');
w('- **Readings in the order of service** are public domain: Rossetti, Tennyson, Stevenson and Henry Scott Holland.');
w('- **Bundle savings:** Busy Brain Collection £61.60 separately vs £29.95 (51% off); Small Business Vault £82.55 vs £39.95 (52% off); Pet Parent Bundle £22.80 vs £14.95 (34% off); Puzzle Vault £28.75 vs £19.95 (31% off).');
const file = path.join(__dirname, '..', 'Larkspur-Product-Line-3', 'Listing copy - premium products and bundles.md');
fs.writeFileSync(file, out.join('\n'));
console.log('ok', file);
