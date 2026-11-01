const { page, cover, lines, cbs, blankCbs, field, table, box, dots5 } = require('../lib');
const { CSS2, head, tablePage, cardsPage, checkPage, formPage } = require('../lib2');

const T = 'The Calm Wedding Planner';
const S = 'Wedding Planner';
const pages = [];
const ids = {};
const add = (id, pg) => { if (id) ids[id] = pages.length + 1; pages.push(pg); };

add('cover', null);
add('welcome', page(`<div class="kicker">Start here</div><h1>Plan the day you want, calmly</h1>
<p class="lead">A wedding has hundreds of moving parts. This planner keeps them all in one place, breaks the planning into manageable stages, and helps you focus on what matters most to you both.</p>
<div class="g2">${box('Inside', cbs(['Our wedding on one page and priorities', 'Budget planner and payment tracker', 'Guest list (100 guests) and RSVP tracker', 'Countdown checklists, 12+ months to the day', 'Venue comparison and supplier pages', 'Ceremony, reception and day timeline', 'Seating plan, menu and wedding party', 'Gifts, thank-yous and honeymoon']))}
${box('Good to know (UK)', '<p class="small">You must give notice of marriage or civil partnership before the wedding. In England and Wales, notice must be given at least 29 days before. In Scotland, marriage notices must reach the registrar at least 29 days before (they recommend 10–12 weeks). Rules differ in Northern Ireland. Check GOV.UK or your local registrar early.</p>', 'sage')}</div>`, { sect: 'Welcome', deco: 'tr' }));
add('onepage', formPage(S, 'The basics', 'Our wedding on one page', '', [
  ['The couple', ['Names', 'Engaged on', 'Wedding date', 'Number of guests']], ['The day', ['Ceremony venue', 'Reception venue', 'Theme / style', 'Colours']],
  ['Legal', ['Register office / officiant', 'Notice given on', 'Documents needed', 'Ceremony booked']], ['Key people', ['Wedding planner / coordinator', 'Best person / maid of honour', 'Celebrant / registrar', 'Venue coordinator']],
]));
add('priorities', page(`${head('The basics', 'Our priorities', 'Each choose your top three. Spend more time and money on these, and keep everything else simple.')}
<div class="g2">${box('Partner 1: top three', `<div class="cb line">1.</div><div class="cb line">2.</div><div class="cb line">3.</div>`, 'clay')}${box('Partner 2: top three', `<div class="cb line">1.</div><div class="cb line">2.</div><div class="cb line">3.</div>`, 'sage')}</div>
${box('Rate how important each is to us', table(['', 'Not fussed', 'Nice to have', 'Really matters'], ['Venue', 'Food &amp; drink', 'Photography', 'Dress / outfits', 'Flowers', 'Music &amp; band', 'Guest numbers', 'Honeymoon', 'Decor'].map((x) => [x, '', '', '']), { widths: ['34%'], rh: 9 }))}
${box('Words to describe our day', lines(), 'fill cream')}`, { sect: 'The basics' }));
add('budget', page(`${head('Budget', 'Budget planner', 'Agree the total first, then divide it up.')}
${box('', `<div class="row">${field('Total budget £')}${field('Contributions from')}</div>`, 'cream')}
${table(['Category', 'Budget £', 'Actual £', 'Difference'], ['Venue hire', 'Ceremony / registrar fees', 'Food &amp; drink', 'Wedding cake', 'Photography &amp; video', 'Outfits &amp; accessories', 'Hair &amp; make-up', 'Flowers', 'Decor &amp; hire', 'Music &amp; entertainment', 'Stationery', 'Rings', 'Transport', 'Favours &amp; gifts', 'Honeymoon', 'Contingency (around 10%)', '<b>Total</b>'].map((x) => [x, '', '', '']), { widths: ['44%', '18%', '18%'], rh: 8.6 })}`, { sect: 'Budget' }));
add('payments', tablePage('Budget', 'Budget', 'Payment tracker', 'Deposits and final payments, so nothing is missed.', ['Supplier', 'Total £', 'Deposit £', 'Paid on', 'Balance £', 'Due by', 'Paid'], 16, ['22%', '12%', '12%', '12%', '12%', '12%']));
const guestPage = (n) => page(`${head('Guests', `Guest list (${n} of 4)`, '')}
${table(['#', 'Name(s)', 'Invite sent', 'RSVP', 'Day / evening', 'Dietary needs'], Array.from({ length: 25 }, (_, i) => [(n - 1) * 25 + i + 1, '', '', '', '', '']), { widths: ['6%', '36%', '12%', '10%', '14%'], rh: 8.2 })}`, { sect: 'Guests', cls: 'nofill' });
add('guests', guestPage(1)); add(null, guestPage(2)); add(null, guestPage(3)); add(null, guestPage(4));
add('rsvp', page(`${head('Guests', 'RSVP summary', '')}
<div class="g3">${['Invited', 'Coming', 'Not coming'].map((x) => box(x, `<div class="row small">${field('Day')}${field('Evening')}</div>`, 'cream')).join('')}</div>
${box('Dietary requirements', table(['Name', 'Requirement'], 8, { widths: ['36%'], rh: 8.4 }))}
${box('Still to reply', blankCbs(8))}`, { sect: 'Guests' }));
const stage = (id, title, lead, tasks) => add(id, page(`${head('Countdown', title, lead)}
${box('', cbs(tasks, 'line') + blankCbs(3))}
${box('Notes', lines(), 'fill sage')}`, { sect: 'Countdown' }));
stage('c12', '12+ months to go', 'The big decisions.', ['Agree budget and guest numbers', 'Choose a date (or a few options)', 'Book ceremony and reception venues', 'Check legal requirements and book registrar or celebrant', 'Book photographer', 'Start a wedding email account and folder', 'Choose your wedding party', 'Consider wedding insurance']);
stage(null, '9–12 months to go', 'Book the key suppliers.', ['Book caterer (if not with the venue)', 'Book band / DJ', 'Start looking for dresses and outfits', 'Book florist', 'Send save the dates', 'Research honeymoon']);
stage(null, '6–9 months to go', 'Details start coming together.', ['Order wedding outfits', 'Book hair and make-up trial', 'Order invitations', 'Book transport', 'Plan the ceremony content and readings', 'Book honeymoon', 'Set up a gift list']);
stage(null, '3–6 months to go', 'Invites out and final choices.', ['Send invitations (around 3 months before)', 'Menu tasting and choices', 'Order the cake', 'Buy rings', 'Plan hen and stag dos', 'Outfit fittings begin', 'Check passports for honeymoon']);
stage(null, '1–3 months to go', 'Confirm, chase and finalise.', ['Give notice of marriage (at least 29 days before; earlier if you can)', 'Chase RSVPs', 'Final numbers to venue and caterer', 'Seating plan', 'Write vows or speeches', 'Confirm every supplier', 'Final dress fitting']);
stage(null, 'The final month &amp; week', 'Final details and lots of rest.', ['Final payments due', 'Send the day timeline to suppliers and wedding party', 'Pack for the wedding day and honeymoon', 'Collect outfits', 'Prepare cash and tips', 'Get an early night!']);
add('venues', page(`${head('Suppliers', 'Venue comparison', '')}
<div class="g3">${[1, 2, 3].map((n) => box(`Venue ${n}`, ['Name', 'Contact', 'Capacity', 'Price £', 'Dates free', 'Ceremony licence?', 'Catering', 'Accommodation', 'Parking', 'Finish time'].map(field).join('') + `<div class="small" style="margin-top:2mm">Love it? ${dots5()}</div>`, n === 2 ? 'cream' : '')).join('')}</div>
${box('Questions to ask', lines(), 'fill sage')}`, { sect: 'Suppliers' }));
add('suppliers', page(`${head('Suppliers', 'Supplier contacts', '')}
${table(['Supplier', 'Company', 'Contact', 'Phone / email', 'Booked'], ['Venue', 'Registrar / celebrant', 'Caterer', 'Photographer', 'Videographer', 'Florist', 'Cake', 'Hair &amp; make-up', 'Band / DJ', 'Transport', 'Stationery', 'Decor hire', 'Wedding outfits', 'Accommodation'].map((x) => [x, '', '', '', '']), { widths: ['20%', '22%', '18%', '28%'], rh: 10.6 })}`, { sect: 'Suppliers' }));
add('ceremony', page(`${head('The day', 'Ceremony plan', '')}
<div class="g2">${box('Order of ceremony', table(['', 'What'], ['Arrival music', 'Entrance', 'Welcome', 'Reading 1', 'Vows', 'Rings', 'Reading 2', 'Signing', 'Exit music'].map((x) => [x, '']), { widths: ['34%'], rh: 9 }))}
<div class="col">${box('Readings &amp; readers', lines(40), 'cream')}${box('Music choices', lines(40), 'sage')}</div></div>
${box('Vow notes', lines(), 'fill')}`, { sect: 'The day' }));
add('timeline', page(`${head('The day', 'Wedding day timeline', 'Share it with your suppliers and wedding party.')}
${table(['Time', 'What happens', 'Where', 'Who'], [['', 'Hair &amp; make-up', '', ''], ['', 'Photographer arrives', '', ''], ['', 'Guests arrive', '', ''], ['', 'Ceremony', '', ''], ['', 'Drinks &amp; photos', '', ''], ['', 'Wedding breakfast', '', ''], ['', 'Speeches', '', ''], ['', 'Cake cutting', '', ''], ['', 'Evening guests', '', ''], ['', 'First dance', '', ''], ['', 'Evening food', '', ''], ['', 'Last song', '', ''], ['', '', '', ''], ['', '', '', '']], { widths: ['14%', '44%', '20%'], rh: 11.4 })}`, { sect: 'The day' }));
add('seating', page(`${head('The day', 'Seating plan', 'Sketch your tables. Circles for round tables, rectangles for long ones.')}
<div class="box fill" style="background-image:radial-gradient(circle,#C9C1B4 .6pt,transparent .7pt);background-size:6mm 6mm;background-color:#fff"></div>
${box('Top table', lines(16), 'cream')}`, { sect: 'The day', cls: 'nofill' }));
add('menu', formPage('The day', 'The day', 'Menu &amp; drinks', '', [
  ['Wedding breakfast', ['Starter', 'Main', 'Vegetarian / vegan option', 'Dessert']], ['Drinks', ['Arrival drinks', 'With the meal', 'Toast', 'Bar / tab']],
  ['Evening food', ['Food', 'Time served', 'Quantity']], ['Cake', ['Baker', 'Flavours', 'Tiers', 'Delivery time']],
]));
add('party', tablePage('People', 'People', 'Wedding party', 'Roles, outfits and contact details.', ['Name', 'Role', 'Outfit / size', 'Phone', 'Notes'], 12, ['22%', '18%', '20%', '18%']));
add('hen', formPage('People', 'People', 'Hen &amp; stag', '', [
  ['Hen do', ['Organiser', 'Date', 'Where', 'Budget per person', 'Guests']], ['Stag do', ['Organiser', 'Date', 'Where', 'Budget per person', 'Guests']],
  ['Things we\'d love', lines(36)], ['Please don\'t!', lines(36)],
]));
add('emergency', checkPage('The day', 'The day', 'Wedding day emergency kit', 'Give it to a trusted friend to look after.', [
  ['Fixes', ['Safety pins', 'Sewing kit', 'Fashion tape', 'Stain remover pen', 'Clear nail varnish (for ladders)', 'Spare tights / socks']],
  ['Comfort', ['Painkillers', 'Plasters (lots!)', 'Flat shoes', 'Tissues', 'Snacks', 'Water']],
  ['Beauty', ['Lipstick / lip balm', 'Powder', 'Hairpins and hairspray', 'Deodorant', 'Mints', 'Mirror']],
  ['Practical', ['Phone charger', 'Cash and tips in envelopes', 'Supplier phone numbers', 'Day timeline printout', 'Umbrella', 'Pen']],
]));
add('gifts', tablePage('After', 'After the wedding', 'Gifts &amp; thank-yous', '', ['From', 'Gift', 'Thank-you sent'], 20, ['32%', '46%']));
add('honeymoon', formPage('After', 'After the wedding', 'Honeymoon', '', [
  ['Trip', ['Destination', 'Dates', 'Flights / travel', 'Accommodation', 'Budget £']], ['Before we go', cbs(['Passports valid (and names match bookings)', 'Travel insurance', 'Currency', 'Pet / house sitter', 'Out-of-office set'])],
  ['Things to do', lines(46)], ['Packing', lines(46)],
]));
add('memories', page(`${head('After', 'Memories of our day', 'Write it down in the first week, while it\'s fresh.')}
<div class="g2">${['Best moment', 'Funniest moment', 'What we\'ll never forget', 'Favourite song of the night'].map((x, i) => box(x, lines(28), i % 3 === 0 ? 'cream' : '')).join('')}</div>
${box('A note to each other', lines(), 'fill sage')}`, { sect: 'After' }));

pages[0] = cover({ kicker: 'A calm, complete wedding planner', title: 'The Calm<br>Wedding<br>Planner', lead: 'Budget, 100-guest list, countdown checklists, venues and suppliers, ceremony and day timeline, seating plan, gifts and honeymoon.', tags: [`${pages.length} pages`, 'Undated', 'UK friendly'], bottom: 'Plan the day that matters to you both.' });

module.exports = {
  file: 'Calm-Wedding-Planner', short: S, title: T, pages, css: CSS2, freebie: [ids.c12, ids.emergency],
  meta: {
    short: 'The Calm<br>Wedding Planner', kicker: 'Undated · UK friendly · Print at home', sub: 'Every detail of your wedding, in one calm, organised place.',
    hero: [1, ids.budget], grid: [[ids.priorities, 'Our priorities'], [ids.budget, 'Budget planner'], [ids.guests, '100-guest list'], [ids.c12, 'Countdown checklists'], [ids.timeline, 'Day timeline'], [ids.seating, 'Seating plan']],
    detail: ids.budget, detailTitle: 'A wedding budget that stays on track', detailPoints: ['Every category, budget vs actual', 'Payment tracker for deposits', 'Contingency built in', 'Priorities first'],
    features: [['Plan', 'Priorities, budget, payments and countdown'], ['Guests', '100-guest list, RSVPs and dietary needs'], ['Suppliers', 'Venue comparison and supplier contacts'], ['The day', 'Ceremony, timeline, seating, menu and emergency kit']],
    pins: [['Wedding planning checklist', '12 months to the big day', ids.c12], ['Wedding budget planner', 'Free printable budget page', ids.budget], ['Wedding day emergency kit', 'Everything to pack', ids.emergency]],
    listing: {
      price: '£7.95', title: 'Wedding Planner Printable, Wedding Planning Checklist, Wedding Budget, Guest List, RSVP Tracker, Seating Plan, Wedding Binder UK PDF',
      tags: ['wedding planner', 'wedding checklist', 'wedding budget', 'guest list', 'wedding binder', 'bride to be', 'engagement gift', 'wedding printable', 'seating plan', 'rsvp tracker', 'wedding timeline', 'wedding planning', 'uk wedding'],
      hook: 'Every detail of your wedding, in one calm, organised place.',
      body: ['A complete printable wedding planner, designed to keep the planning calm and focused on what matters to you both. UK friendly, with notes on giving notice of marriage.',
        'INSIDE:\n• Our wedding on one page and our priorities\n• Budget planner and payment tracker\n• Guest list for 100 guests and RSVP summary\n• Countdown checklists: 12+ months, 9–12, 6–9, 3–6, 1–3 months and the final month\n• Venue comparison and supplier contacts\n• Ceremony plan and wedding day timeline\n• Seating plan, menu and drinks\n• Wedding party and hen and stag pages\n• Wedding day emergency kit\n• Gifts and thank-yous, honeymoon and memories'],
      pinCopy: [['Wedding planning checklist: 12 months to go', 'What to book and when, stage by stage. Free printable.'], ['Wedding budget planner printable', 'Every category, budget vs actual, plus a payment tracker.'], ['Wedding day emergency kit checklist', 'Safety pins, plasters, snacks and more.'], ['Wedding guest list and RSVP tracker', 'Room for 100 guests, day and evening.'], ['Wedding day timeline template', 'Share it with your suppliers and wedding party.']],
      prompts: ['An elegant flat lay of a blank printed A4 planner page with two gold wedding rings, a sprig of eucalyptus, a fountain pen and a linen ribbon, soft natural light, warm cream and sage palette, photorealistic, 4:5'],
    },
  },
};
