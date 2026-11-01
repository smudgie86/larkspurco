// Writes the listing copy document for the 20 new products, checking Etsy limits.
const fs = require('fs');
const path = require('path');

const ORDER = [
  ['Puzzles', ['bumper-xmas', 'bumper-scot', 'bumper-every']],
  ['2027 planners', ['planner2027', 'digital2027']],
  ['Pets', ['puppy', 'dogcare', 'catcare', 'rescue', 'petbiz']],
  ['Business', ['adhdbiz', 'etsyseller', 'craftfair', 'bookkeeping', 'content', 'sidehustle']],
  ['Life', ['kidsroutine', 'revision', 'moving', 'wedding']],
];
const STYLE = 'soft natural window light, warm cream and muted sage green palette with terracotta accents, calm Scandinavian styling, uncluttered, photorealistic';

const errs = [];
const out = [];
const w = (s) => out.push(s);
const plain = (s) => s.replace(/&amp;/g, '&').replace(/<br>/g, ' ');
w('# Larkspur & Co. — 20 new products: listing copy, pins and image prompts\n');
w('Everything you need to list the new products on Etsy and promote them on Pinterest. Prices are suggestions: check similar listings and price within that range.\n');
w('## Quick reference\n');
w('| # | Product | Pages | Price | Files to upload |\n|---|---|---|---|---|');
let n = 0;
const all = [];
ORDER.forEach(([g, slugs]) => slugs.forEach((s) => {
  const p = require(`./products/${s}.js`);
  const L = p.meta.listing;
  n++;
  const files = s === 'planner2027' ? 'A4 Mon, A4 Sun, Letter Mon, Letter Sun' : s === 'digital2027' ? 'Digital PDF' : 'A4, US Letter';
  w(`| ${n} | ${plain(p.title)} | ${p.pages.length} | ${L.price} | ${files} |`);
  all.push([g, s, p]);
  if (L.title.length > 140) errs.push(`${s}: title ${L.title.length}`);
  if (L.tags.length !== 13) errs.push(`${s}: ${L.tags.length} tags`);
  L.tags.forEach((t) => { if (t.length > 20) errs.push(`${s}: tag too long "${t}"`); });
  if (new Set(L.tags).size !== L.tags.length) errs.push(`${s}: duplicate tag`);
}));
if (errs.length) { console.error(errs.join('\n')); process.exit(1); }
w('\n**Listing photos:** upload `etsy-1.jpg` to `etsy-5.jpg` from each product folder (etsy-1 first). **Pins:** `pin-1.jpg` to `pin-3.jpg`. **Free sample:** the `FREE-SAMPLE` PDF in each folder (not made for the digital planner).\n');
w('**Bundle ideas:** Pet Lover\'s Bundle (Puppy Plan + Dog Care + Rescue Guide) £12.95 · Small Business Bundle (ADHD Business Planner + Etsy Seller + Bookkeeping + Content Planner) £19.95 · Super Bumper Trio (all three bumper packs) £14.95. Etsy allows 5 files per listing, so zip the PDFs for bundles.\n');
let cur = '';
all.forEach(([g, s, p]) => {
  const L = p.meta.listing;
  if (g !== cur) { w(`\n---\n\n# ${g}\n`); cur = g; }
  w(`\n## ${plain(p.title)}\n`);
  w(`**Suggested price:** ${L.price} · **Pages:** ${p.pages.length}\n`);
  w(`**Etsy title** (${L.title.length}/140)\n\n\`\`\`\n${L.title}\n\`\`\`\n`);
  w(`**13 tags**\n\n\`\`\`\n${L.tags.join(', ')}\n\`\`\`\n`);
  const isPuzzle = s.startsWith('bumper');
  const isDigital = s === 'digital2027';
  const what = isDigital ? '• 1 landscape PDF (4:3) for tablets, fully hyperlinked\n• Instant download: no physical item will be sent'
    : s === 'planner2027' ? `• ${p.pages.length}-page PDF in A4 and US Letter\n• Monday-start and Sunday-start versions\n• Instant download: no physical item will be sent`
      : `• ${p.pages.length}-page PDF in A4 (UK) size\n• The same PDF in US Letter size\n• Instant download: no physical item will be sent`;
  const desc = `${L.hook}\n\n${L.body.join('\n\n')}\n\nWHAT YOU GET:\n${what}\n\n${isDigital ? 'HOW TO USE:\n1. Download from Etsy (Purchases and reviews)\n2. Open in GoodNotes, Notability, Noteshelf, Xodo or your favourite PDF app\n3. Tap the tabs and dates to move around' : 'HOW TO USE:\n1. Download your files from Etsy (Purchases and reviews)\n2. Print at home or at a local print shop\n3. Print the pages you need, as many times as you like'}\n\nDesigned with care in Glasgow by Larkspur & Co. For personal use only: please don't share or resell the files.${isPuzzle ? '' : ' This is a planning tool and isn\'t medical, veterinary, financial, legal or tax advice.'}\n\nFound us on TikTok, Instagram or Pinterest? Remember to use the discount code from the post at checkout.`;
  w('**Description**\n\n```\n' + desc + '\n```\n');
  w('**Pinterest pins** (link each to the listing; space pins to the same link at least a week apart)\n');
  L.pinCopy.forEach(([t, d], i) => w(`${i + 1}. **${t}**  \n   ${d}`));
  w('\n**Optional lifestyle photo prompt** (generate with blank pages and send back so I can place the real pages):\n');
  L.prompts.forEach((pr) => w(`- ${pr.includes('photorealistic') ? pr : pr + ', ' + STYLE}`));
});
w('\n---\n\n## Launch order (based on timing and demand)\n');
w('1. **Now (late October):** 2027 Gentle Planner, 2027 Digital Planner, Super Bumper Christmas Puzzles. People buy next year\'s planners and Christmas activities from now to early January.\n2. **November:** Super Bumper Scotland (gift season, St Andrew\'s Day, then Burns Night in January), Craft Fair Planner (Christmas markets), Pet Sitter Kit (holiday bookings).\n3. **December–January:** ADHD Small Business Planner, Side Hustle Starter, Bookkeeping Kit (31 January Self Assessment deadline), Content Planner, Etsy Seller Planner, Moving House Planner, Wedding Planner (engagement season peaks over Christmas and New Year).\n4. **January–February:** Revision Planner (exam season), Puppy Plan and Rescue Guide (lots of new dogs after Christmas), Dog and Cat Care Planners, Kids\' Routine Charts (back-to-school routines).\n');
w('## Facts checked for these products\n');
w('- 2027 UK bank holidays: downloaded from GOV.UK\'s official data. Easter, Mother\'s Day, Father\'s Day and clock changes are calculated and cross-checked.\n- Making Tax Digital thresholds (April 2026 over £50,000, April 2027 over £30,000, April 2028 planned over £20,000), £90,000 VAT threshold and £1,000 trading allowance confirmed for 2026/27. The kit tells buyers to check GOV.UK for current reporting rules, as a change to the reporting threshold has been reported but isn\'t confirmed.\n- Rescue dog "3-3-3" framed as a flexible guide, as rescues describe it.\n- Puppy socialisation and vaccinations: pages direct owners to their vet for timings, because sources differ.\n- All cryptogram quotes are public domain (Dickens, traditional carols, Burns, proverbs). Every sudoku is checked to have exactly one solution.\n');
const file = path.join(__dirname, 'out', 'Listing copy - 20 new products.md');
fs.writeFileSync(file, out.join('\n'));
console.log('ok', file);
