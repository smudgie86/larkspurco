const { page, cover, lines, cbs, blankCbs, field, table, box } = require('../lib');
const { MONTHS, CSS2, head, tablePage, monthTable, miniMonth } = require('../lib2');
const { HOL } = require('../planners');
const BHJ = require('../data/bank-holidays.json');
const BHOL = {};
for (const r of Object.values(BHJ)) for (const e of r.events) if (e.date.startsWith('2027')) BHOL[e.date] = e.title;

const Y = 2027;
const T = 'The 2027 School Planner';
const S = '2027 School Planner';
const pages = [];
const ids = {};
const add = (id, pg) => { if (id) ids[id] = pages.length + 1; pages.push(pg); };
const DAY = 864e5;
const WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const css = CSS2 + `
.mm{display:grid;grid-template-columns:repeat(3,1fr);gap:4mm 6mm}
.mm h3{font-size:9pt;margin-bottom:1mm}
.wkday{border:.9pt solid var(--line);border-radius:3mm;padding:2mm 3mm;display:flex;flex-direction:column;min-height:0}
.wkday .t{display:flex;justify-content:space-between;align-items:baseline}
.wkday .t b{color:var(--sage-deep);font-size:10pt}
.wkday .t span{font-size:6.6pt;color:var(--clay-deep);font-weight:500}
.hw{display:grid;grid-template-columns:1fr 1fr;gap:0 4mm;flex:1}
.mini-l{font-size:6.4pt;letter-spacing:.14em;text-transform:uppercase;color:var(--clay-deep);font-weight:600;margin-top:1mm}
`;

add('cover', cover({ kicker: 'January – December 2027 · UK', title: 'The 2027 School Planner', lead: 'Homework, timetables, tests and goals, one calm week at a time.', tags: ['Dated 2027', 'Week to a page', 'UK bank holidays', 'A4 + US Letter'], bottom: 'For secondary school, college and older primary pupils. Term dates vary by school, so there\'s space to add your own.' }));
add('welcome', page(`<div class="kicker">Start here</div><h1>Your year, sorted</h1>
<p class="lead">Write things down once and stop worrying about forgetting them. This planner keeps your homework, tests and plans in one place, so your brain doesn\'t have to.</p>
<div class="g2">${box('Inside', cbs(['About me and my subjects', 'Timetables for Week A and Week B', 'Term dates and key dates (write in your school\'s)', '2027 at a glance with UK bank holidays', 'Goals for the year', '12 month calendars', '53 week-to-a-page homework planners', 'Homework, test results and reading logs', 'Assignment and revision planners']))}
${box('How to use it', cbs(['Sunday evening: look at the week ahead', 'Every lesson: write homework the moment it\'s set', 'Tick it off when it\'s done (it feels great)', 'Add tests and deadlines to the month page', 'Colour-code subjects if you like']), 'sage')}</div>
<div class="callout small">Bank holidays are shown for England & Wales, Scotland and Northern Ireland. Your school\'s holidays and INSET days are different, so add them on the Term dates page.</div>`, { sect: 'Welcome', deco: 'tr' }));
add('me', page(`${head('All about me', 'About me', '')}
<div class="g2">${box('Me', ['Name', 'School', 'Year / class', 'Form tutor / class teacher', 'Locker / peg'].map(field).join(''))}
${box('Useful info', ['School phone', 'School website / app', 'Bus / lift home', 'Lunch / card number', 'Emergency contact'].map(field).join(''), 'sage')}</div>
${box('My subjects and teachers', table(['Subject', 'Teacher', 'Room', 'Homework day'], 12, { widths: ['30%', '30%', '15%'], rh: 9 }), 'fill')}`, { sect: 'About me' }));
for (const wk of ['A', 'B']) add(wk === 'A' ? 'timetable' : null, page(`${head('Timetable', `My timetable · Week ${wk}`, wk === 'A' ? 'Only one week? Just use this page.' : '')}
${table(['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], ['Registration', 'Period 1', 'Period 2', 'Break', 'Period 3', 'Period 4', 'Lunch', 'Period 5', 'Period 6', 'After school'].map((p) => [`<b>${p}</b>`, '', '', '', '', '']), { widths: ['16%'], rh: 18 })}`, { sect: 'Timetable' }));
add('terms', page(`${head('Key dates', 'Term dates & key dates', 'Copy these from your school\'s website or letters.')}
${table(['Term / holiday', 'Starts', 'Ends'], ['Spring term', 'February half term', 'Easter holidays', 'Summer term', 'May half term', 'Summer holidays', 'Autumn term', 'October half term', 'Christmas holidays', 'INSET days', ''].map((t) => [t, '', '']), { widths: ['40%', '30%'], rh: 9.6 })}
<div class="g2">${box('Exams & mocks', lines(40), 'cream')}${box('Trips, events & parents\' evenings', lines(40), 'sage')}</div>`, { sect: 'Key dates' }));
add('glance', page(`${head('Key dates', '2027 at a glance', 'Highlighted dates are UK bank holidays (some apply only in one nation).')}
<div class="mm">${MONTHS.map((m, i) => `<div><h3>${m}</h3>${miniMonth(Y, i, { hol: BHOL })}</div>`).join('')}</div>`, { sect: 'Key dates', cls: 'nofill' }));
add('goals', page(`${head('Goals', 'My goals for 2027', 'Small and specific beats big and vague.')}
<div class="g2">${['Learning', 'Grades I\'m aiming for', 'Clubs, sport & hobbies', 'Friends & me', 'Habits to build', 'Something new to try'].map((l, i) => box(l, lines(36), i % 3 === 1 ? 'sage' : i % 3 === 2 ? 'cream' : '')).join('')}</div>
${box('How I\'ll reward myself', lines(), 'fill sage')}`, { sect: 'Goals' }));

// weeks
const first = new Date(Date.UTC(Y, 0, 1));
let cur = new Date(first - ((first.getUTCDay() + 6) % 7) * DAY);
const weeks = [];
while (cur.getUTCFullYear() <= Y) { weeks.push(Array.from({ length: 7 }, (_, i) => new Date(cur.getTime() + i * DAY))); cur = new Date(cur.getTime() + 7 * DAY); }
const iso = (d) => d.toISOString().slice(0, 10);
const short = (h) => (h || '').replace(/ \(.+?\)/g, (m) => m).split(' · ')[0];
const wlabel = (w) => `${w[0].getUTCDate()} ${MONTHS[w[0].getUTCMonth()].slice(0, 3)}${w[0].getUTCFullYear() !== w[6].getUTCFullYear() ? ' ' + w[0].getUTCFullYear() : ''} – ${w[6].getUTCDate()} ${MONTHS[w[6].getUTCMonth()].slice(0, 3)} ${w[6].getUTCFullYear()}`;
const weekPage = (w, n) => page(`<div class="row" style="flex:none;align-items:flex-end"><div><div class="kicker">Week ${n}</div><h1 class="sm">${wlabel(w)}</h1></div><div style="flex:none;width:52mm">${field('Week A / B')}</div></div>
<div style="display:grid;grid-template-columns:1fr 1fr;grid-template-rows:repeat(3,1fr);gap:3mm;flex:1;min-height:0">
${w.slice(0, 5).map((d) => `<div class="wkday"><div class="t"><b>${WD[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()].slice(0, 3)}</b><span>${short(HOL[iso(d)])}</span></div><div class="mini-l">Homework set</div>${blankCbs(3)}<div class="mini-l">Bring / remember</div>${lines(null, 6.4)}</div>`).join('')}
<div class="wkday" style="background:var(--sage-light);border-color:var(--sage-light)"><div class="t"><b>Weekend ${w[5].getUTCDate()}–${w[6].getUTCDate()}</b><span>${short(HOL[iso(w[5])] || HOL[iso(w[6])])}</span></div><div class="mini-l" style="color:var(--sage-deep)">This week\'s tests & deadlines</div>${blankCbs(3)}<div class="mini-l" style="color:var(--sage-deep)">Plans & notes</div>${lines(null, 6.4)}</div>
</div>`, { sect: `${MONTHS[w[3].getUTCMonth()]} ${w[3].getUTCFullYear()}`, cls: 'nofill' });

let wi = 0;
MONTHS.forEach((m, mi) => {
  add(mi === 0 ? 'months' : null, page(`<div class="kicker">${Y}</div><h1>${m}</h1>
<div class="grow">${monthTable(Y, mi, { hol: HOL, ch: 26 })}</div>
<div class="g2">${box('Tests & deadlines', lines(30))}${box('This month I want to', lines(30), 'sage')}</div>`, { sect: `${m} ${Y}`, cls: 'nofill' }));
  while (wi < weeks.length && (weeks[wi][3].getUTCMonth() === mi || (mi === 0 && weeks[wi][3].getUTCFullYear() < Y)) && weeks[wi][3].getUTCFullYear() <= Y) {
    if (wi === 0) ids.weeks = pages.length + 1;
    add(null, weekPage(weeks[wi], wi + 1));
    wi++;
  }
});
if (wi !== weeks.length) throw new Error(`weeks placed ${wi}/${weeks.length}`);

add('hw', tablePage('Trackers', 'Trackers', 'Homework tracker', 'For bigger pieces of homework and coursework.', ['Subject', 'Task', 'Set', 'Due', 'Done'], 15, ['18%', '46%', '12%', '12%']));
add('results', tablePage('Trackers', 'Trackers', 'Test & assessment results', 'Notice patterns, not just scores.', ['Date', 'Subject', 'Test', 'Score / grade', 'What I\'ll do next'], 15, ['12%', '18%', '22%', '14%']));
add('reading', tablePage('Trackers', 'Trackers', 'Reading log', 'Every book counts, including comics and audiobooks.', ['Title', 'Author', 'Started', 'Finished', 'Rating'], 16, ['36%', '26%', '12%', '12%']));
for (let i = 0; i < 3; i++) add(i === 0 ? 'assign' : null, page(`${head('Planning', 'Assignment planner', 'Break a big piece of work into small steps with their own dates.')}
<div class="g2">${box('', ['Subject', 'Assignment', 'Due date'].map(field).join(''))}${box('', ['Teacher', 'Word count / format', 'How it\'s marked'].map(field).join(''), 'sage')}</div>
${table(['Step', 'Do by', 'Done'], ['Read the brief and ask questions', 'Research and notes', 'Plan / outline', 'First draft', 'Check and improve', 'Final version and hand in', ''].map((s) => [s, '', '']), { widths: ['64%', '20%'], rh: 11 })}
${box('Ideas & notes', lines(), 'fill cream')}`, { sect: 'Planning' }));
for (let i = 0; i < 2; i++) add(i === 0 ? 'revision' : null, page(`${head('Planning', 'Revision timetable', 'Short sessions with breaks work better than long ones. Mix up your subjects.')}
${table(['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], ['Session 1', 'Session 2', 'Session 3', 'Session 4'].map((s) => [`<b>${s}</b>`, '', '', '', '', '', '', '']), { widths: ['16%'], rh: 22 })}
<div class="g2">${box('Exam dates', lines(40), 'sage')}${box('Topics I find hardest', lines(40), 'cream')}</div>`, { sect: 'Planning' }));
add('clubs', page(`${head('Planning', 'Clubs & activities', '')}
${table(['Club / activity', 'Day', 'Time', 'Where', 'Bring'], 10, { widths: ['30%', '14%', '14%', '20%'], rh: 11 })}
${box('Notes', lines(), 'fill sage')}`, { sect: 'Planning' }));
add('notes', page(`${head('Notes', 'Notes', '')}${box('', lines(), 'fill')}`, { sect: 'Notes' }));

module.exports = {
  file: '2027-School-Planner', short: S, title: T, pages, css, ids, fillable: false,
  freebie: [ids.timetable, ids.weeks, ids.assign],
  meta: {
    short: 'The 2027<br>School Planner', kicker: 'Dated 2027 · UK · Print at home', sub: 'Homework, timetables, tests and goals, one calm week at a time.',
    hero: [1, ids.weeks], grid: [[ids.timetable, 'Week A & B timetables'], [ids.glance, '2027 at a glance'], [ids.months, '12 month calendars'], [ids.weeks, '53 homework weeks'], [ids.assign, 'Assignment planner'], [ids.revision, 'Revision timetable']],
    detail: ids.weeks, detailTitle: 'A week to a page', detailPoints: ['Homework set, with tick boxes', 'What to bring each day', 'Tests and deadlines for the week', 'UK bank holidays marked'],
    features: [['Set up', 'About me, subjects, Week A/B timetables, term dates'], ['Plan the year', '2027 at a glance, goals and 12 month calendars'], ['Every week', '53 week-to-a-page homework planners'], ['Stay on top', 'Homework, results and reading logs, assignment and revision planners']],
    pins: [['2027 school planner printable', 'Week to a page homework planner', ids.weeks], ['Free school timetable printable', 'Week A and Week B', ids.timetable], ['How to plan a big assignment', 'Break it into small steps', ids.assign]],
    listing: {
      price: '£6.95', title: '2027 School Planner Printable, Student Planner UK, Homework Planner, School Timetable, Weekly Planner for Kids and Teens, A4 Letter PDF',
      tags: ['school planner', 'student planner', '2027 planner', 'homework planner', 'school timetable', 'teen planner', 'kids planner', 'study planner', 'secondary school', 'revision planner', 'back to school', 'weekly planner', 'uk school'],
      hook: 'Homework, timetables, tests and goals, one calm week at a time.',
      body: ['A dated January to December 2027 school planner for secondary school, college and older primary pupils. Simple, uncluttered pages that help students write things down once and stop worrying about forgetting them.',
        'INSIDE (' + pages.length + ' pages):\n• About me, subjects and teachers\n• Week A and Week B timetables\n• Term dates and key dates (write in your own school\'s dates)\n• 2027 at a glance with UK bank holidays\n• Goals for the year\n• 12 month calendars with tests and deadlines\n• 53 week-to-a-page homework planners\n• Homework tracker, test results and reading log\n• Assignment planners and revision timetables\n• Clubs and activities',
        'Bank holidays are shown for England & Wales, Scotland and Northern Ireland. School holidays vary, so there\'s a page to add your own.'],
      pinCopy: [['2027 school planner printable', 'Week to a page homework planner for UK students.'], ['Free school timetable printable', 'Week A and Week B, ready to fill in.'], ['How to plan a big assignment', 'Break it into small steps with their own dates.'], ['Homework planner for teens', 'Write it down once, stop worrying about forgetting.']],
      prompts: ['A tidy teenager\'s desk with a printed planner open to a blank white page, colourful pens, a water bottle and a small plant, soft natural window light, warm cream and muted sage green palette with terracotta accents, photorealistic, 4:5'],
    },
  },
};
