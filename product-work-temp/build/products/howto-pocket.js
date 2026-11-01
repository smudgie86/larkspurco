const { page, cbs, box, SIZES } = require('../lib');
const step = (n, h, t) => `<div class="step"><div class="n">${n}</div><div><b style="color:var(--sage-deep)">${h}</b><div class="small">${t}</div></div></div>`;
module.exports = {
  file: 'START-HERE-How-to-print-your-pocket-books', short: 'Pocket Books', title: 'Pocket Book printing guide', sizes: { A4: SIZES.A4 },
  pages: [page(`<div class="kicker">Start here</div><h1>Make your pocket books</h1>
<p class="lead">Each pocket book is 32 A6 pages (about the size of a postcard). Print at home in about ten minutes, or ask a print shop to make them for you.</p>
${box('Print at home: the PRINT-AT-HOME-A4 file', [
    step(1, 'Print double-sided', 'Choose A4 paper (100–120gsm is ideal), <b>actual size / 100%</b>, and <b>flip on long edge</b>. US Letter paper works too: choose "fit to page".'),
    step(2, 'Cut each sheet in half', 'Cut across the middle at the small grey marks. Keep the halves in the order they printed: top half, then bottom half.'),
    step(3, 'Stack', 'Put the half with the front cover on top, cover side facing up. Put each next half <b>underneath</b> the pile, in print order.'),
    step(4, 'Fold and staple', 'Fold the whole pile in half so the front cover is on the outside. Check page 1 is the cover, then staple twice along the fold (a long-arm stapler helps) or sew with thread.'),
    step(5, 'Trim (optional)', 'Trim the three open edges with a craft knife or guillotine for a neat, full-colour edge.'),
  ].join(''))}
<div class="g2">${box('At a print shop: the A6-pages file', cbs(['Send the A6-pages PDF', 'Ask for: A6, 32 pages, saddle-stitched (stapled), colour', 'Optional: a heavier paper for the cover', 'Most shops can do this the same day']), 'sage')}
${box('Tips', cbs(['Print one test copy first', 'Colours look richer on matte paper', 'Make a set: one of each colour', 'Refill any time: just print another']), 'cream')}</div>
<div class="callout small">For personal use. Please don\'t share or resell the files. © Larkspur &amp; Co.</div>`, { sect: 'Start here', deco: 'tr', cls: 'nofill' })],
};
