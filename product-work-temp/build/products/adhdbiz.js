const { page, cover, section, lines, cbs, blankCbs, field, table, box, dots5 } = require('../lib');
const { CSS2, head, tablePage, cardsPage, checkPage, formPage } = require('../lib2');

const T = 'The ADHD Small Business Planner';
const S = 'ADHD Business Planner';
const pages = [];
const ids = {};
const add = (id, pg) => { if (id) ids[id] = pages.length + 1; pages.push(pg); };

add('cover', null);
add('welcome', page(`<div class="kicker">Start here</div><h1>Run your business your way</h1>
<p class="lead">Lots of ADHD brains are brilliant at ideas, creativity and getting things started. The day-to-day of running a business (admin, money, follow-ups, focus) can be harder. This planner is built for exactly that.</p>
<div class="g2">${box('How it works', `<div class="step"><div class="n">1</div><div class="small">Start with <b>your business on one page</b> and a big <b>brain dump</b>.</div></div><div class="step"><div class="n">2</div><div class="small">Choose <b>three 90-day goals</b>. Only three.</div></div><div class="step"><div class="n">3</div><div class="small">Each week, use the <b>weekly CEO page</b> to pick what matters.</div></div><div class="step"><div class="n">4</div><div class="small">Park new ideas in the <b>idea parking lot</b> so they don't derail you.</div></div><div class="step"><div class="n">5</div><div class="small">Review each month, celebrate wins and adjust.</div></div>`)}
${box('Built for busy brains', cbs(['Undated: start any week', 'Three goals at a time, not twelve', 'A focus filter for shiny new ideas', 'Weekly pages, not daily guilt', 'Money pages that take five minutes', 'A "stuck" page for frozen days']), 'sage')}</div>`, { sect: 'Welcome', deco: 'tr' }));
add('contents', null);
add('onepage', page(`${head('Foundations', 'My business on one page', 'When you feel scattered, come back here.')}
<div class="g2">${['What I sell', 'Who it\'s for', 'The problem I solve', 'Why I started', 'What makes me different', 'Where I sell'].map((x, i) => box(x, lines(24), i % 3 === 0 ? 'cream' : '')).join('')}</div>
${box('In one sentence, my business helps...', lines(16), 'clay')}
${box('What success looks like for me (not anyone else)', lines(), 'fill sage')}`, { sect: 'Foundations', deco: 'small' }));
add('dump', page(`${head('Foundations', 'The big brain dump', 'Every idea, task, worry and "I should really...". Get it all out, then sort it.')}
${box('', lines(), 'fill')}
<div class="g4">${box('Do now', blankCbs(3), 'clay')}${box('Plan for later', blankCbs(3))}${box('Delegate / ask', blankCbs(3), 'sage')}${box('Let go', blankCbs(3), 'cream')}</div>`, { sect: 'Foundations' }));
add('goals', page(`${head('Foundations', 'My three 90-day goals', 'Three is the limit. Everything else goes in the parking lot.')}
${[1, 2, 3].map((n) => box(`Goal ${n}`, `${field('Goal')}<div class="row">${field('Why it matters')}${field('Done looks like')}</div><div class="label sage" style="margin-top:1.4mm">Milestones</div><div class="g3">${['Month 1', 'Month 2', 'Month 3'].map((m) => `<div class="cb line small">${m}:</div>`).join('')}</div>`, n === 1 ? 'cream' : '')).join('')}
${box('Money target for the 90 days', `<div class="row">${field('Sales £')}${field('Profit £')}${field('Customers')}</div>`, 'sage')}`, { sect: 'Goals' }));
add('filter', page(`${head('Foundations', 'The focus filter', 'New idea? Run it through these questions before you start. Most ideas can wait in the parking lot.')}
<div class="col">${['Does this help one of my three goals?', 'Is it the most important thing right now?', 'Can I finish what I\'ve already started first?', 'Will it still be a good idea in four weeks?', 'Do I have the time, energy and money for it now?'].map((q, i) => `<div class="box" style="flex-direction:row;gap:4mm;align-items:center"><div class="num" style="font-size:20pt;width:9mm;flex:none">${i + 1}</div><div style="flex:1"><b>${q}</b></div><div class="small" style="flex:none">Yes ○ &nbsp; No ○</div></div>`).join('')}</div>
<div class="callout sage"><p class="small"><b>Mostly yes?</b> Add it to this week's plan. <b>Mostly no?</b> Park it. Parked ideas aren't lost, they're just waiting their turn.</p></div>
${box('Idea I\'m testing', lines(), 'fill')}`, { sect: 'Foundations', deco: 'small' }));
add('stuck', page(`${head('Keep this handy', 'Stuck? Business edition', 'When you\'re frozen at your desk, follow the arrows.')}
<div class="col" style="align-items:center;gap:2mm">${[['Notice it', 'You\'re stuck, not lazy. It happens to everyone.'], ['Body check', 'Water, food, fresh air, a stretch. Fix one.'], ['Pick one task', 'The smallest one that moves a goal forward.'], ['Make it tiny', 'What\'s the first five-minute action? Open the file. Write one line.'], ['Add a boost', 'Music, a body double, a timer, a change of place, a reward.'], ['Start the timer', 'Ten minutes. Stop when it rings if you like.'], ['Log the win', 'Write it on your wins list. Momentum counts.']].map(([h, t], i) => `${i ? '<div style="color:var(--clay);font-size:13pt;line-height:1">↓</div>' : ''}<div class="box ${i % 2 ? 'sage' : 'clay'}" style="width:140mm;flex-direction:row;gap:4mm;align-items:center;padding:3mm 5mm"><b style="color:var(--sage-deep);font-size:11pt;flex:none;width:34mm">${h}</b><span class="small">${t}</span></div>`).join('')}</div><div class="spacer"></div>`, { sect: 'Focus', deco: 'small' }));

const monthPlan = (n) => page(`${head(`Month ${n}`, `Month ${n} plan`, '')}<div class="row" style="flex:none">${field('Month')}</div>
<div class="g3">${[1, 2, 3].map((g) => box(`Goal ${g}: this month`, lines(26), g === 1 ? 'clay' : '')).join('')}</div>
<div class="g2">${box('Key dates, launches &amp; deadlines', table(['Date', 'What'], 6, { widths: ['24%'], rh: 7.6 }))}${box('Money this month', field('Sales target £') + field('Spending limit £') + field('Bills / tax to pay') + field('Invoices to chase'), 'sage')}</div>
<div class="g2">${box('Marketing focus', lines(30))}${box('Admin I must not forget', blankCbs(5), 'cream')}</div>
${box('Notes', lines(), 'fill')}`, { sect: `Month ${n}` });
const weekPage = (n) => page(`<div class="row" style="flex:none;align-items:flex-end"><div><div class="kicker">Weekly CEO page</div><h1 class="sm">Week ${n} of 13</h1></div><div style="flex:none;width:52mm">${field('Week of')}</div></div>
<div class="g3">${box('The big three', `<div class="small muted">Tasks that move a goal forward</div>${blankCbs(3)}`, 'clay')}${box('Money tasks', blankCbs(3), 'sage')}${box('Marketing &amp; content', blankCbs(3))}</div>
<div class="g4" style="grid-template-columns:repeat(5,1fr)">${['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d) => box(d, `<div class="small muted">One thing:</div>${lines(8)}<div class="small muted" style="margin-top:1mm">Also:</div>${lines(30)}`)).join('')}</div>
<div class="g2">${box('Orders, clients &amp; follow-ups', blankCbs(4))}${box('Parking lot (not this week!)', lines(30), 'cream')}</div>
${box('', `<div class="row small" style="align-items:center"><span><b>Sales this week £</b> _______</span><span><b>Energy</b> ${dots5()}</span><span><b>Wins:</b> ________________________</span></div>`, 'sage')}`, { sect: `Week ${n}` });
const monthReview = (n) => page(`${head(`Month ${n}`, `Month ${n} review`, 'Look back with kindness. What worked? What didn\'t? What will you change?')}
<div class="g3">${box('Sales £', '<div style="font-size:15pt;color:var(--sage-deep);font-weight:600;margin-top:1mm">£</div>', 'cream')}${box('Costs £', '<div style="font-size:15pt;color:var(--sage-deep);font-weight:600;margin-top:1mm">£</div>', 'cream')}${box('Profit £', '<div style="font-size:15pt;color:var(--sage-deep);font-weight:600;margin-top:1mm">£</div>', 'cream')}</div>
<div class="g2">${box('Wins', lines(40), 'clay')}${box('Goal progress', [1, 2, 3].map((g) => `<div class="small" style="margin:1mm 0">Goal ${g} ${dots5()}</div>`).join('') + lines(22))}${box('What drained me', lines(30))}${box('What energised me', lines(30), 'sage')}</div>
${box('Next month I will start / stop / keep', lines(), 'fill')}`, { sect: `Month ${n}`, deco: 'small' });
let wk = 1;
[1, 2, 3].forEach((m) => {
  add(`m${m}`, monthPlan(m));
  const nweeks = m === 3 ? 5 : 4;
  for (let i = 0; i < nweeks; i++) add(m === 1 && i === 0 ? 'week1' : null, weekPage(wk++));
  add(m === 1 ? 'review1' : null, monthReview(m));
});
add('daily', page(`<div class="row" style="flex:none;align-items:flex-end"><div><div class="kicker">Print as many as you need</div><h1 class="sm">Daily focus page</h1></div><div style="flex:none;width:46mm">${field('Date')}</div></div>
${box('Today\'s one thing', lines(16), 'clay')}
<div class="row grow"><div class="box" style="flex:1"><div class="label">Time blocks</div>${['Morning', 'Midday', 'Afternoon', 'Evening'].map((x) => `<div class="label sage" style="margin-top:1.4mm">${x}</div>${lines(18)}`).join('')}</div>
<div class="col" style="flex:1">${box('Also today', blankCbs(6))}${box('Messages &amp; follow-ups', blankCbs(4), 'sage')}${box('Brain dump', lines(), 'fill')}</div></div>
${box('', `<div class="row small"><span>Energy ${dots5()}</span><span>Focus ${dots5()}</span><span>Breaks taken ○ ○ ○ ○</span></div>`, 'cream')}`, { sect: 'Daily' }));
add('parking', tablePage('Ideas', 'Ideas', 'Idea parking lot', 'Write it down so your brain can let go. Revisit at your monthly review.', ['Date', 'Idea', 'Excitement', 'Revisit in'], 18, ['13%', '55%', '14%']));
add('sales', tablePage('Money', 'Money', 'Sales tracker', '', ['Date', 'Customer', 'Product / service', '£', 'Paid?'], 18, ['13%', '24%', '33%', '12%']));
add('expenses', tablePage('Money', 'Money', 'Expenses tracker', 'Keep every receipt, even the small ones.', ['Date', 'What', 'Category', '£', 'Receipt?'], 18, ['13%', '35%', '22%', '12%']));
add('customers', tablePage('Customers', 'Customers', 'Customer &amp; follow-up tracker', 'Follow-ups are where lots of sales slip away. Write them down.', ['Name', 'Contact', 'What they want', 'Follow up on', 'Done'], 16, ['20%', '22%', '28%', '16%']));
add('content', page(`${head('Marketing', 'Content ideas bank', 'Ideas for posts, emails and videos. Capture them when they arrive.')}
<div class="g2 grow">${['Behind the scenes', 'Tips &amp; how-tos', 'Customer stories', 'Products &amp; offers', 'Personal stories', 'Questions to ask'].map((x, i) => box(x, lines(), i % 3 === 0 ? 'cream' : '')).join('')}</div>`, { sect: 'Marketing' }));
add('launch', page(`${head('Marketing', 'Launch plan', 'For a new product, service or offer. Print one per launch.')}
${box('', `<div class="row">${field('What I\'m launching')}${field('Launch date')}</div><div class="row">${field('Price £')}${field('Sales goal')}</div>`, 'cream')}
${table(['When', 'Task', 'Done'], [['4 weeks before', 'Finalise product and price', ''], ['3 weeks before', 'Photos and listing / sales page', ''], ['2 weeks before', 'Tease it: behind-the-scenes posts', ''], ['1 week before', 'Email list and social countdown', ''], ['Launch day', 'Announce everywhere', ''], ['Launch week', 'Answer questions, share reviews', ''], ['After', 'Review results', ''], ['', '', ''], ['', '', '']], { widths: ['20%', '68%'], rh: 9.6 })}
${box('How it went', lines(), 'fill sage')}`, { sect: 'Marketing' }));
add('wins', page(`${head('Celebrate', 'Wins log', 'ADHD brains often forget the wins. Write every one down, however small.')}
<div class="tbl-fill">${table(['Date', 'Win'], 22, { widths: ['15%'], rh: 9 })}</div>`, { sect: 'Celebrate' }));
add('thanks', page(`<div class="kicker">Thank you</div><h1>You've got this</h1><p class="lead">Thank you for choosing Larkspur &amp; Co. If this planner helps your business, a short Etsy review means the world to another small business in Glasgow.</p>${box('My next 90 days', lines(), 'fill')}`, { sect: 'Thank you', deco: 'tr' }));

pages[ids.contents - 1] = page(`<div class="kicker">Inside</div><h1>Contents</h1><div style="max-width:130mm;margin-top:3mm">${[['My business on one page', 'onepage'], ['The big brain dump', 'dump'], ['My three 90-day goals', 'goals'], ['The focus filter', 'filter'], ['Stuck? Business edition', 'stuck'], ['Month 1 plan, weeks and review', 'm1'], ['Month 2', 'm2'], ['Month 3', 'm3'], ['Daily focus page', 'daily'], ['Idea parking lot', 'parking'], ['Sales tracker', 'sales'], ['Expenses tracker', 'expenses'], ['Customer &amp; follow-up tracker', 'customers'], ['Content ideas bank', 'content'], ['Launch plan', 'launch'], ['Wins log', 'wins']].map(([a, id]) => `<div class="toc"><b>${a}</b><span>${ids[id]}</span></div>`).join('')}</div>`, { sect: 'Contents', deco: 'small', cls: 'nofill' });
pages[0] = cover({ kicker: 'A 90-day planner for busy-brained business owners', title: 'The ADHD<br>Small Business<br>Planner', lead: 'Three goals, 13 weekly CEO pages, a focus filter for shiny new ideas, and simple money, customer and content trackers.', tags: [`${pages.length} pages`, 'Undated', 'Print at home'], bottom: 'For makers, freelancers, coaches, Etsy sellers and side hustlers.' });

module.exports = {
  file: 'ADHD-Small-Business-Planner', short: S, title: T, pages, css: CSS2, freebie: [ids.filter, ids.stuck],
  meta: {
    short: 'ADHD Small<br>Business Planner', kicker: '90 days · Undated · Print at home', sub: 'Three goals, one week at a time, and a home for every shiny new idea.',
    hero: [1, ids.week1], grid: [[ids.onepage, 'Business on one page'], [ids.goals, 'Three 90-day goals'], [ids.filter, 'The focus filter'], [ids.week1, '13 weekly CEO pages'], [ids.review1, 'Monthly reviews'], [ids.parking, 'Idea parking lot']],
    detail: ids.week1, detailTitle: 'A weekly CEO page that fits on one sheet', detailPoints: ['Your big three for the week', 'One thing per day, plus extras', 'Money, marketing and follow-ups', 'A parking lot for new ideas'],
    features: [['Only three goals', 'Focus on what matters for 90 days'], ['Focus filter', 'Five questions before chasing a new idea'], ['Weekly, not daily', '13 weekly CEO pages, plus a daily page to print'], ['Simple trackers', 'Sales, expenses, customers, content and wins']],
    pins: [['ADHD business owner? Try this', 'A 90-day planner for busy brains', ids.week1], ['Too many business ideas?', 'Use the focus filter', ids.filter], ['Stuck at your desk?', 'A free business edition flowchart', ids.stuck]],
    listing: {
      price: '£7.95', title: 'ADHD Business Planner Printable, Small Business Planner, 90 Day Goal Planner, Entrepreneur Planner, Undated Weekly CEO Planner, A4 PDF',
      tags: ['adhd business', 'business planner', 'small business', 'adhd planner', 'entrepreneur', '90 day planner', 'goal planner', 'ceo planner', 'side hustle', 'etsy seller', 'adhd entrepreneur', 'weekly planner', 'self employed'],
      hook: 'Three goals, one week at a time, and a home for every shiny new idea.',
      body: ['An undated 90-day planner for business owners with busy brains: makers, freelancers, coaches, Etsy sellers and side hustlers. It keeps you focused on three goals, gives every new idea somewhere to wait, and makes money and admin feel lighter.',
        'INSIDE:\n• My business on one page\n• The big brain dump (with sorting boxes)\n• My three 90-day goals with milestones\n• The focus filter: five questions for new ideas\n• Stuck? Business edition flowchart\n• 3 monthly plans and 3 monthly reviews\n• 13 weekly CEO pages\n• Daily focus page (print as many as you need)\n• Idea parking lot\n• Sales, expenses and customer follow-up trackers\n• Content ideas bank and launch plan\n• Wins log'],
      pinCopy: [['ADHD business planner: 90 days, three goals', 'Weekly CEO pages, a focus filter and simple money trackers. Printable and undated.'], ['Too many business ideas? Use the focus filter', 'Five questions before you start something new. Free printable.'], ['Stuck at your desk? A business edition flowchart', 'Notice it, pick one task, make it tiny, start a timer.'], ['Weekly CEO page for small business owners', 'Big three, money tasks, marketing and follow-ups on one page.'], ['Idea parking lot printable', 'Park the shiny ideas so you can finish what matters.']],
      prompts: ['A tidy creative home office desk with a blank printed A4 planner page, a laptop, a mug of coffee and a small plant, soft natural light, warm cream and sage palette, photorealistic, 4:5'],
    },
  },
};
