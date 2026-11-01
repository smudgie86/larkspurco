const { buildBumper } = require('../bumper');
module.exports = buildBumper({ file: 'Super-Bumper-Large-Print-Nostalgia-Puzzle-Pack', short: 'Super Bumper Nostalgia Puzzles', title: 'Super Bumper Large Print Puzzle Pack: Days Gone By',
  kicker: 'Super bumper large print puzzles', coverTitle: 'Super Bumper<br>Puzzles:<br>Days Gone By', lead: 'Sweet shops, dance halls, the seaside and the sixties: 145 nostalgic and everyday puzzles in big, clear print.',
  data: 'bumper-every.json', theme: 'on everyday and nostalgic themes, from the sweet shop to the swinging sixties', bottom: 'A lovely gift for grandparents, care homes and anyone who enjoys a puzzle with their cuppa.' });

module.exports.meta = require('../bumpermeta')(module.exports, 'every');
