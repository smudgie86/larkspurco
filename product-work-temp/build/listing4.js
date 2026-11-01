// Listing copy for the 10 premium products and bundles, with Etsy limit checks.
const fs = require('fs');
const path = require('path');

const ITEMS = [
  ['biblestudy', 'Bible-Study-Planner-A4.pdf + Bible-Study-Planner-Letter.pdf', 'Fillable PDF in A4 and US Letter sizes', 'pdf'],
  ['school2027', '2027-School-Planner-A4.pdf + 2027-School-Planner-Letter.pdf', 'PDF in A4 and US Letter sizes', 'pdf'],
  ['journal90', 'Gentle-90-Guided-Journal-A4.pdf + Gentle-90-Guided-Journal-Letter.pdf', 'Fillable PDF in A4 and US Letter sizes', 'pdf'],
  ['pocket-quest', 'UPLOAD-TO-ETSY-Pocket-Quest.zip', 'A6 pages PDF, print-at-home A4 PDF and a printing guide', 'pocket'],
  ['pocket-set', 'UPLOAD-TO-ETSY-Pocket-Book-Collection.zip', '6 notebooks (A6 PDF + print-at-home A4 PDF each) and a printing guide', 'pocket'],
];
const STYLE = 'soft natural window light, warm cream and muted sage green palette with terracotta accents, calm Scandinavian styling, uncluttered, photorealistic';
const HOW = {
  pdf: 'HOW TO USE:\n1. Download your files from Etsy (Purchases and reviews)\n2. Print at home or at a local print shop, or type into the fillable pages on a computer\n3. Print the pages you need, as many times as you like',
  pocket: 'HOW TO USE:\n1. Download the zip file from Etsy (Purchases and reviews) and unzip it\n2. Print the A4 file double-sided, cut each sheet in half, stack, fold and staple (guide included)\n3. Or send the A6 file to a print shop for a stapled booklet',
  pdfsheet: 'HOW TO USE:\n1. Download the zip file from Etsy (Purchases and reviews) and unzip it\n2. Type into the PDF on a computer (Adobe Acrobat Reader is free), or print it and fill it in by hand\n3. Open the spreadsheet in Excel, Google Sheets or Numbers',
  templates: 'HOW TO USE:\n1. Download the zip file from Etsy (Purchases and reviews) and unzip it\n2. Open the "START HERE" guide and install the two free fonts\n3. Edit the templates, save as PDF and print at home or at a print shop',
  sheet: 'HOW TO USE:\n1. Download the zip file from Etsy (Purchases and reviews) and unzip it\n2. Open in Excel or Numbers, or upload to Google Drive and open with Google Sheets\n3. Start on the "Start here" tab',
  bundle: 'HOW TO USE:\n1. Download the zip file from Etsy (Purchases and reviews) and unzip it\n2. Open the START HERE guide\n3. Print what you need, as many times as you like',
};

const errs = [];
const out = [];
const w = (s) => out.push(s);
const plain = (s) => s.replace(/&amp;/g, '&').replace(/<br>/g, ' ');
w('# Larkspur & Co. — batch 4: faith, school, journal and pocket books\n');
w('Five new listings. Each folder has the files to upload, listing images, Pinterest pins and (for the A4 products) a free sample.\n');
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

let group = '';
const G = { biblestudy: 'Planners & journals', 'pocket-quest': 'A6 pocket books' };
all.forEach(({ slug, zip, what, kind, p, L, imgs }) => {
  if (G[slug]) { w(`\n---\n\n# ${G[slug]}\n`); }
  w(`\n## ${plain(p.title)}\n`);
  w(`**Suggested price:** ${L.price} · **Upload:** \`${zip}\` · **Listing images:** ${imgs}${['biblestudy', 'school2027', 'journal90'].includes(slug) ? ' · **Free sample:** included' : ''}\n`);
  w(`**Etsy title** (${L.title.length}/140)\n\n\`\`\`\n${L.title}\n\`\`\`\n`);
  w(`**13 tags**\n\n\`\`\`\n${L.tags.join(', ')}\n\`\`\`\n`);
  const desc = `${L.hook}\n\n${L.body.map(plain).join('\n\n')}\n\nYOU'LL RECEIVE:\n• ${what}\n• Instant download: nothing will be posted\n\n${HOW[kind]}\n\nDesigned with care in Glasgow by Larkspur & Co. For personal use only: please don't share or resell the files.\n\nFound us on TikTok, Instagram or Pinterest? Remember to use the discount code from the post at checkout.`;
  w('**Description**\n\n```\n' + desc + '\n```\n');
  w('**Pinterest pins** (link each to the listing; space pins to the same link at least a week apart)\n');
  L.pinCopy.forEach(([t, d], i) => w(`${i + 1}. **${t}**  \n   ${d}`));
  w('\n**Lifestyle photo prompt** (generate with a blank screen or blank pages and send it back so I can place the real product in):\n');
  L.prompts.forEach((pr) => w(`- ${pr.includes('photorealistic') ? pr : pr + ', ' + STYLE}`));
});

w('\n---\n\n## Notes\n');
w('- **Pocket books:** list the Collection and Pocket Quest first. The other five pocket books can become single listings later (£2.95 each) using the Collection copy, one colour per listing.');
w('- **Scripture:** the two verses printed in the Bible Study Planner are from the World English Bible, which is public domain. The reading plan uses references only.');
w('- **2027 School Planner:** shows UK bank holidays for all nations; school holidays are write-in because they vary by council.');
w('- **Guided journal:** written as self-care and reflection, not therapy. Keep social copy gentle and avoid mental health claims.');
const file = path.join(__dirname, '..', 'Larkspur-Product-Line-4', 'Listing copy - batch 4.md');
fs.writeFileSync(file, out.join('\n'));
console.log('ok', file);
