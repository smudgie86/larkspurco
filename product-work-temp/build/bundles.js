// Bundle definitions and their START-HERE guide (rendered by render.js via products/bundle-*.js).
const path = require('path');
const { execFileSync } = require('child_process');
const { page, cover, cbs, box, SIZES } = require('./lib');
const { head } = require('./lib2');

const P1 = path.join(__dirname, '..', 'Larkspur-Product-Line');
const P2 = path.join(__dirname, '..', 'Larkspur-Product-Line-2');
const pagesOf = (f) => {
  try { return Number(/Pages:\s+(\d+)/.exec(execFileSync('pdfinfo', [f]).toString())[1]); } catch (e) { return null; }
};

// item: [title, folder (relative), file prefix, blurb] or spreadsheet: [title, null, xlsx path, blurb]
const BUNDLES = {
  busy: {
    name: 'The Busy Brain Collection', short: 'Busy Brain Collection', price: '£29.95', kicker: 'ADHD-friendly planners · 7 printables + 1 spreadsheet',
    lead: 'Our gentlest, most useful ADHD-friendly planners, together in one bundle, plus the ADHD Money Dashboard spreadsheet.',
    items: [
      ['28-Day Task Paralysis Reset', [P1, '2 28-Day Task Paralysis Reset'], '28-Day-Task-Paralysis-Reset', 'For the days you know exactly what to do but can\'t make yourself start.'],
      ['30-Day ADHD Money Reset', [P1, '4 30-Day ADHD Money Reset'], '30-Day-ADHD-Money-Reset', 'Stop money slipping through the cracks: one small task a day, no shame.'],
      ['Low-Spoon Kitchen', [P1, '3 Low-Spoon Kitchen'], 'Low-Spoon-Kitchen', 'Simple food for low-energy days, rated by how many spoons it takes.'],
      ['ADHD Christmas Survival Guide', [P1, '1 ADHD Christmas Survival Guide'], 'ADHD-Christmas-Survival-Guide', 'Christmas asks a lot of a busy brain. This guide carries some of it for you.'],
      ['The 2027 Gentle Planner', [P2, '04 The 2027 Gentle Planner'], '2027-Gentle-Planner-Monday-Start', 'A full year, one gentle page a week, with UK dates built in. Monday and Sunday start.'],
      ['Kids\' Visual Routine Charts', [P2, '17 Kids\' Visual Routine Charts'], 'Kids-Visual-Routine-Charts', 'Picture routines that help kids feel calm, capable and independent.'],
      ['ADHD-Friendly Revision Planner', [P2, '18 The ADHD-Friendly Revision Planner'], 'ADHD-Friendly-Revision-Planner', 'Short sessions, clear plans and techniques that actually help things stick.'],
      ['BONUS: ADHD Money Dashboard (spreadsheet)', null, 'xlsx:money', 'Log spending in seconds, see what\'s safe to spend today, and catch forgotten subscriptions. Excel and Google Sheets.'],
    ],
  },
  biz: {
    name: 'The Small Business Vault', short: 'Small Business Vault', price: '£39.95', kicker: 'UK small business · 7 planners + 2 spreadsheets',
    lead: 'Everything to plan, run and grow a small UK business, from your first side hustle to your busiest craft fair, plus two working spreadsheets.',
    items: [
      ['ADHD Small Business Planner', [P2, '11 The ADHD Small Business Planner'], 'ADHD-Small-Business-Planner', 'Three goals, one week at a time, and a home for every shiny new idea.'],
      ['30-Day Side Hustle Starter', [P2, '16 The 30-Day Side Hustle Starter'], '30-Day-Side-Hustle-Starter', 'From idea to first sale in 30 days, around your real life.'],
      ['Etsy & Handmade Seller Planner', [P2, '12 The Etsy & Handmade Seller Planner'], 'Etsy-Handmade-Seller-Planner', 'Everything a small handmade or digital shop needs, in one planner.'],
      ['Craft Fair & Market Stall Planner', [P2, '13 The Craft Fair & Market Stall Planner'], 'Craft-Fair-Market-Stall-Planner', 'Everything for market day, from finding fairs to counting the takings.'],
      ['Social Media & Pinterest Content Planner', [P2, '15 The Social Media & Pinterest Content Planner'], 'Social-Media-Pinterest-Content-Planner', 'Plan, batch and repurpose your content, and let Pinterest bring buyers to you.'],
      ['UK Small Business Bookkeeping Kit', [P2, '14 The UK Small Business Bookkeeping Kit'], 'UK-Small-Business-Bookkeeping-Kit', 'Ten minutes a week, and January stops being scary.'],
      ['Pet Sitter & Dog Walker Business Kit', [P2, '10 The Pet Sitter & Dog Walker Business Kit'], 'Pet-Sitter-Dog-Walker-Business-Kit', 'All the paperwork for a small pet care business, ready to print.'],
      ['SPREADSHEET: UK Sole Trader Bookkeeping', null, 'xlsx:bookkeeping', 'SA103 categories, mileage, use of home, MTD quarters and a tax estimate.'],
      ['SPREADSHEET: Etsy Seller Profit & Inventory', null, 'xlsx:etsy', 'Etsy fees, profit per product, orders, stock levels and best sellers.'],
    ],
  },
  puzzles: {
    name: 'The Puzzle Vault', short: 'Puzzle Vault', price: '£19.95', kicker: 'Large print · 519 puzzles with answers',
    lead: 'All five of our large print puzzle packs in one bundle: 519 word searches, sudoku, mazes, word scrambles, cryptograms and more, every one with answers.',
    items: [
      ['Super Bumper Christmas Puzzle Pack', [P2, '01 Super Bumper Large Print Christmas Puzzle Pack'], 'Super-Bumper-Large-Print-Christmas-Puzzle-Pack', '145 festive puzzles in large print.'],
      ['Super Bumper Scotland Puzzle Pack', [P2, '02 Super Bumper Large Print Scotland Puzzle Pack'], 'Super-Bumper-Large-Print-Scotland-Puzzle-Pack', '145 puzzles celebrating Scotland.'],
      ['Super Bumper Days Gone By Puzzle Pack', [P2, '03 Super Bumper Large Print Puzzle Pack- Days Gone By'], 'Super-Bumper-Large-Print-Nostalgia-Puzzle-Pack', '145 nostalgic puzzles.'],
      ['Christmas & Winter Puzzle Pack', [P1, '5 Large Print Christmas Puzzle Pack'], 'Large-Print-Christmas-Winter-Puzzle-Pack', '42 Christmas and winter puzzles.'],
      ['Scotland Puzzle Pack', [P1, '6 Large Print Scotland Puzzle Pack'], 'Large-Print-Scotland-Puzzle-Pack', '42 puzzles all about Scotland.'],
    ],
  },
  pets: {
    name: 'The Pet Parent Bundle', short: 'Pet Parent Bundle', price: '£14.95', kicker: 'Dogs, puppies, rescues and cats · 4 planners',
    lead: 'Four calm, practical planners for every stage of pet parenting: a new puppy, a rescue dog settling in, and everyday care for dogs and cats.',
    items: [
      ['28-Day Puppy Plan', [P2, '06 The 28-Day Puppy Plan'], '28-Day-Puppy-Plan', 'Your puppy\'s first month, one small step a day.'],
      ['Rescue Dog Settling-In Guide', [P2, '09 The Rescue Dog Settling-In Guide'], 'Rescue-Dog-Settling-In-Guide', 'A calm guide and journal for your rescue dog\'s first months home.'],
      ['Dog Care & Health Planner', [P2, '07 The Dog Care & Health Planner'], 'Dog-Care-and-Health-Planner', 'Every record for your dog in one tidy place.'],
      ['Cat Care & Health Planner', [P2, '08 The Cat Care & Health Planner'], 'Cat-Care-and-Health-Planner', 'Every record for your cat in one tidy place.'],
    ],
  },
};

function product(key) {
  const B = BUNDLES[key];
  const items = B.items.map(([t, dir, pre, blurb]) => {
    const n = dir ? pagesOf(path.join(...dir, `${pre}-A4.pdf`)) : null;
    return { t, blurb, n, xlsx: !dir };
  });
  const pages = [
    cover({ kicker: B.kicker, title: B.name, lead: B.lead, tags: ['Instant download', 'A4 + US Letter', 'Print at home'], bottom: 'Thank you for supporting a small Glasgow business.' }),
    page(`${head('Start here', 'What\'s inside', 'Each planner has its own folder, with an A4 version (UK) and a US Letter version.')}
<div class="g2">${items.map((it, i) => box('', `<h3>${it.t}</h3><p class="small">${it.blurb}</p><p class="tiny muted" style="margin-top:1mm">${it.xlsx ? 'Excel / Google Sheets · filled-in example included' : `${it.n} pages · A4 and US Letter`}</p>`, i % 3 === 0 ? 'cream' : i % 3 === 2 ? 'sage' : '')).join('')}</div>`, { sect: 'Start here', deco: 'small', cls: 'nofill' }),
    page(`${head('Start here', 'How to use your bundle', '')}
<div class="g2">${box('Printing', cbs(['Unzip the download first (on a phone, use the Files app)', 'Open the PDF in your size: A4 (UK/Europe) or Letter (US/Canada)', 'Print at 100% / "actual size"', 'Print only the pages you need, as many times as you like', 'Most pages work in black and white too']))}
${box('Good to know', cbs(['Keep a master copy so you can print fresh pages any time', 'Printing lots? A local print shop can print and bind them', 'Lost your files? Download them again from Etsy: Purchases and reviews', key === 'busy' || key === 'biz' ? 'Spreadsheets open in Excel, Google Sheets or Numbers. Start on the "Start here" tab' : 'Every puzzle and planner is designed for easy reading']), 'sage')}</div>
${box('A small favour', '<p class="small">If you enjoy your bundle, a review on Etsy helps other people find us and means the world to a small business. Thank you!</p><p class="small">Questions or problems? Message us on Etsy and we\'ll help.</p>', 'cream')}
<div class="callout small">For personal use only. Please don\'t share, resell or upload the files elsewhere. © Larkspur &amp; Co.</div>`, { sect: 'Start here', cls: 'nofill' }),
  ];
  const meta = { pdf: 'showcase.pdf', ...require('./bundlemeta')[key] };
  return { file: `START-HERE-${B.short.replace(/ /g, '-')}`, short: B.short, title: B.name, sizes: { A4: SIZES.A4 }, pages, B, meta };
}

module.exports = { BUNDLES, product };
