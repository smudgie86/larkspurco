const { page, cover, lines, cbs, blankCbs, field, table, box, dots5 } = require('../lib');
const { CSS2, head, tablePage, checkPage, formPage, undatedMonth } = require('../lib2');

const T = 'The Pet Sitter & Dog Walker Business Kit';
const S = 'Pet Business Kit';
const pages = [];
const ids = {};
const add = (id, pg) => { if (id) ids[id] = pages.length + 1; pages.push(pg); };

add('cover', null);
add('welcome', page(`<div class="kicker">Start here</div><h1>Run your pet business with less admin</h1>
<p class="lead">Every form, log and planner a small dog walking or pet sitting business needs, ready to print. Use them as they are, or as a starting point for your own.</p>
<div class="g2">${box('Inside', cbs(['Business setup checklist', 'Services and pricing planner', 'Client and pet information forms', 'Vet and emergency consent template', 'Meet and greet checklist', 'Booking calendar and weekly walk schedule', 'Visit report cards for owners', 'Key log, payments, invoices and mileage', 'Marketing plan and reviews tracker']))}
${box('Good to know', `<p class="small">The forms here are templates to help you get organised. They aren't legal advice. Check your terms, consent forms and insurance with your insurer or a professional adviser, and follow any rules from your local council.</p>`, 'sage')}</div>`, { sect: 'Welcome', deco: 'tr' }));
add('setup', checkPage(S, 'Getting set up', 'Business setup checklist', 'The essentials before you take your first booking.', [
  ['Legal &amp; safety', ['Specialist pet business insurance (public liability and care, custody &amp; control)', 'Register as self-employed with HMRC (or set up a company)', 'Check with your council if you need a licence (required for home boarding and day care in England and Scotland)', 'Basic DBS check (clients often ask)', 'Pet first aid course', 'Written terms and conditions']],
  ['Kit', ['Leads, poo bags and a spare harness', 'Pet first aid kit', 'Towels and water bowl', 'Treat pouch', 'Key safe or secure key storage', 'Phone charger and power bank']],
  ['Admin', ['Business bank account', 'Booking system or diary', 'Client forms (in this kit)', 'Invoice template', 'Record keeping for tax']],
  ['Marketing', ['Business name and logo', 'Google Business Profile', 'Social media page', 'Flyers or business cards', 'Reviews from first clients']],
]));
add('pricing', page(`${head('Getting set up', 'Services &amp; pricing planner', 'Work out what to charge by looking at local prices and your real costs, then fill in your price list.')}
<div class="g2">${box('Local competitors', table(['Business', 'Service', 'Price'], 6, { widths: ['42%', '34%'], rh: 8 }))}
${box('My costs per month', table(['Cost', '£'], [['Insurance', ''], ['Fuel / travel', ''], ['Kit &amp; treats', ''], ['Phone &amp; software', ''], ['Marketing', ''], ['<b>Total</b>', '']], { widths: ['70%'], rh: 8 }))}</div>
${box('My price list', table(['Service', 'Length', 'Price', 'Extra dog / notes'], [['Solo walk', '', '', ''], ['Group walk', '', '', ''], ['Puppy visit', '', '', ''], ['Cat / small pet visit', '', '', ''], ['Overnight sitting', '', '', ''], ['Weekend / bank holiday', '', '', ''], ['', '', '', '']], { widths: ['32%', '16%', '14%'], rh: 9 }), 'cream')}
${box('Weekly income goal', `<div class="row">${field('Walks per week')}${field('× price')}${field('= £ per week')}</div>`, 'sage')}`, { sect: S }));
add('client', formPage('Client forms', 'Client forms', 'New client form', 'Owner and home details. Keep a copy for each client, stored securely.', [
  ['Owner', ['Name', 'Address', 'Postcode', 'Mobile', 'Email', 'Second contact']],
  ['Home access', ['Key / code arrangement', 'Alarm instructions', 'Parking', 'Where things are kept', 'Areas off limits']],
  ['Services booked', ['Service', 'Days & times', 'Start date', 'Price agreed']],
  ['Emergency', ['Emergency contact', 'Phone', 'Relationship', 'Can they collect the pet?']],
]));
add('petform', formPage('Client forms', 'Client forms', 'Pet information form', 'One form per pet.', [
  ['Pet', ['Name', 'Species & breed', 'Age', 'Sex & neutered', 'Microchip', 'Colour & markings']],
  ['Health', ['Vet practice', 'Vet phone', 'Medical conditions', 'Medication & times', 'Allergies', 'Insurance & policy no.']],
  ['Behaviour', ['With other dogs', 'With people & children', 'Recall', 'On lead (pulls?)', 'Fears & triggers', 'Off lead allowed?']],
  ['Routine', ['Food & amount', 'Feeding times', 'Treats allowed', 'Toilet habits', 'Favourite games', 'Anything else']],
]));
add('consent', page(`${head('Client forms', 'Vet &amp; emergency consent (template)', 'Adapt this wording with your insurer or a professional adviser before using it.')}
${box('', `<p class="small">I, the owner named below, authorise <b>__________________________</b> (the pet care provider) to seek veterinary treatment for my pet(s) if they become ill or injured while in their care, and I am unable to be contacted.</p>
<p class="small" style="margin-top:2mm">I understand the provider will try to contact me and my emergency contact first, will use my usual vet where possible, and that I am responsible for all veterinary costs.</p>`, 'cream')}
<div class="g2">${box('Pet(s)', field('Name') + field('Name') + field('Microchip'))}${box('Vet', field('Usual vet') + field('Phone') + field('Spending limit without contact £'))}</div>
${box('Owner', `<div class="row">${field('Name')}${field('Date')}</div><div class="row">${field('Signature')}</div>`)}
${box('Provider', `<div class="row">${field('Name')}${field('Date')}</div><div class="row">${field('Signature')}</div>`)}`, { sect: 'Client forms' }));
add('meet', checkPage('Client forms', 'Client forms', 'Meet &amp; greet checklist', 'Use it at the first visit so nothing is missed.', [
  ['Get to know the pet', ['Meet the pet with the owner present', 'Watch how they behave on the lead', 'Check harness and collar fit', 'Ask about recall and off-lead rules', 'Ask about triggers and fears']],
  ['The home', ['Key handover or key safe tested', 'Alarm instructions tried', 'Where the lead, food and towels are kept', 'Where to leave muddy paws', 'Rooms that are out of bounds']],
  ['Paperwork', ['Client form completed', 'Pet form completed', 'Vet consent signed', 'Terms agreed', 'Payment method agreed']],
  ['Notes', ['', '', '', '']],
]));
add('calendar', page(`${head('Bookings', 'Booking calendar', 'Print one for each month.')}
<div class="row" style="flex:none">${field('Month')}${field('Year')}</div>
<div class="grow">${undatedMonth('mon', 28)}</div>
${box('Holidays &amp; time off', lines(16), 'cream')}`, { sect: 'Bookings', cls: 'nofill' }));
add('week', page(`${head('Bookings', 'Weekly walk schedule', '')}<div class="row" style="flex:none">${field('Week starting')}</div>
${table(['Time', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'].map((t) => [t, '', '', '', '', '', '', '']), { widths: ['9%'], rh: 13.4 })}`, { sect: 'Bookings' }));
const card = () => `<div class="box" style="flex:1"><div style="display:flex;justify-content:space-between;align-items:center"><span class="kicker">Visit report</span><span class="tiny muted">${'_'.repeat(26)}</span></div>
<div class="row" style="margin-top:1mm">${field('Pet')}${field('Date')}${field('Time')}</div>
<div class="row small" style="margin-top:1mm;flex-wrap:wrap;gap:2mm 6mm">${['Walk', 'Wee', 'Poo', 'Fed', 'Water refreshed', 'Medication', 'Play', 'Tidy'].map((x) => `<span class="cb" style="flex:none">${x}</span>`).join('')}</div>
<div class="row small">${field('Walked for')}${field('Where')}</div>
<div class="label sage" style="margin-top:1.4mm">How they got on</div>${lines()}
<div class="small" style="margin-top:1mm">Mood ${dots5()} <span style="margin-left:6mm">See you next time! 🐾</span></div></div>`;
add('report', page(`${card()}${card()}`, { sect: 'Visit reports', cls: 'nofill' }));
add('keys', tablePage('Admin', 'Admin', 'Key log', 'Keep this secure. Use a code, not the client\'s address, on key tags.', ['Key code', 'Client', 'Date received', 'Date returned', 'Signed'], 16, ['16%', '28%', '16%', '16%']));
add('clients', tablePage('Admin', 'Admin', 'Client list', '', ['Client', 'Pet(s)', 'Phone', 'Service', 'Start date'], 16, ['22%', '22%', '18%', '20%']));
add('payments', tablePage('Money', 'Money', 'Payments log', '', ['Date', 'Client', 'Service', 'Amount £', 'Paid by', 'Invoice no.'], 18, ['12%', '22%', '22%', '12%', '14%']));
add('invoice', page(`<div class="row" style="flex:none;align-items:flex-start"><div><div class="kicker">Invoice</div><h1>Invoice</h1></div><div style="flex:none;width:70mm">${field('Invoice no.')}${field('Date')}${field('Due by')}</div></div>
<div class="g2">${box('From', field('Business name') + field('Address') + field('Phone / email'))}${box('To', field('Client') + field('Address') + field('Pet(s)'))}</div>
${box('', table(['Date', 'Service', 'Qty', 'Price £', 'Total £'], 10, { widths: ['16%', '42%', '10%', '16%'], rh: 9 }))}
<div class="g2">${box('Payment details', field('Bank') + field('Sort code') + field('Account no.') + field('Reference'), 'cream')}${box('', field('Subtotal £') + field('Discount £') + `<div class="field" style="font-size:11pt;color:var(--sage-deep);font-weight:600"><span>Total due £</span><i></i></div>`, 'sage')}</div>
<p class="small muted center">Thank you for trusting me with your pets!</p>`, { sect: 'Money', cls: 'nofill' }));
add('mileage', tablePage('Money', 'Money', 'Expenses &amp; mileage log', 'Keep receipts and log business miles. Ask an accountant or check GOV.UK for what you can claim.', ['Date', 'Expense / journey', 'Miles', '£', 'Receipt?'], 18, ['13%', '45%', '12%', '12%']));
add('monthly', page(`${head('Money', 'Monthly summary', '')}
<div class="g3">${box('Income', '<div style="font-size:16pt;color:var(--sage-deep);font-weight:600;margin-top:1mm">£</div>', 'sage')}${box('Expenses', '<div style="font-size:16pt;color:var(--sage-deep);font-weight:600;margin-top:1mm">£</div>', 'clay')}${box('Profit', '<div style="font-size:16pt;color:var(--sage-deep);font-weight:600;margin-top:1mm">£</div>', 'cream')}</div>
${table(['Month', 'Income £', 'Expenses £', 'Profit £', 'Walks / visits', 'New clients'], ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', '<b>Total</b>'].map((m) => [m, '', '', '', '', '']), { widths: ['14%'], rh: 10 })}`, { sect: 'Money' }));
add('marketing', page(`${head('Growing', 'Marketing plan', 'Most pet businesses grow by word of mouth. Make it easy for happy clients to recommend you.')}
<div class="g2">${box('Ideas to try', cbs(['Google Business Profile with photos', 'Local Facebook groups (where allowed)', 'Flyers at vets, groomers and pet shops', 'A referral thank-you for clients', 'Photos of happy walks (with permission)', 'Ask every happy client for a review']))}
${box('This month I will', blankCbs(6), 'sage')}</div>
${box('Reviews &amp; referrals', table(['Date', 'Client', 'Where they reviewed / who they referred', 'Thanked?'], 8, { widths: ['14%', '22%', '46%'], rh: 8.6 }))}
${box('Post ideas', lines(), 'fill cream')}`, { sect: 'Growing', deco: 'small' }));
add('thanks', page(`<div class="kicker">Thank you</div><h1>Good luck with your business</h1><p class="lead">Thank you for choosing Larkspur &amp; Co. If this kit helps, a short Etsy review means the world to a small Glasgow business.</p>${box('My goals for the year', lines(), 'fill')}`, { sect: 'Thank you', deco: 'tr' }));
add('contents', null);
pages.splice(pages.length - 1, 1);
delete ids.contents;
pages[0] = cover({ kicker: 'Printable forms & planners', title: 'Pet Sitter &amp;<br>Dog Walker<br>Business Kit', lead: 'Client and pet forms, consent template, booking calendar, visit report cards, key log, invoices, mileage and a marketing plan.', tags: [`${pages.length} pages`, 'Print at home', 'UK friendly'], bottom: 'Templates to help you get organised. Check terms and consent forms with your insurer or adviser.' });

module.exports = {
  file: 'Pet-Sitter-Dog-Walker-Business-Kit', short: S, title: T, pages, css: CSS2, freebie: [ids.report, ids.meet],
  meta: {
    short: 'Pet Sitter &amp;<br>Dog Walker Kit', kicker: 'Forms · Bookings · Invoices · Print at home', sub: 'All the paperwork for a small pet care business, ready to print.',
    hero: [1, ids.petform], grid: [[ids.client, 'New client form'], [ids.petform, 'Pet information form'], [ids.meet, 'Meet & greet checklist'], [ids.week, 'Weekly walk schedule'], [ids.report, 'Visit report cards'], [ids.invoice, 'Invoice template']],
    detail: ids.report, detailTitle: 'Visit report cards owners love', detailPoints: ['Two cards per page', 'Tick walk, wee, poo, fed and more', 'Space for a friendly note', 'Leave one at every visit'],
    features: [['Client forms', 'Owner, pet, consent and meet & greet'], ['Bookings', 'Monthly calendar and weekly walk schedule'], ['Money', 'Payments, invoices, mileage and monthly summary'], ['Growing', 'Setup checklist, pricing planner and marketing plan']],
    pins: [['Starting a dog walking business?', 'Every form you need, ready to print', ids.setup], ['Pet sitter visit report cards', 'A free printable for happy clients', ids.report], ['How much should a dog walker charge?', 'A simple pricing planner', ids.pricing]],
    listing: {
      price: '£6.95', title: 'Pet Sitting Forms Printable, Dog Walker Business Kit, Client Intake Form, Pet Info Sheet, Visit Report Card, Invoice, UK Pet Business PDF',
      tags: ['pet sitting forms', 'dog walker forms', 'pet business', 'dog walking', 'client intake form', 'pet sitter', 'pet care forms', 'small business', 'invoice template', 'booking calendar', 'pet sitter gift', 'dog business', 'visit report card'],
      hook: 'All the paperwork for a small pet care business, ready to print.',
      body: ['A printable kit for dog walkers, pet sitters and pet visit businesses. Get organised from day one with client forms, booking planners, visit report cards and simple money records.',
        'INSIDE:\n• Business setup checklist (UK friendly)\n• Services and pricing planner\n• New client form and pet information form\n• Vet and emergency consent template\n• Meet and greet checklist\n• Monthly booking calendar (undated) and weekly walk schedule\n• Visit report cards (2 per page)\n• Key log and client list\n• Payments log, invoice template, expenses and mileage log\n• Monthly summary\n• Marketing plan and reviews tracker',
        'Templates only: please check terms and consent wording with your insurer or a professional adviser.'],
      pinCopy: [['Starting a dog walking business? Get organised', 'Client forms, booking calendar, invoices and visit report cards. Printable kit.'], ['Free pet sitter visit report card', 'Walk, wee, poo, fed, and a friendly note for the owner.'], ['How much should a dog walker charge?', 'A simple pricing planner: competitors, costs and your price list.'], ['Pet sitting client intake form printable', 'Owner, home access, pet health, behaviour and routine.'], ['Dog walker business checklist', 'Insurance, licences, kit, admin and marketing.']],
      prompts: ['A dog walker\'s clipboard with a blank printed form on a park bench, three dog leads beside it, a happy spaniel in soft focus behind, golden morning light, warm muted tones, photorealistic, 4:5'],
    },
  },
};
