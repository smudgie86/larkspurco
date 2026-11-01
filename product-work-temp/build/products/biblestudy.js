const { page, cover, section, lines, cbs, blankCbs, field, table, box } = require('../lib');
const { CSS2, head, tablePage, cardsPage, checkPage, formPage } = require('../lib2');

const T = 'The Bible Study Planner';
const S = 'Bible Study Planner';
const pages = [];
const ids = {};
const add = (id, pg) => { if (id) ids[id] = pages.length + 1; pages.push(pg); };
const css = CSS2 + `
.tk{display:inline-block;width:3mm;height:3mm;border:.8pt solid var(--sage);border-radius:.8mm;margin-right:1.6mm;vertical-align:-.3mm}
.verse{font-size:15pt;line-height:1.4;color:var(--sage-deep);font-weight:500;max-width:150mm}
.ref{font-size:8pt;letter-spacing:.16em;text-transform:uppercase;color:var(--clay-deep);font-weight:600;margin-top:3mm}
.soapL{display:flex;gap:3mm;align-items:flex-start}
.soapL b{flex:none;width:9mm;height:9mm;border-radius:50%;background:var(--sage);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12pt}
.bk{display:grid;grid-template-columns:repeat(3,1fr);gap:0 4mm;font-size:8pt}
`;
const NT = [['Matt', 28], ['Mark', 16], ['Luke', 24], ['John', 21], ['Acts', 28], ['Rom', 16], ['1 Cor', 16], ['2 Cor', 13], ['Gal', 6], ['Eph', 6], ['Phil', 4], ['Col', 4], ['1 Thess', 5], ['2 Thess', 3], ['1 Tim', 6], ['2 Tim', 4], ['Titus', 3], ['Phlm', 1], ['Heb', 13], ['Jas', 5], ['1 Pet', 5], ['2 Pet', 3], ['1 John', 5], ['2 John', 1], ['3 John', 1], ['Jude', 1], ['Rev', 22]];
const CH = NT.flatMap(([b, n]) => Array.from({ length: n }, (_, i) => `${b} ${i + 1}`));
if (CH.length !== 260) throw new Error('NT chapters ' + CH.length);
const OTB = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Songs', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'];
const NTB = ['Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'];
if (OTB.length !== 39 || NTB.length !== 27) throw new Error('books');

add('cover', cover({
  kicker: 'Undated · Any translation · Print at home',
  title: 'The Bible Study Planner',
  lead: 'A calm, simple space to read, study and pray through the Bible.',
  tags: ['SOAP study', 'NT in a year', 'Prayer journal', 'Sermon notes'],
  bottom: '"Your word is a lamp to my feet, and a light for my path." Psalm 119:105 (World English Bible)',
}));
add('welcome', page(`<div class="kicker">Start here</div><h1>Welcome</h1>
<p class="lead">This planner gives your Bible reading a gentle shape: a place to slow down, notice what the passage says, and bring it into everyday life and prayer.</p>
<p>It works with any translation and any church background, and it's undated, so you can start on any day. Use as much or as little as helps you. A short, honest study beats a long one you never begin.</p>
<div class="g2">${box('Inside', cbs(['My study year: goals and rhythm', 'New Testament in a year: 5 short readings a week', 'Books of the Bible tracker', 'SOAP study pages', 'Book, character, word and topical studies', 'Verse mapping', 'Sermon and small group notes', 'Prayer list and ACTS prayer journal', 'Scripture memory and gratitude', 'Monthly reflections']))}
${box('Ways to use it', cbs(['Morning quiet time with a cup of tea', 'Alongside your church\'s sermon series', 'With a friend or small group', 'Print only the pages you need, as often as you like', 'Missed a day? Just carry on from where you are']), 'sage')}</div>`, { sect: 'Welcome', deco: 'tr' }));
add('contents', null);
add('year', page(`${head('Getting started', 'My study year', 'A few minutes now makes it easier to keep going later.')}
<div class="g2">${box('My rhythm', ['Translation I\'m using', 'Days I\'ll read', 'Time of day', 'Where I\'ll sit', 'How long (10 minutes is plenty)'].map(field).join(''))}
${box('Who\'s with me', ['Reading buddy', 'Small group / church', 'Pastor or leader', 'Checking in on'].map(field).join(''), 'sage')}</div>
${box('What I\'d love to grow in this year', lines(34), 'cream')}
${box('Books or topics I want to study', lines(26))}
${box('My prayer for this season', lines(), 'fill sage')}`, { sect: 'Getting started' }));

// reading plan
for (let q = 0; q < 4; q++) {
  const weeks = Array.from({ length: 13 }, (_, i) => q * 13 + i);
  add(q === 0 ? 'plan' : null, page(`${head('Reading plan', `New Testament in a year${q ? ' (continued)' : ''}`, q === 0 ? 'Five short readings a week, Monday to Friday. Weekends are for catching up or resting. Tick each one as you read.' : `Weeks ${q * 13 + 1}–${q * 13 + 13}`)}
${table(['Week', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'], weeks.map((w) => [`<b>${w + 1}</b>`, ...[0, 1, 2, 3, 4].map((d) => `<span class="tk"></span>${CH[w * 5 + d]}`)]), { widths: ['10%'], rh: 12.4, cls: 'nofields' })}`, { sect: 'Reading plan' }));
}
add('books', page(`${head('Reading plan', 'Books of the Bible', 'Tick each book when you\'ve read it all the way through. No rush: this can take years.')}
${box('Old Testament', `<div class="bk">${OTB.map((b) => `<div class="cb" style="margin:.7mm 0">${b}</div>`).join('')}</div>`)}
${box('New Testament', `<div class="bk">${NTB.map((b) => `<div class="cb" style="margin:.7mm 0">${b}</div>`).join('')}</div>`, 'sage')}`, { sect: 'Reading plan' }));

// SOAP
add('soaphow', page(`${head('Study methods', 'How SOAP works', 'A simple four-step way to study any passage, used by churches all over the world.')}
${[['S', 'Scripture', 'Read the passage slowly. Write out the verse or phrase that stands out to you.'], ['O', 'Observation', 'What does it say? Who is speaking, to whom, and why? What words repeat? What does it show about God?'], ['A', 'Application', 'What does this mean for my life today? Is there something to believe, change, stop, start or thank God for?'], ['P', 'Prayer', 'Talk to God about what you\'ve read. Keep it simple and honest.']].map(([l, h, t], i) => box('', `<div class="soapL"><b>${l}</b><div><h3>${h}</h3><p class="small">${t}</p></div></div>`, i % 2 ? 'sage' : 'cream')).join('')}
<div class="callout"><div class="ref" style="margin:0 0 1.5mm">An example</div><p class="small"><b>S:</b> "Come to me, all you who labor and are heavily burdened, and I will give you rest." Matthew 11:28 (WEB)<br><b>O:</b> Jesus invites everyone who is tired, not only the strong. The invitation comes before any instructions.<br><b>A:</b> I don't have to sort myself out before I come to him. I\'ll stop putting prayer off until I feel "ready".<br><b>P:</b> Thank you for welcoming me as I am. Help me rest in you today.</p></div>`, { sect: 'Study methods', deco: 'small' }));
const soap = (i) => page(`<div class="row" style="flex:none;align-items:flex-end"><div><div class="kicker">SOAP study</div><h1 class="sm">Today's study</h1></div><div style="flex:none;width:80mm">${field('Date')}${field('Passage')}</div></div>
${['S · Scripture', 'O · Observation', 'A · Application', 'P · Prayer'].map((l, j) => box(l, lines(), `fill ${j % 2 ? 'sage' : ''}`)).join('')}`, { sect: 'SOAP study', cls: 'nofill' });
for (let i = 0; i < 30; i++) add(i === 0 ? 'soap' : null, soap(i));

// deeper studies
for (let i = 0; i < 3; i++) add(i === 0 ? 'book' : null, page(`${head('Deeper study', 'Book study', 'Get to know a whole book before (or after) reading it closely.')}
<div class="g2">${box('The basics', ['Book', 'Written by', 'Written to', 'When / where', 'Type of writing'].map(field).join(''))}${box('Key verses', lines(36), 'sage')}</div>
<div class="g2">${box('Main themes', lines(40), 'cream')}${box('Outline: how it\'s structured', lines(40))}</div>
<div class="g2">${box('What it shows about God', lines(), 'fill')}${box('What I\'m taking away', lines(), 'fill cream')}</div>`, { sect: 'Deeper study' }));
for (let i = 0; i < 2; i++) add(i === 0 ? 'character' : null, page(`${head('Deeper study', 'Character study', 'Learn from the lives of people in the Bible.')}
${box('', ['Person', 'Where to read about them', 'Family and background'].map(field).join(''))}
<div class="g2">${box('Strengths and faith', lines(40), 'sage')}${box('Struggles and mistakes', lines(40), 'cream')}</div>
${box('How God worked in their life', lines(34))}
${box('What I learn from them', lines(), 'fill sage')}`, { sect: 'Deeper study' }));
for (let i = 0; i < 2; i++) add(i === 0 ? 'word' : null, page(`${head('Deeper study', 'Word study', 'Dig into one word. A concordance or Bible app helps.')}
<div class="g2">${box('The word', ['Word (English)', 'Original word (Hebrew / Greek)', 'Strong\'s number (optional)', 'Meaning'].map(field).join(''))}${box('Where it\'s used', lines(36), 'sage')}</div>
${table(['Reference', 'How it\'s used here'], 8, { widths: ['26%'], rh: 9 })}
${box('What I\'ve learned', lines(), 'fill cream')}`, { sect: 'Deeper study' }));
for (let i = 0; i < 2; i++) add(i === 0 ? 'topic' : null, page(`${head('Deeper study', 'Topical study', 'Follow one topic (e.g. peace, forgiveness, hope) through the Bible.')}
${box('', field('Topic') + field('Why I\'m studying it'))}
${table(['Passage', 'What it says about this topic'], 9, { widths: ['26%'], rh: 10 })}
${box('Putting it together', lines(), 'fill sage')}`, { sect: 'Deeper study' }));
for (let i = 0; i < 4; i++) add(i === 0 ? 'map' : null, page(`${head('Deeper study', 'Verse mapping', 'Write the verse in the middle, then explore it from every side.')}
<div class="g2">${box('Context: what\'s happening around it?', lines(36), 'cream')}${box('Key words and meanings', lines(36), 'sage')}</div>
<div class="box" style="border:1.4pt solid var(--clay);background:var(--clay-light)"><div class="label">The verse</div>${field('Reference')}${lines(34)}</div>
<div class="g2">${box('Cross references', lines(36))}${box('Other translations', lines(36), 'cream')}</div>
${box('What it means for me', lines(), 'fill sage')}`, { sect: 'Deeper study' }));

// church
for (let i = 0; i < 8; i++) add(i === 0 ? 'sermon' : null, page(`<div class="row" style="flex:none;align-items:flex-end"><div><div class="kicker">Church</div><h1 class="sm">Sermon notes</h1></div><div style="flex:none;width:80mm">${field('Date')}${field('Speaker')}</div></div>
<div class="g2">${box('', field('Title / series') + field('Main passage'))}${box('', field('Church') + field('Songs we sang'), 'sage')}</div>
${box('Main points', lines(), 'fill')}
<div class="g2">${box('Quotes and verses to remember', lines(36), 'cream')}${box('Questions to explore', lines(36))}</div>
${box('One thing I\'ll do this week', lines(16), 'sage')}`, { sect: 'Church', cls: 'nofill' }));
for (let i = 0; i < 3; i++) add(i === 0 ? 'group' : null, page(`${head('Church', 'Small group notes', '')}
<div class="g2">${box('', field('Date') + field('Where') + field('Passage / topic'))}${box('Who was there', lines(22), 'sage')}</div>
${box('Discussion notes', lines(), 'fill')}
<div class="g2">${box('Prayer requests', lines(40), 'cream')}${box('To follow up', blankCbs(6), 'sage')}</div>`, { sect: 'Church' }));

// prayer
for (let i = 0; i < 2; i++) add(i === 0 ? 'prayerlist' : null, tablePage('Prayer', 'Prayer', i === 0 ? 'Prayer list' : 'Prayer list (continued)', i === 0 ? 'Keep track of what you\'re praying for, and notice the answers (even the "not yet"s).' : '', ['Date', 'Praying for', 'Who', 'Answered', 'How'], 14, ['12%', '36%', '16%', '12%']));
for (let i = 0; i < 4; i++) add(i === 0 ? 'acts' : null, page(`<div class="row" style="flex:none;align-items:flex-end"><div><div class="kicker">Prayer</div><h1 class="sm">ACTS prayer journal</h1></div><div style="flex:none;width:60mm">${field('Date')}</div></div>
${[['Adoration', 'Praise God for who he is'], ['Confession', 'Be honest about where I\'ve fallen short'], ['Thanksgiving', 'Thank him for what he\'s done'], ['Supplication', 'Ask for what I and others need']].map(([h, t], j) => box(`${h} · <span style="text-transform:none;letter-spacing:0;font-weight:400;color:var(--ink-soft)">${t}</span>`, lines(), `fill ${['', 'cream', 'sage', ''][j]}`)).join('')}`, { sect: 'Prayer', cls: 'nofill' }));
add('memory', tablePage('Growing', 'Growing', 'Scripture memory', 'One verse at a time. Write it on a card and keep it in your pocket.', ['Reference', 'Started', 'First words (to prompt you)', 'Memorised'], 14, ['18%', '14%', '50%']));
add('grat', page(`${head('Growing', 'Gratitude', 'Small, specific thanks. Fill a line whenever you notice something good.')}
${box('', Array.from({ length: 1 }, () => lines()).join(''), 'fill cream')}`, { sect: 'Growing' }));
for (let i = 0; i < 12; i++) add(i === 0 ? 'month' : null, page(`<div class="row" style="flex:none;align-items:flex-end"><div><div class="kicker">Monthly reflection</div><h1 class="sm">Looking back</h1></div><div style="flex:none;width:60mm">${field('Month')}</div></div>
<div class="g2">${box('What I read and studied', lines(40))}${box('What God has been teaching me', lines(40), 'sage')}</div>
<div class="g2">${box('Prayers answered', lines(36), 'cream')}${box('Still praying for', lines(36))}</div>
${box('A verse that stayed with me', field('Reference') + lines(16), 'sage')}
${box('Focus for next month', lines(), 'fill cream')}`, { sect: 'Monthly reflection' }));
add('notes', page(`${head('Notes', 'Notes', '')}${box('', lines(), 'fill')}`, { sect: 'Notes' }));

const toc = [['My study year', 'year'], ['New Testament in a year', 'plan'], ['Books of the Bible', 'books'], ['How SOAP works', 'soaphow'], ['SOAP study pages (30)', 'soap'], ['Book study', 'book'], ['Character study', 'character'], ['Word study', 'word'], ['Topical study', 'topic'], ['Verse mapping', 'map'], ['Sermon notes', 'sermon'], ['Small group notes', 'group'], ['Prayer list', 'prayerlist'], ['ACTS prayer journal', 'acts'], ['Scripture memory', 'memory'], ['Gratitude', 'grat'], ['Monthly reflections', 'month']];
pages[ids.contents - 1] = page(`${head('Contents', 'What\'s inside', '')}
<div style="max-width:150mm">${toc.map(([t, id]) => `<div class="toc" style="padding:2.2mm 0;font-size:10pt"><span>${t}</span><span>${ids[id]}</span></div>`).join('')}</div>
<div class="spacer"></div>
<div class="callout sage"><div class="verse" style="font-size:13pt">"Come to me, all you who labor and are heavily burdened, and I will give you rest."</div><div class="ref">Matthew 11:28 · World English Bible</div></div>`, { sect: 'Contents', cls: 'nofill' });

module.exports = {
  file: 'Bible-Study-Planner', short: S, title: T, fillable: true, pages, css, ids,
  freebie: [ids.soaphow, ids.soap, ids.prayerlist],
  meta: {
    short: 'The Bible Study<br>Planner', kicker: 'Undated · Any translation · Print at home', sub: 'A calm, simple space to read, study and pray through the Bible.',
    hero: [1, ids.soap], grid: [[ids.plan, 'New Testament in a year'], [ids.soap, '30 SOAP study pages'], [ids.map, 'Verse mapping'], [ids.sermon, 'Sermon notes'], [ids.acts, 'ACTS prayer journal'], [ids.character, 'Character study']],
    detail: ids.soaphow, detailTitle: 'Study any passage in four steps', detailPoints: ['Scripture, Observation, Application, Prayer', 'A worked example to get you started', 'Works with any translation', 'Undated: start any day'],
    features: [['Read', 'New Testament in a year and a books of the Bible tracker'], ['Study', 'SOAP, book, character, word and topical studies and verse mapping'], ['Church', 'Sermon notes and small group notes'], ['Pray', 'Prayer list, ACTS journal, scripture memory and monthly reflections']],
    pins: [['How to do a SOAP Bible study', 'A free printable page to get started', ids.soaphow], ['Read the New Testament in a year', 'Five short readings a week', ids.plan], ['Verse mapping made simple', 'Printable Bible study page', ids.map]],
    listing: {
      price: '£7.95', title: 'Bible Study Planner Printable, SOAP Bible Study Journal, Sermon Notes, Prayer Journal, New Testament Reading Plan, Christian Planner PDF',
      tags: ['bible study planner', 'bible study journal', 'soap bible study', 'sermon notes', 'prayer journal', 'christian planner', 'bible reading plan', 'verse mapping', 'faith planner', 'christian gift', 'church notes', 'quiet time journal', 'scripture journal'],
      hook: 'A calm, simple space to read, study and pray through the Bible.',
      body: ['An undated printable Bible study planner that gives your quiet time a gentle shape. It works with any translation and any church background, so you can start on any day and use as much or as little as helps.',
        'INSIDE (' + pages.length + ' pages):\n• My study year: rhythm, goals and a prayer for the season\n• New Testament in a year: five short readings a week, with tick boxes\n• Books of the Bible tracker (all 66 books)\n• How SOAP works, with a worked example\n• 30 SOAP study pages\n• Book, character, word and topical study pages\n• Verse mapping pages\n• Sermon notes and small group notes\n• Prayer list and ACTS prayer journal\n• Scripture memory tracker and gratitude page\n• 12 monthly reflections',
        'Type into the fillable PDF on a computer, or print and write by hand. Scripture quotations are from the World English Bible (public domain).'],
      pinCopy: [['How to do a SOAP Bible study', 'Scripture, Observation, Application, Prayer, with a free printable.'], ['Read the New Testament in a year', 'Five short readings a week, weekends to catch up.'], ['Verse mapping for beginners', 'A simple printable Bible study page.'], ['Sermon notes printable', 'Keep what you heard on Sunday all week.'], ['ACTS prayer journal', 'Adoration, Confession, Thanksgiving, Supplication.']],
      prompts: ['An open Bible beside a printed study page with a blank white page, a cup of tea, a pencil and a small vase of white flowers on a wooden table, soft morning window light, warm cream and muted sage green palette, calm, photorealistic, 4:5'],
    },
  },
};
