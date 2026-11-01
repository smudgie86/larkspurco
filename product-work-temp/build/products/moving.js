const { page, cover, lines, cbs, blankCbs, field, table, box, dots5 } = require('../lib');
const { CSS2, head, tablePage, cardsPage, checkPage, formPage } = require('../lib2');

const T = 'The Moving House Planner';
const S = 'Moving House Planner';
const pages = [];
const ids = {};
const add = (id, pg) => { if (id) ids[id] = pages.length + 1; pages.push(pg); };

add('cover', null);
add('welcome', page(`<div class="kicker">Start here</div><h1>Moving, without the meltdown</h1>
<p class="lead">Moving house is one of life's most stressful jobs: hundreds of tasks, deadlines, boxes and people to tell. This planner breaks it into small weekly steps and keeps every detail in one place.</p>
<div class="g2">${box('Inside', cbs(['Moving overview and key contacts', '8-week countdown, week by week', 'Budget and removals quotes', 'Declutter plan', 'Packing room by room and a box log', 'Change of address checklist (UK)', 'Utilities and meter readings', 'Moving day plan and first night box', 'New home cleaning and settling in']))}
${box('Good to know', cbs(['Undated, so it works for any move', 'Works for buying or renting', 'Tick off what applies to you', 'Keep it in a folder with your paperwork', 'Moving with kids or pets? There\'s a page for that']), 'sage')}</div>`, { sect: 'Welcome', deco: 'tr' }));
add('overview', formPage(S, 'The basics', 'Moving overview', 'Everything about the move on one page.', [
  ['Moving from', ['Address', 'Postcode', 'Keys handed back by']], ['Moving to', ['Address', 'Postcode', 'Keys collected from']],
  ['Dates', ['Moving day', 'Completion / tenancy start', 'Removals booked for', 'Time off work']], ['Key contacts', ['Solicitor / conveyancer', 'Estate / letting agent', 'Removals company', 'Landlord / seller']],
]));
const wk = (n, lead, tasks) => page(`<div class="row" style="flex:none;align-items:flex-end"><div><div class="kicker">The countdown</div><h1 class="sm">${n}</h1></div><div style="flex:none;width:44mm">${field('Week of')}</div></div>
<p class="muted">${lead}</p>
${box('To do', cbs(tasks, 'line') + blankCbs(3))}
<div class="g2">${box('Calls &amp; emails', blankCbs(4), 'sage')}${box('Buy', blankCbs(4), 'cream')}</div>
${box('Notes', lines(), 'fill')}`, { sect: 'Countdown' });
add('w8', wk('8 weeks to go', 'Plan, sort and book the big things.', ['Set a moving budget', 'Get 3 removals quotes (or price up a van)', 'Start decluttering one room at a time', 'Check notice periods (tenancy, broadband, contracts)', 'Collect free boxes, buy tape and markers', 'Make a floor plan of the new place if you can']));
add(null, wk('6 weeks to go', 'Book, notify and start packing the things you rarely use.', ['Book removals or van hire', 'Give notice to your landlord if renting', 'Book time off work for moving day', 'Start packing books, decorations, out-of-season clothes', 'Arrange childcare or pet care for moving day', 'Use up freezer and cupboard food']));
add(null, wk('4 weeks to go', 'Start telling people and arranging services.', ['Set up Royal Mail redirection', 'Arrange broadband at the new address (installs can take weeks)', 'Notify energy and water suppliers of your move date', 'Start the change of address checklist', 'Book any cleaning for the old place', 'Keep packing: one room at a time']));
add(null, wk('2 weeks to go', 'Confirm everything and pack most of the house.', ['Confirm removals date and time', 'Confirm key collection arrangements', 'Pack everything except essentials', 'Sort parking for the removal van (both addresses)', 'Return library books, collect dry cleaning', 'Defrost freezer plan']));
add(null, wk('Moving week', 'Final packing, first night box, and rest where you can.', ['Pack the first night box', 'Pack a bag of essentials for each person', 'Charge phones and power banks', 'Take meter photos at the old place on moving day', 'Clean the old place (or book a cleaner)', 'Label every box with room and contents']));
add('budget', page(`${head('Money', 'Moving budget', 'Moving costs add up fast. Track them all here.')}
${table(['Cost', 'Estimate £', 'Actual £', 'Paid'], [['Removals / van hire', '', '', ''], ['Packing materials', '', '', ''], ['Solicitor / conveyancing', '', '', ''], ['Stamp duty / LBTT / LTT', '', '', ''], ['Surveys', '', '', ''], ['Deposit / first month\'s rent', '', '', ''], ['Cleaning', '', '', ''], ['Storage', '', '', ''], ['Time off work', '', '', ''], ['Takeaways &amp; snacks', '', '', ''], ['New furniture &amp; essentials', '', '', ''], ['', '', '', ''], ['<b>Total</b>', '', '', '']], { widths: ['46%', '18%', '18%'], rh: 10 })}
<p class="tiny muted">Property taxes differ across the UK: Stamp Duty in England and Northern Ireland, LBTT in Scotland and LTT in Wales.</p>`, { sect: 'Money' }));
add('quotes', page(`${head('Money', 'Removals quotes', 'Get at least three quotes and compare like for like.')}
<div class="g3">${[1, 2, 3].map((n) => box(`Quote ${n}`, ['Company', 'Contact', 'Price £', 'Packing included?', 'Insurance cover', 'Date available', 'Reviews', 'Deposit'].map(field).join('') + `<div class="small" style="margin-top:2mm">Rating ${dots5()}</div>`, n === 2 ? 'cream' : '')).join('')}</div>
${box('Decision &amp; notes', lines(), 'fill sage')}`, { sect: 'Money' }));
add('declutter', page(`${head('Declutter', 'Declutter plan', 'Every item you don\'t move is one less to pack, carry and unpack.')}
${table(['Room', 'Keep', 'Sell', 'Donate', 'Bin / recycle', 'Done'], ['Kitchen', 'Living room', 'Bedroom 1', 'Bedroom 2', 'Bathroom', 'Hall &amp; cupboards', 'Loft / garage', 'Garden / shed', ''].map((r) => [r, '', '', '', '', '']), { widths: ['22%', '15%', '15%', '15%', '18%'], rh: 13 })}
${box('Things to sell (and where)', lines(), 'fill cream')}`, { sect: 'Declutter' }));
add('packing', checkPage('Packing', 'Packing', 'Packing tips &amp; supplies', '', [
  ['Supplies', ['Boxes (small for heavy, large for light)', 'Strong packing tape', 'Thick marker pens', 'Bubble wrap or newspaper', 'Coloured stickers for each room', 'Mattress bags', 'Furniture blankets']],
  ['Packing tips', ['Heavy items in small boxes', 'Label the top AND side of each box', 'Write the room and a short contents list', 'Number every box and log it', 'Pack a box per room of "open first" things', 'Take photos of cable setups before unplugging']],
  ['Pack last', ['Kettle, mugs, tea and coffee', 'Toilet roll', 'Phone chargers', 'Medication', 'Bedding for the first night']],
  ['Don\'t pack', ['Passports and important documents', 'Keys', 'Jewellery and valuables', 'Laptop', 'Bank cards']],
]));
add('boxlog', tablePage('Packing', 'Packing', 'Box log', 'Number every box. If one goes missing, you\'ll know exactly what\'s in it.', ['Box #', 'Room', 'Contents', 'Fragile', 'Arrived'], 20, ['10%', '18%', '50%', '10%']));
add('address', checkPage('Admin', 'Admin', 'Change of address checklist (UK)', 'Tick off who you\'ve told. Many can be updated online.', [
  ['Government', ['Council tax (old and new council)', 'Electoral register', 'DVLA: driving licence (the law says you must update it)', 'DVLA: vehicle log book (V5C)', 'HMRC', 'DWP / benefits', 'TV Licensing', 'Passport (if needed)']],
  ['Money', ['Bank and building society', 'Credit cards', 'Loans and finance', 'Pension providers', 'Premium Bonds / savings', 'Investments']],
  ['Home & insurance', ['Home or contents insurance', 'Car insurance', 'Pet insurance', 'Life insurance', 'Breakdown cover', 'Royal Mail redirection']],
  ['Health & work', ['GP surgery', 'Dentist', 'Opticians', 'Employer', 'School / nursery', 'Vet']],
  ['Everything else', ['Mobile phone', 'Broadband', 'Online shopping accounts', 'Subscriptions & deliveries', 'Gym and clubs', 'Friends and family']],
], { cols: 3 }));
add('utilities', page(`${head('Admin', 'Utilities &amp; meter readings', 'Take photos of every meter on moving day, at both properties.')}
<div class="g2">${box('Old home', table(['Service', 'Supplier', 'Final reading', 'Closed'], [['Electricity', '', '', ''], ['Gas', '', '', ''], ['Water', '', '', ''], ['Broadband', '', '', ''], ['TV / streaming', '', '', '']], { widths: ['24%', '28%', '28%'], rh: 10 }))}
${box('New home', table(['Service', 'Supplier', 'First reading', 'Set up'], [['Electricity', '', '', ''], ['Gas', '', '', ''], ['Water', '', '', ''], ['Broadband', '', '', ''], ['TV / streaming', '', '', '']], { widths: ['24%', '28%', '28%'], rh: 10 }), 'cream')}</div>
${box('Where things are in the new home', ['Stopcock', 'Fuse box', 'Gas meter', 'Electric meter', 'Boiler', 'Bins & collection day'].map(field).join(''), 'sage')}`, { sect: 'Admin' }));
add('day', page(`${head('Moving day', 'Moving day plan', 'Write the plan down so nobody has to hold it in their head.')}
${table(['Time', 'What happens', 'Who'], 12, { widths: ['15%', '63%'], rh: 10.4 })}
<div class="g2">${box('Leaving the old home', cbs(['Meter photos taken', 'Every cupboard and room checked', 'Windows locked, lights off', 'Keys handed over']))}${box('Arriving', cbs(['Meter photos taken', 'Check for damage', 'Beds built first', 'Kettle on!']), 'sage')}</div>`, { sect: 'Moving day' }));
add('firstnight', checkPage('Moving day', 'Moving day', 'First night box', 'One clearly labelled box (or bag) that travels with you, not in the van.', [
  ['Kitchen', ['Kettle', 'Mugs, tea, coffee, milk', 'Snacks and easy food', 'Plates and cutlery', 'Washing-up liquid and cloth', 'Bin bags']],
  ['Bedroom & bathroom', ['Bedding and pillows', 'Pyjamas and change of clothes', 'Toilet roll', 'Towels', 'Toothbrushes and toiletries', 'Medication']],
  ['Toolkit', ['Phone chargers', 'Scissors or box cutter', 'Screwdriver and Allen keys', 'Torch', 'Light bulbs', 'Extension lead']],
  ['Kids & pets', ['Favourite toys and comforters', 'Night light', 'Pet food, bowls and bedding', 'Litter tray']],
]));
add('cleaning', checkPage('New home', 'New home', 'New home cleaning checklist', 'Ideally before the boxes come in.', [
  ['Kitchen', ['Inside cupboards', 'Fridge and freezer', 'Oven and hob', 'Sink and taps', 'Worktops', 'Floors']],
  ['Bathroom', ['Toilet', 'Bath and shower', 'Sink and taps', 'Mirror', 'Cabinets', 'Floor']],
  ['Every room', ['Skirting boards', 'Light switches and handles', 'Windows and sills', 'Wardrobes inside', 'Carpets hoovered', 'Change the locks (if buying)']],
  ['Safety', ['Test smoke alarms', 'Test carbon monoxide alarm', 'Find the stopcock', 'Find the fuse box', 'Check window locks']],
]));
add('settle', page(`${head('New home', 'Settling in', 'Unpack one room at a time: bedrooms and kitchen first.')}
${table(['Room', 'Unpacked', 'Organised', 'To buy'], ['Kitchen', 'Bedroom 1', 'Bedroom 2', 'Bathroom', 'Living room', 'Hall', 'Garden'].map((r) => [r, '', '', '']), { widths: ['24%', '14%', '14%'], rh: 12 })}
<div class="g2">${box('Local things to find', ['Supermarket', 'GP surgery', 'Pharmacy', 'Takeaway', 'Park / walks', 'Recycling centre'].map(field).join(''), 'cream')}${box('Neighbours\' names', lines(46), 'sage')}</div>`, { sect: 'New home' }));
add('kidspets', cardsPage('Family', 'Family', 'Moving with kids &amp; pets', 'Change is hard for little ones and animals too. A bit of planning helps everyone settle.', [
  ['Talk early', 'Tell children what\'s happening, look at photos of the new home, and let them choose something for their new room.'], ['Keep routines', 'Keep meals and bedtimes as normal as possible in the weeks around the move.'],
  ['Unpack their room first', 'Familiar bedding, toys and night lights help kids feel safe on the first night.'], ['Pets on moving day', 'Keep pets in a quiet room with the door shut, or with a friend, so they can\'t slip out.'],
  ['Cats', 'Keep cats indoors for a few weeks in the new home so they can settle before going outside.'], ['Update microchips', 'Update your pet\'s microchip details with your new address straight away.'],
]));
add('contacts', tablePage('Admin', 'Admin', 'Useful contacts', '', ['Who', 'Name', 'Phone', 'Email / reference'], 16, ['24%', '22%', '20%']));

pages[0] = cover({ kicker: 'A calm, step-by-step moving planner', title: 'The Moving<br>House<br>Planner', lead: 'An 8-week countdown, budget, packing and box log, a UK change of address checklist, moving day plan, first night box and settling-in pages.', tags: [`${pages.length} pages`, 'UK friendly', 'Print at home'], bottom: 'Works for buying or renting, big moves or small.' });

module.exports = {
  file: 'Moving-House-Planner', short: S, title: T, pages, css: CSS2, freebie: [ids.address, ids.firstnight],
  meta: {
    short: 'The Moving<br>House Planner', kicker: 'Countdown · Checklists · UK friendly', sub: 'Every task, box and phone call for your move, in one calm planner.',
    hero: [1, ids.address], grid: [[ids.w8, '8-week countdown'], [ids.budget, 'Moving budget'], [ids.boxlog, 'Box log'], [ids.address, 'Change of address (UK)'], [ids.day, 'Moving day plan'], [ids.firstnight, 'First night box']],
    detail: ids.address, detailTitle: 'Who to tell when you move (UK)', detailPoints: ['Council tax, DVLA and electoral register', 'Banks, insurance and pensions', 'GP, dentist, school and vet', 'Royal Mail redirection'],
    features: [['Countdown', 'Week-by-week tasks from 8 weeks out'], ['Packing', 'Declutter plan, tips and a numbered box log'], ['Admin', 'UK change of address, utilities and meter readings'], ['Moving day & after', 'Day plan, first night box, cleaning and settling in']],
    pins: [['Moving house checklist UK', 'Who to tell when you move', ids.address], ['First night box checklist', 'What to pack last', ids.firstnight], ['8 weeks to moving day', 'A week-by-week moving plan', ids.w8]],
    listing: {
      price: '£4.95', title: 'Moving House Planner Printable UK, Moving Checklist, Change of Address List, Packing Box Log, Moving Day Plan, New Home Checklist, A4 PDF',
      tags: ['moving planner', 'moving checklist', 'moving house', 'new home', 'change of address', 'packing list', 'moving day', 'house move uk', 'first home', 'relocation', 'moving binder', 'house warming', 'new home gift'],
      hook: 'Every task, box and phone call for your move, in one calm planner.',
      body: ['A printable moving planner for UK households, whether you\'re buying or renting. It breaks the move into small weekly steps and keeps every detail in one place.',
        'INSIDE:\n• Moving overview and key contacts\n• 8-week countdown (8, 6, 4, 2 weeks and moving week)\n• Moving budget and removals quotes comparison\n• Declutter plan\n• Packing tips and supplies, plus a numbered box log\n• UK change of address checklist (council tax, DVLA, HMRC, banks, GP and more)\n• Utilities and meter readings\n• Moving day plan and first night box\n• New home cleaning checklist and settling in\n• Moving with kids and pets\n• Useful contacts'],
      pinCopy: [['Moving house checklist (UK): who to tell', 'Council tax, DVLA, electoral register, banks, GP, insurance and more.'], ['First night box: what to pack', 'Kettle, bedding, chargers, toilet roll... free printable.'], ['8-week moving countdown', 'Small weekly steps for a calmer move.'], ['How to label moving boxes', 'Room, contents and a number for every box.'], ['New home cleaning checklist', 'Before the boxes come in.']],
      prompts: ['A sunny empty living room with labelled cardboard moving boxes, a roll of tape and a blank printed A4 checklist on a clipboard on top of a box, warm natural light, cream and sage tones, photorealistic, 4:5'],
    },
  },
};
