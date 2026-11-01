const { page, cover, section, lines, cbs, blankCbs, field, table, box, dots5 } = require('../lib');
const { CSS2, head } = require('../lib2');

const T = 'The Gentle 90';
const S = 'The Gentle 90 · Guided Journal';
const pages = [];
const ids = {};
const add = (id, pg) => { if (id) ids[id] = pages.length + 1; pages.push(pg); };
const css = CSS2 + `
.prompt{font-size:15pt;line-height:1.35;color:var(--sage-deep);font-weight:500;border-left:1.2mm solid var(--clay);padding:1mm 0 1mm 5mm;max-width:165mm}
.rate{display:flex;justify-content:space-between;align-items:center;border-bottom:.6pt solid var(--line);padding:2.2mm 0;font-size:9.5pt}
.rate .dots5{gap:3mm}
`;
const PARTS = [
  ['Noticing', 'Days 1–30', 'Before changing anything, notice where you are. No fixing, no judging. Just looking.', [
    'What made you pick up this journal today? What are you hoping for?', 'Describe today in three words. Why those three?', 'What\'s taking up the most space in your head right now?',
    'Where in your body do you feel stress? What does it feel like?', 'What does a "good enough" day look like for you?', 'What drained your energy this week, and what gave some back?',
    'List five small things you noticed today: sounds, colours, smells, anything.', 'What\'s something you\'ve been avoiding? What makes it hard to start?', 'When did you last feel truly rested? What was different?',
    'What are you carrying that isn\'t yours to carry?', 'Which part of your day felt easiest? Why do you think that was?', 'What would you like more of in your life, and what would you like less of?',
    'Write about a place where you feel calm. What makes it feel that way?', 'Is there a feeling you\'ve been pushing away? Let it have this page.', 'Who do you feel most like yourself around?',
    'What\'s one thing you\'re proud of that nobody else knows about?', 'How do you talk to yourself when things go wrong?', 'What did younger you need to hear? Write it down.',
    'What does "rest" really mean to you?', 'What are three things that are going okay right now?', 'What\'s something you used to love doing? What happened to it?',
    'What time of day do you feel most like you?', 'What\'s a worry you could put down today, even for a little while?', 'Describe your perfect slow morning.',
    'What do you wish people understood about you?', 'Which habits are helping you right now? Which aren\'t?', 'Write about a small moment of joy from the past week.',
    'What does your body need today?', 'What\'s one thing you\'d like to stop apologising for?', 'Look back over the last 30 days. What surprised you?']],
  ['Kindness', 'Days 31–60', 'Now, practise treating yourself the way you\'d treat someone you love.', [
    'Write yourself a note as if you were your own best friend.', 'What are your non-negotiables for a calm week?', 'Where could you lower the bar and still be okay?',
    'What\'s a boundary you\'d like to set? What might you say?', 'List the things that make you feel cared for.', 'What do you need more of right now: rest, connection, fun or quiet?',
    'Write about a mistake, then write what you\'d say to a friend who made it.', 'What\'s one kind thing you could do for future you today?', 'Which people leave you feeling lighter? How could you see them more?',
    'What does your inner critic say most often? What would a kinder voice say instead?', 'Describe a comfort you can always come back to.', 'What\'s one thing you could take off your to-do list this week?',
    'When did you last laugh properly? What happened?', 'What would it look like to be patient with yourself today?', 'Write a permission slip: "I give myself permission to…"',
    'What helps you feel grounded when everything feels like too much?', 'What are you grateful your body can do?', 'Who has been kind to you lately? How did it feel?',
    'What would you do with a whole free day, with no guilt?', 'What\'s something you\'re learning to accept?', 'How could you make tomorrow 5% easier?',
    'What does "enough" mean to you?', 'Write about a time you got through something hard.', 'What do you need to hear today? Write it as if someone you love is saying it.',
    'Which small pleasures are you saving "for best"? Why not now?', 'What\'s a "should" you could let go of?', 'Describe how you\'d like to feel at the end of today.',
    'What would a kind morning routine look like for you?', 'What are you doing well, even if it doesn\'t feel like it?', 'Look back over the last 30 days. What kindness did you show yourself?']],
  ['Growing', 'Days 61–90', 'From a steadier place, look ahead. Small steps, your pace, your way.', [
    'What matters most to you? List your top five values.', 'Which of your values did you live by this week?', 'What\'s a small dream you\'ve been quietly holding?',
    'If fear wasn\'t in the way, what would you try?', 'What\'s something new you\'d like to learn this year?', 'Describe the person you\'re becoming.',
    'What would you like your ordinary days to feel like?', 'Which of your strengths do you use without noticing?', 'What\'s one tiny step towards something you want?',
    'What are you ready to leave behind?', 'Who inspires you, and what do you admire about them?', 'What makes you feel creative?',
    'Write about a future day that you\'re looking forward to.', 'What does success look like for you (not for anyone else)?', 'What helps you keep going when motivation runs out?',
    'What would you tell yourself on day 1 of this journal?', 'What small habit would make the biggest difference?', 'Where do you feel most at home in the world?',
    'What do you want to say yes to more often?', 'What do you want to say no to more often?', 'Describe a week that would feel balanced to you.',
    'What\'s a risk worth taking?', 'What are you curious about at the moment?', 'What have you outgrown?',
    'What would make next month feel meaningful?', 'Write a letter to yourself one year from now.', 'What\'s changed since you started this journal?',
    'What are you most grateful for in this season of your life?', 'Which prompt from this journal stayed with you? Why?', 'What do you want to carry forward from these 90 days?']],
];
if (PARTS.some((p) => p[3].length !== 30)) throw new Error('need 30 prompts per part');
const AREAS = ['Sleep', 'Energy', 'Mood', 'Calm', 'Connection', 'Joy', 'Kindness to myself'];
const checkin = (title, lead, id) => add(id, page(`${head('Check-in', title, lead)}
<div class="g2">${box('How I\'m doing (1 = low, 5 = great)', AREAS.map((a) => `<div class="rate"><span>${a}</span>${dots5()}</div>`).join(''))}
${box('Right now, life feels like', lines(46), 'sage')}</div>
${box('What I want from the next 30 days', lines(30), 'cream')}
${box('Anything else', lines(), 'fill')}`, { sect: 'Check-in' }));

add('cover', cover({ kicker: 'A 90-day guided journal', title: 'The Gentle 90', lead: 'Ninety kind questions to help you notice, rest and grow, one page at a time.', tags: ['90 daily prompts', 'Weekly reflections', 'Check-ins', 'Undated'], bottom: 'A journal for reflection and self-care. It isn\'t therapy or medical advice. If you\'re struggling, please talk to someone you trust or your GP.' }));
add('welcome', page(`<div class="kicker">Start here</div><h1>Welcome to the Gentle 90</h1>
<p class="lead">This journal asks one kind question a day for 90 days. Some will feel easy, some will make you pause. There are no wrong answers and no grades.</p>
<div class="g2">${box('How it works', cbs(['<b>Days 1–30, Noticing:</b> see where you are', '<b>Days 31–60, Kindness:</b> treat yourself gently', '<b>Days 61–90, Growing:</b> look ahead, your way', 'A short reflection every 7 days', 'A check-in at the start and every 30 days']))}
${box('Gentle rules', cbs(['Write as much or as little as you like', 'Missed a day? Just turn to the next page', 'Skip any prompt that doesn\'t feel right today', 'Doodle, list or write one word: it all counts', 'Keep it private if you want to']), 'sage')}</div>
<div class="callout small">If writing brings up something heavy, be gentle with yourself and take a break. You can talk to Samaritans any time, free, on 116 123 (UK and Ireland).</div>`, { sect: 'Welcome', deco: 'tr' }));
checkin('Before we begin', 'Take a snapshot of today. You\'ll look back at it on day 30, 60 and 90.', 'start');

let day = 0;
PARTS.forEach(([name, range, intro, prompts], pi) => {
  add(`part${pi}`, page(`<div style="margin-top:34mm" class="kicker">${range}</div><h1>${name}</h1><div class="lead" style="max-width:140mm">${intro}</div>`, { cls: 'secpage', deco: 'tr' }));
  prompts.forEach((pr) => {
    day++;
    add(day === 1 ? 'day1' : null, page(`<div class="row" style="flex:none;align-items:flex-end"><div><div class="kicker">${name} · Day ${day}</div></div><div style="flex:none;width:55mm">${field('Date')}</div></div>
<div class="prompt">${pr}</div>
${box('', lines(), 'fill')}
<div class="g2">${box('Today I\'m grateful for', lines(16), 'cream')}${box('One kind thing for me', lines(16), 'sage')}</div>
<div class="small muted" style="display:flex;gap:8mm"><span>Energy ${dots5()}</span><span>Mood ${dots5()}</span></div>`, { sect: `${name} · ${range}`, cls: 'nofill' }));
    if (day % 7 === 0 && day % 30 !== 0) {
      add(day === 7 ? 'week' : null, page(`${head('Weekly reflection', `Week ${day / 7} reflection`, 'Look back over the last seven pages.')}
<div class="g2">${box('A high point', lines(36), 'cream')}${box('A hard moment', lines(36))}</div>
<div class="g2">${box('What I noticed about my energy', lines(36), 'sage')}${box('What helped', lines(36))}</div>
${box('One gentle intention for next week', lines(), 'fill cream')}`, { sect: 'Weekly reflection' }));
    }
  });
  checkin(`Day ${(pi + 1) * 30} check-in`, pi === 2 ? 'You made it to 90. Compare this page with your first check-in.' : 'Compare with your last check-in. Small changes count.', `check${pi}`);
});
add('letter', page(`${head('The end (and a beginning)', 'A letter to myself', 'What do you want to remember from these 90 days?')}${box('', lines(), 'fill')}`, { sect: 'Closing', cls: 'nofill' }));

module.exports = {
  file: 'Gentle-90-Guided-Journal', short: S, title: T, pages, css, ids, fillable: true,
  freebie: [ids.start, ids.day1, ids.week],
  meta: {
    short: 'The Gentle 90', kicker: 'Guided journal · 90 prompts · Undated', sub: 'Ninety kind questions to help you notice, rest and grow, one page at a time.',
    hero: [1, ids.day1], grid: [[ids.start, 'Check-ins every 30 days'], [ids.day1, 'A prompt a day'], [ids.week, 'Weekly reflections'], [ids.part1, 'Three gentle parts'], [ids.day1 + 40, '90 different prompts'], [ids.letter, 'A letter to yourself']],
    detail: ids.day1, detailTitle: 'One kind question a day', detailPoints: ['90 different prompts, never repeated', 'Gratitude and one kind thing for you', 'Track energy and mood', 'Skip, pause and restart any time'],
    features: [['Noticing', 'Days 1–30: see where you are, without judging'], ['Kindness', 'Days 31–60: treat yourself the way you\'d treat a friend'], ['Growing', 'Days 61–90: look ahead, at your own pace'], ['Look back', 'Weekly reflections and check-ins at 0, 30, 60 and 90 days']],
    pins: [['Gentle journal prompts for busy minds', 'From the Gentle 90 guided journal', ids.day1], ['A gentle self-care check-in', 'Free printable page', ids.start], ['Weekly reflection journal page', 'Look back kindly at your week', ids.week]],
    listing: {
      price: '£6.95', title: 'Guided Journal Printable, 90 Days of Journal Prompts, Self Care Journal, Gratitude Journal, Mental Wellbeing, Reflection Journal PDF',
      tags: ['guided journal', 'journal prompts', 'self care journal', 'gratitude journal', 'reflection journal', 'wellbeing journal', 'printable journal', 'mindfulness', 'self love journal', 'daily journal', 'journaling', 'gift for her', 'self compassion'],
      hook: 'Ninety kind questions to help you notice, rest and grow, one page at a time.',
      body: ['The Gentle 90 is an undated, printable guided journal with one thoughtful prompt a day for 90 days. It\'s written for busy, tired or overwhelmed minds: no pressure, no streaks, and nothing to get wrong.',
        'INSIDE (' + pages.length + ' pages):\n• How it works and a few gentle rules\n• Check-ins before you start and on days 30, 60 and 90\n• Part 1, Noticing (days 1–30)\n• Part 2, Kindness (days 31–60)\n• Part 3, Growing (days 61–90)\n• 90 daily pages, each with its own prompt, writing space, gratitude, one kind thing for you, and energy and mood dots\n• 12 weekly reflections\n• A closing letter to yourself',
        'Print it and write by hand, or type into the fillable PDF. A journal for reflection and self-care, not therapy or medical advice.'],
      pinCopy: [['Journal prompts for when you feel stuck', 'Gentle questions from the Gentle 90 guided journal.'], ['A 90-day guided journal', 'Notice, rest and grow, one page at a time.'], ['Self-care check-in printable', 'Rate sleep, energy, mood and more.'], ['Weekly reflection journal page', 'A high point, a hard moment and what helped.']],
      prompts: ['A printed journal page (blank white) on a soft knitted blanket with a cup of herbal tea, a pen and a small candle, cosy evening lamp light, warm cream and muted sage green palette, calm, photorealistic, 4:5'],
    },
  },
};
