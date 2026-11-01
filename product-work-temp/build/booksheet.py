"""UK Sole Trader Bookkeeping workbook. Usage: python3 booksheet.py outdir"""
import sys, os, datetime as dt, random
from openpyxl.chart import BarChart, Reference
from openpyxl.styles import Alignment
from xl import *

NI, NE, NM = 500, 500, 300
EXP = ['Cost of goods for resale', 'Wages and staff costs', 'Car, van and travel', 'Rent, rates, power and insurance', 'Repairs and maintenance',
       'Phone, stationery and office', 'Advertising and marketing', 'Interest on business loans', 'Bank and card charges', 'Bad debts written off',
       'Accountancy and legal fees', 'Other business expenses', 'Subcontractors (CIS)', 'Business entertainment (not allowable)', 'Equipment (capital allowances)', 'Personal / not business (not allowable)']
INC = ['Sales', 'Services / fees', 'Commission', 'Tips', 'Grants', 'Other income']
ACC = ['Business account', 'Personal account', 'Cash', 'PayPal', 'Etsy / Stripe', 'Card']
MONTHS = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
EXP_RNG = f'Settings!$B$24:$B${23 + len(EXP)}'
INC_RNG = f'Settings!$E$24:$E${23 + len(INC)}'
ACC_RNG = f'Settings!$H$24:$H${23 + len(ACC)}'
START = 'Settings!$C$6'
MIDX = lambda c: f'IF({c}="","",IF({c}<{START},0,DATEDIF({START},{c},"m")+1))'


def build(example=False):
    wb = new_wb()
    start_here(wb, 'UK Sole Trader Bookkeeping',
               'Simple, calm bookkeeping for UK sole traders. Log what comes in and goes out, and the workbook sorts it into Self Assessment (SA103) categories, '
               'works out your profit, tracks mileage and working from home, and estimates the tax to put aside.',
               [('Settings', 'Add your business name and the tax year start (6 April). Choose how much of your profit to set aside for tax.'),
                ('Income', 'One line for each payment you receive. The month fills itself in.'),
                ('Expenses', 'One line for each business cost. If something is part personal (like a phone), set the business use %.'),
                ('Mileage', 'Log business journeys. It applies HMRC\'s simplified mileage rates, including the drop after 10,000 miles.'),
                ('Use of home', 'Enter hours worked at home each month to use HMRC\'s flat rate.'),
                ('Summary & Tax', 'Monthly and quarterly totals (handy for Making Tax Digital), totals by SA103 category, and a tax estimate.'),
                ('Dashboard', 'Your year at a glance.')],
               extra=[('Making Tax Digital (MTD)', ['From April 2026, sole traders and landlords with qualifying income over £50,000 must keep digital records and send quarterly updates using MTD-compatible software. '
                                                    'The threshold drops to £30,000 from April 2027 and is planned to drop to £20,000 from April 2028. This spreadsheet helps you keep good records, '
                                                    'but it is not MTD software: if MTD applies to you, you\'ll need compatible software or bridging software to send updates to HMRC.']),
                      ('Please note', ['Tax estimates are a guide only and use the rates on the Settings tab (England, Wales and Northern Ireland rates for 2026/27). '
                                       'Scottish taxpayers should replace the income tax bands with the Scottish rates from gov.scot. It doesn\'t include student loans, the personal allowance taper over £100,000, '
                                       'Payments on Account or other income such as savings and dividends. Check GOV.UK or speak to an accountant if you\'re unsure.'])])

    # SETTINGS
    s = sheet(wb, 'Settings', tab=CLAY_DEEP, widths=[3, 34, 16, 3, 22, 3, 3, 20])
    title(s, 'Settings', 'Fill in the cream cells. Rates are editable: check GOV.UK each new tax year.')
    rows = [('Business name', 'Bramble & Thread' if example else None, None), ('Tax year starts', dt.date(2026, 4, 6), DATE),
            ('Set aside for tax (% of profit)', 0.25, PCT), ('Other taxable income this year (e.g. a job) £', 0 if not example else 0, GBP0)]
    for i, (k, v, f) in enumerate(rows):
        r = 5 + i
        s.cell(row=r, column=2, value=k).font = font(10, True)
        c = s.cell(row=r, column=3, value=v)
        c.fill, c.border, c.font = fill(CREAM), BOX, font(10, True, SAGE_DEEP)
        if f:
            c.number_format = f
    s.cell(row=5 + len(rows), column=2, value='Tax year ends').font = font(10)
    c = s.cell(row=5 + len(rows), column=3, value='=DATE(YEAR(C6)+1,MONTH(C6),DAY(C6)-1)')
    c.number_format, c.font, c.fill = DATE, font(10, False, SAGE_DEEP), fill(SAGE_LIGHT)
    section_label(s, 11, 2, 'Rates (2026/27, England, Wales & NI)', merge_to=3)
    rates = [('Personal allowance £', 12570, GBP0), ('Basic rate limit £', 50270, GBP0), ('Higher rate limit £', 125140, GBP0), ('Basic rate', 0.20, PCT), ('Higher rate', 0.40, PCT),
             ('Additional rate', 0.45, PCT), ('Class 4 NI main rate', 0.06, PCT), ('Class 4 NI upper rate', 0.02, PCT), ('Mileage: car/van first 10,000 miles £', 0.45, GBP),
             ('Mileage: car/van after 10,000 miles £', 0.25, GBP)]
    for i, (k, v, f) in enumerate(rates):
        r = 12 + i
        s.cell(row=r, column=2, value=k).font = font(10)
        c = s.cell(row=r, column=3, value=v)
        c.fill, c.border, c.font, c.number_format = fill(CREAM), BOTTOM, font(10), f
    # rows 12..21 ; motorcycle/bicycle in row 22
    s.cell(row=22, column=2, value='Mileage: motorcycle £ / bicycle £').font = font(10)
    for col, v in ((3, 0.24), (5, 0.20)):
        c = s.cell(row=22, column=col, value=v)
        c.fill, c.border, c.font, c.number_format = fill(CREAM), BOTTOM, font(10), GBP
    section_label(s, 23, 2, 'Expense categories (SA103)', merge_to=3)
    for i, x in enumerate(EXP):
        c = s.cell(row=24 + i, column=2, value=x)
        c.font, c.border = font(10), BOTTOM
    section_label(s, 23, 5, 'Income categories')
    for i, x in enumerate(INC):
        c = s.cell(row=24 + i, column=5, value=x)
        c.font, c.border, c.fill = font(10), BOTTOM, fill(CREAM)
    section_label(s, 23, 8, 'Accounts')
    for i, x in enumerate(ACC):
        c = s.cell(row=24 + i, column=8, value=x)
        c.font, c.border, c.fill = font(10), BOTTOM, fill(CREAM)

    # INCOME
    inc = sheet(wb, 'Income', widths=[3, 12, 22, 30, 18, 13, 18, 14, 8, 24])
    title(inc, 'Income', 'Every payment you receive for your business.')
    header(inc, 5, ['Date', 'Customer / source', 'Description', 'Category', 'Amount £', 'Paid into', 'Invoice / ref', 'Month', 'Notes'], col=2)
    input_rows(inc, 6, 5 + NI, 2, 10, {2: DATE, 6: GBP})
    for r in range(6, 6 + NI):
        inc.cell(row=r, column=9, value='=' + MIDX(f'B{r}'))
    calc_style(inc, 6, 5 + NI, [9], '0')
    dropdown_ref(inc, f'E6:E{5 + NI}', '=' + INC_RNG)
    dropdown_ref(inc, f'G6:G{5 + NI}', '=' + ACC_RNG)
    highlight(inc, f'B6:J{5 + NI}', 'AND($B6<>"",OR($I6<1,$I6>12))', 'F5D0C5')
    inc.cell(row=3, column=9, value='Total').font = font(9, True, INK_SOFT)
    c = inc.cell(row=3, column=10, value=f'=SUMIFS(F6:F{5 + NI},I6:I{5 + NI},">=1",I6:I{5 + NI},"<=12")')
    c.number_format, c.font, c.fill = GBP, font(11, True, CLAY_DEEP), fill(CLAY_LIGHT)

    # EXPENSES
    ex = sheet(wb, 'Expenses', widths=[3, 12, 22, 28, 30, 12, 10, 13, 18, 10, 8, 22])
    title(ex, 'Expenses', 'Business costs. Part-personal costs: set the business use %. Items marked "not allowable" are recorded but not deducted.')
    header(ex, 5, ['Date', 'Supplier', 'Description', 'Category', 'Amount £', 'Business %', 'Allowable £', 'Paid from', 'Receipt?', 'Month', 'Notes'], col=2)
    input_rows(ex, 6, 5 + NE, 2, 12, {2: DATE, 6: GBP, 7: PCT})
    for r in range(6, 6 + NE):
        ex.cell(row=r, column=8, value=f'=IF(F{r}="","",IF(ISNUMBER(SEARCH("not allowable",E{r})),0,F{r}*IF(G{r}="",1,G{r})))')
        ex.cell(row=r, column=11, value='=' + MIDX(f'B{r}'))
    calc_style(ex, 6, 5 + NE, [8], GBP)
    calc_style(ex, 6, 5 + NE, [11], '0')
    dropdown_ref(ex, f'E6:E{5 + NE}', '=' + EXP_RNG)
    dropdown_ref(ex, f'I6:I{5 + NE}', '=' + ACC_RNG)
    dropdown(ex, f'J6:J{5 + NE}', ['Yes', 'No'])
    highlight(ex, f'B6:L{5 + NE}', 'AND($B6<>"",OR($K6<1,$K6>12))', 'F5D0C5')
    highlight(ex, f'J6:J{5 + NE}', '$J6="No"', CLAY_LIGHT)
    ex.cell(row=3, column=10, value='Allowable').font = font(9, True, INK_SOFT)
    c = ex.cell(row=3, column=11, value=f'=SUMIFS(H6:H{5 + NE},K6:K{5 + NE},">=1",K6:K{5 + NE},"<=12")')
    c.number_format, c.font, c.fill = GBP, font(11, True, CLAY_DEEP), fill(CLAY_LIGHT)
    ex.column_dimensions['K'].width = 12

    # MILEAGE
    m = sheet(wb, 'Mileage', widths=[3, 12, 18, 18, 28, 9, 14, 13, 12, 8])
    title(m, 'Mileage', 'Business journeys only (not your normal commute to a permanent workplace). If you claim mileage, don\'t also claim fuel or running costs for that vehicle.')
    header(m, 5, ['Date', 'From', 'To', 'Purpose', 'Miles', 'Vehicle', 'Car miles so far', 'Claim £', 'Month'], col=2)
    input_rows(m, 6, 5 + NM, 2, 10, {2: DATE, 6: '0.0'})
    for r in range(6, 6 + NM):
        m.cell(row=r, column=8, value=f'=IF(F{r}="","",SUMIFS($F$6:F{r},$G$6:G{r},"Car or van",$J$6:J{r},">=1",$J$6:J{r},"<=12"))')
        first = f'MAX(0,MIN(F{r},10000-(H{r}-F{r})))'
        m.cell(row=r, column=9, value=f'=IF(F{r}="","",IF(G{r}="Motorcycle",F{r}*Settings!$C$22,IF(G{r}="Bicycle",F{r}*Settings!$E$22,{first}*Settings!$C$20+(F{r}-{first})*Settings!$C$21)))')
        m.cell(row=r, column=10, value='=' + MIDX(f'B{r}'))
    calc_style(m, 6, 5 + NM, [8], '#,##0')
    calc_style(m, 6, 5 + NM, [9], GBP)
    calc_style(m, 6, 5 + NM, [10], '0')
    dropdown(m, f'G6:G{5 + NM}', ['Car or van', 'Motorcycle', 'Bicycle'])
    m.cell(row=3, column=9, value='Claim').font = font(9, True, INK_SOFT)
    c = m.cell(row=3, column=10, value=f'=SUMIFS(I6:I{5 + NM},J6:J{5 + NM},">=1",J6:J{5 + NM},"<=12")')
    c.number_format, c.font, c.fill = GBP, font(11, True, CLAY_DEEP), fill(CLAY_LIGHT)
    m.column_dimensions['J'].width = 12
    note(m, 4, 2, 'Leave Vehicle blank and it counts as a car or van.', 8, merge_to=10)
    for r in range(6, 6 + NM):
        m.cell(row=r, column=8).value = f'=IF(F{r}="","",SUMIFS($F$6:F{r},$G$6:G{r},"<>Motorcycle",$G$6:G{r},"<>Bicycle",$J$6:J{r},">=1",$J$6:J{r},"<=12"))'

    # USE OF HOME
    h = sheet(wb, 'Use of home', widths=[3, 14, 20, 16, 40])
    title(h, 'Use of home', 'HMRC\'s simplified flat rate for working from home: 25 hours or more a month.')
    header(h, 5, ['Month', 'Hours worked at home', 'Flat rate £', 'Notes'], col=2)
    input_rows(h, 6, 17, 2, 5)
    for i, mn in enumerate(MONTHS):
        r = 6 + i
        h.cell(row=r, column=2, value=mn)
        h.cell(row=r, column=4, value=f'=IF(C{r}="",0,IF(C{r}>=101,26,IF(C{r}>=51,18,IF(C{r}>=25,10,0))))')
    calc_style(h, 6, 17, [4], GBP)
    h.cell(row=18, column=2, value='Total').font = font(10, True)
    c = h.cell(row=18, column=4, value='=SUM(D6:D17)')
    c.number_format, c.font = GBP, font(10, True, CLAY_DEEP)
    note(h, 20, 2, 'Flat rates: 25–50 hours £10, 51–100 hours £18, 101+ hours £26 a month. You can claim actual costs instead if they\'re higher, but not both. Check GOV.UK for current rates.', 9, merge_to=5, height=30)

    # SUMMARY
    sm = sheet(wb, 'Summary & Tax', tab=CLAY, widths=[3, 34, 14, 14, 14, 14, 14, 3, 32, 14])
    title(sm, 'Summary & tax estimate', 'Months run from the 6th to the 5th, matching the tax year.')
    header(sm, 5, ['Month', 'Income £', 'Expenses £', 'Mileage £', 'Use of home £', 'Profit £'], col=2)
    for i, mn in enumerate(MONTHS):
        r = 6 + i
        sm.cell(row=r, column=2, value=f'=TEXT(DATE(YEAR({START}),MONTH({START})+{i},DAY({START})),"d mmm")&" – "&TEXT(DATE(YEAR({START}),MONTH({START})+{i + 1},DAY({START})-1),"d mmm")')
        sm.cell(row=r, column=3, value=f'=SUMIFS(Income!$F$6:$F${5 + NI},Income!$I$6:$I${5 + NI},{i + 1})')
        sm.cell(row=r, column=4, value=f'=SUMIFS(Expenses!$H$6:$H${5 + NE},Expenses!$K$6:$K${5 + NE},{i + 1})')
        sm.cell(row=r, column=5, value=f'=SUMIFS(Mileage!$I$6:$I${5 + NM},Mileage!$J$6:$J${5 + NM},{i + 1})')
        sm.cell(row=r, column=6, value=f"='Use of home'!D{6 + i}")
        sm.cell(row=r, column=7, value=f'=C{r}-D{r}-E{r}-F{r}')
        for col in range(2, 8):
            cc = sm.cell(row=r, column=col)
            cc.border, cc.font = BOTTOM, font(10)
            if col > 2:
                cc.number_format = GBP
        if i % 3 == 2:
            for col in range(2, 8):
                sm.cell(row=r, column=col).border = Border(bottom=Side(style='thin', color=CLAY))
    r = 18
    sm.cell(row=r, column=2, value='Year total').font = font(10, True)
    for col in range(3, 8):
        c = sm.cell(row=r, column=col, value=f'=SUM({L(col)}6:{L(col)}17)')
        c.number_format, c.font, c.fill = GBP, font(10, True, CLAY_DEEP), fill(CLAY_LIGHT)
    section_label(sm, 20, 2, 'Quarters (standard MTD periods)', merge_to=7)
    for q in range(4):
        r = 21 + q
        sm.cell(row=r, column=2, value=f'="Q{q + 1}: "&TEXT(DATE(YEAR({START}),MONTH({START})+{3 * q},DAY({START})),"d mmm")&" – "&TEXT(DATE(YEAR({START}),MONTH({START})+{3 * q + 3},DAY({START})-1),"d mmm yyyy")').font = font(10)
        for col in range(3, 8):
            c = sm.cell(row=r, column=col, value=f'=SUM({L(col)}{6 + 3 * q}:{L(col)}{8 + 3 * q})')
            c.number_format, c.font, c.border = GBP, font(10), BOTTOM
    # by category
    section_label(sm, 27, 2, 'Expenses by SA103 category', merge_to=3)
    for i, x in enumerate(EXP):
        r = 28 + i
        sm.cell(row=r, column=2, value=f'=Settings!B{24 + i}').font = font(10)
        c = sm.cell(row=r, column=3, value=f'=SUMIFS(Expenses!$H$6:$H${5 + NE},Expenses!$E$6:$E${5 + NE},B{r},Expenses!$K$6:$K${5 + NE},">=1",Expenses!$K$6:$K${5 + NE},"<=12")')
        c.number_format, c.font, c.border = GBP, font(10), BOTTOM
        sm.cell(row=r, column=2).border = BOTTOM
    r = 28 + len(EXP)
    for k, f in [('Simplified expenses: mileage', '=E18'), ('Simplified expenses: use of home', '=F18')]:
        sm.cell(row=r, column=2, value=k).font = font(10)
        c = sm.cell(row=r, column=3, value=f)
        c.number_format, c.font, c.border = GBP, font(10), BOTTOM
        r += 1
    note(sm, r, 2, 'Equipment is usually claimed through capital allowances (the Annual Investment Allowance covers most small businesses). Mileage normally goes with car, van and travel, and use of home with premises costs. Check the SA103 notes on GOV.UK.', 8, merge_to=7, height=36)
    # tax estimate
    section_label(sm, 5, 9, 'Tax estimate', merge_to=10)
    T = [('Turnover (income)', '=C18', GBP), ('Allowable expenses (incl. simplified)', '=D18+E18+F18', GBP), ('Profit using expenses', '=MAX(0,J6-J7)', GBP),
         ('Profit using £1,000 trading allowance', '=MAX(0,J6-1000)', GBP), ('Better option', '=IF(J6=0,"–",IF(J9<J8,"Trading allowance","Actual expenses"))', None),
         ('Taxable profit', '=MIN(J8,J9)', GBP), ('Income tax on profit', '', GBP), ('Class 4 National Insurance', '', GBP), ('Estimated tax + NI', '=J12+J13', GBP),
         ('Set-aside pot (your %)', '=J11*Settings!C7', GBP), ('Put aside per month', '=J15/12', GBP)]
    pa, bl, hl, br, hr, ar = 'Settings!$C$12', 'Settings!$C$13', 'Settings!$C$14', 'Settings!$C$15', 'Settings!$C$16', 'Settings!$C$17'
    tax = lambda inc: (f'(MIN(MAX(0,{inc}-{pa}),{bl}-{pa})*{br}+MIN(MAX(0,{inc}-{bl}),{hl}-{bl})*{hr}+MAX(0,{inc}-{hl})*{ar})')
    other = 'N(Settings!$C$8)'
    for i, (k, f, fmt) in enumerate(T):
        r = 6 + i
        sm.cell(row=r, column=9, value=k).font = font(10, k.startswith('Estimated'))
        if k == 'Income tax on profit':
            f = '=' + tax(f'(J11+{other})') + '-' + tax(other)
        if k == 'Class 4 National Insurance':
            f = f'=MIN(MAX(0,J11-{pa}),{bl}-{pa})*Settings!$C$18+MAX(0,J11-{bl})*Settings!$C$19'
        c = sm.cell(row=r, column=10, value=f)
        c.font = font(10, k.startswith('Estimated') or k.startswith('Set'), CLAY_DEEP if k.startswith(('Estimated', 'Set')) else SAGE_DEEP)
        c.fill = fill(CLAY_LIGHT if k.startswith(('Estimated', 'Set')) else SAGE_LIGHT)
        if fmt:
            c.number_format = fmt
        sm.cell(row=r, column=9).border = BOTTOM
    note(sm, 18, 9, 'A rough guide using the Settings rates. It doesn\'t include student loans, Payments on Account, the allowance taper over £100,000 or Scottish rates unless you change the Settings.', 8, merge_to=10, height=48)

    # DASHBOARD
    d = sheet(wb, 'Dashboard', tab=CLAY, widths=[3, 15, 15, 3, 15, 15, 3, 15, 15, 3, 15, 15, 3])
    d.page_setup.fitToHeight = 1
    d.cell(row=1, column=2, value='LARKSPUR & CO.').font = font(8, True, CLAY)
    c = d.cell(row=2, column=2, value='=IF(Settings!C5="","My business",Settings!C5)')
    c.font = font(20, True, SAGE_DEEP)
    d.row_dimensions[2].height = 32
    d.cell(row=3, column=2, value='="Tax year "&TEXT(Settings!C6,"d mmm yyyy")&" to "&TEXT(Settings!C9,"d mmm yyyy")').font = font(10, False, INK_SOFT)
    kpi(d, 5, 2, 'Income', "='Summary & Tax'!C18", color=SAGE_DEEP, bg=SAGE_LIGHT)
    kpi(d, 5, 5, 'Expenses (allowable)', "='Summary & Tax'!J7")
    kpi(d, 5, 8, 'Profit', "='Summary & Tax'!J11", color=SAGE_DEEP, bg=SAGE_LIGHT)
    kpi(d, 5, 11, 'Estimated tax + NI', "='Summary & Tax'!J14")
    kpi(d, 8, 2, 'Set-aside pot', "='Summary & Tax'!J15")
    kpi(d, 8, 5, 'Business miles', '=SUMIFS(Mileage!F6:F305,Mileage!J6:J305,">=1",Mileage!J6:J305,"<=12")', fmt='#,##0', color=SAGE_DEEP, bg=SAGE_LIGHT)
    kpi(d, 8, 8, 'Receipts missing', '=COUNTIF(Expenses!J6:J505,"No")', fmt='0')
    kpi(d, 8, 11, 'Profit margin', "=IF('Summary & Tax'!C18=0,0,'Summary & Tax'!J11/'Summary & Tax'!C18)", fmt=PCT, color=SAGE_DEEP, bg=SAGE_LIGHT)
    section_label(d, 11, 2, 'Making Tax Digital check', merge_to=12)
    d.cell(row=12, column=2, value='Your income this tax year').font = font(10)
    c = d.cell(row=12, column=5, value="='Summary & Tax'!C18")
    c.number_format, c.font = GBP0, font(10, True, SAGE_DEEP)
    d.cell(row=13, column=2, value='MTD for Income Tax applies from').font = font(10)
    c = d.cell(row=13, column=5, value='=IF(E12>50000,"April 2026 (over £50k)",IF(E12>30000,"April 2027 (over £30k)",IF(E12>20000,"April 2028 (planned, over £20k)","Not yet, at this level")))')
    c.font = font(10, True, CLAY_DEEP)
    d.merge_cells('E13:L13')
    note(d, 14, 2, 'MTD is based on qualifying income (self-employment plus property, before expenses) from an earlier tax year. Check GOV.UK to see when it applies to you. VAT registration threshold: £90,000 of taxable turnover in any rolling 12 months.', 8, merge_to=12, height=26)
    # monthly chart helper is the Summary table
    ch = BarChart()
    ch.type, ch.style = 'col', 10
    ch.title = 'Income and expenses by month'
    ch.add_data(Reference(wb['Summary & Tax'], min_col=3, min_row=5, max_row=17), titles_from_data=True)
    ch.add_data(Reference(wb['Summary & Tax'], min_col=4, min_row=5, max_row=17), titles_from_data=True)
    for i, mn in enumerate(MONTHS):
        d.cell(row=40 + i, column=20, value=mn).font = font(8, False, 'FFFFFF')
    ch.set_categories(Reference(d, min_col=20, min_row=40, max_row=51))
    ch.series[0].graphicalProperties.solidFill = SAGE
    ch.series[0].graphicalProperties.line.solidFill = SAGE
    ch.series[1].graphicalProperties.solidFill = CLAY
    ch.series[1].graphicalProperties.line.solidFill = CLAY
    ch.y_axis.numFmt = '"£"#,##0'
    ch.y_axis.majorGridlines = None
    ch.x_axis.delete = False
    ch.y_axis.delete = False
    ch.legend.position = 'b'
    ch.height, ch.width = 8, 26
    d.add_chart(ch, 'B16')

    if example:
        random.seed(11)
        r = 6
        start = dt.date(2026, 4, 6)
        for mi in range(7):
            for _ in range(random.randint(5, 8)):
                day = start + dt.timedelta(days=mi * 30 + random.randint(0, 28))
                amt = random.choice([18, 24, 32, 45, 60, 85, 120, 150])
                for col, v in zip([2, 3, 4, 5, 6, 7], [day, random.choice(['Etsy payout', 'Craft fair', 'Website order', 'Workshop booking', 'Commission']), random.choice(['Embroidery kits', 'Custom hoop', 'Workshop ticket', 'Wedding commission']), random.choice(['Sales', 'Sales', 'Services / fees']), amt * random.randint(4, 9), random.choice(['Business account', 'Etsy / Stripe', 'Cash'])]):
                    inc.cell(row=r, column=col, value=v)
                r += 1
        r = 6
        for mi in range(7):
            for desc, cat, amt, pct in random.sample([('Fabric and thread', 'Cost of goods for resale', 85, None), ('Postage', 'Other business expenses', 32, None), ('Phone bill', 'Phone, stationery and office', 28, 0.5),
                                                        ('Instagram ads', 'Advertising and marketing', 40, None), ('Bank fees', 'Bank and card charges', 6, None), ('Packaging', 'Cost of goods for resale', 24, None),
                                                        ('Craft fair pitch', 'Rent, rates, power and insurance', 45, None), ('Coffee with client', 'Business entertainment (not allowable)', 9, None)], 5):
                day = start + dt.timedelta(days=mi * 30 + random.randint(0, 28))
                for col, v in zip([2, 3, 4, 5, 6, 7, 10], [day, random.choice(['Supplier', 'Royal Mail', 'EE', 'Meta', 'Bank']), desc, cat, amt + random.randint(-5, 15), pct, random.choice(['Yes'] * 5 + ['No'])]):
                    ex.cell(row=r, column=col, value=v)
                r += 1
        trips = [('Home', 'Craft fair, Edinburgh', 'Selling', 94), ('Home', 'Wholesale supplier', 'Stock', 22), ('Home', 'Post office', 'Postage', 4), ('Home', 'Client, Stirling', 'Commission', 58)]
        r = 6
        for mi in range(7):
            for a_, b_, p_, mi_ in trips:
                day = start + dt.timedelta(days=mi * 30 + random.randint(0, 28))
                for col, v in zip([2, 3, 4, 5, 6, 7], [day, a_, b_, p_, mi_, 'Car or van']):
                    m.cell(row=r, column=col, value=v)
                r += 1
        for i in range(7):
            h.cell(row=6 + i, column=3, value=random.choice([30, 60, 80, 110]))
    wb.active = wb.sheetnames.index('Dashboard') if example else 0
    return wb


if __name__ == '__main__':
    out = sys.argv[1]
    os.makedirs(out, exist_ok=True)
    build(False).save(os.path.join(out, 'UK Sole Trader Bookkeeping.xlsx'))
    build(True).save(os.path.join(out, 'UK Sole Trader Bookkeeping - EXAMPLE.xlsx'))
    print('ok')
