// Shared page components for Larkspur & Co. printables.
const path = require('path');
const ROOT = __dirname;
const url = (p) => 'file://' + path.join(ROOT, p);

const SIZES = {
  A4: { w: 210, h: 297, label: 'A4' },
  Letter: { w: 215.9, h: 279.4, label: 'US Letter' },
};

const esc = (s) => String(s).replace(/&(?!amp;|lt;|gt;|#)/g, '&amp;');

function css(size) {
  return `
@font-face{font-family:Poppins;font-weight:400;src:url(${url('fonts/Poppins-Regular.ttf')})}
@font-face{font-family:Poppins;font-weight:500;src:url(${url('fonts/Poppins-Medium.ttf')})}
@font-face{font-family:Poppins;font-weight:600;src:url(${url('fonts/Poppins-SemiBold.ttf')})}
@font-face{font-family:Poppins;font-weight:700;src:url(${url('fonts/Poppins-Bold.ttf')})}
:root{--clay:#CC8B6D;--clay-deep:#94502F;--clay-light:#F3E1D6;--cream:#FBF7F1;--ink:#3A352F;--ink-soft:#6B655C;--line:#E2D7C6;--sage:#7C8B6B;--sage-deep:#47503E;--sage-light:#E4E9DD}
@page{size:${size.w}mm ${size.h}mm;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
html,body{font-family:Poppins,sans-serif;color:var(--ink);font-size:9.6pt;line-height:1.5;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:${size.w}mm;height:${size.h}mm;padding:12mm 14mm 10mm;display:flex;flex-direction:column;position:relative;overflow:hidden;page-break-after:always;background:#fff}
.ph{display:flex;justify-content:space-between;align-items:center;font-size:6.6pt;letter-spacing:.22em;text-transform:uppercase;color:var(--clay);font-weight:600;margin-bottom:5mm;position:relative;z-index:2}
.ph .sect{color:var(--sage)}
.pf{display:flex;justify-content:space-between;font-size:6.4pt;color:var(--ink-soft);margin-top:4mm;padding-top:2mm;border-top:.6pt solid var(--line);position:relative;z-index:2}
.body{flex:1;display:flex;flex-direction:column;min-height:0;gap:3.6mm;position:relative;z-index:2}
.kicker{font-size:7.4pt;letter-spacing:.2em;text-transform:uppercase;color:var(--clay);font-weight:600}
h1{font-size:25pt;line-height:1.08;color:var(--sage-deep);font-weight:700;letter-spacing:-.01em}
h1.sm{font-size:20pt}
h2{font-size:13pt;color:var(--sage-deep);font-weight:600;line-height:1.25}
h3{font-size:10pt;color:var(--clay-deep);font-weight:600;line-height:1.3}
.lead{font-size:11pt;color:var(--ink);line-height:1.45}
p{max-width:165mm}
p+p{margin-top:2mm}
.muted{color:var(--ink-soft)}
.small{font-size:8pt}
.tiny{font-size:7pt}
ul.dots{padding-left:4.5mm}
ul.dots li{margin:.8mm 0}
ul.dots li::marker{color:var(--clay)}
.box{border:.9pt solid var(--line);border-radius:3.5mm;padding:3.4mm 4mm;display:flex;flex-direction:column;min-height:0}
.box.fill{flex:1}
.box.cream{background:var(--cream)}
.box.clay{background:var(--clay-light);border-color:var(--clay-light)}
.box.sage{background:var(--sage-light);border-color:var(--sage-light)}
.label{font-size:7pt;letter-spacing:.16em;text-transform:uppercase;color:var(--clay-deep);font-weight:600;margin-bottom:1.6mm}
.label.sage{color:var(--sage-deep)}
.lines{flex:1;min-height:7mm;background-image:repeating-linear-gradient(to bottom,transparent 0,transparent calc(var(--lh,7.5mm) - .5pt),var(--line) calc(var(--lh,7.5mm) - .5pt),var(--line) var(--lh,7.5mm))}
.lines.fixed{flex:none}
.row{display:flex;gap:4mm;min-height:0}
.row>*{flex:1;min-width:0}
.grow{flex:1;min-height:0}
.col{display:flex;flex-direction:column;gap:3.6mm;min-height:0}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:4mm}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:3.5mm}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:3mm}
.cb{display:flex;gap:2.4mm;align-items:flex-start;margin:1.1mm 0;line-height:1.38}
.cb::before{content:"";flex:none;width:3.4mm;height:3.4mm;border:.9pt solid var(--sage);border-radius:1mm;margin-top:.5mm;background:#fff}
.cb.line{border-bottom:.6pt solid var(--line);padding-bottom:1.3mm;min-height:6.4mm}
.field{display:flex;align-items:flex-end;gap:2mm;font-size:8.2pt;color:var(--ink-soft);margin:1.4mm 0}
.field span{white-space:nowrap}
.field i{flex:1;border-bottom:.7pt solid var(--line);height:5mm}
table.grid{width:100%;border-collapse:collapse;font-size:8pt}
table.grid th{font-size:6.8pt;letter-spacing:.12em;text-transform:uppercase;color:var(--clay-deep);font-weight:600;text-align:left;padding:1.4mm 1.6mm;border-bottom:1pt solid var(--clay)}
table.grid td{border-bottom:.6pt solid var(--line);padding:0 1.6mm;height:var(--rh,7.6mm);vertical-align:middle}
table.grid td+td,table.grid th+th{border-left:.6pt solid var(--line)}
table.grid.tight td{height:6.2mm}
.tbl-fill{flex:1;min-height:0;overflow:hidden}
.dots5{display:inline-flex;gap:1.6mm;vertical-align:middle}
.dots5 b{width:3.6mm;height:3.6mm;border:.9pt solid var(--clay);border-radius:50%;display:inline-block}
.circle{position:absolute;border-radius:50%;z-index:0}
.tag{display:inline-block;background:var(--clay);color:#fff;border-radius:20mm;padding:1mm 3.4mm;font-size:7.4pt;font-weight:500}
.tag.sage{background:var(--sage)}
.tag.light{background:var(--clay-light);color:var(--clay-deep)}
.num{font-size:30pt;font-weight:700;color:var(--clay);line-height:1}
.quote{font-size:12pt;font-weight:500;color:var(--sage-deep);line-height:1.4;border-left:1.2mm solid var(--clay);padding-left:4mm}
.callout{background:var(--clay-light);border-radius:3.5mm;padding:3.4mm 4.2mm}
.callout.sage{background:var(--sage-light)}
.toc{display:flex;justify-content:space-between;border-bottom:.6pt dotted var(--line);padding:1.3mm 0;font-size:9pt}
.toc b{font-weight:500}
.center{text-align:center}
.spacer{flex:1}
.step{display:flex;gap:3mm;align-items:flex-start;margin:1.6mm 0}
.step .n{flex:none;width:6mm;height:6mm;border-radius:50%;background:var(--sage);color:#fff;font-weight:600;font-size:8pt;display:flex;align-items:center;justify-content:center;margin-top:.2mm}
.cover{background:var(--cream);padding:0}
.cover .inner{position:relative;z-index:2;padding:22mm 18mm 16mm;display:flex;flex-direction:column;height:100%}
.cover h1{font-size:44pt;line-height:1.02;margin-top:6mm}
.cover .lead{font-size:14pt;margin-top:5mm;max-width:120mm;color:var(--ink)}
.cover .stem{position:absolute;right:-8mm;bottom:8mm;width:120mm;z-index:1;opacity:.95}
.secpage{background:var(--cream)}
.secpage h1{font-size:34pt}
.page.has-tr h1{max-width:128mm}
.box h3+p,.box h3+.small{margin-top:1mm}
.wk{display:grid;grid-template-columns:repeat(7,1fr);gap:0;border:.8pt solid var(--line);border-radius:2.5mm;overflow:hidden}
.wk div{border-right:.6pt solid var(--line);padding:1.4mm;font-size:7pt;color:var(--ink-soft);text-transform:uppercase;letter-spacing:.1em}
.wk div:last-child{border-right:none}
`;
}

// Decorative circles in the brand style.
function circles(kind = 'tr') {
  if (kind === 'tr')
    return `<div class="circle" style="width:70mm;height:70mm;right:-22mm;top:-24mm;background:var(--clay-light)"></div><div class="circle" style="width:26mm;height:26mm;right:14mm;top:12mm;background:var(--sage);opacity:.85"></div>`;
  if (kind === 'small')
    return `<div class="circle" style="width:38mm;height:38mm;right:-14mm;top:-14mm;background:var(--clay-light)"></div><div class="circle" style="width:12mm;height:12mm;right:8mm;top:7mm;background:var(--sage);opacity:.8"></div>`;
  if (kind === 'cover')
    return `<div class="circle" style="width:150mm;height:150mm;right:-50mm;top:-55mm;background:var(--clay-light)"></div><div class="circle" style="width:52mm;height:52mm;right:22mm;top:20mm;background:var(--sage);opacity:.9"></div><div class="circle" style="width:90mm;height:90mm;left:-40mm;bottom:-40mm;background:var(--sage-light)"></div>`;
  return '';
}

const lines = (h, lh) => `<div class="lines${h ? ' fixed' : ''}" style="${h ? `height:${h}mm;` : ''}${lh ? `--lh:${lh}mm` : ''}"></div>`;
const cbs = (items, cls = '') => items.map((t) => `<div class="cb ${cls}"><span>${t}</span></div>`).join('');
const blankCbs = (n) => Array.from({ length: n }, () => `<div class="cb line"></div>`).join('');
const field = (label) => `<div class="field"><span>${label}</span><i></i></div>`;
const dots5 = () => `<span class="dots5"><b></b><b></b><b></b><b></b><b></b></span>`;
function table(headers, rows, opts = {}) {
  const widths = opts.widths || [];
  const th = headers.map((h, i) => `<th style="${widths[i] ? `width:${widths[i]}` : ''}">${h}</th>`).join('');
  const body = (Array.isArray(rows) ? rows : Array.from({ length: rows }, () => headers.map(() => '')))
    .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('');
  return `<table class="grid ${opts.cls || ''}" style="${opts.rh ? `--rh:${opts.rh}mm` : ''}"><thead><tr>${th}</tr></thead><tbody>${body}</tbody></table>`;
}
const box = (label, inner, cls = '') => `<div class="box ${cls}">${label ? `<div class="label">${label}</div>` : ''}${inner}</div>`;

// A standard page. `deco` adds corner circles.
function page(body, { sect = '', deco = '', cls = '', noHeader = false } = {}) {
  return { body, sect, deco, cls, noHeader };
}

function renderDoc(product, size) {
  const pages = product.pages.map((pg, i) => {
    const n = i + 1;
    if (pg.raw) return pg.raw(n, size);
    const head = pg.noHeader ? '' : `<div class="ph"><span>Larkspur &amp; Co. <span class="sect">&nbsp;·&nbsp; ${pg.sect || product.short}</span></span></div>`;
    const foot = `<div class="pf"><span>${product.title} · © Larkspur &amp; Co. · For personal use only${product.footnote ? ' · ' + product.footnote : ''}</span><span>${n}</span></div>`;
    return `<section class="page ${pg.cls} ${pg.deco === 'tr' ? 'has-tr' : ''}">${circles(pg.deco)}${head}<div class="body">${pg.body}</div>${foot}</section>`;
  });
  return `<!doctype html><html><head><meta charset="utf-8"><title>${product.title}</title><style>${css(size)}${product.css || ''}</style></head><body>${pages.join('\n')}</body></html>`;
}

// Cover page builder.
function cover({ kicker, title, lead, tags = [], bottom = '' }) {
  return {
    raw: (n, size) => `<section class="page cover">${circles('cover')}<img class="stem" src="${url('img/larkspur-stem.png')}"><div class="inner">
<div style="display:flex;align-items:center;gap:3mm"><img src="${url('img/flower.png')}" style="width:9mm"><span class="kicker" style="letter-spacing:.3em">Larkspur &amp; Co.</span></div>
<div style="margin-top:34mm" class="kicker">${kicker}</div>
<h1>${title}</h1>
<div class="lead">${lead}</div>
<div style="display:flex;gap:2mm;flex-wrap:wrap;margin-top:7mm;max-width:120mm">${tags.map((t, i) => `<span class="tag ${i % 2 ? 'sage' : ''}">${t}</span>`).join('')}</div>
<div class="spacer"></div>
<div class="small muted" style="max-width:110mm">${bottom}</div>
<div class="tiny muted" style="margin-top:3mm">larkspurco.uk · etsy.com/shop/LarkspurCoDigital · ${size.label}</div>
</div></section>`,
  };
}

// Section divider page.
function section({ kicker, title, lead, body = '' }) {
  return page(`<div style="margin-top:30mm" class="kicker">${kicker}</div><h1>${title}</h1><div class="lead" style="max-width:140mm">${lead}</div>${body}`, { cls: 'secpage', deco: 'tr', noHeader: false });
}

module.exports = { SIZES, css, renderDoc, page, cover, section, circles, lines, cbs, blankCbs, field, dots5, table, box, url, esc };
