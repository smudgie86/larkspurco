// Builds a large-print puzzle pack from generated JSON data.
const fs = require('fs');
const path = require('path');
const { page, cover, section, lines, cbs, box } = require('./lib');

const CSS = `
.ws{border-collapse:collapse;margin:0 auto}
.ws td{width:var(--cs);height:var(--cs);text-align:center;vertical-align:middle;font-size:var(--fs);font-weight:500;color:var(--ink);padding:0}
.ws.big{border:1.2pt solid var(--sage);border-radius:3mm}
.ws td.hit{background:var(--clay-light);color:var(--clay-deep);font-weight:700}
.wl{display:grid;grid-template-columns:repeat(3,1fr);gap:1.6mm 5mm;font-size:13.5pt;font-weight:500;color:var(--sage-deep)}
.wl div{display:flex;gap:2.4mm;align-items:center}
.wl div::before{content:"";width:4.2mm;height:4.2mm;border:1pt solid var(--clay);border-radius:1mm;flex:none}
.sd{border-collapse:collapse;margin:0 auto;border:2.4pt solid var(--sage-deep)}
.sd td{width:var(--cs);height:var(--cs);border:.7pt solid #B9B2A6;text-align:center;vertical-align:middle;font-size:var(--fs);font-weight:600;color:var(--sage-deep);padding:0}
.sd td.r3{border-bottom:2.4pt solid var(--sage-deep)}
.sd td.c3{border-right:2.4pt solid var(--sage-deep)}
.sd td.sol{color:var(--clay-deep);font-weight:400}
.sc{display:flex;align-items:center;gap:5mm;padding:2.4mm 0;border-bottom:.6pt solid var(--line)}
.sc .n{font-size:12pt;font-weight:600;color:var(--clay);width:7mm}
.sc .s{font-size:17pt;font-weight:600;letter-spacing:.18em;color:var(--sage-deep);width:72mm}
.sc .b{display:flex;gap:1.2mm}
.sc .b i{width:7.6mm;height:9mm;border:1pt solid var(--clay);border-radius:1.2mm;display:block}
.sc .b i.gap{border:none;width:3mm}
.big-h{font-size:22pt}
`;

function wsTable(d, cs, fs, hits) {
  const hit = new Set();
  if (hits) d.placed.forEach((p) => p.cells.forEach(([y, x]) => hit.add(`${y},${x}`)));
  return `<table class="ws ${hits ? '' : 'big'}" style="--cs:${cs}mm;--fs:${fs}pt">${d.grid.map((row, y) => `<tr>${[...row].map((ch, x) => `<td class="${hit.has(`${y},${x}`) ? 'hit' : ''}">${ch}</td>`).join('')}</tr>`).join('')}</table>`;
}

function sdTable(grid, cs, fs, sol) {
  let h = `<table class="sd" style="--cs:${cs}mm;--fs:${fs}pt">`;
  for (let r = 0; r < 9; r++) {
    h += '<tr>';
    for (let c = 0; c < 9; c++) {
      const v = (sol || grid)[r * 9 + c];
      const given = grid[r * 9 + c] !== 0;
      const cls = [r % 3 === 2 && r < 8 ? 'r3' : '', c % 3 === 2 && c < 8 ? 'c3' : '', sol && !given ? 'sol' : ''].join(' ');
      h += `<td class="${cls}">${v || ''}</td>`;
    }
    h += '</tr>';
  }
  return h + '</table>';
}

function mazeSvg(m, maxW, maxH, withPath) {
  const cs = Math.min(maxW / m.w, maxH / m.h);
  const W = cs * m.w, H = cs * m.h, pad = 2;
  let d = '';
  m.cells.forEach((row, y) => [...row].forEach((walls, x) => {
    const cell = m.cells[y][x];
    const x0 = x * cs + pad, y0 = y * cs + pad;
    if (cell.includes('N') && !(x === 0 && y === 0)) d += `M${x0} ${y0}h${cs}`;
    if (cell.includes('W')) d += `M${x0} ${y0}v${cs}`;
    if (y === m.h - 1 && cell.includes('S') && !(x === m.w - 1)) d += `M${x0} ${y0 + cs}h${cs}`;
    if (x === m.w - 1 && cell.includes('E')) d += `M${x0 + cs} ${y0}v${cs}`;
  }));
  const sw = Math.max(0.5, cs * 0.09);
  const pathD = withPath ? `<polyline points="${m.path.map(([x, y]) => `${x * cs + cs / 2 + pad},${y * cs + cs / 2 + pad}`).join(' ')}" fill="none" stroke="#CC8B6D" stroke-width="${cs * 0.28}" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/>` : '';
  return `<svg viewBox="0 0 ${W + 2 * pad} ${H + 2 * pad}" style="width:${W + 2 * pad}mm;height:${H + 2 * pad}mm;display:block;margin:0 auto">${pathD}<path d="${d}" stroke="#47503E" stroke-width="${sw}" stroke-linecap="square" fill="none"/></svg>`;
}

function build({ file, title, short, kicker, coverTitle, lead, data, theme, bottom }) {
  const D = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', data)));
  const pages = [];
  const P = (body, sect, opts = {}) => pages.push(page(body, { sect, cls: 'nofill', ...opts }));
  const total = D.wordsearch.length + D.sudoku.length + D.maze.length + D.scramble.length;

  pages.push(cover({ kicker, title: coverTitle, lead, tags: ['Large print', `${total} puzzles`, 'Answers included', 'Print at home'], bottom }));

  // Order: mix puzzle types so it doesn't feel repetitive.
  const seq = [];
  let wi = 0, si = 0, mi = 0, ci = 0;
  while (wi < D.wordsearch.length || si < D.sudoku.length || mi < D.maze.length || ci < D.scramble.length) {
    for (let k = 0; k < 2 && wi < D.wordsearch.length; k++) seq.push(['ws', wi++]);
    if (si < D.sudoku.length) seq.push(['sd', si++]);
    if (wi % 6 === 0 || wi >= D.wordsearch.length) { if (mi < D.maze.length) seq.push(['mz', mi++]); }
    if (wi % 6 === 2 || wi >= D.wordsearch.length) { if (ci < D.scramble.length) seq.push(['sc', ci++]); }
  }
  const firstPuzzlePage = 4;
  const answersStart = firstPuzzlePage + seq.length;

  pages.push(page(`<div class="kicker">Welcome</div><h1>Settle in</h1>
<p class="lead">${total} puzzles in large, clear print: word searches, sudoku, mazes and word scrambles, all ${theme}. Print the whole pack or just your favourites, grab a pencil and a cup of tea, and enjoy.</p>
<div class="g2">
${box('Inside this pack', cbs([`${D.wordsearch.length} large-print word searches`, `${D.sudoku.length} sudoku (gentle to steady)`, `${D.maze.length} mazes`, `${D.scramble.length} word scramble pages`, `All the answers, from page ${answersStart}`]))}
${box('Printing tips', `<ul class="dots small"><li>Print at 100% or "actual size" for the biggest letters.</li><li>Choose "print pages" to print just the puzzles you want.</li><li>Print as many times as you like for your own household.</li><li>Thicker paper (100–120gsm) feels lovely, but any paper works.</li></ul>`, 'sage')}
</div>
${box('How to play', `<div class="g2" style="gap:3mm 6mm">
<div><h3>Word search</h3><p class="small">Find each word in the grid. Words run left to right, top to bottom, or diagonally downwards. Spaces and punctuation are left out.</p></div>
<div><h3>Sudoku</h3><p class="small">Fill every row, column and 3×3 box with the numbers 1 to 9. Each number appears only once in each row, column and box.</p></div>
<div><h3>Maze</h3><p class="small">Find your way from the start at the top left to the finish at the bottom right without crossing a line.</p></div>
<div><h3>Word scramble</h3><p class="small">Unscramble the letters to find a word that fits the theme. Write one letter in each box.</p></div>
</div>`, 'cream')}
<div class="callout"><p class="small">For personal use. Please don't resell or share the files. Teachers, care homes and activity coordinators are welcome to print copies for their own groups.</p></div>`, { sect: 'Welcome', deco: 'tr', cls: 'nofill' }));

  pages.push(page(`<div class="kicker">Inside</div><h1>Puzzle list</h1>
<div style="column-count:2;column-gap:8mm;margin-top:3mm">${seq.map(([t, i], k) => {
    const name = t === 'ws' ? `Word search: ${D.wordsearch[i].title}` : t === 'sd' ? `Sudoku ${i + 1} (${D.sudoku[i].level.toLowerCase()})` : t === 'mz' ? `Maze ${i + 1}` : `Word scramble: ${D.scramble[i].title}`;
    return `<div class="toc" style="break-inside:avoid"><b style="font-weight:400">${k + 1}. ${name}</b><span>${firstPuzzlePage + k}</span></div>`;
  }).join('')}<div class="toc"><b>Answers</b><span>${answersStart}</span></div></div>`, { sect: 'Contents', deco: 'small', cls: 'nofill' }));

  seq.forEach(([t, i], k) => {
    const num = `<div class="kicker">Puzzle ${k + 1}</div>`;
    if (t === 'ws') {
      const d = D.wordsearch[i];
      P(`${num}<h1 class="big-h">${d.title}</h1>${wsTable(d, 12.2, 17)}<div class="wl" style="margin-top:2mm">${d.display.map((w) => `<div>${w}</div>`).join('')}</div>`, 'Word search', {});
    } else if (t === 'sd') {
      const d = D.sudoku[i];
      P(`${num}<h1 class="big-h">Sudoku ${i + 1} <span class="tag ${d.level === 'Gentle' ? 'sage' : ''}" style="vertical-align:middle;font-size:9pt">${d.level}</span></h1><p class="muted">Fill each row, column and 3×3 box with the numbers 1 to 9.</p><div style="margin-top:4mm">${sdTable(d.puzzle, 17.5, 25)}</div>`, 'Sudoku');
    } else if (t === 'mz') {
      const m = D.maze[i];
      P(`${num}<h1 class="big-h">Maze ${i + 1}</h1><p class="muted">Start at the top left and find your way to the finish at the bottom right.</p><div style="width:fit-content;margin:2mm auto 0"><div style="font-weight:600;color:var(--clay-deep);font-size:11pt">↓ Start</div>${mazeSvg(m, 175, 185, false)}<div style="text-align:right;font-weight:600;color:var(--clay-deep);font-size:11pt">Finish ↓</div></div>`, 'Maze');
    } else {
      const d = D.scramble[i];
      P(`${num}<h1 class="big-h">${d.title}</h1><p class="muted">Unscramble each word. Clue: <b>${d.hint}</b>.</p><div style="margin-top:2mm">${d.items.map((it, j) => `<div class="sc"><span class="n">${j + 1}</span><span class="s">${it.s}</span><span class="b">${[...it.w].map((ch) => ch === ' ' ? '<i class="gap"></i>' : '<i></i>').join('')}</span></div>`).join('')}</div>`, 'Word scramble');
    }
  });

  // Answers
  const ansHead = (t) => `<div class="kicker">Answers</div><h1 class="sm">${t}</h1>`;
  const pk = (t, i) => seq.findIndex(([a, b]) => a === t && b === i) + 1;
  for (let i = 0; i < D.wordsearch.length; i += 4) {
    P(`${ansHead('Word search answers')}<div class="g2" style="gap:5mm 6mm;margin-top:2mm">${D.wordsearch.slice(i, i + 4).map((d, j) => `<div><h3 style="margin-bottom:1.5mm">Puzzle ${pk('ws', i + j)}: ${d.title}</h3>${wsTable(d, 6.1, 9.5, true)}</div>`).join('')}</div>`, 'Answers');
  }
  for (let i = 0; i < D.sudoku.length; i += 6) {
    P(`${ansHead('Sudoku answers')}<div class="g2" style="gap:5mm 6mm;margin-top:2mm">${D.sudoku.slice(i, i + 6).map((d, j) => `<div><h3 style="margin-bottom:1.5mm">Puzzle ${pk('sd', i + j)}: Sudoku ${i + j + 1}</h3>${sdTable(d.puzzle, 6.6, 10.5, d.solution)}</div>`).join('')}</div>`, 'Answers');
  }
  P(`${ansHead('Maze answers')}<div class="g3" style="gap:5mm;margin-top:2mm">${D.maze.map((m, j) => `<div><h3 style="margin-bottom:1.5mm">Puzzle ${pk('mz', j)}: Maze ${j + 1}</h3>${mazeSvg(m, 50, 68, true)}</div>`).join('')}</div>`, 'Answers');
  P(`${ansHead('Word scramble answers')}<div class="g3" style="gap:4mm;margin-top:2mm">${D.scramble.map((d, j) => box(`Puzzle ${pk('sc', j)}: ${d.title}`, d.items.map((it, k) => `<div class="small" style="margin:.6mm 0">${k + 1}. ${it.w}</div>`).join(''), j % 2 ? '' : 'cream')).join('')}</div>
<div class="callout sage" style="margin-top:4mm"><h3>Thank you</h3><p class="small">Thank you for choosing Larkspur &amp; Co. If you enjoyed these puzzles, a short Etsy review means the world to a small Glasgow business. Our printed puzzle books from Robertson &amp; McGarrigle Books are on Amazon, and you'll find more at <b>larkspurco.uk</b>.</p></div>`, 'Answers');

  return { file, short, title, pages, css: CSS, freebie: [firstPuzzlePage, firstPuzzlePage + 2] };
}

module.exports = { build, wsTable, sdTable, mazeSvg, CSS };
