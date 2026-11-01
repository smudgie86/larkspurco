// Builds a free sample PDF (promo page + sample pages) for a product. Usage: node freebie.js <slug>
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { SIZES, renderDoc, page, box, cbs } = require('./lib');

(async () => {
  const slug = process.argv[2];
  const p = require(`./products/${slug}.js`);
  const sample = p.freebie.map((n) => p.pages[n - 1]);
  const promo = page(`<div class="kicker" style="margin-top:20mm">A free sample from Larkspur &amp; Co.</div>
<h1>${p.title}</h1>
<p class="lead" style="max-width:150mm">Here are two pages from the full ${p.pages.length}-page printable. Print them as often as you like, and if they help, the full version has everything you need.</p>
${box('In the full version', cbs(['All ' + p.pages.length + ' pages, in A4 and US Letter', 'Instant download from Etsy', 'Undated, so you can start any day', 'Print at home as many times as you like']), 'sage')}
<div class="callout"><h3>Get the full version</h3><p>Visit <b>larkspurco.uk</b> or search <b>LarkspurCoDigital</b> on Etsy.</p></div>
<div class="spacer"></div>
<p class="tiny muted">Free for personal use. Please share the link to our website rather than the file itself. Thank you!</p>`, { sect: 'Free sample', deco: 'tr', cls: 'nofill' });
  const product = { ...p, title: p.title + ' (free sample)', pages: [promo, ...sample], css: p.css };
  const out = path.join(__dirname, 'out', slug);
  const size = SIZES.A4;
  const f = path.join(out, 'freebie.html');
  fs.writeFileSync(f, renderDoc(product, size));
  const b = await chromium.launch();
  const pg = await b.newPage();
  await pg.goto('file://' + f);
  await pg.evaluate(() => document.fonts.ready);
  // same space-filling and line passes as the main render
  const r = fs.readFileSync(path.join(__dirname, 'render.js'), 'utf8');
  const fnSrc = (name) => r.slice(r.indexOf(`function ${name}`), r.indexOf('\n}\n', r.indexOf(`function ${name}`)) + 2);
  await pg.evaluate(`(${fnSrc('autofill').replace('function autofill', 'function')})()`);
  await pg.evaluate(`(${fnSrc('realLines').replace('function realLines', 'function')})()`);
  await pg.pdf({ path: path.join(out, `FREE-SAMPLE-${p.file}.pdf`), width: '210mm', height: '297mm', printBackground: true });
  await b.close();
  console.log('freebie', slug, sample.length + 1, 'pages');
})();
