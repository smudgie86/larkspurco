const { page, cover, lines, cbs, blankCbs, field, table, box } = require('../lib');
const { CSS2, head, cardSheet } = require('../lib2');

const T = 'Kids\' Visual Routine Charts';
const S = 'Visual Routines';
const pages = [];
const ids = {};
const add = (id, pg) => { if (id) ids[id] = pages.length + 1; pages.push(pg); };
const E = (e) => `<span class="emo">${e}</span>`;
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CSS = CSS2 + `
.rt{width:100%;border-collapse:separate;border-spacing:0 2.4mm}
.rt td{background:#fff;border-top:1pt solid var(--line);border-bottom:1pt solid var(--line);padding:1.6mm 2mm;vertical-align:middle;height:18mm}
.rt td:first-child{border-left:1pt solid var(--line);border-radius:3mm 0 0 3mm;width:22mm;text-align:center;font-family:'Noto Color Emoji';font-size:32pt;line-height:1}
.rt td:nth-child(2){font-size:15pt;font-weight:600;color:var(--sage-deep);width:62mm;line-height:1.2}
.rt td:last-child{border-right:1pt solid var(--line);border-radius:0 3mm 3mm 0}
.rt .tick{display:inline-block;width:7.4mm;height:7.4mm;border:1.2pt solid var(--clay);border-radius:50%;margin:0 .8mm}
.rt th{font-size:8pt;color:var(--clay-deep);font-weight:600;letter-spacing:.1em;text-transform:uppercase;text-align:center}
.strip{display:grid;gap:3mm;flex:1}
.slot{border:1.4pt dashed #C9C1B4;border-radius:4mm;display:flex;align-items:center;justify-content:center;color:#C9C1B4;font-size:9pt}
`;

const routine = (id, title, lead, steps) => add(id, page(`${head('Routine charts', title, lead)}
<table class="rt"><thead><tr><th></th><th></th><th>${DAYS.map((d) => `<span style="display:inline-block;width:9mm">${d}</span>`).join('')}</th></tr></thead><tbody>${steps.map(([e, t]) => `<tr><td>${e}</td><td>${t}</td><td style="text-align:center">${DAYS.map(() => '<span class="tick"></span>').join('')}</td></tr>`).join('')}</tbody></table>
<div class="spacer"></div><div class="callout sage center"><p style="font-size:12pt;font-weight:600;color:var(--sage-deep)">${E('⭐')} Great job! ${E('⭐')}</p></div>`, { sect: S, cls: 'nofill' }));

add('cover', null);
add('welcome', page(`<div class="kicker">For grown-ups</div><h1>Picture routines that help kids feel calm</h1>
<p class="lead">Lots of children, especially those with ADHD or autism, find routines easier when they can <i>see</i> them. Pictures make each step clear, reduce nagging and help kids feel proud and independent.</p>
<div class="g2">${box('How to use them', `<div class="step"><div class="n">1</div><div class="small">Print on card if you can, and laminate for wipe-clean use.</div></div><div class="step"><div class="n">2</div><div class="small">Choose a ready-made routine chart, or build your own with the picture cards and a blank strip.</div></div><div class="step"><div class="n">3</div><div class="small">Cut out the cards and use Velcro dots or Blu Tack so they can be moved.</div></div><div class="step"><div class="n">4</div><div class="small">Keep routines short: 4–8 steps is plenty.</div></div><div class="step"><div class="n">5</div><div class="small">Praise effort, not perfection.</div></div>`)}
${box('Inside', cbs(['Morning, after school, bedtime and weekend charts', 'First / Then board', 'Build-your-own schedule strips', '96 picture cards (+ blanks to draw your own)', 'Feelings chart and calm-down choices', 'Reward chart and chore chart']), 'sage')}</div>
<p class="tiny muted">Every child is different. If your child has additional needs, their school, health visitor or occupational therapist may have ideas for adapting these.</p>`, { sect: 'For grown-ups', deco: 'tr' }));

routine('morning', 'My morning routine', 'Tick each step when it\'s done.', [['⏰', 'Wake up'], ['🚽', 'Toilet'], ['🧼', 'Wash hands &amp; face'], ['👕', 'Get dressed'], ['🥣', 'Breakfast'], ['🪥', 'Brush teeth'], ['👟', 'Shoes &amp; coat on'], ['🎒', 'Grab school bag']]);
routine('after', 'My after school routine', '', [['🎒', 'Unpack bag'], ['🧼', 'Wash hands'], ['🍎', 'Snack &amp; drink'], ['✏️', 'Homework / reading'], ['🧸', 'Play time'], ['🍝', 'Dinner'], ['🧺', 'Tidy up toys']]);
routine('bed', 'My bedtime routine', '', [['🛁', 'Bath or shower'], ['🌙', 'Pyjamas on'], ['🪥', 'Brush teeth'], ['🚽', 'Toilet'], ['📖', 'Story time'], ['🤗', 'Cuddles'], ['💡', 'Lights out']]);
routine('weekend', 'My weekend routine', '', [['⏰', 'Wake up'], ['🥣', 'Breakfast'], ['👕', 'Get dressed'], ['🌳', 'Go outside'], ['🥪', 'Lunch'], ['🎨', 'Quiet activity'], ['🧺', 'Help at home'], ['🛁', 'Bath time']]);

add('firstthen', page(`<div style="text-align:center"><div class="kicker">First / Then board</div><h1>First... then...</h1><p class="muted">Put a card in each box. Great for less-loved jobs!</p></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8mm;flex:1;margin-top:4mm">${['First', 'Then'].map((x, i) => `<div style="display:flex;flex-direction:column;gap:3mm"><div style="text-align:center;font-size:24pt;font-weight:700;color:${i ? 'var(--sage-deep)' : 'var(--clay-deep)'}">${x}</div><div class="slot" style="flex:1;background:${i ? 'var(--sage-light)' : 'var(--clay-light)'}">place card here</div></div>`).join('')}</div>`, { sect: 'Boards', cls: 'nofill' }));
add('strip', page(`${head('Boards', 'Build-your-own schedule (vertical)', 'Stick cards in order, top to bottom. Move them to a "done" pile when finished.')}
<div style="display:grid;grid-template-columns:1fr 1.4fr;gap:6mm;flex:1"><div class="strip" style="grid-template-rows:repeat(6,1fr)">${Array.from({ length: 6 }, (_, i) => `<div class="slot">${i + 1}</div>`).join('')}</div><div class="box sage" style="align-items:center;justify-content:flex-start"><div style="font-size:16pt;font-weight:700;color:var(--sage-deep);margin-top:3mm">All done! ${E('🎉')}</div><div class="slot" style="flex:1;width:100%;margin-top:3mm;background:#fff">finished cards</div></div></div>`, { sect: 'Boards', cls: 'nofill' }));
add('strip2', page(`${head('Boards', 'Build-your-own schedule (day strip)', 'Morning, afternoon and evening rows. Great for weekends and holidays.')}
${['Morning', 'Afternoon', 'Evening'].map((x, i) => `<div style="display:flex;align-items:center;gap:3mm;flex:1"><div style="width:26mm;font-size:12pt;font-weight:700;color:var(--sage-deep)">${E(['☀️', '🌤️', '🌙'][i])} ${x}</div><div class="strip" style="grid-template-columns:repeat(4,1fr);flex:1;height:100%">${Array.from({ length: 4 }, () => '<div class="slot"></div>').join('')}</div></div>`).join('')}`, { sect: 'Boards', cls: 'nofill' }));

const CARDS = [
  ['Morning &amp; getting ready', [['⏰', 'Wake up'], ['🚽', 'Toilet'], ['🧼', 'Wash hands'], ['🪥', 'Brush teeth'], ['💇', 'Brush hair'], ['👕', 'Get dressed'], ['🧦', 'Socks on'], ['👟', 'Shoes on'], ['🧥', 'Coat on'], ['🎒', 'School bag'], ['👓', 'Glasses on'], ['💊', 'Medicine']]],
  ['Food &amp; drink', [['🥣', 'Breakfast'], ['🥪', 'Lunch'], ['🍝', 'Dinner'], ['🍎', 'Snack'], ['🥛', 'Drink milk'], ['💧', 'Drink water'], ['🧃', 'Juice'], ['🍽️', 'Set the table'], ['🍳', 'Cooking'], ['🧑‍🍳', 'Help cook'], ['🥗', 'Eat veggies'], ['🍌', 'Fruit']]],
  ['School &amp; learning', [['🏫', 'School'], ['🚌', 'Bus'], ['🚗', 'Car'], ['🚶', 'Walk'], ['✏️', 'Homework'], ['📚', 'Reading'], ['🔢', 'Numbers'], ['🎹', 'Music practice'], ['⚽', 'Sports club'], ['🏊', 'Swimming'], ['🎨', 'Art'], ['💻', 'Computer']]],
  ['Home &amp; helping', [['🧺', 'Tidy toys'], ['🛏️', 'Make bed'], ['👚', 'Laundry in basket'], ['🍽️', 'Clear plates'], ['🐕', 'Walk the dog'], ['🐟', 'Feed the pet'], ['🪴', 'Water plants'], ['🧹', 'Sweep'], ['🗑️', 'Bins'], ['🧽', 'Wipe table'], ['📦', 'Put things away'], ['🛒', 'Shopping']]],
  ['Play &amp; free time', [['🧸', 'Play'], ['🧱', 'Building'], ['🎨', 'Drawing'], ['📺', 'TV time'], ['📱', 'Tablet time'], ['🎮', 'Games'], ['🌳', 'Outside'], ['🛝', 'Park'], ['🚲', 'Bike'], ['🎵', 'Music'], ['🧩', 'Puzzle'], ['📖', 'Story']]],
  ['Places &amp; people', [['🏠', 'Home'], ['👵', 'Grandparents'], ['👫', 'Friends'], ['🩺', 'Doctor'], ['🦷', 'Dentist'], ['💇', 'Haircut'], ['🛒', 'Supermarket'], ['📚', 'Library'], ['🏊', 'Swimming pool'], ['🎂', 'Party'], ['✈️', 'Holiday'], ['🚗', 'Car journey']]],
  ['Bedtime', [['🛁', 'Bath'], ['🚿', 'Shower'], ['🌙', 'Pyjamas'], ['🪥', 'Brush teeth'], ['🚽', 'Toilet'], ['📖', 'Story'], ['🤗', 'Cuddles'], ['🧸', 'Teddy'], ['🎧', 'Quiet music'], ['💡', 'Lights out'], ['🛌', 'Sleep'], ['⭐', 'Well done!']]],
  ['Calm &amp; feelings', [['🌬️', 'Deep breaths'], ['🔢', 'Count to 10'], ['🤗', 'Ask for a hug'], ['🙋', 'Ask for help'], ['💧', 'Drink water'], ['🎧', 'Headphones'], ['🧸', 'Cuddle teddy'], ['🤫', 'Quiet time'], ['🚶', 'Have a walk'], ['🎨', 'Draw it out'], ['⏸️', 'Take a break'], ['😌', 'Feel calm']]],
];
CARDS.forEach(([t, cards], i) => add(i === 0 ? 'cards' : null, cardSheet('Picture cards', 'Picture cards', t, 'Cut along the dashed lines.', cards, { cols: 3, rows: 4, es: 46, ts: 13 })));
add('blank', cardSheet('Picture cards', 'Picture cards', 'Draw your own', 'Draw a picture and write the word.', Array.from({ length: 12 }, () => ['', '']), { cols: 3, rows: 4 }));
add('feelings', page(`<div style="text-align:center"><div class="kicker">Feelings</div><h1>How do I feel?</h1><p class="muted">Point to the face, or put a peg on it.</p></div>
<div class="cards" style="grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,1fr);--es:60pt;--ts:15pt;margin-top:3mm">${[['😀', 'Happy'], ['😢', 'Sad'], ['😠', 'Angry'], ['😨', 'Scared'], ['😴', 'Tired'], ['😕', 'Confused'], ['🤩', 'Excited'], ['😌', 'Calm'], ['🤒', 'Poorly']].map(([e, t]) => `<div class="card" style="border-style:solid;border-color:var(--line)"><div class="e">${e}</div><div class="t">${t}</div></div>`).join('')}</div>`, { sect: 'Feelings', cls: 'nofill' }));
add('calm', page(`<div style="text-align:center"><div class="kicker">Feelings</div><h1>When I have big feelings, I can...</h1></div>
<div class="cards" style="grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,1fr);--es:50pt;--ts:13pt;margin-top:3mm">${[['🌬️', 'Take 5 deep breaths'], ['🔢', 'Count to 10'], ['🤗', 'Ask for a hug'], ['💧', 'Have a drink of water'], ['🎧', 'Put on headphones'], ['🧸', 'Squeeze my teddy'], ['🤫', 'Go to my calm spot'], ['🎨', 'Draw how I feel'], ['🙋', 'Ask a grown-up for help']].map(([e, t]) => `<div class="card" style="border-style:solid;border-color:var(--line);background:var(--sage-light)"><div class="e">${e}</div><div class="t">${t}</div></div>`).join('')}</div>`, { sect: 'Feelings', cls: 'nofill' }));
add('reward', page(`<div style="text-align:center"><div class="kicker">Rewards</div><h1>My star chart</h1><p class="muted">Colour in a star or add a sticker each time.</p></div>
${box('', `<div class="row">${field('I\'m working on')}${field('My reward')}</div>`, 'cream')}
<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:4mm;flex:1;margin-top:2mm">${Array.from({ length: 20 }, (_, i) => `<div style="border:1.4pt solid var(--clay);border-radius:4mm;display:flex;flex-direction:column;align-items:center;justify-content:center"><div style="font-size:30pt;color:var(--clay-light);line-height:1">★</div><div class="small muted">${i + 1}</div></div>`).join('')}</div>
<div class="center" style="font-size:14pt;font-weight:700;color:var(--sage-deep);margin-top:3mm">${E('🏅')} I did it! ${E('🏅')}</div>`, { sect: 'Rewards', cls: 'nofill' }));
add('chores', page(`${head('Rewards', 'My helper chart', 'Little jobs that help the family. Pick ones that suit your child\'s age.')}
${table(['Job', ...DAYS], [['🛏️ Make my bed'], ['🧺 Tidy my toys'], ['👚 Clothes in the basket'], ['🍽️ Set the table'], ['🐟 Feed the pet'], ['🪴 Water the plants'], ['', ''], ['', '']].map((r) => [`<span style="font-size:11pt">${r[0].replace(/^(\S+)/, '<span class="emo">$1</span>')}</span>`, '', '', '', '', '', '', '']), { widths: ['30%'], rh: 18 })}
${box('This week I helped with...', lines(), 'fill sage')}`, { sect: 'Rewards' }));

pages[0] = cover({ kicker: 'Picture routines for little ones', title: 'Kids\' Visual<br>Routine<br>Charts', lead: 'Morning, after school, bedtime and weekend charts, 96 picture cards, a First/Then board, feelings chart, calm-down choices, and reward and helper charts.', tags: [`${pages.length} pages`, 'ADHD &amp; autism friendly', 'Print &amp; laminate'], bottom: 'Print on card, laminate and add Velcro dots for a reusable routine board.' });

module.exports = {
  file: 'Kids-Visual-Routine-Charts', short: S, title: T, pages, css: CSS, freebie: [ids.morning, ids.feelings],
  meta: {
    short: 'Kids\' Visual<br>Routine Charts', kicker: 'ADHD &amp; autism friendly · Print &amp; laminate', sub: 'Picture routines that help kids feel calm, capable and independent.',
    hero: [1, ids.morning], grid: [[ids.morning, 'Morning routine'], [ids.bed, 'Bedtime routine'], [ids.firstthen, 'First / Then board'], [ids.cards, '96 picture cards'], [ids.feelings, 'Feelings chart'], [ids.reward, 'Star chart']],
    detail: ids.morning, detailTitle: 'Routines kids can see', detailPoints: ['Big, bright picture for every step', 'Tick each day of the week', 'Morning, after school, bedtime and weekend', 'Build your own with the cards'],
    features: [['4 routine charts', 'Morning, after school, bedtime and weekend'], ['96 picture cards', 'Plus blank cards to draw your own'], ['Boards', 'First / Then and two build-your-own schedules'], ['Feelings & rewards', 'Feelings chart, calm-down choices, star and helper charts']],
    pins: [['Morning routine chart for kids', 'Picture steps, no more nagging', ids.morning], ['Visual schedule cards printable', '96 picture cards for routines', ids.cards], ['Calm-down chart for big feelings', 'A free printable for kids', ids.calm]],
    listing: {
      price: '£4.95', title: 'Visual Routine Chart Printable, Kids Morning Bedtime Routine Cards, Visual Schedule, ADHD Autism, First Then Board, Feelings Chart, PDF',
      tags: ['visual schedule', 'routine chart', 'kids routine', 'morning routine', 'bedtime routine', 'visual timetable', 'adhd kids', 'autism resources', 'first then board', 'feelings chart', 'chore chart', 'reward chart', 'toddler routine'],
      hook: 'Picture routines that help kids feel calm, capable and independent.',
      body: ['Printable visual routines for toddlers and children, designed to be ADHD and autism friendly. Bright, clear picture icons show each step, so kids know what comes next and feel proud doing it themselves.',
        'INSIDE:\n• Morning, after school, bedtime and weekend routine charts (with daily tick circles)\n• First / Then board\n• Two build-your-own schedule boards\n• 96 picture cards in 8 categories, plus blank cards\n• "How do I feel?" feelings chart\n• "When I have big feelings, I can..." calm-down choices\n• 20-step star chart and a weekly helper (chore) chart',
        'Tip: print on card, laminate and add Velcro dots for a reusable routine board.'],
      pinCopy: [['Morning routine chart for kids (printable)', 'Wake up, toilet, dressed, breakfast, teeth, shoes, bag. With pictures!'], ['Visual schedule picture cards', '96 cards for routines, school, home, play and feelings.'], ['Calm-down chart for kids: free printable', 'Deep breaths, count to 10, ask for a hug and more.'], ['First / Then board printable', 'A simple visual tool for less-loved jobs.'], ['Bedtime routine chart with pictures', 'Bath, pyjamas, teeth, story, cuddles, lights out.']],
      prompts: ['A laminated picture routine chart stuck on a white fridge with colourful magnets, a child\'s drawing beside it, bright clean kitchen, soft natural light, photorealistic, 4:5 (generate the chart blank; I\'ll add the real design)'],
    },
  },
};
