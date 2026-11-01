const { page, cover, section, lines, cbs, blankCbs, field, table, box } = require('../lib');
const { CSS2, head, tablePage, cardsPage, checkPage, formPage } = require('../lib2');

const T = 'The Just in Case Binder';
const S = 'Just in Case Binder';
const pages = [];
const ids = {};
const add = (id, pg) => { if (id) ids[id] = pages.length + 1; pages.push(pg); };
const yn = (q) => `<div class="cb" style="margin:1mm 0">${q}</div>`;
const ynRow = (q) => `<div class="field" style="align-items:center"><span>${q}</span><span class="small" style="display:inline-flex;gap:4mm;margin-left:auto"><span class="cb" style="margin:0">Yes</span><span class="cb" style="margin:0">No</span><span class="cb" style="margin:0">Not sure</span></span></div>`;
const sec = (kicker, title, lead, list) => section({ kicker, title, lead, body: `<div class="box cream" style="margin-top:10mm;max-width:150mm">${cbs(list.map((x) => `<span>${x}</span>`))}</div>` });

add('cover', cover({
  kicker: 'Life admin &amp; legacy planner · UK',
  title: 'The Just in Case Binder',
  lead: 'Everything your people would need to know, kept safely in one place.',
  tags: ['Printable', 'Fillable PDF', 'UK nations', 'Spreadsheet included'],
  bottom: 'A planning and record-keeping tool. It isn\'t legal, financial or medical advice and it doesn\'t replace a will or power of attorney.',
}));

add('welcome', page(`<div class="kicker">Start here</div><h1>A gift to the people you love</h1>
<p class="lead">If you were suddenly ill, in hospital or gone, could someone find your bank, your pension, your will and your pet's vet? Most families can't. They spend months searching through drawers, inboxes and statements while they're grieving.</p>
<p>This binder fixes that. Work through it slowly, a section at a time. You don't need to finish it in one go and you don't need to fill in every page: skip anything that doesn't apply to you.</p>
<div class="g2">${box('How to use it', cbs(['Print it, or type straight into the fillable PDF', 'Do one section a week (about 20 minutes each)', 'Write <b>where</b> things are, not secret codes', 'Tell one or two trusted people where it\'s kept', 'Review it once a year, and after big life changes', 'Use the spreadsheet for accounts and bills that change often']))}
${box('Keep it safe', cbs(['<b>Never write passwords, PINs or full card numbers here.</b> Use a password manager with emergency access instead', 'Only write the last 4 digits of account numbers', 'Store it somewhere secure but findable: a locked drawer or fire safe', 'Keep the fillable PDF on an encrypted device, not in an email']), 'clay')}</div>
<div class="callout sage small"><b>Across the UK.</b> Wills, powers of attorney and estates work differently in England &amp; Wales, Scotland and Northern Ireland. Where it matters, the page tells you. This binder is a record-keeping tool, not legal advice: a solicitor can check your will and attorney documents are valid.</div>`, { sect: 'Welcome', deco: 'tr' }));

add('contents', null);

add('found', page(`${head('Before you start', 'Where this binder lives', 'The most organised binder in the world is no use if nobody can find it.')}
<div class="g2">${box('This binder is kept', ['Location', 'Spare copy', 'Digital copy (where)', 'Key / access held by'].map(field).join(''))}
${box('People who know where it is', ['Name', 'Name', 'Name', 'Name'].map(field).join(''), 'sage')}</div>
${box('My important people should call first', ['Name &amp; phone', 'Name &amp; phone', 'My solicitor (if I have one)'].map(field).join(''), 'cream')}
${box('Last fully reviewed', table(['Date', 'What I updated', 'Next review'], 7, { widths: ['20%', '60%'], rh: 8.4 }))}`, { sect: 'Start here' }));

// ABOUT ME
add('s-about', sec('Section 1', 'About me', 'The basic details people are asked for again and again, from the GP surgery to the registrar.', ['Personal details', 'Family and key people', 'Important contacts']));
add('personal', formPage('About me', 'About me', 'Personal details', 'The registrar, banks and pension providers will ask for these.', [
  ['Me', ['Full legal name', 'Other names used', 'Date of birth', 'Place of birth', 'Home address', 'Postcode']],
  ['Numbers (write where to find them)', ['National Insurance number', 'NHS / CHI / H&amp;C number', 'Passport (where kept)', 'Driving licence (where kept)', 'Tax reference (UTR) if any', 'Blood group (if known)']],
  ['Relationships', ['Marital / civil partnership status', 'Spouse / partner', 'Date of marriage / partnership', 'Previous marriages']],
  ['Work', ['Employer or business', 'Job title', 'HR / payroll contact', 'Retired? Date']],
]));
add('family', page(`${head('About me', 'Family &amp; key people', 'The people closest to you, and who should be told first.')}
<div class="tbl-fill">${table(['Name', 'Relationship', 'Phone', 'Address / email', 'Tell first?'], 14, { widths: ['22%', '16%', '18%', '32%'], rh: 9.4 })}</div>`, { sect: 'About me' }));
add('contacts', page(`${head('About me', 'Important contacts', 'Professionals and helpers who know your affairs.')}
${table(['Who', 'Name / firm', 'Phone', 'Email / reference'], [['GP surgery', '', '', ''], ['Solicitor', '', '', ''], ['Accountant', '', '', ''], ['Financial adviser', '', '', ''], ['Executor(s)', '', '', ''], ['Attorney(s)', '', '', ''], ['Employer / HR', '', '', ''], ['Faith leader / celebrant', '', '', ''], ['Neighbour with a key', '', '', ''], ['Landlord / letting agent', '', '', ''], ['Carer / care agency', '', '', ''], ['', '', '', ''], ['', '', '', '']], { widths: ['22%', '28%', '18%'], rh: 10.4 })}`, { sect: 'About me' }));

// LEGAL
add('s-legal', sec('Section 2', 'Legal documents', 'Your will and powers of attorney decide who looks after your affairs. These pages record what exists and where the originals are kept.', ['My will', 'Power of attorney', 'Where my documents are']));
add('will', page(`${head('Legal', 'My will', 'Record the details here. Keep the signed original somewhere safe: a copy is not usually enough.')}
<div class="g2">${box('About my will', ynRow('I have a will') + ['Date signed', 'Original kept at', 'Copy kept at', 'Prepared by', 'Registered (e.g. Certainty) ref'].map(field).join(''))}
${box('People named in it', ['Executor 1', 'Executor 2', 'Guardian(s) for children', 'Trustees (if any)'].map(field).join('') + ynRow('Letter of wishes'), 'sage')}</div>
<div class="callout small"><b>Good to know across the UK.</b> In England, Wales and Northern Ireland, getting married or entering a civil partnership usually cancels an existing will, so you'd need a new one. This doesn't happen in Scotland. Scotland also gives a spouse, civil partner and children "legal rights" to part of the estate whatever the will says. If your life has changed since you made your will, ask a solicitor to check it.</div>
${box('Changes I want to make / questions for my solicitor', lines(), 'fill cream')}`, { sect: 'Legal' }));
add('poa', page(`${head('Legal', 'Power of attorney', 'A power of attorney lets someone you trust make decisions if you can\'t. It only works if it\'s made while you can still decide for yourself.')}
<div class="g3">${box('England &amp; Wales', '<p class="small">Lasting Power of Attorney (LPA). Two types: <b>property &amp; financial affairs</b>, and <b>health &amp; welfare</b>. Registered with the Office of the Public Guardian.</p>', 'cream')}
${box('Scotland', '<p class="small"><b>Continuing</b> (money and property) and <b>welfare</b> powers of attorney, often in one document. Registered with the Office of the Public Guardian (Scotland).</p>', 'sage')}
${box('Northern Ireland', '<p class="small">Usually an <b>Enduring Power of Attorney</b> for money and property, registered with the Office of Care and Protection when needed. The law is changing: check nidirect for current rules.</p>', 'cream')}</div>
${table(['Type', 'Attorney(s)', 'Date made', 'Registered?', 'Original kept'], [['Money &amp; property', '', '', '', ''], ['Health &amp; welfare', '', '', '', ''], ['Other', '', '', '', '']], { widths: ['22%', '28%', '14%', '14%'], rh: 12 })}
<div class="g2">${box('Who has a copy', blankCbs(4))}${box('Notes for my attorneys', lines(), 'sage')}</div>`, { sect: 'Legal' }));
add('docs', page(`${head('Legal', 'Where my documents are', 'One look at this page should tell anyone where to find each original.')}
${table(['Document', 'Where it\'s kept', 'Notes'], ['Birth certificate', 'Marriage / civil partnership certificate', 'Divorce / dissolution papers', 'Passport', 'Driving licence', 'Will and letter of wishes', 'Power of attorney', 'Property deeds / tenancy agreement', 'Mortgage papers', 'Pension statements', 'Insurance policies', 'Funeral plan', 'Vehicle log book (V5C)', 'Recent tax returns / P60s', 'Medical letters', '', ''].map((d) => [d, '', '']), { widths: ['34%', '36%'], rh: 9.6 })}`, { sect: 'Legal' }));

// HEALTH
add('s-health', sec('Section 3', 'Health &amp; care', 'If you\'re taken ill, the people with you will be asked about your health, medication and wishes. Help them answer.', ['My health', 'Medication', 'Care wishes', 'Organ and body donation', 'If I\'m in hospital']));
add('health', page(`${head('Health', 'My health', 'Keep this up to date, or note where an up-to-date list is kept.')}
<div class="g2">${box('Medical basics', ['GP surgery', 'GP phone', 'NHS / CHI / H&amp;C no. (where)', 'Blood group', 'Allergies', 'Organ donor decision recorded?'].map(field).join(''))}
${box('Specialists &amp; services', ['Consultant / hospital', 'Consultant / hospital', 'Pharmacy', 'Dentist', 'Optician'].map(field).join(''), 'sage')}</div>
${box('Conditions &amp; important history', lines(32), 'cream')}
${box('Medication', table(['Medicine', 'Dose', 'When', 'What for'], 9, { widths: ['32%', '16%', '18%'], rh: 8.6 }))}`, { sect: 'Health' }));
add('care', page(`${head('Health', 'My care wishes', 'What matters to you if you become seriously ill. Talk these through with your GP and family, too.')}
<div class="g2">${box('Documents I have', ynRow('Advance decision / directive') + ynRow('Advance statement of wishes') + ynRow('DNACPR form') + ynRow('ReSPECT / future care plan') + field('Kept at'))}
${box('Where I\'d prefer to be cared for', cbs(['At home', 'In a hospice', 'In hospital', 'In a care home', 'Wherever is best at the time']) + field('Other'), 'sage')}</div>
<div class="callout small">Rules differ across the UK. In England and Wales an advance decision to refuse treatment can be legally binding if made correctly. In Scotland and Northern Ireland advance directives are taken into account by doctors. Your GP can help you record your wishes properly.</div>
${box('People I\'d like with me', field('Names') + field('Faith / spiritual support'), 'sage')}
<div class="g2">${box('What matters most to me', lines(), 'cream')}${box('Things I would not want', lines())}</div>`, { sect: 'Health' }));
add('organ', page(`${head('Health', 'Organ &amp; body donation', 'Your decision, written down, makes things easier for your family at a very hard time.')}
<div class="callout sage small">All four UK nations now have an "opt-out" system: you are considered willing to donate unless you've recorded otherwise or are in an excluded group. Your family will still be asked, so tell them what you want. You can record or change your decision on the NHS Organ Donor Register.</div>
<div class="g2">${box('My decision', cbs(['I want to donate all my organs and tissue', 'I want to donate some (listed below)', 'I don\'t want to donate', 'I\'d like someone else to decide (named below)', 'I\'ve recorded this on the NHS Organ Donor Register']) + field('Date recorded'))}
${box('Details', ['Organs / tissue I\'m happy to donate', 'Faith or beliefs to respect', 'Person to decide for me', 'Their phone'].map(field).join(''), 'cream')}</div>
${box('Body donation for medical science', '<p class="small muted">This must be arranged in advance with a medical school, and they may not always be able to accept. Write the details here and keep the consent form with this binder.</p>' + ynRow('I\'ve arranged body donation') + ['Medical school', 'Phone', 'Consent form kept'].map(field).join(''), 'sage')}
${box('Anything else', lines(), 'fill')}`, { sect: 'Health' }));
add('hospital', page(`${head('Health', 'If I\'m in hospital', 'A quick plan so the people around you know what to do straight away.')}
<div class="g2">${box('Please call', ['First', 'Then', 'My employer (if working)', 'Anyone I care for'].map(field).join(''))}
${box('Please bring', cbs(['My medication and list', 'Glasses / hearing aids', 'Phone and charger', 'Comfortable clothes', 'Toiletries']) + blankCbs(2), 'sage')}</div>
<div class="g2">${box('At home, please', cbs(['Feed and care for my pets (see pets page)', 'Check the post', 'Check the fridge', 'Water the plants', 'Lock up and set the alarm']) + blankCbs(2), 'cream')}
${box('Bills that must not be missed', lines(), 'fill')}</div>
${box('Other things to know', lines(), 'fill sage')}`, { sect: 'Health' }));

// MONEY
add('s-money', sec('Section 4', 'Money', 'Your executors have to find every account, policy and debt. Most of the delay after a death comes from not knowing what exists. List them all here.', ['Bank accounts', 'Savings and investments', 'Pensions', 'Insurance', 'Debts and credit', 'Income and benefits', 'Bills and direct debits', 'Subscriptions']));
const tip = (t) => `<p class="tiny muted">${t}</p>`;
add('banks', page(`${head('Money', 'Bank &amp; building society accounts', 'Current accounts, savings accounts, joint accounts and business accounts.')}
<div class="tbl-fill">${table(['Bank', 'Type', 'Last 4 digits', 'Joint with', 'Online / app?', 'Notes'], 13, { widths: ['20%', '14%', '12%', '16%', '12%'], rh: 9.6 })}</div>
${tip('Only write the last four digits. Lost track of an old account? The free My Lost Account service (mylostaccount.org.uk) can search banks and building societies.')}`, { sect: 'Money' }));
add('savings', page(`${head('Money', 'Savings &amp; investments', 'ISAs, Premium Bonds, shares, funds and anything else you own.')}
<div class="tbl-fill">${table(['Provider', 'Type', 'Reference (last 4)', 'Approx. value', 'Notes'], 12, { widths: ['22%', '18%', '16%', '14%'], rh: 9.6 })}</div>
${box('Cryptocurrency or other digital assets', '<p class="tiny muted">Never write keys or recovery phrases here. Write which exchange or wallet you use and where your recovery information is securely stored.</p>' + ['Exchange / wallet', 'Recovery information kept'].map(field).join(''), 'cream')}`, { sect: 'Money' }));
add('pensions', page(`${head('Money', 'Pensions', 'Include every old workplace pension too. People often have several.')}
<div class="tbl-fill">${table(['Provider / employer', 'Type', 'Policy ref (last 4)', 'Nomination form done?', 'Notes'], 10, { widths: ['26%', '18%', '16%', '16%'], rh: 10 })}</div>
<div class="g2">${box('State Pension', ['Receiving? Since', 'Forecast checked (date)'].map(field).join(''), 'sage')}${box('Good to know', '<p class="tiny">Fill in an "expression of wish" or nomination form with each pension so the provider knows who you\'d like to benefit. Lost a pension? Try the free Pension Tracing Service on GOV.UK.</p>', 'cream')}</div>`, { sect: 'Money' }));
add('insurance', page(`${head('Money', 'Insurance &amp; plans', 'Some of these pay out when you die or become ill, so your family must know they exist.')}
${table(['Type', 'Provider', 'Policy ref', 'Renews', 'Notes'], [['Life insurance', '', '', '', ''], ['Life insurance (2)', '', '', '', ''], ['Critical illness', '', '', '', ''], ['Income protection', '', '', '', ''], ['Mortgage protection', '', '', '', ''], ['Death-in-service (work)', '', '', '', ''], ['Funeral plan', '', '', '', ''], ['Buildings', '', '', '', ''], ['Contents', '', '', '', ''], ['Car', '', '', '', ''], ['Pet', '', '', '', ''], ['Travel', '', '', '', ''], ['', '', '', '', '']], { widths: ['24%', '22%', '16%', '12%'], rh: 10.4 })}
${tip('Ask whether your life insurance is "written in trust". If it is, it can usually be paid to the people you chose faster and outside your estate.')}`, { sect: 'Money' }));
add('debts', page(`${head('Money', 'Debts &amp; credit', 'Mortgages, loans, credit cards, car finance and buy now, pay later.')}
<div class="tbl-fill">${table(['Lender', 'Type', 'Ref (last 4)', 'Approx. owed', 'Insured?', 'Notes'], 12, { widths: ['20%', '16%', '13%', '14%', '11%'], rh: 9.6 })}</div>
<div class="callout sage small">Debts are normally paid from the estate, not by family members personally, unless the debt was joint or someone was a guarantor. Your executor can ask a solicitor or Citizens Advice if unsure.</div>`, { sect: 'Money' }));
add('income', formPage('Money', 'Money', 'Income &amp; benefits', 'Money coming in that will need to be stopped or claimed.', [
  ['Work', ['Employer / business', 'Payroll contact', 'Paid into (bank)', 'Death-in-service benefit?']],
  ['Self-employed', ['Business name', 'Accountant', 'Business bank', 'Records kept']],
  ['Benefits', ['Benefit 1', 'Benefit 2', 'Benefit 3', 'Paid into (bank)']],
  ['Other income', ['Rental income', 'Investments / dividends', 'Money owed to me', 'Other']],
]));
add('bills', page(`${head('Money', 'Bills &amp; direct debits', 'Household bills that will need to be cancelled, transferred or kept running.')}
${table(['Bill', 'Company', 'Account ref', '£ / month', 'Paid from'], [['Council tax', '', '', '', ''], ['Mortgage / rent', '', '', '', ''], ['Electricity', '', '', '', ''], ['Gas', '', '', '', ''], ['Water', '', '', '', ''], ['Broadband', '', '', '', ''], ['Mobile phone', '', '', '', ''], ['TV Licence', '', '', '', ''], ['Home insurance', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']], { widths: ['22%', '24%', '18%', '12%'], rh: 10 })}`, { sect: 'Money' }));
add('subs', tablePage('Money', 'Money', 'Subscriptions &amp; memberships', 'Streaming, apps, gyms, magazines, charities, clubs. Many renew automatically.', ['Service', 'Cost', 'How often', 'Paid by (card / bank)', 'Cancel or keep?'], 15, ['26%', '12%', '14%', '24%']));

// HOME
add('s-home', sec('Section 5', 'Home &amp; belongings', 'The practical details of your home, car and the things that matter to you.', ['My home', 'Vehicles', 'Special belongings', 'Household know-how']));
add('home', page(`${head('Home', 'My home', 'Owned or rented, these are the details someone would need to look after it.')}
<div class="g2">${box('The property', cbs(['I own it (alone)', 'I own it jointly', 'I rent it', 'I live in someone else\'s home']) + ['Deeds / tenancy kept', 'Mortgage lender / landlord', 'Joint owner'].map(field).join(''))}
${box('Access', ['Spare keys held by', 'Alarm company', 'Alarm code is kept (not the code!)', 'Window keys', 'Garage / shed keys'].map(field).join(''), 'sage')}</div>
${box('Where things are', `<div class="g2">${['Stopcock', 'Fuse box', 'Gas meter', 'Electric meter', 'Boiler &amp; manual', 'Bin day', 'Smoke alarms', 'Spare bulbs &amp; batteries'].map(field).join('')}</div>`, 'cream')}
${box('Other properties (holiday home, land, rented out)', lines(), 'fill')}`, { sect: 'Home' }));
add('vehicles', page(`${head('Home', 'Vehicles', 'Cars, motorbikes, caravans and anything with a log book.')}
<div class="g2">${[1, 2].map((n) => box(`Vehicle ${n}`, ['Make &amp; model', 'Registration', 'Log book (V5C) kept', 'Finance company', 'Insurer', 'Breakdown cover', 'MOT due', 'Spare key'].map(field).join(''), n === 2 ? 'cream' : '')).join('')}</div>
${box('Other (caravan, bike, boat, mobility scooter)', lines(), 'fill sage')}
${tip('If a vehicle is on finance, it may belong to the finance company until it\'s paid off. Tell DVLA when the keeper of a vehicle dies (Tell Us Once can do this in most cases).')}`, { sect: 'Home' }));
add('belongings', page(`${head('Home', 'Special belongings', 'Things with financial or sentimental value, and who you\'d like to have them.')}
<div class="tbl-fill">${table(['Item', 'Where it is', 'I\'d like it to go to', 'In my will?'], 13, { widths: ['30%', '24%', '30%'], rh: 9.8 })}</div>
<div class="callout small">This page isn't legally binding. To make sure someone receives a particular item, include it in your will or a letter of wishes and ask your solicitor how to do this.</div>`, { sect: 'Home' }));
add('knowhow', page(`${head('Home', 'Household know-how', 'The things only you know about running your home.')}
<div class="g2">${box('Routines &amp; quirks', lines(), 'fill')}${box('Trusted trades', ['Plumber', 'Electrician', 'Boiler engineer', 'Handyperson', 'Cleaner', 'Gardener', 'Window cleaner'].map(field).join(''), 'sage')}</div>
${box('Things that need doing each season', table(['Spring', 'Summer', 'Autumn', 'Winter'], 4, { rh: 12 }), 'cream')}`, { sect: 'Home' }));

// DIGITAL
add('s-digital', sec('Section 6', 'Digital life', 'Phones, emails, photos and social media. Without a plan, these can be lost for good or left online forever.', ['Devices and access', 'Email and key accounts', 'Social media wishes', 'Photos and files']));
add('devices', page(`${head('Digital', 'Devices &amp; access', 'Don\'t write passwords or PINs here. Record how someone you trust can get access safely.')}
${table(['Device', 'Make / model', 'Where it is', 'How to get access (no codes)'], [['Phone', '', '', ''], ['Laptop / computer', '', '', ''], ['Tablet', '', '', ''], ['Smart watch', '', '', ''], ['', '', '', '']], { widths: ['18%', '20%', '18%'], rh: 10.4 })}
<div class="g2">${box('Password manager', ['Which one', 'Emergency access set up for', 'Date set up'].map(field).join('') + '<p class="tiny muted" style="margin-top:1mm">Most password managers (such as 1Password, Bitwarden, Apple Passwords or Google Password Manager) let you share access safely in an emergency.</p>')}
${box('Phone &amp; email accounts', ['Main email', 'Other email', 'Mobile network', 'Apple ID / Google account email'].map(field).join(''), 'sage')}</div>
${box('Legacy settings I\'ve turned on', cbs(['Apple Legacy Contact (Settings › your name › Sign-In &amp; Security)', 'Google Inactive Account Manager (myaccount.google.com)', 'Facebook legacy contact', 'Password manager emergency access']), 'cream')}`, { sect: 'Digital' }));
add('social', page(`${head('Digital', 'Online accounts &amp; my wishes', 'Tell people what you\'d like to happen to each account: keep, memorialise or close.')}
<div class="tbl-fill">${table(['Account', 'Username / email', 'Keep / memorialise / close', 'Legacy contact set?', 'Notes'], [['Facebook', '', '', '', ''], ['Instagram', '', '', '', ''], ['X / Threads / TikTok', '', '', '', ''], ['LinkedIn', '', '', '', ''], ['YouTube / Google', '', '', '', ''], ['Amazon', '', '', '', ''], ['eBay / Vinted / Etsy', '', '', '', ''], ['PayPal', '', '', '', ''], ['Online shops', '', '', '', ''], ['Gaming / other', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']], { widths: ['18%', '24%', '20%', '14%'], rh: 9.8 })}</div>
${tip('PayPal and online accounts holding money or store credit should be listed in your money pages too. Websites can be domain names you own and renew each year.')}`, { sect: 'Digital' }));
add('photos', page(`${head('Digital', 'Photos, files &amp; memories', 'Your photos are often the thing your family will treasure most.')}
<div class="g2">${box('Where my photos are', cbs(['iCloud Photos', 'Google Photos', 'On my phone only', 'On my computer', 'External drive / USB', 'Printed albums', 'Facebook / Instagram']) + field('Other'))}
${box('Important files', ['Family history', 'Recipes', 'Videos', 'Writing / music', 'Work files'].map(field).join(''), 'sage')}</div>
${box('Who should get copies, and anything private that should be deleted', lines(), 'fill cream')}`, { sect: 'Digital' }));

// PEOPLE & PETS
add('s-people', sec('Section 7', 'People &amp; pets', 'Anyone (or any animal) who depends on you needs a plan, right away.', ['People I care for', 'My pets\' care plan', 'People to tell']));
add('dependants', page(`${head('People', 'People I care for', 'Children, a partner, an older parent or anyone who relies on you.')}
<div class="g2">${[1, 2].map((n) => box(`Person ${n}`, ['Name', 'Relationship', 'Needs / routines', 'School / care provider', 'Medication', 'Who should step in', 'Their phone'].map(field).join(''), n === 2 ? 'cream' : '')).join('')}</div>
${box('Things they find comforting / routines to keep', lines(), 'fill sage')}`, { sect: 'People' }));
add('pets', page(`${head('Pets', 'My pets\' care plan', 'Who will look after them, and everything that person needs to know.')}
<div class="g2">${[1, 2].map((n) => box(`Pet ${n}`, ['Name &amp; species', 'Age / breed', 'Microchip no. / database', 'Vet &amp; phone', 'Insurance', 'Food &amp; amount', 'Medication', 'Who will take them'].map(field).join(''), n === 2 ? 'sage' : '')).join('')}</div>
${box('Routines, likes and fears', lines(), 'fill cream')}
<div class="callout small">Some UK charities offer free rehoming promises for pets whose owners die: for example Dogs Trust's Canine Care Card and Cats Protection's Cat Guardians. Check their websites for current details.${field('Scheme &amp; reference')}</div>`, { sect: 'Pets' }));
add('tell', tablePage('People', 'People', 'People to tell', 'Friends, groups, clubs and colleagues who\'d want to know. Your family will use this list.', ['Name / group', 'How they know me', 'Phone / email', 'Told'], 16, ['30%', '24%', '30%']));

// FUNERAL
add('s-funeral', sec('Section 8', 'Funeral wishes', 'Your family will want to get it right. Telling them what you want takes a huge weight off their shoulders.', ['My funeral wishes', 'Music, readings and words', 'My story']));
add('funeral', page(`${head('Funeral', 'My funeral wishes', 'Tick what you\'d like. Leave anything you\'re happy for your family to decide.')}
<div class="g3">${box('I would like', cbs(['Burial', 'Cremation', 'Direct cremation (no service)', 'Natural / woodland burial', 'My family to decide']))}
${box('The service', cbs(['Religious', 'Non-religious / humanist', 'Celebration of life', 'Private, family only', 'Open to everyone']), 'sage')}
${box('Afterwards', cbs(['Wake / gathering', 'Ashes scattered', 'Ashes kept', 'Headstone / plaque', 'Memorial tree']), 'cream')}</div>
<div class="g2">${box('Details', ['Funeral director', 'Venue', 'Celebrant / minister', 'Burial / scattering place', 'What people should wear', 'Flowers or donations to'].map(field).join(''))}
${box('Funeral plan', ynRow('I have a prepaid funeral plan') + ['Provider', 'Plan number', 'Paperwork kept', 'What it covers'].map(field).join('') + '<p class="tiny muted" style="margin-top:1mm">Funeral plan providers have been regulated by the Financial Conduct Authority since 2022.</p>', 'sage')}</div>
${box('Anything else about the day', lines(), 'fill cream')}`, { sect: 'Funeral' }));
add('music', page(`${head('Funeral', 'Music, readings &amp; words', 'The songs, poems and words that feel like you.')}
${table(['When', 'Song, hymn, poem or reading', 'Read / sung by'], [['Arriving', '', ''], ['During the service', '', ''], ['During the service', '', ''], ['Reading', '', ''], ['Reading', '', ''], ['Leaving', '', ''], ['At the gathering', '', '']], { widths: ['20%', '52%'], rh: 10.6 })}
<div class="g2">${box('People I\'d like to speak', lines(), 'sage')}${box('Things I\'d love people to remember', lines(), 'cream')}</div>`, { sect: 'Funeral' }));
add('story', page(`${head('Funeral', 'My story', 'Notes for whoever writes your eulogy or obituary. A few words each is plenty.')}
<div class="g2">${['Where I grew up', 'Work I did', 'People who shaped me', 'Things I loved', 'Proudest moments', 'Funny stories'].map((l, i) => box(l, lines(28), i % 3 === 1 ? 'sage' : i % 3 === 2 ? 'cream' : '')).join('')}</div>
${box('How I\'d like to be remembered', lines(), 'fill')}`, { sect: 'Funeral' }));

// LETTERS
add('s-letters', sec('Section 9', 'Letters', 'Sometimes the most important thing in the binder isn\'t a policy number. It\'s a few words for the people you love.', ['Letters to loved ones', 'Write as many as you like', 'Seal them in an envelope if you prefer']));
for (let i = 0; i < 3; i++) {
  add(i === 0 ? 'letters' : null, page(`<div class="row" style="flex:none;align-items:flex-end"><div><div class="kicker">Letters</div><h1 class="sm">A letter for you</h1></div><div style="flex:none;width:70mm">${field('To')}${field('Date')}</div></div>
${box('', lines(0, 9), 'fill')}`, { sect: 'Letters' }));
}

// KEEPING CURRENT
add('review', page(`${head('Keeping it current', 'Yearly review', 'Pick a date you\'ll remember (a birthday, or the first week of January) and check the binder once a year.')}
<div class="g2">${box('Review these every year', cbs(['Bank accounts and savings', 'Pensions (any new ones?)', 'Insurance renewals', 'Bills and subscriptions', 'Contacts and phone numbers', 'Medication', 'Digital accounts and legacy settings', 'Where this binder is kept']))}
${box('Update straight away if', cbs(['You marry, divorce or separate', 'You have a baby or a grandchild', 'You move house', 'You change job or retire', 'Someone named in your will dies', 'You get a new pet', 'You\'re diagnosed with a serious illness']), 'sage')}</div>
${box('Review log', table(['Date', 'What I updated', 'Initials'], 8, { widths: ['20%', '64%'], rh: 9 }), 'fill')}`, { sect: 'Keeping current' }));
add('help', page(`${head('Keeping it current', 'Useful UK services', 'Free and official places to find help. Search the names to find current contact details.')}
<div class="g2">${[
  ['GOV.UK / mygov.scot / nidirect', 'Official guidance on wills, powers of attorney, probate and confirmation for each nation.'],
  ['Office of the Public Guardian', 'Lasting Power of Attorney in England and Wales. Scotland has its own Office of the Public Guardian (Scotland).'],
  ['NHS Organ Donor Register', 'Record or change your organ donation decision online.'],
  ['Pension Tracing Service', 'Free GOV.UK service to find contact details for old workplace and personal pensions.'],
  ['My Lost Account', 'Free service to search for lost bank, building society and NS&amp;I accounts.'],
  ['Citizens Advice', 'Free, independent advice on money, debt, benefits and legal questions.'],
  ['Law Society / Law Society of Scotland / Law Society of NI', 'Find a solicitor near you for wills and powers of attorney.'],
  ['Dying Matters / Compassion in Dying', 'Support with talking about death and planning end of life care.'],
].map(([h, t], i) => box('', `<h3>${h}</h3><p class="small">${t}</p>`, i % 3 === 0 ? 'cream' : i % 3 === 2 ? 'sage' : '')).join('')}</div>
<div class="callout small">Details change. Always check official websites for current rules and costs. This binder is a record-keeping tool and doesn't give legal, financial or medical advice.</div>`, { sect: 'Keeping current', deco: 'small' }));
add('notes', page(`${head('Notes', 'Notes', '')}${box('', lines(), 'fill')}`, { sect: 'Notes' }));

// contents page
const tocItems = [['Where this binder lives', 'found'], ['1 · About me', 's-about'], ['Personal details', 'personal'], ['Family and important contacts', 'family'], ['2 · Legal documents', 's-legal'], ['My will', 'will'], ['Power of attorney', 'poa'], ['Where my documents are', 'docs'], ['3 · Health &amp; care', 's-health'], ['My health and care wishes', 'health'], ['Organ donation', 'organ'], ['If I\'m in hospital', 'hospital'], ['4 · Money', 's-money'], ['Accounts, savings and pensions', 'banks'], ['Insurance and debts', 'insurance'], ['Bills and subscriptions', 'bills'], ['5 · Home &amp; belongings', 's-home'], ['6 · Digital life', 's-digital'], ['7 · People &amp; pets', 's-people'], ['8 · Funeral wishes', 's-funeral'], ['9 · Letters', 's-letters'], ['Yearly review and useful services', 'review']];
pages[ids.contents - 1] = page(`${head('Contents', 'What\'s inside', '')}
<div style="flex:1;max-width:150mm">${tocItems.map(([t, id]) => `<div class="toc" style="padding:1.7mm 0;font-size:9.6pt">${/^\d/.test(t) ? `<b style="color:var(--sage-deep);font-weight:600">${t}</b>` : `<span style="padding-left:6mm">${t}</span>`}<span>${ids[id]}</span></div>`).join('')}</div>
<div class="callout sage small">Also included: <b>Life Admin Register.xlsx</b>, a spreadsheet for the details that change often (accounts, bills, renewals). It works in Excel, Google Sheets and Numbers.</div>`, { sect: 'Contents', cls: 'nofill' });

module.exports = {
  file: 'Just-in-Case-Binder',
  short: S,
  title: T,
  fillable: true,
  pages,
  css: CSS2,
  freebie: [ids.found, ids.docs, ids.devices],
  ids,
  meta: {
    short: 'The Just in<br>Case Binder', kicker: 'UK · Printable + fillable PDF · Spreadsheet', sub: 'Everything your people would need to know, in one safe place.',
    hero: [1, ids.banks], grid: [[ids.personal, 'Personal details'], [ids.will, 'Will &amp; attorney'], [ids.banks, 'Accounts &amp; pensions'], [ids.devices, 'Digital legacy'], [ids.pets, 'Pet care plan'], [ids.funeral, 'Funeral wishes']],
    included: '50-page PDF (A4 + US Letter, print or type in) plus the Life Admin Register spreadsheet', detail: ids.will, detailTitle: 'Made for the UK, all four nations', detailPoints: ['Wills and attorney rules by nation', 'Organ donation opt-out explained', 'Type in, or print and write', 'Life Admin spreadsheet included'],
    features: [['About me', 'Personal details, family and key contacts'], ['Legal &amp; health', 'Will, power of attorney, care wishes, organ donation'], ['Money &amp; home', 'Accounts, pensions, insurance, debts, bills, property'], ['Digital &amp; wishes', 'Online accounts, pets, funeral wishes, letters']],
    pins: [['What to write down for your family', 'The UK just in case checklist', ids.personal], ['Digital legacy checklist', 'Phones, emails and social media', ids.devices], ['Where are your important documents?', 'Free printable page', ids.docs]],
    listing: {
      price: '£19.95', title: 'Just in Case Binder UK, Fillable PDF Life Admin Planner, Legacy Binder, Estate Planning Organiser, In Case of Emergency, Spreadsheet',
      tags: ['just in case binder', 'legacy binder', 'life admin planner', 'estate planning', 'in case i die', 'emergency binder', 'death planner uk', 'funeral wishes', 'end of life planner', 'fillable pdf', 'important documents', 'family organiser', 'uk printable'],
      hook: 'If something happened to you tomorrow, could your family find your bank, your pension, your will and your pet\'s vet?',
      body: ['The Just in Case Binder puts everything your loved ones would need in one calm, organised place. Written for the UK, with notes where England & Wales, Scotland and Northern Ireland differ.',
        'Type straight into the fillable PDF on your computer, or print it and fill it in by hand. A companion spreadsheet (Excel and Google Sheets) keeps track of the details that change often and adds them up for you.',
        'INSIDE (50 pages):\n• Where this binder lives and who knows\n• Personal details, family and important contacts\n• My will and power of attorney (by UK nation)\n• Where my documents are\n• My health, medication and care wishes\n• Organ and body donation\n• If I\'m in hospital: a quick plan\n• Bank accounts, savings, investments and pensions\n• Insurance, debts, income and benefits\n• Bills, direct debits and subscriptions\n• My home, vehicles and special belongings\n• Devices, online accounts and digital legacy settings\n• People I care for and my pets\' care plan\n• Funeral wishes, music and readings, my story\n• Letters to loved ones\n• Yearly review and useful UK services',
        'SPREADSHEET (Life Admin Register):\n• Dashboard: savings, pensions, debts and monthly bills at a glance\n• Bills and subscriptions with monthly and yearly totals\n• Insurance renewals that light up 60 days before they\'re due\n• Accounts, debts, documents, contacts and digital accounts\n• A filled-in example to show you how it works',
        'PLEASE NOTE: never write passwords or full account numbers in the binder. It\'s a record-keeping tool and doesn\'t replace a will or power of attorney.'],
      pinCopy: [['The just in case binder every UK family needs', 'Accounts, will, pensions, pets and funeral wishes in one place.'], ['What to write down for your family (UK)', 'A calm checklist for the paperwork nobody talks about.'], ['Digital legacy: what happens to your accounts?', 'Facebook, Google, Apple: the settings to turn on today.'], ['Where are your important documents?', 'Free printable page from the Just in Case Binder.'], ['Plan your funeral wishes', 'Music, readings and the little things that matter.']],
      prompts: ['A sage green ring binder lying open on a light oak desk with blank white printed pages, a pair of reading glasses, a cup of tea and a small vase of dried lavender, soft natural window light, warm cream and muted sage green palette with terracotta accents, calm Scandinavian styling, photorealistic, 4:5'],
    },
  },
};
