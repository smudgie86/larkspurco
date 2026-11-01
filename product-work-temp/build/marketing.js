// Builds Etsy listing images (2000x2000) and Pinterest pins (1000x1500) from rendered pages.
// Usage: node marketing.js <slug>
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { chromium } = require('playwright');
const { url } = require('./lib');

const C = {
  christmas: {
    pdf: 'ADHD-Christmas-Survival-Guide-A4.pdf', title: 'The ADHD Christmas Survival Guide', short: 'Christmas<br>Survival Guide', kicker: 'ADHD-friendly · Undated · Print at home',
    sub: 'Plan a calmer, good-enough Christmas, one small step at a time.', pages: 38,
    hero: [1, 9], grid: [[6, 'Your Good Enough Christmas'], [9, 'Six-week countdown'], [16, 'Gift tracker'], [21, 'Christmas Day timeline'], [26, 'Sensory survival kit'], [29, 'Stuck? Start here']],
    detail: 9, detailTitle: 'A gentle six-week countdown', detailPoints: ['One job per week, broken into small tasks', 'Top three and one small thing a day', 'Brain dump space for everything else', 'Behind? Just jump to the week you\'re in'],
    features: [['Six-week countdown', 'Small weekly tasks so nothing is left to the last minute'], ['Gifts, food & money', 'Budget, gift tracker, menu, timeline and shopping list'], ['Sensory & social survival', 'Energy budget, sensory kit, scripts and a calm-down flowchart'], ['The recovery days', 'Rest plans, returns, thank-yous and a January reset']],
    pins: [['Christmas overwhelm?', 'The ADHD Christmas Survival Guide', 9], ['Plan a good-enough Christmas', '38 gentle printable pages for busy brains', 6], ['Stuck? Start here.', 'A free calm-down flowchart for busy days', 29]],
  },
  paralysis: {
    pdf: '28-Day-Task-Paralysis-Reset-A4.pdf', title: 'The 28-Day Task Paralysis Reset', short: '28-Day Task<br>Paralysis Reset', kicker: 'ADHD-friendly · Undated · Print at home',
    sub: 'For the days you know what to do but can\'t make yourself start.', pages: 50,
    hero: [1, 10], grid: [[5, 'What kind of stuck?'], [6, 'Stuck? Start here'], [9, 'One tool a day'], [16, 'Weekly reviews'], [44, 'Your Unstuck Plan'], [45, 'Task breakdown']],
    detail: 10, detailTitle: 'One small page a day', detailPoints: ['A new starting tool every day for 28 days', 'Today\'s one thing and its first tiny step', 'Track energy, mood and how stuck you feel', 'Miss a day? Just turn the page'],
    features: [['28 starting tools', 'From the two-minute start to body doubling and if-then plans'], ['Find your kind of stuck', 'Match the right tool to the reason you\'re frozen'], ['Weekly reviews', 'Notice what works for your brain, without the guilt'], ['Keep it going', 'Unstuck Plan, task breakdown, reward menu and done list']],
    pins: [['Can\'t make yourself start?', 'A 28-day reset for task paralysis', 10], ['What kind of stuck are you?', 'Match the right tool to the block', 5], ['Stuck? Start here.', 'A printable flowchart for frozen days', 6]],
  },
  kitchen: {
    pdf: 'Low-Spoon-Kitchen-A4.pdf', title: 'The Low-Spoon Kitchen', short: 'The Low-Spoon<br>Kitchen', kicker: 'Spoon theory · 20 easy recipes · Print at home',
    sub: 'Simple food for low-energy days, rated by how many spoons it takes.', pages: 44,
    hero: [1, 12], grid: [[8, 'Zero-spoon food'], [9, 'Build a bowl'], [12, '20 easy recipes'], [30, 'Batch & freeze'], [35, 'Example meal plans'], [40, 'Freezer log']],
    detail: 22, detailTitle: 'Every recipe rated in spoons', detailPoints: ['One, two or three spoons of energy', 'Shortcuts built in: frozen, jars, microwave', 'Make it easier, swap it and store it tips', 'Minimal chopping and washing up'],
    features: [['20 low-effort recipes', 'No-cook, microwave, one-tray and batch & freeze'], ['Zero-spoon list', 'Food for the days you can\'t cook at all'], ['Meal plans', 'Two example weeks plus blank planners and lists'], ['Batch-cooking plan', 'Fill the freezer on a good day for the hard ones']],
    pins: [['Too tired to cook?', '20 low-spoon recipes for low-energy days', 12], ['Dinner from one tray', 'Easy recipes rated by energy', 24], ['What to eat when you can\'t cook', 'A printable zero-spoon food list', 8]],
  },
  money: {
    pdf: '30-Day-ADHD-Money-Reset-A4.pdf', title: 'The 30-Day ADHD Money Reset', short: '30-Day ADHD<br>Money Reset', kicker: 'ADHD-friendly · Undated · UK £',
    sub: 'Stop money slipping through the cracks, one small task a day, with no shame.', pages: 40,
    hero: [1, 7], grid: [[5, 'Money snapshot'], [7, 'One task a day'], [30, 'Subscription tracker'], [33, 'Simple monthly budget'], [37, 'Savings tracker'], [38, 'Weekly money date']],
    detail: 7, detailTitle: 'One small task a day', detailPoints: ['30 bite-sized tasks, 10–15 minutes each', 'Builds systems that do the remembering', 'Weekly check-ins, with no judgement', 'Free UK help and support listed'],
    features: [['30 small tasks', 'From "open the envelope" to your own money rules'], ['13 worksheets', 'Bills, subscriptions, budget, sinking funds and more'], ['Built for ADHD brains', 'Reminders, waiting lists and guilt-free fun money'], ['Shame-free', 'Gentle wording and free UK support services']],
    pins: [['Bad with money? You\'re not.', 'A 30-day ADHD money reset', 7], ['Find your forgotten subscriptions', 'A free printable subscription tracker', 30], ['A budget in four boxes', 'Simple money worksheets for busy brains', 33]],
  },
  'puzzles-christmas': {
    pdf: 'Large-Print-Christmas-Winter-Puzzle-Pack-A4.pdf', title: 'Large Print Christmas & Winter Puzzle Pack', short: 'Christmas &amp;<br>Winter Puzzles', kicker: 'Large print · 42 puzzles · Answers included',
    sub: 'Word searches, sudoku, mazes and scrambles in big, clear print.', pages: 54,
    hero: [1, 4], grid: [[4, 'Large print word searches'], [6, 'Sudoku'], [7, 'Word scrambles'], [14, 'Mazes'], [5, '20 festive themes'], [49, 'All answers included']],
    detail: 4, detailTitle: 'Big, clear, easy on the eyes', detailPoints: ['Large 17pt letters in a 13 × 13 grid', 'Words run across, down and diagonally down', 'Sudoku from gentle to steady', 'All answers at the back'],
    features: [['20 word searches', 'Christmas dinner, carols, panto, snow days and more'], ['10 sudoku', 'Large-print grids, from gentle to steady'], ['6 mazes & 6 scrambles', 'Festive word scrambles and calming mazes'], ['Print at home', 'A4 and US Letter. Print as many as you like.']],
    pins: [['Large print Christmas puzzles', '42 printable puzzles with answers', 4], ['A cosy Christmas activity', 'Word searches, sudoku and mazes', 6], ['Printable puzzles for Grandma', 'Big, clear, festive and fun', 7]],
  },
  'puzzles-scotland': {
    pdf: 'Large-Print-Scotland-Puzzle-Pack-A4.pdf', title: 'Large Print Scotland Puzzle Pack', short: 'The Big<br>Scotland Puzzles', kicker: 'Large print · 42 puzzles · Answers included',
    sub: 'Lochs, castles, islands and braw Scots words, in big, clear print.', pages: 54,
    hero: [1, 4], grid: [[4, 'Large print word searches'], [5, 'Island hopping'], [7, 'Scottish scrambles'], [14, 'Mazes'], [6, 'Sudoku'], [49, 'All answers included']],
    detail: 4, detailTitle: 'Big, clear, and full of Scotland', detailPoints: ['Large 17pt letters in a 13 × 13 grid', '20 Scottish themes, from Burns Night to the clans', 'Sudoku from gentle to steady', 'All answers at the back'],
    features: [['20 word searches', 'Cities, islands, lochs, castles, food and Scots words'], ['10 sudoku', 'Large-print grids, from gentle to steady'], ['6 mazes & 6 scrambles', 'Unscramble Scottish towns, islands and food'], ['Made in Glasgow', 'A thoughtful gift for anyone who loves Scotland']],
    pins: [['Large print Scottish puzzles', '42 printable puzzles with answers', 4], ['How well do you know Scotland?', 'Word searches, scrambles and sudoku', 7], ['A gift for Scotland lovers', 'Printable large print puzzle pack', 5]],
  },
};

const BASE = `
@font-face{font-family:Poppins;font-weight:400;src:url(${url('fonts/Poppins-Regular.ttf')})}
@font-face{font-family:Poppins;font-weight:500;src:url(${url('fonts/Poppins-Medium.ttf')})}
@font-face{font-family:Poppins;font-weight:600;src:url(${url('fonts/Poppins-SemiBold.ttf')})}
@font-face{font-family:Poppins;font-weight:700;src:url(${url('fonts/Poppins-Bold.ttf')})}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Poppins;color:#3A352F;background:#FBF7F1}
.c{position:absolute;border-radius:50%}
.brand{display:flex;align-items:center;gap:18px;font-size:30px;letter-spacing:.3em;font-weight:600;color:#CC8B6D;text-transform:uppercase}
.brand img{width:52px}
h1{color:#47503E;font-weight:700;letter-spacing:-.01em;line-height:1.02}
.pill{display:inline-block;background:#CC8B6D;color:#fff;border-radius:60px;padding:12px 30px;font-weight:500}
.pg{position:absolute;background:#fff;box-shadow:0 24px 60px rgba(58,53,47,.18),0 4px 12px rgba(58,53,47,.08);border-radius:6px}
.foot{position:absolute;font-size:30px;color:#6B655C}
`;

(async () => {
  const slug = process.argv[2];
  let c = C[slug];
  if (!c) {
    const prod = require(`./products/${slug}.js`);
    c = { pages: prod.pages.length, pdf: `${prod.file}-${Object.keys(prod.sizes || { A4: 1 })[0]}.pdf`, title: prod.title, ...prod.meta };
  }
  const src = path.join(__dirname, 'out', slug);
  const pv = path.join(src, 'preview');
  const mk = path.join(src, 'marketing');
  fs.mkdirSync(pv, { recursive: true });
  fs.mkdirSync(mk, { recursive: true });
  const need = new Set([...c.hero, ...c.grid.map((g) => g[0]), c.detail, ...c.pins.map((p) => p[2])]);
  for (const n of need) {
    execFileSync('pdftoppm', ['-r', '130', '-png', '-singlefile', '-f', String(n), '-l', String(n), path.join(src, c.pdf), path.join(pv, `p${n}`)]);
  }
  const P = (n) => url(`out/${slug}/preview/p${n}.png`);
  const brand = `<div class="brand"><img src="${url('img/flower.png')}">Larkspur &amp; Co.</div>`;

  const L = [];
  // 1. Hero
  L.push(`<div style="width:2000px;height:2000px;position:relative;overflow:hidden">
<div class="c" style="width:1100px;height:1100px;right:-330px;top:-420px;background:#F3E1D6"></div><div class="c" style="width:380px;height:380px;right:150px;top:110px;background:#7C8B6B"></div><div class="c" style="width:700px;height:700px;left:-300px;bottom:-330px;background:#E4E9DD"></div>
<div style="position:absolute;left:130px;top:130px">${brand}</div>
<div style="position:absolute;left:130px;top:270px;width:1180px;display:flex;flex-direction:column;align-items:flex-start;z-index:2"><h1 style="font-size:132px">${c.short}</h1><div style="font-size:46px;width:860px;line-height:1.35;margin-top:36px">${c.sub}</div><div style="font-size:32px;margin-top:40px" class="pill">${c.kicker}</div></div>
<img class="pg" src="${P(c.hero[1])}" style="width:800px;left:1080px;top:920px;transform:rotate(5deg)">
<img class="pg" src="${P(c.hero[0])}" style="width:800px;left:580px;top:1060px;transform:rotate(-4deg)">
<div class="foot" style="left:130px;bottom:110px">${c.heroFoot || 'Instant download · A4 + US Letter'}</div>
</div>`);
  // 2. What's inside
  L.push(`<div style="width:2000px;height:2000px;position:relative;overflow:hidden;background:#FBF7F1">
<div class="c" style="width:600px;height:600px;right:-200px;top:-260px;background:#F3E1D6"></div><div class="c" style="width:200px;height:200px;right:120px;top:70px;background:#7C8B6B"></div>
<div style="position:absolute;left:120px;top:110px">${brand}</div>
<h1 style="position:absolute;left:120px;top:200px;font-size:110px">What's inside</h1>
<div style="position:absolute;left:120px;top:345px;font-size:40px;color:#6B655C">${c.insideSub || `${c.pages} printable pages · ${c.title}`}</div>
<div style="position:absolute;left:120px;top:470px;width:1760px;display:grid;grid-template-columns:repeat(3,1fr);gap:50px 60px">
${c.grid.map(([n, cap]) => `<div><div style="height:610px;overflow:hidden;border-radius:8px;box-shadow:0 14px 40px rgba(58,53,47,.14);background:#fff"><img src="${P(n)}" style="width:100%;display:block"></div><div style="font-size:34px;font-weight:600;color:#47503E;margin-top:20px;text-align:center">${cap}</div></div>`).join('')}
</div></div>`);
  // 3. Detail
  L.push(`<div style="width:2000px;height:2000px;position:relative;overflow:hidden;background:#FBF7F1">
<div class="c" style="width:900px;height:900px;left:-300px;bottom:-300px;background:#E4E9DD"></div>
<div style="position:absolute;left:120px;top:120px">${brand}</div>
<div style="position:absolute;left:120px;top:220px;width:820px;display:flex;flex-direction:column;gap:60px"><h1 style="font-size:${c.detailTitle.length > 34 ? 80 : 96}px">${c.detailTitle}</h1>
<div style="width:760px">${c.detailPoints.map((p) => `<div style="display:flex;gap:28px;align-items:flex-start;margin-bottom:46px"><div style="flex:none;width:52px;height:52px;border-radius:50%;background:#7C8B6B;color:#fff;font-size:30px;display:flex;align-items:center;justify-content:center;margin-top:4px">✓</div><div style="font-size:44px;line-height:1.3">${p}</div></div>`).join('')}</div></div>
<img class="pg" src="${P(c.detail)}" style="width:960px;right:90px;top:140px">
</div>`);
  // 4. Features
  L.push(`<div style="width:2000px;height:2000px;position:relative;overflow:hidden;background:#FBF7F1">
<div class="c" style="width:700px;height:700px;right:-240px;bottom:-240px;background:#F3E1D6"></div><div class="c" style="width:240px;height:240px;right:220px;bottom:300px;background:#7C8B6B"></div>
<div style="position:absolute;left:120px;top:120px">${brand}</div>
<h1 style="position:absolute;left:120px;top:220px;font-size:110px">Why you'll love it</h1>
<div style="position:absolute;left:120px;top:460px;width:1760px;display:grid;grid-template-columns:1fr 1fr;gap:50px">
${c.features.map(([h, t], i) => `<div style="background:${i % 3 === 0 ? '#E4E9DD' : i % 3 === 1 ? '#fff' : '#F3E1D6'};border-radius:40px;padding:70px;min-height:600px;${i % 3 === 1 ? 'border:3px solid #E2D7C6' : ''}"><div style="font-size:80px;font-weight:700;color:#CC8B6D;line-height:1">0${i + 1}</div><div style="font-size:60px;font-weight:600;color:#47503E;margin-top:40px;line-height:1.15">${h}</div><div style="font-size:42px;margin-top:26px;line-height:1.4">${t}</div></div>`).join('')}
</div>
<div class="foot" style="left:120px;bottom:120px;font-size:36px">Made with care in Glasgow · larkspurco.uk</div>
</div>`);
  // 5. How it works
  L.push(`<div style="width:2000px;height:2000px;position:relative;overflow:hidden;background:#FBF7F1">
<div class="c" style="width:900px;height:900px;right:-280px;top:-300px;background:#F3E1D6"></div><div class="c" style="width:300px;height:300px;right:160px;top:140px;background:#7C8B6B"></div>
<div style="position:absolute;left:120px;top:120px">${brand}</div>
<h1 style="position:absolute;left:120px;top:220px;font-size:110px;width:1100px">${c.stepsTitle || 'Instant download.<br>Print at home.'}</h1>
<div style="position:absolute;left:120px;top:640px;width:1760px;display:grid;grid-template-columns:repeat(3,1fr);gap:50px">
${(c.steps || [['Buy', 'Check out securely on Etsy.'], ['Download', 'Your files are ready straight away from your Etsy account.'], ['Print', 'Print at home or at a print shop, as often as you like.']]).map(([h, t], i) => `<div style="background:#fff;border-radius:40px;padding:56px;border:3px solid #E2D7C6;min-height:480px"><div style="width:110px;height:110px;border-radius:50%;background:${i === 1 ? '#7C8B6B' : '#CC8B6D'};color:#fff;font-size:56px;font-weight:700;display:flex;align-items:center;justify-content:center">${i + 1}</div><div style="font-size:60px;font-weight:600;color:#47503E;margin-top:36px">${h}</div><div style="font-size:38px;margin-top:16px;line-height:1.4">${t}</div></div>`).join('')}
</div>
<div style="position:absolute;left:120px;top:1260px;width:1760px;background:#E4E9DD;border-radius:40px;padding:60px 70px;font-size:42px;line-height:1.6">
<div><b style="color:#47503E">Included:</b> ${c.included || `${c.pages}-page PDF in A4 and US Letter sizes`}</div>
<div><b style="color:#47503E">Please note:</b> this is a digital download. No physical item will be posted.</div>
<div><b style="color:#47503E">For personal use</b> · ${c.useNote || 'Print as many copies as you need'}</div>
</div>
<div class="foot" style="left:120px;bottom:110px;font-size:36px">etsy.com/shop/LarkspurCoDigital</div>
</div>`);

  const pins = c.pins.map(([head, sub, n], i) => `<div style="width:1000px;height:1500px;position:relative;overflow:hidden;background:${i === 1 ? '#E4E9DD' : '#FBF7F1'}">
<div class="c" style="width:520px;height:520px;right:-300px;top:-300px;background:${i === 1 ? '#FBF7F1' : '#F3E1D6'}"></div><div class="c" style="width:120px;height:120px;right:40px;top:40px;background:#7C8B6B"></div><div class="c" style="width:700px;height:700px;left:-260px;bottom:-200px;background:${i === 1 ? '#FBF7F1' : '#E4E9DD'}"></div>
<div style="position:absolute;left:70px;top:70px;right:70px;bottom:130px;display:flex;flex-direction:column">
<div class="brand"><img src="${url('img/flower.png')}" style="width:40px">Larkspur &amp; Co.</div>
<h1 style="font-size:90px;width:840px;margin-top:60px;position:relative">${head}</h1>
<div style="font-size:42px;width:820px;line-height:1.3;margin-top:28px;position:relative">${sub}</div>
<div style="flex:1;position:relative;margin-top:50px"><img class="pg" src="${P(n)}" style="width:700px;left:80px;top:0;transform:rotate(${i === 2 ? 3 : -3}deg)"></div>
</div>
<div style="position:absolute;left:0;right:0;bottom:0;height:130px;background:#47503E;color:#fff;display:flex;align-items:center;justify-content:center;font-size:36px;letter-spacing:.08em;font-weight:500;z-index:3">larkspurco.uk · ${c.pinFoot || 'Instant printable download'}</div>
</div>`);

  const browser = await chromium.launch();
  const shoot = async (html, w, h, file) => {
    const pg = await browser.newPage({ viewport: { width: w, height: h } });
    const f = path.join(mk, '_tmp.html');
    fs.writeFileSync(f, `<!doctype html><html><head><meta charset="utf-8"><style>${BASE}</style></head><body>${html}</body></html>`);
    await pg.goto('file://' + f);
    await pg.evaluate(() => document.fonts.ready);
    await pg.screenshot({ path: file, type: 'jpeg', quality: 90 });
    await pg.close();
  };
  for (let i = 0; i < L.length; i++) await shoot(L[i], 2000, 2000, path.join(mk, `etsy-${i + 1}.jpg`));
  for (let i = 0; i < pins.length; i++) await shoot(pins[i], 1000, 1500, path.join(mk, `pin-${i + 1}.jpg`));
  fs.unlinkSync(path.join(mk, '_tmp.html'));
  await browser.close();
  console.log(slug, 'marketing done');
})();
