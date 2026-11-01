const { page, cover, section, lines, cbs, blankCbs, field, table, box, dots5 } = require('../lib');
const { CSS2, head, tablePage, cardsPage, checkPage, formPage } = require('../lib2');

const T = 'The 28-Day Puppy Plan';
const S = 'Puppy Plan';
const pages = [];
const ids = {};
const add = (id, pg) => { if (id) ids[id] = pages.length + 1; pages.push(pg); };

const weeks = [
  { n: 1, name: 'Settle in', lead: 'Everything is new. This week is about comfort, sleep, a simple routine and lots of gentle getting-to-know-you.' },
  { n: 2, name: 'Build the routine', lead: 'Your puppy is finding their feet. Keep the routine steady and start a few short, fun training games.' },
  { n: 3, name: 'Explore', lead: 'New sounds, surfaces and gentle handling. Keep every experience short, positive and at your puppy\'s pace.' },
  { n: 4, name: 'Grow in confidence', lead: 'Calm settling, early lead skills and planning what comes next, including puppy classes.' },
];
const days = [
  ['A calm first day', 'Keep today quiet. Show your puppy their bed, water and toilet spot, then let them explore one room at a time. Lots of sleep is normal.'],
  ['The name game', 'Say your puppy\'s name once in a happy voice. The moment they look at you, give a tiny treat. Repeat 5–10 times, a few times a day.'],
  ['A cosy crate or den', 'Make the crate or bed the best place in the house: soft bedding, a chew, meals served there with the door open. Never use it as a punishment.'],
  ['Toilet routine', 'Take your puppy to the same spot after waking, eating, playing and every hour or two. Say a cue like "be quick", then praise and reward the moment they go.'],
  ['Gentle handling', 'Touch paws, ears and mouth for a second at a time, then give a treat. This makes vet visits, grooming and nail trims much easier later.'],
  ['Hand feeding', 'Feed part of a meal from your hand, one piece at a time. It builds trust and teaches your puppy that hands bring good things.'],
  ['Rest and review', 'A lighter day. Notice what\'s going well, fill in your week 1 review, and enjoy some quiet cuddles.'],
  ['Sit', 'Hold a treat by your puppy\'s nose and move it slowly up and back. As their bottom goes down, say "yes" and reward. Practise for a minute at a time.'],
  ['Short alone times', 'Leave the room for a few seconds while your puppy has a chew, then come back calmly. Build up very slowly so being alone feels normal.'],
  ['Chew time', 'Puppies need to chew, especially while teething. Offer suitable chews and swap anything they shouldn\'t have for something they can.'],
  ['Collar and lead indoors', 'Let your puppy wear their collar for short spells, then clip on the lead indoors and follow them around with treats. No pulling, just getting used to it.'],
  ['New sounds', 'Play everyday sounds (traffic, doorbells, hoovers, fireworks) very quietly while your puppy eats or plays. Only turn it up if they stay relaxed.'],
  ['Calm visitors', 'Invite one calm visitor. Ask them to let your puppy come to them, crouch down, and offer a treat. Keep it short and happy.'],
  ['Rest and review', 'A lighter day with a sniffy play session and plenty of naps. Fill in your week 2 review.'],
  ['Come when called', 'In the house, say your puppy\'s name and "come" in a happy voice, then reward with a treat and a fuss when they reach you. Keep it a fun game.'],
  ['Down', 'From a sit, lower a treat slowly to the floor between their paws. When their elbows touch down, say "yes" and reward.'],
  ['A short car trip', 'Sit in the parked car together with a treat or chew. If that goes well, try a very short drive. Keep your puppy safely secured.'],
  ['Surfaces and textures', 'Let your puppy explore different surfaces at home: a doormat, a towel, foil, a cushion, a tray. Reward curiosity and never force them.'],
  ['First brush', 'Use a soft brush for a few strokes, then a treat. Keep it short. Check ears, eyes and teeth at the same time.'],
  ['Leave it', 'Show a treat in your closed hand. When your puppy stops trying to get it and moves away, say "yes" and give a different treat from the other hand.'],
  ['Rest and review', 'Halfway past the first month! Have a calm day and fill in your week 3 review.'],
  ['Settle on a mat', 'Put a mat down and reward your puppy for any calm behaviour on it: lying down, sighing, relaxing. This helps them switch off.'],
  ['Loose lead basics', 'In the house or garden, reward your puppy every time they\'re next to you with a loose lead. A few steps at a time is plenty.'],
  ['A calm dog friend', 'If your vet says it\'s safe, let your puppy meet one calm, friendly, fully vaccinated adult dog. Keep it short and let them choose how close to go.'],
  ['Wait at doors', 'Before opening a door, wait for your puppy to pause for a second, then say "OK" and go through together. This builds patience and keeps them safe.'],
  ['A happy vet visit', 'Pop into the vet practice just to say hello, have a treat and leave. Many practices are happy to help puppies get used to the building.'],
  ['Puppy classes', 'Look for a reward-based puppy class near you. Write down a few options and book one that suits your puppy and your timetable.'],
  ['Celebrate!', 'You made it through the first month. Look back at day 1, fill in the milestones page and plan the next month together.'],
];

add('cover', cover({ kicker: 'A gentle first month for you and your puppy', title: 'The 28-Day<br>Puppy Plan', lead: 'A day-by-day plan for your puppy\'s first four weeks: routines, toilet and crate training, socialisation, early training games and every tracker you need.', tags: ['54 pages', 'Print at home', 'UK friendly'], bottom: 'Every puppy is different. Go at your puppy\'s pace and ask your vet if you\'re unsure.' }));

add('welcome', page(`<div class="kicker">Start here</div><h1>Welcome to puppy life</h1>
<p class="lead">Bringing a puppy home is exciting, exhausting and a little overwhelming. This plan breaks the first month into small daily steps, so you always know what to focus on next.</p>
<div class="g2">${box('How to use this plan', `<div class="step"><div class="n">1</div><div class="small">Work through the <b>getting ready</b> pages before your puppy arrives.</div></div><div class="step"><div class="n">2</div><div class="small">Each day has <b>one small focus</b>. Five minutes of practice, a few times a day, is plenty.</div></div><div class="step"><div class="n">3</div><div class="small">Use the <b>daily log</b> to track toilet trips, meals and naps. Patterns appear quickly.</div></div><div class="step"><div class="n">4</div><div class="small">Keep the <b>trackers</b> at the back for vet visits, weight and training.</div></div>`)}
${box('Good to know', cbs(['Puppies sleep a lot, often 18 hours a day or more.', 'Short training sessions work best: 1–3 minutes.', 'Accidents are normal. Never punish them.', 'Reward what you like, and gently redirect what you don\'t.', 'Ask your vet about vaccinations, worming and when it\'s safe to go out.']), 'sage')}</div>
<p class="tiny muted">This plan is general guidance for healthy puppies and isn't a substitute for advice from your vet or a qualified trainer. If you're worried about your puppy's health or behaviour, contact your vet.</p>`, { sect: 'Welcome', deco: 'tr' }));

add('contents', page(`<div class="kicker">Inside</div><h1>Contents</h1><div class="g2" style="gap:8mm;margin-top:3mm"><div>
<h3 style="margin:2mm 0">Getting ready</h3>{{toc1}}<h3 style="margin:4mm 0 2mm">The 28 days</h3>{{toc2}}</div><div><h3 style="margin:2mm 0">Trackers &amp; records</h3>{{toc3}}</div></div>`, { sect: 'Contents', deco: 'small', cls: 'nofill' }));

add('shop', checkPage(S, 'Getting ready', 'Puppy shopping list', 'Tick off what you have. You don\'t need everything on day one.', [
  ['Sleeping & resting', ['Crate or puppy pen', 'Comfy bed and washable blankets', 'An old jumper that smells of you', 'Baby gates for stairs or rooms']],
  ['Food & water', ['The same food your breeder or rescue used', 'Food and water bowls', 'Training treats (small and soft)', 'A food-dispensing toy or lick mat']],
  ['Out & about', ['Collar with an ID tag (your name and address)', 'Lightweight lead', 'Well-fitting puppy harness', 'Poo bags and a dispenser']],
  ['Play & chew', ['Soft toys', 'Puppy-safe chews', 'A tug toy', 'A ball or squeaky toy']],
  ['Cleaning', ['Enzyme cleaner for accidents', 'Kitchen roll and old towels', 'Puppy shampoo and a soft brush', 'Puppy toothbrush and dog toothpaste']],
  ['Admin', ['Register with a vet', 'Pet insurance', 'Microchip details updated to your name', 'Vaccination card from your breeder or rescue']],
], { after: `<p class="tiny muted">In the UK, dogs must wear a collar and tag with the owner's name and address when in a public place, and must be microchipped with up-to-date details.</p>` }));

add('proof', checkPage(S, 'Getting ready', 'Puppy-proofing your home', 'Get down to puppy height and look around. Anything they can reach, they will chew.', [
  ['Living room', ['Hide or cover cables and chargers', 'Move shoes, remotes and small objects', 'Check houseplants are safe for dogs', 'Secure bins and bags']],
  ['Kitchen', ['Chocolate, grapes, raisins and onions out of reach', 'Sugar-free gum and sweets put away (xylitol is toxic)', 'Child locks on low cupboards with cleaners', 'Bin with a secure lid']],
  ['Garden', ['Check fences and gates for gaps', 'Remove toxic plants and slug pellets', 'Cover ponds', 'Choose a toilet spot']],
  ['Everywhere', ['Baby gates on stairs', 'Medicines locked away', 'Small toys tidied away', 'Doors and windows kept closed']],
], { after: box('Things I still need to sort', blankCbs(4), 'cream') }));

add('profile', formPage(S, 'Getting ready', 'All about my puppy', '', [
  ['Puppy', ['Name', 'Breed', 'Date of birth', 'Colour & markings', 'Came home on', 'Weight on arrival']],
  ['Microchip &amp; ID', ['Microchip number', 'Database', 'Details updated?', 'ID tag ordered?']],
  ['Breeder or rescue', ['Name', 'Phone', 'Food they were eating', 'Feeding times']],
  ['Vet &amp; insurance', ['Vet practice', 'Phone', 'Out-of-hours number', 'Insurance company', 'Policy number']],
]));

add('first24', page(`${head('Getting ready', 'The first 24 hours', 'Keep the first day calm and simple. Your puppy has just left everything they know.')}
<div class="col">${[['Arrival', 'Take your puppy straight to their toilet spot first. Praise and reward if they go.'], ['Explore', 'Let them explore one room with you. Keep visitors and excitement for another day.'], ['Food &amp; water', 'Offer a small meal of the food they\'re used to, and fresh water.'], ['Sleep', 'Show them their bed or crate and let them nap as much as they like.'], ['Bedtime', 'Many puppies settle better with their bed near you for the first nights. Take them out for a toilet trip last thing.'], ['Night', 'Expect to get up in the night for toilet trips at first. Keep it quiet and boring, then straight back to bed.']].map(([h, t], i) => `<div class="box" style="flex-direction:row;gap:4mm;align-items:center"><div class="num" style="font-size:20pt;width:9mm;flex:none">${i + 1}</div><div><h3>${h}</h3><p class="small">${t}</p></div></div>`).join('')}</div>
${box('My notes from day one', lines(), 'fill sage')}`, { sect: S, deco: 'small' }));

add('routine', page(`${head('Getting ready', 'A day in the life', 'An example routine for a young puppy. Adjust it to fit your day, and follow your vet\'s and food\'s guidance on meals.')}
<div class="g2"><div class="box"><div class="label">Example routine</div>${[['On waking', 'Straight outside to the toilet spot'], ['Breakfast', 'Then a toilet trip'], ['Play &amp; training', '5–10 minutes, then toilet'], ['Nap', 'In the crate or bed'], ['Lunch', 'Then a toilet trip'], ['Gentle exploring', 'Then toilet and a nap'], ['Afternoon meal', 'Then a toilet trip'], ['Play &amp; cuddles', 'Short and calm'], ['Evening meal', 'Then a toilet trip'], ['Wind down', 'A chew or lick mat'], ['Last toilet trip', 'Then bed']].map(([a, b]) => `<div style="display:flex;justify-content:space-between;border-bottom:.6pt solid var(--line);padding:1.4mm 0" class="small"><b>${a}</b><span class="muted">${b}</span></div>`).join('')}</div>
<div class="box"><div class="label">My puppy's routine</div>${table(['Time', 'What'], 12, { widths: ['26%'], rh: 8.4 })}</div></div>
<div class="callout sage"><p class="small"><b>Toilet trips:</b> take your puppy out after waking, after eating, after playing, and every hour or two while they're awake. Young puppies can't hold on for long.</p></div>`, { sect: S }));

add('toilet', cardsPage(S, 'How to', 'Toilet training', 'Toilet training takes weeks, not days. Consistency and rewards are what make it work.', [
  ['Go out often', 'After waking, eating, playing and every hour or two. Stay with your puppy so you can reward them.'], ['Same spot, same word', 'Use the same toilet spot and a calm cue like "be quick" while they go.'],
  ['Reward straight away', 'Praise and give a treat the moment they finish, outside, not when they come back in.'], ['Watch for signs', 'Sniffing, circling, whining or heading for the door usually means "I need to go".'],
  ['Accidents happen', 'Never shout or punish. Calmly take them outside, and clean the spot with an enzyme cleaner so it doesn\'t smell like a toilet.'], ['Night-time', 'Keep night trips quiet and boring. Most puppies gradually manage longer at night as they grow.'],
], { after: box('What\'s working for us', lines(), 'fill') }));

add('crate', cardsPage(S, 'How to', 'Crate and bed training', 'A crate or pen can be a safe, cosy den, as long as it\'s always a happy place.', [
  ['Make it lovely', 'Soft bedding, a chew, a blanket over the top for a den feel. Leave the door open at first.'], ['Meals in the crate', 'Feeding meals in or near the crate builds a happy link.'],
  ['Short and sweet', 'Close the door for a few seconds while they eat or chew, then open it. Build up slowly.'], ['Never a punishment', 'The crate should only ever mean good things, never time out.'],
  ['Sleep and rest', 'Puppies need lots of sleep. A quiet den helps them switch off.'], ['Not too long', 'Puppies shouldn\'t be shut in for long periods. Plan toilet breaks, company and play.'],
], { after: box('Crate progress', table(['Date', 'Door closed for', 'How it went'], 5, { widths: ['18%', '26%'], rh: 8 })) }));

add('biting', cardsPage(S, 'How to', 'Puppy biting and mouthing', 'Mouthing is normal puppy behaviour. Your job is to teach gentle mouths and offer better things to chew.', [
  ['It\'s normal', 'Puppies explore with their mouths, and teething makes it worse. It usually eases as they grow.'], ['Redirect', 'Keep a toy in your hand or pocket and offer it when teeth come out.'],
  ['Pause the game', 'If teeth touch skin, calmly stop playing for a moment, then start again with a toy.'], ['Tired puppies bite more', 'Overtired puppies get nippy. A nap often works better than more play.'],
  ['Chew menu', 'Offer a few different safe chews and see which your puppy loves.'], ['Children', 'Supervise children and puppies together, and teach children to stand still and fold their arms if the puppy gets mouthy.'],
], { after: box('Our best biting fixes', lines(), 'fill') }));

add('social', page(`${head('How to', 'Socialisation', 'Puppies are most open to new experiences in their first few months. Calm, positive introductions now help your puppy become a confident adult dog.')}
<div class="g2">${box('The golden rules', cbs(['Short and positive every time', 'Let your puppy watch from a distance first', 'Pair new things with treats', 'Never force them to go closer', 'If they seem worried, move further away', 'Quality matters more than quantity']), 'sage')}
${box('Before vaccinations are finished', `<p class="small">Ask your vet when it's safe for your puppy to walk in public places and meet other dogs. Until then, you can still socialise safely:</p>${cbs(['Carry your puppy to see the world', 'Invite calm visitors to your home', 'Explore your own enclosed garden', 'Play recordings of everyday sounds', 'Meet dogs you know are fully vaccinated (if your vet agrees)'])}`)}</div>
${box('Signs your puppy needs a break', '<p class="small">Tucked tail, ears back, lip licking, yawning, turning away, freezing, trying to hide. If you see these, calmly move away and try again another day, from further away.</p>', 'clay')}
${box('Notes', lines(), 'fill')}`, { sect: S, deco: 'small' }));

const socTable = (rows) => `<table class="grid" style="--rh:7.6mm"><thead><tr><th style="width:52%">Experience</th><th>1st</th><th>2nd</th><th>3rd</th><th>How it went</th></tr></thead><tbody>${rows.map((r) => `<tr><td>${r}</td><td></td><td></td><td></td><td></td></tr>`).join('')}</tbody></table>`;
add('soc1', page(`${head('Socialisation', 'Socialisation checklist (1 of 2)', 'Tick each time your puppy has a calm, happy experience.')}
${box('People', socTable(['Men', 'Women', 'Children (supervised)', 'People in hats or sunglasses', 'People with beards', 'People in high-vis or uniforms', 'People with walking sticks, wheelchairs or pushchairs']))}
${box('Sounds', socTable(['Doorbell and knocking', 'Hoover and washing machine', 'Traffic and buses', 'Fireworks (recording, quietly)', 'Thunder (recording, quietly)', 'Babies crying', 'TV and music']))}`, { sect: 'Socialisation' }));
add('soc2', page(`${head('Socialisation', 'Socialisation checklist (2 of 2)', 'Keep going after the first month. Socialisation is a lifelong habit.')}
${box('Places &amp; surfaces', socTable(['The car', 'Grass, gravel and mud', 'Wet ground and puddles', 'Stairs and slippery floors', 'A café or pub garden', 'The vet practice (happy visit)']))}
${box('Handling', socTable(['Paws and nails', 'Ears and eyes', 'Mouth and teeth', 'Brushing', 'Wearing a harness', 'Being lifted gently']))}
${box('Animals', socTable(['Calm vaccinated adult dog', 'Cats (at a distance)', 'Horses or farm animals (at a distance)', 'Birds and wildlife']))}`, { sect: 'Socialisation' }));

const dayPage = (d, i) => page(`<div class="row" style="flex:none;align-items:center;gap:6mm"><div style="flex:none;text-align:center;width:20mm"><div class="kicker">Day</div><div class="num" style="font-size:38pt">${i + 1}</div></div><div><div class="kicker" style="color:var(--sage)">Week ${Math.floor(i / 7) + 1} · ${weeks[Math.floor(i / 7)].name}</div><h1 class="sm">${d[0]}</h1></div><div style="flex:none;width:42mm">${field('Date')}</div></div>
<div class="callout sage"><h3>Today's focus</h3><p class="small">${d[1]}</p></div>
<div class="g2">${box('Toilet log', `<table class="grid tight" style="--rh:6.4mm"><thead><tr><th>Time</th><th>Wee</th><th>Poo</th><th>Outside?</th></tr></thead><tbody>${Array.from({ length: 10 }, () => '<tr><td></td><td></td><td></td><td></td></tr>').join('')}</tbody></table>`)}
<div class="col">${box('Meals', `<table class="grid tight" style="--rh:6.4mm"><thead><tr><th>Time</th><th>Food &amp; amount</th></tr></thead><tbody>${Array.from({ length: 4 }, () => '<tr><td style="width:25%"></td><td></td></tr>').join('')}</tbody></table>`)}${box('Naps', `<div class="small">${Array.from({ length: 6 }, () => '<span style="display:inline-block;width:22%;border-bottom:.6pt solid var(--line);margin:1.4mm 2% 0 0;height:5mm"></span>').join('')}</div>`)}</div></div>
<div class="g2">${box('Training practice', `<div class="small">What we practised and how many goes:</div>${lines(18)}`, 'cream')}${box('New experiences', lines(24))}</div>
<div class="g2">${box('Today\'s wins', lines(), 'clay fill')}${box('', `<div class="small">Puppy's mood ${dots5()}</div><div class="small" style="margin-top:1.4mm">My energy ${dots5()}</div><div class="label sage" style="margin-top:2mm">Notes</div>${lines()}`, 'fill')}</div>`, { sect: `Day ${i + 1} of 28` });

weeks.forEach((w, wi) => {
  add(`w${w.n}`, section({ kicker: `Week ${w.n} of 4`, title: w.name, lead: w.lead, body: `<div class="g2" style="margin-top:8mm">${box('This week', days.slice(wi * 7, wi * 7 + 7).map((d, k) => `<div class="cb">Day ${wi * 7 + k + 1}: ${d[0]}</div>`).join(''))}${box(w.n === 1 ? 'My hopes for the first week' : `Week ${w.n - 1} review: what went well`, lines(), 'clay fill')}</div>` }));
  days.slice(wi * 7, wi * 7 + 7).forEach((d, k) => add(null, dayPage(d, wi * 7 + k)));
});

add('vet', tablePage('Records', 'Records', 'Vaccinations, worming &amp; vet visits', 'Ask your vet for a vaccination and parasite plan, and record each one here.', ['Date', 'Type', 'Product / vaccine', 'Next due', 'Notes'], 18, ['14%', '20%', '24%', '14%']));
add('weight', page(`${head('Records', 'Weight tracker', 'Weigh your puppy regularly (your vet practice can help). Steady growth is what matters.')}
<div class="tbl-fill">${table(['Date', 'Age', 'Weight', 'Notes'], 16, { widths: ['20%', '18%', '18%'], rh: 9 })}</div>`, { sect: 'Records' }));
add('feed', page(`${head('Records', 'Feeding plan', 'Follow the guidance on your puppy\'s food or from your vet. Puppies usually need several small meals a day.')}
${box('Current plan', `<div class="g2">${field('Food')}${field('Daily amount')}${field('Meals per day')}${field('Treat allowance')}</div>`, 'cream')}
<div class="tbl-fill">${table(['Date', 'Change', 'Why', 'How it went'], 12, { widths: ['16%', '30%', '24%'], rh: 9.6 })}</div>`, { sect: 'Records' }));
add('training', page(`${head('Records', 'Training progress', 'Colour in each box as your puppy gets more confident with each skill.')}
${table(['Skill', 'Learning', 'Getting it', 'Got it at home', 'Got it outside'], ['Name game', 'Sit', 'Down', 'Come', 'Leave it', 'Wait', 'Settle on a mat', 'Loose lead', 'Crate / bed', 'Handling', 'Calm greetings', '', '', ''].map((x) => [x, '', '', '', '']), { widths: ['30%'], rh: 11 })}`, { sect: 'Records' }));
add('safety', page(`${head('Keep this handy', 'Safety &amp; emergencies', 'If your puppy eats something they shouldn\'t, or seems unwell, call your vet straight away, even if they seem fine.')}
<div class="g2">${box('Toxic to dogs', cbs(['Chocolate', 'Grapes, raisins, currants and sultanas', 'Onions, garlic, leeks and chives', 'Xylitol (in sugar-free gum, sweets and some peanut butters)', 'Macadamia nuts', 'Alcohol and caffeine', 'Cooked bones', 'Human medicines such as ibuprofen']), 'clay')}
${box('Call the vet if you notice', cbs(['Vomiting or diarrhoea that doesn\'t settle', 'Not eating or drinking', 'Lethargy or collapse', 'Breathing difficulties', 'Swelling or a sore belly', 'Any injury or bleeding', 'Seizures', 'Anything that worries you']))}</div>
${box('Emergency numbers', field('My vet') + field('Out-of-hours vet') + field('Insurance claims line') + field('Emergency contact'), 'cream')}`, { sect: 'Safety', deco: 'small' }));
add('milestones', page(`${head('Memories', 'Puppy milestones', 'Write down the firsts. You\'ll love looking back on these.')}
<div class="g2">${['First night home', 'First "sit"', 'First walk outside', 'First puppy class', 'Favourite toy', 'Funniest moment', 'Best nap spot', 'Nicknames'].map((x, i) => box(x, field('Date') + lines(14), i % 3 === 0 ? 'cream' : '')).join('')}</div>
${box('Photo or drawing', '', 'fill')}`, { sect: 'Memories' }));
add('sitter', formPage('Care sheet', 'For sitters &amp; family', 'Puppy care sheet', 'Fill this in for anyone looking after your puppy.', [
  ['Puppy', ['Name', 'Age', 'Microchip']], ['Food', ['Food & amount', 'Meal times', 'Treats allowed']],
  ['Routine', ['Toilet cue & spot', 'Nap times', 'Bedtime routine']], ['Training', ['Cues they know', 'House rules', 'Things to avoid']],
  ['Health', ['Medicines', 'Allergies', 'Vet & phone']], ['Contacts', ['My mobile', 'Back-up contact', 'Insurance']],
]));
add('thanks', page(`<div class="kicker">Thank you</div><h1>Here's to many happy years</h1><p class="lead">Thank you for choosing Larkspur &amp; Co. If this plan helped your first month together, a short Etsy review would mean the world to a small Glasgow business.</p>${box('Next month, we\'ll work on...', lines(), 'fill')}`, { sect: 'Thank you', deco: 'tr' }));

// Contents
const toc = (items) => items.map(([a, id]) => `<div class="toc"><b>${a}</b><span>${ids[id]}</span></div>`).join('');
pages[ids.contents - 1].body = pages[ids.contents - 1].body
  .replace('{{toc1}}', toc([['Puppy shopping list', 'shop'], ['Puppy-proofing your home', 'proof'], ['All about my puppy', 'profile'], ['The first 24 hours', 'first24'], ['A day in the life', 'routine'], ['Toilet training', 'toilet'], ['Crate and bed training', 'crate'], ['Puppy biting', 'biting'], ['Socialisation', 'social'], ['Socialisation checklists', 'soc1']]))
  .replace('{{toc2}}', toc(weeks.map((w) => [`Week ${w.n}: ${w.name}`, `w${w.n}`])))
  .replace('{{toc3}}', toc([['Vaccinations, worming &amp; vet visits', 'vet'], ['Weight tracker', 'weight'], ['Feeding plan', 'feed'], ['Training progress', 'training'], ['Safety &amp; emergencies', 'safety'], ['Puppy milestones', 'milestones'], ['Puppy care sheet', 'sitter']]));
pages[0] = cover({ kicker: 'A gentle first month for you and your puppy', title: 'The 28-Day<br>Puppy Plan', lead: 'A day-by-day plan for your puppy\'s first four weeks: routines, toilet and crate training, socialisation, early training games and every tracker you need.', tags: [`${pages.length} pages`, 'Print at home', 'UK friendly'], bottom: 'Every puppy is different. Go at your puppy\'s pace and ask your vet if you\'re unsure.' });

module.exports = {
  file: '28-Day-Puppy-Plan', short: S, title: T, pages, css: CSS2, freebie: [ids.toilet, ids.soc1],
  meta: {
    short: 'The 28-Day<br>Puppy Plan', kicker: 'New puppy · Day by day · Print at home', sub: 'Your puppy\'s first month, one small step a day.',
    hero: [1, ids.w1 + 1], grid: [[ids.shop, 'Puppy shopping list'], [ids.routine, 'A day in the life'], [ids.w1 + 1, '28 daily plans'], [ids.soc1, 'Socialisation checklists'], [ids.training, 'Training progress'], [ids.safety, 'Safety & emergencies']],
    detail: ids.w1 + 2, detailTitle: 'One small focus a day', detailPoints: ['A daily training or settling focus', 'Toilet, meals and nap log', 'Track new experiences and wins', 'Simple enough for a busy household'],
    features: [['28 daily plans', 'From the name game to loose lead walking'], ['Toilet & crate training', 'Clear, kind guides with progress logs'], ['Socialisation', 'Golden rules and 30+ experiences to tick off'], ['Every record you need', 'Vet, weight, feeding, training and a sitter sheet']],
    pins: [['New puppy? Start here', 'A 28-day plan for the first month', ids.w1 + 1], ['Puppy socialisation checklist', 'People, sounds, places and handling', ids.soc1], ['Toilet training made simple', 'A kind, step-by-step puppy guide', ids.toilet]],
    listing: {
      price: '£6.95', title: 'Puppy Training Planner Printable, 28 Day New Puppy Plan, Potty Training Log, Crate Training, Socialisation Checklist, A4 & US Letter PDF',
      tags: ['puppy planner', 'puppy training', 'new puppy', 'potty training', 'crate training', 'puppy checklist', 'dog planner', 'socialization', 'puppy schedule', 'dog training log', 'new puppy gift', 'puppy printable', 'dog mum gift'],
      hook: 'Your puppy\'s first month, one small step a day.',
      body: ['A day-by-day printable plan for the first 28 days with a new puppy. Each day has one small focus (the name game, crate time, sit, gentle handling and more) plus a daily log for toilet trips, meals and naps.',
        'INSIDE:\n• Puppy shopping list and puppy-proofing checklist\n• All about my puppy (profile, microchip, vet, insurance)\n• The first 24 hours and an example daily routine\n• Guides: toilet training, crate training, puppy biting, socialisation\n• Socialisation checklists (people, sounds, places, handling, animals)\n• 4 weekly overviews and 28 daily plan pages\n• Vaccination, worming and vet log, weight tracker, feeding plan\n• Training progress chart, safety and toxic foods page\n• Puppy milestones page and a care sheet for sitters'],
      pinCopy: [['New puppy? A 28-day plan for the first month', 'One small focus a day plus a daily toilet, meals and nap log. Printable puppy planner.'], ['Puppy socialisation checklist printable', 'People, sounds, surfaces, places and handling, with tick boxes for each experience.'], ['Puppy toilet training: a kind step-by-step guide', 'Go out often, same spot, reward straight away. From The 28-Day Puppy Plan.'], ['What to buy before your puppy comes home', 'A printable puppy shopping list and puppy-proofing checklist.'], ['Puppy daily routine example', 'Toilet trips, meals, naps and play for a young puppy. Printable planner.']],
      prompts: ['Top-down flat lay of a blank white A4 printed planner page on a light oak floor beside a sleeping cream-coloured puppy on a soft knitted blanket, a chew toy and a lead, soft natural window light, warm cream and sage palette, photorealistic, 4:5'],
    },
  },
};
