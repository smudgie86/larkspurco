// Dog and cat care & health planners.
const { page, cover, lines, cbs, blankCbs, field, table, box, dots5 } = require('./lib');
const { CSS2, head, tablePage, cardsPage, checkPage, formPage, undatedMonth } = require('./lib2');

function build(sp) {
  const dog = sp === 'dog';
  const Pet = dog ? 'Dog' : 'Cat';
  const pet = dog ? 'dog' : 'cat';
  const S = `${Pet} Care Planner`;
  const T = `The ${Pet} Care & Health Planner`;
  const pages = [];
  const ids = {};
  const add = (id, pg) => { if (id) ids[id] = pages.length + 1; pages.push(pg); };

  add('cover', null);
  add('welcome', page(`<div class="kicker">Start here</div><h1>Everything about your ${pet}, in one place</h1>
<p class="lead">Vet visits, vaccinations, flea and worming dates, weight, food, medicines, the sitter's instructions... It's a lot to remember. This planner keeps it all together, so it's there when you need it.</p>
<div class="g2">${box('How to use it', `<div class="step"><div class="n">1</div><div class="small">Fill in the <b>profile</b> and <b>key contacts</b> first.</div></div><div class="step"><div class="n">2</div><div class="small">Keep the <b>health records</b> up to date after every vet visit or treatment.</div></div><div class="step"><div class="n">3</div><div class="small">Use the <b>monthly care calendar</b> for reminders.</div></div><div class="step"><div class="n">4</div><div class="small">Hand the <b>care sheet</b> to anyone looking after your ${pet}.</div></div>`)}
${box('Print what you need', cbs(['Print the record pages as often as you like', 'One planner per pet works best', 'Keep it in a folder by the door or with the lead', 'Take it to vet appointments']), 'sage')}</div>
<p class="tiny muted">This planner is for keeping records and isn't veterinary advice. Always follow your vet's advice about your ${pet}'s health, treatments and diet.</p>`, { sect: 'Welcome', deco: 'tr' }));
  add('profile', formPage(S, 'About my ' + pet, `All about my ${pet}`, '', [
    [Pet, ['Name', 'Breed / type', 'Date of birth', 'Colour & markings', 'Sex', 'Neutered / spayed', 'Came home on']],
    ['ID', ['Microchip number', 'Microchip database', 'Details last checked', ...(dog ? ['ID tag details'] : ['Collar? (quick-release)']), 'Insurance', 'Policy number']],
    ['Personality', lines(46)], ['Likes &amp; dislikes', lines(46)],
  ]));
  add('contacts', formPage(S, 'Key contacts', 'Key contacts', 'The numbers you\'ll need in a hurry.', [
    ['Vet practice', ['Name', 'Phone', 'Address', 'Vet\'s name']], ['Out of hours', ['Emergency vet', 'Phone', 'Address']],
    ['Insurance', ['Company', 'Policy number', 'Claims phone', 'Renewal date']], [dog ? 'Groomer & walker' : 'Cattery & sitter', ['Name', 'Phone', 'Name', 'Phone']],
    ['Emergency contacts', ['Name', 'Phone', 'Name', 'Phone']], [dog ? 'Trainer / daycare' : 'Breeder / rescue', ['Name', 'Phone', 'Notes']],
  ]));
  add('vacc', tablePage('Health records', 'Health records', 'Vaccinations', 'Record each vaccination and booster. Your vet will advise which your ' + pet + ' needs and when.', ['Date', 'Vaccine', 'Batch / vet', 'Next due', 'Notes'], 16, ['14%', '26%', '20%', '14%']));
  add('parasite', tablePage('Health records', 'Health records', 'Flea, tick &amp; worming', `Write down every treatment so you never double-dose or forget.${dog ? '' : ' <b>Never use a dog flea product on a cat:</b> some contain permethrin, which is very dangerous to cats.'}`, ['Date', 'Flea / tick / worm', 'Product', 'Dose / weight', 'Next due'], 18, ['14%', '20%', '28%', '18%']));
  add('meds', tablePage('Health records', 'Health records', 'Medication log', 'For courses of medicine or long-term treatments. Always follow your vet\'s instructions.', ['Start date', 'Medicine', 'Dose', 'How often', 'End date', 'Notes'], 16, ['13%', '23%', '13%', '16%', '13%']));
  add('vetvisits', page(`${head('Health records', 'Vet visits', 'Jot down what the vet said while it\'s fresh. It helps to bring your questions written down.')}
${[1, 2, 3].map(() => box('', `<div class="row">${field('Date')}${field('Vet')}${field('Reason')}</div><div class="g2" style="margin-top:1mm"><div><div class="label sage">What the vet said</div>${lines(22)}</div><div><div class="label sage">Treatment / next steps</div>${lines(22)}</div></div>`)).join('')}`, { sect: 'Health records' }));
  add('weight', page(`${head('Health records', 'Weight tracker', 'Regular weigh-ins help you and your vet spot changes early.')}
<div class="g2">${box('Weight log', table(['Date', 'Weight', 'Notes'], 18, { widths: ['26%', '22%'], rh: 8.6 }))}
<div class="col">${box('Target weight (from vet)', field('Target') + field('Body condition notes'), 'cream')}${box('Weight chart', `<div style="flex:1;min-height:90mm;background-image:linear-gradient(var(--line) .5pt,transparent .5pt),linear-gradient(90deg,var(--line) .5pt,transparent .5pt);background-size:6mm 6mm;border:.6pt solid var(--line)"></div><div class="tiny muted" style="margin-top:1mm">Mark each weigh-in as a dot and join them up.</div>`, 'fill')}</div></div>`, { sect: 'Health records' }));
  add('symptoms', tablePage('Health records', 'Health records', 'Health &amp; symptom diary', 'Note anything unusual: sickness, limping, scratching, changes in eating, drinking or toilet habits. Patterns help your vet.', ['Date', 'What I noticed', 'How long', 'Action taken'], 16, ['14%', '44%', '14%']));
  add('food', page(`${head('Daily care', 'Food &amp; diet', 'Follow the feeding guide on your ' + pet + '\'s food, or your vet\'s advice.')}
${box('Current diet', `<div class="g2">${field('Food (brand & type)')}${field('Daily amount')}${field('Meals per day & times')}${field('Treats allowed')}${field('Allergies / intolerances')}${field('Water bowl cleaned')}</div>`, 'cream')}
${box('Food changes', table(['Date', 'New food', 'Why', 'How it went'], 6, { widths: ['15%', '28%', '24%'], rh: 8.4 }))}
${box(dog ? 'Favourite treats &amp; chews' : 'Favourite foods &amp; treats', lines(), 'fill')}`, { sect: 'Daily care' }));
  if (dog) {
    add('walks', page(`${head('Daily care', 'Walks &amp; exercise', 'Colour in a box for each walk or play session. Ask your vet how much exercise suits your dog\'s age and breed.')}
${table(['Week', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Notes'], 12, { widths: ['12%', '7%', '7%', '7%', '7%', '7%', '7%', '7%'], rh: 12 })}
${box('Favourite walks', lines(), 'fill sage')}`, { sect: 'Daily care' }));
    add('groom', tablePage('Daily care', 'Daily care', 'Grooming &amp; dental care', 'Brushing, baths, nails, ears and teeth. Little and often makes it easier for everyone.', ['Date', 'Brush', 'Bath', 'Nails', 'Ears', 'Teeth', 'Groomer', 'Notes'], 16, ['13%', '8%', '8%', '8%', '8%', '8%', '12%']));
    add('training', tablePage('Behaviour', 'Behaviour', 'Training log', 'What you\'re working on and how it\'s going. Short, positive sessions work best.', ['Date', 'Skill', 'Where', 'How it went'], 16, ['14%', '26%', '20%']));
  } else {
    add('litter', page(`${head('Daily care', 'Litter tray &amp; toilet habits', 'Changes in toilet habits can be an early sign of illness. If your cat strains, goes often, or passes little or no urine, call your vet urgently.')}
${box('Litter setup', `<div class="g2">${field('Litter type')}${field('Number of trays')}${field('Where')}${field('Cleaning routine')}</div>`, 'cream')}
${table(['Week', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Notes'], 10, { widths: ['12%', '7%', '7%', '7%', '7%', '7%', '7%', '7%'], rh: 11 })}
<p class="tiny muted">Tick each day the trays are scooped. A common guide is one tray per cat, plus one extra.</p>`, { sect: 'Daily care' }));
    add('groom', tablePage('Daily care', 'Daily care', 'Grooming, claws &amp; teeth', 'Brushing helps prevent hairballs, especially for long-haired cats.', ['Date', 'Brush', 'Claws', 'Ears', 'Teeth', 'Hairball?', 'Notes'], 16, ['14%', '10%', '10%', '10%', '10%', '12%']));
    add('enrich', checkPage('Daily care', 'Daily care', 'Play, scratching &amp; enrichment', 'Indoor and outdoor cats both need daily play and places to climb, hide and scratch.', [
      ['Play ideas', ['Wand toy chase (5–10 minutes)', 'Paper balls and ping-pong balls', 'Cardboard boxes and paper bags (handles removed)', 'Puzzle feeders and treat balls', 'Laser pointer, ending on a real toy to "catch"']],
      ['Home setup', ['Scratching post (tall and sturdy)', 'Somewhere high to perch', 'Hiding places', 'Window seat for bird watching', 'Water away from food bowl']],
      ['Safety', ['Window and balcony screens', 'Lilies out of the house (very toxic)', 'Cables and strings tidied', 'Washing machine and dryer checked before use']],
      ['My cat\'s favourites', ['', '', '', '']],
    ]));
  }
  add('calendar', page(`${head('Planning', 'Monthly care calendar', 'Print one for each month. Mark treatments, appointments, grooming and anything else to remember.')}
<div class="row" style="flex:none">${field('Month')}${field('Year')}</div>
<div class="grow">${undatedMonth('mon', 26)}</div>
<div class="g3">${box('Due this month', blankCbs(3), 'clay')}${box('Appointments', blankCbs(3))}${box('To buy', blankCbs(3), 'sage')}</div>`, { sect: 'Planning', cls: 'nofill' }));
  add('costs', page(`${head('Planning', 'Pet costs', 'Knowing what your ' + pet + ' costs helps you budget, and avoid surprises.')}
${box('Regular costs', table(['Cost', 'Monthly £', 'Yearly £'], [['Food', '', ''], ['Treats &amp; chews', '', ''], ['Insurance', '', ''], ['Flea &amp; worming', '', ''], [dog ? 'Grooming' : 'Litter', '', ''], [dog ? 'Walker / daycare' : 'Cattery', '', ''], ['Vaccinations &amp; checks', '', ''], ['Toys &amp; bedding', '', ''], ['', '', ''], ['<b>Total</b>', '', '']], { widths: ['50%'], rh: 8.4 }))}
${box('One-off &amp; vet costs', table(['Date', 'What', '£', 'Claimed?'], 6, { widths: ['16%', '50%', '16%'], rh: 8.4 }))}`, { sect: 'Planning' }));
  add('safety', page(`${head('Keep this handy', 'Safety &amp; emergencies', `If your ${pet} eats something they shouldn't, or seems unwell, call your vet straight away, even if they seem fine at first.`)}
<div class="g2">${box(`Toxic to ${pet}s`, cbs(dog ? ['Chocolate', 'Grapes, raisins, currants and sultanas', 'Onions, garlic, leeks and chives', 'Xylitol (sugar-free gum and sweets)', 'Macadamia nuts', 'Alcohol and caffeine', 'Cooked bones', 'Human medicines such as ibuprofen'] : ['Lilies: every part, even pollen or water from the vase', 'Dog flea treatments containing permethrin', 'Human medicines such as paracetamol and ibuprofen', 'Onions, garlic, leeks and chives', 'Chocolate, alcohol and caffeine', 'Grapes and raisins', 'Antifreeze', 'Essential oils and liquid potpourri']), 'clay')}
${box('Call the vet if you notice', cbs(dog ? ['Vomiting or diarrhoea that doesn\'t settle', 'Not eating or drinking', 'Lethargy or collapse', 'Breathing difficulties', 'A swollen or tight belly', 'Injuries or bleeding', 'Seizures', 'Anything that worries you'] : ['Straining in the litter tray or no urine (urgent)', 'Not eating for a day', 'Vomiting or diarrhoea that doesn\'t settle', 'Breathing with an open mouth', 'Hiding and very quiet', 'Injuries or bleeding', 'Drinking much more than usual', 'Anything that worries you']))}</div>
${box('First aid kit', cbs(['Vet and out-of-hours numbers', 'Bandages and non-stick dressings', 'Blunt-ended scissors', 'Saline for cleaning wounds', 'Tick remover', 'A towel or blanket', ...(dog ? ['A spare lead'] : ['A secure carrier'])]), 'cream')}`, { sect: 'Safety', deco: 'small' }));
  add('sitter', formPage('Care sheet', 'For sitters &amp; family', `${Pet} care sheet`, `Fill this in for anyone looking after your ${pet} while you're away.`, [
    [Pet, ['Name', 'Age', 'Microchip']], ['Feeding', ['Food & amount', 'Times', 'Treats allowed']],
    [dog ? 'Walks & toilet' : 'Litter & outdoors', dog ? ['Walk times', 'Lead / off lead?', 'Toilet routine'] : ['Litter routine', 'Indoors / outdoors?', 'Cat flap']], ['Health', ['Medicines & times', 'Allergies', 'Vet & phone']],
    ['Habits & quirks', ['Hiding spots', 'Things they dislike', 'Bedtime']], ['Contacts', ['My mobile', 'Back-up contact', 'Insurance']],
  ]));
  add('travel', checkPage('Planning', 'Planning', dog ? 'Holidays &amp; travel' : 'Holidays, cattery &amp; travel', 'A checklist for trips, boarding and moving house.', [
    ['Before you go', ['Vaccinations up to date', 'Flea and worming treatment done', 'Microchip details correct', dog ? 'Kennels / sitter booked' : 'Cattery / sitter booked', 'Care sheet filled in']],
    ['Packing for your ' + pet, ['Food for the whole trip, plus extra', 'Bowls', 'Bedding with a familiar smell', 'Medicines', dog ? 'Lead, harness and poo bags' : 'Carrier and litter', 'Favourite toys']],
    ['Travelling', ['Secure in the car', 'Regular breaks', 'Water available', 'Never left in a warm car']],
    ['Notes', ['', '', '']],
  ]));
  add('memories', page(`${head('Memories', `My ${pet}'s story`, 'Little moments worth remembering.')}
<div class="g2">${['Gotcha day', 'Birthday', 'Favourite toy', 'Favourite spot', 'Funniest habit', 'Best day ever'].map((x, i) => box(x, lines(22), i % 3 === 1 ? 'sage' : '')).join('')}</div>
${box('Photo', '', 'fill')}`, { sect: 'Memories' }));
  add('notes', page(`${head('Notes', 'Notes', '')}${box('', lines(), 'fill')}`, { sect: 'Notes' }));

  pages[0] = cover({ kicker: `Health records & care planner for your ${pet}`, title: `The ${Pet}<br>Care &amp; Health<br>Planner`, lead: `Vaccinations, flea and worming, vet visits, weight, food, ${dog ? 'walks' : 'litter habits'}, costs and a care sheet for sitters, all in one place.`, tags: [`${pages.length} pages`, 'Print at home', 'Any breed'], bottom: `Print one for each ${pet}. Reprint record pages as they fill up.` });
  return { pages, ids, T, S };
}

function product(sp) {
  const { pages, ids, T, S } = build(sp);
  const dog = sp === 'dog';
  const Pet = dog ? 'Dog' : 'Cat';
  return {
    file: `${Pet}-Care-and-Health-Planner`, short: S, title: T, pages, css: CSS2, freebie: [ids.sitter, ids.safety],
    meta: {
      short: `${Pet} Care &amp;<br>Health Planner`, kicker: `${pages.length} pages · Any breed · Print at home`, sub: `Every record for your ${dog ? 'dog' : 'cat'} in one tidy place.`,
      hero: [1, ids.parasite], grid: [[ids.profile, `All about my ${dog ? 'dog' : 'cat'}`], [ids.vacc, 'Vaccinations'], [ids.parasite, 'Flea, tick & worming'], [ids.weight, 'Weight tracker'], [ids.calendar, 'Monthly care calendar'], [ids.sitter, 'Sitter care sheet']],
      detail: ids.vetvisits, detailTitle: 'Never forget what the vet said', detailPoints: ['Vet visit notes and next steps', 'Vaccination and parasite records', 'Medication and symptom diary', 'Everything ready to take to appointments'],
      features: [['Health records', 'Vaccinations, flea and worming, medicines and vet visits'], [dog ? 'Daily care' : 'Cat-specific pages', dog ? 'Food, walks, grooming and training logs' : 'Litter habits, play, scratching and safety'], ['Planning', 'Monthly care calendar, pet costs and travel checklist'], ['Care sheet', 'Everything a sitter needs, on one page']],
      pins: [[`${Pet} health records printable`, 'Vaccinations, worming, weight and vet visits', ids.vacc], [`Going away? ${Pet} sitter care sheet`, 'A free printable for sitters and family', ids.sitter], [`What's toxic to ${dog ? 'dogs' : 'cats'}?`, 'A printable safety and first aid page', ids.safety]],
      listing: {
        price: '£4.95',
        title: dog ? 'Dog Health Record Printable, Dog Care Planner, Vaccination Record, Flea & Worming Tracker, Vet Visit Log, Pet Sitter Sheet, A4 & Letter PDF' : 'Cat Health Record Printable, Cat Care Planner, Vaccination Record, Flea & Worming Tracker, Vet Log, Cat Sitter Instructions, A4 PDF',
        tags: dog ? ['dog planner', 'dog health record', 'pet planner', 'vaccination record', 'dog care', 'vet record', 'flea tracker', 'pet sitter sheet', 'dog mum gift', 'pet health log', 'dog printable', 'new dog owner', 'pet medical record'] : ['cat planner', 'cat health record', 'pet planner', 'cat care', 'vaccination record', 'vet record', 'flea tracker', 'cat sitter', 'cat mum gift', 'pet health log', 'cat printable', 'new cat owner', 'pet medical record'],
        hook: `Every record for your ${dog ? 'dog' : 'cat'} in one tidy place.`,
        body: [`A printable care and health planner for ${dog ? 'dogs' : 'cats'} of any breed or age. Keep vet visits, treatments, weight, food and care instructions together, and print extra record pages whenever you need them.`,
          `INSIDE:\n• All about my ${dog ? 'dog' : 'cat'} and key contacts\n• Vaccination record\n• Flea, tick and worming tracker\n• Medication log and vet visit notes\n• Weight tracker with chart\n• Health and symptom diary\n• Food and diet page\n${dog ? '• Walks and exercise tracker\n• Grooming and dental log\n• Training log' : '• Litter tray and toilet habits\n• Grooming, claws and teeth\n• Play, scratching and enrichment checklist'}\n• Monthly care calendar (undated)\n• Pet costs budget\n• Safety, toxic foods and first aid kit\n• Care sheet for sitters\n• Holidays and travel checklist\n• Memories page`],
        pinCopy: [[`${Pet} health records printable`, 'Vaccinations, flea and worming, weight, medicines and vet visits in one planner.'], [`${Pet} sitter instructions: free care sheet`, 'Feeding, routines, medicines and contacts on one page.'], [`Toxic to ${dog ? 'dogs' : 'cats'}: printable safety page`, 'Keep it on the fridge, with your vet\'s numbers.'], [`${Pet} care calendar`, 'Never miss a flea or worming treatment again.'], [`Gift for a new ${dog ? 'dog' : 'cat'} owner`, 'A printable care and health planner.']],
        prompts: [`Top-down flat lay of a blank white A4 printed planner page on a light wooden table beside a ${dog ? 'dog lead, a tennis ball and a dog\'s paw resting on the edge of the table' : 'cat sitting beside it, a feather wand toy and a small ceramic food bowl'}, soft natural window light, warm cream and sage palette, photorealistic, 4:5`],
      },
    },
  };
}

module.exports = { product };
