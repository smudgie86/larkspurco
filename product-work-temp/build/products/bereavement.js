const { page, cover, section, lines, cbs, blankCbs, field, table, box } = require('../lib');
const { CSS2, head, tablePage, cardsPage, checkPage, formPage } = require('../lib2');

const T = 'When Someone Dies';
const S = 'When Someone Dies';
const pages = [];
const ids = {};
const add = (id, pg) => { if (id) ids[id] = pages.length + 1; pages.push(pg); };
const sec = (kicker, title, lead, list) => section({ kicker, title, lead, body: `<div class="box cream" style="margin-top:10mm;max-width:150mm">${cbs(list)}</div>` });
const tip = (t) => `<p class="tiny muted">${t}</p>`;
const card = (h, t, cls = '') => box('', `<h3>${h}</h3><p class="small">${t}</p>`, cls);
const css = CSS2 + `
.poem{font-size:10pt;line-height:1.55;color:var(--ink);white-space:pre-line}
.poem-t{font-size:12pt;font-weight:600;color:var(--sage-deep)}
.poem-a{font-size:8pt;color:var(--clay-deep);letter-spacing:.12em;text-transform:uppercase;margin-bottom:2mm}
.phase{display:flex;gap:3mm;align-items:baseline}
.phase .when{flex:none;width:30mm;font-size:7pt;letter-spacing:.14em;text-transform:uppercase;color:var(--clay-deep);font-weight:600}
`;

add('cover', cover({
  kicker: 'A gentle UK guide &amp; organiser',
  title: 'When Someone Dies',
  lead: 'What to do, step by step, with space to keep track of it all.',
  tags: ['England &amp; Wales', 'Scotland', 'Northern Ireland', 'Order of service templates'],
  bottom: 'Practical guidance and record-keeping. It isn\'t legal or financial advice. Rules, fees and payment amounts change, so always check the official websites mentioned.',
}));

add('welcome', page(`<div class="kicker">Before you begin</div><h1>We're so sorry</h1>
<p class="lead">When someone dies, there's suddenly a long list of things to do, at a time when you can barely think. This guide takes you through it gently, one step at a time.</p>
<p>You don't have to do everything at once, and you don't have to do it alone. Very little needs doing in the first few days. Most of it can wait weeks or months. The next page shows what's urgent and what isn't.</p>
<div class="g2">${box('How to use this guide', cbs(['Start with "What needs doing, and when"', 'Use the checklists to see what\'s done', 'Write reference numbers in the logs, so you never have to search for them twice', 'Hand the "How you can help" page to friends who offer', 'Skip anything that doesn\'t apply']))}
${box('Across the UK', '<p class="small">Some things work differently in <b>England &amp; Wales</b>, <b>Scotland</b> and <b>Northern Ireland</b>: registering a death, Tell Us Once, probate (called confirmation in Scotland) and help with funeral costs. Where it matters, the page tells you.</p><p class="small">Fees and payment amounts change often, so this guide points you to the official sites rather than quoting figures that may be out of date.</p>', 'sage')}</div>
<div class="callout small"><b>If you're struggling right now,</b> you can call Samaritans free, any time, on <b>116 123</b>. For bereavement support, call Cruse on <b>0808 808 1677</b> (in Scotland, Cruse Scotland on <b>0808 802 6161</b>).</div>`, { sect: 'Welcome', deco: 'tr' }));

add('contents', null);

add('when', page(`${head('Start here', 'What needs doing, and when', 'A rough order. Every situation is different, so go at your own pace.')}
${[['First day or two', ['Tell close family and friends', 'Contact a funeral director if you\'re using one (no need to decide everything yet)', 'Look after anyone who depended on the person, including pets', 'Make sure their home is secure', 'Look for a will, or ask their solicitor if they had one']],
  ['First week', ['Register the death (within 5 days in England, Wales and NI; 8 days in Scotland)', 'Order several copies of the death certificate', 'Use Tell Us Once to tell government departments (not available in NI)', 'Start planning the funeral', 'Tell their bank (you can use the Death Notification Service)']],
  ['First month', ['Hold the funeral', 'Tell pensions, insurers, employer, utilities and other organisations', 'Cancel or transfer bills and subscriptions', 'Redirect post and register with the Bereavement Register to reduce junk mail', 'Claim any help with funeral costs or bereavement payments']],
  ['Months ahead', ['Value the estate and apply for probate or confirmation if needed', 'Pay debts, taxes and expenses from the estate', 'Share out the estate as the will says (or under the rules if there\'s no will)', 'Sort belongings, digital accounts and memorials', 'Look after yourself: grief takes time']]].map(([w, items], i) => box('', `<div class="phase"><div class="when">${w}</div><div style="flex:1">${cbs(items)}</div></div>`, i % 2 ? 'cream' : '')).join('')}`, { sect: 'Start here' }));

// SECTION 1
add('s-first', sec('Part 1', 'The first days', 'What happens immediately after a death, and how to register it.', ['What happens first', 'First days checklist', 'Registering the death', 'Information the registrar needs']));
add('first', cardsPage('First days', 'First days', 'What happens first', 'This depends on where and how the person died.', [
  ['If the death was expected at home', 'Call their GP or the out-of-hours number (111). A doctor or nurse will confirm the death. Then you can call a funeral director, who can come at any time, day or night.'],
  ['In hospital or a hospice', 'Staff will guide you through what happens next and tell you when and how the medical certificate will be sent to the registrar. You can usually collect belongings from the bereavement office.'],
  ['If the death was unexpected', 'Call 999. The police and paramedics will attend. The death may be reported to a coroner (England, Wales and NI) or the procurator fiscal (Scotland), who may need to find out the cause. This can take longer, but they will explain each step.'],
  ['The medical certificate', 'A doctor completes a medical certificate of cause of death. In England and Wales, a medical examiner reviews it first, then the register office will let you know when you can register.'],
  ['Choosing a funeral director', 'You don\'t have to use the first one you speak to, or use one at all. Funeral directors must show their prices, so it\'s fine to compare. There\'s a comparison page in Part 3.'],
  ['If the person died abroad', 'Register the death in the country where they died, and contact the UK government\'s foreign travel advice service or the British embassy. Repatriation is usually arranged through a funeral director.'],
]));
add('firstcheck', checkPage('First days', 'First days', 'First days checklist', 'Tick off what\'s done. Leave anything that doesn\'t apply.', [
  ['Straight away', ['Death confirmed by a doctor or nurse', 'Close family told', 'Funeral director contacted (if using one)', 'Dependants and pets cared for', 'Home locked and secure']],
  ['Find these', ['The will (home, solicitor, bank)', 'Funeral plan or written wishes', 'Birth and marriage certificates', 'NHS number and NI number', 'Passport and driving licence', 'Any "just in case" binder or notes']],
  ['At home', ['Fridge cleared of fresh food', 'Post collected', 'Valuables kept safe', 'Heating set low (not off in winter)', 'Car kept off the road if uninsured']],
  ['Look after you', ['Eat something, and drink water', 'Let someone stay with you', 'Ask for time off work', 'Write things down: you won\'t remember everything']],
], { blanks: 1 }));
add('register', page(`${head('Registering', 'Registering the death', 'Every death in the UK has to be registered. The registrar will tell you exactly what you need.')}
${table(['', 'England &amp; Wales', 'Scotland', 'Northern Ireland'], [
  ['<b>Deadline</b>', 'Within 5 days of being told you can register (after the medical examiner)', 'Within 8 days', 'Within 5 days'],
  ['<b>Where</b>', 'Usually the register office for the area where the person died', 'Any registration office in Scotland', 'Any registration office in NI'],
  ['<b>Who registers</b>', 'Usually a relative, someone present at the death, or the person arranging the funeral', 'A relative, someone present, the executor or another person who knows the details', 'A relative, someone present, or another qualified person'],
  ['<b>You\'ll get</b>', 'Death certificate (pay for copies), form for the funeral director, Tell Us Once reference', 'Death certificate (extracts), form for the funeral director, Tell Us Once reference', 'Death certificate, form for the funeral director (Tell Us Once isn\'t used in NI)'],
], { widths: ['16%', '28%', '28%', '28%'], rh: 13, cls: 'nofields' })}
<div class="g2">${box('My appointment', ['Register office', 'Date &amp; time', 'Phone', 'Medical examiner / doctor ref'].map(field).join(''))}
${box('What I came away with', ['Certificate copies ordered', 'Form for funeral director', 'Tell Us Once reference', 'Reference valid until'].map(field).join(''), 'sage')}</div>
<div class="callout small"><b>Tip:</b> order several copies of the death certificate. Banks, pensions and insurers often want an official copy (not a photocopy), and buying them later usually costs more.</div>`, { sect: 'Registering' }));
add('registrar', formPage('Registering', 'Registering', 'Information the registrar needs', 'Fill this in before your appointment and take it with you, with any documents you have.', [
  ['The person who died', ['Full name (and any previous names)', 'Date and place of birth', 'Date and place of death', 'Last address', 'Occupation (or last job)', 'NHS number']],
  ['Their relationships', ['Marital / civil partnership status', 'Spouse or partner\'s full name', 'Partner\'s date of birth', 'Partner\'s occupation', 'Parents\' names (Scotland)', 'Date of last marriage (Scotland)']],
  ['Pensions &amp; benefits', ['State Pension or benefits?', 'Public sector pension?', 'National Insurance number', 'Blue Badge?']],
  ['Bring if you have them', `${cbs(['Medical certificate details', 'Birth certificate', 'Marriage / civil partnership certificate', 'Passport', 'Driving licence', 'Proof of address (e.g. council tax bill)'])}`],
]));

// SECTION 2
add('s-tell', sec('Part 2', 'Telling people &amp; organisations', 'A surprisingly long list. These pages help you keep track of who knows and what they said.', ['Tell Us Once', 'Who to tell', 'Organisations log', 'People to tell']));
add('tuo', page(`${head('Telling', 'Tell Us Once', 'One free service that tells many government departments at once. Your registrar will give you a reference number.')}
<div class="g2">${box('It can tell', cbs(['HMRC (tax)', 'DWP (State Pension and benefits)', 'HM Passport Office', 'DVLA (driving licence and vehicles)', 'The local council (council tax, Blue Badge, housing benefit, library, electoral register)', 'Some public sector pension schemes', 'Veterans UK']))}
${box('Good to know', '<p class="small">Use the reference within <b>28 days</b>, online or by phone. You\'ll need the person\'s details and the names of anyone dealing with their estate.</p><p class="small"><b>Northern Ireland:</b> Tell Us Once isn\'t available. Contact the Bereavement Service (search "nidirect bereavement service") to tell DWP and HMRC together, then contact other departments yourself.</p><p class="small"><b>It does not tell</b> banks, private pensions, insurers, utility companies or employers. Use the next pages for those.</p>', 'sage')}</div>
${box('My Tell Us Once record', ['Reference number', 'Date used', 'Online or phone', 'Confirmation received'].map(field).join(''), 'cream')}
${box('Departments that contacted me afterwards', lines(), 'fill')}`, { sect: 'Telling' }));
add('whotell', checkPage('Telling', 'Telling', 'Who else to tell', 'Organisations Tell Us Once doesn\'t cover. Tick each one when it\'s done.', [
  ['Money', ['Banks and building societies (try the Death Notification Service: one form for many banks)', 'Credit cards and loans', 'Workplace and private pensions', 'Life insurance', 'Premium Bonds (NS&amp;I)', 'Investments and shares', 'Mortgage lender']],
  ['Home', ['Landlord or housing association', 'Home and contents insurer', 'Gas and electricity', 'Water', 'Broadband, phone and TV', 'TV Licensing', 'Royal Mail (redirect post)']],
  ['Work &amp; health', ['Employer', 'GP surgery (if not done)', 'Dentist and optician', 'Hospital appointments', 'Care agency or carers', 'Equipment loans (wheelchair, bed)']],
  ['Everything else', ['Car insurer and breakdown cover', 'Mobile phone network', 'Subscriptions and memberships', 'Clubs, groups and charities', 'Social media accounts', 'Bereavement Register (stops junk mail)']],
]));
for (let i = 0; i < 2; i++) add(i === 0 ? 'orglog' : null, tablePage('Telling', 'Telling', i === 0 ? 'Organisations log' : 'Organisations log (continued)', i === 0 ? 'Every call, form and reference number in one place.' : '', ['Organisation', 'Their ref', 'Date', 'Spoke to', 'What happens next', 'Done'], 15, ['20%', '14%', '10%', '14%', '32%']));
add('peoplelog', tablePage('Telling', 'Telling', 'People to tell', 'Friends, neighbours, colleagues, groups. Tick when they\'ve been told and when they have funeral details.', ['Name', 'Phone / email', 'Told by', 'Told', 'Funeral info sent'], 16, ['28%', '28%', '16%', '10%']));

// SECTION 3: FUNERAL
add('s-funeral', sec('Part 3', 'Planning the funeral', 'There\'s no right or wrong way to say goodbye. These pages help you make the choices and keep track of the details.', ['Funeral options', 'Comparing funeral directors', 'Funeral costs', 'Help with funeral costs', 'Funeral plan and running order', 'Readings, eulogy and condolences']));
add('options', cardsPage('Funeral', 'Funeral', 'Funeral options', 'Check whether the person left wishes or a prepaid plan before you decide.', [
  ['Burial', 'In a churchyard, cemetery or natural burial ground. You may need to buy a plot. A headstone usually comes months later, once the ground settles.'],
  ['Cremation', 'A service at the crematorium or elsewhere, followed by cremation. You can collect the ashes afterwards or ask the funeral director to.'],
  ['Direct cremation', 'Cremation without a service, usually at a lower cost. Many families then hold their own memorial or celebration of life at a time and place that suits them.'],
  ['Natural or woodland burial', 'Burial in a natural setting, often with a tree or wildflowers instead of a headstone. Usually needs a biodegradable coffin.'],
  ['Who leads it', 'A minister or faith leader, a humanist or independent celebrant, or a family member. You can mix religious and personal elements.'],
  ['Without a funeral director', 'It\'s legal to arrange a funeral yourself in the UK, though most families use a funeral director for some or all of it. The local council\'s bereavement services can explain how.'],
]));
add('compare', page(`${head('Funeral', 'Comparing funeral directors', 'Funeral directors must show their prices. Ask for an itemised quote so you can compare like for like.')}
<div class="g3">${[1, 2, 3].map((n) => box(`Quote ${n}`, ['Funeral director', 'Phone', 'Total price £', 'Deposit £', 'Includes coffin?', 'Includes cars?', 'Third-party fees?', 'Can see the person?', 'Feeling'].map(field).join(''), n === 2 ? 'cream' : '')).join('')}</div>
<div class="g2">${box('Questions to ask', cbs(['What\'s included, and what\'s extra?', 'Which fees are paid to others (crematorium, cemetery, celebrant)?', 'When do you need payment?', 'Can money come straight from the person\'s bank?', 'Can we bring our own coffin, flowers or order of service?']), 'sage')}${box('Decision &amp; notes', lines())}</div>`, { sect: 'Funeral' }));
add('costs', page(`${head('Funeral', 'Funeral costs', 'Keep track of what\'s quoted, what\'s paid and who paid it.')}
${table(['Cost', 'Quote £', 'Paid £', 'Paid by', 'Date'], [['Funeral director\'s fees', '', '', '', ''], ['Coffin', '', '', '', ''], ['Cremation or burial fee', '', '', '', ''], ['Burial plot', '', '', '', ''], ['Celebrant / minister', '', '', '', ''], ['Venue for the service', '', '', '', ''], ['Cars', '', '', '', ''], ['Flowers', '', '', '', ''], ['Order of service printing', '', '', '', ''], ['Notice in the paper', '', '', '', ''], ['Wake: venue &amp; catering', '', '', '', ''], ['Headstone / memorial', '', '', '', ''], ['', '', '', '', ''], ['<b>Total</b>', '', '', '', '']], { widths: ['32%', '14%', '14%', '22%'], rh: 10 })}
${tip('Funeral costs can usually be paid from the estate before other debts. Keep every receipt, and use the "Expenses I\'ve paid" page in Part 4 to claim them back.')}`, { sect: 'Funeral' }));
add('help', page(`${head('Funeral', 'Help with funeral costs', 'Financial help that may be available. Check current amounts and rules on the official sites.')}
<div class="g2">${card('Funeral Expenses Payment', '<b>England, Wales and Northern Ireland.</b> For people arranging a funeral who get certain benefits. Covers some costs. Apply within 6 months of the funeral. Search "Funeral Expenses Payment" on GOV.UK (or nidirect in NI).', 'cream')}
${card('Funeral Support Payment', '<b>Scotland.</b> From Social Security Scotland, for people on certain benefits. Apply within 6 months of the funeral. Search "Funeral Support Payment" on mygov.scot.', 'sage')}
${card('Bereavement Support Payment', 'If your husband, wife or civil partner died and you\'re under State Pension age, you may get a lump sum and monthly payments. Claim within 3 months of the death to get the full amount.')}
${card('Children\'s funerals', 'In England and Wales the Children\'s Funeral Fund pays burial or cremation fees for a child under 18. Scotland also covers these fees. Ask your funeral director.', 'cream')}
${card('From the person\'s bank', 'Many banks will pay a funeral invoice directly from the person\'s account, even before probate. Ask their bank\'s bereavement team.', 'sage')}
${card('Other help', 'Check life insurance, funeral plans and workplace death-in-service benefits. Some trade unions, employers, armed forces charities and faith groups also help.')}</div>
${box('What we\'ve applied for', table(['Help', 'Applied', 'Reference', 'Outcome'], 5, { widths: ['34%', '14%', '22%'], rh: 9 }))}`, { sect: 'Funeral' }));
add('plan', page(`${head('Funeral', 'Funeral plan', 'All the details of the day in one place, to share with the people helping.')}
<div class="g2">${box('The service', ['Date', 'Time', 'Venue', 'Address', 'Led by', 'Type of service'].map(field).join(''))}
${box('Afterwards', ['Burial / cremation at', 'Committal time', 'Wake venue', 'Wake time', 'Catering', 'Numbers expected'].map(field).join(''), 'sage')}</div>
<div class="g2">${box('Details', ['Flowers or donations to', 'Dress code', 'Leaving from (house)', 'Cars for', 'Bearers', 'Notice in the paper'].map(field).join(''), 'cream')}
${box('Tasks &amp; who\'s doing them', table(['Task', 'Who'], 6, { widths: ['62%'], rh: 8 }))}</div>
${box('Notes', lines(), 'fill')}`, { sect: 'Funeral' }));
add('running', page(`${head('Funeral', 'Running order', 'Plan the service, then copy it into your order of service template.')}
${table(['Time', 'What happens', 'Music / reading', 'Who'], [['', 'Arrival / entrance music', '', ''], ['', 'Welcome', '', ''], ['', '', '', ''], ['', '', '', ''], ['', 'Tribute / eulogy', '', ''], ['', '', '', ''], ['', '', '', ''], ['', 'Moment of reflection', '', ''], ['', 'Committal', '', ''], ['', 'Closing words', '', ''], ['', 'Leaving music', '', ''], ['', '', '', '']], { widths: ['12%', '38%', '32%'], rh: 11 })}`, { sect: 'Funeral' }));
add('readings', page(`${head('Funeral', 'Readings', 'Four well-loved readings, free to use in your service and order of service.')}
<div class="g2">
${box('', `<div class="poem-t">Remember</div><div class="poem-a">Christina Rossetti</div><div class="poem">Remember me when I am gone away,
Gone far away into the silent land;
When you can no more hold me by the hand,
Nor I half turn to go yet turning stay.
Remember me when no more day by day
You tell me of our future that you planned:
Only remember me; you understand
It will be late to counsel then or pray.
Yet if you should forget me for a while
And afterwards remember, do not grieve:
For if the darkness and corruption leave
A vestige of the thoughts that once I had,
Better by far you should forget and smile
Than that you should remember and be sad.</div>`, 'cream')}
${box('', `<div class="poem-t">Crossing the Bar</div><div class="poem-a">Alfred, Lord Tennyson</div><div class="poem">Sunset and evening star,
And one clear call for me!
And may there be no moaning of the bar,
When I put out to sea,

But such a tide as moving seems asleep,
Too full for sound and foam,
When that which drew from out the boundless deep
Turns again home.

Twilight and evening bell,
And after that the dark!
And may there be no sadness of farewell,
When I embark;

For tho' from out our bourne of Time and Place
The flood may bear me far,
I hope to see my Pilot face to face
When I have crost the bar.</div>`)}
${box('', `<div class="poem-t">Requiem</div><div class="poem-a">Robert Louis Stevenson</div><div class="poem">Under the wide and starry sky,
Dig the grave and let me lie.
Glad did I live and gladly die,
And I laid me down with a will.

This be the verse you grave for me:
Here he lies where he longed to be;
Home is the sailor, home from sea,
And the hunter home from the hill.</div>`, 'sage')}
${box('', `<div class="poem-t">Death is nothing at all</div><div class="poem-a">Henry Scott Holland (extract)</div><div class="poem" style="white-space:normal;font-size:9pt">Death is nothing at all. I have only slipped away into the next room. I am I and you are you. Whatever we were to each other, that we still are. Call me by my old familiar name. Speak to me in the easy way which you always used. Laugh as we always laughed at the little jokes we enjoyed together. Play, smile, think of me. Let my name be ever the household word that it always was. Life means all that it ever meant. Why should I be out of mind because I am out of sight? I am but waiting for you, for an interval, somewhere very near, just around the corner. All is well.</div>`, 'cream')}
</div>`, { sect: 'Funeral', cls: 'nofill' }));
add('eulogy', page(`${head('Funeral', 'Writing a eulogy', 'A eulogy doesn\'t need to be perfect, or long. Three to five minutes is plenty. Start with stories, not dates.')}
<div class="g2">${['Who they were in one sentence', 'Where they grew up and what shaped them', 'Work, passions and what they were proud of', 'The people they loved', 'A story that makes everyone smile', 'What they taught us'].map((l, i) => box(l, lines(24), i % 3 === 1 ? 'sage' : i % 3 === 2 ? 'cream' : '')).join('')}</div>
<div class="callout sage small"><b>Tips:</b> write it out in full and print it in large type. Ask friends for stories. Practise it aloud once. If you can't get through it on the day, it\'s fine to ask someone to read it for you, or to pause and breathe.</div>
${box('How I\'ll finish', lines(), 'fill')}`, { sect: 'Funeral' }));
add('condol', tablePage('Funeral', 'Funeral', 'Cards, flowers &amp; kindness', 'Note who sent what, so thank-yous are easy later (whenever you feel ready).', ['Name', 'Sent / did', 'Address / contact', 'Thanked'], 16, ['26%', '32%', '30%']));

// SECTION 4: ESTATE
add('s-estate', sec('Part 4', 'Money &amp; the estate', 'Sorting out someone\'s money and belongings is called "administering the estate". It usually takes months, not weeks, and that\'s normal.', ['Probate and confirmation', 'Executor checklist', 'Assets and debts', 'Accounts tracker', 'Expenses I\'ve paid', 'Home and digital accounts']));
add('probate', page(`${head('The estate', 'Probate &amp; confirmation', 'The legal permission to deal with someone\'s money, property and belongings. It isn\'t always needed.')}
<div class="g3">${card('England &amp; Wales', 'A <b>grant of probate</b> (if there\'s a will) or <b>letters of administration</b> (if there isn\'t), from HM Courts &amp; Tribunals Service. Apply online on GOV.UK. A fee applies for larger estates.', 'cream')}
${card('Scotland', 'A grant of <b>confirmation</b> from the sheriff court. There\'s a simpler process for small estates, and the sheriff clerk can help if there\'s no solicitor. See mygov.scot.', 'sage')}
${card('Northern Ireland', 'A grant of probate or letters of administration from the <b>Probate Office</b> in Belfast. See nidirect for how to apply.', 'cream')}</div>
<div class="g2">${box('You may not need it if', cbs(['Everything was owned jointly and passes to the other owner', 'The estate is small: each bank sets its own limit, so ask', 'There\'s no property or land in their sole name']))}
${box('Inheritance Tax', '<p class="small">Most estates don\'t pay Inheritance Tax, but the estate still needs to be valued and, in many cases, reported to HMRC. For deaths on or after <b>6 April 2027</b>, most unused pension funds count towards the estate for Inheritance Tax. Check GOV.UK, or ask a solicitor or accountant if the estate is large or complicated.</p>', 'sage')}</div>
${box('Our application', ['Who is applying', 'Solicitor (if using one)', 'Date applied', 'Reference', 'Grant received'].map(field).join(''))}`, { sect: 'The estate' }));
add('executor', checkPage('The estate', 'The estate', 'Executor checklist', 'The person dealing with the estate is the executor (named in a will) or administrator. In Scotland, both are called executors.', [
  ['1. Find out', ['Find the original will', 'Check for a funeral plan or wishes', 'Find out what they owned and owed', 'Ask each organisation for the value at the date of death', 'Look for old pensions (Pension Tracing Service)']],
  ['2. Protect', ['Tell banks and freeze accounts', 'Tell the home insurer the property is empty', 'Keep valuables safe', 'Stop direct debits that aren\'t needed', 'Redirect post to you']],
  ['3. Apply', ['Value the estate', 'Check Inheritance Tax and report if needed', 'Apply for probate or confirmation', 'Open an executor or estate bank account']],
  ['4. Settle', ['Collect money from accounts and policies', 'Pay funeral costs, debts and bills', 'Sort out final income tax with HMRC', 'Consider placing a deceased estates notice (e.g. The Gazette)', 'Keep a record of every payment in and out']],
  ['5. Share out', ['Pay gifts and shares named in the will', 'Get receipts from beneficiaries', 'Prepare simple estate accounts', 'Keep records for at least 12 years']],
], { cols: 2 }));
add('assets', tablePage('The estate', 'The estate', 'Assets &amp; debts', 'Everything they owned and owed, valued at the date of death.', ['Item / account', 'Provider', 'Ref', 'Value at death £', 'Owed £', 'Joint?'], 15, ['24%', '20%', '14%', '14%', '14%']));
add('accounts', tablePage('The estate', 'The estate', 'Accounts tracker', 'Track each bank, pension and policy from first call to final payment.', ['Organisation', 'Ref', 'Told', 'Cert. sent', 'Forms back', 'Paid / closed', 'Amount £'], 15, ['22%', '14%', '11%', '11%', '11%', '13%']));
add('expenses', tablePage('The estate', 'The estate', 'Expenses I\'ve paid', 'Keep receipts. Reasonable costs can usually be repaid to you from the estate.', ['Date', 'What for', 'Paid to', 'Amount £', 'Receipt?', 'Repaid'], 16, ['12%', '34%', '20%', '12%', '10%']));
add('home', checkPage('The estate', 'The estate', 'Their home', 'Whether they owned or rented, these jobs keep the property safe while the estate is sorted.', [
  ['Straight away', ['Lock up, and collect spare keys', 'Tell the home insurer (cover can change when a home is empty)', 'Take meter readings', 'Set heating to frost protection in winter', 'Redirect or collect post']],
  ['If rented', ['Tell the landlord or housing association', 'Ask how much notice is needed', 'Agree a date to clear and return keys', 'Ask about the deposit']],
  ['If owned', ['Tell the mortgage lender', 'Check who owns it (sole or joint)', 'Ask the council about council tax on an empty home', 'Get a valuation for the estate']],
  ['Belongings', ['Agree with family before anything is shared out', 'Look for items mentioned in the will', 'Keep photos, letters and papers safe', 'Donate, sell or recycle the rest']],
]));
add('digital', page(`${head('The estate', 'Phones, email &amp; social media', 'Every company has its own process. Most will ask for a death certificate.')}
${table(['Account', 'What we want', 'Request sent', 'Done'], [['Facebook', 'Memorialise / remove', '', ''], ['Instagram', 'Memorialise / remove', '', ''], ['Google (Gmail, Photos, YouTube)', '', '', ''], ['Apple (iCloud, photos)', '', '', ''], ['Microsoft (Outlook, OneDrive)', '', '', ''], ['X / TikTok / LinkedIn', '', '', ''], ['Mobile phone contract', 'Cancel / transfer number', '', ''], ['Email accounts', '', '', ''], ['Amazon / PayPal / eBay', '', '', ''], ['', '', '', '']], { widths: ['30%', '34%', '18%'], rh: 10.4 })}
${tip('Before closing accounts, download photos and messages you want to keep. Without a passcode, Apple and Google devices can be hard to unlock. Apple and Google both have processes for next of kin: search "Apple Digital Legacy" and "Google deceased user request".')}`, { sect: 'The estate' }));

// SECTION 5: YOU
add('s-you', sec('Part 5', 'Looking after yourself', 'Grief isn\'t something to get through on a timetable. These last pages are for you.', ['About grief', 'Support in the UK', 'How you can help (for friends)', 'Gentle check-in', 'Memories and dates to remember']));
add('grief', cardsPage('For you', 'For you', 'About grief', 'There\'s no right way to grieve. These are things many people find helpful to know.', [
  ['It comes in waves', 'Some days feel almost normal, then a song or a smell knocks you sideways. That\'s grief, not going backwards.'],
  ['Look after the basics', 'Try to eat, drink water, get outside and rest, even when you don\'t feel like it. Small things matter.'],
  ['Let people help', 'People often want to help but don\'t know how. The next-but-one page gives them a list.'],
  ['Children grieve too', 'Use clear words like "died" rather than "lost". Children may seem fine one minute and upset the next. Child Bereavement UK and Winston\'s Wish can help.'],
  ['Anniversaries and firsts', 'Birthdays, Christmas and the first anniversary can be hard. It can help to plan something small to mark them.'],
  ['When to get help', 'If you\'re struggling to cope, can\'t sleep or eat for weeks, or have thoughts of harming yourself, talk to your GP or call Samaritans on 116 123.'],
], { deco: 'small' }));
add('support', page(`${head('For you', 'Support in the UK', 'Free, confidential support. Search the names to find current details and opening times.')}
<div class="g2">${[
  ['Samaritans', 'Any time, day or night: <b>116 123</b> (free).'],
  ['Cruse Bereavement Support', 'Helpline <b>0808 808 1677</b>. In Scotland: Cruse Scotland <b>0808 802 6161</b>.'],
  ['Marie Curie Support Line', '<b>0800 090 2309</b>. Practical and emotional support after a death.'],
  ['At a Loss', 'Signposting website to find local bereavement services across the UK.'],
  ['Child Bereavement UK &amp; Winston\'s Wish', 'Support for grieving children, young people and their families.'],
  ['The Compassionate Friends', 'Support for parents, siblings and grandparents after the death of a child.'],
  ['Sands', 'Support for anyone affected by the death of a baby.'],
  ['WAY Widowed and Young', 'Peer support for people widowed under 51.'],
  ['Survivors of Bereavement by Suicide', 'Support for people bereaved by suicide.'],
  ['Citizens Advice', 'Free help with money, benefits, debts and housing after a death.'],
].map(([h, t], i) => card(h, t, i % 3 === 0 ? 'cream' : i % 3 === 2 ? 'sage' : '')).join('')}</div>
${box('Local support I\'ve found', ['Name', 'Phone', 'Name', 'Phone'].map(field).join(''), 'sage')}`, { sect: 'For you', deco: 'small' }));
add('friends', page(`${head('For you', 'How you can help', 'Give this page to friends and family who say "let me know if there\'s anything I can do".')}
${table(['Job', 'Who\'s doing it', 'When', 'Done'], [['Cook a meal or drop off food', '', '', ''], ['Do a food shop', '', '', ''], ['School runs / childcare', '', '', ''], ['Walk or feed the pets', '', '', ''], ['Make some of the phone calls', '', '', ''], ['Help with the funeral flowers', '', '', ''], ['Pick people up from the station', '', '', ''], ['Help with the wake / catering', '', '', ''], ['Clean, tidy or do the washing', '', '', ''], ['Help sort paperwork', '', '', ''], ['Just come round for a cup of tea', '', '', ''], ['', '', '', ''], ['', '', '', '']], { widths: ['42%', '30%', '16%'], rh: 11 })}`, { sect: 'For you' }));
add('checkin', page(`${head('For you', 'Gentle check-in', 'Use this page whenever you need it. There are no wrong answers.')}
${table(['Date', 'How I\'m feeling', 'One thing that helped', 'One small thing for tomorrow'], 12, { widths: ['12%', '30%', '29%'], rh: 14 })}`, { sect: 'For you' }));
add('memories', page(`${head('For you', 'Memories', 'Stories, sayings and moments you never want to forget.')}
<div class="g2">${box('Things they used to say', lines(40), 'cream')}${box('Favourite things', lines(40), 'sage')}</div>
${box('A memory I want to keep', lines(), 'fill')}`, { sect: 'For you' }));
add('dates', page(`${head('For you', 'Dates to remember', 'Birthdays, anniversaries and days that might feel hard. Plan something gentle for each.')}
${table(['Date', 'What it is', 'What we might do'], 14, { widths: ['16%', '34%'], rh: 12 })}`, { sect: 'For you' }));
add('notes', page(`${head('Notes', 'Notes', '')}${box('', lines(), 'fill')}`, { sect: 'Notes' }));

const tocItems = [['What needs doing, and when', 'when'], ['1 · The first days', 's-first'], ['What happens first', 'first'], ['Registering the death', 'register'], ['2 · Telling people &amp; organisations', 's-tell'], ['Tell Us Once', 'tuo'], ['Who else to tell, and logs', 'whotell'], ['3 · Planning the funeral', 's-funeral'], ['Options, quotes and costs', 'options'], ['Help with funeral costs', 'help'], ['Funeral plan and running order', 'plan'], ['Readings and eulogy', 'readings'], ['4 · Money &amp; the estate', 's-estate'], ['Probate and confirmation', 'probate'], ['Executor checklist', 'executor'], ['Assets, accounts and expenses', 'assets'], ['Their home and digital accounts', 'home'], ['5 · Looking after yourself', 's-you'], ['Support in the UK', 'support'], ['How you can help (for friends)', 'friends']];
pages[ids.contents - 1] = page(`${head('Contents', 'What\'s inside', '')}
<div style="flex:1;max-width:150mm">${tocItems.map(([t, id]) => `<div class="toc" style="padding:1.9mm 0;font-size:9.8pt">${/^\d/.test(t) ? `<b style="color:var(--sage-deep);font-weight:600">${t}</b>` : `<span style="padding-left:6mm">${t}</span>`}<span>${ids[id]}</span></div>`).join('')}</div>
<div class="callout sage small">Also included: <b>3 editable order of service templates</b>, a memorial welcome sign and thank-you cards (Word), plus printable memory cards for guests.</div>`, { sect: 'Contents', cls: 'nofill' });

module.exports = {
  file: 'When-Someone-Dies-UK-Guide',
  short: S,
  title: T,
  fillable: true,
  pages,
  css,
  freebie: [ids.when, ids.whotell, ids.friends],
  ids,
  meta: {
    short: 'When Someone<br>Dies', kicker: 'UK guide · Organiser · Editable templates', sub: 'What to do, step by step, with order of service templates included.',
    hero: [1, ids.when], grid: [[ids.when, 'What to do, and when'], [ids.register, 'Registering (by UK nation)'], [ids.tuo, 'Tell Us Once'], [ids.help, 'Help with funeral costs'], [ids.probate, 'Probate &amp; confirmation'], [ids.friends, 'How friends can help']],
    included: '41-page guide (A4 + US Letter, print or type in) plus editable Word templates', detail: ids.register, detailTitle: 'Written for the UK, all four nations', detailPoints: ['England, Wales, Scotland and NI', 'Tell Us Once and who else to tell', 'Probate and confirmation explained', 'Type in, or print and write'],
    features: [['First days', 'What happens first, registering the death'], ['Telling people', 'Tell Us Once, organisations log, people to tell'], ['The funeral', 'Options, costs, help with costs, readings, eulogy'], ['The estate', 'Executor checklist, accounts tracker, expenses']],
    pins: [['What to do when someone dies (UK)', 'A gentle step-by-step guide', ids.when], ['Who to tell when someone dies', 'Free UK checklist', ids.whotell], ['How friends can help after a death', 'A list to share', ids.friends]],
    listing: {
      price: '£24.95', title: 'What to Do When Someone Dies UK Guide, Bereavement Organiser, Editable Order of Service Template, Funeral Planner, Executor Checklist',
      tags: ['when someone dies', 'bereavement guide', 'order of service', 'funeral template', 'funeral planner', 'executor checklist', 'probate checklist', 'sympathy gift', 'funeral program', 'memorial sign', 'grief support', 'uk funeral', 'celebration of life'],
      hook: 'When someone dies there\'s suddenly a long list of things to do, at a time when you can barely think. This guide takes you through it gently, one step at a time.',
      body: ['A calm, practical UK guide and organiser for the weeks and months after a death, with editable order of service templates so you have everything for the funeral in one place. Written for England & Wales, Scotland and Northern Ireland, with clear notes where things differ.',
        'Type straight into the fillable PDF, or print it and keep it in a folder with the paperwork.',
        'GUIDE & ORGANISER (41 pages):\n• What needs doing, and when\n• What happens first and a first days checklist\n• Registering the death in each UK nation\n• Information the registrar needs\n• Tell Us Once, and who else to tell\n• Organisations log and people to tell\n• Funeral options and comparing funeral directors\n• Funeral costs and help with funeral costs\n• Funeral plan, running order, readings and writing a eulogy\n• Cards, flowers and kindness log\n• Probate and confirmation explained\n• Executor checklist, assets and debts, accounts tracker, expenses\n• Their home and digital accounts\n• About grief, UK support services and a "how you can help" page for friends',
        'EDITABLE TEMPLATES (Microsoft Word, also opens in Pages and Google Docs):\n• 3 order of service designs: Larkspur, Classic and Celebration of Life (A5 folded, prints on A4)\n• Memorial welcome sign\n• Thank you cards (4 per page)\n• Share a memory cards for guests\n• Change the words, swap in your photos, print at home or at a print shop',
        'Four public-domain readings are included and are free to print in your order of service.',
        'PLEASE NOTE: this is practical guidance and record-keeping, not legal or financial advice. Rules and payment amounts change, so the guide points you to the official GOV.UK, mygov.scot and nidirect pages.'],
      pinCopy: [['What to do when someone dies: a UK checklist', 'The first days, the first week and the months ahead.'], ['Who to tell when someone dies (UK)', 'Banks, pensions, utilities and more, beyond Tell Us Once.'], ['Editable order of service templates', 'Three gentle designs to personalise in Word.'], ['How friends can help after a bereavement', 'A simple list to hand to people who ask.'], ['Probate or confirmation? A plain-English guide', 'England, Wales, Scotland and Northern Ireland.']],
      prompts: ['A printed folded order of service booklet lying on a soft linen tablecloth beside a single white rose and a small sprig of rosemary, the booklet pages are blank white, soft natural window light, warm cream and muted sage green palette, calm and respectful, photorealistic, 4:5'],
    },
  },
};
