const { page, cover, lines, cbs, blankCbs, field, table, box, dots5 } = require('../lib');
const { CSS2, head, tablePage, cardsPage, checkPage, formPage } = require('../lib2');

const T = 'The Etsy & Handmade Seller Planner';
const S = 'Seller Planner';
const pages = [];
const ids = {};
const add = (id, pg) => { if (id) ids[id] = pages.length + 1; pages.push(pg); };
const MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

add('cover', null);
add('welcome', page(`<div class="kicker">Start here</div><h1>Your shop, organised</h1>
<p class="lead">Product ideas, pricing, listings, orders, stock, stats and seasonal planning: everything a small handmade or digital shop needs, in one printable planner.</p>
<div class="g2">${box('Inside', cbs(['Shop setup checklist and brand basics', 'Product idea bank and development sheet', 'Pricing worksheet', 'Keyword research and listing checklist', 'Listing tracker and photo shot list', 'Orders, stock, materials and suppliers', 'Monthly stats and goals', 'Seasonal selling calendar', 'Message templates and a year in review']))}
${box('Works for', cbs(['Etsy shops', 'Handmade and craft businesses', 'Digital product sellers', 'Folksy, Not On The High Street and your own website', 'Craft fair sellers (see the stock pages)']), 'sage')}</div>
<p class="tiny muted">Marketplace fees and rules change. Always check the current fees and seller policies on the platform you use.</p>`, { sect: 'Welcome', deco: 'tr' }));
add('setup', checkPage(S, 'Getting set up', 'Shop setup checklist', 'Tick these off before (or soon after) you open.', [
  ['Shop basics', ['Shop name chosen and checked', 'Logo and banner', 'Shop announcement written', 'About section with your story and photo', 'Shop policies (returns, processing times)', 'FAQs']],
  ['Listings', ['At least 10 listings to start', 'Photos for every slot you can fill', 'Titles and all tags filled in', 'Clear descriptions with sizes and materials', 'Shipping profiles set up', 'Digital files tested (for downloads)']],
  ['Business', ['Registered as self-employed if needed (UK: check the £1,000 trading allowance)', 'Separate bank account', 'Record keeping set up', 'Product safety and labelling checked for what you sell', 'Packaging ordered']],
  ['Marketing', ['Instagram / TikTok / Pinterest accounts', 'Pinterest boards for your products', 'Email list sign-up', 'Business cards or thank-you cards']],
]));
add('brand', formPage(S, 'Getting set up', 'Brand basics', 'Clear on these? Every listing, photo and post gets easier.', [
  ['My shop', ['Shop name', 'What I sell', 'Price range', 'Shop in five words']], ['My ideal customer', ['Who they are', 'What they care about', 'Where they hang out online', 'What they\'re searching for']],
  ['My style', ['Colours', 'Fonts', 'Photo style', 'Words that describe my brand']], ['What makes me different', lines(40)],
]));
add('ideas', tablePage('Products', 'Products', 'Product idea bank', 'Every idea goes here. Score them before you make anything.', ['Idea', 'Who it\'s for', 'Demand ○○○', 'Effort ○○○', 'Do it?'], 18, ['34%', '24%', '13%', '13%']));
add('dev', page(`${head('Products', 'Product development sheet', 'Print one per product.')}
<div class="g2">${box('The product', field('Name') + field('Who it\'s for') + field('Problem it solves') + field('Sizes / variations'))}${box('Research', field('Similar listings found') + field('Their prices') + field('Their best reviews say') + field('Gap I can fill'), 'cream')}</div>
<div class="g2">${box('Materials &amp; time', table(['Item', 'Cost £'], 6, { widths: ['72%'], rh: 7.6 }) + field('Time to make'))}${box('Pricing', field('Total cost £') + field('Price £') + field('Profit per sale £') + field('Launch date'), 'sage')}</div>
${box('Notes &amp; sketches', '', 'fill')}`, { sect: 'Products' }));
add('pricing', page(`${head('Products', 'Pricing worksheet', 'Underpricing is the most common mistake for makers. Count everything.')}
${box('', table(['', 'Product A', 'Product B', 'Product C'], [['Materials £', '', '', ''], ['Packaging £', '', '', ''], ['Hours to make', '', '', ''], ['× hourly rate £', '', '', ''], ['= Labour £', '', '', ''], ['Overheads per item £', '', '', ''], ['<b>Total cost £</b>', '', '', ''], ['Marketplace fees £', '', '', ''], ['Postage charged £', '', '', ''], ['<b>Price £</b>', '', '', ''], ['<b>Profit £</b>', '', '', '']], { widths: ['34%'], rh: 9.6 }))}
<div class="callout"><p class="small"><b>Fees:</b> look up the platform's current listing fee, transaction fee, payment processing fee and any advertising or currency fees, and include them here. They change from time to time.</p></div>
${box('Competitor prices', table(['Shop', 'Product', 'Price £'], 4, { widths: ['34%', '46%'], rh: 8 }), 'cream')}`, { sect: 'Products' }));
add('keywords', page(`${head('Listings', 'Keyword research', 'Think like a buyer: what would they type into the search bar? Use the search bar\'s suggestions for ideas.')}
${box('', field('Product'), 'cream')}
<div class="g2">${box('What buyers might search', blankCbs(8))}${box('Long-tail phrases (3–4 words)', blankCbs(8), 'sage')}</div>
${box('My 13 tags (check each one fits the character limit)', `<div class="g3">${Array.from({ length: 13 }, (_, i) => `<div class="cb line small">${i + 1}.</div>`).join('')}</div>`)}
${box('Title draft (most important words first)', lines(), 'fill')}`, { sect: 'Listings' }));
add('listcheck', checkPage('Listings', 'Listings', 'Listing checklist', 'Run through this for every new listing.', [
  ['Photos', ['Bright, natural light', 'First photo clear at thumbnail size', 'Scale shot (in a hand or in use)', 'Detail close-ups', 'Lifestyle photo', 'Video if you can']],
  ['Words', ['Title starts with what it is', 'All tags used, no repeats of the category', 'Description answers size, materials, care and delivery', 'Personalisation instructions clear', 'Digital: what files are included']],
  ['Settings', ['Correct category and attributes', 'Price checked against the pricing worksheet', 'Shipping profile and processing time', 'Quantity and variations set', 'Sections chosen']],
  ['After publishing', ['Pin it to Pinterest', 'Share on social', 'Add to email newsletter', 'Check stats in two weeks']],
]));
add('listings', tablePage('Listings', 'Listings', 'Listing tracker', '', ['Product', 'Listed on', 'Price', 'Views', 'Favourites', 'Sales', 'Update?'], 16, ['28%', '13%', '10%', '10%', '12%', '10%']));
add('photos', checkPage('Listings', 'Listings', 'Photo shot list', 'Plan the shots before you set up, so one photo session covers lots of listings.', [
  ['Must-have shots', ['Hero shot on a plain background', 'Scale / in-hand shot', 'Close-up of texture or detail', 'Every colour or variation', 'Packaging shot']],
  ['Lifestyle shots', ['In use, in a real setting', 'Styled with props', 'Gift-giving moment', 'Seasonal styling']],
  ['Props to gather', ['', '', '', '']], ['Products to shoot this session', ['', '', '', '']],
]));
add('orders', tablePage('Orders', 'Orders', 'Order tracker', '', ['Order date', 'Customer', 'Item', 'Dispatch by', 'Made', 'Sent', 'Tracking'], 18, ['13%', '18%', '25%', '13%', '8%', '8%']));
add('stock', tablePage('Stock', 'Stock', 'Stock &amp; materials', 'Track what you have so you can reorder before you run out.', ['Item', 'Supplier', 'In stock', 'Reorder at', 'Cost £', 'Ordered'], 18, ['30%', '20%', '12%', '12%', '12%']));
add('suppliers', tablePage('Stock', 'Stock', 'Suppliers', '', ['Supplier', 'What', 'Website / contact', 'Minimum order', 'Delivery time'], 14, ['22%', '22%', '26%', '15%']));
add('stats', page(`${head('Stats', 'Monthly stats', 'A quick snapshot each month. Look for trends, not perfection.')}
${table(['Month', 'Visits', 'Views', 'Orders', 'Conversion %', 'Revenue £', 'Ad spend £', 'Reviews'], MON.map((m) => [m.slice(0, 3), '', '', '', '', '', '', '']), { widths: ['10%'], rh: 11 })}
${box('Best sellers this year', lines(), 'fill sage')}`, { sect: 'Stats' }));
add('goals', page(`${head('Planning', 'Monthly goals', 'Print one each month.')}<div class="row" style="flex:none">${field('Month')}</div>
<div class="g3">${box('Sales goal', field('Orders') + field('Revenue £'), 'clay')}${box('New listings', blankCbs(4))}${box('Marketing', blankCbs(4), 'sage')}</div>
<div class="g2">${box('Products to make', blankCbs(6))}${box('Admin &amp; money', blankCbs(6), 'cream')}</div>
${box('How did it go?', lines(), 'fill')}`, { sect: 'Planning' }));
add('seasons', page(`${head('Planning', 'Seasonal selling calendar (UK)', 'Buyers start searching weeks before each event. Aim to list 6–8 weeks ahead (even earlier for Christmas).')}
${table(['Month', 'Key dates &amp; events', 'List by', 'My products'], [['Jan', 'New Year, Burns Night, Valentine\'s prep', '', ''], ['Feb', 'Valentine\'s Day, Mother\'s Day prep', '', ''], ['Mar', 'Mother\'s Day (UK), Easter (some years)', '', ''], ['Apr', 'Easter, spring, weddings', '', ''], ['May', 'Weddings, teacher gifts prep', '', ''], ['Jun', 'Father\'s Day, end of term', '', ''], ['Jul', 'Teacher thank-yous, summer holidays', '', ''], ['Aug', 'Back to school, Halloween prep', '', ''], ['Sep', 'Back to school, autumn, Christmas prep starts', '', ''], ['Oct', 'Halloween, Christmas listings live', '', ''], ['Nov', 'Black Friday, Christmas peak', '', ''], ['Dec', 'Last posting dates, Christmas, New Year', '', '']], { widths: ['9%', '43%', '14%'], rh: 13 })}`, { sect: 'Planning' }));
add('messages', cardsPage('Customers', 'Customers', 'Message templates', 'Friendly, ready-to-adapt wording for common messages.', [
  ['Thank you for your order', '"Thank you so much for your order! I\'m getting started on it now and will let you know as soon as it\'s on its way."'], ['Dispatched', '"Good news: your order is on its way! Here\'s your tracking link. I hope you love it."'],
  ['Delay', '"I\'m so sorry, your order is running a little behind. It will be dispatched by [date]. Thank you for your patience."'], ['Personalisation check', '"Before I start, could you check the spelling and details below are exactly right?"'],
  ['Review request', '"If you have a moment, I\'d really appreciate a review. It helps a small business like mine." (Never offer anything in return for a review.)'], ['Problem with an order', '"I\'m so sorry to hear that. I\'d love to put it right. Could you send a photo, and I\'ll sort a replacement or refund."'],
]));
add('year', page(`${head('Reflect', 'Year in review', 'Celebrate how far your shop has come.')}
<div class="g3">${box('Orders', '<div style="font-size:15pt;color:var(--sage-deep);font-weight:600;margin-top:1mm">&nbsp;</div>', 'cream')}${box('Revenue £', '<div style="font-size:15pt;color:var(--sage-deep);font-weight:600;margin-top:1mm">£</div>', 'cream')}${box('Reviews', '<div style="font-size:15pt;color:var(--sage-deep);font-weight:600;margin-top:1mm">&nbsp;</div>', 'cream')}</div>
<div class="g2">${box('Best sellers', lines(36), 'clay')}${box('Proudest moments', lines(36), 'sage')}${box('What didn\'t work', lines(36))}${box('Next year I want to', lines(36))}</div>`, { sect: 'Reflect', deco: 'small' }));

pages[0] = cover({ kicker: 'For Etsy, handmade & digital sellers', title: 'The Etsy &amp;<br>Handmade Seller<br>Planner', lead: 'Product ideas, pricing, keywords, listings, orders, stock, monthly stats and a UK seasonal selling calendar, all in one printable planner.', tags: [`${pages.length} pages`, 'Undated', 'Print at home'], bottom: 'Made by a fellow Etsy seller in Glasgow.' });

module.exports = {
  file: 'Etsy-Handmade-Seller-Planner', short: S, title: T, pages, css: CSS2, freebie: [ids.pricing, ids.listcheck],
  meta: {
    short: 'Etsy &amp; Handmade<br>Seller Planner', kicker: 'Undated · Print at home · UK friendly', sub: 'Everything a small handmade or digital shop needs, in one planner.',
    hero: [1, ids.pricing], grid: [[ids.setup, 'Shop setup checklist'], [ids.pricing, 'Pricing worksheet'], [ids.keywords, 'Keyword research'], [ids.orders, 'Order tracker'], [ids.stats, 'Monthly stats'], [ids.seasons, 'Seasonal calendar']],
    detail: ids.pricing, detailTitle: 'Price for profit, not guesswork', detailPoints: ['Materials, labour and overheads', 'Marketplace fees and postage', 'Compare three products side by side', 'Check against competitors'],
    features: [['Products', 'Idea bank, development sheet and pricing worksheet'], ['Listings', 'Keyword research, listing checklist and tracker'], ['Orders & stock', 'Orders, stock, materials and suppliers'], ['Growth', 'Monthly stats, goals, seasonal calendar and message templates']],
    pins: [['Etsy seller planner printable', 'Products, listings, orders and stats', ids.orders], ['How to price handmade items', 'A free pricing worksheet', ids.pricing], ['When to list for Christmas', 'A UK seasonal selling calendar', ids.seasons]],
    listing: {
      price: '£6.95', title: 'Etsy Seller Planner Printable, Small Business Planner, Handmade Business, Pricing Worksheet, Order Tracker, Inventory, Listing Tracker PDF',
      tags: ['etsy seller', 'etsy planner', 'seller planner', 'small business', 'handmade business', 'craft business', 'order tracker', 'inventory tracker', 'pricing worksheet', 'shop planner', 'etsy shop', 'business planner', 'listing tracker'],
      hook: 'Everything a small handmade or digital shop needs, in one planner.',
      body: ['A printable planner for Etsy sellers, makers and digital product shops. Plan products, price for profit, research keywords, track listings, orders and stock, and plan around the UK selling seasons.',
        'INSIDE:\n• Shop setup checklist and brand basics\n• Product idea bank and product development sheet\n• Pricing worksheet (materials, labour, overheads, fees)\n• Keyword research page and listing checklist\n• Listing tracker and photo shot list\n• Order tracker\n• Stock & materials and suppliers\n• Monthly stats and monthly goals\n• UK seasonal selling calendar\n• Customer message templates\n• Year in review'],
      pinCopy: [['Etsy seller planner: get your shop organised', 'Products, pricing, listings, orders, stock and stats. Printable.'], ['How to price handmade items (free worksheet)', 'Materials, labour, overheads and fees, side by side.'], ['When to list for Christmas on Etsy (UK)', 'A month-by-month seasonal selling calendar.'], ['Etsy keyword research worksheet', 'Find search phrases and fill all 13 tags.'], ['Etsy listing checklist', 'Photos, titles, tags and descriptions before you hit publish.']],
      prompts: ['A maker\'s workbench with handmade candles and kraft packaging, a blank printed A4 planner page in the foreground with a pen, soft natural light, warm cream and sage palette, photorealistic, 4:5'],
    },
  },
};
