const { page, cover, section, lines, cbs, blankCbs, field, table, box, dots5 } = require('../lib');

const T = 'The 30-Day ADHD Money Reset';
const R = (id) => `{{p:${id}}}`; // page reference, resolved at the end

const days = [
  ['Open the envelope', 'Avoiding money stuff is very common, and it usually makes the worry bigger. Today is just about looking.', `List every account you have: current, savings, credit cards, loans, overdrafts, buy now pay later, store cards. Use the accounts list on page ${R('accounts')}.`],
  ['Look at the numbers', 'Knowing the real numbers is almost always less scary than the vague dread of not knowing.', 'Log in to each account and write down today\'s balance next to it. Just write it down. No judging.'],
  ['Find your bills', 'Missed bills can mean late fees. Getting them all in one place is the first step to stopping that.', `List your regular bills, how much they are and when they leave your account. Use the bills page (page ${R('bills')}).`],
  ['Subscription hunt', 'Small monthly payments are easy to forget and add up fast, especially free trials that quietly turned into payments.', `Scroll through the last two or three months of your bank statements. List every subscription on page ${R('subs')}.`],
  ['Cancel one', 'You don\'t need to cut everything, just one thing you don\'t really use or love.', 'Pick one subscription to cancel or pause today. Do it now while you\'re looking at it. Write down what you\'ll save.'],
  ['Set reminders', 'Your brain doesn\'t have to remember dates if your phone does.', 'Put each bill date into your phone calendar with an alert two days before. Check which bills could move to Direct Debit so they pay themselves.'],
  ['Week 1 check-in', 'You\'ve done the hardest part: looking. Take a moment to notice that.', `Fill in the week 1 check-in on page ${R('check1')}. Then have a rest from money for the day.`],
  ['Track today', 'You can\'t change what you can\'t see. One day of tracking shows you a lot.', `Write down every single thing you spend today, however small, on the spending log (page ${R('log')}).`],
  ['Spot your triggers', 'Impulse spending usually has a pattern: a mood, a time of day, a place or an app.', 'Think about the last few things you bought on impulse. Were you bored, tired, sad, stressed, celebrating, or scrolling late at night? Write your triggers below.'],
  ['The waiting list', 'The urge to buy often fades in a day or two. A waiting list gives it time to pass.', `Start your wishlist on page ${R('wish')}. New rule: anything that isn't essential goes on the list and waits 48 hours. Still want it? Then decide.`],
  ['Needs, wants and joys', 'Not all spending is bad. Spending on things that bring you joy is fine, as long as you\'re choosing it.', 'Look at your spending log. Mark each item N (need), W (want) or J (joy). Notice which wants you wouldn\'t miss.'],
  ['Make a simple budget', 'A budget isn\'t a punishment. It\'s a plan for where your money goes, so it doesn\'t just disappear.', `Fill in the simple monthly budget on page ${R('budget')}: money in, bills, everyday spending and what\'s left.`],
  ['Name your fun money', 'Cutting out all fun backfires. A set amount of guilt-free money makes the rest of the budget easier to stick to.', 'Choose a weekly fun-money amount you can afford. Spend it on anything, no guilt. When it\'s gone, it\'s gone until next week.'],
  ['Week 2 check-in', 'Two weeks in. You know more about your money now than you did on day one.', `Fill in the week 2 check-in on page ${R('check2')}.`],
  ['Turn on the helpers', 'Many banking apps have tools that work brilliantly for ADHD brains: alerts, pots and round-ups.', 'Explore your banking app. Turn on spending notifications and a low-balance alert. If your bank offers savings pots or round-ups, set one up.'],
  ['Pay yourself first', 'Saving whatever is "left over" rarely works. Saving first, automatically, means you don\'t have to remember.', 'Set up a standing order to move a small amount into savings on payday. Even £5 counts. Write the amount and date below.'],
  ['Start a buffer', 'A small buffer stops one surprise bill turning into a crisis.', `Set a starter savings goal (for example £100, then one month of bills). Use the colour-in tracker on page ${R('save')}.`],
  ['Look at what you owe', 'Debt can feel shameful, but it\'s just information, and there\'s free help for it.', `List what you owe on page ${R('debt')}. If it feels overwhelming, the free debt charities on page ${R('help')} can help. They won\'t judge you.`],
  ['The yearly costs', 'Some costs only come once a year (car tax, insurance, the TV licence, Christmas) and can catch you out.', `List all your yearly and occasional costs on page ${R('annual')}.`],
  ['Sinking funds', 'Divide a yearly cost by 12 and save that each month, and the bill is already paid when it arrives.', `Choose your most important yearly costs and set them up as sinking funds on page ${R('sink')}.`],
  ['Week 3 check-in', 'Three weeks. You\'re building systems now, not just doing tasks.', `Fill in the week 3 check-in on page ${R('check3')}.`],
  ['Food shop smarter', 'Food is one of the easiest places for money to leak away: impulse buys, waste and takeaways when you\'re tired.', 'Plan a few easy meals, write a list, and try an online shop so you can see the total as you go. Don\'t shop hungry.'],
  ['Check your deals', 'Contracts often go up when the deal ends. People who check and switch, or haggle, often pay less.', 'Write down when your phone, broadband, energy and insurance deals end. Put a reminder in your calendar a month before each one.'],
  ['One money place', 'Losing letters and passwords costs time, stress and sometimes money.', 'Choose one place for all money paperwork: a box, a folder, an email label. Put everything you can find in it today.'],
  ['Your money date', 'A short, regular check-in stops things piling up. Make it something you look forward to.', `Pick a weekly 15-minute money date. Add a nice drink and good music. Use the money date page (page ${R('date')}) as your guide.`],
  ['Declutter for cash', 'Most homes have money sitting in cupboards: things to sell, return or claim back.', 'Find one thing to sell, return or claim back today. List it, post it or book the refund.'],
  ['Check what you\'re owed', 'Lots of people miss out on support they\'re entitled to, like benefits, discounts and social tariffs.', 'Use a free, independent benefits calculator (such as the ones from Turn2us or entitledto, linked from GOV.UK). Ask your energy, water and broadband providers about social tariffs or support schemes.'],
  ['Week 4 check-in', 'Four weeks of looking after your money. That\'s a big deal.', `Fill in the week 4 check-in on page ${R('check4')}.`],
  ['Your money rules', 'A few simple rules mean fewer decisions in the moment.', `Write three to five personal money rules on page ${R('rules')}. Keep them short, so they're easy to remember.`],
  ['Look how far you\'ve come', 'Thirty days ago you started by just opening the envelope.', `Look back at your money snapshot on page ${R('snapshot')}. Then pick three habits to keep going next month.`],
];

const dayHalf = (d, i) => `<div class="box" style="flex:1">
<div class="row" style="flex:none;align-items:center;gap:4mm"><div style="flex:none;text-align:center;width:16mm"><div class="kicker">Day</div><div class="num" style="font-size:26pt">${i + 1}</div></div><div><h2>${d[0]}</h2><p class="small muted">${d[1]}</p></div></div>
<div class="callout sage" style="margin:2.4mm 0"><p class="small"><b>Today:</b> ${d[2]}</p></div>
<div class="row" style="flex:none;font-size:8.4pt;gap:3mm;margin-bottom:1mm"><span class="cb" style="flex:none">Done</span><span class="cb" style="flex:none">Started</span><span class="cb" style="flex:none">Not today, that's okay</span><span style="flex:1"></span><span style="flex:none">Money stress ${dots5()}</span></div>
<div class="label sage" style="margin-top:1mm">${i === 8 ? 'My spending triggers' : i === 15 ? 'Amount and date' : 'Notes'}</div>
${lines()}
</div>`;

const checkIn = (n, id) => ({ id, ...page(`<div class="kicker">Week ${n} check-in</div><h1>Weekly check-in</h1><p class="muted">Five minutes. Just noticing, not judging.</p>
<div class="g2">${box('Money tasks I did this week', lines(34))}${box('Wins, big or small', lines(34), 'clay')}</div>
<div class="g3">${box('Balance now', '<div style="font-size:16pt;color:var(--sage-deep);font-weight:600;margin-top:1mm">£</div>', 'cream')}${box('Fun money left', '<div style="font-size:16pt;color:var(--sage-deep);font-weight:600;margin-top:1mm">£</div>', 'cream')}${box('Money stress', `<div style="margin-top:2mm">${dots5()}</div>`, 'cream')}</div>
<div class="g2">${box('What got in the way', lines(28))}${box('Bills coming up next week', blankCbs(4), 'sage')}</div>
${box('One thing to focus on next week', lines(), 'fill')}`, { sect: `Week ${n} check-in`, deco: 'small' }) });

const pages = [
  cover({ kicker: 'A gentle 30-day money programme', title: 'The 30-Day<br>ADHD Money<br>Reset', lead: 'Stop money slipping through the cracks: one small task a day, no shame, and simple systems that work with your brain.', tags: ['ADHD-friendly', 'Undated', 'UK £', '40 pages'], bottom: 'No spreadsheets, no lectures. Just one small step at a time.' }),

  page(`<div class="kicker">Start here</div><h1>Money, without the shame</h1>
<p class="lead">Forgotten bills, impulse buys, subscriptions you never use, the letters you can't face opening. If money feels chaotic, you're not bad with money. You may just have a brain that finds planning, remembering and waiting harder than most.</p>
<p>This reset doesn't ask you to become a different person. It gives you one small task a day for 30 days. Each one builds a system that does the remembering for you, so money takes up less space in your head.</p>
<div class="g2">
${box('How it works', `<div class="step"><div class="n">1</div><div class="small">Do <b>one task a day</b>. Most take 10–15 minutes.</div></div><div class="step"><div class="n">2</div><div class="small">Use the <b>worksheets</b> at the back when a task sends you there.</div></div><div class="step"><div class="n">3</div><div class="small">Every 7 days, fill in a short <b>check-in</b>.</div></div><div class="step"><div class="n">4</div><div class="small">Finish with your own <b>money rules</b> and habits to keep.</div></div>`)}
${box('The rules', cbs(['It\'s undated, so start any day.', 'Missed a day? Do the next one. No catching up.', 'Hard task? Do half. That counts.', 'No shame. Money is just numbers.', 'Ask for help whenever you need it.']), 'sage')}
</div>
<div class="callout"><p class="tiny">This programme is general information to help you get organised. It isn't financial, debt or legal advice, and Larkspur &amp; Co. isn't a financial adviser. For free, impartial help with money or debt, see the support page (page ${R('help')}).</p></div>`, { sect: 'Welcome', deco: 'tr' }),

  { id: 'contents', ...page(`<div class="kicker">Inside</div><h1>Contents</h1>
<div class="g2" style="gap:8mm;margin-top:3mm"><div>
<h3 style="margin:2mm 0">Getting started</h3>
${[['Money and the ADHD brain', 'adhd'], ['My money snapshot', 'snapshot']].map(([a, b]) => `<div class="toc"><b>${a}</b><span>${R(b)}</span></div>`).join('')}
<h3 style="margin:4mm 0 2mm">The 30 days</h3>
${[['Week 1: Look', 'w1'], ['Week 2: Notice', 'w2'], ['Week 3: Build', 'w3'], ['Week 4: Protect', 'w4'], ['Days 29–30: Keep going', 'w5']].map(([a, b]) => `<div class="toc"><b>${a}</b><span>${R(b)}</span></div>`).join('')}
<h3 style="margin:4mm 0 2mm">All 30 tasks</h3>
<div class="small" style="column-count:2;column-gap:4mm">${days.map((d, i) => `<div>${i + 1}. ${d[0]}</div>`).join('')}</div>
</div><div>
<h3 style="margin:2mm 0">Worksheets</h3>
${[['Accounts list', 'accounts'], ['Bills &amp; Direct Debits', 'bills'], ['Subscription tracker', 'subs'], ['Spending log', 'log'], ['Wishlist (the waiting list)', 'wish'], ['Simple monthly budget', 'budget'], ['Yearly costs', 'annual'], ['Sinking funds', 'sink'], ['What I owe', 'debt'], ['Savings tracker', 'save'], ['Weekly money date', 'date'], ['My money rules', 'rules'], ['Free help &amp; support', 'help']].map(([a, b]) => `<div class="toc"><b>${a}</b><span>${R(b)}</span></div>`).join('')}
</div></div>`, { sect: 'Contents', deco: 'small', cls: 'nofill' }) },

  { id: 'adhd', ...page(`<div class="kicker">Understanding it</div><h1>Money and the ADHD brain</h1>
<p class="lead">People sometimes talk about the "ADHD tax": the extra money that ADHD can cost you. Late fees, forgotten subscriptions, impulse buys, last-minute delivery charges, replacing things you've lost.</p>
<div class="g2">
${[['Out of sight, out of mind', 'Bills you can\'t see are easy to forget. Systems that remind you, or pay automatically, take the pressure off your memory.'], ['Now vs. later', 'The reward of buying now feels much bigger than the reward of saving for later. Waiting lists and automatic saving help.'], ['Avoidance', 'If money feels stressful, it\'s natural to avoid it, but avoiding it usually makes things worse. Small, short check-ins make it easier to face.'], ['Dopamine shopping', 'Buying something new can give a quick lift when you\'re bored or low. Knowing your triggers helps you plan for them.'], ['Boring admin', 'Paperwork, comparing deals and forms are hard to start. Breaking them into tiny steps helps.'], ['Shame', 'Feeling bad about money can make you avoid it even more. This book is shame-free on purpose.']].map(([h, t], i) => box('', `<h3>${h}</h3><p class="small">${t}</p>`, i % 3 === 0 ? 'cream' : '')).join('')}
</div>
<div class="callout sage"><h3>The plan</h3><p class="small">Make money visible, make the important stuff automatic, give yourself guilt-free fun money, and check in little and often. That's what the next 30 days will build.</p></div>
${box('My biggest money headaches right now', lines(), 'fill')}`, { sect: 'Getting started', deco: 'small' }) },

  { id: 'snapshot', ...page(`<div class="kicker">Before you start</div><h1>My money snapshot</h1><p class="muted">A quick picture of where you are today. You'll come back to it on day 30. Fill in what you can, guesses are fine.</p>
${box('Right now, thinking about money makes me feel', `<div class="row small" style="margin:1mm 0"><span>Calm ○</span><span>A bit uneasy ○</span><span>Stressed ○</span><span>I avoid it completely ○</span></div>`)}
<div class="g2">
${box('Things I\'m worried about', blankCbs(5))}
${box('Things I\'m avoiding', blankCbs(5))}
</div>
<div class="g3">
${box('Money in each month (roughly)', '<div style="font-size:15pt;color:var(--sage-deep);font-weight:600;margin-top:1mm">£</div>', 'cream')}
${box('Money in savings', '<div style="font-size:15pt;color:var(--sage-deep);font-weight:600;margin-top:1mm">£</div>', 'cream')}
${box('Money I owe (roughly)', '<div style="font-size:15pt;color:var(--sage-deep);font-weight:600;margin-top:1mm">£</div>', 'cream')}
</div>
<div class="g2">${box('What I\'m already good at', lines(26), 'sage')}${box('In 30 days, I\'d love to...', lines(26), 'clay')}</div>
${box('', `<div class="row">${field('Start date')}${field('Signed')}</div>`)}`, { sect: 'Getting started' }) },
];

const weekNames = [['w1', 'Week 1', 'Look', 'This week is about facing it. You\'ll find out what you have, what you owe and what goes out, without judging any of it.', [0, 7]], ['w2', 'Week 2', 'Notice', 'Now you know the numbers, you\'ll notice how money moves: what you spend, when, and why.', [7, 14]], ['w3', 'Week 3', 'Build', 'Time to build systems that do the remembering for you: alerts, automatic saving and plans for big costs.', [14, 21]], ['w4', 'Week 4', 'Protect', 'This week you\'ll protect your money from leaks: food waste, bad deals, lost paperwork and missed support.', [21, 28]], ['w5', 'Days 29–30', 'Keep going', 'Two last tasks: write your own rules, and look back at how far you\'ve come.', [28, 30]]];
weekNames.forEach(([id, k, name, lead, [a, b]], wi) => {
  pages.push({ id, ...section({ kicker: k, title: name, lead, body: `<div class="g2" style="margin-top:8mm">${box('Tasks', days.slice(a, b).map((d, j) => `<div class="cb">Day ${a + j + 1}: ${d[0]}</div>`).join(''))}${box('My intention', lines(40), 'clay')}</div>` }) });
  for (let i = a; i < b; i += 2) {
    const isCheck = (n) => [6, 13, 20, 27].includes(n);
    if (isCheck(i)) { pages.push(checkIn((i + 1) / 7, `check${(i + 1) / 7}`)); i -= 1; continue; }
    if (i + 1 < b && !isCheck(i + 1)) pages.push(page(`${dayHalf(days[i], i)}${dayHalf(days[i + 1], i + 1)}`, { sect: `Days ${i + 1}–${i + 2} of 30`, deco: 'small' }));
    else { pages.push(page(`${dayHalf(days[i], i)}`, { sect: `Day ${i + 1} of 30`, deco: 'small' })); i -= 1; }
  }
});

const W = (id, title, lead, body, opts = {}) => ({ id, ...page(`<div class="kicker">Worksheet</div><h1 class="sm">${title}</h1><p class="muted">${lead}</p>${body}`, { sect: 'Worksheets', ...opts }) });

pages.push(
  W('accounts', 'Accounts list', 'Every account in one place. Don\'t write passwords or full card numbers here.', `<div class="tbl-fill">${table(['Account', 'Type', 'Bank / lender', 'Balance', 'Date checked'], 14, { widths: ['26%', '18%', '22%', '16%'], rh: 10 })}</div>
${box('Types', '<p class="small">Current · Savings · Credit card · Overdraft · Loan · Car finance · Buy now pay later · Store card · Student loan · Pension</p>', 'cream')}`),
  W('bills', 'Bills &amp; Direct Debits', 'Everything that leaves your account regularly, in date order. Tick "auto" if it pays itself.', `<div class="tbl-fill">${table(['Bill', 'Amount', 'Date', 'How often', 'Auto?', 'Reminder set?'], 18, { widths: ['30%', '13%', '11%', '16%', '11%'], rh: 9.6 })}</div>`),
  W('subs', 'Subscription tracker', 'Streaming, apps, memberships, boxes, cloud storage, gym... List them all, then decide.', `<div class="tbl-fill">${table(['Subscription', '£ / month', 'Renews', 'Use it?', 'Keep / pause / cancel'], 16, { widths: ['32%', '14%', '14%', '14%'], rh: 10 })}</div>
${box('', `<div class="row">${field('Total per month £')}${field('Saved by cancelling £')}</div>`, 'clay')}`),
  W('log', 'Spending log', 'Write down everything for a day or a week. Mark each one N (need), W (want) or J (joy).', `<div class="tbl-fill">${table(['Date', 'What', 'Where', '£', 'N / W / J', 'How I felt'], 20, { widths: ['11%', '29%', '19%', '10%', '11%'], rh: 9 })}</div>`),
  W('wish', 'Wishlist: the waiting list', 'New rule: anything that isn\'t essential goes here first and waits at least 48 hours. Then decide.', `<div class="tbl-fill">${table(['Date', 'Thing I want', '£', 'Still want it after 48h?', 'Bought / let go'], 16, { widths: ['12%', '38%', '11%', '19%'], rh: 10 })}</div>
${box('', `<div class="row">${field('Money saved by waiting £')}</div>`, 'sage')}`),
  W('budget', 'Simple monthly budget', 'Four boxes, that\'s all. Money in, minus bills, minus everyday spending, minus saving, equals what\'s left.', `<div class="g2">
${box('1. Money in', table(['Source', '£'], [['Wages', ''], ['Benefits', ''], ['Other', ''], ['', ''], ['<b>Total in</b>', '']], { widths: ['70%'], rh: 8 }), 'sage')}
${box('2. Bills (fixed)', table(['Bill', '£'], [['Rent / mortgage', ''], ['Council tax', ''], ['Energy', ''], ['Phone &amp; broadband', ''], ['', ''], ['<b>Total bills</b>', '']], { widths: ['70%'], rh: 7.4 }))}
${box('3. Everyday spending', table(['What', '£'], [['Food shopping', ''], ['Travel / fuel', ''], ['Fun money', ''], ['Other', ''], ['<b>Total everyday</b>', '']], { widths: ['70%'], rh: 8 }))}
${box('4. Saving &amp; debts', table(['What', '£'], [['Savings / buffer', ''], ['Sinking funds', ''], ['Extra debt payments', ''], ['', ''], ['<b>Total</b>', '']], { widths: ['70%'], rh: 8 }))}
</div>
${box('', `<div class="row" style="align-items:center"><b style="color:var(--sage-deep)">Money in − bills − everyday − saving =</b><div style="font-size:16pt;color:var(--clay-deep);font-weight:600">£</div></div><p class="tiny muted">Below zero? That's useful to know. Look at where to trim, or get free advice (page ${R('help')}).</p>`, 'clay')}`),
  W('annual', 'Yearly &amp; occasional costs', 'The costs that come round once a year and catch you out. Divide each one by 12 to see what to put aside monthly.', `<div class="tbl-fill">${table(['Cost', 'Month due', '£ per year', '÷ 12 = £ per month'], [['Car tax', '', '', ''], ['Car insurance &amp; MOT', '', '', ''], ['Home / contents insurance', '', '', ''], ['TV licence', '', '', ''], ['Christmas', '', '', ''], ['Birthdays', '', '', ''], ['Holidays', '', '', ''], ['Glasses / dentist', '', '', ''], ['School costs', '', '', ''], ['Pet costs', '', '', ''], ['Subscriptions paid yearly', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['<b>Total</b>', '', '', '']], { widths: ['38%', '18%', '20%'], rh: 9.6 })}</div>`),
  W('sink', 'Sinking funds', 'A sinking fund is a small pot you add to each month for a cost you know is coming. Colour in a box for each payment you make.', `<div class="g2 grow">${Array.from({ length: 4 }, () => box('', `${field('Saving for')}<div class="row">${field('Goal £')}${field('By')}</div>${field('Each month £')}<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:1.6mm;margin-top:2mm">${Array.from({ length: 12 }, (_, k) => `<div style="height:9mm;border:.9pt solid var(--clay);border-radius:1.6mm;font-size:6.5pt;color:var(--ink-soft);padding:.6mm 1mm">${k + 1}</div>`).join('')}</div><div class="label sage" style="margin-top:2.5mm">Notes</div>${lines()}`, 'fill')).join('')}</div>`),
  W('debt', 'What I owe', 'Write it down, then breathe. This is just information. Don\'t include passwords or full account numbers.', `<div class="tbl-fill">${table(['Who to', 'Amount owed', 'Monthly payment', 'Interest %', 'Due date', 'Notes'], 10, { widths: ['22%', '15%', '15%', '12%', '12%'], rh: 10 })}</div>
<div class="callout sage"><h3>Struggling to keep up?</h3><p class="small">Free debt advice charities such as StepChange, National Debtline and Citizens Advice can help you work out a plan, and they won't judge you. Avoid companies that charge fees for debt help. The free ones are just as good. See page ${R('help')}.</p></div>`),
  W('save', 'Savings tracker', 'Colour in one circle each time you save. Watching it fill up is half the fun.', `${box('', `<div class="row">${field('Saving for')}${field('Goal £')}${field('Each circle = £')}</div>`, 'cream')}
<div style="display:grid;grid-template-columns:repeat(10,12.5mm);gap:2.4mm;margin:2mm auto">${Array.from({ length: 100 }, (_, k) => `<div style="height:12.5mm;border:1pt solid ${k % 10 === 9 ? 'var(--sage)' : 'var(--clay)'};border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:6.5pt;color:var(--ink-soft)">${k + 1}</div>`).join('')}</div>
<div class="g2">${box('When I reach my goal, I\'ll celebrate by', lines(16), 'clay')}${box('Next goal', lines(16), 'sage')}</div>`),
  W('date', 'Weekly money date', '15 minutes, once a week. Make it pleasant: a nice drink, music, a comfy spot. Follow the checklist and tick it off.', `<div class="g2">
${box('The checklist', cbs(['Check the balance of each account', 'Look at what\'s gone out this week', 'Check bills coming up next week', 'Open any money post or emails', 'Move fun money for next week', 'Add to savings if you can', 'Check the wishlist: buy or let go?', 'Note one money win']))}
${box('My money date', field('Day') + field('Time') + field('Place') + field('Treat') + field('Body double?'), 'sage')}
</div>
${box('Money dates done (tick each week)', `<div style="display:grid;grid-template-columns:repeat(13,1fr);gap:1.6mm;margin-top:1mm">${Array.from({ length: 52 }, (_, k) => `<div style="aspect-ratio:1;border:.9pt solid var(--clay);border-radius:1.4mm;font-size:6pt;color:var(--ink-soft);display:flex;align-items:center;justify-content:center">${k + 1}</div>`).join('')}</div>`, 'cream')}`),
  W('rules', 'My money rules', 'A few simple rules mean fewer decisions in the moment. Make them short, kind and your own.', `<div class="col">${Array.from({ length: 5 }, (_, k) => `<div class="box" style="flex-direction:row;gap:4mm;align-items:center"><div class="num" style="font-size:22pt;flex:none;width:10mm">${k + 1}</div><div style="flex:1">${lines(15)}</div></div>`).join('')}</div>
${box('Ideas to borrow', '<p class="small">Anything over £20 waits 48 hours · No shopping apps on my phone · I check my balance before I buy · Saving happens on payday, automatically · Fun money is guilt-free · I open money post on my money date · I never shop hungry or tired</p>', 'cream')}
<div class="g2">${box('Three habits I\'ll keep next month', blankCbs(3), 'clay')}${box('Then and now: money stress', `<div class="small">Day 1: ${dots5()}</div><div class="small" style="margin-top:2mm">Day 30: ${dots5()}</div>`, 'sage')}</div>`),
  W('help', 'Free help &amp; support (UK)', 'These organisations give free, impartial help. You don\'t have to be in crisis to contact them.', `<div class="g2">
${[['MoneyHelper', 'moneyhelper.org.uk', 'Free, impartial money guidance backed by the government: budgeting, pensions, benefits and debt.'], ['StepChange', 'stepchange.org', 'Free debt advice charity. Online tools and advisers to help you make a plan.'], ['National Debtline', 'nationaldebtline.org', 'Free, confidential debt advice by phone, webchat and online.'], ['Citizens Advice', 'citizensadvice.org.uk', 'Free advice on money, benefits, housing, work and more, online or in person.'], ['Turn2us', 'turn2us.org.uk', 'Benefits calculator and grants search for people struggling financially.'], ['Samaritans', 'Call 116 123, free, any time', 'If money worries are affecting your mental health, you can talk to someone, day or night.']].map(([h, u, t], i) => box('', `<h3>${h}</h3><div class="small" style="color:var(--sage-deep);font-weight:500">${u}</div><p class="small" style="margin-top:1mm">${t}</p>`, i % 3 === 0 ? 'cream' : '')).join('')}
</div>
<div class="callout"><p class="small">Be wary of companies that cold-call, charge upfront fees for debt help, or promise to "write off" debt. The free services above are the best place to start. Services and contact details can change, so check their websites for the latest information.</p></div>
<div class="callout sage"><h3>Thank you</h3><p class="small">Thank you for choosing Larkspur &amp; Co. If this helped, a short Etsy review means the world to a small Glasgow business. More gentle planners at <b>larkspurco.uk</b>.</p></div>`, { cls: 'nofill' }),
);

// Resolve page references.
const idx = {};
pages.forEach((p, i) => { if (p.id) idx[p.id] = i + 1; });
const fix = (s) => s.replace(/\{\{p:(\w+)\}\}/g, (_, id) => { if (!idx[id]) throw new Error('missing ref ' + id); return idx[id]; });
pages.forEach((p) => { if (p.body) p.body = fix(p.body); });

module.exports = { file: '30-Day-ADHD-Money-Reset', short: 'Money Reset', title: T, pages, freebie: [idx.subs, idx.date] };
