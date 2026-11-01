const { digital, DIG, DIG_CSS, CSS2 } = require('../planners');
module.exports = { file: '2027-Digital-Planner-GoodNotes', short: '2027 Digital Planner', title: 'The 2027 Digital Planner', pages: digital(), css: CSS2 + DIG_CSS, sizes: { Digital: DIG }, links: true };
module.exports.meta = {
  short: '2027 Digital<br>Planner', kicker: 'Hyperlinked · GoodNotes · Notability', sub: 'Tap any tab, month, week or day to jump straight there.',
  hero: [2, 30], grid: [[2, 'Year at a glance'], [8, 'Linked monthly calendars'], [30, '53 weekly spreads'], [80, '365 daily pages'], [3, 'UK bank holidays'], [5, 'Year in pixels']],
  detail: 8, detailTitle: 'Everything is linked', detailPoints: ['Tabs for every month on every page', 'Tap a date to open that day', 'Tap a week number for the weekly spread', 'Back and forward links on every page'],
  features: [['448 linked pages', 'Year, months, weeks and every day of 2027'], ['Over 9,000 links', 'Tabs, calendars, breadcrumbs and next/back'], ['UK dates built in', 'Bank holidays from GOV.UK and key dates'], ['Works in your app', 'GoodNotes, Notability, Noteshelf, Xodo and more']],
  pins: [['2027 digital planner for GoodNotes', 'Hyperlinked, with UK dates', 30], ['Hyperlinked daily planner 2027', '365 linked daily pages', 80], ['iPad planner 2027', 'Tap any date to jump there', 8]],
  listing: {
    price: '£7.95', title: '2027 Digital Planner, GoodNotes Planner, Hyperlinked iPad Planner, Daily Weekly Monthly, UK Bank Holidays, Notability, Landscape PDF',
    tags: ['digital planner', 'goodnotes planner', '2027 planner', 'ipad planner', 'hyperlinked', 'notability planner', 'digital journal', 'daily planner', 'weekly planner', 'dated planner', 'tablet planner', 'uk planner', 'adhd planner'],
    hook: 'Tap any tab, month, week or day to jump straight there.',
    body: ['A fully hyperlinked 2027 digital planner in landscape format for iPad and Android tablets. Every page has month tabs, and every calendar date links to its daily page, so you can get anywhere in two taps.',
      'INSIDE:\n• Year at a glance (each month links to its calendar)\n• UK bank holidays and key dates (each links to its day)\n• 2027 goals and a year-in-pixels tracker\n• 12 monthly calendars with focus, goals and notes\n• 53 weekly spreads\n• 365 daily pages with schedule, top three, to-do, notes and gratitude\n• 12 notes pages (lined and dot grid)\n• Over 9,000 links, including next/back and breadcrumbs',
      'HOW TO USE: download the PDF, open it in GoodNotes, Notability, Noteshelf, Xodo or any PDF annotation app, and use the app\'s pen or text tools. In GoodNotes, use read-only mode (or tap the link) to follow links. This is a digital download for tablets; it isn\'t designed for printing.'],
    pinCopy: [['2027 digital planner for GoodNotes (UK)', 'Hyperlinked tabs, months, weeks and 365 daily pages.'], ['Hyperlinked iPad planner 2027', 'Tap any date to open that day. Over 9,000 links.'], ['Digital planner with UK bank holidays', 'England, Wales, Scotland and Northern Ireland.'], ['Go paperless in 2027', 'A calm, cream-and-sage digital planner.'], ['How to use a digital planner in GoodNotes', 'Import the PDF and tap the tabs to navigate.']],
    prompts: ['An iPad on a cream linen table showing a blank landscape screen, an Apple Pencil-style stylus beside it, a latte and a eucalyptus sprig, soft natural light, photorealistic, 4:5 (I\'ll put the real planner pages on the screen)'],
  },
};
