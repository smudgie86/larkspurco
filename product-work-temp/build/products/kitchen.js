const fs = require('fs');
const path = require('path');
const { page, cover, section, lines, cbs, blankCbs, field, table, box, url } = require('../lib');

const T = 'The Low-Spoon Kitchen';

const spoonSvg = (fill = 'var(--clay)') => `<svg viewBox="0 0 12 34" style="width:2.6mm;height:7.4mm;vertical-align:middle"><ellipse cx="6" cy="7" rx="5" ry="6.5" fill="${fill}"/><rect x="4.9" y="12" width="2.2" height="21" rx="1.1" fill="${fill}"/></svg>`;
const spoons = (n) => `<span style="display:inline-flex;gap:.8mm;vertical-align:middle">${[1, 2, 3].map((i) => spoonSvg(i <= n ? 'var(--clay)' : 'var(--line)')).join('')}</span>`;

const cats = {
  nocook: { name: 'No-cook & five-minute', lead: 'For the days when even switching on the hob feels like too much. Assemble, stir, eat.' },
  micro: { name: 'Microwave & kettle', lead: 'Hot food with no pans to wash. A microwave and a kettle can do a surprising amount.' },
  onepan: { name: 'One pan, one tray', lead: 'Proper dinners with one thing to wash up. The oven does most of the work while you rest.' },
  batch: { name: 'Batch & freeze', lead: 'Cook once on a better day, eat well on the harder ones. Every recipe here makes four or more portions and freezes well.' },
};

const R = [
  // No-cook
  { id: 'oats', cat: 'nocook', name: 'Overnight Oats', spoons: 1, time: '5 min + overnight', serves: '1', intro: 'Breakfast made last night by a kinder version of you. Make two jars at once and that\'s two mornings sorted.',
    ing: ['50g rolled oats', '125ml milk (any kind)', '2 tbsp yoghurt', '1 tsp honey or maple syrup', 'A handful of berries (frozen is fine)', 'Optional: 1 tbsp peanut butter or seeds'],
    steps: ['Put the oats, milk, yoghurt and honey in a jar or tub with a lid.', 'Stir well, then add the berries on top.', 'Put the lid on and leave in the fridge overnight (at least 4 hours).', 'Stir and eat cold, straight from the jar.'],
    easier: 'Use a pot of fruit yoghurt instead of yoghurt, honey and fruit.', swap: 'Grated apple and cinnamon, or banana and a spoon of cocoa powder.', store: 'Keeps in the fridge for up to 2 days. Not suitable for freezing.' },
  { id: 'smoothie', cat: 'nocook', name: 'Get-Me-Going Smoothie', spoons: 1, time: '3 min', serves: '1', intro: 'Breakfast in a glass for when chewing feels like effort. The oats make it filling enough to keep you going.',
    ing: ['1 ripe banana', '150g frozen berries or mango', '150ml milk (any kind)', '2 tbsp yoghurt', '1 tbsp rolled oats', 'Optional: 1 tbsp peanut butter'],
    steps: ['Put everything into a blender or a tall jug if you use a stick blender.', 'Blend until smooth, about 30–60 seconds.', 'Add a splash more milk if it\'s too thick.', 'Pour and drink. Rinse the blender straight away so it doesn\'t set.'],
    easier: 'Freeze ready-made smoothie bags (banana, berries and oats) so you only add milk.', swap: 'Spinach for green, cocoa for chocolate, or ginger for a kick.', store: 'Best drunk straight away. Smoothie bags keep in the freezer for 3 months.' },
  { id: 'plate', cat: 'nocook', name: 'The Picky Bits Plate', spoons: 1, time: '5 min', serves: '1', intro: 'A grown-up lunchbox. Pick one thing from each group and arrange it on a plate. No cooking, still a proper meal.',
    ing: ['Something filling: crackers, oatcakes, pitta, a bread roll', 'Some protein: cheese, ham, a boiled egg (shop-bought), hummus, nuts', 'Something fresh: carrot sticks, cherry tomatoes, cucumber, apple, grapes', 'Something tasty: pickles, olives, chutney, a few crisps'],
    steps: ['Get a plate. A nice one, if you have it.', 'Add one or two things from each group.', 'Sit down somewhere comfy to eat it.'],
    easier: 'Buy pre-washed snack veg and grapes so there\'s no chopping.', swap: 'Make it a "snack board" for two and share it.', store: 'Keep a "picky bits" shelf in the fridge so everything is in one place.' },
  { id: 'wrap', cat: 'nocook', name: 'Tuna &amp; Sweetcorn Wraps', spoons: 1, time: '5 min', serves: '2 wraps', intro: 'A classic for a reason: cheap, filling and made from cupboard food. One bowl, one spoon.',
    ing: ['1 tin tuna (145g), drained', '2 tbsp mayonnaise', '3 tbsp tinned or frozen sweetcorn (defrosted)', 'Black pepper', '2 tortilla wraps', 'A handful of spinach or lettuce'],
    steps: ['Mix the tuna, mayonnaise, sweetcorn and a little pepper in a bowl.', 'Lay out the wraps and add some spinach to each.', 'Spoon the tuna mix down the middle.', 'Fold in the bottom, then roll up tightly.'],
    easier: 'Skip the wrap and eat it on crackers or a jacket potato.', swap: 'For a veggie version, mash a drained tin of chickpeas with the mayo instead of tuna.', store: 'The filling keeps in a covered tub in the fridge for up to 2 days.' },
  { id: 'toast', cat: 'nocook', name: 'Toast, Three Ways', spoons: 1, time: '5 min', serves: '1', intro: 'Toast is a perfectly good meal when you add some protein. Here are three toppings that count as a proper breakfast or lunch.',
    ing: ['2 slices of bread (wholemeal keeps you fuller)', 'Peanut butter and banana: 1 tbsp peanut butter, 1 sliced banana', 'Beans and cheese: half a tin of baked beans, a handful of grated cheese', 'Avocado and egg: half an avocado, salt, pepper, a squeeze of lemon, a shop-bought boiled egg'],
    steps: ['Toast the bread.', 'Pick a topping and pile it on.', 'For beans: microwave them in a covered bowl for 1–2 minutes, stirring halfway, until piping hot.'],
    easier: 'Keep sliced bread in the freezer and toast it from frozen.', swap: 'Use crumpets, bagels or an English muffin.', store: 'Freeze bread in its bag. It toasts straight from frozen.' },
  // Microwave
  { id: 'potato', cat: 'micro', name: 'Microwave Jacket Potato', spoons: 1, time: '12 min', serves: '1', intro: 'A hot, filling meal in about ten minutes with no oven needed. The toppings are where the fun is.',
    ing: ['1 medium baking potato (about 250g)', 'A little butter', 'Topping ideas: baked beans and cheese, tuna mayo and sweetcorn, cottage cheese and chives, leftover chilli'],
    steps: ['Wash the potato and prick it all over with a fork (6–8 times).', 'Put it on a microwave-safe plate and cook on high for 5 minutes.', 'Turn it over (use a tea towel, it\'s hot) and cook for another 3–5 minutes, until a knife slides in easily.', 'Leave for 2 minutes, then cut open and add butter and your topping.'],
    easier: 'Want crispy skin? Pop it in a hot oven or air fryer at 200°C for 10 minutes after microwaving.', swap: 'Use a sweet potato. It usually needs a minute or two less.', store: 'Microwaves vary. These times are for an 800W microwave, so add or take off a minute for yours.' },
  { id: 'eggs', cat: 'micro', name: 'Mug Scrambled Eggs', spoons: 1, time: '4 min', serves: '1', intro: 'Soft scrambled eggs in a mug, with no pan to scrub. Eat with toast, in a wrap or straight from the mug.',
    ing: ['2 eggs', '2 tbsp milk', 'A small knob of butter', 'Salt and pepper', 'Optional: a little grated cheese or chopped chives'],
    steps: ['Rub the butter round the inside of a large microwave-safe mug.', 'Crack in the eggs, add the milk, salt and pepper, and beat with a fork.', 'Microwave on high for 45 seconds, then stir.', 'Keep cooking in 20–30 second bursts, stirring each time, until the eggs are just set (usually 1½–2 minutes in total). Leave to stand for 30 seconds.'],
    easier: 'Use a microwave egg-cooker or a silicone egg pot.', swap: 'Stir in some spinach, ham or leftover veg before the last burst.', store: 'Best eaten straight away. The mug will be hot, so use a tea towel.' },
  { id: 'couscous', cat: 'micro', name: 'Kettle Couscous Bowl', spoons: 1, time: '10 min', serves: '2', intro: 'Couscous "cooks" with just boiling water from the kettle. Add a few bits from the fridge and you\'ve got a lunch that keeps for two days.',
    ing: ['150g couscous', '200ml boiling water with half a stock cube', '1 tin chickpeas (400g), drained', 'A handful of cherry tomatoes, halved', 'A chunk of cucumber, chopped', '100g feta, crumbled', '1 tbsp olive oil and a squeeze of lemon'],
    steps: ['Put the couscous in a bowl and pour over the hot stock.', 'Cover with a plate and leave for 5 minutes.', 'Fluff it up with a fork.', 'Stir in the chickpeas, tomatoes, cucumber, feta, oil and lemon.'],
    easier: 'Use flavoured couscous packets and a bag of salad.', swap: 'Try leftover chicken, tinned salmon or roasted veg.', store: 'Keeps in a covered tub in the fridge for up to 2 days.' },
  // One pan
  { id: 'friedrice', cat: 'onepan', name: '10-Minute Egg Fried Rice', spoons: 2, time: '10 min', serves: '2', intro: 'Faster than a takeaway. A pouch of microwave rice and a bag of frozen veg do the heavy lifting.',
    ing: ['1 tbsp oil', '150g frozen peas or mixed veg', '2 eggs', '1 pouch (250g) cooked microwave rice', '1–2 tbsp soy sauce', '2 spring onions, snipped with scissors'],
    steps: ['Heat the oil in a large frying pan or wok over a medium-high heat.', 'Add the frozen veg and cook for 3 minutes, stirring.', 'Push the veg to one side, crack the eggs into the space and stir until scrambled.', 'Squeeze the rice pouch to break it up, add it to the pan and stir-fry for 3–4 minutes until piping hot. Stir in the soy sauce and spring onions.'],
    easier: 'Skip the egg and use leftover cooked chicken or prawns instead.', swap: 'Add a spoon of sweet chilli or a dash of sesame oil.', store: 'Cooked rice: cool and refrigerate within an hour, eat within 24 hours, and reheat only once until piping hot.' },
  { id: 'pasta', cat: 'onepan', name: 'One-Pot Tomato Pasta', spoons: 2, time: '20 min', serves: '3', intro: 'The pasta cooks right in the sauce, so there\'s no draining and only one pan to wash.',
    ing: ['500g carton of passata', '500ml water with 1 stock cube', '2 tsp garlic paste (or 1 tsp garlic granules)', '1 tsp dried oregano or mixed herbs', '250g dried pasta (penne or fusilli)', 'A big handful of spinach', 'Grated cheese, to serve'],
    steps: ['Put the passata, water, stock cube, garlic and herbs in a large pan and bring to the boil.', 'Add the pasta, turn the heat down and simmer without a lid for 12–15 minutes, stirring often so it doesn\'t stick.', 'Add a splash of water if it gets too thick before the pasta is cooked.', 'Stir in the spinach until it wilts. Serve with cheese.'],
    easier: 'Use a jar of pasta sauce instead of passata and herbs.', swap: 'Add a drained tin of tuna, some frozen peas, or a spoon of cream cheese.', store: 'Keeps in the fridge for up to 2 days. Reheat with a splash of water until piping hot.' },
  { id: 'gnocchi', cat: 'onepan', name: 'Gnocchi &amp; Tomato Traybake', spoons: 2, time: '35 min (mostly oven)', serves: '2–3', intro: 'Shop-bought gnocchi goes crispy and golden in the oven. Throw it all on a tray and go and sit down.',
    ing: ['500g pack of fresh gnocchi', '250g cherry tomatoes', '1 pepper, roughly chopped (or a bag of ready-chopped)', '1 red onion, cut into wedges (or frozen chopped onion)', '2 tbsp olive oil', '1 tsp dried Italian herbs', '125g mozzarella, torn'],
    steps: ['Heat the oven to 200°C (180°C fan, gas 6).', 'Tip everything except the mozzarella into a large roasting tin and toss with your hands.', 'Roast for 20 minutes, then give the tray a shake.', 'Scatter over the mozzarella and roast for another 10 minutes, until golden and bubbling.'],
    easier: 'Line the tin with baking paper so there\'s almost no washing up.', swap: 'Feta instead of mozzarella, or add a few sliced sausages at the start.', store: 'Best eaten fresh. Leftovers keep in the fridge for up to 2 days.' },
  { id: 'sausage', cat: 'onepan', name: 'Sausage &amp; Potato Traybake', spoons: 2, time: '50 min (mostly oven)', serves: '3–4', intro: 'A cosy Sunday-style dinner from one tray. Ten minutes of effort, then the oven takes over.',
    ing: ['500g baby potatoes, halved (or a ready-prepared bag)', '1 red onion, cut into wedges', '1 pepper, roughly chopped', '2 tbsp oil', '1 tsp dried thyme or rosemary', '8 sausages (or vegetarian sausages)'],
    steps: ['Heat the oven to 200°C (180°C fan, gas 6).', 'Toss the potatoes, onion, pepper, oil and herbs in a large roasting tin. Roast for 15 minutes.', 'Add the sausages, give everything a shake and roast for 25–30 minutes more, turning the sausages once.', 'Check the sausages are cooked right through, with no pink in the middle, before serving.'],
    easier: 'Use a bag of frozen roast potatoes. They\'ll need the same total time.', swap: 'Add a drizzle of honey and mustard for the last 10 minutes.', store: 'Leftovers keep in the fridge for up to 2 days. Reheat until piping hot.' },
  { id: 'salmon', cat: 'onepan', name: 'Salmon &amp; Greens Parcels', spoons: 2, time: '25 min', serves: '2', intro: 'Fish cooked in a foil parcel stays soft and juicy, and the tray stays clean. Serve with a pouch of microwave rice.',
    ing: ['2 salmon fillets', '200g green beans or tenderstem broccoli', '1 tbsp olive oil', '1 tbsp soy sauce or pesto', '½ lemon, sliced', 'Microwave rice or new potatoes, to serve'],
    steps: ['Heat the oven to 200°C (180°C fan, gas 6).', 'Tear off two big pieces of foil. Put half the greens in the middle of each, with a salmon fillet on top.', 'Drizzle with the oil and soy sauce, top with lemon, then fold the foil into loose, sealed parcels.', 'Bake on a tray for 15–18 minutes, until the salmon is pale pink all the way through and flakes easily.'],
    easier: 'Use frozen salmon fillets. Follow the packet for the cooking time.', swap: 'Try cod, or chicken breast (allow 25–30 minutes and check it\'s cooked through).', store: 'Best eaten fresh. Cooked fish keeps in the fridge for 1 day.' },
  { id: 'quesadilla', cat: 'onepan', name: 'Cheese &amp; Bean Quesadilla', spoons: 1, time: '10 min', serves: '1–2', intro: 'A toasted, melty sandwich made with wraps. Cheap, quick and very forgiving.',
    ing: ['2 tortilla wraps', '½ tin (200g) black beans or kidney beans, drained', '50g grated cheddar', '2 tbsp salsa or a pinch of chilli flakes', 'Optional: sweetcorn, spring onion, leftover chicken'],
    steps: ['Mash the beans roughly with a fork.', 'Spread them over one wrap, then add the cheese and salsa. Put the other wrap on top.', 'Cook in a dry frying pan over a medium heat for 2–3 minutes, until golden underneath.', 'Flip carefully (use a plate) and cook for 2 minutes more. Cut into wedges.'],
    easier: 'Make it in a sandwich toaster or a hot oven at 200°C for 8–10 minutes.', swap: 'Use leftover chilli instead of beans.', store: 'Best eaten fresh. The beans keep in a covered tub in the fridge for 2 days.' },
  { id: 'nachos', cat: 'onepan', name: 'Loaded Nachos Tray', spoons: 1, time: '15 min', serves: '2', intro: 'The perfect way to use up a portion of leftover chilli, or a tin of beans. Eat with your hands, straight from the tray.',
    ing: ['150g bag of tortilla chips', '1 portion of leftover chilli (or a tin of mixed beans in chilli sauce)', '75g grated cheddar', 'To serve: salsa, soured cream, guacamole, sliced jalapeños'],
    steps: ['Heat the oven to 200°C (180°C fan, gas 6).', 'If using chilli from the freezer, defrost it and heat until piping hot first.', 'Spread the chips on a baking tray, spoon over the hot chilli and scatter with cheese.', 'Bake for 8–10 minutes until the cheese is melted. Add your toppings.'],
    easier: 'Use a jar of salsa and a tub of ready-made guacamole.', swap: 'Use leftover shredded chicken with a spoonful of fajita seasoning.', store: 'Best eaten straight away. Chips go soft once they\'re loaded.' },
  // Batch
  { id: 'curry', cat: 'batch', name: 'Chickpea &amp; Spinach Curry', spoons: 2, time: '30 min', serves: '4', intro: 'A mild, creamy curry from store-cupboard tins. Make it on a good day and freeze it in portions for the hard ones.',
    ing: ['1 tbsp oil', '1 onion, chopped (or 150g frozen chopped onion)', '3 tbsp curry paste (tikka or korma)', '1 tin (400g) chopped tomatoes', '2 tins (400g) chickpeas, drained', '200ml coconut milk (half a tin)', '100g spinach', 'Rice or naan, to serve'],
    steps: ['Heat the oil in a large pan and cook the onion for 5 minutes until soft.', 'Stir in the curry paste and cook for 1 minute.', 'Add the tomatoes and chickpeas and simmer for 15 minutes, stirring now and then.', 'Pour in the coconut milk, then stir in the spinach until it wilts.'],
    easier: 'Use a jar of curry sauce instead of the paste and tomatoes.', swap: 'Add leftover roast chicken, a tin of lentils, or frozen cauliflower.', store: 'Cool, then freeze in portions for up to 3 months. Keeps in the fridge for 2 days.' },
  { id: 'dal', cat: 'batch', name: 'Cosy Red Lentil Dal', spoons: 2, time: '35 min', serves: '4', intro: 'Gentle, warming and very cheap. Red lentils don\'t need soaking, and they melt into a thick, comforting stew.',
    ing: ['1 tbsp oil', '1 onion, chopped (or frozen chopped onion)', '2 tsp garlic paste', '1 tsp ginger paste', '2 tsp mild curry powder', '250g red lentils, rinsed', '1 tin (400g) chopped tomatoes', '750ml vegetable stock'],
    steps: ['Heat the oil in a large pan and cook the onion for 5 minutes.', 'Add the garlic, ginger and curry powder and stir for 1 minute.', 'Add the lentils, tomatoes and stock. Bring to the boil, then simmer for 20–25 minutes, stirring now and then, until the lentils are soft.', 'Add a splash of water if it gets too thick. Taste and add a little salt.'],
    easier: 'Use frozen chopped onion and a jar of mixed garlic and ginger paste.', swap: 'Stir in half a tin of coconut milk or a handful of spinach at the end.', store: 'Cool, then freeze in portions for up to 3 months. Keeps in the fridge for 2 days.' },
  { id: 'chilli', cat: 'batch', name: 'Big-Batch Chilli', spoons: 3, time: '45 min', serves: '5', intro: 'One pot, five meals: with rice, in a jacket potato, on nachos, in a wrap. A freezer hero.',
    ing: ['1 tbsp oil', '500g beef mince (or 2 extra tins of beans for veggie)', '1 onion and 1 pepper, chopped (or 300g frozen mix)', '2 tsp garlic paste', '2 tsp mild chilli powder and 1 tsp ground cumin', '1 tin (400g) chopped tomatoes', '1 tin (400g) kidney beans, drained', '1 tbsp tomato purée and 1 stock cube in 150ml water'],
    steps: ['Heat the oil in a large pan and brown the mince for 5–8 minutes, breaking it up as it cooks.', 'Add the onion and pepper and cook for 5 minutes.', 'Stir in the garlic and spices for 1 minute, then add the tomatoes, beans, purée and stock.', 'Simmer for 25–30 minutes, stirring now and then, until thick. Make sure the mince is cooked through.'],
    easier: 'Use a chilli seasoning sachet instead of the spices and stock.', swap: 'Use turkey mince, or swap the mince for a tin of lentils plus an extra tin of beans.', store: 'Cool, then freeze in portions for up to 3 months. Keeps in the fridge for 2 days.' },
  { id: 'soup', cat: 'batch', name: 'Any-Veg Soup', spoons: 2, time: '35 min', serves: '4', intro: 'Use up whatever veg is in the fridge or the freezer. Blend it smooth or leave it chunky, whatever you prefer.',
    ing: ['1 tbsp oil', '1 onion, chopped (or frozen chopped onion)', '500g veg: carrots, leeks, squash, frozen soup mix, anything', '1 large potato, chopped (no need to peel)', '1 litre vegetable stock', 'Optional: 1 tin (400g) chopped tomatoes or lentils'],
    steps: ['Heat the oil in a large pan and cook the onion for 5 minutes.', 'Add all the veg, the potato and the stock.', 'Bring to the boil, then simmer for 20–25 minutes until everything is soft.', 'Blend until smooth (let it cool a little first) or leave chunky. Season to taste.'],
    easier: 'Use a bag of frozen soup veg. There\'s nothing to chop at all.', swap: 'Add a spoon of curry powder, pesto, or a handful of grated cheese.', store: 'Cool, then freeze in portions for up to 3 months. Keeps in the fridge for 2 days.' },
  { id: 'stew', cat: 'batch', name: 'Slow Cooker Chicken Stew', spoons: 2, time: '15 min + 4–8 hrs', serves: '4–5', intro: 'Put it in the slow cooker in the morning and dinner makes itself. The house smells lovely, too.',
    ing: ['6 boneless chicken thighs', '500g baby potatoes, halved', '2 carrots, chopped (or a bag of ready-chopped)', '1 onion, chopped (or frozen)', '2 tsp garlic paste', '1 tbsp tomato purée', '1 tsp dried thyme', '500ml hot chicken stock'],
    steps: ['Put the potatoes, carrots and onion in the slow cooker.', 'Lay the chicken on top.', 'Stir the garlic, purée and thyme into the hot stock, then pour it over.', 'Cook on low for 6–8 hours or high for 3–4 hours, until the chicken is cooked through and the potatoes are tender.'],
    easier: 'Use a packet of casserole mix stirred into the stock.', swap: 'Add a drained tin of butter beans and a handful of frozen peas for the last 30 minutes.', store: 'Cool, then freeze in portions for up to 3 months. Keeps in the fridge for 2 days. Always follow your slow cooker\'s instructions.' },
];

const imgPath = (id) => path.join(__dirname, '..', 'img', 'recipes', `${id}.jpg`);
const hasImg = (id) => fs.existsSync(imgPath(id));

const recipePage = (r) => page(`
<div class="row" style="flex:none;align-items:flex-start">
<div>
<div class="kicker">${cats[r.cat].name}</div>
<h1 class="sm" style="margin-top:1mm">${r.name}</h1>
<p class="muted" style="margin-top:1.5mm">${r.intro}</p>
<div style="display:flex;gap:5mm;margin-top:3mm;align-items:center" class="small">
<span>${spoons(r.spoons)} <b style="margin-left:1mm">${r.spoons} spoon${r.spoons > 1 ? 's' : ''}</b></span>
<span><b>Time</b> ${r.time}</span><span><b>Serves</b> ${r.serves}</span></div>
</div>
${hasImg(r.id) ? `<div style="flex:none;width:58mm;height:58mm;border-radius:50%;overflow:hidden;background:var(--clay-light)"><img src="${url('img/recipes/' + r.id + '.jpg')}" style="width:100%;height:100%;object-fit:cover"></div>` : ''}
</div>
<div class="row" style="align-items:stretch">
<div class="box cream" style="flex:0 0 66mm"><div class="label">You'll need</div><ul class="dots small">${r.ing.map((x) => `<li>${x}</li>`).join('')}</ul></div>
<div class="box"><div class="label">Method</div>${r.steps.map((s, i) => `<div class="step"><div class="n">${i + 1}</div><div class="small">${s}</div></div>`).join('')}</div>
</div>
<div class="g3">
${box('Make it easier', `<p class="small">${r.easier}</p>`, 'sage')}
${box('Swap it', `<p class="small">${r.swap}</p>`)}
${box('Store it', `<p class="small">${r.store}</p>`, 'clay')}
</div>
${box('My notes', lines(), 'fill')}
`, { sect: `Recipes · ${cats[r.cat].name}`, deco: hasImg(r.id) ? '' : 'small', cls: 'recipe' });

const recipeIndexRows = R.map((r) => `<div class="toc"><b>${r.name}</b><span class="small">${spoons(r.spoons)}&nbsp;&nbsp;${r.time}</span></div>`);

const plan = (title, lead, rows) => page(`<div class="kicker">Meal plans</div><h1 class="sm">${title}</h1><p class="muted">${lead}</p>
<div class="tbl-fill">${table(['', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'], rows, { widths: ['12%', '20%', '22%', '26%'], rh: 17 })}</div>
<p class="tiny muted">Batch-cooked meals come from the freezer, so defrost them in the fridge overnight, or in the microwave, and reheat until piping hot.</p>`, { sect: 'Meal plans' });

const days7 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => `<b style="color:var(--clay-deep)">${d}</b>`);

const pages = [
  cover({ kicker: 'Simple food for low-energy days', title: 'The<br>Low-Spoon<br>Kitchen', lead: '20 easy recipes rated by energy, plus meal plans, a batch-cooking plan and a "zero-spoon" list for the hardest days.', tags: ['Spoon theory', 'Print at home', '44 pages'], bottom: 'For ADHD, chronic illness, burnout, new parents, and anyone who\'s just very tired.' }),

  page(`<div class="kicker">Start here</div><h1>Food, on the hard days</h1>
<p class="lead">When your energy is low, food is often the first thing to go: too many steps, too many decisions, too much washing up. You end up skipping meals or living on toast and feeling worse for it.</p>
<p>This book is built for those days. Every recipe is rated by how much energy it takes, uses shortcuts on purpose (frozen veg, jars, microwave rice, pre-chopped everything) and keeps the washing up to a minimum. There's no clean eating and no judgement here, just simple food that helps you feel a bit more human.</p>
<div class="g2">
${box('Inside', cbs(['20 recipes, rated by spoons', 'A "zero-spoon" list for days you can\'t cook', 'A low-spoon kitchen setup and cupboard list', 'Build-a-bowl formula for endless meals', 'Two example weekly meal plans', 'Batch-cooking plan and freezer log', 'Blank planners and shopping lists']))}
${box('Good to know', `<ul class="dots small"><li>Oven temperatures are given for conventional, fan and gas ovens.</li><li>Microwave times are for an 800W microwave. Adjust for yours.</li><li>Always check labels for allergens, and follow the cooking instructions on any packaged food you use.</li><li>Use a separate chopping board for raw meat, and wash your hands after handling it.</li></ul>`, 'sage')}
</div>
<p class="tiny muted">This book offers general recipes and planning ideas, not medical or dietary advice. If you have a medical condition, allergies or specific nutritional needs, please follow the advice of your GP or dietitian.</p>`, { sect: 'Welcome', deco: 'tr' }),

  page(`<div class="kicker">Inside</div><h1>Contents</h1>
<div class="g2" style="gap:8mm;margin-top:3mm"><div>
<h3 style="margin:2mm 0">Getting set up</h3>
${[['Spoon theory &amp; food', 4], ['Reading the recipe pages', 5], ['The low-spoon kitchen', 6], ['The cupboard list', 7], ['Zero-spoon food', 8], ['Build a bowl', 9], ['Food safety basics', 10]].map(([a, b]) => `<div class="toc"><b>${a}</b><span>${b}</span></div>`).join('')}
<h3 style="margin:4mm 0 2mm">Plan it</h3>
${[['Example week: low spoons', 35], ['Example week: up and down', 36], ['Weekly meal planner', 37], ['Shopping list', 38], ['Batch-cooking day plan', 39], ['Freezer log', 40], ['Meal ideas we like', 41], ['My own recipe', 42], ['Eating on very hard days', 43], ['Thank you', 44]].map(([a, b]) => `<div class="toc"><b>${a}</b><span>${b}</span></div>`).join('')}
</div><div>
<h3 style="margin:2mm 0">The recipes</h3>
${(() => { let n = 11; const out = []; Object.keys(cats).forEach((c) => { out.push(`<div class="toc" style="margin-top:1.5mm"><b style="color:var(--sage-deep)">${cats[c].name}</b><span>${n}</span></div>`); n++; R.filter((r) => r.cat === c).forEach((r) => { out.push(`<div class="toc small"><span>${r.name}</span><span>${n}</span></div>`); n++; }); }); return out.join(''); })()}
</div></div>`, { sect: 'Contents', deco: 'small', cls: 'nofill' }),

  page(`<div class="kicker">Getting set up</div><h1>Spoon theory &amp; food</h1>
<p class="lead">Spoon theory was created by Christine Miserandino in 2003 to explain life with chronic illness. Each spoon stands for a unit of energy. You start the day with a limited number, and every task (getting dressed, a phone call, cooking) uses some up.</p>
<p>It has since been taken up by lots of people with ADHD, autism, long-term illness and burnout, because it explains something everyone with limited energy knows: you have to choose what to spend it on. Cooking can be surprisingly expensive in spoons: planning, shopping, chopping, standing, timing, cleaning up. This book helps you spend fewer spoons on food, so you have more left for everything else.</p>
<div class="g3" style="margin-top:2mm">
${box('', `<div>${spoons(1)}</div><h3 style="margin-top:2mm">One spoon</h3><p class="small">Little or no cooking, five or ten minutes, almost no washing up.</p>`, 'cream')}
${box('', `<div>${spoons(2)}</div><h3 style="margin-top:2mm">Two spoons</h3><p class="small">A little chopping or stirring, and mostly hands-off time in the oven or on the hob.</p>`, 'cream')}
${box('', `<div>${spoons(3)}</div><h3 style="margin-top:2mm">Three spoons</h3><p class="small">More steps, best saved for a better day. Makes lots, so it pays you back later.</p>`, 'cream')}
</div>
<div class="callout sage"><h3>Spend spoons when you have them</h3><p class="small">On a good day, spend a few extra spoons on a batch recipe. On a bad day, take a portion out of the freezer and you've spent almost nothing. That's how the meal plans in this book work.</p></div>
${box('On a typical day, how many spoons does food cost me?', lines(), 'fill')}`, { sect: 'Getting set up', deco: 'small' }),

  page(`<div class="kicker">Getting set up</div><h1>Reading the recipe pages</h1><p class="muted">Every recipe page follows the same layout, so you always know where to look.</p>
<div class="col">
${[['Spoon rating', 'How much energy the recipe takes, from one to three spoons. Pick a recipe that matches the energy you have right now.'], ['Time and servings', 'The total time, including oven time when you can sit down. "Serves" is roughly how many portions it makes.'], ['You\'ll need', 'The ingredients, with shortcuts built in. Where it says "or frozen", the frozen version works just as well.'], ['Method', 'Short, numbered steps. Tick them off as you go if it helps you keep your place.'], ['Make it easier', 'An even lower-effort version for the days you need it.'], ['Swap it', 'Ideas for using what you\'ve got, or changing it up when you\'re bored.'], ['Store it', 'How long it keeps and whether it freezes.']].map(([h, t]) => `<div class="box" style="flex-direction:row;gap:5mm"><b style="flex:none;width:36mm;color:var(--sage-deep)">${h}</b><span class="small">${t}</span></div>`).join('')}
</div>
<div class="callout"><h3>Tip</h3><p class="small">Read the whole recipe and get everything out on the counter before you start. It saves a lot of hunting about halfway through.</p></div>`, { sect: 'Getting set up' }),

  page(`<div class="kicker">Getting set up</div><h1>The low-spoon kitchen</h1><p class="muted">A few bits of kit make cooking with low energy much easier. You don't need all of them. Tick what you already have.</p>
<div class="g2">
${box('Kit that saves spoons', cbs(['Kitchen scissors (snip instead of chop)', 'A large non-stick frying pan with a lid', 'One big pan for soups and pasta', 'A large roasting tin and baking paper', 'Microwave-safe bowls with lids', 'Freezer bags and stackable tubs', 'A stool to sit on while you cook', 'A slow cooker or air fryer (lovely, not essential)', 'A stick blender for soups']))}
${box('Shortcuts worth buying', cbs(['Frozen chopped onion and peppers', 'Frozen mixed veg and soup veg', 'Microwave rice and grain pouches', 'Garlic and ginger paste', 'Pre-grated cheese', 'Bagged salad and spinach', 'Tinned beans, lentils and chickpeas', 'Jars of curry and pasta sauce', 'Ready-prepared potatoes']), 'sage')}
</div>
<div class="g2">
${box('Ways to save energy while cooking', `<ul class="dots small"><li>Sit down to chop or stir.</li><li>Get everything out before you start.</li><li>Fill the sink with hot soapy water first and wash as you go.</li><li>Line trays with baking paper.</li><li>Put on a podcast or music.</li><li>Cook double and freeze half.</li></ul>`, 'cream')}
${box('Things I\'d like to get', blankCbs(6))}
</div>`, { sect: 'Getting set up' }),

  page(`<div class="kicker">Getting set up</div><h1>The cupboard list</h1><p class="muted">Keep these in stock and you can always make something. Tick what you have, and use it as a shopping list when you run low.</p>
<div class="g3 grow">
${box('Cupboard', cbs(['Pasta', 'Rice / microwave rice', 'Couscous', 'Rolled oats', 'Red lentils', 'Tinned tomatoes', 'Passata', 'Tinned chickpeas', 'Tinned beans', 'Baked beans', 'Tinned tuna', 'Stock cubes', 'Curry paste', 'Peanut butter', 'Tortilla wraps', 'Crackers / oatcakes']))}
${box('Fridge', cbs(['Eggs', 'Milk', 'Yoghurt', 'Cheddar', 'Butter', 'Hummus', 'Garlic paste', 'Spinach', 'Salad / snack veg', 'Fruit', 'Mayonnaise', 'Soy sauce']))}
${box('Freezer', cbs(['Frozen peas', 'Mixed veg', 'Chopped onion', 'Soup veg', 'Berries', 'Bread', 'Fish fillets', 'Frozen potatoes', 'Batch-cooked meals']) + `<div class="label" style="margin-top:3mm">Herbs & spices</div>` + cbs(['Dried mixed herbs', 'Curry powder', 'Chilli powder', 'Ground cumin']))}
</div>`, { sect: 'Getting set up', deco: 'small' }),

  page(`<div class="kicker">For the very hardest days</div><h1>Zero-spoon food</h1><p class="muted">Some days there's nothing left for cooking. That's okay. Eating something is always better than eating nothing. These need no cooking at all, or just a microwave or toaster.</p>
<div class="g2">
${box('Grab and eat', cbs(['A banana, apple or satsuma', 'A handful of nuts', 'Cheese and crackers', 'A yoghurt pot', 'Cereal with milk', 'A cereal bar or flapjack', 'A shop-bought sandwich', 'Hummus and breadsticks']))}
${box('Microwave or toaster', cbs(['Toast with peanut butter', 'A pot of microwave porridge', 'Microwave rice with a tin of tuna', 'A tin of soup', 'Beans on toast', 'A ready meal', 'A portion from the freezer', 'Crumpets']), 'sage')}
</div>
${box('My zero-spoon foods', `<p class="tiny muted">The things I can always face. Keep them in stock.</p>${blankCbs(5)}`, 'clay')}
<div class="callout"><h3>Fed is the goal</h3><p class="small">Ready meals, takeaways and cereal for dinner are allowed. Try to keep a few zero-spoon foods in stock all the time, so they're there when you need them.</p></div>`, { sect: 'Getting set up', deco: 'small' }),

  page(`<div class="kicker">One formula, endless meals</div><h1>Build a bowl</h1><p class="muted">No recipe needed. Pick one thing from each column, put it in a bowl, and you've got a balanced meal. Use leftovers, tins and anything ready-cooked.</p>
<div class="g4" style="grid-template-columns:repeat(5,1fr)">
${[['1. Base', ['Microwave rice', 'Couscous', 'Pasta', 'Noodles', 'Jacket potato', 'Salad leaves']], ['2. Protein', ['Tinned tuna or salmon', 'Chickpeas or beans', 'Boiled egg', 'Leftover chicken', 'Feta or halloumi', 'Tofu']], ['3. Veg', ['Cherry tomatoes', 'Cucumber', 'Sweetcorn', 'Frozen peas', 'Grated carrot', 'Roasted veg']], ['4. Sauce', ['Pesto', 'Sweet chilli', 'Soy sauce', 'Yoghurt and mint', 'Salsa', 'Hummus']], ['5. Crunch', ['Seeds', 'Nuts', 'Croutons', 'Crispy onions', 'Tortilla chips', 'Spring onion']]].map(([h, items], i) => box(h, items.map((x) => `<div class="small" style="margin:.8mm 0">${x}</div>`).join(''), i % 2 ? 'cream' : 'sage')).join('')}
</div>
<h2>Bowls to try</h2>
<div class="g3">
${[['Tuna &amp; sweetcorn', 'Rice, tuna, sweetcorn, cucumber, sweet chilli'], ['Greek-ish', 'Couscous, chickpeas, tomato, cucumber, feta, yoghurt'], ['Noodle bowl', 'Noodles, egg, frozen peas, spring onion, soy sauce']].map(([h, t]) => box('', `<h3>${h}</h3><p class="small">${t}</p>`)).join('')}
</div>
${box('My favourite bowls', lines(), 'fill')}`, { sect: 'Getting set up' }),

  page(`<div class="kicker">Getting set up</div><h1>Food safety basics</h1><p class="muted">The few rules that matter most when you're cooking ahead and keeping leftovers. Based on UK Food Standards Agency guidance. Check food.gov.uk for the latest advice.</p>
<div class="g2">
${[['Cool it quickly', 'Cool leftovers as fast as you can (spread them out in a shallow container) and get them into the fridge or freezer within two hours.'], ['Eat leftovers within 2 days', 'Keep cooked leftovers in the fridge and eat them within two days. Cooked rice is different (see below).'], ['Take care with rice', 'Cool cooked rice quickly, refrigerate within an hour if you can, eat it within 24 hours, and reheat it only once.'], ['Reheat until piping hot', 'Food should be steaming hot all the way through. Stir halfway when microwaving. Only reheat food once.'], ['Defrost safely', 'Defrost in the fridge overnight, or in the microwave on the defrost setting. Cook or eat it once defrosted.'], ['Fridge at 5°C or below', 'Keep raw meat on the bottom shelf, covered, so it can\'t drip onto other food.'], ['Label your freezer food', 'Write what it is and the date. For the best taste, aim to eat frozen meals within 3 months.'], ['Use-by dates', '"Use by" is about safety, so stick to it. "Best before" is about quality.']].map(([h, t], i) => box('', `<h3>${h}</h3><p class="small">${t}</p>`, i % 3 === 0 ? 'cream' : '')).join('')}
</div>`, { sect: 'Getting set up', deco: 'small' }),
];

Object.keys(cats).forEach((c) => {
  pages.push(section({ kicker: 'Recipes', title: cats[c].name, lead: cats[c].lead, body: `<div style="margin-top:8mm;max-width:130mm">${R.filter((r) => r.cat === c).map((r) => `<div class="toc"><b>${r.name}</b><span class="small">${spoons(r.spoons)}&nbsp;&nbsp;${r.time}</span></div>`).join('')}</div>` }));
  R.filter((r) => r.cat === c).forEach((r) => pages.push(recipePage(r)));
});

pages.push(
  plan('Example week: low spoons', 'For a week when energy is really low. Mostly one-spoon meals plus portions from the freezer. Spoons for the week are kept to a minimum.', [
    [days7[0], 'Overnight oats', 'Picky bits plate', 'Chilli (freezer) + jacket potato', 'Fruit, crackers'],
    [days7[1], 'Toast + peanut butter', 'Tuna wraps', 'Dal (freezer) + microwave rice', 'Yoghurt'],
    [days7[2], 'Smoothie', 'Leftover tuna mix on crackers', 'Mug eggs on toast', 'Nuts, fruit'],
    [days7[3], 'Overnight oats', 'Couscous bowl', 'Soup (freezer) + toast', 'Cheese, oatcakes'],
    [days7[4], 'Toast + beans', 'Couscous bowl (leftover)', 'Takeaway or ready meal. Planned, no guilt.', 'Treat'],
    [days7[5], 'Smoothie', 'Quesadilla', 'Curry (freezer) + naan', 'Fruit'],
    [days7[6], 'Mug eggs + toast', 'Picky bits plate', 'Chilli nachos (freezer)', 'Yoghurt'],
  ]),
  plan('Example week: up and down', 'For a week with some better days. Use a good day to batch cook, then eat the results all week.', [
    [days7[0], 'Overnight oats (×2)', 'Picky bits plate', 'Sausage traybake (double)', 'Fruit'],
    [days7[1], 'Overnight oats', 'Leftover traybake', 'One-pot tomato pasta', 'Yoghurt'],
    [days7[2], 'Toast + egg', 'Leftover pasta', 'Salmon parcels + rice', 'Nuts'],
    [days7[3], 'Smoothie', 'Tuna wraps', 'Egg fried rice', 'Crackers + cheese'],
    [days7[4], 'Toast + peanut butter', 'Couscous bowl', 'Gnocchi traybake', 'Treat'],
    [days7[5], 'Mug eggs', 'Couscous bowl', 'Batch day: chilli + dal (freeze most)', 'Fruit'],
    [days7[6], 'Smoothie', 'Jacket potato + chilli', 'Slow cooker stew', 'Yoghurt'],
  ]),
  plan('Weekly meal planner', 'Plan the week loosely. It\'s fine to swap days around, or have cereal instead.', [
    ...days7.map((d) => [d, '', '', '', '']),
  ]),
  page(`<div class="kicker">Plan it</div><h1 class="sm">Shopping list</h1><p class="muted">Sorted by area of the shop. Tick things off as you go, or copy it into your online basket.</p>
<div class="g3 grow">${['Fruit &amp; veg', 'Fridge', 'Freezer', 'Cupboard', 'Bread &amp; bakery', 'Meat &amp; fish', 'Drinks', 'Snacks', 'Other'].map((x) => box(x, blankCbs(6))).join('')}</div>
${box('', `<div class="row">${field('Shop / delivery day')}${field('Budget £')}</div>`, 'cream')}`, { sect: 'Plan it' }),
  page(`<div class="kicker">Plan it</div><h1 class="sm">Batch-cooking day plan</h1><p class="muted">Do this on a better day. Pick two recipes from the Batch &amp; Freeze section, and you could have eight or more meals in the freezer in about two hours.</p>
<div class="g2">
${box('Before you start', cbs(['Pick two recipes and check you have everything', 'Clear the worktop and empty the dishwasher', 'Get out tubs, bags and a marker pen', 'Put on music, a podcast or a body double', 'Have a drink and a snack ready for you']))}
${box('My two recipes', `<div class="field"><span>1.</span><i></i></div><div class="field"><span>2.</span><i></i></div><div class="label" style="margin-top:2mm">Portions I'm aiming for</div>${lines(14)}`, 'sage')}
</div>
${box('Order of play (example: chilli and dal)', `<div class="step"><div class="n">1</div><div class="small">Chop or open everything for both recipes first.</div></div><div class="step"><div class="n">2</div><div class="small">Start the chilli (it takes longest) and let it simmer.</div></div><div class="step"><div class="n">3</div><div class="small">Start the dal in a second pan while the chilli bubbles.</div></div><div class="step"><div class="n">4</div><div class="small">Sit down. Have a break while both simmer, stirring every few minutes.</div></div><div class="step"><div class="n">5</div><div class="small">Eat one portion now. Cool the rest quickly, then portion, label and freeze.</div></div>`, 'cream')}
${box('My plan', table(['Time', 'Step', 'Done'], 6, { widths: ['18%', '68%'], rh: 8 }))}`, { sect: 'Plan it', deco: 'small' }),
  page(`<div class="kicker">Plan it</div><h1 class="sm">Freezer log</h1><p class="muted">Out of sight is out of mind. Write down what goes in, and cross it off when it comes out.</p>
<div class="tbl-fill">${table(['What', 'Portions', 'Date in', 'Eat by', 'Portions used'], 18, { widths: ['36%', '12%', '15%', '15%'], rh: 10 })}</div>`, { sect: 'Plan it' }),
  page(`<div class="kicker">Plan it</div><h1 class="sm">Meal ideas we like</h1><p class="muted">A running list of meals that work in your house. When you can't think what to have, look here first.</p>
<div class="g3 grow">${['One spoon', 'Two spoons', 'Three spoons', 'Takeaway &amp; treat', 'Freezer favourites', 'Safe foods'].map((x, i) => box(x, blankCbs(7), i % 3 === 0 ? 'cream' : '')).join('')}</div>`, { sect: 'Plan it' }),
  page(`<div class="kicker">Your recipes</div><h1 class="sm">My own recipe</h1><p class="muted">Print as many as you like and keep your own low-spoon favourites together.</p>
${box('', `<div class="row">${field('Recipe')}<div style="flex:none;width:60mm">${field('Spoons ○ ○ ○')}</div></div><div class="row">${field('Time')}${field('Serves')}${field('From')}</div>`, 'cream')}
<div class="row grow"><div class="box" style="flex:0 0 66mm"><div class="label">You'll need</div>${blankCbs(12)}</div>${box('Method', lines(), 'fill')}</div>
<div class="g3">${box('Make it easier', lines(15), 'sage')}${box('Swap it', lines(15))}${box('Store it', lines(15), 'clay')}</div>`, { sect: 'Your recipes' }),
  page(`<div class="kicker">For the very hard days</div><h1>Eating on very hard days</h1><p class="muted">Gentle ideas for the days when eating at all feels like a lot.</p>
<div class="g2">
${[['Set a reminder', 'Hunger cues can be easy to miss, especially when you\'re busy, stressed or hyperfocused. A phone alarm for lunch and dinner helps.'], ['Keep food in sight', 'Put snacks where you\'ll see them: a fruit bowl on the desk, cereal bars by the kettle.'], ['Make it the easy option', 'Pre-portion snacks and freezer meals when you have energy, so future you just has to reach.'], ['Drink something', 'A glass of water, milk or a smoothie still counts. Thirst can feel like tiredness.'], ['Eat with someone', 'Body doubling works for food too. Eat with a friend, on a video call, or with a show on.'], ['Lower the bar', 'Cereal for dinner is fine. Same meal every day is fine. Fed is the goal.']].map(([h, t], i) => box('', `<h3>${h}</h3><p class="small">${t}</p>`, i % 3 === 1 ? 'sage' : '')).join('')}
</div>
<div class="callout"><p class="small">If you're regularly struggling to eat, losing weight without trying, or worried about your relationship with food, please speak to your GP. In the UK, the eating disorder charity Beat also has a free helpline.</p></div>
${box('My easiest meals when I\'m struggling', lines(), 'fill')}`, { sect: 'Support', deco: 'small' }),
  page(`<div class="kicker">Thank you</div><h1>Thank you</h1>
<p class="lead">Thank you for choosing a Larkspur &amp; Co. printable. I hope this book makes food feel a little easier, especially on the days that are hard.</p>
<div class="callout sage"><p class="small">If it helped, a short review on Etsy means the world to a small Glasgow business. You'll find more gentle planners for busy brains, including the Spoon Theory Daily Planner, at <b>larkspurco.uk</b>.</p></div>
${box('Notes', lines(), 'fill')}`, { sect: 'Thank you', deco: 'tr' }),
);

module.exports = { css: `.recipe ul.dots li{font-size:10.4pt;margin:1.4mm 0}.recipe .step .small{font-size:10.4pt;line-height:1.45}.recipe .step{margin:2.2mm 0}.recipe .g3 .small{font-size:9pt}.recipe h1.sm{font-size:24pt}.recipe p.muted{font-size:10.5pt}`, file: 'Low-Spoon-Kitchen', short: 'Low-Spoon Kitchen', title: T, pages, freebie: [8, 9], recipes: R };
