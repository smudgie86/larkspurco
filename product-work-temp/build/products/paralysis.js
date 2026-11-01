const { page, cover, section, lines, cbs, blankCbs, field, table, box, dots5 } = require('../lib');

const T = 'The 28-Day Task Paralysis Reset';

const weeks = [
  { n: 1, name: 'Shrink it', lead: 'Big, vague tasks are the hardest to start. This week is about making tasks so small and clear that starting feels almost silly.' },
  { n: 2, name: 'Start it', lead: 'Now the tasks are smaller, it\'s time for tools that get you over the starting line, especially on days when your brain just won\'t engage.' },
  { n: 3, name: 'Keep going', lead: 'Starting is half the battle. This week is about keeping the momentum going and picking things back up when you drift.' },
  { n: 4, name: 'Make it yours', lead: 'You\'ve tried a lot of tools. This week you\'ll notice what works for your brain and build a plan you can keep using.' },
];

const days = [
  ['The one thing', 'When everything feels urgent, your brain can freeze trying to choose. Today, you choose just one task. Everything else can wait until it\'s done or the day ends.', 'Look at everything on your plate and circle the one task that would make today feel lighter. Write it below. That\'s today\'s whole job.'],
  ['The two-minute start', 'Starting is often the hardest part. A tiny commitment gets past the "this is huge" feeling, and once you\'ve started, carrying on is usually easier.', 'Promise yourself just two minutes on your task. Set a timer. When it rings, you\'re allowed to stop. If you keep going, that\'s a bonus.'],
  ['The next physical action', '"Sort out the car insurance" isn\'t a step, it\'s a project. Your brain needs to know exactly what your hands do first.', 'Rewrite your task as a physical action that starts with a verb: "open the laptop", "find the letter", "type the website in". Do only that.'],
  ['Break it into crumbs', 'If a task still feels heavy, it\'s still too big. Breaking it into crumbs shows you the path and gives you lots of small wins along the way.', 'Split your task into five tiny steps, each one taking ten minutes or less. Write them in the crumbs box. Start with crumb one.'],
  ['Lower the bar', 'Perfectionism can quietly stop you starting. If the task has to be done brilliantly, it feels risky to begin. "Good enough" is much easier to start.', 'Write down what a "good enough" version of your task looks like. Aim for that, not the perfect version. You can always improve it later.'],
  ['Name the block', 'Being stuck has a reason, even when it doesn\'t feel like it. Naming the reason tells you which tool to reach for. (See "What kind of stuck?" on page 5.)', 'Before you start, ask: why is this one hard? Unclear? Boring? Too big? Scared to get it wrong? Too tired? Write it down, then choose a tool that fits.'],
  ['A gentle day', 'Rest is part of the reset, not a break from it. Today, practise starting something small and kind, so your brain links "starting" with something good.', 'Pick a comforting task: water the plants, make a proper lunch, have a shower, go for a short walk. Start it, notice how starting felt, and rest.'],
  ['Set the scene', 'Every bit of friction (finding things, clearing space, logging in) is another chance to get stuck. Setting things up ahead of time removes those barriers.', 'Get everything ready for your task before you need it: open the document, put the form and pen on the table, lay out your gym kit. Then start.'],
  ['The timer sprint', 'A short, clear time limit makes a task feel finite and adds a little urgency, which can help a sleepy brain wake up.', 'Set a timer for ten minutes and work on your task until it rings. Then take a five-minute break. Do another sprint only if you want to.'],
  ['Body doubling', 'Lots of people with ADHD find it easier to work with someone else around. They don\'t need to help, just be there.', 'Do your task with someone nearby: a friend at the table, a video call, an online co-working room or a "study with me" video. Tell them what you\'re starting.'],
  ['Make it ugly', 'Wanting it to be perfect from the start can stop you starting at all. A messy first version gives you something to work with.', 'Do a deliberately rough version: a scruffy draft, a quick list, a messy first pass. Tell yourself it doesn\'t count, then do it.'],
  ['Pair it', 'Boring tasks are hard to start because your brain isn\'t getting anything back. Pairing them with something you like changes the deal.', 'Pair your task with something enjoyable: a podcast, a playlist, a nice drink, a favourite spot. You only get the treat while you\'re doing the task.'],
  ['The countdown', 'Sometimes the gap between deciding and doing fills up with thinking. A countdown can cut that gap short.', 'When you know what your first step is, count down out loud: 5, 4, 3, 2, 1. On "1", move your body: stand up, pick up the pen, open the tab.'],
  ['Start in the middle', 'You don\'t have to start at the beginning. The first part is often the hardest, and starting anywhere builds momentum.', 'Look at your crumbs and start with the easiest or most interesting one. Come back to the tricky bit once you\'re warmed up.'],
  ['Make it visible', 'For many ADHD brains, out of sight really is out of mind. A task you can\'t see is easy to forget, or to quietly avoid.', 'Put today\'s task somewhere you can\'t miss it: a sticky note on the kettle, a phone wallpaper, a note on the door. Then start.'],
  ['The done list', 'To-do lists show only what\'s left. A done list shows what you\'ve already managed, and seeing progress makes it easier to keep going.', 'Every time you finish anything today, however small, add it to the done list below. Notice how long it gets by evening.'],
  ['Add interest', 'Many people with ADHD find it much easier to engage when something is new, interesting, challenging or urgent, and very hard when it isn\'t.', 'Add one of those four to your task: make it a game, race a timer, try a new method or place, or set a small deadline with someone.'],
  ['The switch-over ritual', 'Moving from one thing to another is a hard skill for lots of busy brains. A small ritual tells your brain "we\'re changing tracks now".', 'Create a one-minute ritual for starting: stand up, stretch, refill your water, say "now I\'m doing...". Use it before your task.'],
  ['Leave a breadcrumb', 'Coming back to a half-finished task is hard if you can\'t remember where you were. A note to future you makes restarting much easier.', 'When you stop today, write one sentence: "Next time, start by...". Leave it right on top of the task.'],
  ['Ask for help', 'Some tasks stay stuck because we\'re trying to do them alone. Asking for help is a skill, not a failure.', 'Choose one stuck task and ask someone to help with part of it: explain it, check it, sit with you, or do one piece. Write your message below.'],
  ['Match your energy', 'Energy goes up and down. Asking a low-energy brain to do a high-energy task is a recipe for getting stuck.', 'Rate your energy right now. Pick a task that matches it: easy admin on low days, bigger thinking tasks on high ones. Start that.'],
  ['Find your best time', 'Most people have times of day when starting feels easier. Knowing yours means you can save the hard tasks for then.', 'Notice when today you felt most able to start. Write it down. Over the week, look for a pattern, and plan tomorrow\'s hardest task for that time.'],
  ['If this, then that', 'Planning exactly when and where you\'ll start, as an "if-then" plan, can make you more likely to follow through.', 'Write an if-then plan: "If it\'s 10am and I\'ve had my coffee, then I\'ll open the email." Make it specific. Then let the plan do the deciding.'],
  ['Your reward menu', 'Rewards that come straight after a task help your brain connect "doing" with "good feeling", especially for tasks with no instant payoff.', 'Write a menu of small, quick rewards on page 47. Choose one for today\'s task and only have it when you\'ve started (not finished).'],
  ['Kind self-talk', 'When we\'re stuck, our inner voice can get harsh. Harsh words add shame, and shame makes starting even harder.', 'Notice one unkind thought about yourself today. Write down what you\'d say to a friend in the same spot. Say that to yourself instead.'],
  ['Reset your space', 'A cluttered space can make it harder to focus. You don\'t need a perfect room, just one clear space to work in.', 'Set a ten-minute timer and clear only the spot where you\'ll do your task. Then start the task while the space is fresh.'],
  ['Tomorrow, tonight', 'Mornings are full of decisions. Choosing tomorrow\'s one thing tonight means you wake up already knowing where to start.', 'Before bed, write tomorrow\'s one thing and its first tiny step below. Set the scene for it if you can.'],
  ['Your unstuck toolkit', 'Over 28 days you\'ve tried lots of tools. Some will have clicked and some won\'t, and that\'s exactly the point. You now know more about your brain.', 'Look back through your pages and pick your three favourite tools. Write them on your Unstuck Plan (page 44). Start one task using one of them.'],
];

const dayPage = (d, i) => {
  const n = i + 1;
  const wk = weeks[Math.floor(i / 7)];
  const extra = {
    4: box('Five crumbs', Array.from({ length: 5 }, (_, k) => `<div class="cb line">${k + 1}.</div>`).join(''), 'cream'),
    5: box('My "good enough" version', lines(22), 'cream'),
    16: box('Done list', blankCbs(6), 'cream'),
    20: box('My message asking for help', lines(22), 'cream'),
    23: box('My if-then plan', `<div class="field"><span>If</span><i></i></div><div class="field"><span>then I will</span><i></i></div>`, 'cream'),
    25: box('Unkind thought → kind version', `<div class="field"><span>Unkind</span><i></i></div><div class="field"><span>Kind</span><i></i></div>`, 'cream'),
    27: box('Tomorrow\'s one thing', field('Task') + field('First tiny step') + field('When'), 'cream'),
  }[n] || '';
  return page(`
<div class="row" style="flex:none;align-items:center;gap:6mm"><div style="flex:none;text-align:center;width:22mm"><div class="kicker">Day</div><div class="num" style="font-size:40pt">${n}</div></div><div><div class="kicker" style="color:var(--sage)">Week ${wk.n} · ${wk.name}</div><h1 class="sm">${d[0]}</h1></div><div style="flex:none;width:44mm">${field('Date')}</div></div>
<p>${d[1]}</p>
<div class="callout sage"><h3>Try it today</h3><p class="small">${d[2]}</p></div>
${box('Today\'s one thing', lines(15))}
${box('The first tiny step', lines(8))}
${extra}
<div class="g2">
${box('How did it go?', cbs(['I finished it', 'I started it', 'I tried', 'Not today, and that\'s okay']))}
${box('Energy & mood', `<div class="small" style="margin:1mm 0">Energy ${dots5()}</div><div class="small" style="margin:1mm 0">Mood ${dots5()}</div><div class="small" style="margin:1mm 0">Stuck level ${dots5()}</div>`)}
</div>
${box('What helped? What got in the way?', lines(), 'fill')}
`, { sect: `Day ${n} of 28`, deco: 'small' });
};

const reviewPage = (w) => page(`
<div class="kicker">Week ${w.n} review</div><h1>Looking back: ${w.name}</h1>
<p class="muted">Five minutes. No marks out of ten. This is just noticing.</p>
${box('Days I showed up (colour them in)', `<div style="display:flex;gap:4mm;margin:1mm 0">${Array.from({ length: 7 }, (_, k) => `<div style="width:12mm;height:12mm;border:1pt solid var(--clay);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9pt;color:var(--clay-deep)">${(w.n - 1) * 7 + k + 1}</div>`).join('')}</div><p class="tiny muted">"Showing up" includes opening this book and deciding not today.</p>`)}
<div class="g2">
${box('Tools that helped', lines(30), 'sage')}
${box('Tools that didn\'t click', lines(30))}
</div>
<div class="g2">
${box('Wins this week (all sizes)', lines(30), 'clay')}
${box('What got in the way', lines(30))}
</div>
${box('Next week, I want to remember', lines(), 'fill')}
`, { sect: `Week ${w.n} review`, deco: 'small' });

const stuckTypes = [
  ['Unclear', 'You don\'t really know what the first step is.', 'Next physical action (day 3), break it into crumbs (day 4)'],
  ['Too big', 'It feels like a mountain, so you can\'t see where to begin.', 'Crumbs (day 4), the two-minute start (day 2), timer sprint (day 9)'],
  ['Boring', 'Your brain finds nothing in it to grab onto.', 'Pair it (day 12), add interest (day 17), body doubling (day 10)'],
  ['Scared of getting it wrong', 'Perfectionism, or worry about what people will think.', 'Lower the bar (day 5), make it ugly (day 11), kind self-talk (day 25)'],
  ['Too many choices', 'Everything feels important, so you freeze choosing.', 'The one thing (day 1), tomorrow tonight (day 27)'],
  ['Running on empty', 'You\'re tired, hungry, overwhelmed or unwell.', 'Match your energy (day 21), a gentle day (day 7). Rest is allowed.'],
];

const pages = [
  cover({ kicker: 'A gentle 28-day programme', title: 'The 28-Day<br>Task Paralysis<br>Reset', lead: 'For the days you know exactly what to do but can\'t make yourself start. One small page a day, one new tool at a time.', tags: ['ADHD-friendly', 'Undated', 'Print at home', '50 pages'], bottom: 'Miss a day? Just carry on from the next page. There\'s nothing to catch up on.' }),

  page(`<div class="kicker">Start here</div><h1>Welcome. You're not lazy.</h1>
<p class="lead">If you've ever sat staring at a task you <i>want</i> to do, feeling completely stuck, this is for you. Task paralysis is common, especially for people with ADHD, and it isn't a character flaw. It's a problem with starting, and starting is a skill you can practise.</p>
<div class="g2">
${box('How the 28 days work', `<div class="step"><div class="n">1</div><div>Each day has <b>one page</b> and <b>one tool</b> to try. It takes about five minutes.</div></div><div class="step"><div class="n">2</div><div>Use the tool on <b>one real task</b> from your life, however small.</div></div><div class="step"><div class="n">3</div><div>Every seven days, a <b>review page</b> helps you notice what's working.</div></div><div class="step"><div class="n">4</div><div>At the end, you build your own <b>Unstuck Plan</b> to keep.</div></div>`)}
${box('The rules', cbs(['It\'s undated, so start any day.', 'Missed a day? Turn to the next page. No catching up.', 'Did the page but not the task? That still counts.', 'Trying a tool and hating it is useful information.', 'Be as kind to yourself as you would be to a friend.']), 'sage')}
</div>
${box('The four weeks', weeks.map((w) => `<div class="row" style="margin:1.2mm 0;align-items:baseline"><b style="flex:none;width:30mm;color:var(--sage-deep)">Week ${w.n}: ${w.name}</b><span class="small muted">${w.lead}</span></div>`).join(''), 'cream')}
<p class="tiny muted">This programme is a self-help tool, not a diagnosis, treatment or medical advice. If you're struggling a lot, please talk to your GP or a health professional.</p>`, { sect: 'Welcome', deco: 'tr' }),

  page(`<div class="kicker">Inside</div><h1>Contents</h1>
<div class="g2" style="gap:8mm;margin-top:3mm"><div>
<h3 style="margin:2mm 0">Getting started</h3>
${[['What is task paralysis?', 4], ['What kind of stuck?', 5], ['Stuck? Start here', 6], ['My starting point', 7]].map(([a, b]) => `<div class="toc"><b>${a}</b><span>${b}</span></div>`).join('')}
<h3 style="margin:4mm 0 2mm">The 28 days</h3>
${[['Week 1: Shrink it', 8], ['Week 2: Start it', 17], ['Week 3: Keep going', 26], ['Week 4: Make it yours', 35]].map(([a, b]) => `<div class="toc"><b>${a}</b><span>${b}</span></div>`).join('')}
</div><div>
<h3 style="margin:2mm 0">Keep going</h3>
${[['My Unstuck Plan', 44], ['Task breakdown worksheet', 45], ['Brain dump', 46], ['Reward menu', 47], ['Done list', 48], ['Body doubling log', 49], ['28-day tracker', 50]].map(([a, b]) => `<div class="toc"><b>${a}</b><span>${b}</span></div>`).join('')}
<h3 style="margin:4mm 0 2mm">All 28 tools</h3>
<div class="small" style="column-count:2;column-gap:4mm">${days.map((d, i) => `<div>${i + 1}. ${d[0]}</div>`).join('')}</div>
</div></div>`, { sect: 'Contents', deco: 'small', cls: 'nofill' }),

  page(`<div class="kicker">Understanding it</div><h1>What is task paralysis?</h1>
<p class="lead">Task paralysis is when you can't get yourself to start (or carry on with) a task, even though you want to, you know it matters, and you might even know exactly how to do it.</p>
<p>It often comes with a lot of noise: guilt, frustration, scrolling your phone while the task sits there, and an inner voice calling you lazy. You're not lazy. Starting a task relies on a group of brain skills often called <b>executive function</b>: planning, prioritising, getting going, switching between things and managing feelings about the task. Many people with ADHD find these skills harder to use on demand, especially for tasks that are boring, unclear or emotionally loaded.</p>
<div class="g3">
${box('', '<h3>It\'s not about effort</h3><p class="small">Trying harder rarely works. Changing the task, the setting or the timing usually does.</p>', 'sage')}
${box('', '<h3>It\'s not about caring</h3><p class="small">People often freeze most on the things they care about most.</p>', 'clay')}
${box('', '<h3>It can change</h3><p class="small">Small tools, used often, make starting easier over time.</p>', 'cream')}
</div>
<h2 style="margin-top:2mm">What helps, in a nutshell</h2>
<ul class="dots"><li><b>Make it smaller</b>: tiny, clear, physical first steps.</li><li><b>Make it easier</b>: remove friction and set the scene.</li><li><b>Make it more interesting</b>: novelty, challenge, company or a reward.</li><li><b>Make it kinder</b>: lower the bar and drop the shame.</li></ul>
${box('When does it hit me hardest?', lines(), 'fill')}`, { sect: 'Getting started', deco: 'small' }),

  page(`<div class="kicker">Getting started</div><h1>What kind of stuck?</h1><p class="muted">Different kinds of stuck need different tools. Tick the ones that sound like you. You'll come back to this page on day 6.</p>
<div class="col">${stuckTypes.map(([h, d, t]) => `<div class="box" style="flex-direction:row;gap:4mm;align-items:flex-start"><div class="cb" style="flex:none;width:46mm"><b>${h}</b></div><div style="flex:1"><div class="small">${d}</div><div class="small" style="color:var(--sage-deep);margin-top:.8mm"><b>Try:</b> ${t}</div></div></div>`).join('')}</div>
${box('My most common kind of stuck', lines(), 'fill clay')}`, { sect: 'Getting started' }),

  page(`<div class="kicker">Keep this handy</div><h1>Stuck? Start here.</h1><p class="muted">Follow the arrows when you're frozen. One box at a time.</p>
<div class="col" style="align-items:center;gap:2mm;margin-top:2mm">
${[['Notice it.', '"I\'m stuck." Saying it out loud takes some of the power away.'], ['Check your body.', 'Hungry, thirsty, tired, too hot, too noisy? Fix the easiest one first.'], ['Name the block.', 'Unclear? Too big? Boring? Scary? Too many choices? (page 5)'], ['Shrink it.', 'What\'s the first physical action? Make it two minutes or less.'], ['Make it easier.', 'Set the scene, add music, find a body double, lower the bar.'], ['Start the timer.', 'Two to ten minutes. You can stop when it rings.'], ['Notice the win.', 'Started? Write it on your done list. Still stuck? Rest and try again later.']].map(([h, t], i) => `${i ? '<div style="color:var(--clay);font-size:13pt;line-height:1">↓</div>' : ''}<div class="box ${i % 2 ? 'sage' : 'clay'}" style="width:140mm;flex-direction:row;gap:4mm;align-items:center;padding:3mm 5mm"><b style="color:var(--sage-deep);font-size:11pt;flex:none;width:38mm">${h}</b><span class="small">${t}</span></div>`).join('')}
</div><div class="spacer"></div><p class="center small muted">You don't need motivation to start. Starting is what creates it.</p>`, { sect: 'Getting started', deco: 'small' }),

  page(`<div class="kicker">Before you begin</div><h1>My starting point</h1><p class="muted">A quick snapshot of where you are today. You'll look back at it on day 28.</p>
${box('Right now, starting tasks feels...', `<div class="row small" style="margin:1mm 0"><span>Easy ○</span><span>Sometimes hard ○</span><span>Usually hard ○</span><span>Almost impossible ○</span></div>`)}
<div class="g2">
${box('Tasks I\'ve been avoiding', blankCbs(6))}
${box('Times I usually get stuck', blankCbs(6))}
</div>
<div class="g2">
${box('Things I already know help me', lines(30), 'sage')}
${box('What I usually say to myself when I\'m stuck', lines(30), 'clay')}
</div>
${box('In 28 days, I\'d love to...', lines(), 'fill')}
${box('', `<div class="row"><div>${field('Start date')}</div><div>${field('Signed')}</div></div>`, 'cream')}`, { sect: 'Getting started' }),
];

weeks.forEach((w, wi) => {
  pages.push(section({ kicker: `Week ${w.n} of 4`, title: w.name, lead: w.lead, body: `<div class="g2" style="margin-top:8mm">${box('This week\'s tools', days.slice(wi * 7, wi * 7 + 7).map((d, k) => `<div class="cb">Day ${wi * 7 + k + 1}: ${d[0]}</div>`).join(''))}${box('My intention for this week', lines(40), 'clay')}</div>` }));
  days.slice(wi * 7, wi * 7 + 7).forEach((d, k) => pages.push(dayPage(d, wi * 7 + k)));
  pages.push(reviewPage(w));
});

pages.push(
  page(`<div class="kicker">Keep it</div><h1>My Unstuck Plan</h1><p class="muted">Everything you've learned, on one page. Stick it somewhere you'll see it.</p>
${box('My top three tools', `<div class="cb line">1.</div><div class="cb line">2.</div><div class="cb line">3.</div>`, 'clay')}
<div class="g2">
${box('My most common kind of stuck', lines(15))}
${box('My best time for hard tasks', lines(15))}
${box('Early warning signs I\'m getting stuck', lines(30))}
${box('My go-to rewards', lines(30))}
${box('People I can ask for help or body doubling', lines(22))}
${box('What I\'ll say to myself', lines(22), 'sage')}
</div>
${box('When I\'m really stuck, my first step is', lines(), 'fill cream')}`, { sect: 'Keep going', deco: 'small' }),

  page(`<div class="kicker">Print as many as you need</div><h1>Task breakdown</h1><p class="muted">Turn a big, scary task into crumbs. Each step should be a physical action that takes ten minutes or less.</p>
${box('', field('The task') + field('Why it matters to me') + field('Good enough looks like') + `<div class="row">${field('Kind of stuck')}${field('Due')}</div>`, 'cream')}
<div class="tbl-fill">${table(['#', 'Tiny step (starts with a verb)', 'Time', 'Done'], Array.from({ length: 12 }, (_, i) => [i + 1, '', '', '']), { widths: ['7%', '66%', '14%'], rh: 9 })}</div>
${box('Tool I\'ll use to start', lines(8), 'sage')}`, { sect: 'Keep going' }),

  page(`<div class="kicker">Keep going</div><h1>Brain dump</h1><p class="muted">Get every task, worry and idea out of your head. Then circle just one to start with.</p>
${box('', lines(), 'fill')}
<div class="g3">${box('Today', blankCbs(3), 'clay')}${box('This week', blankCbs(3))}${box('Someday / maybe', blankCbs(3), 'sage')}</div>`, { sect: 'Keep going' }),

  page(`<div class="kicker">Keep going</div><h1>Reward menu</h1><p class="muted">Small, quick rewards for starting. Choose ones that are easy to get and don't take over the rest of your day.</p>
<div class="g3">
${box('Five minutes', blankCbs(7) , 'sage')}
${box('Fifteen minutes', blankCbs(7))}
${box('Bigger wins', blankCbs(7), 'clay')}
</div>
${box('Ideas to borrow', `<p class="small">A cup of tea in the good mug · one episode · a walk round the block · a favourite song (loud) · a snack · texting a friend · a chapter of a book · a sit in the sun · a puzzle · stretching · ten minutes of guilt-free scrolling · something new on the wishlist</p>`, 'cream')}
${box('Rewards I\'d like to save up for', lines(), 'fill')}`, { sect: 'Keep going', deco: 'small' }),

  page(`<div class="kicker">Keep going</div><h1>Done list</h1><p class="muted">Write down everything you've done, including the small things. Especially the small things.</p>
<div class="tbl-fill">${table(['Date', 'What I did', 'How it felt'], 20, { widths: ['15%', '60%'], rh: 9.4 })}</div>`, { sect: 'Keep going' }),

  page(`<div class="kicker">Keep going</div><h1>Body doubling log</h1><p class="muted">Track who you work alongside and how it goes. Body doubling works best when you plan it in.</p>
${box('My body doubling options', cbs(['A friend or family member nearby', 'A video call with the camera on', 'An online co-working room', 'A "study with me" or "clean with me" video', 'A café or library']) + blankCbs(2), 'sage')}
<div class="tbl-fill">${table(['Date', 'Who / where', 'Task', 'How long', 'Helped?'], 12, { widths: ['13%', '25%', '34%', '13%'], rh: 9 })}</div>`, { sect: 'Keep going' }),

  page(`<div class="kicker">28 days</div><h1>Your 28-day tracker</h1><p class="muted">Colour in each day you open this book. Missed days aren't failures. They're just days.</p>
<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3mm;margin:3mm 0">${Array.from({ length: 28 }, (_, k) => `<div style="aspect-ratio:1;border:1.2pt solid ${k % 7 === 6 ? 'var(--sage)' : 'var(--clay)'};border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center"><div style="font-size:15pt;font-weight:600;color:var(--sage-deep)">${k + 1}</div></div>`).join('')}</div>
<div class="g2">${box('Then and now: starting tasks feels...', `<div class="small">Day 1: ______________________</div><div class="small" style="margin-top:2mm">Day 28: ______________________</div>`)}${box('What I\'m proudest of', lines(22), 'clay')}</div>
<div class="callout"><h3>Well done</h3><p class="small">Whether you did every page or a handful, you've practised starting again and again, and that's the skill. Thank you for choosing Larkspur &amp; Co. If this helped, a short Etsy review means the world to a small Glasgow business. More gentle planners at <b>larkspurco.uk</b>.</p></div>`, { sect: 'Keep going', deco: 'small' }),
);

module.exports = { file: '28-Day-Task-Paralysis-Reset', short: 'Task Paralysis Reset', title: T, pages, freebie: [6, 9] };
