// 2027 dated planners: printable (A4/Letter, Mon or Sun start) and a hyperlinked digital planner.
const fs = require('fs');
const path = require('path');
const { page, cover, lines, cbs, blankCbs, field, table, box, dots5, url, circles } = require('./lib');
const { MONTHS, CSS2, monthTable, miniMonth, monthWeeks } = require('./lib2');

const Y = 2027;
const DAY = 864e5;
const iso = (d) => d.toISOString().slice(0, 10);
const D = (m, d) => new Date(Date.UTC(Y, m, d));
const WD = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const SHORT = (d) => `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()].slice(0, 3)}`;

function easter(y) { const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451), mo = Math.floor((h + l - 7 * m + 114) / 31), da = ((h + l - 7 * m + 114) % 31) + 1; return new Date(Date.UTC(y, mo - 1, da)); }
const lastSun = (m) => { const d = new Date(Date.UTC(Y, m + 1, 0)); d.setUTCDate(d.getUTCDate() - d.getUTCDay()); return d; };
const nthSun = (m, n) => { const d = D(m, 1); d.setUTCDate(1 + ((7 - d.getUTCDay()) % 7) + 7 * (n - 1)); return d; };
const E = easter(Y);

// Bank holidays come straight from GOV.UK's published data.
const BH = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'bank-holidays.json')));
const bh = (region) => BH[region].events.filter((e) => e.date.startsWith(String(Y)));
const LABEL = {
  [`${Y}-01-01`]: 'New Year\'s Day', [`${Y}-01-04`]: 'Bank hol. (Scot)', [`${Y}-03-17`]: 'St Patrick\'s Day (NI hol.)', [`${Y}-03-26`]: 'Good Friday',
  [`${Y}-03-29`]: 'Easter Monday (not Scot)', [`${Y}-05-03`]: 'Early May bank hol.', [`${Y}-05-31`]: 'Spring bank hol.', [`${Y}-07-12`]: 'Bank hol. (NI)',
  [`${Y}-08-02`]: 'Summer bank hol. (Scot)', [`${Y}-08-30`]: 'Summer bank hol. (not Scot)', [`${Y}-11-30`]: 'St Andrew\'s Day (Scot hol.)', [`${Y}-12-27`]: 'Christmas bank hol.', [`${Y}-12-28`]: 'Boxing Day bank hol.',
};
const allBH = new Set([...bh('england-and-wales'), ...bh('scotland'), ...bh('northern-ireland')].map((e) => e.date));
for (const d of allBH) if (!LABEL[d]) throw new Error('unlabelled bank holiday ' + d);
const KEY = {
  [`${Y}-01-25`]: 'Burns Night', [`${Y}-02-14`]: 'Valentine\'s Day', [iso(new Date(E - 47 * DAY))]: 'Pancake Day', [`${Y}-03-01`]: 'St David\'s Day',
  [iso(new Date(E - 21 * DAY))]: 'Mother\'s Day (UK)', [iso(lastSun(2))]: 'Easter Sunday · clocks go forward', [`${Y}-04-23`]: 'St George\'s Day',
  [iso(nthSun(5, 3))]: 'Father\'s Day', [iso(lastSun(9))]: 'Halloween · clocks go back', [`${Y}-11-05`]: 'Bonfire Night', [iso(nthSun(10, 2))]: 'Remembrance Sunday',
  [`${Y}-12-24`]: 'Christmas Eve', [`${Y}-12-25`]: 'Christmas Day', [`${Y}-12-26`]: 'Boxing Day', [`${Y}-12-31`]: 'Hogmanay',
};
if (iso(lastSun(2)) !== iso(E)) throw new Error('check Easter / clocks label');
if (iso(lastSun(9)) !== `${Y}-10-31`) throw new Error('check clocks back label');
const HOL = {};
for (const [k, v] of Object.entries({ ...KEY, ...LABEL })) HOL[k] = (KEY[k] && LABEL[k]) ? `${KEY[k]} · ${LABEL[k]}` : v;

// Weeks touching the year. A week belongs to the month of its Thursday (or 4th day).
function weeksOf(start) {
  const first = D(0, 1);
  const off = start === 'mon' ? (first.getUTCDay() + 6) % 7 : first.getUTCDay();
  let cur = new Date(first - off * DAY);
  const out = [];
  let n = 1;
  while (cur.getUTCFullYear() <= Y && !(cur.getUTCFullYear() === Y + 1)) {
    const days = Array.from({ length: 7 }, (_, i) => new Date(cur.getTime() + i * DAY));
    if (days[0].getUTCFullYear() > Y) break;
    const anchor = days[3];
    out.push({ n: n++, days, month: anchor.getUTCFullYear() < Y ? 0 : anchor.getUTCFullYear() > Y ? 11 : anchor.getUTCMonth() });
    cur = new Date(cur.getTime() + 7 * DAY);
  }
  return out;
}

const weekLabel = (w) => { const a = w.days[0], b = w.days[6]; return `${a.getUTCDate()} ${MONTHS[a.getUTCMonth()]}${a.getUTCFullYear() !== b.getUTCFullYear() ? ' ' + a.getUTCFullYear() : ''} – ${b.getUTCDate()} ${MONTHS[b.getUTCMonth()]} ${b.getUTCFullYear()}`; };

// ---------------- Printable ----------------
function printable(start) {
  const weeks = weeksOf(start);
  const startName = start === 'mon' ? 'Monday' : 'Sunday';
  const pages = [];
  pages.push(cover({ kicker: `A gentle dated planner · ${startName} start`, title: '2027<br>Gentle<br>Planner', lead: 'A full-year planner for busy brains: monthly calendars, a page for every week, gentle monthly reviews and UK dates built in.', tags: ['Dated 2027', 'UK bank holidays', `${startName} start`, 'Print at home'], bottom: 'Weekly pages, not daily, so a missed day never means a wasted page.' }));
  pages.push(page(`<div class="kicker">Start here</div><h1>Welcome to 2027</h1>
<p class="lead">This planner is designed to be kind. One page a week instead of one a day, so there are no empty pages to feel guilty about, and a gentle check-in at the end of each month.</p>
<div class="g2">${box('What\'s inside', cbs(['2027 at a glance', 'UK bank holidays and key dates', 'Intentions for the year and a birthdays page', '12 monthly calendars with holidays marked', '12 month-planning pages with a habit tracker', `${weeks.length} dated weekly pages`, '12 monthly reviews', '2028 at a glance and notes pages']))}
${box('How to use it', `<div class="step"><div class="n">1</div><div class="small">Fill in your <b>intentions</b> for the year. Three words is plenty.</div></div><div class="step"><div class="n">2</div><div class="small">At the start of each month, use the <b>calendar</b> and <b>month plan</b>.</div></div><div class="step"><div class="n">3</div><div class="small">Each week, choose your <b>top three</b> and add plans day by day.</div></div><div class="step"><div class="n">4</div><div class="small">At the end of the month, do the <b>review</b>. Five minutes is enough.</div></div>`, 'sage')}</div>
<div class="callout"><h3>Missed a week? Missed a month?</h3><p class="small">Just turn to today's page and carry on. Blank weeks aren't failures, they're just weeks you were busy living.</p></div>`, { sect: 'Welcome', deco: 'tr' }));
  pages.push(page(`<div class="kicker">The year ahead</div><h1>2027 at a glance</h1><p class="muted">Bank holidays (England, Wales, Scotland and Northern Ireland) are shaded.</p>
<div class="g3" style="gap:5mm 6mm;margin-top:2mm">${MONTHS.map((m, i) => `<div><h3 style="margin-bottom:1mm">${m}</h3>${miniMonth(Y, i, { start, hol: Object.fromEntries([...allBH].map((d) => [d, 1])) })}</div>`).join('')}</div>`, { sect: '2027', deco: 'small', cls: 'nofill' }));
  const reg = (r, name) => `<div class="box"><div class="label">${name}</div>${bh(r).map((e) => `<div class="small" style="display:flex;justify-content:space-between;border-bottom:.6pt solid var(--line);padding:1mm 0"><span>${LABEL[e.date].replace(/ \(.*\)/, '')}</span><span class="muted">${WD[new Date(e.date).getUTCDay()].slice(0, 3)} ${SHORT(new Date(e.date))}</span></div>`).join('')}</div>`;
  pages.push(page(`<div class="kicker">2027</div><h1 class="sm">Bank holidays &amp; key dates</h1><p class="muted">Bank holidays from GOV.UK. Christmas Day and Boxing Day 2027 fall at the weekend, so the bank holidays move to Monday 27 and Tuesday 28 December.</p>
<div class="g3">${reg('england-and-wales', 'England &amp; Wales')}${reg('scotland', 'Scotland')}${reg('northern-ireland', 'Northern Ireland')}</div>
${box('Other dates to remember', `<div style="column-count:2;column-gap:8mm">${Object.entries(KEY).sort().map(([d, t]) => `<div class="small" style="display:flex;justify-content:space-between;border-bottom:.6pt solid var(--line);padding:1mm 0;break-inside:avoid"><span>${t}</span><span class="muted">${SHORT(new Date(d))}</span></div>`).join('')}</div>`, 'cream')}`, { sect: '2027' }));
  pages.push(page(`<div class="kicker">2027</div><h1>My intentions</h1><p class="muted">Not resolutions. Just a gentle direction for the year.</p>
${box('Three words for 2027', `<div class="g3" style="margin-top:2mm">${[1, 2, 3].map(() => `<div style="border-bottom:1pt solid var(--clay);height:12mm"></div>`).join('')}</div>`, 'clay')}
<div class="g2">${['Home', 'Health &amp; energy', 'Work &amp; money', 'People', 'Fun &amp; rest', 'Learning &amp; growing'].map((x, i) => box(x, lines(24), i % 3 === 1 ? 'sage' : '')).join('')}</div>
${box('By December, I\'d love to feel...', lines(), 'fill cream')}`, { sect: 'Intentions', deco: 'small' }));
  pages.push(page(`<div class="kicker">2027</div><h1 class="sm">Birthdays &amp; special dates</h1>
<div class="g3 grow">${MONTHS.map((m) => box(m, lines())).join('')}</div>`, { sect: 'Birthdays' }));

  MONTHS.forEach((m, mi) => {
    const mWeeks = weeks.filter((w) => w.month === mi);
    const nDays = new Date(Date.UTC(Y, mi + 1, 0)).getUTCDate();
    pages.push(page(`<div class="row" style="flex:none;align-items:flex-end"><div><div class="kicker">2027</div><h1 style="font-size:34pt">${m}</h1></div></div>
<div class="grow" style="display:flex;flex-direction:column">${monthTable(Y, mi, { start, hol: HOL, ch: monthWeeks(Y, mi, start).length > 5 ? 27 : 32 })}</div>
${box('Notes', lines(16))}`, { sect: m, cls: 'nofill' }));
    pages.push(page(`<div class="kicker">${m} 2027</div><h1 class="sm">Month plan</h1>
<div class="g3">${box('Focus this month', lines(22), 'clay')}${box('Top goals', blankCbs(3))}${box('Don\'t forget', blankCbs(3), 'sage')}</div>
<div class="g2">${box('Bills &amp; payments', table(['What', '£', 'Date', '✓'], 4, { widths: ['46%', '18%', '22%'], rh: 6.6 }))}${box('Appointments &amp; plans', lines(33))}</div>
${box('Habit tracker', table(['Habit', ...Array.from({ length: nDays }, (_, i) => i + 1)], Array.from({ length: 6 }, () => Array(nDays + 1).fill('')), { widths: ['20%'], rh: 7.2 }).replace(/<th style="">(\d+)<\/th>/g, '<th style="padding:1mm 0;text-align:center;font-size:5.4pt;letter-spacing:0">$1</th>'))}
${box('Notes', lines(), 'fill')}`, { sect: m }));
    mWeeks.forEach((w) => {
      const dayBox = (d) => { const k = iso(d); const inY = d.getUTCFullYear() === Y; return `<div class="box" style="padding:2.4mm 3mm;${inY ? '' : 'background:#FCFAF6'}"><div style="display:flex;justify-content:space-between;align-items:baseline"><b style="color:var(--sage-deep);font-size:9.5pt">${WD[d.getUTCDay()]} ${d.getUTCDate()}</b><span class="tiny" style="color:var(--clay-deep);font-weight:500">${HOL[k] || ''}</span></div>${lines()}</div>`; };
      pages.push(page(`<div class="row" style="flex:none;align-items:flex-end"><div><div class="kicker">Week ${w.n}</div><h1 class="sm">${weekLabel(w)}</h1></div></div>
<div style="display:grid;grid-template-columns:1fr 1fr;grid-template-rows:repeat(4,1fr);gap:3mm;flex:1;min-height:0">
${w.days.map(dayBox).join('')}
<div class="box sage" style="padding:2.4mm 3mm"><div class="label sage">This week's top three</div>${blankCbs(3)}<div class="small" style="margin-top:1.4mm">Energy ${dots5()}</div></div>
</div>`, { sect: `${m} · Week ${w.n}`, cls: 'nofill' }));
    });
    pages.push(page(`<div class="kicker">${m} 2027</div><h1 class="sm">Looking back on ${m}</h1><p class="muted">Five minutes. No marks out of ten.</p>
<div class="g2">${box('Wins, big and small', lines(40), 'clay')}${box('What was hard', lines(40))}${box('What helped', lines(32), 'sage')}${box('What I\'ll let go of', lines(32))}</div>
${box('', `<div class="row small"><span>Energy ${dots5()}</span><span>Mood ${dots5()}</span><span>Rest ${dots5()}</span></div>`, 'cream')}
${box(`In ${MONTHS[(mi + 1) % 12]}, I want to...`, lines(), 'fill')}`, { sect: m, deco: 'small' }));
  });
  pages.push(page(`<div class="kicker">Looking ahead</div><h1>2028 at a glance</h1>
<div class="g3" style="gap:5mm 6mm;margin-top:2mm">${MONTHS.map((m, i) => `<div><h3 style="margin-bottom:1mm">${m}</h3>${miniMonth(Y + 1, i, { start })}</div>`).join('')}</div>`, { sect: '2028', deco: 'small', cls: 'nofill' }));
  for (let i = 0; i < 3; i++) pages.push(page(`<div class="kicker">Notes</div>${box('', lines(), 'fill')}`, { sect: 'Notes' }));
  pages.push(page(`<div class="kicker">Thank you</div><h1>Here's to a gentle year</h1><p class="lead">Thank you for choosing Larkspur &amp; Co. If this planner helps, a short Etsy review means the world to a small Glasgow business.</p>${box('Notes', lines(), 'fill')}`, { sect: 'Thank you', deco: 'tr' }));
  return pages;
}

// ---------------- Digital (hyperlinked, landscape) ----------------
const DIG = { w: 280, h: 210, label: 'Digital (4:3)' };
function digital() {
  const weeks = weeksOf('mon');
  const dayDate = (k) => new Date(k + 'T00:00:00Z');
  const allDays = []; for (let t = D(0, 1).getTime(); t <= D(11, 31).getTime(); t += DAY) allDays.push(new Date(t));
  const weekOfDay = {}; weeks.forEach((w) => w.days.forEach((d) => { weekOfDay[iso(d)] = w.n; }));
  const tabs = (active) => `<nav class="tabs">${[['year', 'Year'], ...MONTHS.map((m, i) => [`m${i}`, m.slice(0, 3)]), ['notes', 'Notes']].map(([id, t]) => `<a href="#${id}" class="${active === id ? 'on' : ''}">${t}</a>`).join('')}</nav>`;
  const shell = (id, active, crumb, inner) => ({ raw: () => `<section class="page dg" id="${id}">${tabs(active)}<div class="dgmain"><div class="crumb"><a href="#year">2027</a>${crumb}</div>${inner}</div></section>` });
  const pages = [];
  pages.push({ raw: () => `<section class="page dg cover-dg" id="cover">${circles('cover')}<div style="position:relative;z-index:2;padding:30mm 28mm;height:100%;display:flex;flex-direction:column"><div class="kicker" style="letter-spacing:.3em">Larkspur &amp; Co.</div><h1 style="font-size:60pt;margin-top:14mm">2027</h1><div class="lead" style="font-size:18pt;margin-top:3mm;color:var(--sage-deep)">Digital Planner</div><p style="margin-top:6mm;max-width:130mm">Tap any tab, month, week or day to jump straight there.</p><div class="spacer"></div><a href="#year" class="tag" style="font-size:12pt;padding:3mm 8mm;align-self:flex-start;text-decoration:none">Open the planner →</a></div><img src="${url('img/larkspur-stem.png')}" style="position:absolute;right:10mm;bottom:6mm;width:95mm;z-index:1"></section>` });
  pages.push(shell('year', 'year', '', `<h1 class="sm">2027 at a glance</h1><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4mm 6mm;margin-top:3mm">${MONTHS.map((m, i) => `<a href="#m${i}" class="mm"><h3>${m}</h3>${miniMonth(Y, i, { hol: Object.fromEntries([...allBH].map((d) => [d, 1])) })}</a>`).join('')}</div><div style="display:flex;gap:4mm;margin-top:4mm"><a class="tag sage" href="#goals">Goals</a><a class="tag" href="#habits">Habit tracker</a><a class="tag sage" href="#dates">Key dates</a><a class="tag" href="#notes">Notes</a></div>`));
  pages.push(shell('dates', 'year', ' › Key dates', `<h1 class="sm">Bank holidays &amp; key dates</h1><div style="column-count:3;column-gap:8mm;margin-top:3mm">${Object.entries(HOL).sort().map(([d, t]) => `<a href="#d${d}" style="display:flex;justify-content:space-between;gap:3mm;border-bottom:.6pt solid var(--line);padding:1.3mm 0;break-inside:avoid;font-size:8pt"><span>${t}</span><span class="muted" style="white-space:nowrap">${SHORT(dayDate(d))}</span></a>`).join('')}</div><p class="tiny muted" style="margin-top:3mm">Bank holidays from GOV.UK (England &amp; Wales, Scotland, Northern Ireland).</p>`));
  pages.push(shell('goals', 'year', ' › Goals', `<h1 class="sm">2027 goals &amp; intentions</h1><div class="g3" style="margin-top:3mm;flex:1">${['Home', 'Health', 'Work &amp; money', 'People', 'Fun', 'Growing'].map((x) => box(x, lines(), 'fill')).join('')}</div>`));
  pages.push(shell('habits', 'year', ' › Habits', `<h1 class="sm">Year in pixels</h1><p class="muted small">Colour each day with how it felt, or track one habit.</p><div style="flex:1">${table(['', ...MONTHS.map((m) => m[0])], Array.from({ length: 31 }, (_, i) => [i + 1, ...MONTHS.map((_, mi) => (i + 1 > new Date(Date.UTC(Y, mi + 1, 0)).getUTCDate() ? '<span style="display:block;height:100%;background:#EEE8DE"></span>' : ''))]), { widths: ['6%'], rh: 4.6 })}</div>`));
  MONTHS.forEach((m, mi) => {
    const mw = weeks.filter((w) => w.days.some((d) => d.getUTCMonth() === mi && d.getUTCFullYear() === Y));
    const grid = `<table class="cal dcal"><thead><tr><th style="width:9mm">Wk</th>${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${mw.map((w) => `<tr><td class="wk"><a href="#w${w.n}">${w.n}</a></td>${w.days.map((d) => { const k = iso(d); const inM = d.getUTCMonth() === mi && d.getUTCFullYear() === Y; return `<td class="${inM ? '' : 'off'}">${inM ? `<a href="#d${k}" class="cell"><span class="d">${d.getUTCDate()}</span>${HOL[k] ? `<span class="h">${HOL[k]}</span>` : ''}</a>` : ''}</td>`; }).join('')}</tr>`).join('')}</tbody></table>`;
    pages.push(shell(`m${mi}`, `m${mi}`, ` › ${m}`, `<div style="display:flex;gap:6mm;flex:1;min-height:0"><div style="flex:1;display:flex;flex-direction:column"><h1 class="sm">${m}</h1><div style="flex:1;margin-top:2mm">${grid}</div></div><div style="width:62mm;display:flex;flex-direction:column;gap:3mm">${box('Focus', lines(20), 'clay')}${box('Goals', blankCbs(3))}${box('Notes', lines(), 'fill')}</div></div>`));
  });
  weeks.forEach((w) => {
    const mi = w.month;
    pages.push(shell(`w${w.n}`, `m${mi}`, ` › <a href="#m${mi}">${MONTHS[mi]}</a> › Week ${w.n}`, `<div style="display:flex;justify-content:space-between;align-items:baseline"><h1 class="sm">Week ${w.n}</h1><span class="small muted">${weekLabel(w)}</span></div>
<div style="display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:1fr 1fr;gap:3mm;flex:1;margin-top:2mm;min-height:0">${w.days.map((d) => { const k = iso(d); const inY = d.getUTCFullYear() === Y; return `<div class="box" style="padding:2mm 2.6mm"><div style="display:flex;justify-content:space-between">${inY ? `<a href="#d${k}" style="color:var(--sage-deep);font-weight:600;font-size:9pt">${WD[d.getUTCDay()].slice(0, 3)} ${d.getUTCDate()} ›</a>` : `<b style="color:#C9C1B4;font-size:9pt">${WD[d.getUTCDay()].slice(0, 3)} ${d.getUTCDate()}</b>`}</div>${HOL[k] ? `<div class="tiny" style="color:var(--clay-deep)">${HOL[k]}</div>` : ''}${lines(null, 6.5)}</div>`; }).join('')}<div class="box sage" style="padding:2mm 2.6mm"><div class="label sage">Top three</div>${blankCbs(3)}<div class="label sage" style="margin-top:2mm">Notes</div>${lines(null, 6.5)}</div></div>
<div style="display:flex;justify-content:space-between;margin-top:2mm" class="small">${w.n > 1 ? `<a href="#w${w.n - 1}">‹ Week ${w.n - 1}</a>` : '<span></span>'}${w.n < weeks.length ? `<a href="#w${w.n + 1}">Week ${w.n + 1} ›</a>` : '<span></span>'}</div>`));
  });
  allDays.forEach((d, i) => {
    const k = iso(d); const mi = d.getUTCMonth(); const wn = weekOfDay[k];
    const prev = allDays[i - 1], next = allDays[i + 1];
    pages.push(shell(`d${k}`, `m${mi}`, ` › <a href="#m${mi}">${MONTHS[mi]}</a> › <a href="#w${wn}">Week ${wn}</a> › ${d.getUTCDate()}`, `<div style="display:flex;justify-content:space-between;align-items:baseline"><h1 class="sm">${WD[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[mi]}</h1><span class="small" style="color:var(--clay-deep)">${HOL[k] || ''}</span></div>
<div style="display:flex;gap:4mm;flex:1;min-height:0;margin-top:2mm"><div class="box" style="flex:1.1"><div class="label">Schedule</div>${Array.from({ length: 15 }, (_, h) => `<div style="display:flex;border-bottom:.6pt solid var(--line);flex:1;align-items:flex-start"><span class="tiny muted" style="width:9mm;padding-top:.6mm">${String(h + 7).padStart(2, '0')}:00</span></div>`).join('')}</div>
<div style="flex:1;display:flex;flex-direction:column;gap:3mm">${box('Top three', blankCbs(3), 'clay')}${box('To do', blankCbs(6))}${box('', `<div class="row small"><span>Energy ${dots5()}</span><span>Mood ${dots5()}</span></div><div class="small" style="margin-top:1.4mm">Water ○ ○ ○ ○ ○ ○ ○ ○</div>`, 'cream')}</div>
<div style="flex:1;display:flex;flex-direction:column;gap:3mm">${box('Notes', lines(null, 6.5), 'fill')}${box('Grateful for', lines(14), 'sage')}</div></div>
<div style="display:flex;justify-content:space-between;margin-top:2mm" class="small">${prev ? `<a href="#d${iso(prev)}">‹ ${SHORT(prev)}</a>` : '<span></span>'}${next ? `<a href="#d${iso(next)}">${SHORT(next)} ›</a>` : '<span></span>'}</div>`));
  });
  pages.push(shell('notes', 'notes', ' › Notes', `<h1 class="sm">Notes</h1><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4mm;margin-top:3mm">${Array.from({ length: 12 }, (_, i) => `<a class="tag ${i % 2 ? 'sage' : ''}" href="#n${i + 1}" style="text-align:center">Notes page ${i + 1}</a>`).join('')}</div>`));
  for (let i = 1; i <= 12; i++) pages.push(shell(`n${i}`, 'notes', ` › <a href="#notes">Notes</a> › ${i}`, `${i % 2 ? box('', lines(null, 7), 'fill') : `<div class="box fill" style="background-image:radial-gradient(circle,#C9C1B4 .5pt,transparent .6pt);background-size:5mm 5mm"></div>`}`));
  return pages;
}

const DIG_CSS = `
.page.dg{padding:0;background:var(--cream);flex-direction:row}
.tabs{width:17mm;background:var(--sage-deep);display:flex;flex-direction:column;padding:6mm 0;gap:.8mm;order:2}
.tabs a{color:#fff;font-size:8.4pt;font-weight:500;text-align:center;padding:2.2mm 0;text-decoration:none;border-radius:2mm 0 0 2mm;margin-left:2mm}
.tabs a.on{background:var(--cream);color:var(--sage-deep);font-weight:600}
.dgmain{flex:1;padding:8mm 10mm 7mm 12mm;display:flex;flex-direction:column;min-width:0;order:1;gap:2.5mm}
.crumb{font-size:7pt;letter-spacing:.12em;text-transform:uppercase;color:var(--clay);font-weight:600}
.crumb a,.dg a{color:inherit;text-decoration:none}
.dg .box{background:#fff}
.dg .box.clay{background:var(--clay-light)}.dg .box.sage{background:var(--sage-light)}.dg .box.cream{background:#FFFDF9}
a.mm{display:block;background:#fff;border-radius:3mm;padding:2.4mm 3mm;border:.8pt solid var(--line)}
a.mm h3{margin-bottom:1mm}
table.dcal{height:100%}
table.dcal td{height:auto;background:#fff;padding:0}
table.dcal td.off{background:transparent}
table.dcal td.wk{width:9mm;text-align:center;vertical-align:middle;background:var(--sage-light);font-weight:600;color:var(--sage-deep);font-size:8pt}
table.dcal td.wk a{display:block;padding:3mm 0}
a.cell{display:block;height:100%;padding:1.2mm 1.6mm;min-height:18mm}
.cover-dg{display:block}
`;

module.exports = { printable, digital, DIG, DIG_CSS, CSS2, HOL, Y };
