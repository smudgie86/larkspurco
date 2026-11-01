// A6 pocket books (field-notes style), Quest Book look. Usage: node pocket.js [slug]
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const { url } = require('./lib');

const SHAPES = {
  circle: (c, s = 9) => `<svg width="${s}" height="${s}" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4.6" fill="${c}"/></svg>`,
  diamond: (c, s = 9) => `<svg width="${s}" height="${s}" viewBox="0 0 10 10"><path d="M5 .3 9.7 5 5 9.7.3 5Z" fill="${c}"/></svg>`,
  home: (c, s = 9) => `<svg width="${s}" height="${s}" viewBox="0 0 10 10"><path d="M5 .8 9.6 4.4V9.4H.4V4.4Z" fill="${c}"/></svg>`,
  heart: (c, s = 9) => `<svg width="${s}" height="${s}" viewBox="0 0 10 10"><path d="M5 9.2C1.5 6.6.3 5 .3 3.2A2.4 2.4 0 0 1 5 2.3a2.4 2.4 0 0 1 4.7.9C9.7 5 8.5 6.6 5 9.2Z" fill="${c}"/></svg>`,
  star: (c, s = 9) => `<svg width="${s}" height="${s}" viewBox="0 0 10 10"><path d="M5 .3 6.4 3.5 9.8 3.8 7.2 6.1 8 9.5 5 7.7 2 9.5 2.8 6.1.2 3.8 3.6 3.5Z" fill="${c}"/></svg>`,
};
const BR = [['Body', 'circle', '#8E7BB5'], ['Mind', 'diamond', '#6A8DB5'], ['Home', 'home', '#C17C9C'], ['Heart', 'heart', '#A65F9B'], ['Spark', 'star', '#C9A23F']];
const flower = (c, s) => `<svg width="${s}" height="${s}" viewBox="-30 -30 60 60"><g fill="none" stroke="${c}" stroke-width="2.4" stroke-linejoin="round">${[0, 72, 144, 216, 288].map((a) => `<path transform="rotate(${a})" d="M0-7C7-12 9-21 0-28-9-21-7-12 0-7Z"/>`).join('')}<path d="M0-5V6" stroke-linecap="round"/></g></svg>`;

const BOOKS = {
  quest: { name: 'Pocket Quest', sub: 'a tiny habit game with levels, loot and rest days', bg: '#F3F0F9', deep: '#5B4A7E', acc: '#B0698E', price: '£3.50' },
  today: { name: 'Pocket Today', sub: 'one small page for each day', bg: '#EEF1EA', deep: '#47503E', acc: '#94502F', price: '£2.95' },
  lists: { name: 'Pocket Lists', sub: 'lists, to-dos and brain dumps', bg: '#EDF1F6', deep: '#3F5876', acc: '#8A6A4B', price: '£2.95' },
  prayer: { name: 'Pocket Prayer', sub: 'a little book of prayers, thanks and answers', bg: '#F7EEF1', deep: '#7A4A5C', acc: '#A0754A', price: '£2.95' },
  gratitude: { name: 'Pocket Gratitude', sub: 'three good things, every day', bg: '#F8F3E4', deep: '#6E5A22', acc: '#A0603A', price: '£2.95' },
  notes: { name: 'Pocket Notes', sub: 'dot grid pages for anything', bg: '#F7EEE8', deep: '#94502F', acc: '#47503E', price: '£2.95' },
};

const css = (B) => `
@font-face{font-family:Poppins;font-weight:400;src:url(${url('fonts/Poppins-Regular.ttf')})}
@font-face{font-family:Poppins;font-weight:500;src:url(${url('fonts/Poppins-Medium.ttf')})}
@font-face{font-family:Poppins;font-weight:600;src:url(${url('fonts/Poppins-SemiBold.ttf')})}
@font-face{font-family:Poppins;font-weight:700;src:url(${url('fonts/Poppins-Bold.ttf')})}
@page{size:105mm 148mm;margin:0}*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Poppins;color:#3A352F;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.pg{width:105mm;height:148mm;background:${B.bg};position:relative;page-break-after:always;overflow:hidden}
.fr{position:absolute;inset:3.2mm;border:.8pt solid ${B.deep}}
.fr2{position:absolute;inset:4.2mm;border:.4pt solid ${B.deep}33}
.in{position:absolute;inset:6.5mm 7mm 6mm;display:flex;flex-direction:column}
.br{font-size:4.6pt;letter-spacing:.3em;color:${B.acc};font-weight:600;text-transform:uppercase}
h1{font-size:13pt;color:${B.deep};font-weight:700;line-height:1.05;margin-top:.8mm}
.sub{font-size:5.6pt;color:#6B655C;margin-top:.6mm}
.lab{font-size:5pt;letter-spacing:.12em;text-transform:uppercase;color:${B.acc};font-weight:600;margin-top:2.2mm}
.ln{border-bottom:.5pt solid ${B.deep}33;height:5.6mm}
.cb{display:flex;align-items:flex-end;gap:1.6mm;height:5.6mm;border-bottom:.5pt solid ${B.deep}22}
.cb i{flex:none;width:2.6mm;height:2.6mm;border:.6pt solid ${B.deep};border-radius:.6mm;margin-bottom:1mm;background:#fff}
.card{background:#fff;border:.5pt solid ${B.deep}26;border-radius:1.6mm;padding:1.6mm 2mm;margin-top:1.6mm}
.ft{position:absolute;left:7mm;right:7mm;bottom:5.4mm;display:flex;justify-content:space-between;font-size:4.4pt;color:#6B655C}
.grow{flex:1;min-height:0}
.dots{flex:1;margin-top:2mm;background-image:radial-gradient(circle,${B.deep}55 .32mm,transparent .4mm);background-size:5mm 5mm;background-position:0 0}
table{border-collapse:collapse;width:100%}
td,th{border:.4pt solid ${B.deep}33;font-size:5pt;height:5.4mm;text-align:center;font-weight:500;color:${B.deep}}
th{height:4mm;font-weight:600}
.box{display:inline-block;width:11mm;height:6mm;border:.7pt solid ${B.deep};border-radius:1.6mm;background:#fff}
.dot5{display:inline-flex;gap:1.2mm}.dot5 b{width:2.4mm;height:2.4mm;border:.6pt solid ${B.acc};border-radius:50%;display:inline-block}
`;

function build(key) {
  const B = BOOKS[key];
  const P = [];
  let n = 0;
  const pg = (body, { title, sub, plain, fill } = {}) => {
    n++;
    if (fill) body += `<div style="flex:1;min-height:0;overflow:hidden">${(fill === 'C' ? C : L)(30)}</div>`;
    P.push(`<section class="pg"><div class="fr"></div><div class="fr2"></div><div class="in">${title ? `<div style="display:flex;gap:1.6mm;align-items:flex-start">${flower(B.acc, 18)}<div><div class="br">Larkspur &amp; Co.</div><h1>${title}</h1>${sub ? `<div class="sub">${sub}</div>` : ''}</div></div>` : ''}${body}</div>${plain ? '' : `<div class="ft"><span>${B.name}</span><span>${n}</span></div>`}</section>`);
  };
  const L = (k) => Array.from({ length: k }, () => '<div class="ln"></div>').join('');
  const C = (k, items = []) => Array.from({ length: k }, (_, i) => `<div class="cb"><i></i><span style="font-size:5.6pt;padding-bottom:.6mm">${items[i] || ''}</span></div>`).join('');
  const dots5 = '<span class="dot5"><b></b><b></b><b></b><b></b><b></b></span>';
  const fill = () => '<div class="grow" style="display:flex;flex-direction:column;justify-content:flex-start;overflow:hidden">' + L(22) + '</div>';

  // 1 cover
  n++;
  P.push(`<section class="pg"><div class="fr"></div><div class="fr2"></div><div class="in" style="align-items:center;text-align:center">
<div class="br" style="margin-top:7mm">Larkspur &amp; Co.</div><div style="margin-top:12mm">${flower(B.acc, 92)}</div>
<div style="margin-top:12mm;font-size:22pt;font-weight:700;color:${B.deep};line-height:1">${B.name}</div>
<div style="font-size:7pt;margin-top:2.4mm;color:#3A352F">${B.sub}</div>
${key === 'quest' ? `<div style="display:flex;gap:4mm;justify-content:center;margin-top:5mm">${BR.map(([, s, c]) => SHAPES[s](c, 11)).join('')}</div>` : ''}
<div class="spacer" style="flex:1"></div><div style="font-size:5pt;color:#6B655C">No. ______ &nbsp;·&nbsp; Started ____________</div></div></section>`);
  // 2 inside cover
  pg(`<div class="lab" style="margin-top:6mm">This book belongs to</div>${L(2)}<div class="lab">If found, please contact</div>${L(2)}<div class="lab">Started</div>${L(1)}<div class="lab">Finished</div>${L(1)}<div class="spacer" style="flex:1"></div><div style="font-size:5pt;color:#6B655C;line-height:1.5">Printable pocket book · Personal use only<br>© ${new Date().getFullYear()} Larkspur &amp; Co. · etsy.com/shop/LarkspurCoDigital</div>`, {});
  const HOW = {
    quest: ['Fill in your Character page and pick up to five tiny habits, one per branch.', 'Each week: write a main quest and a few side quests, then tick the habit grid.', 'Rest days count. Tick Rest and it counts as one tick for any branch.', 'Every 5 ticks fills a bubble on the Skill Tree. Claim loot as you go.', 'No streaks, no penalties. A game you cannot lose.'],
    today: ['One page per day. Write the date and how much energy you have.', 'Pick your Top 3. If that\'s too many today, pick one.', 'Tiny tasks are two minutes or less. They count.', 'End the day with one good thing. Missed days just get skipped.'],
    lists: ['One list per page: shopping, ideas, errands, packing, anything.', 'Number the pages in the index so you can find lists again.', 'Brain-dump first, sort later.', 'Tick things off. Cross things out. Both are progress.'],
    prayer: ['One page per day or per prayer time.', 'Write a verse or reference, what you\'re thankful for and who you\'re praying for.', 'When a prayer is answered, note it on the Answered pages at the back.', 'Short and honest is perfect.'],
    gratitude: ['Each day, write three good things, however small.', 'Add one thing that made you smile.', 'On hard days, one is enough.', 'Read back through the book when you need a lift.'],
    notes: ['Dot grid pages for notes, sketches, lists and plans.', 'Number your pages and use the index to find things.', 'Carry it everywhere. It\'s meant to get a bit battered.'],
  };
  pg(`${C(0)}<div style="margin-top:3mm">${HOW[key].map((t, i) => `<div style="display:flex;gap:1.6mm;margin:1.6mm 0;font-size:6.2pt;line-height:1.35"><b style="flex:none;width:3.6mm;height:3.6mm;border-radius:50%;background:${B.deep};color:#fff;font-size:4.6pt;display:flex;align-items:center;justify-content:center">${i + 1}</b><span>${t}</span></div>`).join('')}</div>`, { title: 'How to use', sub: 'Ten seconds to start. No rules to break.' });

  const content = [];
  const add = (fn) => content.push(fn);
  if (key === 'quest') {
    add(() => pg(`<div class="lab">Name</div>${L(1)}<div class="lab">Class / calling</div>${L(1)}${BR.map(([nm, s, c]) => `<div class="card" style="display:flex;align-items:center;gap:2mm">${SHAPES[s](c, 10)}<div style="flex:1"><b style="font-size:7pt;color:${B.deep}">${nm}</b><div class="ln" style="height:4mm"></div></div><span style="font-size:4.6pt;color:${B.acc}">LV</span><span class="box" style="width:7mm;height:5mm"></span></div>`).join('')}<div class="lab">My boss (the thing I avoid)</div>${L(1)}`, { title: 'Character', sub: 'Become the person you are tracking.', fill: 'L' }));
    add(() => pg(['Common · a week of tiny wins', 'Rare · fill a bubble', 'Epic · finish a quest', 'Legendary · level up'].map((t) => `<div class="lab">${t}</div>${L(2)}`).join('') + '<div class="lab">Buffs (what helps)</div>' + L(2) + '<div class="lab">Debuffs (what drains me)</div>' + L(2), { title: 'Loot Table', sub: 'Your reward menu. Earn it, claim it.', fill: 'L' }));
    add(() => pg(BR.map(([nm, s, c]) => `<div class="card"><div style="display:flex;gap:1.4mm;align-items:center">${SHAPES[s](c, 8)}<b style="font-size:6.4pt;color:${B.deep}">${nm}</b></div>${C(2)}</div>`).join(''), { title: 'Tiny Quests', sub: 'Two minutes or less, for low days. Write your own.' }));
    for (let w = 1; w <= 4; w++) {
      add(() => pg(`<div class="lab">Main quest</div>${L(2)}<div class="lab">Reward</div>${L(1)}<div class="lab">Side quests</div>${C(7)}`, { title: `Week ${w} · Quests`, sub: 'One main quest, a few side quests.', fill: 'C' }));
      add(() => pg(`<table style="margin-top:2mm"><tr><th style="width:20%"></th>${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d) => `<th>${d}</th>`).join('')}</tr>${BR.map(([nm, s, c]) => `<tr><td style="text-align:left;padding-left:1mm">${SHAPES[s](c, 7)}</td>${'<td></td>'.repeat(7)}</tr>`).join('')}<tr><td>Rest</td>${'<td></td>'.repeat(7)}</tr><tr><td>Energy</td>${'<td></td>'.repeat(7)}</tr></table>
<div class="lab">Habits this week</div>${BR.map(([nm, s, c]) => `<div class="cb" style="gap:1.4mm">${SHAPES[s](c, 7)}<span></span></div>`).join('')}<div class="lab">Feats (one-off wins)</div>${L(2)}`, { title: `Week ${w} · Tracker`, sub: 'Tick a box for each habit you did.', fill: 'L' }));
      add(() => pg(`<div class="lab">Wins</div>${L(4)}<div class="lab">What was hard</div>${L(3)}<div class="lab">Loot claimed</div>${L(2)}<div class="lab">Notes</div>${L(3)}`, { title: `Week ${w} · Log`, sub: 'Count it up, carry it on.', fill: 'L' }));
    }
    add(() => pg(`<div style="display:flex;justify-content:space-around;margin-top:3mm">${BR.map(([nm, s, c]) => `<div style="display:flex;flex-direction:column;align-items:center;gap:1.1mm">${SHAPES[s](c, 9)}${Array.from({ length: 12 }, (_, i) => `<div style="width:4.4mm;height:4.4mm;border-radius:50%;border:.7pt solid ${c};${(12 - i) % 4 === 0 ? `box-shadow:0 0 0 .6mm ${B.bg},0 0 0 .9mm ${c}` : ''}"></div>`).join('')}</div>`).join('')}</div><div style="font-size:5.4pt;margin-top:3mm;color:#6B655C">Every 5 ticks fills one bubble. Rings mark a level.</div>`, { title: 'Skill Tree', sub: 'Fill it from the bottom up.' }));
    add(() => pg(`<div style="margin-top:2mm">${BR.map(([nm, s, c]) => `<div style="display:flex;align-items:center;gap:2mm;margin:1.4mm 0">${SHAPES[s](c, 9)}<b style="font-size:6.4pt;color:${B.deep};width:12mm">${nm}</b><span class="box"></span><span class="box"></span></div>`).join('')}</div><div style="font-size:4.6pt;color:#6B655C">Ticks · Bubbles</div><div class="lab">Proud of</div>${L(2)}<div class="lab">Next month I'll change</div>${L(2)}`, { title: 'Month\'s End', sub: 'Count it up, then start a fresh book.', fill: 'L' }));
    while (content.length < 28) add(() => pg('<div class="dots"></div>', { title: 'Notes', sub: '' }));
  } else if (key === 'today') {
    for (let i = 0; i < 28; i++) add(() => pg(`<div style="display:flex;justify-content:space-between;align-items:center;margin-top:1mm"><span style="font-size:5pt;color:${B.acc};font-weight:600;letter-spacing:.12em">DATE ________</span><span style="font-size:5pt;color:#6B655C">Energy ${dots5}</span></div><div class="lab">Top 3</div>${C(3)}<div class="lab">Tiny tasks</div>${C(4)}<div class="lab">Notes</div>${L(5)}<div class="lab">One good thing</div>${L(1)}`, { title: 'Today', sub: '', fill: 'L' }));
  } else if (key === 'lists') {
    add(() => pg(`<div class="lab">Index</div>${Array.from({ length: 16 }, () => '<div class="cb" style="justify-content:space-between"><span></span><span style="font-size:5pt;color:#6B655C;padding-bottom:.6mm">p. ___</span></div>').join('')}`, { title: 'Index', sub: 'Name each list and its page.' }));
    for (let i = 0; i < 27; i++) add(() => pg(`<div class="lab">List</div>${L(1)}${C(15)}`, { title: i % 3 === 0 ? 'To do' : i % 3 === 1 ? 'List' : 'Brain dump', sub: '', fill: 'C' }));
  } else if (key === 'prayer') {
    for (let i = 0; i < 25; i++) add(() => pg(`<div style="display:flex;justify-content:space-between;margin-top:1mm"><span style="font-size:5pt;color:${B.acc};font-weight:600;letter-spacing:.12em">DATE ________</span><span style="font-size:5pt;color:${B.acc};font-weight:600;letter-spacing:.12em">VERSE ____________</span></div><div class="lab">Thank you for</div>${L(3)}<div class="lab">Praying for</div>${C(5)}<div class="lab">On my heart</div>${L(4)}`, { title: 'Prayer', sub: '', fill: 'L' }));
    for (let i = 0; i < 3; i++) add(() => pg(`<table style="margin-top:2mm"><tr><th style="width:18%">Date</th><th>Prayer</th><th style="width:22%">Answered</th></tr>${'<tr><td></td><td></td><td></td></tr>'.repeat(17)}</table>`, { title: 'Answered', sub: 'Notice the answers, including "not yet".' }));
  } else if (key === 'gratitude') {
    for (let i = 0; i < 28; i++) add(() => pg(`${[0, 1].map(() => `<div class="card"><div style="font-size:5pt;color:${B.acc};font-weight:600;letter-spacing:.12em">DATE ________</div><div style="display:flex;gap:1.4mm;align-items:flex-end;height:5.4mm;border-bottom:.5pt solid ${B.deep}22"><b style="font-size:6pt;color:${B.deep}">1</b></div><div style="display:flex;gap:1.4mm;align-items:flex-end;height:5.4mm;border-bottom:.5pt solid ${B.deep}22"><b style="font-size:6pt;color:${B.deep}">2</b></div><div style="display:flex;gap:1.4mm;align-items:flex-end;height:5.4mm;border-bottom:.5pt solid ${B.deep}22"><b style="font-size:6pt;color:${B.deep}">3</b></div><div class="lab" style="margin-top:1.4mm">Made me smile</div><div class="ln"></div></div>`).join('')}`, { title: 'Three good things', sub: '' }));
  } else {
    add(() => pg(`<div class="lab">Index</div>${Array.from({ length: 16 }, () => '<div class="cb" style="justify-content:space-between"><span></span><span style="font-size:5pt;color:#6B655C;padding-bottom:.6mm">p. ___</span></div>').join('')}`, { title: 'Index', sub: '' }));
    for (let i = 0; i < 27; i++) add(() => pg('<div class="dots" style="margin-top:0"></div>', {}));
  }
  if (content.length !== 28) throw new Error(`${key}: ${content.length} content pages`);
  content.forEach((f) => f());
  // 32 back cover
  n++;
  P.push(`<section class="pg"><div class="fr"></div><div class="fr2"></div><div class="in" style="align-items:center;text-align:center;justify-content:center">
${flower(B.acc, 34)}<div class="br" style="margin-top:3mm">Larkspur &amp; Co.</div>
<div style="font-size:5.6pt;margin-top:6mm;line-height:1.9;color:${B.deep}">The Pocket Book series<br>${Object.values(BOOKS).map((b) => b.name).join(' · ')}</div>
<div style="font-size:5pt;margin-top:8mm;color:#6B655C">Designed in Glasgow · larkspurco.uk</div></div></section>`);
  if (P.length !== 32) throw new Error(`${key}: ${P.length} pages`);
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css(B)}.spacer{flex:1}</style></head><body>${P.join('')}</body></html>`;
}

(async () => {
  const only = process.argv[2];
  const out = path.join(__dirname, 'out', 'pocket');
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  for (const key of Object.keys(BOOKS)) {
    if (only && only !== key) continue;
    const B = BOOKS[key];
    const html = path.join(out, `${key}.html`);
    fs.writeFileSync(html, build(key));
    const p = await browser.newPage();
    await p.goto('file://' + html);
    await p.evaluate(() => document.fonts.ready);
    const over = await p.evaluate(() => [...document.querySelectorAll('.in')].map((e, i) => (e.scrollHeight > e.clientHeight + 1 ? i + 1 : 0)).filter(Boolean));
    if (over.length) console.log(key, 'OVERFLOW pages', over.join(','));
    const fname = B.name.replace(/ /g, '-');
    const a6 = path.join(out, `${fname}-A6-pages.pdf`);
    await p.pdf({ path: a6, width: '105mm', height: '148mm', printBackground: true, preferCSSPageSize: true });
    await p.close();
    execFileSync('python3', ['-I', path.join(__dirname, 'impose.py'), a6, path.join(out, `${fname}-PRINT-AT-HOME-A4.pdf`)]);
    console.log(key, 'done');
  }
  await browser.close();
})();
module.exports = { BOOKS };
