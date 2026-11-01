"""Generate puzzle data (word searches, sudoku, mazes, scrambles) as JSON."""
import json, random, sys, string

N = 13  # word search grid size


def wordsearch(words, rng):
    dirs = [(0, 1), (1, 0), (1, 1)]  # right, down, diagonal down-right (large-print friendly)
    for attempt in range(400):
        g = [[None] * N for _ in range(N)]
        placed = []
        ok = True
        for w in sorted(words, key=len, reverse=True):
            for _ in range(300):
                dr, dc = rng.choice(dirs)
                r = rng.randrange(0, N - (len(w) - 1) * dr)
                c = rng.randrange(0, N - (len(w) - 1) * dc)
                cells = [(r + i * dr, c + i * dc) for i in range(len(w))]
                if all(g[y][x] in (None, w[i]) for i, (y, x) in enumerate(cells)):
                    for i, (y, x) in enumerate(cells):
                        g[y][x] = w[i]
                    placed.append({'w': w, 'cells': cells})
                    break
            else:
                ok = False
                break
        if ok:
            for y in range(N):
                for x in range(N):
                    if g[y][x] is None:
                        g[y][x] = rng.choice(string.ascii_uppercase)
            # Make sure each word appears exactly once in allowed directions.
            text = lambda cells: ''.join(g[y][x] for y, x in cells)
            def count(w):
                n = 0
                for dr, dc in dirs:
                    for r in range(N):
                        for c in range(N):
                            if r + (len(w) - 1) * dr < N and c + (len(w) - 1) * dc < N:
                                if text([(r + i * dr, c + i * dc) for i in range(len(w))]) == w:
                                    n += 1
                return n
            bad = ['FUCK', 'SHIT', 'CUNT', 'PISS', 'TWAT', 'COCK', 'DICK', 'SLUT', 'WANK', 'NAZI', 'RAPE', 'BITCH', 'ARSE', 'FAG', 'PORN', 'TITS', 'SEX']
            used = {cell for p in placed for cell in p['cells']}
            def count_bad(w):
                for dr, dc in dirs:
                    for r in range(N):
                        for c in range(N):
                            if r + (len(w) - 1) * dr < N and c + (len(w) - 1) * dc < N:
                                cells = [(r + i * dr, c + i * dc) for i in range(len(w))]
                                if text(cells) == w and not all(cell in used for cell in cells):
                                    return True
                return False
            if any(count_bad(b) for b in bad):
                continue
            if all(count(p['w']) == 1 for p in placed):
                return {'grid': [''.join(row) for row in g], 'placed': placed}
    raise RuntimeError('could not place ' + str(words))


def sudoku_solve(b, limit=2):
    """Count solutions up to limit. b is list of 81 ints (0 = empty)."""
    count = [0]
    def cand(i):
        r, c = divmod(i, 9)
        used = set(b[r * 9:(r + 1) * 9]) | set(b[c::9])
        br, bc = 3 * (r // 3), 3 * (c // 3)
        for y in range(br, br + 3):
            used |= set(b[y * 9 + bc:y * 9 + bc + 3])
        return [v for v in range(1, 10) if v not in used]
    def rec():
        best, bc_ = None, None
        for i in range(81):
            if b[i] == 0:
                cs = cand(i)
                if best is None or len(cs) < len(bc_):
                    best, bc_ = i, cs
                    if len(cs) <= 1:
                        break
        if best is None:
            count[0] += 1
            return count[0] >= limit
        for v in bc_:
            b[best] = v
            if rec():
                b[best] = 0
                return True
            b[best] = 0
        return False
    rec()
    return count[0]


def sudoku(rng, clues):
    b = [0] * 81
    def fill(i=0):
        if i == 81:
            return True
        r, c = divmod(i, 9)
        vals = list(range(1, 10)); rng.shuffle(vals)
        for v in vals:
            br, bc = 3 * (r // 3), 3 * (c // 3)
            if v in b[r * 9:r * 9 + 9] or v in b[c::9]:
                continue
            if any(v in b[y * 9 + bc:y * 9 + bc + 3] for y in range(br, br + 3)):
                continue
            b[i] = v
            if fill(i + 1):
                return True
            b[i] = 0
        return False
    fill()
    sol = b[:]
    puz = b[:]
    order = list(range(81)); rng.shuffle(order)
    filled = 81
    for i in order:
        if filled <= clues:
            break
        j = 80 - i  # remove symmetric pairs for a neater look
        keep = (puz[i], puz[j])
        puz[i] = 0; puz[j] = 0
        if sudoku_solve(puz[:]) != 1:
            puz[i], puz[j] = keep
        filled = sum(1 for v in puz if v)
    for i in order:
        if filled <= clues:
            break
        if puz[i] == 0:
            continue
        keep = puz[i]; puz[i] = 0
        if sudoku_solve(puz[:]) != 1:
            puz[i] = keep
        filled = sum(1 for v in puz if v)
    assert sudoku_solve(puz[:]) == 1
    return {'puzzle': puz, 'solution': sol, 'clues': sum(1 for v in puz if v)}


def maze(rng, w, h):
    walls = {(x, y): {'N', 'S', 'E', 'W'} for x in range(w) for y in range(h)}
    seen = {(0, 0)}; stack = [(0, 0)]
    mv = {'N': (0, -1, 'S'), 'S': (0, 1, 'N'), 'E': (1, 0, 'W'), 'W': (-1, 0, 'E')}
    while stack:
        x, y = stack[-1]
        opts = [(d, x + dx, y + dy, o) for d, (dx, dy, o) in mv.items() if (x + dx, y + dy) in walls and (x + dx, y + dy) not in seen]
        if not opts:
            stack.pop(); continue
        d, nx, ny, o = rng.choice(opts)
        walls[(x, y)].discard(d); walls[(nx, ny)].discard(o)
        seen.add((nx, ny)); stack.append((nx, ny))
    # solve with BFS from top-left to bottom-right
    start, end = (0, 0), (w - 1, h - 1)
    prev = {start: None}; q = [start]
    while q:
        cur = q.pop(0)
        if cur == end:
            break
        for d, (dx, dy, _) in mv.items():
            if d not in walls[cur]:
                nxt = (cur[0] + dx, cur[1] + dy)
                if nxt not in prev:
                    prev[nxt] = cur; q.append(nxt)
    path = []; c = end
    while c:
        path.append(c); c = prev[c]
    cells = [[''.join(sorted(walls[(x, y)])) for x in range(w)] for y in range(h)]
    return {'w': w, 'h': h, 'cells': cells, 'path': path[::-1]}


def scramble(words, rng):
    out = []
    for w in words:
        plain = w.replace(' ', '')
        letters = list(plain)
        for _ in range(50):
            rng.shuffle(letters)
            if ''.join(letters) != plain:
                break
        out.append({'w': w, 's': ''.join(letters)})
    return out


def cryptogram(q, rng):
    A = string.ascii_uppercase
    while True:
        perm = list(A); rng.shuffle(perm)
        if all(a != b for a, b in zip(A, perm)):
            break
    key = dict(zip(A, perm))
    up = q.upper()
    cipher = ''.join(key.get(ch, ch) for ch in up)
    counts = {}
    for ch in up:
        if ch in key: counts[ch] = counts.get(ch, 0) + 1
    common = sorted(counts, key=lambda c: (-counts[c], c))
    hints = [common[1], common[3]] if len(common) > 3 else common[:2]
    return {'q': q, 'plain': up, 'cipher': cipher, 'hints': {key[h]: h for h in hints}}


def vowels(w):
    return ''.join('_' if ch in 'AEIOU' else ch for ch in w.upper())


if __name__ == '__main__':
    spec = json.load(open(sys.argv[1]))
    rng = random.Random(spec['seed'])
    out = {'wordsearch': [], 'sudoku': [], 'maze': [], 'scramble': []}
    for t in spec['wordsearch']:
        words = [w.upper().replace(' ', '').replace('-', '').replace("'", '') for w in t['words']]
        d = wordsearch(words, rng)
        d['title'] = t['title']; d['display'] = t['words']
        out['wordsearch'].append(d)
    for i in range(spec['sudoku']):
        out['sudoku'].append(sudoku(rng, 38 if i < spec['sudoku'] // 2 else 31))
    out['sudoku'].sort(key=lambda d: -d['clues'])
    for i, d in enumerate(out['sudoku']):
        d['level'] = 'Gentle' if i < spec['sudoku'] // 2 else 'Steady'
    for i in range(spec['mazes']):
        out['maze'].append(maze(rng, 10 + (i % 4), 13 + (i % 4)))
    for t in spec['scramble']:
        out['scramble'].append({'title': t['title'], 'hint': t['hint'], 'items': scramble([w.upper() for w in t['words']], rng)})
    if 'vowels' in spec:
        out['vowels'] = [{'title': t['title'], 'hint': t['hint'], 'items': [{'w': w.upper(), 'm': vowels(w)} for w in t['words']]} for t in spec['vowels']]
    if 'quotes' in spec:
        out['crypto'] = [cryptogram(q, rng) for q in spec['quotes']]
    json.dump(out, open(sys.argv[2], 'w'))
    print('ok', {k: len(v) for k, v in out.items()}, 'sudoku clues', [s['clues'] for s in out['sudoku']])
