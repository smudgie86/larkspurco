const { page, cover, lines, cbs, blankCbs, field, table, box, dots5 } = require('../lib');
const { CSS2, head, tablePage, checkPage, formPage } = require('../lib2');

const T = 'The Craft Fair & Market Stall Planner';
const S = 'Craft Fair Planner';
const pages = [];
const ids = {};
const add = (id, pg) => { if (id) ids[id] = pages.length + 1; pages.push(pg); };

add('cover', null);
add('welcome', page(`<div class="kicker">Start here</div><h1>Market day, sorted</h1>
<p class="lead">From finding events to packing the car, setting up your table, counting sales and reviewing how it went. Print the event pages for each fair, and keep the rest in a folder.</p>
<div class="g2">${box('Inside', cbs(['Event finder and application tracker', 'Event planner (one per fair)', 'The big packing checklist', 'Table layout planner', 'Stock list, sales tally and cash float log', 'Customer email sign-up sheet', 'Printable stall signs', 'Post-event review and yearly summary']))}
${box('Top tips', cbs(['Do a practice table setup at home', 'Bring more change than you think', 'Price everything clearly', 'Have height on your table', 'Bring snacks, water and layers', 'Collect emails for next time']), 'sage')}</div>`, { sect: 'Welcome', deco: 'tr' }));
add('finder', tablePage('Finding events', 'Finding events', 'Event finder &amp; applications', 'Keep track of fairs you\'d like to do, deadlines and fees.', ['Event', 'Date', 'Location', 'Fee £', 'Apply by', 'Applied', 'Accepted'], 16, ['24%', '12%', '18%', '9%', '12%', '10%']));
add('event', page(`${head('Each event', 'Event planner', 'Print one for each fair.')}
<div class="g2">${box('The event', field('Name') + field('Date') + field('Times (setup / open / close)') + field('Address') + field('Organiser & phone') + field('Parking & unloading'))}
${box('My pitch', field('Pitch number / size') + field('Indoor / outdoor') + field('Table provided?') + field('Power available?') + field('Fee paid £') + field('Insurance needed?'), 'cream')}</div>
<div class="g2">${box('Expected visitors &amp; theme', lines(22))}${box('Sales goal', field('Items') + field('Takings £') + field('Email sign-ups'), 'sage')}</div>
${box('Products to bring &amp; make', blankCbs(6))}
${box('Notes', lines(), 'fill')}`, { sect: 'Each event' }));
add('packing', checkPage('Each event', 'Each event', 'The big packing checklist', 'Tick everything off the night before. Keep a "market box" packed between fairs.', [
  ['Display', ['Table (if not provided)', 'Tablecloth (to the floor)', 'Risers, crates or shelves for height', 'Banner or sign with your name', 'Price signs and labels', 'Mirror (for jewellery or clothes)', 'Lights (indoor / winter)', 'Gazebo and weights (outdoor)']],
  ['Selling', ['Card reader, charged', 'Phone, charged, plus power bank', 'Cash float in small change', 'Cash box or bum bag', 'Receipt book', 'Bags and wrapping', 'Business cards / flyers', 'Email sign-up sheet and pen']],
  ['Stock', ['Stock list', 'All stock, packed and labelled', 'Spare stock under the table', 'Order forms for custom orders']],
  ['Toolkit', ['Tape, scissors, string', 'Clips, pegs and bulldog clips', 'Cable ties', 'Pens and markers', 'Bin bags', 'Wet wipes and tissues']],
  ['You', ['Water and snacks', 'Lunch', 'Warm layers / sun cream', 'Comfy shoes', 'Folding chair', 'Hand warmers or a fan']],
  ['Paperwork', ['Event confirmation', 'Public liability insurance', 'Organiser\'s phone number', 'Parking ticket / permit']],
], { cols: 3 }));
add('layout', page(`${head('Each event', 'Table layout planner', 'Sketch your table from above. Best sellers at the front, something eye-catching at eye height.')}
<div class="row" style="flex:none">${field('Table size')}${field('Event')}</div>
<div class="box fill" style="background-image:linear-gradient(var(--line) .5pt,transparent .5pt),linear-gradient(90deg,var(--line) .5pt,transparent .5pt);background-size:7mm 7mm;background-color:#fff"><div class="label" style="background:#fff;align-self:flex-start;padding-right:2mm">Back of stall</div><div class="spacer"></div><div class="label" style="background:#fff;align-self:flex-start;padding-right:2mm">Front (customers here)</div></div>
${box('What worked / what to change', lines(22), 'cream')}`, { sect: 'Each event', cls: 'nofill' }));
add('stock', page(`${head('Each event', 'Stock list', 'Count stock out and back in, and you\'ll know exactly what sold.')}<div class="row" style="flex:none">${field('Event')}${field('Date')}</div>
<div class="tbl-fill">${table(['Product', 'Price £', 'Brought', 'Left', 'Sold', 'Total £'], 18, { widths: ['36%', '12%', '13%', '13%', '13%'], rh: 9.4 })}</div>`, { sect: 'Each event' }));
add('tally', page(`${head('Each event', 'Sales tally sheet', 'A quick mark for every sale, no maths on the day.')}<div class="row" style="flex:none">${field('Event')}${field('Date')}</div>
<div class="tbl-fill">${table(['Product', 'Price £', 'Tally', 'Cash / card'], 16, { widths: ['28%', '12%', '44%'], rh: 11 })}</div>`, { sect: 'Each event' }));
add('float', page(`${head('Each event', 'Cash float &amp; takings', '')}<div class="row" style="flex:none">${field('Event')}${field('Date')}</div>
<div class="g2">${box('Float at start', table(['Coins / notes', 'Amount £'], [['£20 notes', ''], ['£10 notes', ''], ['£5 notes', ''], ['£2 coins', ''], ['£1 coins', ''], ['50p', ''], ['20p &amp; smaller', ''], ['<b>Total float</b>', '']], { widths: ['60%'], rh: 8.4 }), 'cream')}
${box('End of day', field('Cash in box £') + field('minus float £') + field('= Cash sales £') + field('Card sales £') + `<div class="field" style="font-size:11pt;color:var(--sage-deep);font-weight:600"><span>Total takings £</span><i></i></div>`, 'sage')}</div>
<div class="g2">${box('Costs for this event', table(['Cost', '£'], [['Pitch fee', ''], ['Travel / parking', ''], ['Food', ''], ['Other', ''], ['<b>Total</b>', '']], { widths: ['60%'], rh: 8.4 }))}${box('Profit', field('Takings £') + field('minus costs £') + `<div class="field" style="font-size:11pt;color:var(--sage-deep);font-weight:600"><span>= Profit £</span><i></i></div>`, 'clay')}</div>`, { sect: 'Each event' }));
add('signup', page(`<div style="text-align:center;margin-top:4mm"><div class="kicker">Stay in touch</div><h1>Join the mailing list</h1><p class="lead" style="margin:2mm auto 0">Be the first to hear about new products, offers and where I'll be next.</p></div>
${table(['Name', 'Email', 'Happy to receive emails? ✓'], 16, { widths: ['32%', '46%'], rh: 11 })}
<p class="tiny muted center">Your details will only be used to send you news from this business. You can unsubscribe at any time.</p>`, { sect: 'Sign-up sheet', cls: 'nofill' }));
const sign = (big, small, bg) => `<div style="flex:1;border:1.4pt solid var(--line);border-radius:5mm;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:${bg};padding:6mm"><div style="font-size:32pt;font-weight:700;color:var(--sage-deep);line-height:1.1">${big}</div><div style="font-size:13pt;margin-top:3mm;color:var(--ink)">${small}</div></div>`;
add('signs', page(`<div style="display:flex;flex-direction:column;gap:6mm;flex:1">${sign('Card payments welcome', 'Contactless, chip &amp; pin and phone payments', 'var(--sage-light)')}${sign('Back in 5 minutes', 'Grabbing a cuppa! Please have a browse', 'var(--clay-light)')}</div>`, { sect: 'Stall signs', cls: 'nofill' }));
add('signs2', page(`<div style="display:flex;flex-direction:column;gap:6mm;flex:1">${sign('Everything £_____', 'or ______ for £______', 'var(--cream)')}${sign('Handmade with love', 'Custom orders welcome. Just ask!', 'var(--sage-light)')}</div>`, { sect: 'Stall signs', cls: 'nofill' }));
add('review', page(`${head('After the event', 'Post-event review', 'Fill this in the same evening, while it\'s fresh.')}<div class="row" style="flex:none">${field('Event')}${field('Date')}</div>
<div class="g3">${box('Takings £', '<div style="font-size:15pt;color:var(--sage-deep);font-weight:600;margin-top:1mm">£</div>', 'cream')}${box('Profit £', '<div style="font-size:15pt;color:var(--sage-deep);font-weight:600;margin-top:1mm">£</div>', 'cream')}${box('Would I go again?', '<div class="small" style="margin-top:1.4mm">Yes ○ &nbsp; Maybe ○ &nbsp; No ○</div>', 'cream')}</div>
<div class="g2">${box('Best sellers', lines(30), 'clay')}${box('What people asked for', lines(30))}${box('Busy times', lines(30))}${box('Neighbours &amp; contacts made', lines(30), 'sage')}</div>
${box('Next time I will', lines(), 'fill')}`, { sect: 'After the event' }));
add('summary', page(`${head('The year', 'Yearly events summary', 'Compare events side by side to decide which to book again.')}
${table(['Event', 'Date', 'Fee £', 'Takings £', 'Profit £', 'Rating', 'Again?'], 16, { widths: ['28%', '12%', '10%', '13%', '12%', '12%'], rh: 11 })}`, { sect: 'The year' }));

pages[0] = cover({ kicker: 'For makers, crafters & market traders', title: 'The Craft Fair<br>&amp; Market Stall<br>Planner', lead: 'Find events, plan each fair, pack everything, lay out your table, count stock and sales, and review what worked, with printable stall signs.', tags: [`${pages.length} pages`, 'Print at home', 'Reusable'], bottom: 'Print the event pages fresh for every fair.' });

module.exports = {
  file: 'Craft-Fair-Market-Stall-Planner', short: S, title: T, pages, css: CSS2, freebie: [ids.packing, ids.signs],
  meta: {
    short: 'Craft Fair &amp;<br>Market Planner', kicker: 'Plan · Pack · Sell · Review', sub: 'Everything for market day, from finding fairs to counting the takings.',
    hero: [1, ids.packing], grid: [[ids.event, 'Event planner'], [ids.packing, 'Big packing checklist'], [ids.layout, 'Table layout planner'], [ids.tally, 'Sales tally sheet'], [ids.float, 'Cash float & takings'], [ids.signs, 'Printable stall signs']],
    detail: ids.packing, detailTitle: 'Never forget the card reader again', detailPoints: ['Display, selling and stock', 'Toolkit and paperwork', 'Comfort kit for long days', 'Keep a market box packed'],
    features: [['Plan each fair', 'Event finder, application tracker and event planner'], ['Pack & set up', 'Big packing checklist and table layout grid'], ['Sell & count', 'Stock list, sales tally, float and takings'], ['Grow', 'Email sign-up sheet, stall signs and reviews']],
    pins: [['Craft fair packing checklist', 'Everything to bring to market day', ids.packing], ['Craft fair table layout ideas', 'Plan your stall from above', ids.layout], ['Free printable stall signs', 'Card payments and back in 5 minutes', ids.signs]],
    listing: {
      price: '£4.95', title: 'Craft Fair Planner Printable, Market Stall Checklist, Craft Show Packing List, Sales Tally Sheet, Stall Signs, Vendor Planner, A4 & Letter',
      tags: ['craft fair', 'craft show planner', 'market stall', 'vendor checklist', 'craft fair checklist', 'handmade business', 'small business', 'sales tracker', 'craft business', 'vendor planner', 'stall signs', 'maker planner', 'christmas market'],
      hook: 'Everything for market day, from finding fairs to counting the takings.',
      body: ['A printable planner for makers who sell at craft fairs, Christmas markets and pop-ups. Print the event pages fresh for each fair and keep the rest in your market box.',
        'INSIDE:\n• Event finder and application tracker\n• Event planner (one per fair)\n• The big packing checklist (display, selling, stock, toolkit, you, paperwork)\n• Table layout planner (grid)\n• Stock list and sales tally sheet\n• Cash float and takings calculator\n• Customer email sign-up sheet\n• 4 printable stall signs\n• Post-event review and yearly summary'],
      pinCopy: [['Craft fair packing checklist printable', 'Card reader, float, risers, snacks: everything for market day.'], ['How to lay out your craft fair table', 'A grid planner for your stall. Best sellers at the front!'], ['Free printable craft fair signs', 'Card payments welcome, back in 5 minutes, and more.'], ['Craft fair sales tally sheet', 'No maths on the day. Just a mark for every sale.'], ['Was that craft fair worth it?', 'A post-event review and takings calculator.']],
      prompts: ['A charming handmade craft stall at an indoor Christmas market with wooden crates as risers, fairy lights and kraft-paper price tags, a blank printed checklist on a clipboard on the corner of the table, warm cosy light, photorealistic, 4:5'],
    },
  },
};
