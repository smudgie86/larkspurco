const { page, cover, section, lines, cbs, blankCbs, field, table, box, dots5 } = require('../lib');

const T = 'The ADHD Christmas Survival Guide';

const weeks = [
  { n: 6, name: 'Decide', lead: 'Before anything gets bought, decide what this Christmas is for. Big decisions now mean fewer small ones later.',
    tasks: ['Fill in "Your Good Enough Christmas" (page 6)', 'Set a total budget, even a rough one', 'Write the gift list: names only, no ideas yet', 'Ask: who is hosting, and where will we be?', 'Put the key dates on one calendar', 'Pick one thing to drop this year'] },
  { n: 5, name: 'Gather', lead: 'Collect the information you need before you start spending. Lists first, shopping second.',
    tasks: ['Add one gift idea per person (rough is fine)', 'Check what is already in the wrapping drawer', 'Order anything that needs personalising', 'Write the card list, or decide not to send cards', 'Book any travel, time off or childcare', 'Check last posting dates for anyone abroad'] },
  { n: 4, name: 'Buy', lead: 'The main shopping week. Aim to get most of the gifts sorted, then stop looking.',
    tasks: ['Order most of the gifts in one sitting', 'Log everything on the gift tracker as you buy it', 'Keep receipts in one envelope or folder', 'Buy wrapping, tape, tags and batteries', 'Plan the Christmas Day menu (page 20)', 'Book a food delivery or collection slot'] },
  { n: 3, name: 'Wrap & post', lead: 'Turn bought things into finished things. Little and often beats one giant wrapping night.',
    tasks: ['Wrap five gifts a night with a film or podcast on', 'Write and post the cards', 'Post parcels for anyone far away', 'Put the decorations up, or a simple version', 'Plan rest days into the calendar', 'Check the gift tracker for gaps'] },
  { n: 2, name: 'Prepare', lead: 'Get ready for the busy days so future you has less to think about.',
    tasks: ['Write the Christmas Day timeline (page 21)', 'Fill in your sensory survival kit (page 26)', 'Plan your escape routes and quiet breaks', 'Make and freeze anything you can', 'Charge everything, buy spare batteries', 'Pack bags if you are travelling'] },
  { n: 1, name: 'Arrive', lead: 'Nearly there. Keep this week light: finish, rest, and let the rest go.',
    tasks: ['Collect or receive the food shop', 'Finish the last bits of wrapping', 'Put gifts in one place, sorted by person', 'Fill in your Christmas Day plan (page 28)', 'Do one thing just for fun', 'Remind yourself: good enough is the goal'] },
];

const weekPage = (w) => page(`
<div class="row" style="align-items:flex-end;flex:none"><div style="flex:none"><div class="num">${w.n}</div><div class="kicker">weeks to go</div></div><div><h1 class="sm">Week ${7 - w.n}: ${w.name}</h1><p class="muted">${w.lead}</p></div></div>
<div class="row grow">
  <div class="col">
    ${box('Suggested this week', cbs(w.tasks, 'line') + blankCbs(2))}
    ${box('My top three', blankCbs(3), 'sage')}
  </div>
  <div class="col">
    ${box('One small thing a day', ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => `<div class="field"><span style="width:9mm;color:var(--clay-deep);font-weight:600">${d}</span><i></i></div>`).join(''))}
    ${box('Brain dump', lines(), 'fill')}
  </div>
</div>
${box('', `<div class="row" style="align-items:center"><span class="small"><b>Energy this week</b> ${dots5()}</span><span class="small"><b>Spent so far</b> £ ________</span><span class="small"><b>Rest day</b> ____________</span></div>`, 'cream')}
`, { sect: `Six-week countdown · Week ${7 - w.n}`, deco: 'small' });

const pages = [
  cover({ kicker: 'A gentle planner for busy brains', title: 'The ADHD<br>Christmas<br>Survival Guide', lead: 'Plan a calmer, good-enough Christmas: six-week countdown, gifts, food, money, sensory overload and the recovery after.', tags: ['Undated', 'Print at home', '38 pages'], bottom: 'Print the pages you need. Skip the ones you don\'t. Nothing here needs finishing to count.' }),

  page(`<div class="kicker">Start here</div><h1>Welcome. Breathe.</h1>
<p class="lead">Christmas asks a lot of a busy brain: hundreds of tiny decisions, deadlines that don't move, money, noise, people and a house full of stuff. This guide carries some of that for you.</p>
<div class="g2" style="margin-top:2mm">
${box('How to use this guide', `<div class="step"><div class="n">1</div><div>Start with <b>Your Good Enough Christmas</b>. It takes ten minutes and makes every later choice easier.</div></div><div class="step"><div class="n">2</div><div>Follow the <b>six-week countdown</b>. Each week has suggested tasks. Tick what helps, ignore what doesn't.</div></div><div class="step"><div class="n">3</div><div>Use the <b>planners</b> (gifts, food, money, people) whenever you need them.</div></div><div class="step"><div class="n">4</div><div>Keep the <b>survival pages</b> handy for the busy days themselves.</div></div>`)}
${box('The rules', cbs(['Undated. Start any day, any week.', 'Behind? Jump to the week you\'re in. No catching up.', 'Print only what you need. Print pages twice if you want.', 'A half-filled page still helped.', 'Good enough is the goal. Perfect isn\'t on the list.']), 'sage')}
</div>
<div class="callout"><h3>Starting late?</h3><p class="small">If Christmas is less than six weeks away, begin at the week that matches the time you have left. Do the Good Enough page first, then the gift list, then the food plan. Everything else is a bonus.</p></div>
${box('This Christmas I want to feel...', lines(), 'fill')}
<p class="tiny muted">This guide is a planning tool, not medical advice. If the season is affecting your mental health, please talk to your GP or someone you trust. In the UK you can call Samaritans free on 116 123, day or night.</p>
`, { sect: 'Welcome', deco: 'tr' }),

  page(`<div class="kicker">Inside</div><h1>Contents</h1>
<div class="g2" style="gap:8mm;margin-top:3mm"><div>
<h3 style="margin:2mm 0">Get ready</h3>
${[['Why Christmas is hard for busy brains', 4], ['What I\'m worried about', 5], ['Your Good Enough Christmas', 6], ['Christmas on one page', 7], ['The six-week countdown', 8]].map(([a, b]) => `<div class="toc"><b>${a}</b><span>${b}</span></div>`).join('')}
<h3 style="margin:4mm 0 2mm">Plan it</h3>
${[['Budget planner', 15], ['Gift tracker', 16], ['Gift idea bank', 18], ['Cards & post tracker', 19], ['Christmas Day menu', 20], ['Christmas Day timeline', 21], ['Food shopping list', 22], ['Low-energy food shortcuts', 23], ['People & plans', 24]].map(([a, b]) => `<div class="toc"><b>${a}</b><span>${b}</span></div>`).join('')}
</div><div>
<h3 style="margin:2mm 0">Survive it</h3>
${[['Social energy budget', 25], ['Sensory survival kit', 26], ['Scripts for tricky moments', 27], ['My Christmas Day plan', 28], ['Stuck? Start here', 29], ['Decorations, made simple', 30], ['Kids at Christmas', 31]].map(([a, b]) => `<div class="toc"><b>${a}</b><span>${b}</span></div>`).join('')}
<h3 style="margin:4mm 0 2mm">Recover</h3>
${[['The recovery days', 32], ['Returns & thank-yous', 33], ['The January reset', 34], ['Notes for next year', 35]].map(([a, b]) => `<div class="toc"><b>${a}</b><span>${b}</span></div>`).join('')}
<h3 style="margin:4mm 0 2mm">Extra pages</h3>
${[['December daily page', 36], ['December tracker', 37], ['Ten-minute tasks', 38]].map(([a, b]) => `<div class="toc"><b>${a}</b><span>${b}</span></div>`).join('')}
</div></div>`, { sect: 'Contents', deco: 'small', cls: 'nofill' }),

  page(`<div class="kicker">Understanding it</div><h1>Why Christmas is hard<br>for busy brains</h1>
<p class="lead">If December leaves you exhausted, scattered or snappy, that isn't a character flaw. The season stacks up exactly the things many ADHD brains find hardest.</p>
<div class="g2">
${[['Decisions, decisions', 'Every gift, menu, plan and outfit is a choice. Making lots of choices drains the same energy you need to get things done.'], ['Hard deadlines', 'Most of the year, late is annoying. At Christmas, late means a missed post or a closed shop. Time blindness meets a date that won\'t move.'], ['Money pressure', 'Lots of small purchases are easy to lose track of, and impulse buys feel festive in the moment.'], ['Sensory overload', 'Lights, music, crowds, wrapping paper, strong smells, scratchy jumpers and noisy rooms all add up.'], ['Broken routines', 'Days off, late nights, travel and different food remove the structure that usually holds things together.'], ['People, all at once', 'Socialising takes energy, and Christmas packs in more of it, often with people who know exactly how to press your buttons.']].map(([h, t]) => box('', `<h3>${h}</h3><p class="small">${t}</p>`)).join('')}
</div>
<div class="callout sage"><h3>So the plan is simple</h3><p class="small">Make big decisions early, write everything down in one place, protect your energy, and lower the bar on purpose. That's what every page in this guide is built to do.</p></div>
${box('What feels hardest for me this year', lines(), 'fill')}`, { sect: 'Get ready', deco: 'small' }),

  page(`<div class="kicker">Get ready</div><h1>What I'm worried about</h1><p class="muted">Get the worries out of your head and onto paper. Then sort them: some you can act on, some you can let go.</p>
<div class="row grow">${box('Everything on my mind about Christmas', lines(), 'fill')}</div>
<div class="g3">${box('I can do something about', lines(32))}${box('I can ask for help with', lines(32))}${box('I can let go of', lines(32), 'sage')}</div>`, { sect: 'Get ready' }),

  page(`<div class="kicker">The most important page</div><h1>Your Good Enough Christmas</h1><p class="muted">Christmas can't be everything to everyone. Decide what matters to you, and give yourself permission to do the rest the easy way or not at all.</p>
<div class="g2">
${box('Three things that make Christmas feel like Christmas to me', blankCbs(3), 'clay')}
${box('Three feelings I want more of', blankCbs(3), 'sage')}
</div>
<div class="g2">
${box('I will do these the easy way', `<p class="tiny muted">Shop-bought, delivered, gift cards, shortcuts...</p>${blankCbs(5)}`)}
${box('I am dropping these this year', `<p class="tiny muted">Cards? Baking? That party? The big clean?</p>${blankCbs(5)}`)}
</div>
${box('I can ask for help with', blankCbs(3))}
<div class="g2">
${box('My total budget', `<div style="font-size:20pt;color:var(--sage-deep);font-weight:600;margin:2mm 0">£</div>`)}
${box('Christmas will be good enough if...', lines(16))}
</div>
${box('A note to myself for the busy days', lines(), 'fill sage')}`, { sect: 'Get ready', deco: 'small' }),

  page(`<div class="kicker">Get ready</div><h1>Christmas on one page</h1><p class="muted">One place for every date and detail. Stick it on the fridge.</p>
<div class="g2">${box('Key dates', table(['Date', 'What'], 9, { widths: ['26%'], rh: 7 }))}${box('Where we\'ll be', ['Christmas Eve', 'Christmas Day', 'Boxing Day', 'New Year\'s Eve', 'New Year\'s Day'].map(field).join('') + field('Travel booked?'))}</div>
<div class="g3">${box('Hosting?', field('Who') + field('How many') + field('Dietary needs') + field('Bring'))}${box('Time off', field('Last work day') + field('Back on') + field('School ends') + field('School back'))}${box('Last order & post dates', field('UK 2nd class') + field('UK 1st class') + field('Abroad') + field('Online shop'))}</div>
<div class="row grow">${box('Notes', lines(), 'fill')}</div>
<p class="tiny muted">Posting dates change every year. Check Royal Mail (or your carrier) and each shop's delivery cut-off.</p>`, { sect: 'Get ready' }),

  page(`<div class="kicker">The plan</div><h1>The six-week countdown</h1><p class="muted">Each week has one job. The weekly pages break it into small tasks you can tick off. Just tick off what helps.</p>
<div class="col" style="margin-top:2mm">${weeks.map((w) => `<div class="box" style="flex-direction:row;gap:5mm;align-items:center"><div style="flex:none;width:18mm;text-align:center"><div class="num" style="font-size:24pt">${w.n}</div><div class="tiny muted">weeks to go</div></div><div style="flex:1"><h2>Week ${7 - w.n}: ${w.name}</h2><p class="small muted">${w.lead}</p></div><div style="flex:none" class="small">Dates:<br>__________</div></div>`).join('')}</div>`, { sect: 'Six-week countdown', deco: 'small' }),

  ...weeks.map(weekPage),

  page(`<div class="kicker">Plan it</div><h1>Budget planner</h1><p class="muted">Decide the total first, then split it. When a category runs out, it's out. That's what makes it work.</p>
${box('', `<div class="row"><div><div class="label">Total budget</div><div style="font-size:18pt;color:var(--sage-deep);font-weight:600">£</div></div><div><div class="label">Where it's coming from</div>${lines(14)}</div></div>`, 'cream')}
${table(['Category', 'Budget', 'Spent', 'Left', 'Notes'], [['Gifts', '', '', '', ''], ['Food & drink', '', '', '', ''], ['Cards & postage', '', '', '', ''], ['Wrapping', '', '', '', ''], ['Decorations', '', '', '', ''], ['Travel', '', '', '', ''], ['Going out', '', '', '', ''], ['Clothes', '', '', '', ''], ['Kids\' extras', '', '', '', ''], ['Charity', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['Total', '', '', '', '']], { widths: ['26%', '14%', '14%', '14%'], rh: 8.4 })}
<div class="callout"><h3>Impulse-buy parking space</h3><p class="small">Saw something lovely you didn't plan for? Write it here and wait 48 hours. If you still want it and the budget has room, go for it.</p>${lines(22)}</div>`, { sect: 'Plan it · Money' }),

  page(`<div class="kicker">Plan it</div><h1>Gift tracker</h1><p class="muted">One line per person. Tick each stage as you go so nothing gets lost.</p>
<div class="tbl-fill">${table(['Who', 'Gift idea', '£', 'Bought', 'Wrapped', 'Given / sent'], 19, { widths: ['20%', '38%', '9%', '11%', '11%'], rh: 9.6 })}</div>`, { sect: 'Plan it · Gifts' }),
  page(`<div class="kicker">Plan it</div><h1>Gift tracker (continued)</h1><p class="muted">Include the extras: teachers, neighbours, secret Santa, the postie.</p>
<div class="tbl-fill">${table(['Who', 'Gift idea', '£', 'Bought', 'Wrapped', 'Given / sent'], 19, { widths: ['20%', '38%', '9%', '11%', '11%'], rh: 9.6 })}</div>`, { sect: 'Plan it · Gifts' }),

  page(`<div class="kicker">Plan it</div><h1>Gift idea bank</h1><p class="muted">Stuck on what to buy? Choose a type first, then the gift. It turns one huge decision into two small ones.</p>
<div class="g2">
${[['Something to eat or drink', 'Hamper, favourite sweets, posh coffee or tea, a local bakery voucher, hot chocolate kit.'], ['Something to do', 'Cinema or theatre tickets, a class, a day out, a puzzle book, a jigsaw, a board game.'], ['Something cosy', 'Socks, blanket, slippers, hot water bottle, candle, bath things.'], ['Something useful', 'A good umbrella, a phone charger, a reusable cup, a decent pen, kitchen gadgets they mentioned.'], ['Something to keep', 'A framed photo, a book you loved, a plant, something handmade.'], ['Time, not things', 'A promise of a meal out, babysitting, a walk together, help with a job they\'ve been putting off.']].map(([h, t]) => box('', `<h3>${h}</h3><p class="small">${t}</p>`)).join('')}
</div>
${box('Ideas I\'ve heard people mention this year', lines(), 'fill')}
<p class="tiny muted">Tip: keep a note on your phone called "Gift ideas" all year round. Future you will be very grateful.</p>`, { sect: 'Plan it · Gifts', deco: 'small' }),

  page(`<div class="kicker">Plan it</div><h1>Cards &amp; post tracker</h1><p class="muted">Sending cards is optional. If you do, tick as you go. If you don't, a message in January counts too.</p>
<div class="tbl-fill">${table(['Name', 'Address checked', 'Card written', 'Posted', 'Received one'], 20, { widths: ['36%'], rh: 9.2 })}</div>
<div class="callout sage"><p class="small"><b>Parcels:</b> note the tracking numbers on the back of this page, or take a photo of each receipt in one album on your phone.</p></div>`, { sect: 'Plan it · Cards' }),

  page(`<div class="kicker">Plan it · Food</div><h1>Christmas Day menu</h1><p class="muted">Plan the meal you'll enjoy, not the one on the magazine cover. Shop-bought counts. Frozen counts.</p>
<div class="g2">
${box('Number of people', field('Adults') + field('Children') + field('Dietary needs') + field('Allergies'))}
${box('Who\'s bringing what', lines(30))}
</div>
<div class="g2">
${['Starter or nibbles', 'Main', 'Sides', 'Pudding', 'Drinks', 'Evening food'].map((x) => box(x, lines(22) + `<div class="tiny muted">Make / buy / ask someone?</div>`)).join('')}
</div>
${box('Easy swaps I\'m allowed to make', lines(14), 'cream')}`, { sect: 'Plan it · Food' }),

  page(`<div class="kicker">Plan it · Food</div><h1>Christmas Day timeline</h1><p class="muted">Start with the time you want to eat, then work backwards using the cooking times on the packets. Write it all down so you don't have to hold it in your head.</p>
${box('', `<div class="row"><div>${field('We want to eat at')}</div><div>${field('Oven on at')}</div><div>${field('Guests arrive')}</div></div>`, 'cream')}
<div class="tbl-fill">${table(['Time', 'What happens', 'Who', 'Done'], 18, { widths: ['15%', '55%', '18%'], rh: 9 })}</div>
<p class="tiny muted">Always follow the cooking instructions on your food packaging, and make sure meat is cooked right through and piping hot.</p>`, { sect: 'Plan it · Food' }),

  page(`<div class="kicker">Plan it · Food</div><h1>Food shopping list</h1><p class="muted">Grouped by where it lives in the shop, so you're not zig-zagging round the aisles.</p>
<div class="g3 grow">
${['Fruit & veg', 'Meat & fish', 'Fridge', 'Freezer', 'Cupboard', 'Bakery', 'Drinks', 'Snacks & treats', 'Non-food'].map((x) => box(x, blankCbs(5))).join('')}
</div>
${box('', field('Delivery or collection slot') + field('Order by'), 'cream')}`, { sect: 'Plan it · Food' }),

  page(`<div class="kicker">Plan it · Food</div><h1>Low-energy food shortcuts</h1><p class="muted">Tick the ones you'll use. None of them is cheating.</p>
<div class="g2">
${box('On the day', cbs(['Buy pre-peeled, pre-chopped veg', 'Use frozen roast potatoes and Yorkshires', 'A ready-stuffed or boneless joint', 'Shop-bought gravy and stuffing', 'Cook two sides, not seven', 'Lay the table the night before', 'Use foil trays to save on washing up', 'Give every guest one job']))}
${box('The days around it', cbs(['A "snack table" instead of meals on Boxing Day', 'Leftovers wraps and sandwiches', 'Freezer meals made in November', 'A takeaway night planned on purpose', 'Pizza and a film on Christmas Eve', 'Paper plates for one day. It\'s fine.', 'A breakfast that needs no cooking', 'A fruit bowl you can grab from']))}
</div>
<div class="callout"><h3>Food safety basics</h3><p class="small">Get leftovers into the fridge within two hours, eat them within two days, and reheat until steaming hot all the way through. Reheat food only once. Check the Food Standards Agency website for current guidance.</p></div>
${box('My shortcuts', blankCbs(4))}`, { sect: 'Plan it · Food', deco: 'small' }),

  page(`<div class="kicker">Plan it · People</div><h1>People &amp; plans</h1><p class="muted">Who you'll see, where, and what you need to bring. Add how much energy each one will cost, so you can plan rest around it.</p>
<div class="tbl-fill">${table(['Date', 'Who / where', 'Travel', 'Bring', 'Energy'], 15, { widths: ['13%', '33%', '16%', '22%'], rh: 12 })}</div>
<p class="tiny muted">Energy: rate each one low / medium / high. Try not to put two highs back to back.</p>`, { sect: 'Plan it · People' }),

  page(`<div class="kicker">Survive it</div><h1>Social energy budget</h1><p class="muted">Think of your social energy as spoons (a way of describing limited energy, from Christine Miserandino's spoon theory). You start each day with a set number. Every event costs some. Rest puts a few back.</p>
${box('', `<div class="row"><div>${field('Spoons I usually have in a day')}</div><div>${field('My early warning signs')}</div></div>`, 'cream')}
<div class="tbl-fill">${table(['Event', 'Spoons it costs', 'Recovery I need after', 'Booked in?'], 10, { widths: ['36%', '16%', '34%'], rh: 10 })}</div>
<div class="g2">${box('Things that cost me the most', blankCbs(4))}${box('Things that give me spoons back', blankCbs(4), 'sage')}</div>`, { sect: 'Survive it', deco: 'small' }),

  page(`<div class="kicker">Survive it</div><h1>Sensory survival kit</h1><p class="muted">Plan for noise, crowds and overwhelm before they happen. Pack a little kit and know where your quiet spot is.</p>
<div class="g2">
${box('My kit (tick what you\'ll take)', cbs(['Earplugs or loop-style earplugs', 'Headphones and a calming playlist', 'Sunglasses for bright lights', 'A comfy outfit (soft, no scratchy labels)', 'Fidget or something to hold', 'Water bottle and a safe snack', 'Phone charger', 'Medication, if you take any', 'Something that smells familiar']) + blankCbs(2))}
<div class="col">
${box('Things that overwhelm me', blankCbs(4))}
${box('Things that calm me down', blankCbs(4), 'sage')}
</div></div>
<div class="g2">
${box('My quiet spot at each place', field('Home') + field('Family') + field('Friends') + field('Out'))}
${box('My signal to my person', `<p class="tiny muted">A word or gesture that means "I need a break".</p>${lines(18)}`, 'clay')}
</div>
${box('After a big day, I recover by', lines(), 'fill')}`, { sect: 'Survive it' }),

  page(`<div class="kicker">Survive it</div><h1>Scripts for tricky moments</h1><p class="muted">When you're overwhelmed, finding words is hard. Pick a few lines now, so they're ready when you need them.</p>
<div class="g2">
${[['Saying no', ['"Thanks for asking. I can\'t this year, but I\'d love to see you in January."', '"We\'re keeping things quiet this year."', '"I\'m going to sit this one out."']], ['Leaving early', ['"I\'m going to head off. This has been lovely."', '"I\'ve hit my limit for today, so I\'m off to rest."', '"I need to get back, but I\'m really glad I came."']], ['Taking a break', ['"I\'m just going to get some air."', '"Back in ten, I\'m grabbing a quiet minute."', '"I\'m going to help in the kitchen." (often quieter!)']], ['Awkward questions', ['"I\'d rather not get into that today. How are you?"', '"Still working it out. What about you?"', '"That\'s a big question for a Christmas dinner!"']], ['Gifts and money', ['"We\'re doing a secret Santa this year to keep it simple."', '"We\'re only buying for the kids this year."', '"We\'re on a tight budget, so we\'re keeping gifts small."']]].map(([h, items]) => box(h, items.map((s) => `<p class="small" style="margin:.8mm 0">${s}</p>`).join(''))).join('')}
</div>
${box('My own lines', lines(), 'sage fill')}`, { sect: 'Survive it', deco: 'small' }),

  page(`<div class="kicker">Survive it</div><h1>My Christmas Day plan</h1><p class="muted">A plan for the day itself, so you're not deciding everything on the spot.</p>
<div class="g2">
${box('My non-negotiables', `<p class="tiny muted">The few things that make the day feel right.</p>${blankCbs(3)}`, 'clay')}
${box('Things I\'m letting go of', blankCbs(3))}
</div>
${box('Rough shape of the day', ['Morning', 'Midday', 'Afternoon', 'Evening'].map(field).join(''))}
<div class="g2">
${box('Planned breaks', `${field('Break 1')}${field('Break 2')}${field('Break 3')}`)}
${box('If it gets too much I will', blankCbs(3), 'sage')}
</div>
<div class="g2">${box('Who can help me on the day', lines(22))}${box('One small treat just for me', lines(22), 'cream')}</div>`, { sect: 'Survive it' }),

  page(`<div class="kicker">Survive it · Keep this handy</div><h1>Stuck? Start here.</h1><p class="muted">When it all feels like too much, follow the arrows. One box at a time.</p>
<div class="col" style="align-items:center;gap:2mm;margin-top:2mm">
${[['Stop.', 'Put down what you\'re holding. Take three slow breaths.'], ['Body check.', 'Hungry? Thirsty? Too hot? Too loud? Fix the easiest one.'], ['Get it out.', 'Write everything in your head on a scrap of paper. All of it.'], ['Circle one.', 'Pick the smallest thing that has to happen today.'], ['Shrink it.', 'What\'s the first two-minute step? Only that.'], ['Do just that.', 'Set a timer for five minutes. Stop when it rings if you want.'], ['Check in.', 'Better? Pick the next tiny step. Still too much? Rest. Ask for help. Try again later.']].map(([h, t], i) => `${i ? '<div style="color:var(--clay);font-size:13pt;line-height:1">↓</div>' : ''}<div class="box ${i % 2 ? 'sage' : 'clay'}" style="width:130mm;flex-direction:row;gap:4mm;align-items:center;padding:3mm 5mm"><b style="color:var(--sage-deep);font-size:11pt;flex:none;width:28mm">${h}</b><span class="small">${t}</span></div>`).join('')}
</div>
<div class="spacer"></div>
<p class="center small muted">You don't have to do Christmas all at once. You just have to do the next small thing.</p>`, { sect: 'Survive it', deco: 'small' }),

  page(`<div class="kicker">Survive it</div><h1>Decorations, made simple</h1><p class="muted">Decide how much decorating you want, and plan the putting-away now, while you still have the energy.</p>
<div class="g3">${[['Cosy minimum', 'Tree or lights, one candle, done.'], ['Middle ground', 'Tree, a few favourite things, one room.'], ['Full sparkle', 'The lot. Plan a helper and a whole afternoon.']].map(([h, t], i) => box('', `<div class="cb"><b>${h}</b></div><p class="small muted">${t}</p>`, i === 0 ? 'sage' : '')).join('')}</div>
<div class="g2">
${box('Going up', field('Date') + field('Helpers') + `<div class="label" style="margin-top:2mm">Rooms & jobs</div>` + blankCbs(6))}
${box('Coming down', field('Date') + field('Helpers') + cbs(['Take a photo of how it looked', 'Bin anything broken right away', 'Lights wrapped round card, not knotted', 'Label boxes by room', 'Write what to buy next year below']))}
</div>
${box('Buy (or don\'t buy) next year', lines(), 'fill')}`, { sect: 'Survive it' }),

  page(`<div class="kicker">If you have little ones</div><h1>Kids at Christmas</h1><p class="muted">Excited kids and a tired grown-up is a tricky mix. A few plans made now go a long way.</p>
<div class="g2">
${box('Low-effort activities', cbs(['Christmas film and blanket fort', 'Colouring pages and a hot chocolate', 'Walk to see the lights', 'Make paper snowflakes', 'Christmas word search or bingo', 'Bake from a kit', 'Write letters to Santa', 'Visit the library']) + blankCbs(2))}
<div class="col">
${box('Countdown to the big day', `<p class="tiny muted">Colour one in each night.</p><div style="display:grid;grid-template-columns:repeat(6,1fr);gap:1.6mm;margin-top:1mm">${Array.from({ length: 24 }, (_, i) => `<div style="aspect-ratio:1;border:.9pt solid var(--clay);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:8pt;color:var(--clay-deep)">${i + 1}</div>`).join('')}</div>`)}
${box('Things to keep the same', `<p class="tiny muted">Bedtime, breakfast, a walk... routines help everyone.</p>${blankCbs(3)}`, 'sage')}
</div></div>
${box('School & club dates', table(['Date', 'What', 'Need to bring'], 4, { rh: 7.4, widths: ['20%', '45%'] }))}`, { sect: 'Survive it · Family' }),

  page(`<div class="kicker">Recover</div><h1>The recovery days</h1><p class="muted">The days after Christmas are for resting, not for catching up. Plan them as carefully as the big day.</p>
<div class="g2">
${box('Recovery menu (pick some)', cbs(['A pyjama day, planned on purpose', 'A walk with no destination', 'A film you\'ve already seen', 'An early night', 'A long bath or shower', 'Leftovers only, no new cooking', 'Phone on "do not disturb"', 'Ten minutes outside in daylight']) + blankCbs(2), 'sage')}
${box('Days ahead', ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'].map((d) => `<div class="field"><span style="width:12mm;color:var(--clay-deep);font-weight:600">${d}</span><i></i></div><div class="field"><span style="width:12mm"></span><i></i></div>`).join(''))}
</div>
${box('How I feel right now', `<div class="row small"><span>Energy ${dots5()}</span><span>Mood ${dots5()}</span><span>Social battery ${dots5()}</span></div>${lines(14)}`)}
${box('Things that can wait until January', lines(), 'fill')}`, { sect: 'Recover', deco: 'small' }),

  page(`<div class="kicker">Recover</div><h1>Returns &amp; thank-yous</h1><p class="muted">Returns have deadlines. Write them down now so the money doesn't get lost.</p>
${box('Returns and exchanges', table(['Item', 'Shop', 'Return by', 'Receipt?', 'Done'], 7, { widths: ['32%', '22%', '16%', '13%'], rh: 8.4 }))}
${box('Thank-yous', table(['Who', 'For', 'Text / call / card', 'Done'], 11, { widths: ['28%', '34%', '24%'], rh: 8.4 }))}
<p class="tiny muted">A quick text or voice note is a perfectly good thank-you.</p>`, { sect: 'Recover' }),

  page(`<div class="kicker">Recover</div><h1>The January reset</h1><p class="muted">Clear Christmas away in small steps, then take a minute to look back.</p>
<div class="g2">
${box('Put-away checklist', cbs(['Recycling and boxes out', 'Decorations down and boxed', 'Leftover food sorted or frozen', 'Gifts put away where they live', 'Gift cards logged (and spent!)', 'Returns posted', 'Wrapping supplies in one box', 'Bank account checked']) + blankCbs(2))}
<div class="col">
${box('What worked this year', lines(30), 'sage')}
${box('What I\'d skip next year', lines(30), 'clay')}
</div></div>
<div class="g2">${box('Gift cards & vouchers', table(['Card', '£', 'Expires'], 4, { rh: 7 }))}${box('Final spend', field('Budget') + field('Actually spent') + field('Difference') + `<p class="tiny muted" style="margin-top:2mm">No judgement. This is just information for next year.</p>`)}</div>`, { sect: 'Recover' }),

  page(`<div class="kicker">Future you will thank you</div><h1>Notes for next year</h1><p class="muted">Write it down while you still remember. Then keep this page with the decorations.</p>
<div class="g2">
${box('Gifts that went down well', lines(40))}
${box('Gift ideas for next year', lines(40))}
${box('Food: what we used, how much', lines(40))}
${box('Dates & deadlines I nearly missed', lines(40))}
</div>
${box('Start planning on', `<div class="field"><span>Date</span><i></i></div>`, 'clay')}
${box('Anything else', lines(), 'fill')}`, { sect: 'Recover' }),

  page(`<div class="row" style="flex:none;align-items:flex-end"><div><div class="kicker">Print as many as you need</div><h1 class="sm">December daily page</h1></div><div style="flex:none">${field('Date')}</div></div>
<div class="g3">${box('Must do', blankCbs(3), 'clay')}${box('Could do', blankCbs(3))}${box('For me', blankCbs(3), 'sage')}</div>
<div class="row grow">
${box('Today', ['Morning', 'Afternoon', 'Evening'].map((x) => `<div class="label sage" style="margin-top:1mm">${x}</div>${lines(24)}`).join(''))}
<div class="col">
${box('Christmas jobs', blankCbs(6))}
${box('Buy / order', blankCbs(4))}
${box('Brain dump', lines(), 'fill')}
</div></div>
${box('', `<div class="row small" style="align-items:center"><span>Energy ${dots5()}</span><span>Water ○ ○ ○ ○ ○ ○</span><span>Outside ○</span><span>Rest ○</span></div>`, 'cream')}`, { sect: 'Extra pages' }),

  page(`<div class="kicker">Extra pages</div><h1>December tracker</h1><p class="muted">Colour in a box when you do it. Missed days are just empty boxes, not failures.</p>
<div class="tbl-fill">${table(['Habit', ...Array.from({ length: 31 }, (_, i) => i + 1)], ['Medication', 'Water', 'Outside / fresh air', 'Moved my body', 'Ate a proper meal', 'Rest / quiet time', 'Bed on time', 'One Christmas job', 'Something fun', '', '', ''].map((h) => [h, ...Array(31).fill('')]), { widths: ['22%'], rh: 9, cls: 'tight' }).replace(/<th style="">(\d+)<\/th>/g, '<th style="padding:1mm .3mm;text-align:center;font-size:5.6pt">$1</th>')}</div>
<div class="g2">${box('Best moments this month', lines(30), 'sage')}${box('Hardest moments (and what helped)', lines(30))}</div>`, { sect: 'Extra pages' }),

  page(`<div class="kicker">Extra pages</div><h1>Ten-minute tasks</h1><p class="muted">For the days when you've got a little time and a little energy. Pick one. Set a timer. Stop when it rings.</p>
<div class="g2">
${box('Gifts & cards', cbs(['Write three cards', 'Wrap two gifts', 'Order one gift online', 'Check the gift tracker for gaps', 'Find the sticky tape (and hide it from everyone)']))}
${box('Food', cbs(['Write the shopping list', 'Check use-by dates in the fridge', 'Book a delivery slot', 'Clear one fridge shelf', 'Defrost something for tomorrow']))}
${box('Home', cbs(['Clear one surface', 'Run the dishwasher', 'Make the spare bed', 'Take the recycling out', 'Put a wash on']))}
${box('You', cbs(['Drink a glass of water', 'Step outside', 'Text a friend', 'Lie down with a song on', 'Eat something with protein']), 'sage')}
</div>
<div class="callout" style="margin-top:2mm"><h3>Thank you</h3><p class="small">Thank you for choosing a Larkspur &amp; Co. printable. If it helped, a short review on Etsy means the world to a small Glasgow business. More gentle planners at <b>larkspurco.uk</b>.</p></div>`, { sect: 'Extra pages', deco: 'small' }),
];

module.exports = { file: 'ADHD-Christmas-Survival-Guide', short: 'Christmas Survival Guide', title: T, pages, freebie: [6, 29] };
