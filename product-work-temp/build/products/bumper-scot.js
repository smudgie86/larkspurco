const { buildBumper } = require('../bumper');
module.exports = buildBumper({ file: 'Super-Bumper-Large-Print-Scotland-Puzzle-Pack', short: 'Super Bumper Scotland Puzzles', title: 'Super Bumper Large Print Scotland Puzzle Pack',
  kicker: 'Super bumper large print puzzles', coverTitle: 'Super Bumper<br>Scotland<br>Puzzles', lead: 'From Hogmanay to the Highlands: word searches, sudoku, mazes, scrambles, Scots-saying cryptograms and missing vowels in big, clear print.',
  data: 'bumper-scot.json', theme: 'celebrating Scotland', bottom: 'Made in Glasgow. A braw gift for anyone who loves Scotland.' });

module.exports.meta = require('../bumpermeta')(module.exports, 'scot');
