const { page, cover, section, lines, cbs, blankCbs, field, table, box, dots5 } = require('../lib');
const { CSS2, head, tablePage, cardsPage, checkPage, formPage } = require('../lib2');

const T = 'The Rescue Dog Settling-In Guide';
const S = 'Rescue Dog Guide';
const pages = [];
const ids = {};
const add = (id, pg) => { if (id) ids[id] = pages.length + 1; pages.push(pg); };

add('cover', null);
add('welcome', page(`<div class="kicker">Start here</div><h1>Welcome home</h1>
<p class="lead">Adopting a rescue dog is a wonderful thing to do. It can also be a lot. Your new dog doesn't know you, your home or your routine yet, and they may have been through a great deal before they reached you.</p>
<p>This guide helps you through the first few months, one stage at a time. It's built around the "3-3-3" guide that many rescues share: <b>three days</b> to decompress, <b>three weeks</b> to learn your routine, and <b>three months</b> to start feeling truly at home.</p>
<div class="g2">${box('Inside', cbs(['The 3-3-3 guide explained', 'Getting ready checklists', 'A calm first day and a decompression plan', 'Daily logs for the first three days', 'Weekly pages for the first three weeks', 'Monthly check-ins for the first three months', 'Body language guide and trigger log', 'Bonding activities, records and a care sheet']))}
${box('The most important thing', '<p class="small">Go slowly. Every dog settles at their own pace. Some relax within days, others need many months. That\'s normal, and it isn\'t a sign you\'re doing anything wrong.</p>', 'sage')}</div>
<p class="tiny muted">This guide is general information and isn't a substitute for advice from your vet, your rescue or a qualified behaviourist.</p>`, { sect: 'Welcome', deco: 'tr' }));
add('contents', null);
add('333', page(`${head('Understanding it', 'The 3-3-3 guide', 'A rough guide, not a rule. Think of it as a reminder to be patient, especially at the start.')}
<div class="col">${[['3 days', 'Decompress', 'Your dog may feel overwhelmed, scared or shut down. They might not eat much, may hide, or may seem very quiet, or very unsettled. Keep life calm, quiet and predictable. Don\'t expect much.'], ['3 weeks', 'Learn the routine', 'Your dog starts working out the routine: when meals happen, where they sleep, when walks are. Their true personality starts to show, and some new behaviours may appear as they get more confident.'], ['3 months', 'Feel at home', 'Many dogs begin to feel settled and trust you. Your bond grows and the routine feels normal. Some dogs take longer, and that\'s okay.']].map(([n, h, t], i) => `<div class="box ${['clay', 'sage', 'cream'][i]}" style="flex-direction:row;gap:5mm;align-items:center"><div style="flex:none;width:30mm;text-align:center"><div class="num" style="font-size:26pt">${n.split(' ')[0]}</div><div class="kicker">${n.split(' ')[1]}</div></div><div><h2>${h}</h2><p class="small" style="margin-top:1mm">${t}</p></div></div>`).join('')}</div>
${box('What I\'m expecting (and worried about)', lines(), 'fill')}`, { sect: S, deco: 'small' }));
add('ready', checkPage(S, 'Getting ready', 'Before your dog arrives', 'Get everything ready so the first day can be calm.', [
  ['Shopping', ['A comfy bed (or two)', 'Food your rescue used, to start with', 'Bowls', 'Collar and ID tag with your name and address', 'Well-fitting harness and lead', 'Poo bags', 'A few toys and long-lasting chews', 'Lick mat or puzzle feeder']],
  ['Home', ['A quiet "safe space" set up', 'Baby gates if needed', 'Fences and gates checked', 'Bins and food out of reach', 'Cables tidied away']],
  ['Admin', ['Register with a vet', 'Microchip transferred into your name', 'Insurance arranged', 'Rescue paperwork filed in this guide']],
  ['People', ['Household agrees the house rules', 'Visitors on hold for a week or two', 'Someone at home for the first days', 'Plan for any other pets']],
]));
add('safe', page(`${head('Getting ready', 'A safe space', 'A quiet spot where your dog can retreat and be left alone. It\'s one of the most helpful things you can give them.')}
<div class="g2">${box('Setting it up', cbs(['Somewhere quiet, away from the front door and busy areas', 'A comfy bed, maybe covered to feel like a den', 'Water nearby', 'Something that smells of you', 'Calm music or white noise if they like it']))}
${box('House rules for everyone', cbs(['When the dog is in their safe space, leave them be', 'Let the dog come to you, rather than reaching for them', 'No hugging or leaning over them at first', 'Keep voices low and movements calm', 'Children supervised at all times']), 'sage')}</div>
${box('Our safe space plan', `<div class="row">${field('Where')}${field('Bed / crate')}</div><div class="label sage" style="margin-top:2mm">Notes</div>${lines(22)}`, 'cream')}
${box('Our house rules', lines(), 'fill')}`, { sect: S }));
add('day1', page(`${head('The first day', 'Bringing your dog home', 'Plan for a quiet, boring day. Boring is good!')}
<div class="col">${[['The journey', 'Bring water, a towel and poo bags. Use a secure harness or crate in the car.'], ['Arriving', 'Walk calmly round the garden or outside area first, on lead, so they can sniff and go to the toilet.'], ['Inside', 'Let them explore on lead or with gates, one or two rooms at a time. Show them water and their safe space.'], ['Leave them be', 'Sit quietly nearby. Let them approach you. Don\'t worry if they don\'t want a fuss.'], ['Food', 'Offer a small meal. Many dogs don\'t eat much on day one, and that\'s normal.'], ['Night', 'A last toilet trip, then a calm bedtime. Some dogs settle better with you nearby at first.']].map(([h, t], i) => `<div class="box" style="flex-direction:row;gap:4mm;align-items:center"><div class="num" style="font-size:20pt;width:9mm;flex:none">${i + 1}</div><div><h3>${h}</h3><p class="small">${t}</p></div></div>`).join('')}</div>
${box('How the first day went', lines(), 'fill sage')}`, { sect: 'The first 3 days', deco: 'small' }));
add('body', page(`${head('Understanding your dog', 'Reading body language', 'Dogs tell us a lot without barking. Learning the signs helps you know when your dog is happy, and when they need space.')}
<div class="g3">${box('Relaxed', cbs(['Soft, loose body', 'Mouth relaxed or slightly open', 'Soft eyes, normal blinking', 'Tail at a natural height, loose wag', 'Sleeping deeply, belly up']), 'sage')}
${box('Worried', cbs(['Lip licking and yawning (when not tired)', 'Turning head away', 'Whites of the eyes showing', 'Ears pinned back', 'Tail tucked low', 'Pacing, panting, shaking off']), 'cream')}
${box('Needs space now', cbs(['Freezing or going stiff', 'Staring hard', 'Lip curling', 'Growling', 'Raised hackles', 'Snapping']), 'clay')}</div>
<div class="callout"><h3>Growling is communication</h3><p class="small">A growl is your dog saying "I'm uncomfortable". Never punish it. Calmly give your dog more space, notice what caused it, and avoid that situation while you get help if needed.</p></div>
${box('Signs I\'ve noticed in my dog', lines(), 'fill')}`, { sect: 'Understanding', deco: 'small' }));

const dayLog = (n) => page(`<div class="row" style="flex:none;align-items:center;gap:6mm"><div style="flex:none;text-align:center;width:20mm"><div class="kicker">Day</div><div class="num" style="font-size:38pt">${n}</div></div><div><div class="kicker" style="color:var(--sage)">The first three days · Decompress</div><h1 class="sm">${['Just arrive', 'Quiet and calm', 'Small steps'][n - 1]}</h1></div><div style="flex:none;width:42mm">${field('Date')}</div></div>
<div class="callout sage"><p class="small">${['Today is just about arriving. No visitors, no big walks, no training. Let your dog sleep, sniff and watch.', 'Keep the routine simple: meals, toilet trips, short calm walks or garden time, and lots of rest. Notice what helps your dog relax.', 'Start building gentle routines. A short sniffy walk somewhere quiet, a lick mat, and time to rest. Still no pressure.'][n - 1]}</p></div>
<div class="g2">${box('Eating &amp; drinking', table(['Time', 'What / how much', 'Ate?'], 4, { widths: ['20%', '58%'], rh: 7 }))}${box('Toilet', table(['Time', 'Wee / poo', 'Where'], 4, { widths: ['20%', '40%'], rh: 7 }))}</div>
<div class="g2">${box('Sleep &amp; rest', lines(22))}${box('Walks &amp; outside time', lines(22))}</div>
<div class="g2">${box('Signs of stress I noticed', lines(26), 'clay')}${box('Signs of relaxing I noticed', lines(26), 'sage')}</div>
${box('', `<div class="row small"><span>Dog's stress level ${dots5()}</span><span>My stress level ${dots5()}</span></div><div class="label sage" style="margin-top:2mm">Notes</div>${lines()}`, 'fill')}`, { sect: 'The first 3 days' });
add('d1', dayLog(1)); add(null, dayLog(2)); add(null, dayLog(3));

add('weeks', section({ kicker: 'Stage two', title: 'The first three weeks', lead: 'Your dog is learning your routine. Keep life predictable, start gentle training games, and build trust through calm, positive time together.' }));
const weekPage = (n) => page(`<div class="row" style="flex:none;align-items:flex-end"><div><div class="kicker">The first three weeks</div><h1 class="sm">Week ${n}</h1></div><div style="flex:none;width:50mm">${field('Week starting')}</div></div>
<div class="callout sage"><p class="small">${['Focus on routine: meals, walks, toilet trips and bedtime at roughly the same times each day. Start short alone-time practice.', 'Add one or two gentle training games, like the name game or "sit" for a treat. Try a new quiet walking route.', 'Notice how far you\'ve come. Plan any next steps: a vet check, a training class, or a behaviourist if you need one.'][n - 1]}</p></div>
${box('Our routine this week', table(['', 'Morning', 'Midday', 'Afternoon', 'Evening'], ['Meals', 'Walks', 'Toilet trips', 'Training / play', 'Rest'].map((x) => [`<b>${x}</b>`, '', '', '', '']), { widths: ['18%'], rh: 9 }))}
<div class="g2">${box('New things we tried', lines(30))}${box('What my dog loved', lines(30), 'sage')}</div>
<div class="g2">${box('What worried my dog', lines(30), 'clay')}${box('Alone-time practice', table(['Day', 'How long', 'How it went'], 4, { widths: ['22%', '28%'], rh: 7 }))}</div>
${box('Wins this week', lines(), 'fill cream')}`, { sect: `Week ${n}` });
add('w1', weekPage(1)); add(null, weekPage(2)); add(null, weekPage(3));

add('months', section({ kicker: 'Stage three', title: 'The first three months', lead: 'Many dogs start to feel truly at home now. Keep building trust, keep life predictable, and celebrate how far you\'ve both come.' }));
const monthPage = (n) => page(`<div class="row" style="flex:none;align-items:flex-end"><div><div class="kicker">The first three months</div><h1 class="sm">Month ${n} check-in</h1></div><div style="flex:none;width:50mm">${field('Date')}</div></div>
<div class="g3">${['Confidence', 'Relaxing at home', 'Out on walks'].map((x) => box(x, `<div style="margin-top:1mm">${dots5()}</div>`, 'cream')).join('')}</div>
<div class="g2">${box('How my dog has changed', lines(40), 'sage')}${box('Still finding hard', lines(40), 'clay')}</div>
<div class="g2">${box('Training progress', lines(32))}${box('Health &amp; vet notes', lines(32))}</div>
${box('Next month, we\'ll work on', lines(), 'fill')}`, { sect: `Month ${n}` });
add('m1', monthPage(1)); add(null, monthPage(2)); add(null, monthPage(3));

add('bond', checkPage('Bonding', 'Building trust', 'Bonding activities', 'Low-pressure ways to build trust and help your dog relax. Tick the ones your dog enjoys.', [
  ['Calm & sniffy', ['Slow "sniffari" walks somewhere quiet', 'Scatter feeding in the garden', 'Lick mats and stuffed food toys', 'Snuffle mat', 'Sitting together quietly']],
  ['Gentle games', ['The name game', 'Find the treat (hide and seek)', 'Gentle tug (if they enjoy it)', 'Hand targeting ("touch")', 'Learning a trick together']],
  ['Routine & comfort', ['Same meal and walk times', 'A wind-down routine at bedtime', 'Soft voice and slow movements', 'Letting them choose to come for a fuss']],
  ['My dog\'s favourites', ['', '', '', '']],
]));
add('trigger', tablePage('Understanding', 'Understanding your dog', 'Trigger log', 'Note anything that worries or excites your dog. Patterns help you plan, and help a vet or behaviourist if you need one.', ['Date', 'What happened', 'Distance', 'How my dog reacted', 'What helped'], 14, ['12%', '28%', '12%', '24%']));
add('intro', cardsPage('Understanding', 'Understanding your dog', 'Other pets, children &amp; visitors', 'Introductions should be slow and calm. Your rescue may have advice for your dog specifically.', [
  ['Other dogs', 'Introduce on neutral ground, on walks side by side at a comfortable distance, before meeting at home.'], ['Cats', 'Keep them separate at first. Swap bedding to share smells, then try short supervised sightings behind a gate.'],
  ['Children', 'Teach children to let the dog come to them, never to disturb a sleeping or eating dog, and to give the safe space a wide berth. Always supervise.'], ['Visitors', 'Hold off for the first week or two. Then ask visitors to ignore the dog and let them say hello in their own time.'],
  ['Resources', 'Some dogs guard food, toys or beds. Feed separately and give space at meal times.'], ['When to pause', 'If your dog seems stressed, go back a step. There\'s no rush.'],
]));
add('help', page(`${head('Getting help', 'When to get help', 'Asking for help early is a good thing. You don\'t have to work it out alone.')}
<div class="g2">${box('Speak to your vet if', cbs(['Your dog stops eating for more than a day or two', 'You notice pain, limping, sickness or diarrhoea', 'Behaviour changes suddenly', 'Your dog seems anxious all the time', 'You\'re worried about anything health-related']), 'clay')}
${box('Contact your rescue if', cbs(['You need advice about your dog\'s history', 'Things aren\'t working out', 'You need support or reassurance', 'You need help with introductions']), 'sage')}</div>
${box('A qualified behaviourist or trainer', '<p class="small">For fear, reactivity, separation problems or aggression, ask your vet to refer you to a qualified behaviourist. In the UK, the Animal Behaviour and Training Council (ABTC) keeps a register of qualified practitioners. Look for kind, reward-based methods, and avoid anyone who uses punishment, shock or prong collars.</p>', 'cream')}
${box('Contacts', field('My vet') + field('Rescue contact') + field('Trainer / behaviourist'))}`, { sect: 'Getting help', deco: 'small' }));
add('records', formPage('Records', 'Records', 'My dog\'s records', 'Copy details from your rescue paperwork.', [
  ['About my dog', ['Name (and rescue name)', 'Breed / type', 'Approx. age', 'Adoption date', 'Rescue']],
  ['Health', ['Microchip number', 'Neutered', 'Vaccinations', 'Last flea & worm', 'Known conditions']],
  ['History (if known)', lines(40)], ['Rescue notes &amp; advice', lines(40)],
]));
add('vet', tablePage('Records', 'Records', 'Vet, vaccinations &amp; treatments', '', ['Date', 'What', 'Vet / product', 'Next due', 'Notes'], 16, ['14%', '24%', '22%', '14%']));
add('sitter', formPage('Care sheet', 'For sitters &amp; family', 'Dog care sheet', 'Especially important for rescue dogs: share their triggers and what helps.', [
  ['Dog', ['Name', 'Age', 'Microchip']], ['Food', ['Food & amount', 'Times', 'Treats']], ['Walks', ['Times & where', 'Lead / harness', 'Avoid']],
  ['Triggers', ['Things that worry them', 'Signs they need space', 'What helps']], ['Health', ['Medicines', 'Vet & phone', 'Insurance']], ['Contacts', ['My mobile', 'Back-up', 'Rescue']],
]));
add('story', page(`${head('Memories', 'Our story', 'Write down the moments that show how far you\'ve come.')}
<div class="g2">${['Gotcha day', 'First time they slept deeply', 'First tail wag', 'First time they came for a cuddle', 'Favourite walk', 'Funniest habit'].map((x, i) => box(x, field('Date') + lines(16), i % 3 === 0 ? 'cream' : '')).join('')}</div>
${box('Photo', '', 'fill')}`, { sect: 'Memories' }));
add('thanks', page(`<div class="kicker">Thank you</div><h1>Thank you for adopting</h1><p class="lead">Thank you for giving a rescue dog a home, and for choosing Larkspur &amp; Co. If this guide helped, a short Etsy review means the world to a small Glasgow business.</p>${box('A note to my dog', lines(), 'fill')}`, { sect: 'Thank you', deco: 'tr' }));

pages[ids.contents - 1] = page(`<div class="kicker">Inside</div><h1>Contents</h1><div style="max-width:130mm;margin-top:3mm">${[['The 3-3-3 guide', '333'], ['Before your dog arrives', 'ready'], ['A safe space', 'safe'], ['Bringing your dog home', 'day1'], ['Reading body language', 'body'], ['The first three days', 'd1'], ['The first three weeks', 'weeks'], ['The first three months', 'months'], ['Bonding activities', 'bond'], ['Trigger log', 'trigger'], ['Other pets, children &amp; visitors', 'intro'], ['When to get help', 'help'], ['My dog\'s records', 'records'], ['Vet &amp; treatments', 'vet'], ['Dog care sheet', 'sitter'], ['Our story', 'story']].map(([a, id]) => `<div class="toc"><b>${a}</b><span>${ids[id]}</span></div>`).join('')}</div>`, { sect: 'Contents', deco: 'small', cls: 'nofill' });
pages[0] = cover({ kicker: 'The first three days, weeks and months', title: 'The Rescue Dog<br>Settling-In<br>Guide', lead: 'A calm, step-by-step guide and journal for your rescue dog\'s first three months, built around the 3-3-3 guide many rescues use.', tags: [`${pages.length} pages`, 'Print at home', 'Kind, reward-based'], bottom: 'Every rescue dog settles at their own pace. Go slowly.' });

module.exports = {
  file: 'Rescue-Dog-Settling-In-Guide', short: S, title: T, pages, css: CSS2, freebie: [ids['333'], ids.body],
  meta: {
    short: 'Rescue Dog<br>Settling-In Guide', kicker: '3 days · 3 weeks · 3 months', sub: 'A calm guide and journal for your rescue dog\'s first months home.',
    hero: [1, ids['333']], grid: [[ids['333'], 'The 3-3-3 guide'], [ids.safe, 'A safe space'], [ids.body, 'Reading body language'], [ids.d1, 'First 3 days log'], [ids.w1, 'Weekly pages'], [ids.m1, 'Monthly check-ins']],
    detail: ids.d1, detailTitle: 'Gentle daily logs for the first three days', detailPoints: ['Eating, toilet and sleep at a glance', 'Notice stress and relaxing signs', 'Track your stress too', 'No pressure, no training yet'],
    features: [['The 3-3-3 guide', 'Decompress, learn the routine, feel at home'], ['Body language', 'Relaxed, worried and needs-space signs'], ['Journal pages', '3 daily logs, 3 weekly pages, 3 monthly check-ins'], ['Records & help', 'Trigger log, vet records, care sheet and where to get help']],
    pins: [['The 3-3-3 rule for rescue dogs', 'Days, weeks and months explained', ids['333']], ['Is my rescue dog stressed?', 'A printable body language guide', ids.body], ['Bringing a rescue dog home', 'A calm first-day plan', ids.day1]],
    listing: {
      price: '£5.95', title: 'Rescue Dog Printable Guide, 3-3-3 Rule, Adopted Dog Journal, New Rescue Dog Checklist, Decompression Plan, Dog Body Language, A4 PDF',
      tags: ['rescue dog', 'adopted dog', '333 rule', 'rescue dog gift', 'dog adoption', 'new dog checklist', 'dog journal', 'dog planner', 'adopt dont shop', 'dog body language', 'decompression', 'dog printable', 'rescue dog mum'],
      hook: 'A calm guide and journal for your rescue dog\'s first months home.',
      body: ['Built around the "3-3-3" guide many rescues share: three days to decompress, three weeks to learn your routine and three months to feel at home. Kind, reward-based and realistic.',
        'INSIDE:\n• The 3-3-3 guide explained\n• Before your dog arrives checklist and a safe space plan\n• Bringing your dog home: a calm first day\n• Reading body language (relaxed, worried, needs space)\n• Daily logs for the first three days\n• Weekly pages for the first three weeks\n• Monthly check-ins for the first three months\n• Bonding activities and a trigger log\n• Introductions to other pets, children and visitors\n• When to get help\n• Records, vet log, care sheet and "our story" memories page'],
      pinCopy: [['The 3-3-3 rule for rescue dogs explained', 'Three days to decompress, three weeks to learn the routine, three months to feel at home.'], ['Is my rescue dog stressed? Body language guide', 'Free printable: relaxed, worried and needs-space signs.'], ['Bringing a rescue dog home: first day plan', 'Keep it calm, quiet and boring. Step by step.'], ['Gift for a new rescue dog owner', 'A printable settling-in guide and journal.'], ['Rescue dog bonding activities', 'Sniffy walks, scatter feeding and gentle games.']],
      prompts: ['A calm rescue greyhound lying on a soft cream bed in a quiet corner, a blank printed A4 page on the floor beside it with a pencil, soft natural window light, warm cream and sage palette, photorealistic, 4:5'],
    },
  },
};
