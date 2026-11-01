// Super bumper large-print puzzle packs (word search, sudoku, maze, scramble, cryptogram, missing vowels).
const fs = require('fs');
const path = require('path');
const { page, cover, cbs, box } = require('./lib');
const { wsTable, sdTable, mazeSvg, CSS } = require('./puzzles');

const CSS_B = CSS + `
.cq{display:flex;flex-wrap:wrap;gap:9mm 5mm;margin-top:6mm}
.cw{display:flex;gap:.8mm}
.cc{display:flex;flex-direction:column;align-items:center;width:10.6mm}
.cc .a{width:10.6mm;height:13mm;border-bottom:1.6pt solid var(--sage-deep);font-size:20pt;font-weight:600;color:var(--clay-deep);text-align:center;line-height:13mm}
.cc .k{font-size:14pt;font-weight:500;color:var(--ink-soft);margin-top:.8mm}
.cp{font-size:20pt;font-weight:600;color:var(--sage-deep);align-self:flex-start;line-height:13mm}
.key{display:grid;grid-template-columns:repeat(13,1fr);gap:1.2mm;margin-top:2mm}
.key div{border:.8pt solid var(--line);border-radius:1.4mm;text-align:center;font-size:9pt;padding:.6mm 0 4.6mm;color:var(--ink-soft);font-weight:600}
.mv{display:flex;align-items:center;gap:6mm;padding:5.2mm 0;border-bottom:.6pt solid var(--line)}
.mv .n{font-size:12pt;font-weight:600;color:var(--clay);width:7mm}
.mv .s{font-size:19pt;font-weight:600;letter-spacing:.22em;color:var(--sage-deep)}
`;

function buildBumper({ file, short, title, kicker, coverTitle, lead, data, theme, bottom }) {
  const D = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', data)));
  const types = { ws: D.wordsearch, sd: D.sudoku, mz: D.maze, sc: D.scramble, cr: D.crypto, mv: D.vowels };
  const total = Object.values(types).reduce((a, b) => a + b.length, 0);
  // Spread every type evenly through the book.
  const seq = [];
  Object.entries(types).forEach(([t, arr]) => arr.forEach((_, i) => seq.push([t, i, (i + 0.5) / arr.length + ({ ws: 0, sd: 0.003, mz: 0.006, sc: 0.009, cr: 0.012, mv: 0.015 })[t]])));
  seq.sort((a, b) => a[2] - b[2]);
  const name = ([t, i]) => ({ ws: () => `Word search: ${D.wordsearch[i].title}`, sd: () => `Sudoku ${i + 1} (${D.sudoku[i].level.toLowerCase()})`, mz: () => `Maze ${i + 1}`, sc: () => `Word scramble: ${D.scramble[i].title}`, cr: () => `Cryptogram ${i + 1}`, mv: () => `Missing vowels: ${D.vowels[i].title}` })[t]();

  const PER = 74;
  const tocPages = Math.ceil((seq.length + 1) / PER);
  const first = 3 + tocPages;
  const answersStart = first + seq.length;
  const pages = [];
  const P = (body, sect, opts = {}) => pages.push(page(body, { sect, cls: 'nofill', ...opts }));

  pages.push(cover({ kicker, title: coverTitle, lead, tags: ['Super bumper', 'Large print', `${total} puzzles`, 'Answers included'], bottom }));
  pages.push(page(`<div class="kicker">Welcome</div><h1>Settle in</h1>
<p class="lead">${total} puzzles in large, clear print, all ${theme}. Six kinds of puzzle are mixed all the way through, so there's always something different on the next page.</p>
<div class="g2">${box('Inside this pack', cbs([`${D.wordsearch.length} word searches`, `${D.sudoku.length} sudoku (gentle to steady)`, `${D.maze.length} mazes`, `${D.scramble.length} word scrambles`, `${D.crypto.length} cryptograms`, `${D.vowels.length} missing vowels puzzles`, `All the answers, from page ${answersStart}`]))}
${box('Printing tips', `<ul class="dots small"><li>Print at 100% or "actual size" for the biggest letters.</li><li>Choose "print pages" to print just the puzzles you want.</li><li>Print as many times as you like for your household.</li></ul>`, 'sage')}</div>
${box('How to play', `<div class="g2" style="gap:3mm 6mm">
<div><h3>Word search</h3><p class="small">Find each word. Words run across, down, or diagonally downwards. Spaces are left out.</p></div>
<div><h3>Sudoku</h3><p class="small">Fill every row, column and 3×3 box with the numbers 1 to 9, once each.</p></div>
<div><h3>Maze</h3><p class="small">Find your way from the start at the top left to the finish at the bottom right.</p></div>
<div><h3>Word scramble</h3><p class="small">Unscramble the letters to find a word that fits the theme.</p></div>
<div><h3>Cryptogram</h3><p class="small">Each letter of a well-known saying has been swapped for another. Two letters are given to start you off. Crack the code!</p></div>
<div><h3>Missing vowels</h3><p class="small">The vowels (A, E, I, O, U) have been taken out. Fill in the gaps to find each word.</p></div>
</div>`, 'cream')}
<div class="callout"><p class="small">For personal use. Teachers, care homes and activity coordinators are welcome to print copies for their own groups.</p></div>`, { sect: 'Welcome', deco: 'tr', cls: 'nofill' }));
  for (let t = 0; t < tocPages; t++) {
    const chunk = seq.slice(t * PER, (t + 1) * PER);
    const last = t === tocPages - 1;
    pages.push(page(`<div class="kicker">Inside</div><h1 class="sm">Puzzle list${tocPages > 1 ? ` (${t + 1} of ${tocPages})` : ''}</h1>
<div style="column-count:2;column-gap:8mm;margin-top:2mm">${chunk.map((s, k) => `<div class="toc" style="break-inside:avoid;font-size:8pt;padding:.7mm 0"><b style="font-weight:400">${t * PER + k + 1}. ${name(s)}</b><span>${first + t * PER + k}</span></div>`).join('')}${last ? `<div class="toc" style="font-size:8pt;padding:.7mm 0"><b>Answers</b><span>${answersStart}</span></div>` : ''}</div>`, { sect: 'Contents', cls: 'nofill' }));
  }

  seq.forEach(([t, i], k) => {
    const num = `<div class="kicker">Puzzle ${k + 1}</div>`;
    if (t === 'ws') {
      const d = D.wordsearch[i];
      P(`${num}<h1 class="big-h">${d.title}</h1>${wsTable(d, 12.2, 17)}<div class="wl" style="margin-top:2mm">${d.display.map((w) => `<div>${w}</div>`).join('')}</div>`, 'Word search');
    } else if (t === 'sd') {
      const d = D.sudoku[i];
      P(`${num}<h1 class="big-h">Sudoku ${i + 1} <span class="tag ${d.level === 'Gentle' ? 'sage' : ''}" style="vertical-align:middle;font-size:9pt">${d.level}</span></h1><p class="muted">Fill each row, column and 3×3 box with the numbers 1 to 9.</p><div style="margin-top:4mm">${sdTable(d.puzzle, 17.5, 25)}</div>`, 'Sudoku');
    } else if (t === 'mz') {
      const m = D.maze[i];
      P(`${num}<h1 class="big-h">Maze ${i + 1}</h1><p class="muted">Start at the top left and find your way to the finish at the bottom right.</p><div style="width:fit-content;margin:2mm auto 0"><div style="font-weight:600;color:var(--clay-deep);font-size:11pt">↓ Start</div>${mazeSvg(m, 175, 185, false)}<div style="text-align:right;font-weight:600;color:var(--clay-deep);font-size:11pt">Finish ↓</div></div>`, 'Maze');
    } else if (t === 'sc') {
      const d = D.scramble[i];
      P(`${num}<h1 class="big-h">${d.title}</h1><p class="muted">Unscramble each word. They're all from the theme <b>${d.hint}</b>.</p><div style="margin-top:2mm">${d.items.map((it, j) => `<div class="sc"><span class="n">${j + 1}</span><span class="s">${it.s}</span><span class="b">${[...it.w].map((ch) => ch === ' ' ? '<i class="gap"></i>' : '<i></i>').join('')}</span></div>`).join('')}</div>`, 'Word scramble');
    } else if (t === 'cr') {
      const d = D.crypto[i];
      const words = d.cipher.split(' ');
      let pos = 0;
      const plainWords = d.plain.split(' ');
      const html = words.map((w, wi) => { const pw = plainWords[wi]; return `<div class="cw">${[...w].map((ch, ci) => /[A-Z]/.test(ch) ? `<div class="cc"><div class="a">${d.hints[ch] || ''}</div><div class="k">${ch}</div></div>` : `<div class="cp">${pw[ci]}</div>`).join('')}</div>`; }).join('');
      const used = [...new Set(d.cipher.replace(/[^A-Z]/g, ''))].sort();
      P(`${num}<h1 class="big-h">Cryptogram ${i + 1}</h1><p class="muted">Each letter stands for a different letter. We've filled in two to start you off: ${Object.entries(d.hints).map(([c, p]) => `<b>${c} = ${p}</b>`).join(' and ')}.</p><div class="cq">${html}</div>${box('Working space', '<div class="lines" style="--lh:9mm"></div>', 'fill')}${box('Code-breaker key: write the real letter under each code letter', `<div class="key">${used.map((c) => `<div>${c}</div>`).join('')}</div>`, 'cream')}`, 'Cryptogram');
    } else {
      const d = D.vowels[i];
      P(`${num}<h1 class="big-h">Missing vowels: ${d.title}</h1><p class="muted">Each word has lost its vowels (A, E, I, O, U). Write the missing letters in the gaps.</p><div style="margin-top:3mm">${d.items.map((it, j) => `<div class="mv"><span class="n">${j + 1}</span><span class="s">${it.m.replace(/ /g, '&nbsp;&nbsp;')}</span></div>`).join('')}</div>`, 'Missing vowels');
    }
  });

  const ansHead = (t) => `<div class="kicker">Answers</div><h1 class="sm">${t}</h1>`;
  const pk = (t, i) => seq.findIndex(([a, b]) => a === t && b === i) + 1;
  for (let i = 0; i < D.wordsearch.length; i += 4) P(`${ansHead('Word search answers')}<div class="g2" style="gap:5mm 6mm;margin-top:2mm">${D.wordsearch.slice(i, i + 4).map((d, j) => `<div><h3 style="margin-bottom:1.5mm">Puzzle ${pk('ws', i + j)}: ${d.title}</h3>${wsTable(d, 6.1, 9.5, true)}</div>`).join('')}</div>`, 'Answers');
  for (let i = 0; i < D.sudoku.length; i += 6) P(`${ansHead('Sudoku answers')}<div class="g2" style="gap:5mm 6mm;margin-top:2mm">${D.sudoku.slice(i, i + 6).map((d, j) => `<div><h3 style="margin-bottom:1.5mm">Puzzle ${pk('sd', i + j)}: Sudoku ${i + j + 1}</h3>${sdTable(d.puzzle, 6.6, 10.5, d.solution)}</div>`).join('')}</div>`, 'Answers');
  for (let i = 0; i < D.maze.length; i += 6) P(`${ansHead('Maze answers')}<div class="g3" style="gap:5mm;margin-top:2mm">${D.maze.slice(i, i + 6).map((m, j) => `<div><h3 style="margin-bottom:1.5mm">Puzzle ${pk('mz', i + j)}: Maze ${i + j + 1}</h3>${mazeSvg(m, 50, 68, true)}</div>`).join('')}</div>`, 'Answers');
  for (let i = 0; i < D.scramble.length; i += 9) P(`${ansHead('Word scramble answers')}<div class="g3" style="gap:4mm;margin-top:2mm">${D.scramble.slice(i, i + 9).map((d, j) => box(`Puzzle ${pk('sc', i + j)}`, `<div class="small" style="font-weight:600;color:var(--sage-deep)">${d.title}</div>` + d.items.map((it, k) => `<div class="small" style="margin:.4mm 0">${k + 1}. ${it.w}</div>`).join(''), j % 2 ? '' : 'cream')).join('')}</div>`, 'Answers');
  for (let i = 0; i < D.vowels.length; i += 9) P(`${ansHead('Missing vowels answers')}<div class="g3" style="gap:4mm;margin-top:2mm">${D.vowels.slice(i, i + 9).map((d, j) => box(`Puzzle ${pk('mv', i + j)}`, `<div class="small" style="font-weight:600;color:var(--sage-deep)">${d.title}</div>` + d.items.map((it, k) => `<div class="small" style="margin:.4mm 0">${k + 1}. ${it.w}</div>`).join(''), j % 2 ? 'cream' : '')).join('')}</div>`, 'Answers');
  P(`${ansHead('Cryptogram answers')}<div class="col" style="margin-top:2mm">${D.crypto.map((d, j) => `<div class="box" style="flex-direction:row;gap:4mm;padding:2.4mm 4mm"><b style="flex:none;width:22mm;color:var(--clay-deep)" class="small">Puzzle ${pk('cr', j)}</b><span class="small">${d.q}</span></div>`).join('')}</div>
<div class="callout sage" style="margin-top:3mm"><p class="small">Thank you for choosing Larkspur &amp; Co. If you enjoyed these puzzles, a short Etsy review means the world to a small Glasgow business. More at <b>larkspurco.uk</b>.</p></div>`, 'Answers');

  const firstOf = (t) => first + seq.findIndex((x) => x[0] === t);
  return { file, short, title, pages, css: CSS_B, freebie: [first, first + 1], total, pageOf: { ws: firstOf('ws'), sd: firstOf('sd'), mz: firstOf('mz'), sc: firstOf('sc'), cr: firstOf('cr'), mv: firstOf('mv'), ans: answersStart, toc: 3 } };
}

module.exports = { buildBumper };
