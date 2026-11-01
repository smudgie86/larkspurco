// Short "how to edit and print" guides for editable template files.
const { page, cbs, box, SIZES } = require('./lib');
const { head } = require('./lib2');
const FONTS = '<b>Cormorant Garamond</b> (fonts.google.com/specimen/Cormorant+Garamond) and <b>Poppins</b> (fonts.google.com/specimen/Poppins). Both are free. Download, double-click each font file and choose Install, then reopen the template.';
module.exports = (title, short, appName, intro, steps, printing, extra = '') => ({
  file: 'START-HERE-How-to-edit-and-print',
  short, title,
  sizes: { A4: SIZES.A4 },
  pages: [
    page(`<div class="kicker">Start here</div><h1>${title}</h1><p class="lead">${intro}</p>
<div class="g2">${box('1 · Install the fonts (2 minutes)', `<p class="small">The templates use two free Google fonts: ${FONTS}</p><p class="small">Using Google Docs or Canva? Both fonts are available in their font lists (in Google Docs, choose Fonts › More fonts).</p>`, 'cream')}
${box(`2 · Edit in ${appName}`, cbs(steps), 'sage')}</div>
${box('3 · Print', cbs(printing))}
${extra}
<div class="callout small">Your purchase is for personal use. Please don\'t share or resell the template files. Need help? Message us on Etsy and we\'ll gladly help.</div>`, { sect: 'Start here', deco: 'tr' }),
  ],
});
