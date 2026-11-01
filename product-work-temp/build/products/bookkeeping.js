const { page, cover, lines, cbs, blankCbs, field, table, box, dots5 } = require('../lib');
const { CSS2, head, tablePage, cardsPage, checkPage, formPage } = require('../lib2');

const T = 'The UK Small Business Bookkeeping Kit';
const S = 'Bookkeeping Kit';
const pages = [];
const ids = {};
const add = (id, pg) => { if (id) ids[id] = pages.length + 1; pages.push(pg); };
const TAXM = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
const CATS = ['Cost of goods / materials', 'Car, van &amp; travel', 'Wages &amp; staff', 'Rent, rates, power &amp; insurance', 'Repairs &amp; maintenance', 'Phone, internet, stationery &amp; office', 'Advertising &amp; marketing', 'Bank &amp; card charges', 'Accountancy &amp; legal fees', 'Other allowable costs'];

add('cover', null);
add('welcome', page(`<div class="kicker">Start here</div><h1>Simple books, less stress</h1>
<p class="lead">Keeping records doesn't have to be complicated. Ten minutes a week with these pages, and your Self Assessment (or your accountant's bill) gets a lot easier.</p>
<div class="g2">${box('Inside', cbs(['Key UK dates and figures', 'Business details page', 'Monthly income and expenses logs', 'Expense categories made simple', 'Mileage and working from home', 'Invoices and unpaid invoices', 'Monthly, quarterly and annual summaries', 'Tax pot calculator', 'Self Assessment checklist', 'Equipment log and weekly money routine']))}
${box('The ten-minute weekly routine', `<div class="step"><div class="n">1</div><div class="small">Log this week's income.</div></div><div class="step"><div class="n">2</div><div class="small">Log expenses and file the receipts.</div></div><div class="step"><div class="n">3</div><div class="small">Log business miles.</div></div><div class="step"><div class="n">4</div><div class="small">Chase any unpaid invoices.</div></div><div class="step"><div class="n">5</div><div class="small">Move money into your tax pot.</div></div>`, 'sage')}</div>
<div class="callout"><p class="tiny"><b>Please note:</b> this kit helps you keep organised records. It isn't tax or accounting advice. Tax rules, rates and thresholds change, so check GOV.UK or speak to an accountant about your own situation.</p></div>`, { sect: 'Welcome', deco: 'tr' }));
add('dates', page(`${head('Know the basics', 'Key UK dates &amp; figures', 'For sole traders using Self Assessment. Check GOV.UK each year for any changes.')}
<div class="g2">${box('Key dates', `${[['Tax year runs', '6 April to 5 April'], ['Register for Self Assessment', 'By 5 October after the tax year you started'], ['Paper tax return deadline', '31 October'], ['Online tax return deadline', '31 January'], ['Pay tax owed (balancing payment)', '31 January'], ['Payments on account (if they apply)', '31 January and 31 July']].map(([a, b]) => `<div style="display:flex;justify-content:space-between;gap:3mm;border-bottom:.6pt solid var(--line);padding:1.4mm 0" class="small"><b>${a}</b><span class="muted" style="text-align:right">${b}</span></div>`).join('')}`, 'cream')}
${box('Useful figures (2026/27)', `${[['Trading allowance', '£1,000 of gross trading income'], ['VAT registration threshold', '£90,000 turnover in any 12 months'], ['Simplified mileage (cars and vans)', '45p a mile for the first 10,000, then 25p'], ['Working from home flat rate', '£10, £18 or £26 a month (25–50, 51–100, 101+ hours)']].map(([a, b]) => `<div style="display:flex;justify-content:space-between;gap:3mm;border-bottom:.6pt solid var(--line);padding:1.4mm 0" class="small"><b>${a}</b><span class="muted" style="text-align:right">${b}</span></div>`).join('')}`)}</div>
${box('Making Tax Digital for Income Tax', '<p class="small">HMRC is moving sole traders and landlords to digital records and quarterly updates. It started in April 2026 for qualifying income over £50,000, is due to apply from April 2027 for income over £30,000, and is planned for income over £20,000 from April 2028. If it applies to you, you\'ll need compatible software, but these pages still help you keep on top of your numbers.</p>', 'sage')}
${box('My notes for this tax year', lines(), 'fill')}`, { sect: 'Know the basics', deco: 'small' }));
add('details', formPage('Business details', 'Business details', 'My business details', 'Keep these together. Never write passwords here.', [
  ['Business', ['Business name', 'What I do', 'Start date', 'Trading as']], ['HMRC', ['UTR (Unique Taxpayer Reference)', 'National Insurance number', 'VAT number (if registered)', 'Self Assessment registered on']],
  ['Bank', ['Business bank', 'Account name', 'Accounting software']], ['Contacts', ['Accountant', 'Phone', 'Insurer', 'Policy number']],
]));
add('categories', cardsPage('Know the basics', 'Know the basics', 'Expense categories made simple', 'Allowable expenses are costs you have "wholly and exclusively" for your business. These categories match the ones on the Self Assessment form.', CATS.map((c, i) => [c, ['Stock, materials and things you buy to resell.', 'Fuel, repairs, parking, train fares (or use simplified mileage instead).', 'Staff wages, subcontractors, pensions.', 'Business premises costs and business insurance.', 'Repairs to business equipment and property.', 'Business phone, broadband, postage, printing, software.', 'Ads, website, business cards, marketplace promoted listings.', 'Business bank charges, card fees, payment processing fees.', 'Accountant\'s fees, professional fees.', 'Anything else allowable. Check GOV.UK if unsure.'][i]]), { cols: 2 }));
add('income', page(`${head('Monthly records', 'Monthly income log', 'Print one for each month.')}<div class="row" style="flex:none">${field('Month')}${field('Tax year')}</div>
<div class="tbl-fill">${table(['Date', 'Customer / platform', 'Description', 'Invoice no.', 'Amount £', 'Paid how'], 18, { widths: ['11%', '22%', '28%', '13%', '13%'], rh: 9 })}</div>
${box('', `<div class="row"><b style="color:var(--sage-deep)">Total income this month £</b><span class="muted small">Carry to the monthly summary</span></div>`, 'sage')}`, { sect: 'Monthly records' }));
add('expenses', page(`${head('Monthly records', 'Monthly expenses log', 'Write the category number (from the categories page) next to each one.')}<div class="row" style="flex:none">${field('Month')}${field('Tax year')}</div>
<div class="tbl-fill">${table(['Date', 'Supplier', 'What', 'Cat. no.', 'Amount £', 'Receipt?'], 18, { widths: ['11%', '22%', '30%', '10%', '13%'], rh: 9 })}</div>
${box('', `<div class="row"><b style="color:var(--sage-deep)">Total expenses this month £</b><span class="muted small">Carry to the monthly summary</span></div>`, 'clay')}`, { sect: 'Monthly records' }));
add('mileage', page(`${head('Monthly records', 'Mileage log', 'Business journeys only (not your normal commute). Record each trip.')}<div class="row" style="flex:none">${field('Month')}${field('Vehicle')}</div>
<div class="tbl-fill">${table(['Date', 'From', 'To', 'Purpose', 'Miles'], 18, { widths: ['12%', '20%', '20%', '34%'], rh: 9 })}</div>
${box('', `<div class="row">${field('Total business miles')}${field('× rate')}${field('= £')}</div>`, 'cream')}`, { sect: 'Monthly records' }));
add('wfh', page(`${head('Monthly records', 'Working from home log', 'If you use the flat rate, record the hours you work from home each month.')}
${table(['Month', 'Hours worked at home', 'Flat rate band', '£'], TAXM.map((m) => [m, '', '', '']).concat([['<b>Total</b>', '', '', '']]), { widths: ['16%', '30%', '30%'], rh: 10.4 })}
<p class="tiny muted">Flat rates (check GOV.UK): 25–50 hours £10, 51–100 hours £18, 101+ hours £26 per month. You can't use the flat rate and also claim the same household costs separately.</p>`, { sect: 'Monthly records' }));
add('invoices', tablePage('Invoices', 'Invoices', 'Invoice log', 'Number your invoices in order and track when they\'re paid.', ['Invoice no.', 'Date sent', 'Customer', 'Amount £', 'Due', 'Paid on'], 18, ['14%', '14%', '28%', '14%', '14%']));
add('unpaid', page(`${head('Invoices', 'Unpaid invoice chaser', 'A polite nudge usually works. Track every reminder.')}
${table(['Customer', 'Invoice', '£', 'Due', '1st reminder', '2nd reminder', 'Paid'], 12, { widths: ['22%', '12%', '10%', '12%', '15%', '15%'], rh: 11 })}
${box('Reminder wording', '<p class="small">"Hi [name], I hope you\'re well. Just a friendly reminder that invoice [number] for £[amount] was due on [date]. I\'ve attached it again for you. Please let me know if you have any questions. Thank you!"</p>', 'cream')}`, { sect: 'Invoices' }));
add('monthly', page(`${head('Summaries', 'Monthly summary', 'Fill in at the end of each month from your logs.')}
${table(['Month', 'Income £', 'Expenses £', 'Profit £', 'Miles', 'Tax pot £'], TAXM.map((m) => [m, '', '', '', '', '']).concat([['<b>Total</b>', '', '', '', '', '']]), { widths: ['14%'], rh: 10.6 })}`, { sect: 'Summaries' }));
add('quarterly', page(`${head('Summaries', 'Quarterly summary', 'Useful for Making Tax Digital updates, or just a check-in every three months.')}
${['6 Apr – 5 Jul', '6 Jul – 5 Oct', '6 Oct – 5 Jan', '6 Jan – 5 Apr'].map((q, i) => box(`Quarter ${i + 1}: ${q}`, `<div class="row">${field('Income £')}${field('Expenses £')}${field('Profit £')}</div><div class="row">${field('Submitted / checked on')}${field('Notes')}</div>`, i % 2 ? 'cream' : '')).join('')}`, { sect: 'Summaries' }));
add('annual', page(`${head('Summaries', 'Annual summary', 'Your year at a glance, ready for your tax return or accountant.')}<div class="row" style="flex:none">${field('Tax year')}</div>
<div class="g2">${box('Income', field('Total sales / turnover £') + field('Other business income £') + `<div class="field" style="font-weight:600;color:var(--sage-deep)"><span>Total income £</span><i></i></div>`, 'sage')}
${box('Expenses by category', CATS.map((c, i) => `<div class="field"><span>${i + 1}. ${c}</span><i></i></div>`).join('') + `<div class="field" style="font-weight:600;color:var(--sage-deep)"><span>Total expenses £</span><i></i></div>`)}</div>
${box('', `<div class="row" style="align-items:center"><b style="color:var(--sage-deep);font-size:11pt">Profit (income − expenses) £</b><span style="flex:2;border-bottom:1pt solid var(--clay);height:7mm"></span></div>`, 'clay')}`, { sect: 'Summaries' }));
add('taxpot', page(`${head('Tax', 'Tax pot calculator', 'Set money aside as you go, so January isn\'t a shock. Many people save a fixed percentage of every payment.')}
${box('My savings rule', `<div class="row">${field('I save')}${field('% of every payment into')}${field('account')}</div><p class="tiny muted">Not sure what percentage? An accountant can help you work it out from your expected profit.</p>`, 'cream')}
${table(['Date', 'Payment received £', '% saved', 'Amount saved £', 'Pot total £'], 18, { widths: ['14%', '24%', '14%', '24%'], rh: 9 })}`, { sect: 'Tax' }));
add('sachecklist', checkPage('Tax', 'Tax', 'Self Assessment checklist', 'Work through this before your tax return.', [
  ['Gather', ['Annual summary completed', 'Total income and expenses', 'Mileage total', 'Working from home total', 'Equipment bought this year', 'Bank statements']],
  ['Other income', ['Employment income (P60)', 'Savings interest', 'Rental income', 'Pension contributions', 'Gift Aid donations', 'Student loan details']],
  ['Do it', ['Log in to HMRC online account', 'Complete the return', 'Check every figure', 'Submit before 31 January', 'Pay tax owed by 31 January', 'Note any payments on account']],
  ['After', ['Save a copy of the return', 'Keep records for at least 5 years after the 31 January deadline', 'Start next year\'s folder', 'Celebrate!']],
]));
add('equipment', tablePage('Records', 'Records', 'Equipment &amp; assets log', 'Bigger items you buy for the business, like a laptop, camera or sewing machine.', ['Date bought', 'Item', 'Supplier', 'Cost £', 'Business use %', 'Notes'], 14, ['13%', '28%', '18%', '12%', '13%']));
add('receipts', checkPage('Records', 'Records', 'Receipt habits', 'Good habits mean you never lose a receipt (or a tax deduction) again.', [
  ['Daily', ['Photograph paper receipts straight away', 'Forward email receipts to one folder', 'Put paper receipts in this month\'s envelope']],
  ['Weekly', ['Match receipts to the expenses log', 'Write the category number on each', 'Back up photos to the cloud']],
  ['Monthly', ['Check bank statement against logs', 'File the month\'s envelope', 'Fill in the monthly summary']],
  ['My system', ['Folder / app I use:', 'Where paper receipts go:', 'Backup:']],
]));

pages[0] = cover({ kicker: 'For sole traders, makers & side hustlers', title: 'The UK<br>Bookkeeping<br>Kit', lead: 'Simple monthly income and expense logs, mileage, invoices, a tax pot, summaries and a Self Assessment checklist, with UK dates and figures.', tags: [`${pages.length} pages`, 'UK tax year', 'Print at home'], bottom: 'A record-keeping tool, not tax advice. Always check GOV.UK or ask an accountant.' });

module.exports = {
  file: 'UK-Small-Business-Bookkeeping-Kit', short: S, title: T, pages, css: CSS2, freebie: [ids.dates, ids.categories],
  meta: {
    short: 'The UK<br>Bookkeeping Kit', kicker: 'Sole traders · UK tax year · Print at home', sub: 'Ten minutes a week, and January stops being scary.',
    hero: [1, ids.expenses], grid: [[ids.dates, 'Key UK dates & figures'], [ids.income, 'Monthly income log'], [ids.expenses, 'Monthly expenses log'], [ids.mileage, 'Mileage log'], [ids.monthly, 'Monthly summary'], [ids.sachecklist, 'Self Assessment checklist']],
    detail: ids.dates, detailTitle: 'UK dates and figures in one place', detailPoints: ['Self Assessment deadlines', 'Trading allowance and VAT threshold', 'Mileage and working-from-home rates', 'Making Tax Digital timeline'],
    features: [['Monthly logs', 'Income, expenses, mileage and working from home'], ['Invoices', 'Invoice log and a polite unpaid invoice chaser'], ['Summaries', 'Monthly, quarterly (MTD friendly) and annual'], ['Tax ready', 'Tax pot calculator and Self Assessment checklist']],
    pins: [['Self-employed in the UK?', 'Simple printable bookkeeping', ids.income], ['Key UK tax dates for sole traders', 'A free printable cheat sheet', ids.dates], ['What expenses can I claim?', 'Expense categories made simple', ids.categories]],
    listing: {
      price: '£5.95', title: 'UK Bookkeeping Printable, Self Employed Income Expense Tracker, Sole Trader Accounts, Mileage Log, Self Assessment Checklist, Tax Planner',
      tags: ['bookkeeping', 'self employed uk', 'sole trader', 'expense tracker', 'income tracker', 'small business', 'mileage log', 'tax planner', 'self assessment', 'business finance', 'accounts book', 'side hustle', 'invoice tracker'],
      hook: 'Ten minutes a week, and January stops being scary.',
      body: ['A simple printable record-keeping kit for UK sole traders, makers, Etsy sellers and side hustlers. Organised by the UK tax year, with key dates and figures and a weekly ten-minute routine.',
        'INSIDE:\n• Key UK dates and figures (2026/27), including the Making Tax Digital timeline\n• My business details\n• Expense categories made simple\n• Monthly income log and monthly expenses log (print 12)\n• Mileage log and working-from-home log\n• Invoice log and unpaid invoice chaser\n• Monthly, quarterly and annual summaries\n• Tax pot calculator\n• Self Assessment checklist\n• Equipment log and receipt habits',
        'A record-keeping tool, not tax advice. Tax rules change, so check GOV.UK or speak to an accountant.'],
      pinCopy: [['Self-employed bookkeeping made simple (UK)', 'Monthly income and expenses, mileage, invoices and a tax pot. Printable.'], ['UK tax dates for sole traders: free cheat sheet', 'Self Assessment deadlines, allowances and rates in one place.'], ['What expenses can I claim as a sole trader?', 'The Self Assessment expense categories, made simple.'], ['How to save for your tax bill', 'A printable tax pot calculator for the self-employed.'], ['Unpaid invoice? Polite reminder wording', 'Plus a tracker for chasing payments.']],
      prompts: ['A neat desk with a calculator, a folder of receipts, a laptop and a blank printed A4 ledger page with a pen, calm natural light, warm cream and sage palette, photorealistic, 4:5'],
    },
  },
};
