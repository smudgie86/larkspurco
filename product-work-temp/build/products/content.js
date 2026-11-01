const { page, cover, lines, cbs, blankCbs, field, table, box, dots5 } = require('../lib');
const { CSS2, head, tablePage, cardsPage, checkPage, formPage, undatedMonth } = require('../lib2');

const T = 'The Social Media & Pinterest Content Planner';
const S = 'Content Planner';
const pages = [];
const ids = {};
const add = (id, pg) => { if (id) ids[id] = pages.length + 1; pages.push(pg); };

const IDEAS = {
  'Behind the scenes': ['A day in your life running the business', 'Your workspace tour', 'How a product is made, start to finish', 'Packing an order', 'Your tools and favourite supplies', 'A mistake you made and what you learned', 'Your morning routine before work', 'The messy middle of a project', 'What a busy week really looks like', 'Your first ever product vs now', 'Unboxing a supplies delivery', 'Time-lapse of you working', 'Your to-do list for the week', 'Where the magic happens: your desk, honestly', 'Your favourite part of the job'],
  'Helpful &amp; how-to': ['Three tips for using your product', 'How to care for your product', 'A common mistake people make (and the fix)', 'Myth vs fact in your niche', 'Your top tool recommendations', 'A beginner\'s guide to your topic', 'A checklist people can save', 'How you solved a common problem', 'A quick tutorial', 'Answers to your most-asked question', 'What to look for when buying', 'A before and after', 'Seasonal tips', 'Your process, step by step', 'A free printable or resource'],
  'Products &amp; offers': ['New product reveal', 'Best seller spotlight', 'Product close-up details', 'Three ways to use or style it', 'Gift guide for a certain person', 'Restock announcement', 'Limited edition or seasonal item', 'Bundle or offer', 'Product comparison: which one is for you?', 'The story behind a product', 'Last chance post', 'Customer favourite of the month', 'Sneak peek of something coming', 'Price and value: what\'s included', 'A product in real life'],
  'Customers &amp; community': ['A customer review (with permission)', 'A customer photo (with permission)', 'Thank-you post for a milestone', 'Ask a question', 'Poll: which colour or design next?', 'Answer a question from a follower', 'This or that', 'Share a small business you love', 'Celebrate a follower milestone', 'Fill-in-the-blank post', 'Ask for product ideas', 'A giveaway (check platform rules)', 'Customer story or case study', 'FAQ round-up', 'Shout-out to your local community'],
  'Personal &amp; story': ['Why you started your business', 'Introduce yourself (again!)', 'Your values', 'A lesson learned this year', 'Your workspace pet or companion', 'What a slow day looks like', 'Something that inspires you', 'A goal you\'re working towards', 'A win you\'re proud of', 'What you do when you\'re not working', 'Your favourite books, podcasts or music', 'A throwback photo', 'How you deal with busy seasons', 'Your plans for the next year', 'A note of thanks to your followers'],
  'Seasonal &amp; trending': ['New Year intentions', 'Valentine\'s gift ideas', 'Mother\'s Day (UK, March)', 'Spring refresh', 'Easter', 'Summer holidays', 'Back to school', 'Autumn cosy season', 'Halloween', 'Black Friday / Small Business Saturday', 'Christmas gift guide', 'Last posting dates reminder', 'Year in review', 'Awareness days relevant to you', 'Local events and markets'],
};

add('cover', null);
add('welcome', page(`<div class="kicker">Start here</div><h1>Post with a plan</h1>
<p class="lead">Show up consistently without staring at a blank screen every day. Plan your content in batches, reuse what works, and let Pinterest bring buyers to you for months.</p>
<div class="g2">${box('Inside', cbs(['Content pillars and ideal customer', '100 post ideas', 'Caption formula and hook ideas', 'Keyword and hashtag bank', 'Monthly content calendars', 'Weekly content planner', 'Pinterest pin planner and board plan', 'Batch day plan and repurposing map', 'Stats tracker and collaborations']))}
${box('The simple system', `<div class="step"><div class="n">1</div><div class="small">Pick <b>3–5 content pillars</b>.</div></div><div class="step"><div class="n">2</div><div class="small">Plan the month on the <b>calendar</b>.</div></div><div class="step"><div class="n">3</div><div class="small"><b>Batch</b> a week's content in one sitting.</div></div><div class="step"><div class="n">4</div><div class="small"><b>Repurpose</b> each idea across platforms.</div></div><div class="step"><div class="n">5</div><div class="small"><b>Review</b> what worked each month.</div></div>`, 'sage')}</div>`, { sect: 'Welcome', deco: 'tr' }));
add('pillars', page(`${head('Foundations', 'Content pillars', 'Three to five themes you post about again and again. Every post should fit one.')}
<div class="g2">${[1, 2, 3, 4, 5].map((n) => box(`Pillar ${n}`, field('Theme') + field('Why it matters to my audience') + field('Post types'), n % 2 ? 'cream' : '')).join('')}${box('My goal for social media', lines(), 'sage fill')}</div>`, { sect: 'Foundations' }));
add('customer', formPage('Foundations', 'Foundations', 'My ideal customer', 'Write for one person and the right people will find you.', [
  ['Who they are', ['Age range', 'Life stage', 'Where they live', 'What they do']], ['Online', ['Platforms they use', 'Accounts they follow', 'When they scroll', 'What they search for']],
  ['Problems &amp; wants', lines(46)], ['What they need to hear from me', lines(46)],
]));
Object.entries(IDEAS).forEach(([cat, list], i) => {
  if (i % 2 === 0) {
    const two = Object.entries(IDEAS).slice(i, i + 2);
    add(i === 0 ? 'ideas' : null, page(`${head('Ideas', `100 post ideas (${i / 2 + 1} of 3)`, 'Tick them off as you use them. Most can be reused every few months.')}
<div class="g2">${two.map(([c, l], j) => box(c, cbs(l.map((x) => `<span class="small">${x}</span>`)), j ? 'sage' : '')).join('')}</div>`, { sect: 'Ideas' }));
  }
});
add('captions', page(`${head('Writing', 'Caption formula &amp; hooks', 'The first line decides whether people keep reading.')}
${box('The caption formula', `${[['Hook', 'Stop the scroll with a question, bold statement or relatable moment.'], ['Story or value', 'Share the tip, story, behind the scenes or product detail.'], ['Call to action', 'Tell them what to do: save, share, comment, tap the link.']].map(([h, t], i) => `<div class="step"><div class="n">${i + 1}</div><div class="small"><b>${h}:</b> ${t}</div></div>`).join('')}`, 'cream')}
<div class="g2">${box('Hook ideas', cbs(['"Nobody tells you this about..."', '"Three mistakes I made when..."', '"If you only do one thing today..."', '"Save this for later:"', '"The question I get asked most..."', '"POV: you..."', '"Here\'s how I..."', '"Stop scrolling if you..."']))}
${box('Call to action ideas', cbs(['Save this for later', 'Share with a friend who needs it', 'Tell me in the comments...', 'Tap the link to shop', 'Join my email list', 'Which one would you choose?', 'Follow for more...', 'Send me a message']), 'sage')}</div>
${box('My best-performing hooks', lines(), 'fill')}`, { sect: 'Writing', deco: 'small' }));
add('keywords', page(`${head('Writing', 'Keyword &amp; hashtag bank', 'Pinterest and search work on keywords. Collect the words your customers use.')}
<div class="g3 grow">${['Main keywords', 'Product keywords', 'Problem keywords', 'Seasonal keywords', 'Hashtags (Instagram)', 'Hashtags (TikTok)'].map((x, i) => box(x, lines(), i % 3 === 1 ? 'cream' : '')).join('')}</div>`, { sect: 'Writing' }));
add('month', page(`${head('Planning', 'Monthly content calendar', 'Print one per month. Note what goes out where.')}
<div class="row" style="flex:none">${field('Month')}${field('Focus / launch')}</div>
<div class="grow">${undatedMonth('mon', 30)}</div>
<div class="g3">${box('Key dates', blankCbs(3), 'clay')}${box('Products to push', blankCbs(3))}${box('Pins to make', blankCbs(3), 'sage')}</div>`, { sect: 'Planning', cls: 'nofill' }));
add('week', page(`${head('Planning', 'Weekly content planner', '')}<div class="row" style="flex:none">${field('Week of')}</div>
${table(['Day', 'Platform', 'Pillar', 'Post idea / hook', 'Made', 'Posted'], ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => [`<b>${d}</b>`, '', '', '', '', '']), { widths: ['8%', '16%', '14%', '44%', '8%'], rh: 20 })}
${box('Stories / extra ideas', lines(), 'fill cream')}`, { sect: 'Planning' }));
add('pinterest', page(`${head('Pinterest', 'Pinterest pin planner', 'Make 3–4 different pins for every product or post, each with a different angle. Fresh pins keep working for months.')}
${table(['Product / post', 'Pin angle', 'Pin title (with keywords)', 'Board', 'Link', 'Pinned'], 14, { widths: ['18%', '16%', '30%', '14%', '12%'], rh: 11 })}
<div class="callout sage"><p class="small"><b>Angle ideas:</b> the problem it solves · what's inside · the result · a gift idea · a how-to · a free sample. Space out pins to the same link rather than posting them all at once.</p></div>`, { sect: 'Pinterest' }));
add('boards', page(`${head('Pinterest', 'Board plan', 'Boards named with the words people search for help your pins get found.')}
<div class="g2 grow">${[1, 2, 3, 4, 5, 6].map((n) => box(`Board ${n}`, field('Board name') + field('Keywords') + field('Description') + `<div class="small" style="margin-top:1.4mm">Pins this month ○ ○ ○ ○ ○ ○ ○ ○ ○ ○</div>`, n % 3 === 1 ? 'cream' : '')).join('')}</div>`, { sect: 'Pinterest' }));
add('batch', page(`${head('Workflow', 'Batch day plan', 'Make a week or a month of content in one focused session.')}
${table(['Step', 'Task', 'Done'], [['1', 'Pick ideas from the 100 list and calendar', ''], ['2', 'Write all captions and hooks', ''], ['3', 'Take photos / film clips in one go', ''], ['4', 'Edit photos and videos', ''], ['5', 'Design pins and graphics', ''], ['6', 'Schedule everything', ''], ['7', 'Note what to post live (stories)', ''], ['', '', ''], ['', '', '']], { widths: ['8%', '80%'], rh: 10 })}
<div class="g2">${box('Props &amp; outfits', lines(30))}${box('Locations &amp; lighting', lines(30), 'sage')}</div>`, { sect: 'Workflow' }));
add('repurpose', page(`${head('Workflow', 'Repurposing map', 'One idea, many posts. Write the main idea in the middle, then plan each version.')}
<div class="box cream" style="text-align:center;padding:5mm"><div class="label" style="text-align:center">The big idea</div>${lines(16)}</div>
<div class="g3 grow">${['Instagram post', 'Reel / TikTok', 'Stories', 'Pinterest pins', 'Email newsletter', 'Blog / website'].map((x, i) => box(x, lines(), i % 2 ? 'sage' : '')).join('')}</div>`, { sect: 'Workflow' }));
add('stats', page(`${head('Results', 'Monthly stats tracker', 'Track a few numbers that matter. Look for trends, not perfection.')}
${table(['Month', 'Followers', 'Reach / views', 'Saves', 'Link clicks', 'Pin impressions', 'Outbound clicks', 'Sales from social'], ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => [m, '', '', '', '', '', '', '']), { widths: ['9%'], rh: 11 })}
${box('Top posts this year', lines(), 'fill sage')}`, { sect: 'Results' }));
add('collabs', tablePage('Results', 'Results', 'Collaborations &amp; outreach', 'Other businesses, creators and features you\'d like to work with.', ['Name', 'Platform', 'Idea', 'Contacted', 'Outcome'], 14, ['20%', '14%', '34%', '14%']));

pages[0] = cover({ kicker: 'For small businesses & creators', title: 'Social Media<br>&amp; Pinterest<br>Content Planner', lead: '100 post ideas, content pillars, monthly calendars, a weekly planner, a Pinterest pin planner, batch day plan, repurposing map and stats tracker.', tags: [`${pages.length} pages`, 'Undated', 'Print at home'], bottom: 'Show up consistently, without the daily blank-screen panic.' });

module.exports = {
  file: 'Social-Media-Pinterest-Content-Planner', short: S, title: T, pages, css: CSS2, freebie: [ids.ideas, ids.pinterest],
  meta: {
    short: 'Social Media &amp;<br>Content Planner', kicker: '100 post ideas · Pinterest planner · Undated', sub: 'Plan, batch and repurpose your content, and let Pinterest bring buyers to you.',
    hero: [1, ids.ideas], grid: [[ids.pillars, 'Content pillars'], [ids.ideas, '100 post ideas'], [ids.captions, 'Caption formula & hooks'], [ids.month, 'Monthly calendar'], [ids.pinterest, 'Pinterest pin planner'], [ids.repurpose, 'Repurposing map']],
    detail: ids.pinterest, detailTitle: 'A Pinterest plan that keeps working', detailPoints: ['3–4 pins per product, different angles', 'Keyword-rich pin titles', 'Board plan with search terms', 'Track pin impressions and clicks'],
    features: [['Never run out of ideas', '100 post ideas across six themes'], ['Write better captions', 'Formula, hooks and calls to action'], ['Plan & batch', 'Monthly calendar, weekly planner and batch day'], ['Pinterest built in', 'Pin planner, board plan and stats']],
    pins: [['100 social media post ideas', 'For small businesses and makers', ids.ideas], ['How to plan Pinterest pins', 'A printable pin planner', ids.pinterest], ['Caption formula that works', 'Hook, value, call to action', ids.captions]],
    listing: {
      price: '£5.95', title: 'Social Media Planner Printable, Content Calendar, 100 Post Ideas, Pinterest Pin Planner, Instagram Planner, Small Business Marketing PDF',
      tags: ['social media planner', 'content planner', 'content calendar', 'post ideas', 'pinterest planner', 'instagram planner', 'marketing planner', 'small business', 'content creator', 'social media', 'business planner', 'blog planner', 'etsy seller'],
      hook: 'Plan, batch and repurpose your content, and let Pinterest bring buyers to you.',
      body: ['A printable content planner for small businesses, makers and creators. Never stare at a blank screen again: pick your pillars, choose from 100 post ideas, plan the month, batch a week in one sitting, and turn every idea into posts, pins and emails.',
        'INSIDE:\n• Content pillars and ideal customer\n• 100 post ideas in six categories\n• Caption formula, hook ideas and calls to action\n• Keyword and hashtag bank\n• Monthly content calendar (undated)\n• Weekly content planner\n• Pinterest pin planner and board plan\n• Batch day plan and repurposing map\n• Monthly stats tracker\n• Collaborations and outreach tracker'],
      pinCopy: [['100 social media post ideas for small businesses', 'Behind the scenes, how-tos, products, community, stories and seasonal. Free sample inside.'], ['How to plan Pinterest pins for your products', '3–4 pins per product, each with a different angle.'], ['The caption formula: hook, value, call to action', 'Plus hook ideas you can use today.'], ['Batch a week of content in one afternoon', 'A step-by-step batch day plan.'], ['Turn one idea into ten posts', 'A printable repurposing map.']],
      prompts: ['A flat lay of a smartphone showing a blank screen, a blank printed A4 content calendar page, a coffee and a ring light edge in soft focus, bright natural light, warm cream and sage palette, photorealistic, 4:5'],
    },
  },
};
