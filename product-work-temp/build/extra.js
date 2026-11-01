// Extra 2000x2000 listing images showing bonus files (templates, spreadsheets, bundles).
// Usage: node extra.js <slug>   (writes out/<slug>/marketing/etsy-6.jpg, etsy-7.jpg ...)
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { url } = require('./lib');

const Q = path.join(__dirname, '..', 'qa', 'hi');
const q = (f) => 'file://' + path.join(Q, f);
const BASE = `
@font-face{font-family:Poppins;font-weight:400;src:url(${url('fonts/Poppins-Regular.ttf')})}
@font-face{font-family:Poppins;font-weight:600;src:url(${url('fonts/Poppins-SemiBold.ttf')})}
@font-face{font-family:Poppins;font-weight:700;src:url(${url('fonts/Poppins-Bold.ttf')})}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:Poppins;color:#3A352F;background:#FBF7F1}
.c{position:absolute;border-radius:50%}
.brand{display:flex;align-items:center;gap:18px;font-size:30px;letter-spacing:.3em;font-weight:600;color:#CC8B6D;text-transform:uppercase}
.brand img{width:52px}
h1{color:#47503E;font-weight:700;line-height:1.04}
.sh{box-shadow:0 24px 60px rgba(58,53,47,.18),0 4px 12px rgba(58,53,47,.08);border-radius:6px;background:#fff;display:block}
.cap{font-size:32px;font-weight:600;color:#47503E;text-align:center;margin-top:22px}
.pt{display:flex;gap:22px;align-items:flex-start;margin-bottom:30px;font-size:40px;line-height:1.3}
.pt b{flex:none;width:48px;height:48px;border-radius:50%;background:#7C8B6B;color:#fff;font-size:28px;display:flex;align-items:center;justify-content:center;margin-top:4px;font-weight:400}
`;
const brand = `<div class="brand"><img src="${url('img/flower.png')}">Larkspur &amp; Co.</div>`;
const frame = (title, sub, inner, deco = 'tr') => `<div style="width:2000px;height:2000px;position:relative;overflow:hidden">
${deco === 'tr' ? '<div class="c" style="width:800px;height:800px;right:-280px;top:-330px;background:#F3E1D6"></div><div class="c" style="width:260px;height:260px;right:150px;top:100px;background:#7C8B6B"></div>' : '<div class="c" style="width:900px;height:900px;left:-320px;bottom:-360px;background:#E4E9DD"></div>'}
<div style="position:absolute;left:120px;top:120px">${brand}</div>
<div style="position:absolute;left:120px;top:210px;width:1450px;display:flex;flex-direction:column;gap:22px"><h1 style="font-size:96px">${title}</h1><div style="font-size:40px;color:#6B655C;line-height:1.35">${sub}</div></div>
${inner}</div>`;

const X = {
  legacy: [
    frame('Plus a Life Admin spreadsheet', 'Works in Excel, Google Sheets and Numbers.',
      `<img class="sh" src="${q('la-1.png')}" style="position:absolute;left:120px;top:520px;width:1180px">
<img class="sh" src="${q('la-2.png')}" style="position:absolute;left:820px;top:1150px;width:1060px;transform:rotate(2deg)">
<div style="position:absolute;left:120px;top:1290px;width:640px">${['Savings, pensions and debts added up', 'Monthly bills by category', 'Insurance renewals flagged 60 days ahead', 'Filled-in example included'].map((p) => `<div class="pt"><b>✓</b><div>${p}</div></div>`).join('')}</div>`, 'bl'),
  ],
  bereavement: [
    frame('Editable order of service', 'Three designs in Word. Change the words, swap in your photos, print on A4 and fold to A5.',
      `<div style="position:absolute;left:120px;top:500px;width:1760px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:60px">
${[['ofs-front-1.png', 'Larkspur'], ['ofs-front-2.png', 'Classic'], ['ofs-front-3.png', 'Celebration of Life']].map(([f, c]) => `<div><img class="sh" src="${q(f)}" style="width:100%"><div class="cap">${c}</div></div>`).join('')}</div>
<img class="sh" src="${q('Order of Service 1 - Larkspur-2.png')}" style="position:absolute;left:470px;top:1250px;width:1060px">`),
    frame('Sign, thank-you &amp; memory cards', 'Also editable in Word, ready to personalise.',
      `<div style="position:absolute;left:120px;top:540px;width:1760px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:60px;align-items:start">
${[['Memorial Welcome Sign', 'Welcome sign (A4, scales to A3)'], ['Thank You Cards', 'Thank-you cards, 4 per page'], ['Memory Cards', '"Share a memory" cards']].map(([f, c]) => `<div><img class="sh" src="${q(f + '-1.png')}" style="width:100%"><div class="cap">${c}</div></div>`).join('')}</div>
<div style="position:absolute;left:120px;top:1480px;width:1760px;background:#E4E9DD;border-radius:40px;padding:56px 66px;font-size:40px;line-height:1.55">Opens in Word, Pages, Google Docs and LibreOffice. A step-by-step "how to edit and print" guide is included. Four public-domain readings are included, free to print.</div>`, 'bl'),
  ],
};

(async () => {
  const slug = process.argv[2];
  const list = X[slug];
  const mk = path.join(__dirname, 'out', slug, 'marketing');
  fs.mkdirSync(mk, { recursive: true });
  const browser = await chromium.launch();
  for (let i = 0; i < list.length; i++) {
    const pg = await browser.newPage({ viewport: { width: 2000, height: 2000 } });
    const f = path.join(mk, '_x.html');
    fs.writeFileSync(f, `<!doctype html><html><head><meta charset="utf-8"><style>${BASE}</style></head><body>${list[i]}</body></html>`);
    await pg.goto('file://' + f);
    await pg.evaluate(() => document.fonts.ready);
    await pg.waitForTimeout(200);
    await pg.screenshot({ path: path.join(mk, `etsy-${6 + i}.jpg`), type: 'jpeg', quality: 90 });
    await pg.close();
    fs.unlinkSync(f);
  }
  await browser.close();
  console.log(slug, 'extras:', list.length);
})();
