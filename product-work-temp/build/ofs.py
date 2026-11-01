"""Editable Word templates for the bereavement kit: 3 order of service designs, memorial sign,
thank-you cards and memory cards. Usage: python3 ofs.py outdir"""
import sys, os
from docx import Document
from docx.shared import Mm, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK
from docx.enum.section import WD_ORIENT
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ROW_HEIGHT_RULE
from docx.enum.text import WD_LINE_SPACING
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

IMG = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'img')
SERIF, SANS = 'Cormorant Garamond', 'Poppins'
C = lambda h: RGBColor.from_string(h)

NAME = ['Margaret Elizabeth', 'Moore']
DATES = '14 March 1941 – 2 October 2026'
SERVICE = ['Thursday 23 October 2026 · 11am', 'Daldowie Crematorium, Glasgow']
ORDER = [('Entrance music', 'Song title – Artist'), ('Welcome', 'Celebrant or minister\'s name'), ('Reading', 'Title – read by name'),
         ('Tribute', 'Given by name'), ('Music for reflection', 'Song title – Artist'), ('Reading', 'Title – read by name'),
         ('Committal', ''), ('Closing words', ''), ('Leaving music', 'Song title – Artist')]

READINGS = {
    'Remember': ('Christina Rossetti', 'Remember me when I am gone away,\nGone far away into the silent land;\nWhen you can no more hold me by the hand,\nNor I half turn to go yet turning stay.\nRemember me when no more day by day\nYou tell me of our future that you planned:\nOnly remember me; you understand\nIt will be late to counsel then or pray.\nYet if you should forget me for a while\nAnd afterwards remember, do not grieve:\nFor if the darkness and corruption leave\nA vestige of the thoughts that once I had,\nBetter by far you should forget and smile\nThan that you should remember and be sad.'),
    'Crossing the Bar': ('Alfred, Lord Tennyson', 'Sunset and evening star,\nAnd one clear call for me!\nAnd may there be no moaning of the bar,\nWhen I put out to sea,\n\nBut such a tide as moving seems asleep,\nToo full for sound and foam,\nWhen that which drew from out the boundless deep\nTurns again home.\n\nTwilight and evening bell,\nAnd after that the dark!\nAnd may there be no sadness of farewell,\nWhen I embark;\n\nFor tho\' from out our bourne of Time and Place\nThe flood may bear me far,\nI hope to see my Pilot face to face\nWhen I have crost the bar.'),
    'Death is nothing at all': ('Henry Scott Holland', 'Death is nothing at all. I have only slipped away into the next room. I am I and you are you. Whatever we were to each other, that we still are. Call me by my old familiar name. Speak to me in the easy way which you always used. Laugh as we always laughed at the little jokes we enjoyed together. Play, smile, think of me. Let my name be ever the household word that it always was. Life means all that it ever meant. Why should I be out of mind because I am out of sight? I am but waiting for you, for an interval, somewhere very near, just around the corner. All is well.'),
}

DESIGNS = {
    'Larkspur': dict(ink='3A352F', head='47503E', accent='94502F', soft='6B655C', kicker='IN LOVING MEMORY OF', top='flower.png',
                     reading='Remember', thanks='Thank you', thanks_text='The family would like to thank you for being here today, and for all the love, cards and kindness shown to us over the past few weeks.',
                     after='You are warmly invited to join us afterwards at The Riverside Hotel, 12 Main Street.', donations='Donations in Margaret\'s memory to Marie Curie can be made at the door or online.'),
    'Classic': dict(ink='2B2F36', head='2F3A4A', accent='9C8355', soft='5E6672', kicker='A SERVICE OF THANKSGIVING FOR THE LIFE OF', top=None, rules=True,
                    reading='Crossing the Bar', thanks='With thanks', thanks_text='The family thank you for joining them today to remember and give thanks for a life well lived.',
                    after='Refreshments will be served afterwards at the church hall. All are welcome.', donations='Family flowers only, please. Donations, if desired, to the British Heart Foundation.'),
    'Celebration': dict(ink='3A352F', head='94502F', accent='7C8B6B', soft='6B655C', kicker='CELEBRATING THE LIFE OF', top='ofs/circles-tr.png', landscape_front=True,
                        reading='Death is nothing at all', thanks='Raise a glass', thanks_text='Thank you for coming to celebrate with us. Mum would have loved seeing so many of her favourite people in one room.',
                        after='Please join us afterwards at The Old Boathouse for a drink, a bite to eat and plenty of stories.', donations='Bright colours welcome. No black ties, please!'),
}


def set_cols(section, num=2, space_mm=24):
    sp = section._sectPr
    for c in sp.findall(qn('w:cols')):
        sp.remove(c)
    cols = OxmlElement('w:cols')
    cols.set(qn('w:num'), str(num))
    cols.set(qn('w:space'), str(int(space_mm / 25.4 * 1440)))
    sp.append(cols)


def base_doc(landscape=True, margin=12):
    d = Document()
    s = d.sections[0]
    if landscape:
        s.orientation = WD_ORIENT.LANDSCAPE
        s.page_width, s.page_height = Mm(297), Mm(210)
    else:
        s.page_width, s.page_height = Mm(210), Mm(297)
    for side in ('left_margin', 'right_margin', 'top_margin', 'bottom_margin'):
        setattr(s, side, Mm(margin))
    st = d.styles['Normal']
    st.font.name = SANS
    st.font.size = Pt(9.5)
    st.element.rPr.rFonts.set(qn('w:eastAsia'), SANS)
    st.paragraph_format.space_after = Pt(0)
    st.paragraph_format.space_before = Pt(0)
    return d


def tracking(run, pts):
    rPr = run._r.get_or_add_rPr()
    sp = OxmlElement('w:spacing')
    sp.set(qn('w:val'), str(int(pts * 20)))
    rPr.append(sp)


def P(d, text='', font=SANS, size=9.5, color='3A352F', bold=False, italic=False, align='center', before=0, after=0, track=0, line=None, keep=False):
    p = d.add_paragraph()
    p.alignment = {'center': WD_ALIGN_PARAGRAPH.CENTER, 'left': WD_ALIGN_PARAGRAPH.LEFT, 'right': WD_ALIGN_PARAGRAPH.RIGHT}[align]
    pf = p.paragraph_format
    pf.space_before, pf.space_after = Pt(before), Pt(after)
    if line:
        pf.line_spacing = line
    if keep:
        pf.keep_with_next = True
    if text:
        r = p.add_run(text)
        r.font.name, r.font.size, r.font.bold, r.font.italic = font, Pt(size), bold, italic
        r._r.get_or_add_rPr().get_or_add_rFonts().set(qn('w:eastAsia'), font)
        r.font.color.rgb = C(color)
        if track:
            tracking(r, track)
    return p


def rule(p, color, where='bottom', sz=6):
    pPr = p._p.get_or_add_pPr()
    b = OxmlElement('w:pBdr')
    e = OxmlElement(f'w:{where}')
    e.set(qn('w:val'), 'single')
    e.set(qn('w:sz'), str(sz))
    e.set(qn('w:space'), '1')
    e.set(qn('w:color'), color)
    b.append(e)
    pPr.append(b)


def pic(d, path, w_mm, before=0, after=0):
    p = d.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before, p.paragraph_format.space_after = Pt(before), Pt(after)
    p.add_run().add_picture(os.path.join(IMG, path), width=Mm(w_mm))
    return p


def col_break(d):
    d.add_paragraph().add_run().add_break(WD_BREAK.COLUMN)


def short_rule(d, color, before=6, after=6):
    p = P(d, '', before=before, after=after)
    p.paragraph_format.left_indent = Mm(45)
    p.paragraph_format.right_indent = Mm(45)
    rule(p, color, sz=8)


def order_of_service(design, out):
    D = DESIGNS[design]
    d = base_doc()
    set_cols(d.sections[0])
    cls = D.get('rules')
    # PANEL 1 (back, left of outside)
    P(d, D['thanks'], SERIF, 26, D['head'], bold=False, before=40, after=8)
    P(d, D['thanks_text'], SANS, 9.5, D['ink'], after=14, line=1.35)
    short_rule(d, D['accent'])
    P(d, D['after'], SANS, 9.5, D['ink'], before=8, after=10, line=1.35)
    P(d, D['donations'], SANS, 9.5, D['soft'], italic=True, after=18, line=1.35)
    pic(d, 'ofs/photo-landscape.jpg', 62)
    col_break(d)
    # PANEL 2 (front)
    if D.get('top'):
        pic(d, D['top'], 14 if design == 'Larkspur' else 30, before=4 if design == 'Larkspur' else 0, after=6)
    else:
        P(d, '', before=24)
    p = P(d, D['kicker'], SANS, 7.5, D['accent'], bold=True, track=2.2, after=6)
    if cls:
        rule(p, D['accent'], 'top')
        p.paragraph_format.space_before = Pt(14)
    P(d, NAME[0], SERIF, 28, D['head'], bold=True, line=0.95)
    p = P(d, NAME[1], SERIF, 28, D['head'], bold=True, after=4, line=0.95)
    P(d, DATES, SANS, 9.5, D['soft'], after=12)
    if D.get('landscape_front'):
        pic(d, 'ofs/photo-landscape.jpg', 100, after=12)
    else:
        pic(d, 'ofs/photo-portrait.jpg', 66, after=12)
    p = P(d, SERVICE[0], SANS, 9.5, D['ink'], bold=True)
    p = P(d, SERVICE[1], SANS, 9.5, D['ink'])
    if cls:
        rule(p, D['accent'], 'bottom')
    col_break(d)
    # PANEL 3 (inside left): order of service
    P(d, 'Order of service', SERIF, 24, D['head'], before=10, after=4)
    short_rule(d, D['accent'], before=0, after=10)
    for i, (h, t) in enumerate(ORDER):
        P(d, h.upper(), SANS, 7.5, D['accent'], bold=True, track=1.6, before=11 if i else 0, keep=True)
        P(d, t or ' ', SANS, 10, D['ink'], before=1)
    col_break(d)
    # PANEL 4 (inside right): reading + photo
    title = D['reading']
    author, text = READINGS[title]
    P(d, title, SERIF, 22, D['head'], before=8)
    P(d, author.upper(), SANS, 7.5, D['accent'], bold=True, track=1.6, after=10)
    if '\n' in text:
        for stanza_line in text.split('\n'):
            P(d, stanza_line or ' ', SERIF, 12, D['ink'], line=1.12)
    else:
        P(d, text, SERIF, 12.5, D['ink'], line=1.25)
    if len(text) < 600:
        pic(d, 'ofs/photo-landscape.jpg', 58, before=14)
    d.save(out)


def memorial_sign(out):
    d = base_doc(landscape=False, margin=18)
    pic(d, 'flower.png', 18, before=6, after=10)
    P(d, 'WELCOME TO THE CELEBRATION OF THE LIFE OF', SANS, 9, '94502F', bold=True, track=2.5, after=10)
    P(d, NAME[0], SERIF, 48, '47503E', bold=True, line=0.9)
    P(d, NAME[1], SERIF, 48, '47503E', bold=True, line=0.9, after=8)
    P(d, DATES, SANS, 12, '6B655C', after=20)
    pic(d, 'ofs/photo-portrait.jpg', 105, after=20)
    P(d, '“Forever in our hearts”', SERIF, 22, '3A352F', italic=True)
    d.save(out)


def card_sheet(out, cards):
    """4 cards per A4 (A6 each), cut along the lines."""
    d = base_doc(landscape=False, margin=0)
    s = d.sections[0]
    s.top_margin = s.bottom_margin = Mm(0)
    s.left_margin = s.right_margin = Mm(0)
    t = d.add_table(rows=2, cols=2)
    t.alignment = WD_TABLE_ALIGNMENT.CENTER
    t.autofit = False
    for row in t.rows:
        row.height = Mm(148)
        row.height_rule = WD_ROW_HEIGHT_RULE.EXACTLY
        for cell in row.cells:
            cell.width = Mm(105)
    # dashed cut lines
    tbl = t._tbl
    tblPr = tbl.tblPr
    borders = OxmlElement('w:tblBorders')
    for e in ('insideH', 'insideV'):
        b = OxmlElement(f'w:{e}')
        b.set(qn('w:val'), 'dashed')
        b.set(qn('w:sz'), '4')
        b.set(qn('w:color'), 'C9C1B4')
        borders.append(b)
    tblPr.append(borders)
    mar = OxmlElement('w:tblCellMar')
    for side in ('left', 'right', 'top', 'bottom'):
        e = OxmlElement(f'w:{side}')
        e.set(qn('w:w'), '0')
        e.set(qn('w:type'), 'dxa')
        mar.append(e)
    tblPr.append(mar)
    ind = OxmlElement('w:tblInd')
    ind.set(qn('w:w'), '0')
    ind.set(qn('w:type'), 'dxa')
    tblPr.append(ind)
    lay = OxmlElement('w:tblLayout')
    lay.set(qn('w:type'), 'fixed')
    tblPr.append(lay)
    for gc in tbl.tblGrid.findall(qn('w:gridCol')):
        gc.set(qn('w:w'), str(int(105 / 25.4 * 1440)))
    for i, cell in enumerate([c for r in t.rows for c in r.cells]):
        cell.vertical_alignment = 1  # center
        cell.paragraphs[0].text = ''
        build = cards[i % len(cards)]
        build(cell)
    # remove the empty trailing paragraph height issue
    d.save(out)


def cellP(cell, text, font=SANS, size=9.5, color='3A352F', bold=False, italic=False, before=0, after=0, track=0, line=None, first=False):
    p = cell.paragraphs[0] if first else cell.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before, p.paragraph_format.space_after = Pt(before), Pt(after)
    p.paragraph_format.left_indent = p.paragraph_format.right_indent = Mm(10)
    if line:
        p.paragraph_format.line_spacing = line
    r = p.add_run(text)
    r.font.name, r.font.size, r.font.bold, r.font.italic = font, Pt(size), bold, italic
    r.font.color.rgb = C(color)
    if track:
        tracking(r, track)
    return p


def cell_pic(cell, path, w):
    p = cell.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.add_run().add_picture(os.path.join(IMG, path), width=Mm(w))
    p.paragraph_format.space_after = Pt(10)


def thankyou(cell):
    cellP(cell, 'THE FAMILY OF MARGARET', SANS, 7.5, '94502F', bold=True, track=2, first=True, after=8)
    cellP(cell, 'Thank you', SERIF, 30, '47503E', after=10)
    cellP(cell, 'for your kind words, cards and flowers, and for being with us to say goodbye. Your support has meant so much.', SANS, 9.5, '3A352F', line=1.4, after=14)
    cellP(cell, 'With love, Sam, Jo and family', SERIF, 13, '6B655C', italic=True)


def memory(cell):
    cellP(cell, 'SHARE A MEMORY OF', SANS, 7.5, '94502F', bold=True, track=2, first=True, after=4)
    cellP(cell, 'Margaret', SERIF, 28, '47503E', after=14)
    # alternate indents slightly so Word doesn't merge the borders into one box
    for i in range(7):
        p = cellP(cell, ' ', SANS, 10, before=8)
        p.paragraph_format.left_indent = p.paragraph_format.right_indent = Mm(10 + (i % 2) * 0.1)
        rule(p, 'D9CBB6')
    cellP(cell, 'From', SANS, 8, '6B655C', before=12)


if __name__ == '__main__':
    out = sys.argv[1]
    os.makedirs(out, exist_ok=True)
    for i, k in enumerate(DESIGNS, 1):
        order_of_service(k, os.path.join(out, f'Order of Service {i} - {k}.docx'))
    memorial_sign(os.path.join(out, 'Memorial Welcome Sign.docx'))
    card_sheet(os.path.join(out, 'Thank You Cards.docx'), [thankyou])
    card_sheet(os.path.join(out, 'Memory Cards.docx'), [memory])
    print('ok')
