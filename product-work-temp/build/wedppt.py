"""Editable wedding stationery suite (PowerPoint). Usage: python3 wedppt.py outdir"""
import sys, os
from pptx import Presentation
from pptx.util import Mm, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn

IMG = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'img')
SERIF, SANS = 'Cormorant Garamond', 'Poppins'
INK, SAGE_DEEP, SAGE, CLAY, CLAY_DEEP, SOFT, LINE, CREAM = '3A352F', '47503E', '7C8B6B', 'CC8B6D', '94502F', '6B655C', 'D9CBB6', 'FBF7F1'
A, B = 'Ellie', 'James'
FULL = ('Ellie Campbell', 'James Reid')
DATE_LONG = 'Saturday 19 June 2027'
VENUE = ('Larchfield Barn', 'Kilbarchan Road, Glasgow')


def new(w_mm, h_mm):
    p = Presentation()
    p.slide_width, p.slide_height = Mm(w_mm), Mm(h_mm)
    return p


def blank(prs, bg=CREAM):
    s = prs.slides.add_slide(prs.slide_layouts[6])
    f = s.background.fill
    f.solid()
    f.fore_color.rgb = RGBColor.from_string(bg)
    return s


def tb(s, x, y, w, h, text, font=SANS, size=10, color=INK, bold=False, italic=False, align='c', spc=0, line=None, anchor='t', after=0):
    box = s.shapes.add_textbox(Mm(x), Mm(y), Mm(w), Mm(h))
    tf = box.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = {'t': MSO_ANCHOR.TOP, 'm': MSO_ANCHOR.MIDDLE, 'b': MSO_ANCHOR.BOTTOM}[anchor]
    for i, para in enumerate(text.split('\n')):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = {'c': PP_ALIGN.CENTER, 'l': PP_ALIGN.LEFT, 'r': PP_ALIGN.RIGHT}[align]
        if line:
            p.line_spacing = line
        if after:
            p.space_after = Pt(after)
        r = p.add_run()
        r.text = para
        f = r.font
        f.name, f.size, f.bold, f.italic = font, Pt(size), bold, italic
        f.color.rgb = RGBColor.from_string(color)
        if spc:
            r._r.get_or_add_rPr().set('spc', str(int(spc * 100)))
    return box


def frame(s, w, h, inset=6, color=LINE, width=0.75):
    r = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, Mm(inset), Mm(inset), Mm(w - 2 * inset), Mm(h - 2 * inset))
    r.fill.background()
    r.line.color.rgb = RGBColor.from_string(color)
    r.line.width = Pt(width)
    r.shadow.inherit = False
    return r


def hline(s, x, y, w, color=CLAY, width=0.75):
    r = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, Mm(x), Mm(y), Mm(w), Pt(width))
    r.fill.solid()
    r.fill.fore_color.rgb = RGBColor.from_string(color)
    r.line.fill.background()
    r.shadow.inherit = False
    return r


def img(s, path, x, y, w=None, h=None):
    return s.shapes.add_picture(os.path.join(IMG, path), Mm(x), Mm(y), Mm(w) if w else None, Mm(h) if h else None)


def flower(s, cx, y, w):
    img(s, 'flower.png', cx - w / 2, y, w)


def stem(s, x, y, w):
    img(s, 'larkspur-stem.png', x, y, w)


# ---------- 5x7 invitation suite ----------
def invitation_suite(out):
    W, H = 127, 178
    prs = new(W, H)
    # 1 Save the date
    s = blank(prs)
    frame(s, W, H)
    flower(s, W / 2, 20, 12)
    tb(s, 10, 40, W - 20, 6, 'SAVE THE DATE', SANS, 8, CLAY_DEEP, True, spc=3)
    tb(s, 10, 52, W - 20, 40, f'{A}\n&\n{B}', SERIF, 38, SAGE_DEEP, line=0.85)
    hline(s, W / 2 - 12, 104, 24)
    tb(s, 10, 110, W - 20, 10, '19 . 06 . 2027', SERIF, 22, INK)
    tb(s, 10, 124, W - 20, 6, f'{VENUE[0].upper()} · GLASGOW', SANS, 7.5, SOFT, spc=2)
    tb(s, 10, 150, W - 20, 8, 'Invitation to follow', SERIF, 13, CLAY_DEEP, italic=True)
    # 2 Invitation
    s = blank(prs)
    frame(s, W, H)
    stem(s, W - 46, H - 64, 44)
    tb(s, 12, 18, W - 24, 6, 'TOGETHER WITH THEIR FAMILIES', SANS, 7, CLAY_DEEP, True, spc=2.5)
    tb(s, 12, 30, W - 24, 34, f'{FULL[0]}\n&\n{FULL[1]}', SERIF, 26, SAGE_DEEP, line=0.9)
    tb(s, 14, 72, W - 28, 14, 'request the pleasure of your company\nat the celebration of their marriage', SERIF, 13, INK, italic=True, line=1.05)
    hline(s, W / 2 - 10, 92, 20)
    tb(s, 12, 98, W - 24, 6, DATE_LONG.upper(), SANS, 8, INK, True, spc=1.8)
    tb(s, 12, 105, W - 24, 6, 'at two o\'clock in the afternoon', SANS, 8.5, SOFT)
    tb(s, 12, 116, W - 24, 12, f'{VENUE[0]}\n{VENUE[1]}', SERIF, 13, SAGE_DEEP, line=1.0)
    tb(s, 12, 134, W - 24, 6, 'Reception to follow', SERIF, 12, CLAY_DEEP, italic=True)
    tb(s, 12, 150, W - 24, 8, 'RSVP by 1 May 2027', SANS, 7, SOFT, spc=1.5, align='c')
    # 3 Evening invitation
    s = blank(prs)
    frame(s, W, H)
    flower(s, W / 2, 20, 12)
    tb(s, 12, 40, W - 24, 6, 'PLEASE JOIN US IN THE EVENING', SANS, 7, CLAY_DEEP, True, spc=2.5)
    tb(s, 12, 52, W - 24, 34, f'{A}\n&\n{B}', SERIF, 34, SAGE_DEEP, line=0.85)
    tb(s, 14, 98, W - 28, 14, 'to celebrate our marriage with food, drinks and dancing', SERIF, 13, INK, italic=True, line=1.05)
    hline(s, W / 2 - 10, 118, 20)
    tb(s, 12, 124, W - 24, 6, DATE_LONG.upper(), SANS, 8, INK, True, spc=1.8)
    tb(s, 12, 131, W - 24, 6, 'from half past seven', SANS, 8.5, SOFT)
    tb(s, 12, 141, W - 24, 12, f'{VENUE[0]}\n{VENUE[1]}', SERIF, 13, SAGE_DEEP, line=1.0)
    # 4 Details card
    s = blank(prs)
    frame(s, W, H)
    tb(s, 12, 16, W - 24, 12, 'The details', SERIF, 26, SAGE_DEEP)
    hline(s, W / 2 - 10, 32, 20)
    items = [('THE CEREMONY', 'Please arrive by 1.30pm. The ceremony will begin at 2pm in the Barn.'),
             ('THE RECEPTION', 'Drinks on the lawn, followed by dinner, speeches and a ceilidh until midnight.'),
             ('GETTING THERE', 'Free parking at the venue. Taxis can be booked through Glasgow Cabs.'),
             ('STAYING OVER', 'Rooms are held at the Riverside Hotel. Quote "Campbell Reid" when booking.'),
             ('GIFTS', 'Your company is the best gift. If you\'d like to give something, a contribution to our honeymoon would be lovely.'),
             ('DRESS CODE', 'Smart, comfortable, and shoes you can dance in.')]
    y = 40
    for h, t in items:
        tb(s, 16, y, W - 32, 5, h, SANS, 6.8, CLAY_DEEP, True, spc=2)
        tb(s, 16, y + 5, W - 32, 14, t, SANS, 8, INK, line=1.15)
        y += 21.5
    # 5 RSVP
    s = blank(prs)
    frame(s, W, H)
    tb(s, 12, 18, W - 24, 12, 'RSVP', SERIF, 30, SAGE_DEEP)
    tb(s, 12, 34, W - 24, 6, 'KINDLY REPLY BY 1 MAY 2027', SANS, 7, CLAY_DEEP, True, spc=2)
    y = 50
    for lab in ['Name(s)', '']:
        tb(s, 16, y - 5, 40, 5, lab, SANS, 7.5, SOFT, align='l')
        hline(s, 16, y + 3, W - 32, LINE, 0.6)
        y += 11
    tb(s, 16, 78, W - 32, 6, '☐  Joyfully accepts          ☐  Regretfully declines', SANS, 8.5, INK)
    tb(s, 16, 92, W - 32, 5, 'MEAL CHOICE', SANS, 6.8, CLAY_DEEP, True, spc=2, align='l')
    tb(s, 16, 98, W - 32, 14, '☐  Beef     ☐  Salmon     ☐  Vegetarian     ☐  Vegan', SANS, 8, INK, align='l')
    y = 118
    for lab in ['Dietary needs', 'A song to get you dancing']:
        tb(s, 16, y - 5, 80, 5, lab, SANS, 7.5, SOFT, align='l')
        hline(s, 16, y + 3, W - 32, LINE, 0.6)
        y += 14
    tb(s, 12, 152, W - 24, 6, f'{A} & {B} · 19.06.2027', SERIF, 12, SAGE_DEEP, italic=True)
    # 6 Menu
    s = blank(prs)
    frame(s, W, H)
    flower(s, W / 2, 16, 10)
    tb(s, 12, 30, W - 24, 12, 'Menu', SERIF, 30, SAGE_DEEP)
    courses = [('TO START', 'Cullen skink with crusty bread\nor roasted tomato soup (v)'), ('MAIN', 'Slow-cooked beef with dauphinoise potatoes\nor pan-fried salmon with crushed new potatoes\nor wild mushroom risotto (v)'), ('DESSERT', 'Cranachan with raspberries and toasted oats\nor dark chocolate tart'), ('TO FINISH', 'Tea, coffee and tablet')]
    y = 50
    for h, t in courses:
        tb(s, 12, y, W - 24, 5, h, SANS, 7, CLAY_DEEP, True, spc=2.5)
        n = t.count('\n') + 1
        tb(s, 14, y + 6, W - 28, 6 * n, t, SERIF, 12.5, INK, line=1.0)
        y += 12 + 6.2 * n
    # 7 Thank you
    s = blank(prs)
    frame(s, W, H)
    stem(s, W / 2 - 22, 18, 44)
    tb(s, 12, 70, W - 24, 18, 'Thank you', SERIF, 40, SAGE_DEEP)
    tb(s, 16, 96, W - 32, 30, 'for being part of our wedding day, and for your kind gift. It meant the world to us to celebrate with you.', SERIF, 13.5, INK, italic=True, line=1.1)
    tb(s, 12, 140, W - 24, 8, f'With love, {A} & {B}', SERIF, 15, CLAY_DEEP)
    prs.save(out)


# ---------- A3 signs ----------
def signs(out):
    W, H = 297, 420
    prs = new(W, H)
    # Welcome
    s = blank(prs)
    frame(s, W, H, 14, LINE, 1.25)
    stem(s, W - 108, H - 128, 92)
    flower(s, W / 2, 50, 26)
    tb(s, 25, 100, W - 50, 10, 'WELCOME TO THE WEDDING OF', SANS, 16, CLAY_DEEP, True, spc=5)
    tb(s, 25, 125, W - 50, 120, f'{A}\n&\n{B}', SERIF, 110, SAGE_DEEP, line=0.82)
    hline(s, W / 2 - 30, 285, 60, CLAY, 1.5)
    tb(s, 25, 298, W - 50, 14, DATE_LONG, SERIF, 36, INK, italic=True)
    # Order of the day
    s = blank(prs)
    frame(s, W, H, 14, LINE, 1.25)
    tb(s, 25, 40, W - 50, 30, 'Order of the day', SERIF, 66, SAGE_DEEP)
    hline(s, W / 2 - 25, 82, 50, CLAY, 1.5)
    day = [('2.00pm', 'Ceremony'), ('2.45pm', 'Drinks & canapés'), ('4.30pm', 'Wedding breakfast'), ('6.30pm', 'Speeches'), ('7.30pm', 'Evening guests arrive'), ('8.00pm', 'First dance & ceilidh'), ('9.30pm', 'Evening food'), ('12.00am', 'Carriages')]
    y = 100
    for t, e in day:
        tb(s, 40, y, 90, 16, t, SERIF, 30, CLAY_DEEP, align='r', italic=True)
        tb(s, 145, y + 1, 130, 16, e, SANS, 22, INK, align='l')
        y += 36
    # Seating plan
    s = blank(prs)
    frame(s, W, H, 14, LINE, 1.25)
    tb(s, 25, 32, W - 50, 26, 'Find your seat', SERIF, 60, SAGE_DEEP)
    tb(s, 25, 66, W - 50, 8, 'PLEASE FIND YOUR NAME AND TABLE', SANS, 11, CLAY_DEEP, True, spc=4)
    names = ['Anna Campbell', 'Ben Stewart', 'Cara Murray', 'Dan Reid', 'Eve Clark', 'Finn Wilson', 'Gina Young', 'Hugh Paterson']
    tables = ['Loch Lomond', 'Ben Nevis', 'Skye', 'Arran', 'Iona', 'Harris', 'Mull', 'Islay']
    cw, ch = 118, 72
    for i, tname in enumerate(tables):
        cx = 25 + (i % 2) * (cw + 11) + 4
        cy = 88 + (i // 2) * (ch + 8)
        tb(s, cx, cy, cw, 10, tname, SERIF, 28, CLAY_DEEP, italic=True)
        hline(s, cx + cw / 2 - 10, cy + 13, 20, LINE, 1)
        tb(s, cx, cy + 17, cw, ch - 18, '\n'.join(names), SANS, 13, INK, line=1.1)
    # Unplugged
    s = blank(prs)
    frame(s, W, H, 14, LINE, 1.25)
    flower(s, W / 2, 70, 26)
    tb(s, 25, 115, W - 50, 60, 'Welcome to our\nunplugged ceremony', SERIF, 62, SAGE_DEEP, line=0.9)
    hline(s, W / 2 - 25, 200, 50, CLAY, 1.5)
    tb(s, 40, 215, W - 80, 70, 'We invite you to be fully present with us. Please turn off your phones and cameras. Our photographer will capture every moment, and we can\'t wait to share them with you.', SANS, 18, INK, line=1.3)
    tb(s, 25, 320, W - 50, 14, f'{A} & {B}', SERIF, 34, CLAY_DEEP, italic=True)
    # Cards & gifts
    s = blank(prs)
    frame(s, W, H, 14, LINE, 1.25)
    stem(s, W / 2 - 55, 60, 110)
    tb(s, 25, 190, W - 50, 30, 'Cards & gifts', SERIF, 76, SAGE_DEEP)
    hline(s, W / 2 - 25, 236, 50, CLAY, 1.5)
    tb(s, 40, 250, W - 80, 30, 'Thank you for sharing our day.\nYour love and laughter are the greatest gift.', SERIF, 26, INK, italic=True, line=1.1)
    # Signature drinks
    s = blank(prs)
    frame(s, W, H, 14, LINE, 1.25)
    tb(s, 25, 45, W - 50, 10, 'SIGNATURE DRINKS', SANS, 16, CLAY_DEEP, True, spc=5)
    tb(s, 25, 62, W - 50, 30, 'Cheers to us', SERIF, 66, SAGE_DEEP)
    for i, (n, d) in enumerate([('The Ellie', 'Prosecco, elderflower\nand a twist of lemon'), ('The James', 'Scotch whisky, ginger ale\nand fresh lime')]):
        y = 140 + i * 110
        tb(s, 25, y, W - 50, 20, n, SERIF, 50, CLAY_DEEP, italic=True)
        tb(s, 25, y + 32, W - 50, 30, d, SANS, 20, INK, line=1.25)
    hline(s, W / 2 - 25, 236, 50, CLAY, 1.5)
    # Choose a seat
    s = blank(prs)
    frame(s, W, H, 14, LINE, 1.25)
    flower(s, W / 2, 80, 26)
    tb(s, 25, 125, W - 50, 120, 'Choose a seat,\nnot a side', SERIF, 78, SAGE_DEEP, line=0.9)
    hline(s, W / 2 - 25, 245, 50, CLAY, 1.5)
    tb(s, 40, 260, W - 80, 40, 'We\'re all family once the knot is tied', SERIF, 30, INK, italic=True)
    stem(s, W / 2 - 40, 300, 80)
    # In loving memory
    s = blank(prs)
    frame(s, W, H, 14, LINE, 1.25)
    stem(s, W / 2 - 45, 55, 90)
    tb(s, 25, 165, W - 50, 30, 'In loving memory', SERIF, 66, SAGE_DEEP)
    hline(s, W / 2 - 25, 205, 50, CLAY, 1.5)
    tb(s, 40, 220, W - 80, 60, 'This seat is saved for those we love who can\'t be with us today. They are here in our hearts.', SERIF, 28, INK, italic=True, line=1.15)
    prs.save(out)


# ---------- table numbers 4x6 ----------
WORDS = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen']


def table_numbers(out):
    W, H = 101.6, 152.4
    prs = new(W, H)
    for label in ['Top table'] + WORDS[:12]:
        s = blank(prs)
        frame(s, W, H, 5)
        flower(s, W / 2, 22, 10)
        if label == 'Top table':
            tb(s, 8, 58, W - 16, 30, 'Top\ntable', SERIF, 40, SAGE_DEEP, line=0.85)
        else:
            tb(s, 8, 48, W - 16, 8, 'TABLE', SANS, 8, CLAY_DEEP, True, spc=4)
            tb(s, 8, 60, W - 16, 22, label, SERIF, 46, SAGE_DEEP)
        hline(s, W / 2 - 8, 108, 16)
        tb(s, 8, 114, W - 16, 6, f'{A} & {B} · 19.06.27', SERIF, 11, SOFT, italic=True)
    prs.save(out)


# ---------- place cards A4 ----------
def place_cards(out):
    W, H = 210, 297
    prs = new(W, H)
    guests = ['Anna Campbell', 'Ben Stewart', 'Cara Murray', 'Dan Reid', 'Eve Clark', 'Finn Wilson', 'Gina Young', 'Hugh Paterson', 'Isla Watson', 'Jack Kerr',
              'Kate Campbell', 'Liam Stewart', 'Mia Murray', 'Noah Reid', 'Orla Clark', 'Paul Wilson', 'Rosa Young', 'Sam Paterson', 'Tara Watson', 'Will Kerr']
    cw, ch, gx = 90, 50, 10
    x0 = (W - 2 * cw - gx) / 2
    y0 = (H - 5 * ch - 4 * 6) / 2
    for sheet in range(2):
        s = blank(prs, 'FFFFFF')
        for i in range(10):
            x = x0 + (i % 2) * (cw + gx)
            y = y0 + (i // 2) * (ch + 6)
            r = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, Mm(x), Mm(y), Mm(cw), Mm(ch))
            r.fill.solid()
            r.fill.fore_color.rgb = RGBColor.from_string(CREAM)
            r.line.color.rgb = RGBColor.from_string('C9C1B4')
            r.line.width = Pt(0.5)
            r.line.dash_style = 4  # dash
            r.shadow.inherit = False
            flower(s, x + cw / 2, y + 8, 6)
            tb(s, x + 4, y + 19, cw - 8, 14, guests[sheet * 10 + i], SERIF, 20, SAGE_DEEP, anchor='m')
            tb(s, x + 4, y + 37, cw - 8, 5, 'TABLE · ARRAN', SANS, 6, CLAY_DEEP, True, spc=2)
    prs.save(out)


if __name__ == '__main__':
    out = sys.argv[1]
    os.makedirs(out, exist_ok=True)
    invitation_suite(os.path.join(out, 'Invitation Suite (5x7 in).pptx'))
    signs(os.path.join(out, 'Wedding Signs (A3, scales to A2 & A1).pptx'))
    table_numbers(os.path.join(out, 'Table Numbers (4x6 in).pptx'))
    place_cards(os.path.join(out, 'Place Cards (A4, 10 per sheet).pptx'))
    print('ok')
