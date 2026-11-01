const { buildBumper } = require('../bumper');
module.exports = buildBumper({ file: 'Super-Bumper-Large-Print-Christmas-Puzzle-Pack', short: 'Super Bumper Christmas Puzzles', title: 'Super Bumper Large Print Christmas Puzzle Pack',
  kicker: 'Super bumper large print puzzles', coverTitle: 'Super Bumper<br>Christmas<br>Puzzles', lead: 'Word searches, sudoku, mazes, scrambles, cryptograms and missing vowels: a whole winter\'s worth of festive puzzles in big, clear print.',
  data: 'bumper-xmas.json', theme: 'with a festive, wintry theme', bottom: 'From the makers of the Robertson & McGarrigle large print puzzle books.' });

module.exports.meta = require('../bumpermeta')(module.exports, 'xmas');
