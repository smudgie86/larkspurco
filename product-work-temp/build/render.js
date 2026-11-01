// Usage: node render.js <slug> [--png 1,3,5]
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const { SIZES, renderDoc } = require('./lib');

// Fill leftover space at the bottom of each page so nothing looks unfinished.
function autofill() {
  const MM = 3.7795;
  const freeOf = (b) => {
    const last = b.lastElementChild;
    if (!last) return 0;
    return b.getBoundingClientRect().bottom - last.getBoundingClientRect().bottom;
  };
  document.querySelectorAll('.page').forEach((p) => {
    if (p.classList.contains('nofill') || p.classList.contains('cover')) return;
    const b = p.querySelector('.body');
    if (!b) return;
    let free = freeOf(b);
    // 1. Taller table rows in a .tbl-fill table.
    const tf = b.querySelector('.tbl-fill table');
    if (tf) {
      const inner = tf.parentElement.clientHeight - tf.getBoundingClientRect().height;
      const avail = free + Math.max(0, inner) - 2;
      const rows = tf.querySelectorAll('tbody tr');
      const cur = rows[0].getBoundingClientRect().height;
      const add = Math.min(avail / rows.length, 11.5 * MM - cur);
      if (add > 0) rows.forEach((r) => r.querySelectorAll('td').forEach((td) => (td.style.height = cur + add + 'px')));
      tf.parentElement.style.flex = 'none';
      free = freeOf(b);
    }
    if (free < 10 * MM) return;
    const last = b.lastElementChild;
    const grow = (el) => {
      el.style.flex = '1';
      el.querySelectorAll('.lines.fixed').forEach((l) => { l.classList.remove('fixed'); l.style.height = ''; l.style.flex = '1'; });
    };
    const linedBoxes = (el) => [...el.querySelectorAll(':scope > .box, :scope > .col > .box')].filter((x) => x.querySelector('.lines'));
    if (last.classList.contains('box') && last.querySelector('.lines')) { grow(last); return; }
    if (/(^| )(g2|g3|row)( |$)/.test(last.className) && linedBoxes(last).length) {
      last.style.flex = '1';
      last.style.alignItems = 'stretch';
      last.querySelectorAll(':scope > .box, :scope > .col').forEach((x) => { x.style.flex = '1'; });
      linedBoxes(last).forEach((bx) => { bx.style.flex = '1'; bx.querySelectorAll('.lines.fixed').forEach((l) => { l.classList.remove('fixed'); l.style.height = ''; }); });
      return;
    }
    if (free > 27 * MM) {
      const nb = document.createElement('div');
      nb.className = 'box fill';
      nb.innerHTML = '<div class="label">Notes</div><div class="lines"></div>';
      b.appendChild(nb);
    }
  });
}

// Swap gradient rules for real lines so they print crisp and evenly spaced.
function realLines() {
  const MM = 3.7795;
  document.querySelectorAll('.lines').forEach((l) => {
    const lh = parseFloat(getComputedStyle(l).getPropertyValue('--lh')) || 7.5;
    const h = l.getBoundingClientRect().height;
    const n = Math.floor(h / (lh * MM) + 0.05);
    l.style.backgroundImage = 'none';
    l.style.height = h + 'px';
    l.style.flex = 'none';
    l.innerHTML = Array.from({ length: n }, () => `<div style="height:${lh}mm;border-bottom:.6pt solid var(--line)"></div>`).join('');
  });
}

// Find every write-in area so the PDF can get type-in fields.
function collectFields() {
  const MM = 3.7795;
  const out = [];
  const pages = [...document.querySelectorAll('.page')];
  pages.forEach((p, pi) => {
    if (p.classList.contains('cover') || p.classList.contains('nofields')) return;
    const pr = p.getBoundingClientRect();
    const add = (t, x, y, w, h) => { if (w > 4 && h > 4) out.push({ p: pi, t, x: x - pr.left, y: y - pr.top, w, h }); };
    p.querySelectorAll('.field i').forEach((el) => { const r = el.getBoundingClientRect(); add('text', r.left, r.bottom - 5.2 * MM, r.width, 5 * MM); });
    p.querySelectorAll('.lines').forEach((el) => { if (el.closest('.nofields')) return; const r = el.getBoundingClientRect(); add('multi', r.left, r.top, r.width, r.height); });
    p.querySelectorAll('.cb').forEach((el) => {
      if (el.closest('.nofields')) return;
      const r = el.getBoundingClientRect();
      add('check', r.left, r.top + 0.5 * MM, 3.4 * MM, 3.4 * MM);
      if (el.classList.contains('line') && !el.textContent.trim()) add('text', r.left + 5.8 * MM, r.top, r.width - 5.8 * MM, Math.min(r.height, 6 * MM));
    });
    p.querySelectorAll('table.grid tbody td').forEach((td) => {
      if (td.closest('.nofields') || td.textContent.trim() || td.children.length) return;
      const r = td.getBoundingClientRect();
      add(r.height > 13 * MM ? 'multi' : 'text', r.left + 0.6, r.top + 0.6, r.width - 1.2, r.height - 1.2);
    });
  });
  return out;
}

(async () => {
  const slug = process.argv[2];
  const pngArg = process.argv.indexOf('--png');
  const pngPages = pngArg > 0 ? process.argv[pngArg + 1].split(',').map(Number) : [];
  const product = require(`./products/${slug}.js`);
  const outDir = path.join(__dirname, 'out', slug);
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  let problems = 0;
  const sizes = product.sizes || { A4: SIZES.A4, Letter: SIZES.Letter };
  for (const key of Object.keys(sizes)) {
    const size = sizes[key];
    const html = renderDoc(product, size);
    const htmlPath = path.join(outDir, `${slug}-${key}.html`);
    fs.writeFileSync(htmlPath, html);
    const pg = await browser.newPage({ viewport: { width: Math.round(size.w * 3.7795), height: Math.round(size.h * 3.7795) } });
    await pg.goto('file://' + htmlPath);
    await pg.evaluate(() => document.fonts.ready);
    await pg.evaluate(autofill);
    await pg.evaluate(realLines);
    const over = await pg.evaluate(() => {
      const res = [];
      document.querySelectorAll('.page').forEach((p, i) => {
        const b = p.querySelector('.body');
        if (b && (b.scrollHeight > b.clientHeight + 2 || b.scrollWidth > b.clientWidth + 2)) res.push(`p${i + 1} body +${b.scrollHeight - b.clientHeight}px`);
        p.querySelectorAll('.box, .tbl-fill, .grow').forEach((x) => {
          if (x.scrollHeight > x.clientHeight + 2) res.push(`p${i + 1} ${x.className} +${x.scrollHeight - x.clientHeight}px`);
        });
        const inner = p.querySelector('.inner');
        if (inner && inner.scrollHeight > inner.clientHeight + 2) res.push(`p${i + 1} cover +${inner.scrollHeight - inner.clientHeight}`);
      });
      return res;
    });
    if (over.length) { problems += over.length; console.log(`[${key}] OVERFLOW:`, over.join(' | ')); }
    const pdfName = `${product.file}-${key}.pdf`;
    await pg.pdf({ path: path.join(outDir, pdfName), width: `${size.w}mm`, height: `${size.h}mm`, printBackground: true, preferCSSPageSize: true });
    if (product.fillable) {
      const fields = await pg.evaluate(collectFields);
      const fj = path.join(outDir, `fields-${key}.json`);
      fs.writeFileSync(fj, JSON.stringify(fields));
      const pdfPath = path.join(outDir, pdfName);
      execFileSync('python3', ['-I', path.join(__dirname, 'addfields.py'), pdfPath, fj, pdfPath + '.tmp']);
      fs.renameSync(pdfPath + '.tmp', pdfPath);
      fs.unlinkSync(fj);
      console.log(`  ${fields.length} fillable fields`);
    }
    if (product.links) execFileSync('python3', [path.join(__dirname, 'fixlinks.py'), path.join(outDir, pdfName)]);
    if (key === Object.keys(sizes)[0] && pngPages.length) {
      const els = await pg.$$('.page');
      for (const n of pngPages) {
        await els[n - 1].screenshot({ path: path.join(outDir, `page-${String(n).padStart(2, '0')}.png`) });
      }
    }
    await pg.close();
    console.log(`${pdfName}: ${product.pages.length} pages`);
  }
  await browser.close();
  if (problems) process.exitCode = 1;
})();
