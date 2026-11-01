const { build } = require('../puzzles');
module.exports = build({
  file: 'Large-Print-Scotland-Puzzle-Pack', short: 'Scotland Puzzle Pack', title: 'Large Print Scotland Puzzle Pack',
  kicker: 'Large print puzzles to print at home', coverTitle: 'The Big<br>Scotland<br>Puzzle Pack',
  lead: 'Lochs, castles, islands, haggis and braw Scots words. Word searches, sudoku, mazes and scrambles in big, clear print.',
  data: 'scotland.json', theme: 'celebrating Scotland', bottom: 'Made in Glasgow. A lovely gift for anyone with a bit of Scotland in their heart.',
});
