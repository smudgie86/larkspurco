"""Builds the spec JSON for the three super bumper puzzle packs."""
import json, random, os

HERE = os.path.dirname(os.path.abspath(__file__))
old_x = json.load(open(os.path.join(HERE, 'data', 'christmas-spec.json')))['wordsearch']
old_s = json.load(open(os.path.join(HERE, 'data', 'scotland-spec.json')))['wordsearch']

def T(title, words):
    return {'title': title, 'words': [w.strip() for w in words.split(',')]}

XMAS_NEW = [
 T('The Twelve Days', 'Partridge, Pear tree, Turtle doves, French hens, Calling birds, Gold rings, Geese, Swans, Maids, Milking, Ladies, Lords'),
 T('Christmas Market', 'Stalls, Mulled wine, Bratwurst, Pretzel, Chalet, Ornaments, Candles, Fudge, Crafts, Carousel, Ice rink, Crowds'),
 T('Christmas Sweets', 'Candy cane, Toffee, Fudge, Truffles, Selection box, Chocs, Marzipan, Nougat, Peppermint, Liquorice, Brittle, Sugarplum'),
 T('Festive Drinks', 'Eggnog, Mulled wine, Sherry, Port, Prosecco, Cider, Cocoa, Hot toddy, Punch, Snowball, Bucks fizz, Champagne'),
 T('Festive Colours', 'Red, Green, Gold, Silver, White, Crimson, Emerald, Ivory, Scarlet, Bronze, Burgundy, Forest'),
 T('Father Christmas', 'Beard, Sack, Belly, Chimney, Sleigh, Bells, List, Naughty, Nice, Grotto, Ho ho ho, Lapland'),
 T('Garden Birds in Winter', 'Robin, Wren, Blackbird, Blue tit, Great tit, Goldfinch, Fieldfare, Redwing, Waxwing, Sparrow, Starling, Nuthatch'),
 T('Christmas Around the World', 'Germany, Sweden, Mexico, Italy, France, Poland, Iceland, Norway, Australia, Canada, Spain, Japan'),
 T('Cards & Crafts', 'Glitter, Glue, Scissors, Ribbon, Stickers, Paper, Stamps, Envelope, Postbox, Greetings, Sequins, Stencil'),
 T('A Winter Walk', 'Woodland, Frosty, Path, Puddles, Wellies, Twigs, Pinecone, Acorn, Branches, Squirrel, Footprints, Breath'),
 T('The Christmas Kitchen', 'Oven, Timer, Roasting tin, Foil, Apron, Rolling pin, Basting, Carving, Peeler, Sieve, Whisk, Tea towel'),
 T('Stocking Fillers', 'Satsuma, Walnuts, Crayons, Bubbles, Yoyo, Socks, Lip balm, Puzzle, Marbles, Whistle, Notebook, Torch'),
 T('Songs of the Season', 'Jingle, Bells, Sleigh ride, Snowman, Mistletoe, Chestnuts, Roasting, Open fire, Jack Frost, Merry, White, Wonderland'),
 T('Winter Sports', 'Skiing, Sledging, Snowboard, Skating, Curling, Bobsleigh, Biathlon, Slalom, Luge, Moguls, Skeleton, Hockey'),
 T('Festive Feelings', 'Jolly, Merry, Festive, Goodwill, Peace, Cheer, Magic, Wonder, Sparkle, Twinkle, Celebrate, Together'),
 T('Advent', 'Calendar, Doors, Candles, Wreath, Countdown, Chocolate, Sunday, Purple, Waiting, Hope, Prepare, December'),
 T('The Christmas Cake', 'Fruit cake, Brandy, Currants, Almonds, Icing, Marzipan, Butter, Flour, Eggs, Treacle, Spice, Peel'),
 T('Wrapping Presents', 'Paper, Tape, Scissors, Bows, Ribbon, Tags, Tissue, Box, Bag, Label, Gift, Surprise'),
 T('Frost & Ice', 'Frost, Rime, Hoarfrost, Ice, Glaze, Crystal, Freezing, Numb, Frozen, Puddle, Skate, Wintry'),
 T('Christmas at Home', 'Tree, Fireplace, Mantelpiece, Garland, Sofa, Family, Games, Films, Snacks, Crackers, Hats, Jokes'),
]
SCOT_NEW = [
 T('Hogmanay', 'First foot, Bells, Midnight, Shortbread, Black bun, Coal, Whisky, Auld Lang Syne, Fireworks, Street party, New Year, Ceilidh'),
 T('Towns Near & Far', 'Falkirk, Livingston, Kirkcaldy, Dumfries, Hamilton, Kilmarnock, Greenock, Arbroath, Fort William, Peebles, Montrose, Nairn'),
 T('Scottish Football Clubs', 'Aberdeen, Hibernian, Hearts, Celtic, Rangers, Motherwell, Kilmarnock, St Mirren, Dundee United, Ross County, St Johnstone, Livingston'),
 T('Whisky Country', 'Speyside, Islay, Highland, Lowland, Campbeltown, Distillery, Cask, Malt, Barley, Peat, Dram, Quaich'),
 T('The Bard: Robert Burns', 'Alloway, Ayrshire, Dumfries, Ploughman, Poet, Bard, Songs, Mauchline, Jean Armour, Kilmarnock, Mouse, Haggis'),
 T('Scottish Firsts', 'Television, Telephone, Penicillin, Kaleidoscope, Ultrasound, Raincoat, Logarithms, Cloning, Golf, Curling, Pneumatic tyre, Paraffin'),
 T('Wild Flowers', 'Thistle, Heather, Bluebell, Primrose, Foxglove, Gorse, Broom, Bracken, Moss, Lichen, Sea pink, Bog cotton'),
 T('More Islands', 'Eigg, Rum, Muck, Canna, Coll, Colonsay, Bute, Cumbrae, Benbecula, Ulva, Staffa, St Kilda'),
 T('A Full Scottish Breakfast', 'Tattie scone, Lorne sausage, Black pudding, White pudding, Bacon, Eggs, Beans, Mushrooms, Tomato, Haggis, Toast, Brown sauce'),
 T('Sweet Treats', 'Tablet, Macaroon, Edinburgh rock, Soor plooms, Puff candy, Toffee, Fudge, Boiled sweets, Humbugs, Dundee cake, Cranachan, Shortbread'),
 T('More Braw Scots Words', 'Clatty, Drookit, Fankle, Gallus, Haud, Messages, Piece, Skelp, Sleekit, Stooshie, Weans, Yin'),
 T('Around Glasgow', 'Sauchiehall, Buchanan, Argyle, Byres Road, Govan, Partick, Shawlands, Dennistoun, Finnieston, Gorbals, Pollok, Hyndland'),
 T('Fife & Tayside', 'St Andrews, Crail, Anstruther, Pittenweem, Cupar, Falkland, Broughty Ferry, Carnoustie, Arbroath, Forfar, Kirriemuir, Blairgowrie'),
 T('The Highlands', 'Ullapool, Thurso, Wick, Dornoch, Golspie, Lairg, Durness, Tongue, Aviemore, Kingussie, Portree, Lochinver'),
 T('Borders & the South West', 'Galashiels, Melrose, Kelso, Jedburgh, Hawick, Selkirk, Duns, Eyemouth, Langholm, Moffat, Stranraer, Kirkcudbright'),
 T('Through the Ages', 'Bannockburn, Culloden, Flodden, Jacobites, Picts, Romans, Vikings, Antonine Wall, Skara Brae, Clans, Crown, Union'),
 T('Pipes & Music', 'Clarsach, Fiddle, Smallpipes, Pibroch, Mod, Folk, Ballad, Waulking, Accordion, Bagpipes, Drones, Chanter'),
 T('Up the Hill', 'Rucksack, Map, Compass, Boots, Cairn, Summit, Ridge, Bothy, Midges, Burn, Trig point, Munro bagging'),
 T('From the Sea', 'Salmon, Haddock, Mackerel, Herring, Kippers, Langoustine, Mussels, Scallops, Smokie, Crab, Lobster, Cod'),
 T('Scottish Breeds', 'Highland pony, Shetland pony, Clydesdale, Border collie, Westie, Scottie dog, Cairn terrier, Skye terrier, Gordon setter, Soay sheep, Blackface, Galloway'),
]
EVERY = [
 T('In the Garden', 'Roses, Tulips, Lawn, Shed, Trowel, Watering can, Hose, Compost, Daffodil, Bird table, Greenhouse, Patio'),
 T('In the Kitchen', 'Kettle, Teapot, Toaster, Oven, Saucepan, Whisk, Ladle, Colander, Fridge, Cutlery, Apron, Cupboard'),
 T('At the Seaside', 'Sandcastle, Bucket, Spade, Deckchair, Pier, Ice cream, Rock pool, Promenade, Donkey, Seagull, Windbreak, Arcade'),
 T('Schooldays', 'Satchel, Blackboard, Chalk, Inkwell, Playground, Skipping, Dinner lady, Times tables, Spelling, Hopscotch, Assembly, Homework'),
 T('The Sweet Shop', 'Sherbet, Gobstopper, Liquorice, Bonbons, Humbugs, Flying saucer, Fudge, Toffee, Jelly babies, Acid drops, Pear drops, Rock'),
 T('The Swinging Sixties', 'Beatles, Miniskirt, Mods, Rockers, Scooter, Vinyl, Jukebox, Beehive, Flower power, Moon landing, Pirate radio, Twist'),
 T('The Seventies', 'Flares, Platform, Disco, Glam rock, Space hopper, Punk, Decimal, Power cut, Chopper, Tank top, Lava lamp, Skateboard'),
 T('The Eighties', 'Cassette, Leg warmers, Shoulder pads, Arcade, Video, Mixtape, BMX, Perm, Neon, Roller skates, Yuppie, Breakdance'),
 T('Playground Games', 'Marbles, Conkers, Hopscotch, Jacks, Skipping, Tiddlywinks, Dominoes, Draughts, Snakes, Ladders, Kite, Spinning top'),
 T('The High Street', 'Baker, Butcher, Greengrocer, Post office, Newsagent, Chemist, Ironmonger, Library, Bank, Cafe, Barber, Fishmonger'),
 T('British Birds', 'Robin, Blackbird, Thrush, Sparrow, Starling, Magpie, Pigeon, Kestrel, Heron, Swallow, Owl, Woodpecker'),
 T('Trees', 'Oak, Ash, Beech, Birch, Willow, Hazel, Rowan, Holly, Yew, Sycamore, Chestnut, Maple'),
 T('Flowers', 'Rose, Daisy, Lily, Poppy, Orchid, Iris, Peony, Dahlia, Sweet pea, Lavender, Sunflower, Carnation'),
 T('Fruit Bowl', 'Apple, Pear, Plum, Cherry, Banana, Orange, Lemon, Mango, Peach, Grapes, Melon, Raspberry'),
 T('The Veg Patch', 'Carrot, Potato, Parsnip, Onion, Leek, Cabbage, Broccoli, Spinach, Peas, Beans, Turnip, Cauliflower'),
 T('Sunday Roast', 'Beef, Lamb, Chicken, Gravy, Yorkshire, Roast potatoes, Carrots, Peas, Mint sauce, Horseradish, Stuffing, Crumble'),
 T('Afternoon Tea', 'Scones, Cream, Jam, Sandwiches, Cucumber, Teapot, Saucer, Doily, Eclair, Macaron, Sponge, Cake stand'),
 T('Pets', 'Dog, Cat, Rabbit, Hamster, Goldfish, Budgie, Tortoise, Guinea pig, Parrot, Kitten, Puppy, Ferret'),
 T('On the Farm', 'Tractor, Barn, Cows, Sheep, Pigs, Hens, Hay, Fields, Scarecrow, Farmhouse, Paddock, Lambs'),
 T('Whatever the Weather', 'Sunshine, Rain, Clouds, Thunder, Lightning, Rainbow, Drizzle, Breeze, Frost, Snow, Fog, Heatwave'),
 T('Knitting & Sewing', 'Wool, Needles, Pattern, Cardigan, Thimble, Buttons, Thread, Bobbin, Pin cushion, Crochet, Embroidery, Tape measure'),
 T('The Dance Hall', 'Waltz, Foxtrot, Tango, Quickstep, Jive, Charleston, Rumba, Samba, Cha cha, Ballroom, Tea dance, Salsa'),
 T('At the Pictures', 'Cinema, Popcorn, Usherette, Film, Premiere, Matinee, Stars, Credits, Trailer, Screen, Tickets, Interval'),
 T('On the Wireless', 'Wireless, Broadcast, News, Weather, Shipping, Presenter, Drama, Quiz, Chart, Jingle, Aerial, Tuning'),
 T('Getting About', 'Bus, Train, Tram, Bicycle, Car, Ferry, Aeroplane, Taxi, Coach, Scooter, Motorbike, Canal boat'),
 T('The Railway', 'Steam, Station, Platform, Ticket, Guard, Whistle, Signal, Carriage, Tunnel, Viaduct, Timetable, Locomotive'),
 T('Holidays', 'Suitcase, Passport, Caravan, Camping, Hotel, Beach, Postcard, Suncream, Souvenir, Airport, Cruise, Guesthouse'),
 T('Colours', 'Red, Orange, Yellow, Green, Blue, Indigo, Violet, Pink, Turquoise, Magenta, Lilac, Scarlet'),
 T('Music Makers', 'Piano, Violin, Guitar, Trumpet, Flute, Clarinet, Drums, Cello, Harp, Organ, Saxophone, Trombone'),
 T('Around the House', 'Sofa, Armchair, Curtains, Carpet, Lamp, Bookcase, Mirror, Clock, Cushion, Rug, Sideboard, Fireplace'),
 T('Wash Day', 'Mangle, Washboard, Pegs, Line, Iron, Starch, Soap, Basket, Tub, Airer, Sheets, Tea towels'),
 T('Sporting Life', 'Football, Cricket, Tennis, Rugby, Golf, Bowls, Snooker, Darts, Swimming, Cycling, Athletics, Badminton'),
 T('Around Europe', 'France, Spain, Italy, Germany, Portugal, Greece, Ireland, Norway, Sweden, Poland, Austria, Belgium'),
 T('UK Cities', 'London, Cardiff, Belfast, Edinburgh, Manchester, Liverpool, Birmingham, Leeds, Bristol, Newcastle, York, Glasgow'),
 T('Into Space', 'Planet, Star, Moon, Comet, Galaxy, Rocket, Astronaut, Orbit, Meteor, Saturn, Jupiter, Telescope'),
 T('Under the Sea', 'Whale, Dolphin, Octopus, Crab, Starfish, Jellyfish, Seahorse, Coral, Shark, Turtle, Lobster, Seaweed'),
 T('Baking Day', 'Flour, Sugar, Butter, Eggs, Mixing bowl, Rolling pin, Scales, Cake tin, Sponge, Icing, Scones, Biscuits'),
 T('Hobbies', 'Gardening, Knitting, Reading, Painting, Fishing, Birdwatching, Jigsaws, Baking, Walking, Crosswords, Stamps, Chess'),
 T('Good Manners', 'Please, Thank you, Sorry, Kindness, Smile, Hello, Welcome, Cheers, Ta, Bless you, Excuse me, Pardon'),
 T('Through the Year', 'Spring, Summer, Autumn, Winter, January, March, May, July, September, November, Easter, Harvest'),
]
QUOTES = {
 'xmas': ['God bless us, every one!', 'I will honour Christmas in my heart, and try to keep it all the year.', 'Happy Christmas to all, and to all a good night!',
          'At Christmas play and make good cheer, for Christmas comes but once a year.', 'Joy to the world, the Lord is come!', 'Silent night, holy night, all is calm, all is bright.',
          'Deck the halls with boughs of holly.', 'We wish you a merry Christmas and a happy new year.', 'Hark! The herald angels sing.',
          'Good King Wenceslas looked out on the feast of Stephen.', 'O come, all ye faithful, joyful and triumphant.', 'The holly and the ivy, when they are both full grown.',
          'In the bleak midwinter, frosty wind made moan.', 'The stockings were hung by the chimney with care.', 'Ding dong merrily on high, in heaven the bells are ringing.'],
 'scot': ['Lang may yer lum reek.', "Whit's fur ye'll no go by ye.", 'Mony a mickle maks a muckle.', 'Haste ye back.', "Here's tae us, wha's like us.",
          "Be happy while ye're leevin, for ye're a lang time deid.", 'Keep the heid.', "We'll tak a cup o' kindness yet, for auld lang syne.",
          'O my Luve is like a red, red rose.', "The best laid schemes o' mice an' men gang aft agley.", 'Facts are chiels that winna ding.',
          "Ye cannae shove yer granny aff a bus.", "It's a sair fecht.", "My heart's in the Highlands, my heart is not here.", "A man's a man for a' that."],
 'every': ['A stitch in time saves nine.', 'Every cloud has a silver lining.', 'Many hands make light work.', 'The early bird catches the worm.', "Where there's a will, there's a way.",
           "Rome wasn't built in a day.", 'Actions speak louder than words.', 'A friend in need is a friend indeed.', "Don't count your chickens before they hatch.",
           'Practice makes perfect.', 'Look before you leap.', 'Laughter is the best medicine.', 'Home is where the heart is.', 'Better late than never.', 'Slow and steady wins the race.'],
}

def derived(themes, n, rng, maxlen):
    out = []
    pool = themes[:]
    rng.shuffle(pool)
    for t in pool:
        words = [w for w in t['words'] if 4 <= len(w.replace(' ', '')) <= maxlen]
        if len(words) >= 10:
            out.append({'title': t['title'], 'hint': t['title'], 'words': words[:10]})
        if len(out) == n:
            break
    assert len(out) == n, (n, len(out))
    return out

for key, seed, themes in [('xmas', 9001, old_x + XMAS_NEW), ('scot', 9002, old_s + SCOT_NEW), ('every', 9003, EVERY)]:
    assert len(themes) == 40, (key, len(themes))
    for t in themes:
        assert len(t['words']) == 12, t
        for w in t['words']:
            assert len(w.replace(' ', '').replace("'", '').replace('-', '')) <= 13, w
    rng = random.Random(seed)
    spec = {'seed': seed, 'wordsearch': themes, 'sudoku': 40, 'mazes': 20,
            'scramble': derived(themes, 15, rng, 10), 'vowels': derived(themes, 15, rng, 13), 'quotes': QUOTES[key]}
    json.dump(spec, open(os.path.join(HERE, 'data', f'bumper-{key}-spec.json'), 'w'), indent=1)
    print(key, 'ok')
