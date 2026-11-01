"""ADHD-friendly Money Dashboard. Usage: python3 moneysheet.py outdir"""
import sys, os, datetime as dt, random
from openpyxl.chart import BarChart, Reference
from openpyxl.styles import Alignment
from xl import *

NL, NC, NB, NS, NP, NV, ND = 1500, 30, 40, 40, 15, 300, 15
CATS = [('Rent / mortgage', 'Bills', 850), ('Council tax', 'Bills', 160), ('Energy', 'Bills', 140), ('Phone & internet', 'Bills', 45), ('Food shop', 'Needs', 320),
        ('Transport', 'Needs', 120), ('Kids', 'Needs', 80), ('Pets', 'Needs', 40), ('Health', 'Needs', 20), ('Eating out & takeaways', 'Wants', 80),
        ('Coffee & snacks', 'Wants', 30), ('Fun & hobbies', 'Wants', 60), ('Clothes', 'Wants', 40), ('Gifts', 'Wants', 30), ('Impulse buys', 'Wants', 40),
        ('Subscriptions', 'Bills', 45), ('Savings', 'Savings', 150), ('Debt payments', 'Debt', 200), ('Other', 'Wants', 30)]
TASKS = ['Check your bank balance (just look, no judgement)', 'Log any spending from yesterday', 'Look at one subscription: do you still use it?', 'Move £5 into a savings pot',
         'Check which bills are due this week', 'Unsubscribe from one shop\'s marketing emails', 'Delete a saved card from one shopping app', 'Write down one thing you\'re saving for',
         'Check one bill for a better deal', 'Celebrate: you opened your money dashboard!', 'Take a photo of any receipts you need to keep', 'Plan one no-spend day this week',
         'Check your direct debits match this list', 'Round up: move the pennies in your account to savings', 'Look at your "Impulse buys" total. Any surprises?']
CAT_RNG = f'Budget!$B$6:$B${5 + NC}'
MK = 'Settings!$C$8'  # month key


def build(example=False):
    wb = new_wb()
    start_here(wb, 'The ADHD Money Dashboard',
               'Money admin, made friendlier for busy brains. Log spending in seconds, see what\'s safe to spend today, catch forgotten subscriptions, '
               'and watch your savings grow and your debts shrink. Big numbers, few clicks, no judgement.',
               [('Settings (5 minutes)', 'Add your monthly take-home pay and payday. The dashboard shows this month automatically.'),
                ('Budget', 'Set a monthly amount for each category. Rename or add categories if you like. Not sure? Use last month\'s spending as a guide.'),
                ('Spend log', 'The only tab you need daily: date, amount, category. That\'s it. Add money coming in too (choose In).'),
                ('Bills & Subscriptions', 'List them once. Bills show what\'s due soon. Subscriptions flag the ones you forgot about.'),
                ('Savings & Debts', 'Set goals for savings pots and list debts. It works out what to put aside each month and a rough debt-free date.'),
                ('Dashboard', 'Open this whenever you like. "Safe to spend per day" is your one number to remember.')],
               extra=[('ADHD tips', ['Set a phone reminder at the same time each day to log spending. Two minutes is enough.',
                                     'Missed a week? Don\'t try to catch up perfectly. Check your banking app and add rough totals per category, then carry on.',
                                     'Use the tiny task on the Dashboard when you don\'t know where to start.']),
                      ('Please note', ['This is a budgeting tool, not financial advice. For help with debt, contact a free service such as StepChange, National Debtline or Citizens Advice.'])])

    s = sheet(wb, 'Settings', tab=CLAY_DEEP, widths=[3, 36, 18, 3, 50])
    title(s, 'Settings', 'Fill in the cream cells.')
    rows = [('My name', 'Sam' if example else None, None), ('Monthly take-home pay £', 2450 if example else None, GBP0),
            ('Month to show (leave as is for this month)', '=DATE(YEAR(TODAY()),MONTH(TODAY()),1)', 'mmmm yyyy'), ('(month key)', '=YEAR(C7)*100+MONTH(C7)', '0'),
            ('Extra debt payment each month £', 50 if example else 0, GBP0)]
    for i, (k, v, f) in enumerate(rows):
        r = 5 + i
        s.cell(row=r, column=2, value=k).font = font(10, True, INK if k[0] != '(' else 'BBBBBB')
        c = s.cell(row=r, column=3, value=v)
        c.fill, c.border, c.font = fill(CREAM if k[0] != '(' else 'FFFFFF'), BOX if k[0] != '(' else BOTTOM, font(10, True, SAGE_DEEP) if k[0] != '(' else font(8, False, 'BBBBBB')
        if f:
            c.number_format = f
    note(s, 7, 5, 'To look back at another month, type its date here (e.g. 1/3/2027). Delete it and paste =DATE(YEAR(TODAY()),MONTH(TODAY()),1) to go back to this month.', 8)

    # BUDGET
    b = sheet(wb, 'Budget', widths=[3, 26, 12, 14, 14, 14, 12, 16])
    title(b, 'Budget', 'Your monthly plan per category. Spent and left update from the Spend log for the month on the Dashboard.')
    header(b, 5, ['Category', 'Type', 'Budget £', 'Spent £', 'Left £', '% used', 'Status'], col=2)
    input_rows(b, 6, 5 + NC, 2, 4, {4: GBP0})
    for i, (cn, ty, amt) in enumerate(CATS):
        b.cell(row=6 + i, column=2, value=cn)
        b.cell(row=6 + i, column=3, value=ty)
        b.cell(row=6 + i, column=4, value=amt if example else None)
    for r in range(6, 6 + NC):
        b.cell(row=r, column=5, value=f'=IF(B{r}="","",SUMIFS(\'Spend log\'!$C$6:$C${5 + NL},\'Spend log\'!$D$6:$D${5 + NL},B{r},\'Spend log\'!$G$6:$G${5 + NL},{MK},\'Spend log\'!$F$6:$F${5 + NL},"<>In"))')
        b.cell(row=r, column=6, value=f'=IF(B{r}="","",N(D{r})-E{r})')
        b.cell(row=r, column=7, value=f'=IF(OR(B{r}="",N(D{r})=0),"",E{r}/D{r})')
        b.cell(row=r, column=8, value=f'=IF(G{r}="","",IF(G{r}>1.0001,"Over",IF(AND(C{r}<>"Wants",C{r}<>"Needs",G{r}>=0.98),"Paid",IF(G{r}>=0.85,"Nearly there","On track"))))')
    calc_style(b, 6, 5 + NC, [5, 6], GBP)
    calc_style(b, 6, 5 + NC, [7], PCT)
    calc_style(b, 6, 5 + NC, [8])
    dropdown(b, f'C6:C{5 + NC}', ['Bills', 'Needs', 'Wants', 'Savings', 'Debt'])
    highlight(b, f'H6:H{5 + NC}', '$H6="Over"', 'F5D0C5')
    highlight(b, f'H6:H{5 + NC}', '$H6="Nearly there"', CLAY_LIGHT)
    from openpyxl.formatting.rule import DataBarRule
    b.conditional_formatting.add(f'G6:G{5 + NC}', DataBarRule(start_type='num', start_value=0, end_type='num', end_value=1, color=CLAY))
    r = 6 + NC
    b.cell(row=r, column=2, value='Total').font = font(10, True)
    for col in (4, 5, 6):
        c = b.cell(row=r, column=col, value=f'=SUM({L(col)}6:{L(col)}{5 + NC})')
        c.number_format, c.font = GBP, font(10, True, CLAY_DEEP)
    note(b, r + 1, 2, '="Planned: £"&TEXT(D' + str(r) + ',"#,##0")&" of £"&TEXT(N(Settings!C6),"#,##0")&" take-home pay. "&IF(N(Settings!C6)-D' + str(r) + '<0,"That\'s more than you earn: trim a little.","£"&TEXT(N(Settings!C6)-D' + str(r) + ',"#,##0")&" not yet given a job.")', 9, SAGE_DEEP, True, merge_to=8)

    # SPEND LOG
    lg = sheet(wb, 'Spend log', widths=[3, 12, 12, 24, 26, 8, 10])
    title(lg, 'Spend log', 'Date, amount, category. Everything else is optional. Newest at the bottom.')
    header(lg, 5, ['Date', 'Amount £', 'Category', 'What (optional)', 'In / Out', 'Month'], col=2)
    input_rows(lg, 6, 5 + NL, 2, 7, {2: DATE, 3: GBP})
    for r in range(6, 6 + NL):
        lg.cell(row=r, column=7, value=f'=IF(B{r}="","",YEAR(B{r})*100+MONTH(B{r}))')
    calc_style(lg, 6, 5 + NL, [7], '0')
    dropdown_ref(lg, f'D6:D{5 + NL}', '=' + CAT_RNG)
    dropdown(lg, f'F6:F{5 + NL}', ['Out', 'In'])
    highlight(lg, f'B6:F{5 + NL}', '$F6="In"', SAGE_LIGHT)
    note(lg, 3, 5, 'Leave In / Out blank for spending. Choose In for money coming in (pay, refunds, gifts).', 8, merge_to=7)

    # BILLS
    bl = sheet(wb, 'Bills', widths=[3, 24, 12, 10, 20, 11, 13, 16])
    title(bl, 'Bills', 'Regular bills and when they leave your account. Tick "Paid this month" if it isn\'t automatic.')
    header(bl, 5, ['Bill', 'Amount £', 'Due day', 'Paid from', 'Automatic?', 'Paid this month', 'Status'], col=2)
    input_rows(bl, 6, 5 + NB, 2, 8, {3: GBP})
    for r in range(6, 6 + NB):
        days = f'(MIN(D{r},DAY(EOMONTH(TODAY(),0)))-DAY(TODAY()))'
        bl.cell(row=r, column=8, value=f'=IF(B{r}="","",IF(OR(G{r}="Yes",AND(F{r}="Yes",{days}<0)),"Done",IF({days}<0,"Overdue?",IF({days}=0,"Due today",IF({days}<=7,"Due in "&{days}&" days","Later this month")))))')
    calc_style(bl, 6, 5 + NB, [8])
    dropdown(bl, f'F6:G{5 + NB}', ['Yes', 'No'])
    highlight(bl, f'B6:H{5 + NB}', 'OR($H6="Due today",LEFT($H6,6)="Due in")', CLAY_LIGHT)
    highlight(bl, f'B6:H{5 + NB}', '$H6="Overdue?"', 'F5D0C5')
    highlight(bl, f'H6:H{5 + NB}', '$H6="Done"', SAGE_LIGHT)
    note(bl, 3, 6, 'Log bills in the Spend log when they go out. Untick "Paid this month" at the start of each month (automatic bills take care of themselves).', 8, merge_to=8)

    # SUBSCRIPTIONS
    sb = sheet(wb, 'Subscriptions', widths=[3, 24, 11, 13, 13, 13, 18, 24])
    title(sb, 'Subscriptions', 'Streaming, apps, boxes, memberships. Be honest about "still using?" and see what you could save.')
    header(sb, 5, ['Subscription', 'Cost £', 'How often', '£ per month', 'Renews on', 'Still using it?', 'Notes'], col=2)
    input_rows(sb, 6, 5 + NS, 2, 8, {3: GBP, 6: DATE})
    for r in range(6, 6 + NS):
        sb.cell(row=r, column=5, value=f'=IF(C{r}="","",C{r}*IF(D{r}="Weekly",52/12,IF(D{r}="Yearly",1/12,IF(D{r}="Quarterly",1/3,1))))')
    calc_style(sb, 6, 5 + NS, [5], GBP)
    dropdown(sb, f'D6:D{5 + NS}', ['Monthly', 'Weekly', 'Quarterly', 'Yearly'])
    dropdown(sb, f'G6:G{5 + NS}', ['Love it', 'Sometimes', 'Forgot I had it', 'Cancel'])
    highlight(sb, f'B6:H{5 + NS}', 'OR($G6="Forgot I had it",$G6="Cancel")', CLAY_LIGHT)
    highlight(sb, f'B6:H{5 + NS}', 'AND($F6<>"",$F6>=TODAY(),$F6-TODAY()<=14)', 'F5D0C5')

    # SAVINGS
    sv = sheet(wb, 'Savings', widths=[3, 24, 12, 13, 13, 12, 10, 14, 12])
    title(sv, 'Savings pots', 'Give every pound a job. Add money on the Savings log and pots fill up here.')
    header(sv, 5, ['Pot', 'Target £', 'By (date)', 'Saved £', 'Still to go £', 'Months left', '£ per month', 'Progress'], col=2)
    input_rows(sv, 6, 5 + NP, 2, 4, {3: GBP0, 4: DATE})
    for r in range(6, 6 + NP):
        sv.cell(row=r, column=5, value=f'=IF(B{r}="","",SUMIFS(\'Savings log\'!$D$6:$D${5 + NV},\'Savings log\'!$C$6:$C${5 + NV},B{r}))')
        sv.cell(row=r, column=6, value=f'=IF(B{r}="","",MAX(0,N(C{r})-E{r}))')
        sv.cell(row=r, column=7, value=f'=IF(OR(B{r}="",D{r}=""),"",MAX(1,DATEDIF(TODAY(),MAX(D{r},TODAY()),"m")))')
        sv.cell(row=r, column=8, value=f'=IF(OR(B{r}="",G{r}=""),"",F{r}/G{r})')
        sv.cell(row=r, column=9, value=f'=IF(OR(B{r}="",N(C{r})=0),"",MIN(1,E{r}/C{r}))')
    calc_style(sv, 6, 5 + NP, [5, 6, 8], GBP)
    calc_style(sv, 6, 5 + NP, [7], '0')
    calc_style(sv, 6, 5 + NP, [9], PCT)
    sv.conditional_formatting.add(f'I6:I{5 + NP}', DataBarRule(start_type='num', start_value=0, end_type='num', end_value=1, color=SAGE))
    vl = sheet(wb, 'Savings log', widths=[3, 12, 24, 12, 30])
    title(vl, 'Savings log', 'Money into (or out of) each pot. Use a minus for withdrawals.')
    header(vl, 5, ['Date', 'Pot', 'Amount £', 'Notes'], col=2)
    input_rows(vl, 6, 5 + NV, 2, 5, {2: DATE, 4: GBP})
    dropdown_ref(vl, f'C6:C{5 + NV}', f'=Savings!$B$6:$B${5 + NP}')

    # DEBTS
    db = sheet(wb, 'Debts', widths=[3, 22, 13, 10, 14, 10, 15, 12, 15])
    title(db, 'Debts (snowball)', 'Smallest balance first. Pay the minimum on everything and throw your extra at the focus debt.')
    header(db, 5, ['Debt', 'Balance £', 'APR %', 'Minimum £', 'Order', 'Pay this month £', 'Months', 'Clear by (rough)'], col=2)
    input_rows(db, 6, 5 + ND, 2, 5, {3: GBP, 4: '0.0%', 5: GBP})
    for r in range(6, 6 + ND):
        db.cell(row=r, column=6, value=f'=IF(OR(B{r}="",N(C{r})<=0),"",COUNTIFS($C$6:$C${5 + ND},"<"&C{r},$C$6:$C${5 + ND},">0")+COUNTIFS($C$6:C{r},C{r}))')
        db.cell(row=r, column=7, value=f'=IF(F{r}="","",N(E{r})+IF(F{r}=1,N(Settings!$C$9),0))')
        db.cell(row=r, column=8, value=f'=IF(OR(F{r}="",N(G{r})=0),"",IFERROR(ROUNDUP(NPER(N(D{r})/12,-G{r},C{r}),0),"Never at this rate"))')
        db.cell(row=r, column=9, value=f'=IF(H{r}="","",IF(ISTEXT(H{r}),"Pay more",EDATE(TODAY(),H{r})))')
    calc_style(db, 6, 5 + ND, [6], '0')
    calc_style(db, 6, 5 + ND, [7], GBP)
    calc_style(db, 6, 5 + ND, [8], '0')
    calc_style(db, 6, 5 + ND, [9], 'mmm yyyy')
    highlight(db, f'B6:I{5 + ND}', '$F6=1', CLAY_LIGHT, bold=True)
    note(db, 3, 7, 'Months are a rough guide using each debt\'s own payment. Once the focus debt is gone, roll its payment onto the next one.', 8, merge_to=9)

    # DASHBOARD
    d = sheet(wb, 'Dashboard', tab=CLAY, widths=[3, 22, 12, 3, 14, 14, 3, 16, 14, 3, 16, 14, 3])
    d.page_setup.fitToHeight = 1
    d.cell(row=1, column=2, value='LARKSPUR & CO.').font = font(8, True, CLAY)
    c = d.cell(row=2, column=2, value='=IF(Settings!C5="","Hello!","Hello, "&Settings!C5&"!")&" Here\'s "&TEXT(Settings!C7,"mmmm yyyy")&"."')
    c.font = font(20, True, SAGE_DEEP)
    d.row_dimensions[2].height = 32
    inn = f"SUMIFS('Spend log'!$C$6:$C${5 + NL},'Spend log'!$G$6:$G${5 + NL},{MK},'Spend log'!$F$6:$F${5 + NL},\"In\")"
    out = f"SUMIFS('Spend log'!$C$6:$C${5 + NL},'Spend log'!$G$6:$G${5 + NL},{MK},'Spend log'!$F$6:$F${5 + NL},\"<>In\")"
    unpaid = f'SUMIFS(Bills!$C$6:$C${5 + NB},Bills!$H$6:$H${5 + NB},"<>Done")'
    kpi(d, 4, 2, 'Safe to spend per day', '=IF(B8<=0,0,B8/MAX(1,DAY(EOMONTH(Settings!C7,0))-IF(AND(YEAR(TODAY())=YEAR(Settings!C7),MONTH(TODAY())=MONTH(Settings!C7)),DAY(TODAY())-1,0)))', fmt=GBP, color=SAGE_DEEP, bg=SAGE_LIGHT)
    kpi(d, 4, 5, 'Money in', f'=MAX({inn},N(Settings!C6))')
    kpi(d, 4, 8, 'Spent so far', f'={out}', color=SAGE_DEEP, bg=SAGE_LIGHT)
    kpi(d, 4, 11, 'Bills still to go', f'={unpaid}')
    kpi(d, 7, 2, 'Left after bills', '=E5-H5-K5')
    kpi(d, 7, 5, 'Subscriptions / month', f'=SUM(Subscriptions!E6:E{5 + NS})', fmt=GBP, color=SAGE_DEEP, bg=SAGE_LIGHT)
    kpi(d, 7, 8, 'Could save (forgotten subs)', f'=SUMIFS(Subscriptions!E6:E{5 + NS},Subscriptions!G6:G{5 + NS},"Forgot I had it")+SUMIFS(Subscriptions!E6:E{5 + NS},Subscriptions!G6:G{5 + NS},"Cancel")', fmt=GBP)
    kpi(d, 7, 11, 'Total saved', f'=SUM(Savings!E6:E{5 + NP})', color=SAGE_DEEP, bg=SAGE_LIGHT)
    highlight(d, 'B8', 'B8<0', 'F5D0C5')
    section_label(d, 10, 2, 'Your tiny money task for today', merge_to=12)
    c = d.cell(row=11, column=2, value=f'=INDEX(Settings!$E$14:$E${13 + len(TASKS)},MOD(DAY(TODAY())-1,{len(TASKS)})+1)')
    c.font = font(13, True, CLAY_DEEP)
    d.merge_cells('B11:L11')
    d.row_dimensions[11].height = 26
    section_label(d, 13, 2, 'Budget this month', merge_to=6)
    for j, h in enumerate(['Category', 'Budget £', '', 'Spent £', 'Status']):
        if h:
            d.cell(row=14, column=2 + j, value=h).font = font(9, True, INK_SOFT)
    for i in range(len(CATS)):
        r = 15 + i
        d.cell(row=r, column=2, value=f'=IF(Budget!B{6 + i}="","",Budget!B{6 + i})').font = font(10)
        c = d.cell(row=r, column=3, value=f'=IF(B{r}="","",N(Budget!D{6 + i}))')
        c.number_format, c.font = GBP0, font(10)
        c = d.cell(row=r, column=5, value=f'=IF(B{r}="","",Budget!E{6 + i})')
        c.number_format, c.font = GBP0, font(10, False, SAGE_DEEP)
        d.cell(row=r, column=6, value=f'=IF(B{r}="","",Budget!H{6 + i})').font = font(9, True, INK_SOFT)
        for col in range(2, 7):
            d.cell(row=r, column=col).border = BOTTOM
    highlight(d, f'B15:F{14 + len(CATS)}', '$F15="Over"', 'F5D0C5')
    highlight(d, f'B15:F{14 + len(CATS)}', '$F15="Nearly there"', CLAY_LIGHT)
    section_label(d, 13, 8, 'Coming up', merge_to=12)
    ups = [('Bills due in the next 7 days', f'=COUNTIF(Bills!H6:H{5 + NB},"Due in*")+COUNTIF(Bills!H6:H{5 + NB},"Due today")', '0'),
           ('Overdue? (check these)', f'=COUNTIF(Bills!H6:H{5 + NB},"Overdue?")', '0'),
           ('Subscriptions renewing in 14 days', f'=COUNTIFS(Subscriptions!F6:F{5 + NS},">="&TODAY(),Subscriptions!F6:F{5 + NS},"<="&TODAY()+14)', '0'),
           ('Categories over budget', f'=COUNTIF(Budget!H6:H{5 + NC},"Over")', '0'),
           ('Total debt', f'=SUM(Debts!C6:C{5 + ND})', GBP0),
           ('Focus debt (snowball)', f'=IFERROR(INDEX(Debts!B6:B{5 + ND},MATCH(1,Debts!F6:F{5 + ND},0)),"No debts listed")', None),
           ('Rough debt-free date', f'=IF(COUNT(Debts!I6:I{5 + ND})=0,"–",MAX(Debts!I6:I{5 + ND}))', 'mmmm yyyy')]
    for i, (k, f, fmt) in enumerate(ups):
        r = 14 + i
        d.cell(row=r, column=8, value=k).font = font(10)
        c = d.cell(row=r, column=11, value=f)
        c.font = font(10, True, SAGE_DEEP)
        c.alignment = Alignment(horizontal='right')
        if fmt:
            c.number_format = fmt
        d.merge_cells(start_row=r, start_column=11, end_row=r, end_column=12)
        for col in range(8, 13):
            d.cell(row=r, column=col).border = BOTTOM
    ch = BarChart()
    ch.type, ch.style, ch.grouping = 'bar', 10, 'clustered'
    ch.title = 'Budget vs spent'
    ch.add_data(Reference(d, min_col=3, min_row=14, max_row=14 + len(CATS)), titles_from_data=True)
    ch.add_data(Reference(d, min_col=5, min_row=14, max_row=14 + len(CATS)), titles_from_data=True)
    ch.set_categories(Reference(d, min_col=2, min_row=15, max_row=14 + len(CATS)))
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
    ch.height, ch.width = 10, 13
    d.add_chart(ch, 'H22')
    # tasks list stored on Settings
    section_label(s, 13, 5, 'Tiny tasks (edit these)')
    for i, t in enumerate(TASKS):
        c = s.cell(row=14 + i, column=5, value=t)
        c.font, c.fill, c.border = font(9), fill(CREAM), BOTTOM

    if example:
        random.seed(9)
        today = dt.date.today()
        m0 = dt.date(today.year, today.month, 1)
        r = 6
        lg.cell(row=r, column=2, value=m0)
        lg.cell(row=r, column=3, value=2450)
        lg.cell(row=r, column=4, value='Other')
        lg.cell(row=r, column=5, value='Pay')
        lg.cell(row=r, column=6, value='In')
        r += 1
        fixed = [('Rent / mortgage', 850, 'Rent'), ('Council tax', 160, 'Council tax'), ('Energy', 138, 'Octopus'), ('Phone & internet', 45, 'Phone + broadband'), ('Debt payments', 200, 'Credit card + loan'), ('Savings', 150, 'Pots')]
        for cat, amt, what in fixed:
            for col, v in zip([2, 3, 4, 5], [m0 + dt.timedelta(days=random.randint(0, 4)), amt, cat, what]):
                lg.cell(row=r, column=col, value=v)
            r += 1
        var = [('Food shop', (12, 45)), ('Transport', (3, 25)), ('Eating out & takeaways', (8, 30)), ('Coffee & snacks', (2, 6)), ('Fun & hobbies', (5, 25)), ('Impulse buys', (6, 40)), ('Pets', (5, 18)), ('Gifts', (10, 25)), ('Clothes', (12, 35))]
        for k in range(min(30, today.day + 4)):
            cat, (lo, hi) = random.choice(var)
            day = m0 + dt.timedelta(days=random.randint(0, max(0, today.day - 1)))
            for col, v in zip([2, 3, 4], [day, round(random.uniform(lo, hi), 2), cat]):
                lg.cell(row=r, column=col, value=v)
            r += 1
        bills = [('Rent', 850, 1, 'Current account', 'Yes'), ('Council tax', 160, 1, 'Current account', 'Yes'), ('Octopus energy', 138, 3, 'Current account', 'Yes'),
                 ('Phone + broadband', 45, 15, 'Current account', 'Yes'), ('Car insurance', 42, 22, 'Current account', 'Yes'), ('Window cleaner', 15, 28, 'Cash', 'No')]
        for i, row in enumerate(bills):
            for j, v in enumerate(row):
                bl.cell(row=6 + i, column=2 + j, value=v)
        subs = [('Netflix', 5.99, 'Monthly', None, 'Love it'), ('Spotify', 11.99, 'Monthly', None, 'Love it'), ('Gym', 29.99, 'Monthly', None, 'Sometimes'),
                ('Meditation app', 49.99, 'Yearly', today + dt.timedelta(days=9), 'Forgot I had it'), ('Recipe box', 34.00, 'Monthly', None, 'Cancel'), ('Cloud storage', 2.99, 'Monthly', None, 'Love it')]
        for i, row in enumerate(subs):
            for col, v in zip([2, 3, 4, 6, 7], row):
                sb.cell(row=6 + i, column=col, value=v)
        pots = [('Emergency fund', 1500, dt.date(today.year + 1, 6, 1)), ('Christmas', 400, dt.date(today.year, 12, 1) if today.month < 12 else dt.date(today.year + 1, 12, 1)), ('Holiday', 900, dt.date(today.year + 1, 7, 1)), ('Car repairs', 300, None)]
        for i, row in enumerate(pots):
            for j, v in enumerate(row):
                sv.cell(row=6 + i, column=2 + j, value=v)
        for i, (pot, amt) in enumerate([('Emergency fund', 300), ('Emergency fund', 150), ('Christmas', 120), ('Holiday', 200), ('Christmas', 60), ('Car repairs', 80), ('Emergency fund', 150)]):
            for col, v in zip([2, 3, 4], [m0 - dt.timedelta(days=30 * (6 - i)), pot, amt]):
                vl.cell(row=6 + i, column=col, value=v)
        debts = [('Credit card', 1240, 0.229, 40), ('Overdraft', 310, 0.39, 25), ('Car loan', 4300, 0.079, 135)]
        for i, row in enumerate(debts):
            for j, v in enumerate(row):
                db.cell(row=6 + i, column=2 + j, value=v)
    wb.active = wb.sheetnames.index('Dashboard') if example else 0
    return wb


if __name__ == '__main__':
    out = sys.argv[1]
    os.makedirs(out, exist_ok=True)
    build(False).save(os.path.join(out, 'ADHD Money Dashboard.xlsx'))
    build(True).save(os.path.join(out, 'ADHD Money Dashboard - EXAMPLE.xlsx'))
    print('ok')
