// Dump hooks/features/pins for all products to JSON (for social captions).
const fs = require('fs');
const src = fs.readFileSync('marketing.js', 'utf8');
const C = eval('(' + src.slice(src.indexOf('const C = {') + 10, src.indexOf('const BASE')).trim().replace(/;$/, '') + ')');
const out = {};
for (const k of Object.keys(C)) out[k] = { sub: C[k].sub, features: C[k].features, kicker: C[k].kicker };
const B2 = ['bumper-xmas', 'bumper-scot', 'bumper-every', 'planner2027', 'digital2027', 'puppy', 'dogcare', 'catcare', 'rescue', 'petbiz', 'adhdbiz', 'etsyseller', 'craftfair', 'bookkeeping', 'content', 'sidehustle', 'kidsroutine', 'revision', 'moving', 'wedding',
  'legacy', 'bereavement', 'wedding-bundle', 'sheet-money', 'sheet-books', 'sheet-etsy', 'bundle-busy', 'bundle-biz', 'bundle-puzzles', 'bundle-pets', 'biblestudy', 'school2027', 'journal90', 'pocket-quest', 'pocket-set'];
for (const k of B2) { const m = require(`./products/${k}.js`).meta; out[k] = { sub: m.sub, features: m.features, kicker: m.kicker }; }
fs.writeFileSync('../qa/handoff-feat.json', JSON.stringify(out, null, 1));
console.log(Object.keys(out).length);
