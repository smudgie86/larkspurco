"""Life Admin Register: companion spreadsheet for the Just in Case Binder.
Usage: python3 lifeadmin.py outdir   (writes blank + example versions)"""
import sys, os, datetime as dt
from openpyxl.chart import BarChart, Reference
from openpyxl.chart.label import DataLabelList
from openpyxl.styles import Alignment
from xl import *

N = 60  # input rows per register
FREQ = ['Weekly', 'Fortnightly', '4-weekly', 'Monthly', 'Quarterly', 'Annual']
BILL_CATS = ['Housing', 'Council tax', 'Energy', 'Water', 'Phone & internet', 'TV & streaming', 'Insurance', 'Transport', 'Subscriptions', 'Memberships', 'Charity', 'Childcare', 'Pets', 'Other']
ACC_CATS = ['Current account', 'Savings account', 'Cash ISA', 'Stocks & shares ISA', 'Lifetime ISA', 'Premium Bonds', 'Investments', 'Pension', 'Crypto', 'Other']
MONTHLY = lambda amt, fq: f'IF({amt}="","",{amt}*IF({fq}="Weekly",52/12,IF({fq}="Fortnightly",26/12,IF({fq}="4-weekly",13/12,IF({fq}="Quarterly",1/3,IF({fq}="Annual",1/12,1))))))'


def build(example=False):
    wb = new_wb()
    start_here(wb, 'Life Admin Register',
               'The companion to your Just in Case Binder. Use this for the details that change often: accounts, bills, insurance renewals and debts. '
               'The Dashboard adds everything up so you can see your whole financial picture on one screen.',
               [('Fill in the tabs', 'Start with Accounts, then Bills & Subscriptions, Insurance and Debts. Use the drop-down lists where you see them. Skip anything that doesn\'t apply.'),
                ('Check the Dashboard', 'It totals your savings, debts and monthly outgoings, and counts insurance renewals coming up in the next 60 days.'),
                ('Never store passwords', 'Write only the last 4 digits of account numbers. Use a password manager with emergency access for logins.'),
                ('Review once a year', 'Put today\'s date in "Last reviewed" on the Dashboard. It will tell you when your next review is due.'),
                ('Tell someone it exists', 'Make sure the person who would deal with your affairs knows where this file is kept and how to open it.')],
               extra=[('Opening this file', ['Excel: open as normal. Google Sheets: File › Import › Upload, or upload to Google Drive and open with Google Sheets. Apple Numbers: open as normal (charts may look slightly different).',
                                         'Keep the file somewhere secure, such as an encrypted device or a password-protected cloud folder. Don\'t email it.']),
                      ('Good to know', ['This is a record-keeping tool. It isn\'t financial, legal or tax advice.'])])

    # DASHBOARD
    d = sheet(wb, 'Dashboard', tab=CLAY, widths=[3, 16, 16, 3, 16, 16, 3, 16, 16, 3, 16, 16, 3])
    title(d, 'My life admin at a glance', 'Everything adds up from the other tabs. Only the "Last reviewed" date needs typing.', col_to=12)
    kpi(d, 5, 2, 'Savings & investments', "=SUMIFS(Accounts!H6:H65,Accounts!B6:B65,\"<>Pension\")")
    kpi(d, 5, 5, 'Pensions (approx.)', '=SUMIFS(Accounts!H6:H65,Accounts!B6:B65,"Pension")', color=SAGE_DEEP, bg=SAGE_LIGHT)
    kpi(d, 5, 8, 'Debts owed', '=SUM(Debts!E6:E65)')
    kpi(d, 5, 11, 'Accounts listed', '=COUNTA(Accounts!C6:C65)', fmt='0', color=SAGE_DEEP, bg=SAGE_LIGHT)
    kpi(d, 8, 2, 'Bills per month', "='Bills & Subscriptions'!N3", color=SAGE_DEEP, bg=SAGE_LIGHT)
    kpi(d, 8, 5, 'Bills per year', "='Bills & Subscriptions'!N3*12")
    kpi(d, 8, 8, 'Insurance per year', '=SUM(Insurance!G6:G65)', color=SAGE_DEEP, bg=SAGE_LIGHT)
    kpi(d, 8, 11, 'Renewals in 60 days', '=COUNTIFS(Insurance!I6:I65,">=0",Insurance!I6:I65,"<=60")+COUNTIFS(\'Bills & Subscriptions\'!K6:K65,">="&TODAY(),\'Bills & Subscriptions\'!K6:K65,"<="&TODAY()+60)', fmt='0')
    # review box
    section_label(d, 11, 2, 'Yearly review', merge_to=6)
    d.cell(row=12, column=2, value='Last reviewed').font = font(10, True)
    c = d.cell(row=12, column=3, value=dt.date(2026, 10, 1) if example else None)
    c.number_format, c.fill, c.border, c.font = DATE, fill(CREAM), BOX, font(10)
    d.cell(row=13, column=2, value='Next review due').font = font(10, True)
    c = d.cell(row=13, column=3, value='=IF(C12="","Add a date",C12+365)')
    c.number_format, c.font, c.fill = DATE, font(10, True, SAGE_DEEP), fill(SAGE_LIGHT)
    d.cell(row=14, column=2, value='Status').font = font(10, True)
    c = d.cell(row=14, column=3, value='=IF(C12="","Not reviewed yet",IF(TODAY()>C12+365,"Overdue: time to review",IF(C12+365-TODAY()<=30,"Due within a month","Up to date")))')
    c.font = font(10, True, CLAY_DEEP)
    d.merge_cells('C14:F14')
    highlight(d, 'C14', 'LEFT($C$14,3)="Ove"', CLAY_LIGHT)
    # category breakdown
    section_label(d, 11, 8, 'Monthly bills by category', merge_to=12)
    d.cell(row=12, column=8, value='Category').font = font(9, True, INK_SOFT)
    d.cell(row=12, column=9, value='£ / month').font = font(9, True, INK_SOFT)
    for i, cat in enumerate(BILL_CATS):
        r = 13 + i
        d.cell(row=r, column=8, value=cat).font = font(10)
        c = d.cell(row=r, column=9, value=f"=SUMIFS('Bills & Subscriptions'!G$6:G$65,'Bills & Subscriptions'!C$6:C$65,H{r})")
        c.number_format, c.font = GBP, font(10, False, SAGE_DEEP)
        for col in (8, 9):
            d.cell(row=r, column=col).border = BOTTOM
    r = 13 + len(BILL_CATS)
    d.cell(row=r, column=8, value='Total').font = font(10, True)
    c = d.cell(row=r, column=9, value=f'=SUM(I13:I{r - 1})')
    c.number_format, c.font = GBP, font(10, True, CLAY_DEEP)
    ch = BarChart()
    ch.type = 'bar'
    ch.style = 10
    ch.title = 'Monthly bills by category'
    ch.y_axis.title = None
    ch.legend = None
    ch.add_data(Reference(d, min_col=9, min_row=12, max_row=12 + len(BILL_CATS)), titles_from_data=True)
    ch.set_categories(Reference(d, min_col=8, min_row=13, max_row=12 + len(BILL_CATS)))
    ch.series[0].graphicalProperties.solidFill = CLAY
    ch.series[0].graphicalProperties.line.solidFill = CLAY
    ch.y_axis.majorGridlines = None
    ch.x_axis.scaling.orientation = 'maxMin'
    ch.height, ch.width = 7.6, 13
    ch.y_axis.numFmt = '"£"#,##0'
    ch.x_axis.tickLblSkip = 1
    ch.y_axis.delete = False
    ch.x_axis.delete = False
    d.add_chart(ch, 'B16')
    note(d, 32, 2, 'Tip: totals on this page only include rows you\'ve filled in. Amounts are approximate and for your own planning.', 8, INK_SOFT, merge_to=12)

    # ACCOUNTS
    a = sheet(wb, 'Accounts', widths=[3, 20, 22, 20, 12, 12, 16, 14, 14, 20, 30])
    title(a, 'Accounts, savings, investments & pensions', 'Banks, building societies, ISAs, Premium Bonds, pensions. Last 4 digits only.')
    hd = ['Category', 'Provider', 'Account name / type', 'Last 4 digits', 'Owner', 'Joint with', 'Approx. value £', 'Online / app?', 'Beneficiary / nomination', 'Notes']
    header(a, 5, hd, col=2)
    input_rows(a, 6, 5 + N, 2, 11, {8: GBP0, 5: '@'})
    dropdown(a, f'B6:B{5 + N}', ACC_CATS)
    dropdown(a, f'F6:F{5 + N}', ['Me', 'Joint', 'Business'])
    dropdown(a, f'I6:I{5 + N}', ['Yes', 'No'])

    # BILLS
    b = sheet(wb, 'Bills & Subscriptions', widths=[3, 22, 16, 18, 11, 12, 13, 13, 16, 15, 13, 14, 26, 14])
    title(b, 'Bills & subscriptions', 'Everything that leaves your account regularly. Monthly and yearly costs work themselves out.')
    b.cell(row=3, column=13, value='Total per month').font = font(9, True, INK_SOFT)
    b.cell(row=3, column=13).alignment = Alignment(horizontal='right')
    c = b.cell(row=3, column=14, value=f'=SUM(G6:G{5 + N})')
    c.number_format, c.font, c.fill = GBP, font(11, True, CLAY_DEEP), fill(CLAY_LIGHT)
    hd = ['What', 'Category', 'Company', 'Amount £', 'How often', '£ per month', '£ per year', 'Paid from', 'Paid by', 'Renews / ends', 'If I die', 'Account ref / notes']
    header(b, 5, hd, col=2)
    input_rows(b, 6, 5 + N, 2, 13, {5: GBP, 11: DATE})
    for r in range(6, 6 + N):
        b.cell(row=r, column=7, value='=' + MONTHLY(f'E{r}', f'F{r}'))
        b.cell(row=r, column=8, value=f'=IF(G{r}="","",G{r}*12)')
    calc_style(b, 6, 5 + N, [7, 8], GBP)
    dropdown(b, f'C6:C{5 + N}', BILL_CATS)
    dropdown(b, f'F6:F{5 + N}', FREQ)
    dropdown(b, f'J6:J{5 + N}', ['Direct debit', 'Standing order', 'Card', 'Cash', 'PayPal', 'Other'])
    dropdown(b, f'L6:L{5 + N}', ['Cancel', 'Transfer', 'Keep', 'Check'])
    highlight(b, f'B6:M{5 + N}', f'AND($K6<>"",$K6>=TODAY(),$K6<=TODAY()+60)')

    # INSURANCE
    ins = sheet(wb, 'Insurance', widths=[3, 22, 18, 14, 12, 12, 13, 14, 12, 13, 14, 28])
    title(ins, 'Insurance & plans', 'Life cover, home, car, pet, funeral plans. Renewals in the next 60 days turn pink.')
    hd = ['Type', 'Provider', 'Policy ref (last 4)', 'Premium £', 'How often', '£ per year', 'Renewal date', 'Days to go', 'Cover amount £', 'In trust?', 'Notes']
    header(ins, 5, hd, col=2)
    input_rows(ins, 6, 5 + N, 2, 12, {5: GBP, 8: DATE, 10: GBP0})
    for r in range(6, 6 + N):
        ins.cell(row=r, column=7, value=f'=IF(E{r}="","",{MONTHLY(f"E{r}", f"F{r}")}*12)')
        ins.cell(row=r, column=9, value=f'=IF(H{r}="","",H{r}-TODAY())')
    calc_style(ins, 6, 5 + N, [7], GBP)
    calc_style(ins, 6, 5 + N, [9], '0')
    dropdown(ins, f'B6:B{5 + N}', ['Life', 'Critical illness', 'Income protection', 'Mortgage protection', 'Death in service', 'Funeral plan', 'Buildings', 'Contents', 'Car', 'Pet', 'Travel', 'Health', 'Gadget', 'Other'])
    dropdown(ins, f'F6:F{5 + N}', FREQ)
    dropdown(ins, f'K6:K{5 + N}', ['Yes', 'No', 'Not sure', 'N/A'])
    highlight(ins, f'B6:L{5 + N}', 'AND($I6<>"",$I6>=0,$I6<=60)')
    highlight(ins, f'B6:L{5 + N}', 'AND($I6<>"",$I6<0)', 'F5D0C5')

    # DEBTS
    db = sheet(wb, 'Debts', widths=[3, 20, 18, 14, 14, 14, 11, 13, 12, 12, 28])
    title(db, 'Debts & credit', 'Mortgage, loans, credit cards, car finance, buy now pay later.')
    hd = ['Lender', 'Type', 'Ref (last 4)', 'Balance £', 'Monthly payment £', 'Interest %', 'Ends', 'Insured?', 'Joint?', 'Notes']
    header(db, 5, hd, col=2)
    input_rows(db, 6, 5 + N, 2, 11, {5: GBP, 6: GBP, 7: '0.0%', 8: DATE})
    dropdown(db, f'C6:C{5 + N}', ['Mortgage', 'Personal loan', 'Credit card', 'Car finance', 'Overdraft', 'Store card', 'Buy now pay later', 'Student loan', 'Family loan', 'Other'])
    dropdown(db, f'I6:J{5 + N}', ['Yes', 'No', 'Not sure'])
    db.cell(row=3, column=10, value='Total owed').font = font(9, True, INK_SOFT)
    c = db.cell(row=3, column=11, value=f'=SUM(E6:E{5 + N})')
    c.number_format, c.font, c.fill = GBP, font(11, True, CLAY_DEEP), fill(CLAY_LIGHT)

    # DOCUMENTS / CONTACTS / DIGITAL
    docs = ['Birth certificate', 'Marriage / civil partnership certificate', 'Passport', 'Driving licence', 'Will', 'Letter of wishes', 'Power of attorney', 'Property deeds / tenancy', 'Mortgage papers', 'Pension statements', 'Insurance policies', 'Funeral plan', 'Vehicle log book (V5C)', 'Tax returns / P60s', 'Medical letters']
    dc = sheet(wb, 'Documents', widths=[3, 34, 30, 22, 14, 30])
    title(dc, 'Where my documents are', 'Where each original is kept, and who has a copy.')
    header(dc, 5, ['Document', 'Where the original is', 'Copy held by', 'Last checked', 'Notes'], col=2)
    input_rows(dc, 6, 35, 2, 6, {5: DATE})
    for i, x in enumerate(docs):
        dc.cell(row=6 + i, column=2, value=x)
    roles = ['GP surgery', 'Solicitor', 'Accountant', 'Financial adviser', 'Executor', 'Executor', 'Attorney', 'Employer / HR', 'Landlord / letting agent', 'Neighbour with a key', 'Faith leader / celebrant', 'Vet']
    ct = sheet(wb, 'Contacts', widths=[3, 26, 26, 18, 30, 30])
    title(ct, 'Important contacts', 'Professionals and helpers who know your affairs.')
    header(ct, 5, ['Role', 'Name / firm', 'Phone', 'Email', 'Notes'], col=2)
    input_rows(ct, 6, 35, 2, 6)
    for i, x in enumerate(roles):
        ct.cell(row=6 + i, column=2, value=x)
    accts = ['Main email', 'Apple ID / Google account', 'Facebook', 'Instagram', 'X / Threads / TikTok', 'LinkedIn', 'Amazon', 'PayPal', 'eBay / Vinted / Etsy', 'Password manager']
    dg = sheet(wb, 'Digital', widths=[3, 26, 30, 22, 18, 34])
    title(dg, 'Digital accounts & wishes', 'No passwords here: record the account and what you\'d like to happen to it.')
    header(dg, 5, ['Account', 'Username / email', 'My wish', 'Legacy contact set?', 'Notes'], col=2)
    input_rows(dg, 6, 35, 2, 6)
    for i, x in enumerate(accts):
        dg.cell(row=6 + i, column=2, value=x)
    dropdown(dg, 'D6:D35', ['Keep', 'Memorialise', 'Close / delete', 'Download then close', 'Family to decide'])
    dropdown(dg, 'E6:E35', ['Yes', 'No', 'Not available'])

    if example:
        acc = [('Current account', 'Nationwide', 'FlexDirect', '4821', 'Me', '', 1850, 'Yes', '', 'Salary paid in here'),
               ('Current account', 'Monzo', 'Joint bills account', '1177', 'Joint', 'Sam', 640, 'Yes', '', ''),
               ('Savings account', 'Chase', 'Saver', '9034', 'Me', '', 3200, 'Yes', '', 'Emergency fund'),
               ('Cash ISA', 'Nationwide', 'Loyalty ISA', '2290', 'Me', '', 6500, 'Yes', '', ''),
               ('Premium Bonds', 'NS&I', 'Premium Bonds', '6612', 'Me', '', 2000, 'Yes', '', 'Holder no. in NS&I letters'),
               ('Stocks & shares ISA', 'Vanguard', 'S&S ISA', '3301', 'Me', '', 8400, 'Yes', '', ''),
               ('Pension', 'NEST', 'Workplace pension', '5512', 'Me', '', 21500, 'Yes', 'Done 2024', 'Old job'),
               ('Pension', 'Aviva', 'Workplace pension', '7740', 'Me', '', 14200, 'Yes', 'Done 2025', 'Current job')]
        for i, row in enumerate(acc):
            for j, v in enumerate(row):
                a.cell(row=6 + i, column=2 + j, value=v)
        today = dt.date(2026, 10, 28)
        bills = [('Mortgage', 'Housing', 'Halifax', 742, 'Monthly', 'Joint account', 'Direct debit', None, 'Transfer'),
                 ('Council tax', 'Council tax', 'Glasgow City Council', 168, 'Monthly', 'Joint account', 'Direct debit', None, 'Transfer'),
                 ('Gas & electric', 'Energy', 'Octopus', 142, 'Monthly', 'Joint account', 'Direct debit', None, 'Transfer'),
                 ('Broadband', 'Phone & internet', 'Virgin Media', 38, 'Monthly', 'Joint account', 'Direct debit', today + dt.timedelta(days=41), 'Transfer'),
                 ('Mobile', 'Phone & internet', 'giffgaff', 12, 'Monthly', 'Current account', 'Card', None, 'Cancel'),
                 ('TV Licence', 'TV & streaming', 'TV Licensing', 174.50, 'Annual', 'Current account', 'Direct debit', None, 'Transfer'),
                 ('Netflix', 'TV & streaming', 'Netflix', 5.99, 'Monthly', 'Current account', 'Card', None, 'Cancel'),
                 ('Spotify', 'Subscriptions', 'Spotify', 11.99, 'Monthly', 'Current account', 'Card', None, 'Cancel'),
                 ('Gym', 'Memberships', 'PureGym', 24.99, 'Monthly', 'Current account', 'Direct debit', None, 'Cancel'),
                 ('Car tax', 'Transport', 'DVLA', 195, 'Annual', 'Current account', 'Direct debit', today + dt.timedelta(days=120), 'Check'),
                 ('Dog food', 'Pets', 'Zooplus', 22, '4-weekly', 'Current account', 'Card', None, 'Cancel'),
                 ('Charity', 'Charity', 'Cats Protection', 5, 'Monthly', 'Current account', 'Direct debit', None, 'Cancel')]
        for i, (w, cat, co, amt, fq, pf, pb, ren, act) in enumerate(bills):
            r = 6 + i
            for col, v in zip([2, 3, 4, 5, 6, 9, 10, 11, 12], [w, cat, co, amt, fq, pf, pb, ren, act]):
                b.cell(row=r, column=col, value=v)
        insr = [('Life', 'Legal & General', '8812', 18.40, 'Monthly', today + dt.timedelta(days=210), 150000, 'Yes'),
                ('Buildings', 'Aviva', '1043', 312, 'Annual', today + dt.timedelta(days=34), None, 'N/A'),
                ('Contents', 'Aviva', '1044', 96, 'Annual', today + dt.timedelta(days=34), None, 'N/A'),
                ('Car', 'Admiral', '5530', 41.20, 'Monthly', today + dt.timedelta(days=150), None, 'N/A'),
                ('Pet', 'Petplan', '2210', 29.80, 'Monthly', today + dt.timedelta(days=260), None, 'N/A'),
                ('Death in service', 'Employer (via HR)', '', None, None, None, 80000, 'Not sure')]
        for i, (t, p, ref, prem, fq, ren, cov, trust) in enumerate(insr):
            r = 6 + i
            for col, v in zip([2, 3, 4, 5, 6, 8, 10, 11], [t, p, ref, prem, fq, ren, cov, trust]):
                ins.cell(row=r, column=col, value=v)
        debts = [('Halifax', 'Mortgage', '7781', 118400, 742, 0.0429, dt.date(2048, 6, 1), 'Yes', 'Yes'),
                 ('Barclaycard', 'Credit card', '0042', 860, 60, 0.249, None, 'No', 'No'),
                 ('Black Horse', 'Car finance', '3319', 6200, 189, 0.069, dt.date(2029, 3, 1), 'No', 'No')]
        for i, row in enumerate(debts):
            for j, v in enumerate(row):
                db.cell(row=6 + i, column=2 + j, value=v)
        for i, (w, c2, c3) in enumerate([('Locked drawer, study', 'Sister (copy)', ''), ('Locked drawer, study', '', ''), ('Bedside drawer', '', ''), ('Wallet', '', ''), ('Thompson & Co solicitors', 'Sam (copy)', 'Made 2023')]):
            dc.cell(row=6 + i, column=3, value=w)
            dc.cell(row=6 + i, column=4, value=c2)
            dc.cell(row=6 + i, column=6, value=c3)
        for i, (n, p) in enumerate([('Parkview Medical Practice', '0141 000 0000'), ('Thompson & Co', '0141 000 0001')]):
            ct.cell(row=6 + i, column=3, value=n)
            ct.cell(row=6 + i, column=4, value=p)
        for i, (u, wsh, lc) in enumerate([('me@email.co.uk', 'Download then close', 'Yes'), ('me@email.co.uk', 'Family to decide', 'Yes'), ('Jo Example', 'Memorialise', 'Yes'), ('@joexample', 'Memorialise', 'No')]):
            dg.cell(row=6 + i, column=3, value=u)
            dg.cell(row=6 + i, column=4, value=wsh)
            dg.cell(row=6 + i, column=5, value=lc)
    wb.active = 1 if example else 0
    return wb


if __name__ == '__main__':
    out = sys.argv[1]
    os.makedirs(out, exist_ok=True)
    build(False).save(os.path.join(out, 'Life Admin Register.xlsx'))
    build(True).save(os.path.join(out, 'Life Admin Register - EXAMPLE.xlsx'))
    print('ok')
