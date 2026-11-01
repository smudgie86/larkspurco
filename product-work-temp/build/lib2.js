// Extra page builders: calendars, cards and common page types.
const { page, lines, cbs, blankCbs, field, table, box } = require('./lib');

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS_MON = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAYS_SUN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CSS2 = `
table.cal{width:100%;}
.grow>table.cal{height:100%}
table.cal{border-collapse:collapse;table-layout:fixed}
table.cal th{font-size:7pt;letter-spacing:.14em;text-transform:uppercase;color:var(--clay-deep);font-weight:600;padding:1.4mm;text-align:left;border-bottom:1pt solid var(--clay)}
table.cal td{border:.6pt solid var(--line);vertical-align:top;padding:1.2mm 1.4mm;height:var(--ch,24mm)}
table.cal td .d{font-size:9pt;font-weight:600;color:var(--sage-deep)}
table.cal td.off .d{color:#C9C1B4}
table.cal td.we{background:#FCFAF6}
table.cal td .h{display:block;font-size:5.8pt;line-height:1.2;color:var(--clay-deep);margin-top:.6mm}
table.mini{border-collapse:collapse;width:100%;font-size:6.6pt;table-layout:fixed}
table.mini th{color:var(--clay-deep);font-weight:600;padding:.5mm 0;text-align:center}
table.mini td{text-align:center;padding:.55mm 0;color:var(--ink)}
table.mini td.hol{color:#fff;background:var(--clay);border-radius:50%}
.cards{display:grid;gap:4mm;flex:1;min-height:0}
.card{border:1pt dashed #C9C1B4;border-radius:4mm;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2mm;background:#fff}
.card .e{font-size:var(--es,24pt);line-height:1.1;font-family:'Noto Color Emoji'}
.card .t{font-size:var(--ts,10pt);font-weight:600;color:var(--sage-deep);margin-top:1.6mm;line-height:1.2}
.emo{font-family:'Noto Color Emoji'}
.qa{display:grid;grid-template-columns:1fr 1fr;gap:3.5mm}
`;

// days of a month as weeks: arrays of {d, inMonth, date}
function monthWeeks(year, month, start = 'mon') {
  const first = new Date(Date.UTC(year, month, 1));
  const offset = start === 'mon' ? (first.getUTCDay() + 6) % 7 : first.getUTCDay();
  const cur = new Date(Date.UTC(year, month, 1 - offset));
  const weeks = [];
  for (let w = 0; w < 6; w++) {
    const row = [];
    for (let i = 0; i < 7; i++) {
      row.push({ d: cur.getUTCDate(), inMonth: cur.getUTCMonth() === month, iso: cur.toISOString().slice(0, 10), dow: cur.getUTCDay() });
      cur.setUTCDate(cur.getUTCDate() + 1);
    }
    if (w >= 4 && !row.some((x) => x.inMonth)) break;
    weeks.push(row);
  }
  return weeks;
}

function monthTable(year, month, { start = 'mon', hol = {}, ch = 24, id = '' } = {}) {
  const heads = start === 'mon' ? DAYS_MON : DAYS_SUN;
  const weeks = monthWeeks(year, month, start);
  return `<table class="cal" style="--ch:${ch}mm"><thead><tr>${heads.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${weeks.map((w) => `<tr>${w.map((c) => `<td class="${c.inMonth ? '' : 'off'} ${c.dow === 0 || c.dow === 6 ? 'we' : ''}">${c.inMonth ? `<span class="d">${c.d}</span>${hol[c.iso] ? `<span class="h">${hol[c.iso]}</span>` : ''}` : ''}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}

function miniMonth(year, month, { start = 'mon', hol = {} } = {}) {
  const heads = (start === 'mon' ? DAYS_MON : DAYS_SUN).map((d) => d[0]);
  const weeks = monthWeeks(year, month, start);
  return `<table class="mini"><thead><tr>${heads.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${weeks.map((w) => `<tr>${w.map((c) => `<td class="${c.inMonth && hol[c.iso] ? 'hol' : ''}">${c.inMonth ? c.d : ''}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}

function undatedMonth(start = 'mon', ch = 24) {
  const heads = start === 'mon' ? DAYS_MON : DAYS_SUN;
  return `<table class="cal" style="--ch:${ch}mm"><thead><tr>${heads.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${Array.from({ length: 5 }, () => `<tr>${heads.map(() => '<td><span class="d" style="display:inline-block;width:6mm;border-bottom:.6pt solid var(--line)">&nbsp;</span></td>').join('')}</tr>`).join('')}</tbody></table>`;
}

// Common page types
const head = (kicker, title, lead) => `<div class="kicker">${kicker}</div><h1 class="sm">${title}</h1>${lead ? `<p class="muted">${lead}</p>` : ''}`;

function tablePage(sect, kicker, title, lead, headers, rows, widths, extra = '') {
  return page(`${head(kicker, title, lead)}<div class="tbl-fill">${table(headers, rows, { widths, rh: 9.4 })}</div>${extra}`, { sect });
}
function cardsPage(sect, kicker, title, lead, items, opts = {}) {
  // items: [h, t] info cards in a 2-col grid
  const cols = opts.cols || 2;
  return page(`${head(kicker, title, lead)}<div class="${cols === 3 ? 'g3' : 'g2'}">${items.map(([h, t], i) => box('', `<h3>${h}</h3><p class="small">${t}</p>`, i % 3 === 0 ? 'cream' : i % 3 === 2 ? 'sage' : '')).join('')}</div>${opts.after || ''}`, { sect, deco: opts.deco || 'small' });
}
function checkPage(sect, kicker, title, lead, groups, opts = {}) {
  // groups: [label, [items]]
  const cls = opts.cols === 3 ? 'g3' : 'g2';
  return page(`${head(kicker, title, lead)}<div class="${cls}">${groups.map(([l, items], i) => box(l, cbs(items) + (opts.blanks ? blankCbs(opts.blanks) : ''), i % 4 === 1 ? 'sage' : i % 4 === 3 ? 'cream' : '')).join('')}</div>${opts.after || ''}`, { sect, deco: opts.deco || '' });
}
function formPage(sect, kicker, title, lead, sections) {
  // sections: [label, [fields]] rendered as boxes in a 2-col grid; label ending with '*' spans full width with lines
  return page(`${head(kicker, title, lead)}<div class="g2">${sections.map(([l, fields], i) => box(l, Array.isArray(fields) ? fields.map(field).join('') : fields, i % 4 === 3 ? 'cream' : '')).join('')}</div>`, { sect });
}
function textPage(sect, kicker, title, leadP, paras, after = '') {
  return page(`<div class="kicker">${kicker}</div><h1>${title}</h1><p class="lead">${leadP}</p>${paras.map((p) => `<p>${p}</p>`).join('')}${after}`, { sect, deco: 'small' });
}
function cardSheet(sect, kicker, title, lead, cards, { cols = 3, rows = 4, es = 26, ts = 10 } = {}) {
  return page(`${head(kicker, title, lead)}<div class="cards" style="grid-template-columns:repeat(${cols},1fr);grid-template-rows:repeat(${rows},1fr);--es:${es}pt;--ts:${ts}pt">${cards.map(([e, t]) => `<div class="card"><div class="e">${e}</div><div class="t">${t}</div></div>`).join('')}</div>`, { sect, cls: 'nofill' });
}

module.exports = { MONTHS, DAYS_MON, DAYS_SUN, CSS2, monthWeeks, monthTable, miniMonth, undatedMonth, head, tablePage, cardsPage, checkPage, formPage, textPage, cardSheet };
