const { page, cover, section, lines, cbs, blankCbs, field, table, box, dots5 } = require('../lib');
const { CSS2, head, tablePage, cardsPage, checkPage, formPage } = require('../lib2');

const T = 'The 30-Day Side Hustle Starter';
const S = 'Side Hustle Starter';
const pages = [];
const ids = {};
const add = (id, pg) => { if (id) ids[id] = pages.length + 1; pages.push(pg); };
const R = (id) => `{{p:${id}}}`;

const days = [
  ['Why do you want this?', 'Extra money, freedom, creativity, a way out? Your "why" keeps you going on hard days.', `Write your why and your money goal on the "My why" worksheet (page ${R('why')}).`],
  ['Skills and interests', 'The best side hustles sit where what you\'re good at meets what you enjoy.', `List everything on the skills and interests inventory (page ${R('skills')}). Ask a friend what you\'re good at, too.`],
  ['Brain dump ideas', 'Quantity first, quality later. Silly ideas often lead to good ones.', `Write at least 20 side hustle ideas on page ${R('ideas')}. Products, services, digital, local... anything.`],
  ['Time and energy audit', 'A side hustle has to fit around your real life, not an imaginary one.', `Map your week on the time audit (page ${R('time')}) and find your realistic hours.`],
  ['Score your ideas', 'Score your top ideas on interest, skills, demand, cost and time.', `Use the idea scorecard (page ${R('score')}) for your top five ideas.`],
  ['Pick one', 'Choosing is the hardest part. Remember, you can change your mind later.', 'Circle your highest-scoring idea that still excites you. Write it in big letters below.'],
  ['Week 1 review', 'You\'ve gone from "I should start something" to one clear idea.', `Fill in the week 1 review (page ${R('rev1')}).`],
  ['Who is it for?', 'A clear customer makes every other decision easier.', `Describe your ideal customer on page ${R('customer')}.`],
  ['What do they need?', 'People buy solutions to problems, or things that make them feel good.', 'List five problems or wishes your customer has that your idea helps with.'],
  ['Check the competition', 'Competition is good: it proves people buy this. Look for gaps.', `Research five competitors on page ${R('comp')}.`],
  ['Test demand', 'Before you spend money, check people want it.', 'Search Etsy, Google, Pinterest or Facebook groups for your idea. Ask five people in your target group if they\'d buy it.'],
  ['Build your offer', 'What exactly will you sell, and what\'s included?', `Shape your first offer on the offer builder (page ${R('offer')}).`],
  ['Set your price', 'Price for profit, not for guilt. Underpricing burns you out.', `Use the pricing worksheet (page ${R('price')}).`],
  ['Week 2 review', 'You know who it\'s for, what they need and what you\'ll sell.', `Fill in the week 2 review (page ${R('rev2')}).`],
  ['Name it', 'Keep it simple, easy to spell and available on the platforms you\'ll use.', 'Brainstorm 10 names. Check the shop name and social handles are free.'],
  ['Startup costs', 'Many side hustles can start for very little. Spend only what you must.', `List your startup costs on page ${R('costs')}.`],
  ['The admin basics', 'In the UK, there are a few things to check before you start trading.', `Work through the UK admin checklist (page ${R('admin')}).`],
  ['Where will you sell?', 'Etsy, your own website, social media, markets, word of mouth...', 'Choose one main place to sell to start with. Set up the account.'],
  ['Create your first product or offer', 'Make it good enough, not perfect. You can improve it later.', 'Spend today making or writing your first product, service page or sample.'],
  ['Photos and description', 'Clear photos and simple, benefit-led words sell.', 'Take photos and write a description that answers: what is it, who is it for, why will they love it?'],
  ['Week 3 review', 'Your side hustle is starting to look real.', `Fill in the week 3 review (page ${R('rev3')}).`],
  ['Tell people', 'Your first customers often come from people you already know.', 'Write a short message about your new venture. Send it to ten people.'],
  ['Social media basics', 'Pick one platform where your customers spend time. Do that one well.', 'Set up your profile with a clear bio, photo and link. Plan your first three posts.'],
  ['Pinterest', 'Pinterest is a search engine. Pins can bring visitors for months.', 'Create a business account, two boards, and your first three pins.'],
  ['Launch!', 'It doesn\'t need to be a big launch. It just needs to go live.', `Publish, post and share. Use the launch checklist (page ${R('launch')}).`],
  ['Follow up', 'Thank everyone who shared or bought. Ask for feedback.', 'Send thank-you messages and ask your first customers what they thought.'],
  ['Track your money', 'Know your numbers from the start. It\'s much easier than catching up later.', `Log every sale and cost on the money tracker (page ${R('money')}).`],
  ['Week 4 review', 'You launched! That\'s more than most people ever do.', `Fill in the week 4 review (page ${R('rev4')}).`],
  ['Make a weekly routine', 'Consistency beats big bursts of effort.', `Plan a realistic weekly routine on page ${R('routine')}.`],
  ['Look ahead', 'Celebrate how far you\'ve come, then plan the next 90 days.', `Fill in your 90-day plan (page ${R('next')}).`],
];

const dayHalf = (d, i) => `<div class="box" style="flex:1">
<div class="row" style="flex:none;align-items:center;gap:4mm"><div style="flex:none;text-align:center;width:16mm"><div class="kicker">Day</div><div class="num" style="font-size:26pt">${i + 1}</div></div><div><h2>${d[0]}</h2><p class="small muted">${d[1]}</p></div></div>
<div class="callout sage" style="margin:2.4mm 0"><p class="small"><b>Today:</b> ${d[2]}</p></div>
<div class="row small" style="flex:none;gap:3mm;margin-bottom:1mm"><span class="cb" style="flex:none">Done</span><span class="cb" style="flex:none">Started</span><span class="cb" style="flex:none">Not today</span><span style="flex:1"></span><span style="flex:none">Motivation ${dots5()}</span></div>
<div class="label sage">Notes</div>${lines()}</div>`;

add('cover', null);
add('welcome', page(`<div class="kicker">Start here</div><h1>From idea to first sale in 30 days</h1>
<p class="lead">One small task a day, around your job and your life. By day 30 you'll have chosen an idea, tested it, priced it, launched it and set up a simple routine.</p>
<div class="g2">${box('How it works', `<div class="step"><div class="n">1</div><div class="small">Do <b>one task a day</b>, about 20–30 minutes.</div></div><div class="step"><div class="n">2</div><div class="small">Use the <b>worksheets</b> when a task sends you there.</div></div><div class="step"><div class="n">3</div><div class="small">Review every seven days.</div></div><div class="step"><div class="n">4</div><div class="small">Miss a day? Just do the next one.</div></div>`)}
${box('The four weeks', `<div class="small"><b>Week 1:</b> Find your idea<br><b>Week 2:</b> Check it and shape it<br><b>Week 3:</b> Build it<br><b>Week 4:</b> Launch it<br><b>Days 29–30:</b> Keep going</div>`, 'sage')}</div>
<p class="tiny muted">General information to help you get started, not financial, tax or legal advice. Check GOV.UK for the rules that apply to you.</p>`, { sect: 'Welcome', deco: 'tr' }));
const wk = [['w1', 'Week 1', 'Find your idea', 'Look at what you\'re good at, what you enjoy and how much time you really have, then choose one idea.', 0, 7], ['w2', 'Week 2', 'Check it and shape it', 'Work out who it\'s for, what they need, what the competition does, and what you\'ll charge.', 7, 14], ['w3', 'Week 3', 'Build it', 'Name it, cover the admin, choose where to sell and make your first product or offer.', 14, 21], ['w4', 'Week 4', 'Launch it', 'Tell people, set up social media and Pinterest, launch, and track your first sales.', 21, 28], ['w5', 'Days 29–30', 'Keep going', 'Set a weekly routine and plan your next 90 days.', 28, 30]];
const revIds = { 6: 'rev1', 13: 'rev2', 20: 'rev3', 27: 'rev4' };
const review = (n) => page(`${head(`Week ${n} review`, `Week ${n} review`, 'Five minutes to look back.')}
<div class="g2">${box('What I did', lines(40))}${box('Wins', lines(40), 'clay')}${box('What I learned', lines(36), 'sage')}${box('What got in the way', lines(36))}</div>
${box('Next week I will', lines(), 'fill')}`, { sect: `Week ${n} review`, deco: 'small' });
wk.forEach(([id, k, name, lead, a, b]) => {
  add(id, section({ kicker: k, title: name, lead, body: `<div class="g2" style="margin-top:8mm">${box('Tasks', days.slice(a, b).map((d, j) => `<div class="cb">Day ${a + j + 1}: ${d[0]}</div>`).join(''))}${box('My intention', lines(40), 'clay')}</div>` }));
  for (let i = a; i < b; i += 2) {
    if (revIds[i] !== undefined) { add(revIds[i], review((i + 1) / 7)); i -= 1; continue; }
    if (i + 1 < b && revIds[i + 1] === undefined) add(null, page(`${dayHalf(days[i], i)}${dayHalf(days[i + 1], i + 1)}`, { sect: `Days ${i + 1}–${i + 2} of 30` }));
    else { add(null, page(dayHalf(days[i], i), { sect: `Day ${i + 1} of 30` })); i -= 1; }
  }
});
const W = (id, title, lead, body) => add(id, page(`${head('Worksheet', title, lead)}${body}`, { sect: 'Worksheets' }));
W('why', 'My why', 'Come back to this on the days you want to give up.', `${box('Why I want a side hustle', lines(40), 'clay')}<div class="g2">${box('Money goal', field('Per month £') + field('By when') + field('What it will pay for'))}${box('Time I can give', field('Hours per week') + field('Best days') + field('Best times'), 'sage')}</div>${box('What success looks like in a year', lines(), 'fill')}`);
W('skills', 'Skills &amp; interests inventory', '', `<div class="g2 grow">${['Things I\'m good at', 'Things people ask me for help with', 'Things I enjoy', 'Qualifications &amp; experience', 'Tools &amp; equipment I own', 'Topics I could talk about for hours'].map((x, i) => box(x, lines(), i % 3 === 0 ? 'cream' : '')).join('')}</div>`);
W('ideas', 'Side hustle idea brainstorm', 'Write at least 20. Mix products, services, digital and local.', `<div class="tbl-fill">${table(['#', 'Idea', 'Type'], Array.from({ length: 22 }, (_, i) => [i + 1, '', '']), { widths: ['7%', '70%'], rh: 9 })}</div>`);
W('time', 'Time &amp; energy audit', 'Shade in the time you already use, then find your free pockets.', `${table(['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], ['Early morning', 'Morning', 'Lunch', 'Afternoon', 'Early evening', 'Evening', 'Late'].map((x) => [`<b>${x}</b>`, '', '', '', '', '', '', '']), { widths: ['17%'], rh: 18 })}${box('Realistic side hustle hours per week', lines(16), 'sage')}`);
W('score', 'Idea scorecard', 'Score each idea 1–5 in every column. The total helps, but trust your gut too.', `${table(['Idea', 'Interest', 'My skills', 'Demand', 'Low cost', 'Fits my time', 'Total'], 6, { widths: ['30%'], rh: 18 })}${box('My chosen idea', lines(), 'fill clay')}`);
W('customer', 'My ideal customer', 'Picture one real person.', `<div class="g2">${box('Who they are', field('Age') + field('Life stage') + field('Job / situation') + field('Where they live'))}${box('Where they are', field('Platforms they use') + field('Where they shop') + field('What they search for'), 'cream')}</div><div class="g2">${box('Their problems &amp; wishes', lines(46), 'sage')}${box('What would make them buy', lines(46))}</div>`);
W('comp', 'Competitor research', 'Look at five people already selling something similar.', `${table(['Competitor', 'What they sell', 'Price', 'What they do well', 'Gap I could fill'], 6, { widths: ['18%', '22%', '10%', '25%'], rh: 22 })}`);
W('offer', 'Offer builder', 'Make your first offer clear and simple.', `<div class="g2">${box('What it is', lines(32))}${box('Who it\'s for', lines(32))}${box('The problem it solves', lines(32), 'sage')}${box('What\'s included', blankCbs(5))}</div>${box('In one sentence: I help [who] to [result] with [offer]', lines(), 'fill clay')}`);
W('price', 'Pricing worksheet', '', `${table(['', '£'], [['Materials / costs per item', ''], ['Time (hours × hourly rate)', ''], ['Fees (platform, payment)', ''], ['Packaging &amp; postage', ''], ['<b>Total cost</b>', ''], ['Competitor prices (range)', ''], ['<b>My price</b>', ''], ['<b>Profit per sale</b>', '']], { widths: ['70%'], rh: 12 })}${box('Sales needed to hit my monthly goal', `<div class="row">${field('Monthly goal £')}${field('÷ profit per sale')}${field('= sales needed')}</div>`, 'sage')}`);
W('costs', 'Startup costs', 'Keep it lean. What do you truly need to start?', `${table(['Item', 'Need now?', '£'], 14, { widths: ['62%', '18%'], rh: 10 })}${box('Total startup budget £', '', 'clay')}`);
add('admin', page(`${head('Worksheet', 'UK admin checklist', 'The basics to check when you start earning from a side hustle. Rules change, so check GOV.UK.')}
${box('', cbs(['Check your employment contract allows a side business', 'Understand the £1,000 trading allowance and whether you need to register for Self Assessment (check GOV.UK for current rules)', 'If you need to, register with HMRC as self-employed (by 5 October after the tax year you started)', 'Keep simple records of all income and expenses from day one', 'Open a separate bank account (makes records much easier)', 'Check if you need insurance (public liability, product liability, professional indemnity)', 'Check any licences or rules for what you sell (food, cosmetics, toys, childcare...)', 'Tell your mortgage lender or landlord if you\'ll work from home with customers or stock', 'Check if your benefits or tax credits are affected', 'Set aside money for tax as you go']))}
${box('Notes &amp; things to look up', lines(), 'fill cream')}`, { sect: 'Worksheets' }));
W('launch', 'Launch checklist', '', `<div class="g2">${box('Before launch', cbs(['Product / offer ready', 'Photos taken', 'Description written', 'Price set', 'Payment and delivery sorted', 'Shop or page live (test it!)']))}${box('Launch day', cbs(['Post on social media', 'Pin to Pinterest', 'Message friends and family', 'Share in groups (where allowed)', 'Ask people to share', 'Celebrate!']), 'sage')}</div>${box('After launch', cbs(['Thank everyone who helped', 'Ask first customers for feedback and reviews', 'Note what worked', 'Plan next week\'s posts']), 'cream')}${box('Notes', lines(), 'fill')}`);
W('money', 'Money tracker', '', `<div class="tbl-fill">${table(['Date', 'In / out', 'What', '£', 'Running total £'], 20, { widths: ['13%', '12%', '45%', '13%'], rh: 9 })}</div>`);
W('routine', 'My weekly side hustle routine', 'Small, regular blocks of time beat occasional marathons.', `${table(['Day', 'When', 'Task', 'Time'], ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => [`<b>${d}</b>`, '', '', '']), { widths: ['10%', '18%', '56%'], rh: 18 })}${box('Non-negotiables (rest, family, sleep)', lines(), 'fill sage')}`);
W('next', 'My next 90 days', 'Well done for getting here. What comes next?', `<div class="g3">${['Month 1', 'Month 2', 'Month 3'].map((m, i) => box(m, `<div class="small muted">Goal</div>${lines(14)}<div class="small muted">Actions</div>${blankCbs(4)}`, i === 0 ? 'clay' : '')).join('')}</div><div class="g2">${box('Biggest win of the 30 days', lines(30), 'sage')}${box('What I\'ll do differently', lines(30))}</div>${box('A note to future me', lines(), 'fill cream')}`);

const idx = ids;
const fix = (s) => s.replace(/\{\{p:(\w+)\}\}/g, (_, id) => { if (!idx[id]) throw new Error('missing ' + id); return idx[id]; });
pages.forEach((p) => { if (p && p.body) p.body = fix(p.body); });
pages[0] = cover({ kicker: 'A gentle 30-day programme', title: 'The 30-Day<br>Side Hustle<br>Starter', lead: 'From "I should start something" to your first sale: one small task a day, 14 worksheets, and UK admin basics.', tags: [`${pages.length} pages`, 'Undated', 'UK friendly'], bottom: 'Built for busy people with jobs, families and full heads.' });

module.exports = {
  file: '30-Day-Side-Hustle-Starter', short: S, title: T, pages, css: CSS2, freebie: [ids.skills, ids.score],
  meta: {
    short: '30-Day Side<br>Hustle Starter', kicker: 'One task a day · Undated · UK friendly', sub: 'From idea to first sale in 30 days, around your real life.',
    hero: [1, ids.w1 + 1], grid: [[ids.ideas, 'Idea brainstorm'], [ids.score, 'Idea scorecard'], [ids.w1 + 1, '30 daily tasks'], [ids.price, 'Pricing worksheet'], [ids.admin, 'UK admin checklist'], [ids.launch, 'Launch checklist']],
    detail: ids.score, detailTitle: 'Choose your idea with confidence', detailPoints: ['Score interest, skills and demand', 'Check cost and time fit', 'Compare up to six ideas', 'Then trust your gut'],
    features: [['30 small tasks', 'Find, check, build and launch your idea'], ['14 worksheets', 'Skills, ideas, customer, competitors, offer and pricing'], ['UK admin basics', 'Trading allowance, HMRC, insurance and records'], ['Keep going', 'Weekly routine, money tracker and a 90-day plan']],
    pins: [['Start a side hustle in 30 days', 'One small task a day', ids.w1 + 1], ['Which side hustle is right for you?', 'A free idea scorecard', ids.score], ['Side hustle UK: what to check first', 'A simple admin checklist', ids.admin]],
    listing: {
      price: '£6.95', title: 'Side Hustle Planner Printable, 30 Day Business Starter Workbook, Small Business Ideas, Start a Business Checklist UK, Pricing Worksheet PDF',
      tags: ['side hustle', 'business planner', 'start a business', 'small business', 'business workbook', 'entrepreneur', 'business ideas', 'goal planner', 'extra income', 'side hustle uk', 'etsy business', 'business startup', 'self employed'],
      hook: 'From idea to first sale in 30 days, around your real life.',
      body: ['A printable 30-day programme for anyone who wants to start a side hustle but doesn\'t know where to begin. One small task a day, about 20–30 minutes, with worksheets to choose, test, price and launch your idea.',
        'INSIDE:\n• 30 daily tasks across four weeks, plus weekly reviews\n• My why, and skills and interests inventory\n• Idea brainstorm and idea scorecard\n• Time and energy audit\n• Ideal customer and competitor research\n• Offer builder and pricing worksheet\n• Startup costs and UK admin checklist\n• Launch checklist and money tracker\n• Weekly routine and 90-day plan'],
      pinCopy: [['How to start a side hustle in 30 days', 'One small task a day, from idea to first sale. Printable workbook.'], ['Which side hustle is right for you? Free scorecard', 'Score your ideas on interest, skills, demand, cost and time.'], ['Starting a side hustle in the UK: what to check', 'Contracts, HMRC, records, insurance and more.'], ['How to price your side hustle', 'A simple pricing worksheet.'], ['Side hustle ideas brainstorm', 'Write 20 ideas, then pick one.']],
      prompts: ['A cosy kitchen table in the evening with a laptop, a cup of tea, and a blank printed A4 workbook page with a pen, warm lamp light, warm cream and sage palette, photorealistic, 4:5'],
    },
  },
};
