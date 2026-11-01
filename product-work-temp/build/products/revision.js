const { page, cover, lines, cbs, blankCbs, field, table, box, dots5 } = require('../lib');
const { CSS2, head, tablePage, cardsPage, checkPage, formPage } = require('../lib2');

const T = 'The ADHD-Friendly Revision Planner';
const S = 'Revision Planner';
const pages = [];
const ids = {};
const add = (id, pg) => { if (id) ids[id] = pages.length + 1; pages.push(pg); };

add('cover', null);
add('welcome', page(`<div class="kicker">Start here</div><h1>Revision that works with your brain</h1>
<p class="lead">For GCSEs, Nat 5s, Highers, A-levels or uni exams. Short sessions, clear plans, lots of ticking off, and techniques that actually help things stick.</p>
<div class="g2">${box('How to use it', `<div class="step"><div class="n">1</div><div class="small">Fill in your <b>exam timetable</b> and <b>subjects</b>.</div></div><div class="step"><div class="n">2</div><div class="small">Break each subject into topics on a <b>topic tracker</b> (red, amber, green).</div></div><div class="step"><div class="n">3</div><div class="small">Plan each week on the <b>weekly timetable</b>, starting with red topics.</div></div><div class="step"><div class="n">4</div><div class="small">Use short <b>focus sessions</b> and active techniques.</div></div><div class="step"><div class="n">5</div><div class="small">Look after yourself. Sleep is revision too!</div></div>`)}
${box('ADHD-friendly by design', cbs(['Short 20–25 minute sessions', 'Lots to tick and colour in', 'Variety: mix subjects and techniques', 'Body doubling and reward ideas', 'A "stuck" page for frozen days', 'Undated: start whenever you\'re ready']), 'sage')}</div>`, { sect: 'Welcome', deco: 'tr' }));
add('exams', page(`${head('Planning', 'My exam timetable', 'Copy this from your school or college timetable, and double-check it.')}
${table(['Date', 'Time', 'Subject', 'Paper', 'Room / seat', 'Bring'], 16, { widths: ['13%', '12%', '22%', '18%', '14%'], rh: 11 })}`, { sect: 'Planning' }));
add('subjects', page(`${head('Planning', 'My subjects', '')}
${table(['Subject', 'Exam board / level', 'Papers', 'Teacher', 'Confidence'], 10, { widths: ['24%', '22%', '18%', '18%'], rh: 13 })}
${box('Subjects I want to focus on most', lines(), 'fill clay')}`, { sect: 'Planning' }));
add('countdown', page(`${head('Planning', 'Exam countdown', 'Colour in one circle for every day of revision. Write the number of days to your first exam in the first circle.')}
<div style="display:grid;grid-template-columns:repeat(8,1fr);gap:3mm;margin:3mm 0">${Array.from({ length: 56 }, (_, i) => `<div style="aspect-ratio:1;border:1.2pt solid ${i % 7 === 6 ? 'var(--sage)' : 'var(--clay)'};border-radius:50%"></div>`).join('')}</div>
${box('My reward when exams finish', lines(), 'fill sage')}`, { sect: 'Planning' }));
add('topics', page(`${head('Topic tracker', 'Topic tracker', 'Print one per subject. Colour the boxes red (don\'t know it), amber (getting there) or green (got it).')}
<div class="row" style="flex:none">${field('Subject')}${field('Exam date')}</div>
${table(['Topic', 'R', 'A', 'G', 'Notes made', 'Flashcards', 'Past paper Qs'], 18, { widths: ['40%', '6%', '6%', '6%', '14%', '14%'], rh: 9.6 })}`, { sect: 'Topic tracker' }));
add('week', page(`${head('Weekly plan', 'Weekly revision timetable', 'Plan 2–4 short sessions a day. Mix subjects, and leave space for rest.')}<div class="row" style="flex:none">${field('Week of')}${field('Days until first exam')}</div>
${table(['', 'Session 1', 'Session 2', 'Session 3', 'Session 4', 'Done'], ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => [`<b>${d}</b>`, '', '', '', '', '']), { widths: ['9%', '21%', '21%', '21%', '21%'], rh: 22 })}
${box('This week\'s red topics to tackle', blankCbs(3), 'clay')}`, { sect: 'Weekly plan' }));
add('day', page(`<div class="row" style="flex:none;align-items:flex-end"><div><div class="kicker">Print as many as you need</div><h1 class="sm">Daily revision plan</h1></div><div style="flex:none;width:44mm">${field('Date')}</div></div>
${table(['Session', 'Subject &amp; topic', 'Technique', '✓'], [['1', '', '', ''], ['Break', '<span class="muted small">Move, drink water, snack</span>', '', ''], ['2', '', '', ''], ['Break', '', '', ''], ['3', '', '', ''], ['Break', '', '', ''], ['4', '', '', '']], { widths: ['13%', '47%', '28%'], rh: 14 })}
<div class="g2">${box('What I remembered today', lines(36), 'sage')}${box('Still confusing (ask a teacher)', lines(36), 'clay')}</div>
${box('', `<div class="row small"><span>Focus ${dots5()}</span><span>Energy ${dots5()}</span><span>Sleep last night ____ hrs</span></div>`, 'cream')}`, { sect: 'Daily' }));
add('techniques', cardsPage('Techniques', 'Techniques', 'Revision techniques that work', 'Re-reading notes feels productive but doesn\'t help much. These active techniques make your brain work, so things stick.', [
  ['Active recall', 'Close the book and test yourself. What can you remember? Then check and fill the gaps.'], ['Spaced practice', 'Revisit topics after a day, a few days, then a week. Little and often beats cramming.'],
  ['Past papers', 'Practise real exam questions, then mark them with the mark scheme. Notice the patterns.'], ['Blurting', 'Write everything you know about a topic on a blank page in five minutes, then check what you missed.'],
  ['Flashcards', 'Question on the front, answer on the back. Sort into "know it" and "not yet" piles.'], ['Teach it', 'Explain a topic out loud to someone (or your pet!). If you can teach it, you know it.'],
  ['Mind maps', 'Put the topic in the middle and branch out. Great for seeing how ideas connect.'], ['Mix it up', 'Switching between topics (interleaving) feels harder but helps you remember more.'],
]));
add('focus', cardsPage('Techniques', 'Focus', 'Focus tools for busy brains', 'Starting is often the hardest part. Try these.', [
  ['Short sessions', 'Work for 20–25 minutes, then take a 5-minute break. After four, take a longer break.'], ['Phone away', 'Put your phone in another room, or use a focus app or timer lock.'],
  ['Body doubling', 'Revise alongside someone else, in person or on a video call. "Study with me" videos work too.'], ['Make it physical', 'Walk while you test yourself, use coloured pens, or stand at a counter.'],
  ['Tiny first step', 'Not "revise biology". Just "open the textbook to page 42".'], ['Reward yourself', 'A snack, a walk, an episode. Pair rewards with finishing sessions.'],
]));
add('blurt', page(`${head('Techniques', 'Blurting page', 'Write everything you remember. No notes! Then check and add what you missed in a different colour.')}
<div class="row" style="flex:none">${field('Subject')}${field('Topic')}</div>
${box('', lines(), 'fill')}
${box('What I missed', lines(30), 'clay')}`, { sect: 'Techniques' }));
add('mindmap', page(`${head('Techniques', 'Mind map', 'Topic in the middle, ideas branching out.')}
<div class="box fill" style="align-items:center;justify-content:center"><div style="width:62mm;height:36mm;border:1.4pt solid var(--clay);border-radius:50%;display:flex;align-items:center;justify-content:center" class="small muted">Topic</div></div>`, { sect: 'Techniques', cls: 'nofill' }));
add('flash', page(`${head('Techniques', 'Flashcards', 'Print on card. Write the question on the front, fold or cut, and write the answer on the back.')}
<div style="display:grid;grid-template-columns:1fr 1fr;grid-template-rows:repeat(4,1fr);gap:3mm;flex:1">${Array.from({ length: 8 }, (_, i) => `<div class="card" style="align-items:stretch;justify-content:flex-start;text-align:left;padding:3mm"><div class="tiny muted">${i % 2 ? 'Answer' : 'Question'}</div></div>`).join('')}</div>`, { sect: 'Techniques', cls: 'nofill' }));
add('papers', tablePage('Past papers', 'Past papers', 'Past paper tracker', 'Track your scores to see your progress (and which topics to revisit).', ['Date', 'Subject', 'Paper / year', 'Score', '%', 'Topics to revisit'], 16, ['12%', '18%', '18%', '10%', '9%']));
add('stuck', page(`${head('Keep this handy', 'Stuck? Start here', 'For the days you can\'t make yourself start.')}
<div class="col" style="align-items:center;gap:2mm">${[['Breathe', 'Three slow breaths. You\'re not lazy, starting is just hard.'], ['Body check', 'Water, food, fresh air, loo. Fix one.'], ['Pick one topic', 'The smallest, easiest one is fine.'], ['Tiny step', 'Just open the book or the past paper.'], ['Ten-minute timer', 'Go. Stop when it rings if you want.'], ['Tick it off', 'Colour in a box. Every session counts.']].map(([h, t], i) => `${i ? '<div style="color:var(--clay);font-size:13pt;line-height:1">↓</div>' : ''}<div class="box ${i % 2 ? 'sage' : 'clay'}" style="width:140mm;flex-direction:row;gap:4mm;align-items:center;padding:3mm 5mm"><b style="color:var(--sage-deep);font-size:11pt;flex:none;width:34mm">${h}</b><span class="small">${t}</span></div>`).join('')}</div><div class="spacer"></div>`, { sect: 'Wellbeing', deco: 'small' }));
add('wellbeing', page(`${head('Wellbeing', 'Looking after me', 'Your brain works best when you look after the rest of you.')}
<div class="g2">${box('Daily basics', cbs(['8–10 hours sleep (teens need lots!)', 'Breakfast and regular meals', 'Water bottle on the desk', 'Some movement or fresh air', 'Time with friends or family', 'Screen-free wind-down before bed']), 'sage')}
${box('When it all feels too much', cbs(['Take a proper break', 'Talk to someone you trust', 'Tell a teacher or tutor', 'Break the plan into smaller pieces', 'Remember: exams aren\'t everything']), 'clay')}</div>
${box('Weekly habit tracker', table(['Habit', 'M', 'T', 'W', 'T', 'F', 'S', 'S'], [['Sleep 8+ hours'], ['Water'], ['Movement'], ['Revision session'], ['Something fun'], ['']].map((r) => [r[0], '', '', '', '', '', '', '']), { widths: ['30%'], rh: 9 }))}
<p class="tiny muted">If you're struggling with stress or low mood, talk to a parent, teacher, GP or school counsellor. In the UK, Childline (0800 1111) is free and confidential for under-19s.</p>`, { sect: 'Wellbeing' }));
add('examday', checkPage('Exam day', 'Exam day', 'Exam day checklist', 'Pack the night before, so the morning is calm.', [
  ['The night before', ['Check the time and room', 'Pack your bag', 'Lay out clothes', 'Light review only, no cramming', 'Early night']],
  ['In your bag', ['Black pens (and spares)', 'Pencil, rubber, sharpener', 'Ruler', 'Calculator (with batteries)', 'Clear pencil case', 'Clear water bottle', 'Candidate number', 'Any equipment for the subject']],
  ['On the day', ['Breakfast', 'Leave with time to spare', 'Phone off and handed in', 'Toilet before you go in']],
  ['In the exam', ['Read every question carefully', 'Check the marks for each question', 'Plan longer answers', 'Leave time to check your work']],
]));
add('after', page(`${head('After', 'After each exam', 'Write a quick note, then let it go and focus on the next one.')}
${table(['Exam', 'How it went', 'Next exam', 'Feeling'], 8, { widths: ['22%', '40%', '22%'], rh: 18 })}
${box('Well done! When exams finish I\'m going to...', lines(), 'fill sage')}`, { sect: 'After' }));

pages[0] = cover({ kicker: 'For GCSE, National 5, Higher, A-level & uni', title: 'The ADHD-Friendly<br>Revision<br>Planner', lead: 'Exam timetable, topic trackers, weekly and daily plans, proven revision techniques, focus tools and an exam day checklist, all built for busy brains.', tags: [`${pages.length} pages`, 'Undated', 'Print at home'], bottom: 'Short sessions, clear plans, lots of ticking off.' });

module.exports = {
  file: 'ADHD-Friendly-Revision-Planner', short: S, title: T, pages, css: CSS2, freebie: [ids.techniques, ids.week],
  meta: {
    short: 'ADHD-Friendly<br>Revision Planner', kicker: 'GCSE · Highers · A-level · Uni', sub: 'Short sessions, clear plans and techniques that actually help things stick.',
    hero: [1, ids.week], grid: [[ids.exams, 'Exam timetable'], [ids.topics, 'Topic tracker (RAG)'], [ids.week, 'Weekly timetable'], [ids.techniques, 'Revision techniques'], [ids.papers, 'Past paper tracker'], [ids.examday, 'Exam day checklist']],
    detail: ids.topics, detailTitle: 'Red, amber, green topic tracking', detailPoints: ['One tracker per subject', 'See what to revise next at a glance', 'Track notes, flashcards and past papers', 'Watch the green spread!'],
    features: [['Plan it', 'Exam timetable, subjects, countdown and weekly timetable'], ['Track it', 'RAG topic trackers and past paper scores'], ['Learn it', 'Active recall, blurting, flashcards and mind maps'], ['Look after you', 'Focus tools, wellbeing and exam day checklist']],
    pins: [['Revision timetable that works', 'An ADHD-friendly revision planner', ids.week], ['8 revision techniques that work', 'Active recall, spaced practice and more', ids.techniques], ['Exam day checklist', 'Pack the night before', ids.examday]],
    listing: {
      price: '£5.95', title: 'Revision Planner Printable, GCSE A Level Study Planner, ADHD Study Planner, Revision Timetable, Exam Countdown, Topic Tracker, Student PDF',
      tags: ['revision planner', 'study planner', 'gcse revision', 'a level revision', 'adhd student', 'exam planner', 'revision timetable', 'student planner', 'study timetable', 'exam countdown', 'topic tracker', 'homework planner', 'study tips'],
      hook: 'Short sessions, clear plans and techniques that actually help things stick.',
      body: ['A printable revision planner for GCSE, National 5, Higher, A-level and university students, designed to be ADHD-friendly. Short sessions, lots to tick off, and active techniques that make revision count.',
        'INSIDE:\n• Exam timetable and my subjects\n• Exam countdown (colour-in)\n• Topic tracker (red, amber, green), one per subject\n• Weekly revision timetable and daily revision plan\n• Revision techniques that work\n• Focus tools for busy brains\n• Blurting page, mind map and printable flashcards\n• Past paper tracker\n• Stuck? Start here flowchart\n• Wellbeing page and weekly habit tracker\n• Exam day checklist and after-exam notes'],
      pinCopy: [['ADHD-friendly revision timetable', 'Short sessions, mixed subjects and space to rest. Printable planner.'], ['8 revision techniques that actually work', 'Active recall, spaced practice, blurting, past papers and more. Free printable.'], ['Exam day checklist for students', 'What to pack and what to do, the night before and on the day.'], ['How to track revision topics (RAG)', 'Red, amber, green topic trackers for every subject.'], ['Can\'t start revising? Try this', 'A flowchart for frozen study days.']],
      prompts: ['A teenager\'s tidy study desk with colourful highlighters, flashcards, a glass of water and a blank printed A4 planner page, soft daylight from a window, warm cream and sage palette, no faces, photorealistic, 4:5'],
    },
  },
};
