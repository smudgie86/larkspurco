"""Wedding Budget & Guest Manager. Usage: python3 wedsheet.py outdir"""
import sys, os, datetime as dt, random
from openpyxl.chart import BarChart, DoughnutChart, Reference
from openpyxl.chart.series import DataPoint
from openpyxl.styles import Alignment
from xl import *

NB, NP, NG = 100, 150, 250  # budget rows, payment rows, guest rows
CATS = [('Venue', .22), ('Catering', .20), ('Drinks', .07), ('Photography', .08), ('Videography', .03), ('Attire', .07), ('Hair & makeup', .02),
        ('Flowers', .04), ('Decor', .03), ('Music & entertainment', .04), ('Stationery', .02), ('Cake', .02), ('Rings', .05), ('Transport', .02),
        ('Ceremony & legal', .02), ('Favours & gifts', .01), ('Accommodation', .01), ('Honeymoon', .0), ('Contingency', .05), ('Other', .0)]
MEALS = ['Meat', 'Fish', 'Vegetarian', 'Vegan', 'Child\'s meal', 'Not chosen']
NCAT = len(CATS)
CAT_RNG = f'Settings!$B$14:$B${13 + NCAT}'
MEAL_RNG = f'Settings!$E$14:$E${13 + len(MEALS)}'


def build(example=False):
    wb = new_wb()
    start_here(wb, 'Wedding Budget & Guest Manager',
               'Your whole wedding in one spreadsheet: budget, payments, suppliers, guest list, RSVPs, meal choices and tables. '
               'Fill in the Settings tab first, then everything adds up on the Dashboard.',
               [('Settings first', 'Add your names, wedding date, total budget and guest target. Adjust the budget split and meal options if you like.'),
                ('Budget', 'One row per item. Add the estimate now, and the actual price once you book. The Dashboard compares them with your plan.'),
                ('Payments', 'Log every deposit and payment. Pick the budget item it\'s for from the drop-down and the "Paid so far" column on the Budget tab fills itself in. Give each budget item a different name.'),
                ('Guests', 'One row per guest. Track invitations, RSVPs, meal choices, dietary needs, table numbers, gifts and thank-you cards.'),
                ('Tables', 'Name your tables and set how many seats each has. It counts who\'s seated and warns you if a table is too full.'),
                ('Dashboard', 'Days to go, money spent and left, RSVPs and meal totals for your caterer, all in one place.')],
               extra=[('Opening this file', ['Excel: open as normal. Google Sheets: upload to Google Drive and open with Google Sheets (File › Import also works). Apple Numbers: open as normal; charts may look slightly different.']),
                      ('Tip', ['Look at the EXAMPLE file to see a filled-in version, then use the blank one for your own wedding.'])])

    # SETTINGS
    s = sheet(wb, 'Settings', tab=CLAY_DEEP, widths=[3, 26, 16, 3, 22, 12])
    title(s, 'Settings', 'Fill these in first. Everything else uses them.')
    rows = [('Our names', 'Ellie & James' if example else None, None), ('Wedding date', dt.date(2027, 6, 19) if example else None, DATE),
            ('Total budget £', 18000 if example else None, GBP0), ('Guest target (day)', 70 if example else None, '0'), ('Guest target (evening extra)', 40 if example else None, '0')]
    for i, (k, v, f) in enumerate(rows):
        r = 5 + i
        s.cell(row=r, column=2, value=k).font = font(10, True)
        c = s.cell(row=r, column=3, value=v)
        c.fill, c.border, c.font = fill(CREAM), BOX, font(11, True, SAGE_DEEP)
        if f:
            c.number_format = f
    section_label(s, 12, 2, 'Budget split', merge_to=3)
    s.cell(row=13, column=2, value='Category').font = font(9, True, INK_SOFT)
    s.cell(row=13, column=3, value='% of budget').font = font(9, True, INK_SOFT)
    for i, (cname, pct) in enumerate(CATS):
        r = 14 + i
        s.cell(row=r, column=2, value=cname).font = font(10)
        c = s.cell(row=r, column=3, value=pct)
        c.number_format, c.fill, c.font = PCT, fill(CREAM), font(10)
        for col in (2, 3):
            s.cell(row=r, column=col).border = BOTTOM
    r = 14 + NCAT
    s.cell(row=r, column=2, value='Total (aim for 100%)').font = font(10, True)
    c = s.cell(row=r, column=3, value=f'=SUM(C14:C{r - 1})')
    c.number_format, c.font = PCT, font(10, True, CLAY_DEEP)
    highlight(s, f'C{r}', f'ROUND(C{r},2)<>1', CLAY_LIGHT)
    section_label(s, 12, 5, 'Meal options', merge_to=6)
    for i, m in enumerate(MEALS):
        c = s.cell(row=14 + i, column=5, value=m)
        c.fill, c.border, c.font = fill(CREAM), BOTTOM, font(10)
    note(s, 14 + len(MEALS) + 1, 5, 'Rename these to match your menu.', 8)

    # BUDGET
    b = sheet(wb, 'Budget', widths=[3, 20, 26, 22, 13, 13, 13, 13, 14, 13, 28])
    title(b, 'Budget', 'Estimate first, then add the actual price when you book. Paid so far comes from the Payments tab.')
    header(b, 5, ['Category', 'Item', 'Supplier', 'Estimate £', 'Actual £', 'Paid so far £', 'Left to pay £', 'Final payment due', 'Status', 'Notes'], col=2)
    input_rows(b, 6, 5 + NB, 2, 11, {5: GBP0, 6: GBP, 9: DATE})
    for r in range(6, 6 + NB):
        b.cell(row=r, column=7, value=f'=IF(C{r}="","",SUMIFS(Payments!$E$6:$E${5 + NP},Payments!$C$6:$C${5 + NP},C{r}))')
        b.cell(row=r, column=8, value=f'=IF(F{r}="","",F{r}-N(G{r}))')
    calc_style(b, 6, 5 + NB, [7, 8], GBP)
    dropdown_ref(b, f'B6:B{5 + NB}', '=' + CAT_RNG)
    dropdown(b, f'J6:J{5 + NB}', ['Idea', 'Quote', 'Booked', 'Paid in full', 'Not needed'])
    highlight(b, f'B6:K{5 + NB}', f'AND($I6<>"",$I6-TODAY()<=30,N($H6)>0)')
    highlight(b, f'J6:J{5 + NB}', '$J6="Paid in full"', SAGE_LIGHT)

    # PAYMENTS
    p = sheet(wb, 'Payments', widths=[3, 13, 24, 26, 13, 16, 16, 26])
    title(p, 'Payments', 'Every deposit and payment. Pick the budget item from the list so it links to your budget.')
    header(p, 5, ['Date', 'Budget item', 'Paid to / note', 'Amount £', 'Paid by', 'Method', 'Notes'], col=2)
    input_rows(p, 6, 5 + NP, 2, 8, {2: DATE, 5: GBP})
    dropdown_ref(p, f'C6:C{5 + NP}', f'=Budget!$C$6:$C${5 + NB}')
    dropdown(p, f'F6:F{5 + NP}', ['Us', 'Partner 1', 'Partner 2', 'Parents', 'Family', 'Gift', 'Other'])
    dropdown(p, f'G6:G{5 + NP}', ['Bank transfer', 'Debit card', 'Credit card', 'Cash', 'Cheque', 'Other'])

    # SUPPLIERS
    sp = sheet(wb, 'Suppliers', widths=[3, 22, 24, 18, 16, 26, 22, 12, 12, 26])
    title(sp, 'Suppliers', 'Contact details and contracts in one place.')
    header(sp, 5, ['Category', 'Company', 'Contact', 'Phone', 'Email', 'Website / socials', 'Booked?', 'Contract?', 'Notes'], col=2)
    input_rows(sp, 6, 45, 2, 10)
    dropdown_ref(sp, 'B6:B45', '=' + CAT_RNG)
    dropdown(sp, 'H6:I45', ['Yes', 'No', 'Pending'])

    # GUESTS
    g = sheet(wb, 'Guests', widths=[3, 14, 16, 18, 12, 10, 10, 10, 11, 14, 20, 8, 26, 18, 10])
    title(g, 'Guest list', 'One row per person (children too). RSVPs, meals and tables feed the Dashboard.')
    header(g, 5, ['First name', 'Last name', 'Household / group', 'Side', 'Invited to', 'Save the date', 'Invite sent', 'RSVP', 'Meal', 'Dietary needs', 'Table', 'Address', 'Gift', 'Thank you'], col=2)
    input_rows(g, 6, 5 + NG, 2, 15, {12: '0'})
    dropdown(g, f'E6:E{5 + NG}', ['Partner 1', 'Partner 2', 'Both'])
    dropdown(g, f'F6:F{5 + NG}', ['Day', 'Evening'])
    dropdown(g, f'G6:H{5 + NG}', ['Yes', 'No'])
    dropdown(g, f'I6:I{5 + NG}', ['Yes', 'No', 'Awaiting'])
    dropdown_ref(g, f'J6:J{5 + NG}', '=' + MEAL_RNG)
    dropdown(g, f'O6:O{5 + NG}', ['Sent', 'To do'])
    highlight(g, f'I6:I{5 + NG}', '$I6="Yes"', SAGE_LIGHT)
    highlight(g, f'I6:I{5 + NG}', '$I6="No"', 'EDE7DF')

    # TABLES
    t = sheet(wb, 'Tables', widths=[3, 10, 26, 10, 12, 12, 30])
    title(t, 'Tables', 'Give each table a name and number of seats. Guests are counted from the Table column on the Guests tab (attending only).')
    header(t, 5, ['Table', 'Name', 'Seats', 'Seated', 'Spare', 'Notes'], col=2)
    input_rows(t, 6, 30, 2, 7)
    for i in range(25):
        r = 6 + i
        t.cell(row=r, column=2, value=i + 1)
        t.cell(row=r, column=5, value=f'=COUNTIFS(Guests!$L$6:$L${5 + NG},B{r},Guests!$I$6:$I${5 + NG},"<>No")')
        t.cell(row=r, column=6, value=f'=IF(D{r}="","",D{r}-E{r})')
    calc_style(t, 6, 30, [5, 6], '0')
    highlight(t, 'B6:G30', 'AND($D6<>"",$E6>$D6)')
    t.cell(row=32, column=2, value='Total').font = font(10, True)
    for col, f in [(4, '=SUM(D6:D30)'), (5, '=SUM(E6:E30)')]:
        c = t.cell(row=32, column=col, value=f)
        c.font = font(10, True, CLAY_DEEP)
    note(t, 33, 2, 'Pink rows have more guests than seats. Guests who said No are not counted.', 8, merge_to=7)

    # DASHBOARD
    d = sheet(wb, 'Dashboard', tab=CLAY, widths=[3, 20, 13, 3, 13, 13, 3, 15, 15, 3, 15, 15, 3])
    d.page_setup.fitToHeight = 1
    d.cell(row=1, column=2, value='LARKSPUR & CO.').font = font(8, True, CLAY)
    c = d.cell(row=2, column=2, value='=IF(Settings!C5="","Our wedding",Settings!C5)')
    c.font = font(20, True, SAGE_DEEP)
    d.row_dimensions[2].height = 32
    c = d.cell(row=3, column=2, value='=IF(Settings!C6="","Add your wedding date on the Settings tab",TEXT(Settings!C6,"dddd d mmmm yyyy"))')
    c.font = font(10, False, INK_SOFT)
    kpi(d, 5, 2, 'Days to go', '=IF(Settings!C6="","–",MAX(0,Settings!C6-TODAY()))', fmt='0', color=SAGE_DEEP, bg=SAGE_LIGHT)
    kpi(d, 5, 5, 'Total budget', '=N(Settings!C7)')
    kpi(d, 5, 8, 'Booked so far', f'=SUM(Budget!F6:F{5 + NB})+SUMIFS(Budget!E6:E{5 + NB},Budget!F6:F{5 + NB},"")', color=SAGE_DEEP, bg=SAGE_LIGHT)
    kpi(d, 5, 11, 'Budget left', '=E6-H6')
    kpi(d, 8, 2, 'Paid so far', f'=SUM(Payments!E6:E{5 + NP})', color=SAGE_DEEP, bg=SAGE_LIGHT)
    kpi(d, 8, 5, 'Still to pay', f'=SUM(Budget!H6:H{5 + NB})')
    kpi(d, 8, 8, 'Attending (day)', f'=COUNTIFS(Guests!I6:I{5 + NG},"Yes",Guests!F6:F{5 + NG},"Day")', fmt='0', color=SAGE_DEEP, bg=SAGE_LIGHT)
    kpi(d, 8, 11, 'Awaiting RSVP', f'=COUNTIFS(Guests!B6:B{5 + NG},"<>",Guests!I6:I{5 + NG},"<>Yes",Guests!I6:I{5 + NG},"<>No")', fmt='0')
    highlight(d, 'K6', 'K6<0', 'F5D0C5')
    # budget table
    section_label(d, 11, 2, 'Budget by category', merge_to=6)
    for j, h in enumerate(['Category', 'Planned £', '', 'Booked £', 'Paid £']):
        if h:
            d.cell(row=12, column=2 + j, value=h).font = font(9, True, INK_SOFT)
    for i, (cname, _) in enumerate(CATS):
        r = 13 + i
        d.cell(row=r, column=2, value=f'=Settings!B{14 + i}').font = font(10)
        c = d.cell(row=r, column=3, value=f'=N(Settings!$C$7)*Settings!C{14 + i}')
        c.number_format, c.font = GBP0, font(10)
        c = d.cell(row=r, column=5, value=f'=SUMIFS(Budget!$F$6:$F${5 + NB},Budget!$B$6:$B${5 + NB},B{r})+SUMIFS(Budget!$E$6:$E${5 + NB},Budget!$B$6:$B${5 + NB},B{r},Budget!$F$6:$F${5 + NB},"")')
        c.number_format, c.font = GBP0, font(10, False, SAGE_DEEP)
        c = d.cell(row=r, column=6, value=f'=SUMIFS(Budget!$G$6:$G${5 + NB},Budget!$B$6:$B${5 + NB},B{r})')
        c.number_format, c.font = GBP0, font(10, False, SAGE_DEEP)
        for col in (2, 3, 4, 5, 6):
            d.cell(row=r, column=col).border = BOTTOM
    highlight(d, f'B13:F{12 + NCAT}', 'AND($C13>0,$E13>$C13)')
    note(d, 13 + NCAT, 2, 'Pink: booked more than planned for that category.', 8, merge_to=6)
    # guests summary
    section_label(d, 11, 8, 'Guests', merge_to=12)
    gs = [('Invited (all)', f'=COUNTA(Guests!B6:B{5 + NG})'), ('Day guests invited', f'=COUNTIFS(Guests!B6:B{5 + NG},"<>",Guests!F6:F{5 + NG},"Day")'),
          ('Evening guests invited', f'=COUNTIFS(Guests!B6:B{5 + NG},"<>",Guests!F6:F{5 + NG},"Evening")'), ('Attending', f'=COUNTIF(Guests!I6:I{5 + NG},"Yes")'),
          ('Attending (evening)', f'=COUNTIFS(Guests!I6:I{5 + NG},"Yes",Guests!F6:F{5 + NG},"Evening")'), ('Declined', f'=COUNTIF(Guests!I6:I{5 + NG},"No")'),
          ('Dietary needs noted', f'=COUNTIFS(Guests!I6:I{5 + NG},"Yes",Guests!K6:K{5 + NG},"<>")'), ('Thank yous still to send', f'=COUNTIFS(Guests!N6:N{5 + NG},"<>",Guests!O6:O{5 + NG},"<>Sent")')]
    for i, (k, f) in enumerate(gs):
        r = 12 + i
        d.cell(row=r, column=8, value=k).font = font(10)
        c = d.cell(row=r, column=11, value=f)
        c.font, c.number_format = font(10, True, SAGE_DEEP), '0'
        for col in range(8, 12):
            d.cell(row=r, column=col).border = BOTTOM
    section_label(d, 21, 8, 'Meals for the caterer (attending)', merge_to=12)
    for i in range(len(MEALS)):
        r = 22 + i
        d.cell(row=r, column=8, value=f'=Settings!E{14 + i}').font = font(10)
        c = d.cell(row=r, column=11, value=f'=IF(H{r}="","",COUNTIFS(Guests!J$6:J${5 + NG},H{r},Guests!I$6:I${5 + NG},"Yes"))')
        c.font, c.number_format = font(10, True, SAGE_DEEP), '0'
        for col in range(8, 12):
            d.cell(row=r, column=col).border = BOTTOM
    # chart
    ch = BarChart()
    ch.type, ch.grouping, ch.style = 'bar', 'clustered', 10
    ch.title = 'Planned vs booked'
    data = Reference(d, min_col=3, min_row=12, max_row=12 + NCAT)
    ch.add_data(data, titles_from_data=True)
    ch.add_data(Reference(d, min_col=5, min_row=12, max_row=12 + NCAT), titles_from_data=True)
    ch.set_categories(Reference(d, min_col=2, min_row=13, max_row=12 + NCAT))
    ch.series[0].graphicalProperties.solidFill = SAGE_LIGHT
    ch.series[0].graphicalProperties.line.solidFill = SAGE
    ch.series[1].graphicalProperties.solidFill = CLAY
    ch.series[1].graphicalProperties.line.solidFill = CLAY
    ch.x_axis.scaling.orientation = 'maxMin'
    ch.y_axis.numFmt = '"£"#,##0'
    ch.y_axis.majorGridlines = None
    ch.x_axis.tickLblSkip = 1
    ch.x_axis.delete = False
    ch.y_axis.delete = False
    ch.legend.position = 'b'
    ch.height, ch.width = 11, 14.5
    d.add_chart(ch, f'B{15 + NCAT}')
    dn = DoughnutChart()
    dn.title = 'RSVPs'
    for r, (k, f) in enumerate([('', 'Guests'), ('Yes', '=K15'), ('No', '=K17'), ('Awaiting', '=MAX(0,K12-K15-K17)')], start=29):
        if k:
            d.cell(row=r, column=16, value=k).font = font(8, False, 'FFFFFF')
        d.cell(row=r, column=17, value=f).font = font(8, False, 'FFFFFF')
    dn.add_data(Reference(d, min_col=17, min_row=29, max_row=32), titles_from_data=True)
    dn.set_categories(Reference(d, min_col=16, min_row=30, max_row=32))
    for idx, colr in enumerate([SAGE, 'C9C1B4', CLAY]):
        pt = DataPoint(idx=idx)
        pt.graphicalProperties.solidFill = colr
        pt.graphicalProperties.line.solidFill = 'FFFFFF'
        dn.series[0].dPt.append(pt)
    dn.holeSize = 55
    dn.height, dn.width = 7.5, 10
    dn.legend.position = 'r'
    d.add_chart(dn, 'H35')

    if example:
        random.seed(7)
        budget = [('Venue', 'Venue hire & ceremony room', 'Larchfield Barn', 4200, 4400, dt.date(2027, 5, 1), 'Booked'),
                  ('Catering', 'Wedding breakfast (70)', 'Larchfield Barn', 3500, 3640, dt.date(2027, 5, 19), 'Booked'),
                  ('Catering', 'Evening food (110)', 'Pizza Van Co', 900, 880, dt.date(2027, 6, 1), 'Booked'),
                  ('Drinks', 'Drinks package', 'Larchfield Barn', 1300, None, None, 'Quote'),
                  ('Photography', 'Full day photography', 'Lucy Grey Photography', 1500, 1650, dt.date(2027, 5, 19), 'Booked'),
                  ('Attire', 'Dress & alterations', 'The Bridal Room', 1200, 1150, None, 'Paid in full'),
                  ('Attire', 'Suits (hire x4)', 'Slater Menswear', 500, None, None, 'Quote'),
                  ('Hair & makeup', 'Bride + 2 bridesmaids', 'Glow Studio', 380, 380, dt.date(2027, 6, 19), 'Booked'),
                  ('Flowers', 'Bouquets, buttonholes, tables', 'Wild Stems', 750, None, None, 'Quote'),
                  ('Music & entertainment', 'Band (evening)', 'The Ceilidh Collective', 900, 950, dt.date(2027, 6, 5), 'Booked'),
                  ('Stationery', 'Invites & on the day', 'Printed at home', 150, 120, None, 'Paid in full'),
                  ('Cake', 'Two tier cake', 'Bakehouse 21', 300, None, None, 'Idea'),
                  ('Rings', 'Wedding rings', 'Jeweller', 900, 860, None, 'Paid in full'),
                  ('Ceremony & legal', 'Registrar & notice fees', 'Council', 400, 400, dt.date(2027, 4, 1), 'Booked'),
                  ('Transport', 'Car to venue', 'Classic Cars', 350, None, None, 'Idea')]
        for i, (cat, item, sup, est, act, due, st) in enumerate(budget):
            r = 6 + i
            for col, v in zip([2, 3, 4, 5, 6, 9, 10], [cat, item, sup, est, act, due, st]):
                b.cell(row=r, column=col, value=v)
        pays = [(dt.date(2026, 9, 2), 'Venue hire & ceremony room', 'Larchfield Barn deposit', 1500, 'Us', 'Bank transfer'),
                (dt.date(2026, 9, 20), 'Full day photography', 'Lucy Grey booking fee', 400, 'Us', 'Debit card'),
                (dt.date(2026, 10, 3), 'Dress & alterations', 'The Bridal Room', 1150, 'Parents', 'Credit card'),
                (dt.date(2026, 10, 10), 'Bride + 2 bridesmaids', 'Glow Studio deposit', 100, 'Partner 1', 'Bank transfer'),
                (dt.date(2026, 10, 12), 'Band (evening)', 'Ceilidh Collective deposit', 250, 'Us', 'Bank transfer'),
                (dt.date(2026, 10, 15), 'Invites & on the day', 'Card & envelopes', 120, 'Us', 'Debit card'),
                (dt.date(2026, 10, 18), 'Wedding rings', 'Jeweller', 860, 'Us', 'Credit card'),
                (dt.date(2026, 10, 20), 'Registrar & notice fees', 'Notice of marriage', 70, 'Us', 'Debit card')]
        for i, row in enumerate(pays):
            for j, v in enumerate(row):
                p.cell(row=6 + i, column=2 + j, value=v)
        firsts = ['Anna', 'Ben', 'Cara', 'Dan', 'Eve', 'Finn', 'Gina', 'Hugh', 'Isla', 'Jack', 'Kate', 'Liam', 'Mia', 'Noah', 'Orla', 'Paul', 'Rosa', 'Sam', 'Tara', 'Will', 'Zoe', 'Euan', 'Fiona', 'Ross', 'Ailsa', 'Callum', 'Kirsty', 'Rory', 'Heather', 'Fraser']
        lasts = ['Campbell', 'Stewart', 'Murray', 'Reid', 'Clark', 'Wilson', 'Young', 'Paterson', 'Watson', 'Kerr']
        rsvp = ['Yes'] * 7 + ['No'] + ['Awaiting'] * 2
        for i in range(60):
            r = 6 + i
            ans = random.choice(rsvp)
            day = 'Day' if i < 44 else 'Evening'
            vals = [firsts[i % 30], lasts[(i * 7) % 10], f'{lasts[(i * 7) % 10]} household', random.choice(['Partner 1', 'Partner 2', 'Both']), day, 'Yes', 'Yes', ans,
                    random.choice(MEALS[:4]) if ans == 'Yes' and day == 'Day' else None, random.choice([None] * 6 + ['Gluten free', 'Nut allergy']) if ans == 'Yes' else None,
                    (i // 8) + 1 if ans == 'Yes' and day == 'Day' else None]
            for j, v in enumerate(vals):
                g.cell(row=r, column=2 + j, value=v)
        names = ['Top table', 'Loch Lomond', 'Ben Nevis', 'Skye', 'Arran', 'Iona', 'Harris']
        for i, n in enumerate(names):
            t.cell(row=6 + i, column=3, value=n)
            t.cell(row=6 + i, column=4, value=8 if i else 6)
        for i, (cat, co, ct, ph) in enumerate([('Venue', 'Larchfield Barn', 'Sophie (events)', '01234 567890'), ('Photography', 'Lucy Grey Photography', 'Lucy', '07700 900123')]):
            for col, v in zip([2, 3, 4, 5, 8, 9], [cat, co, ct, ph, 'Yes', 'Yes']):
                sp.cell(row=6 + i, column=col, value=v)
    wb.active = wb.sheetnames.index('Dashboard') if example else 0
    return wb


if __name__ == '__main__':
    out = sys.argv[1]
    os.makedirs(out, exist_ok=True)
    build(False).save(os.path.join(out, 'Wedding Budget & Guest Manager.xlsx'))
    build(True).save(os.path.join(out, 'Wedding Budget & Guest Manager - EXAMPLE.xlsx'))
    print('ok')
