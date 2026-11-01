"""Writes the listing copy + image prompts document, checking Etsy limits."""
import sys

STYLE = ("soft natural window light, warm cream and muted sage green palette with terracotta accents, "
         "calm Scandinavian styling, uncluttered, photorealistic, high detail")

P = [
 dict(slug='christmas', name='The ADHD Christmas Survival Guide', price='£6.95', pages=38,
  title='ADHD Christmas Planner Printable, Christmas Survival Guide, Holiday Overwhelm, Gift Tracker, Budget, Undated A4 & US Letter PDF',
  tags=['adhd christmas', 'christmas planner', 'holiday planner', 'adhd planner', 'gift tracker', 'christmas budget', 'holiday overwhelm', 'printable planner', 'neurodivergent', 'christmas organiser', 'spoon theory', 'xmas countdown', 'christmas checklist'],
  hook='Christmas asks a lot of a busy brain. This guide carries some of it for you.',
  body=['A gentle, 38-page printable for anyone who finds December overwhelming: ADHD, autism, chronic illness, burnout, or just a very full life. It breaks Christmas into small, doable steps, helps you protect your energy, and gives you permission to make it "good enough".',
        'INSIDE:\n• Why Christmas is hard for busy brains\n• What I\'m worried about (brain-dump and sort)\n• Your Good Enough Christmas: decide what matters and what to drop\n• Christmas on one page: dates, plans and deadlines\n• Six-week countdown, with a weekly page of small suggested tasks\n• Budget planner with an impulse-buy "parking space"\n• Gift tracker (2 pages) and gift idea bank\n• Cards & post tracker\n• Christmas Day menu, timeline and food shopping list\n• Low-energy food shortcuts\n• People & plans, plus a social energy (spoons) budget\n• Sensory survival kit\n• Scripts for tricky moments (saying no, leaving early, awkward questions)\n• My Christmas Day plan\n• Stuck? Start here: a calm-down flowchart\n• Decorations made simple, and kids at Christmas\n• The recovery days, returns & thank-yous, the January reset\n• Notes for next year\n• December daily page, December tracker and ten-minute tasks'],
  pins=[('Christmas overwhelm? Try this gentle ADHD planner', 'A 38-page printable that breaks Christmas into small steps: a six-week countdown, gift tracker, budget, sensory survival kit and a calm-down flowchart. Undated, so you can use it every year.'),
        ('How to plan a good-enough Christmas', 'Decide what matters, drop what doesn\'t, and plan the rest in small steps. Printable ADHD Christmas planner from Larkspur & Co.'),
        ('Stuck? Start here: a free Christmas calm-down flowchart', 'When December feels like too much, follow the arrows one box at a time. Free printable from The ADHD Christmas Survival Guide.'),
        ('Six-week Christmas countdown for busy brains', 'One small job a week, from deciding to arriving. Printable, undated and ADHD-friendly.'),
        ('Christmas gift tracker printable', 'Track who, what, how much, bought, wrapped and given, so nothing gets lost. Part of The ADHD Christmas Survival Guide.')]),
 dict(slug='paralysis', name='The 28-Day Task Paralysis Reset', price='£7.95', pages=50,
  title='ADHD Task Paralysis Workbook, 28 Day Printable Program, Executive Dysfunction Planner, Get Unstuck, Undated A4 & US Letter PDF',
  tags=['task paralysis', 'adhd workbook', 'adhd planner', 'executive function', 'procrastination', 'get unstuck', 'adhd printable', 'neurodivergent', 'adhd tools', 'motivation planner', 'body doubling', '28 day challenge', 'adhd adult'],
  hook='For the days you know exactly what to do but can\'t make yourself start.',
  body=['Task paralysis isn\'t laziness. Starting is a skill, and this 50-page printable programme helps you practise it with one small page and one new tool a day for 28 days.',
        'INSIDE:\n• What is task paralysis? (plain-English explainer)\n• What kind of stuck? Six types and the tools that fit each\n• Stuck? Start here: a printable flowchart\n• My starting point\n• 28 daily pages, each with a new tool: the two-minute start, next physical action, crumbs, make it ugly, body doubling, timer sprints, if-then plans and more\n• 4 weekly reviews\n• My Unstuck Plan\n• Task breakdown worksheet, brain dump, reward menu, done list, body doubling log\n• 28-day colour-in tracker',
        'Undated: miss a day and just turn the page. There\'s nothing to catch up on.'],
  pins=[('Can\'t make yourself start? Try a 28-day task paralysis reset', 'One small page and one new starting tool a day. Printable ADHD workbook with weekly reviews and your own Unstuck Plan.'),
        ('What kind of stuck are you?', 'Unclear, too big, boring, scared, too many choices or running on empty? Match the right tool to the block. From The 28-Day Task Paralysis Reset.'),
        ('Stuck? Start here: free task paralysis flowchart', 'Notice it, check your body, name the block, shrink it, start the timer. A printable flowchart for frozen days.'),
        ('28 ways to start a task when you have ADHD', 'From the two-minute start to body doubling: a gentle printable programme to practise starting.'),
        ('The two-minute start (and 27 more tools)', 'Printable ADHD task paralysis workbook. Undated, shame-free, print at home.')]),
 dict(slug='kitchen', name='The Low-Spoon Kitchen', price='£6.95', pages=44,
  title='Low Energy Recipe Book Printable, Spoon Theory Meal Planner, Easy Recipes for Chronic Illness, ADHD, Burnout, A4 & US Letter PDF',
  tags=['spoon theory', 'easy recipes', 'low energy meals', 'chronic illness', 'adhd meal plan', 'meal planner', 'recipe book', 'spoonie', 'batch cooking', 'freezer meals', 'printable recipes', 'chronic fatigue', 'simple meals'],
  hook='Simple food for low-energy days, rated by how many spoons it takes.',
  body=['When energy is low, food is often the first thing to go. This 44-page printable recipe book is built for those days: every recipe is rated one to three spoons, uses shortcuts on purpose, and keeps the washing up to a minimum.',
        'INSIDE:\n• Spoon theory & food\n• The low-spoon kitchen: kit and shortcuts that save energy\n• The cupboard list\n• Zero-spoon food: what to eat when you can\'t cook\n• Build a bowl: one formula, endless meals\n• Food safety basics (UK FSA based)\n• 20 recipes: no-cook & five-minute, microwave & kettle, one pan/one tray, batch & freeze\n• Two example weekly meal plans (low spoons, and up and down)\n• Weekly meal planner, shopping list, batch-cooking day plan, freezer log\n• Meal ideas we like, my own recipe page\n• Eating on very hard days',
        'UK measurements (grams, ml) with conventional, fan and gas oven temperatures.'],
  pins=[('Too tired to cook? 20 low-spoon recipes', 'Easy recipes rated by energy, from no-cook to batch & freeze. Printable spoon theory recipe book and meal planner.'),
        ('Dinner from one tray: gnocchi & tomato traybake', 'Ten minutes of effort, then the oven does the rest. From The Low-Spoon Kitchen printable recipe book.'),
        ('What to eat when you can\'t cook: free zero-spoon list', 'No-cook and microwave foods for the hardest days. Fed is the goal. Free printable.'),
        ('Build-a-bowl formula for low-energy days', 'Pick a base, protein, veg, sauce and crunch. No recipe needed. Free printable.'),
        ('Batch cook on a good day, eat well on the hard ones', 'A two-hour batch-cooking plan and freezer log for spoonies, ADHD and burnout.')]),
 dict(slug='money', name='The 30-Day ADHD Money Reset', price='£6.95', pages=40,
  title='ADHD Budget Planner Printable, 30 Day Money Reset, Subscription Tracker, Bill Tracker, Sinking Funds, UK Undated A4 & US Letter PDF',
  tags=['adhd budget', 'budget planner', 'money planner', 'adhd planner', 'subscription', 'bill tracker', 'sinking funds', 'savings tracker', 'finance planner', 'budget printable', 'money challenge', 'uk budget planner', 'debt tracker'],
  hook='Stop money slipping through the cracks: one small task a day, no shame.',
  body=['Forgotten bills, impulse buys, subscriptions you never use? You\'re not bad with money. You may just have a brain that finds planning, remembering and waiting harder. This 40-page printable gives you one small task a day for 30 days, each one building a system that does the remembering for you.',
        'INSIDE:\n• Money and the ADHD brain (the "ADHD tax")\n• My money snapshot\n• 30 daily tasks with notes space, from "open the envelope" to your own money rules\n• 4 weekly check-ins\n• 13 worksheets: accounts list, bills & Direct Debits, subscription tracker, spending log, 48-hour wishlist, simple monthly budget, yearly costs, sinking funds, what I owe, 100-circle savings tracker, weekly money date, my money rules\n• Free UK help & support page',
        'Made for the UK (£). General information only, not financial advice.'],
  pins=[('Bad with money? You\'re not. Try a 30-day ADHD money reset', 'One small, shame-free task a day: find forgotten subscriptions, set up reminders, build a simple budget. Printable.'),
        ('Find your forgotten subscriptions: free tracker', 'Scroll back two months, list every subscription, then keep, pause or cancel. Free printable.'),
        ('A budget in four boxes', 'Money in, bills, everyday spending, saving. A simple monthly budget worksheet for busy brains.'),
        ('The 48-hour rule for impulse buys', 'Put it on the waiting list first. Still want it in two days? Then decide. Printable wishlist.'),
        ('100-circle savings tracker printable', 'Colour in a circle every time you save. Part of The 30-Day ADHD Money Reset.')]),
 dict(slug='puzzles-christmas', name='Large Print Christmas & Winter Puzzle Pack', price='£3.95', pages=54,
  title='Large Print Christmas Puzzles Printable, Word Search, Sudoku, Mazes, Seniors Activity, Care Home, Dementia Friendly, Answers PDF',
  tags=['large print puzzles', 'christmas puzzles', 'word search', 'christmas activity', 'senior activities', 'care home activity', 'printable puzzles', 'large print sudoku', 'christmas games', 'stocking filler', 'elderly gift', 'puzzle book', 'winter activity'],
  hook='42 festive puzzles in big, clear print, with answers at the back.',
  body=['Word searches, sudoku, mazes and word scrambles with a cosy Christmas and winter theme, designed to be easy on the eyes. Lovely for cosy afternoons, grandparents, care homes, activity coordinators and family get-togethers.',
        'INSIDE:\n• 20 large-print word searches (13 × 13 grids, 17pt letters)\n• 10 large-print sudoku, gentle to steady\n• 6 mazes\n• 6 word scramble pages\n• All answers at the back',
        'Print the whole pack or just your favourites, as often as you like for your household. Teachers, care homes and activity coordinators may print copies for their own groups.'],
  pins=[('Large print Christmas puzzles to print at home', '42 festive word searches, sudoku, mazes and scrambles in big, clear print. Answers included.'),
        ('Christmas activity for grandparents', 'Printable large print puzzle pack: cosy, festive and easy on the eyes.'),
        ('Free large print Christmas word search', 'Print a free sample from our Christmas & Winter Puzzle Pack.'),
        ('Care home Christmas activity: large print puzzles', 'Print copies for your group. Word searches, sudoku, mazes and scrambles with answers.'),
        ('A cosy Christmas afternoon activity', 'Grab a pencil and a cup of tea. 42 printable large print puzzles.')]),
 dict(slug='puzzles-scotland', name='Large Print Scotland Puzzle Pack', price='£3.95', pages=54,
  title='Large Print Scottish Puzzles Printable, Scotland Word Search, Sudoku, Mazes, Scottish Gift, Seniors Activity, Burns Night, Answers PDF',
  tags=['scottish gift', 'scotland puzzles', 'large print puzzles', 'word search', 'scottish word search', 'burns night', 'senior activities', 'care home activity', 'printable puzzles', 'large print sudoku', 'scotland gift', 'puzzle book', 'scottish printable'],
  hook='Lochs, castles, islands, haggis and braw Scots words, in big, clear print.',
  body=['42 puzzles celebrating Scotland: word searches, sudoku, mazes and word scrambles, all in large print with answers at the back. Made in Glasgow, and a thoughtful gift for anyone with a bit of Scotland in their heart.',
        'INSIDE:\n• 20 large-print word searches: cities, islands, lochs, hills, food, wildlife, Highland dress, Burns Night, ceilidh, castles, rivers, Scots words, weather, Highland Games, Glasgow, Edinburgh, the coast, clans, famous Scots and the glen\n• 10 large-print sudoku, gentle to steady\n• 6 mazes\n• 6 Scottish word scramble pages\n• All answers at the back'],
  pins=[('Large print Scottish puzzles to print at home', '42 word searches, sudoku, mazes and scrambles celebrating Scotland. Answers included.'),
        ('How well do you know Scotland? Printable puzzles', 'Unscramble cities, islands, castles and braw Scots words.'),
        ('A gift for Scotland lovers', 'A printable large print puzzle pack, made in Glasgow.'),
        ('Burns Night activity: Scottish word searches', 'Print large-print puzzles for your Burns supper, class or care home.'),
        ('Free Scottish word search printable', 'Print a free sample from The Big Scotland Puzzle Pack.')]),
]

BUNDLE = dict(name='The Busy Brain Bundle (Christmas, Task Paralysis, Low-Spoon Kitchen, Money Reset)', price='£19.95',
  title='ADHD Planner Bundle Printable, Task Paralysis, Budget, Low Energy Recipes, Christmas Planner, Spoon Theory, Undated A4 & US Letter',
  tags=['adhd planner bundle', 'adhd planner', 'adhd printable', 'spoon theory', 'task paralysis', 'adhd budget', 'low energy meals', 'christmas planner', 'neurodivergent', 'executive function', 'planner bundle', 'chronic illness', 'printable planner'])

errs = []
for p in P + [BUNDLE]:
    if len(p['title']) > 140: errs.append(f"title too long ({len(p['title'])}): {p['name']}")
    if len(p['tags']) != 13: errs.append(f"{p['name']} has {len(p['tags'])} tags")
    for t in p['tags']:
        if len(t) > 20: errs.append(f"tag too long: {t}")
    if len(set(p['tags'])) != len(p['tags']): errs.append('dup tag in ' + p['name'])
if errs:
    print('\n'.join(errs)); sys.exit(1)

PROMPTS = {
 'christmas': ['Top-down flat lay of two blank white A4 printed planner pages on a light oak table, a mug of hot chocolate, a sprig of pine, a small wrapped gift with linen ribbon, fairy lights softly out of focus, a pencil, ' + STYLE + ', 4:5',
               'A cosy sofa corner at Christmas with a blank A4 planner page on a clipboard resting on a knitted blanket, a candle and a mug of tea, warm lamplight, ' + STYLE + ', 2:3'],
 'paralysis': ['Top-down flat lay of a blank white A4 printed worksheet on a tidy light wooden desk with a sand timer, a cup of tea, a pencil and a small potted plant, ' + STYLE + ', 4:5',
               'Close-up of a hand holding a pencil over a blank printed checklist page on a desk, gentle morning light, ' + STYLE + ', 2:3'],
 'kitchen': ['Top-down flat lay of a blank white A4 printed recipe page on a pale kitchen worktop beside a bowl of overnight oats with berries, a wooden spoon and a linen tea towel, ' + STYLE + ', 4:5',
             'A blank printed meal planner page stuck to a cream fridge door with a magnet, a fruit bowl in the foreground, ' + STYLE + ', 2:3'],
 'money': ['Top-down flat lay of a blank white A4 printed worksheet on a light oak desk with a calculator, a pencil, a jar of coins and a cup of coffee, ' + STYLE + ', 4:5',
           'A blank printed budget page in a clipboard on a kitchen table next to a laptop and a mug, calm morning light, ' + STYLE + ', 2:3'],
 'puzzles-christmas': ['Top-down flat lay of a blank white A4 printed puzzle page on a wooden table with reading glasses, a pencil, a cup of tea, mince pies on a plate and a sprig of holly, ' + STYLE + ', 4:5',
                       'An older person\'s hands holding a pencil over a blank printed puzzle page at a table by a Christmas tree, warm cosy light, face not shown, ' + STYLE + ', 2:3'],
 'puzzles-scotland': ['Top-down flat lay of a blank white A4 printed puzzle page on a tartan wool blanket with reading glasses, a pencil, a cup of tea and shortbread fingers, ' + STYLE + ', 4:5',
                      'A blank printed puzzle page on a wooden table by a window looking out over a misty Scottish loch and hills, a mug of tea, ' + STYLE + ', 2:3'],
}

RECIPES = [
 ('oats', 'Overnight oats in a glass jar, layered oats and yoghurt topped with mixed berries'),
 ('smoothie', 'A tall glass of pink berry and banana smoothie with a few frozen berries beside it'),
 ('plate', 'A "picky bits" snack plate: crackers, cheddar, hummus, carrot sticks, cherry tomatoes, grapes and olives'),
 ('wrap', 'Two tuna and sweetcorn tortilla wraps cut in half, with spinach, on a small board'),
 ('toast', 'Three slices of toast with different toppings: peanut butter and banana, beans and cheese, avocado and boiled egg'),
 ('potato', 'A microwave jacket potato split open with butter, baked beans and grated cheese'),
 ('eggs', 'Soft scrambled eggs in a large ceramic mug with chives, a slice of toast beside it'),
 ('couscous', 'A bowl of couscous salad with chickpeas, cherry tomatoes, cucumber and crumbled feta'),
 ('friedrice', 'A bowl of egg fried rice with peas and spring onions, chopsticks resting on the bowl'),
 ('pasta', 'A pan of one-pot tomato pasta with spinach and grated cheese'),
 ('gnocchi', 'A roasting tin of golden gnocchi traybake with roasted cherry tomatoes, peppers, red onion and melted mozzarella'),
 ('sausage', 'A roasting tin of sausage and baby potato traybake with red onion and peppers'),
 ('salmon', 'A salmon fillet with green beans and lemon slices in an opened foil parcel'),
 ('quesadilla', 'A cheese and bean quesadilla cut into wedges with a small bowl of salsa'),
 ('nachos', 'A baking tray of loaded nachos with chilli, melted cheese, salsa and soured cream'),
 ('curry', 'A bowl of chickpea and spinach curry with rice and a piece of naan'),
 ('dal', 'A bowl of red lentil dal with a swirl of yoghurt and a piece of flatbread'),
 ('chilli', 'A big pot of chilli con carne with kidney beans, a wooden spoon resting in it'),
 ('soup', 'A bowl of smooth orange vegetable soup with crusty bread'),
 ('stew', 'A bowl of chicken stew with potatoes and carrots in a rich broth'),
]

out = []
w = out.append
w('# Larkspur & Co. product line: listing copy, pins and image prompts\n')
w('Everything you need to list the six new products on Etsy and promote them on Pinterest. Prices are suggestions: check similar listings on Etsy and price within that range, as the video recommends.\n')
w('## Quick reference\n')
w('| Product | Pages | Suggested price | Free sample |\n|---|---|---|---|')
for p in P:
    w(f"| {p['name']} | {p['pages']} | {p['price']} | yes |")
w(f"| {BUNDLE['name']} | 172 | {BUNDLE['price']} | n/a |\n")
w('**What to upload for each listing:** the A4 PDF and the US Letter PDF as the digital files, and the five `etsy-1` to `etsy-5` images as listing photos (etsy-1 first). Etsy allows up to 5 files per listing at 20MB each. Every PDF here is under 1.1MB.\n')
for p in P:
    w(f"\n---\n\n## {p['name']}\n")
    w(f"**Suggested price:** {p['price']}\n")
    w(f"**Etsy title** ({len(p['title'])}/140 characters)\n\n```\n{p['title']}\n```\n")
    w('**13 tags** (each 20 characters or fewer)\n\n```\n' + ', '.join(p['tags']) + '\n```\n')
    desc = p['hook'] + '\n\n' + '\n\n'.join(p['body']) + (
        '\n\nWHAT YOU GET:\n• ' + str(p['pages']) + '-page PDF in A4 (UK) size\n• The same PDF in US Letter size\n• Instant download: no physical item will be sent\n\n'
        'HOW TO USE:\n1. Download your files from Etsy (Purchases and reviews)\n2. Print at home or at a local print shop\n3. Print the pages you need, as many times as you like\n\n'
        'Designed with care in Glasgow by Larkspur & Co. For personal use only: please don\'t share or resell the files. '
        + ('This is a planning tool and isn\'t medical, financial or professional advice.' if 'puzzles' not in p['slug'] else 'Puzzles generated and checked by Larkspur & Co.')
        + '\n\nFound us on TikTok, Instagram or Pinterest? Remember to use the discount code from the post at checkout.')
    w('**Description**\n\n```\n' + desc + '\n```\n')
    w('**Pinterest pins** (titles and descriptions, link each pin to the Etsy listing or a blog post about it)\n')
    for i, (t, d) in enumerate(p['pins'], 1):
        w(f"{i}. **{t}**  \n   {d}")
    w('\n**Ready-made pin images:** `pin-1.jpg`, `pin-2.jpg`, `pin-3.jpg` in this product\'s folder. Pins 4 and 5 can reuse the listing images or a lifestyle photo.\n')
    w('**Lifestyle photo prompts** (optional, for ComfyUI). Generate with *blank* pages, then send the images back to me and I\'ll place the real pages onto them, because image models can\'t reproduce the actual page designs accurately.\n')
    for pr in PROMPTS[p['slug']]:
        w(f"- {pr}")
w('\n---\n\n## The Busy Brain Bundle (optional extra listing)\n')
w('Upload the four ADHD/energy products together (8 PDFs is over Etsy\'s 5-file limit, so put the four A4 PDFs in one zip and the four Letter PDFs in another, or link to a download page).\n')
w(f"**Suggested price:** {BUNDLE['price']} (about 30% less than buying all four)\n")
w(f"**Etsy title** ({len(BUNDLE['title'])}/140)\n\n```\n{BUNDLE['title']}\n```\n")
w('**13 tags**\n\n```\n' + ', '.join(BUNDLE['tags']) + '\n```\n')
w('\n---\n\n## Recipe photo prompts (optional, for The Low-Spoon Kitchen)\n')
w('The recipe book is complete without photos. If you\'d like photos, generate these 20 square images, name each file as shown (for example `oats.jpg`) and send them back. I\'ll rebuild the book with a round photo at the top of each recipe page.\n')
w(f'Add this style to the end of every prompt: *"overhead food photography, on a pale wooden table with a cream linen napkin, {STYLE}, square 1:1"*\n')
w('| File | Prompt |\n|---|---|')
for f, d in RECIPES:
    w(f"| `{f}.jpg` | {d} |")
w('\n---\n\n## Launch plan (from the video\'s advice)\n')
w('1. **List the Christmas Survival Guide and the Christmas puzzle pack first.** People are planning Christmas on Pinterest right now.\n'
  '2. **Make 3–4 pins per product**, each with a different angle (problem, inside pages, result, gift). The pin titles above are written that way.\n'
  '3. **Post about 8 pins a day** across all products, and the same link no more than once a week.\n'
  '4. **Use the free samples as email sign-up gifts.** Add them to MailerLite as new freebies, so each new product launches to people who already know you.\n'
  '5. **Keep pinning week after week.** Products sell because of the pins you keep adding, not one launch post.\n'
  '6. **Ads later:** once a pin gets clicks for free, try it as an ad at about £10 a day with three images, aimed at Ireland, the Netherlands, Sweden and New Zealand before the US.\n')
w('## Before you publish: final checks\n')
w('- Read every page once, as the video suggests. You know your customers best, so change anything that doesn\'t sound like you.\n'
  '- Low-Spoon Kitchen: the recipes use standard UK methods and times, but try a couple yourself if you can.\n'
  '- Money Reset: the support organisations listed are real UK services. Check their websites are still current before each new season.\n'
  '- Puzzle packs: every sudoku is checked by the generator to have exactly one solution, and every word search word appears exactly once.\n')
open(sys.argv[1], 'w').write('\n'.join(out))
print('copy ok')
