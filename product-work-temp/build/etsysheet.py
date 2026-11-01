"""Etsy Seller Profit & Inventory workbook. Usage: python3 etsysheet.py outdir"""
import sys, os, datetime as dt, random
from openpyxl.chart import BarChart, Reference
from xl import *

NP, NO, NE = 100, 1000, 300
FEE = {'list': 'Settings!$C$12', 'trans': 'Settings!$C$13', 'proc': 'Settings!$C$14', 'procfix': 'Settings!$C$15', 'reg': 'Settings!$C$16', 'vat': 'Settings!$C$17', 'offsite': 'Settings!$C$18'}
MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
SKU_RNG = f'Products!$B$6:$B${5 + NP}'


def fees(total, offsite='"No"'):
    """Etsy fees on an order total (item + postage - discount), including VAT on fees."""
    f = FEE
    return (f'(({f["list"]}+{total}*({f["trans"]}+{f["proc"]}+{f["reg"]})+{f["procfix"]}+IF({offsite}="Yes",{total}*{f["offsite"]},0))*(1+{f["vat"]}))')


def build(example=False):
    wb = new_wb()
    start_here(wb, 'Etsy Seller Profit & Inventory',
               'Know exactly what you make on every sale. Set your costs once, log your orders, and the workbook works out Etsy fees, profit, stock levels and your best sellers.',
               [('Settings', 'Check the Etsy fee rates against Etsy\'s current fees page (Shop Manager › Finances), and set your hourly rate and target profit margin.'),
                ('Products', 'One row per product: costs, time, price and postage. It shows the profit per sale and the lowest price that hits your target margin.'),
                ('Orders', 'Log each order (or paste in from your Etsy orders CSV). Pick the SKU and it fills in the product and costs.'),
                ('Inventory', 'Add your opening stock and anything you make or buy. Sold items come off automatically and low stock turns pink.'),
                ('Expenses', 'Other costs: supplies, Etsy Ads, equipment, software.'),
                ('Dashboard', 'Sales, fees, profit, best sellers and monthly trends.')],
               extra=[('Fees change', ['Etsy updates its fees from time to time. The rates in Settings were correct when this file was made (October 2026) but always check Etsy\'s fees and payments policy, and update the Settings tab. Fees are estimates; your Etsy payment account shows the exact amounts.']),
                      ('Opening this file', ['Excel: open as normal. Google Sheets: upload to Google Drive and open with Google Sheets. Apple Numbers: open as normal.'])])

    s = sheet(wb, 'Settings', tab=CLAY_DEEP, widths=[3, 40, 14, 3, 40])
    title(s, 'Settings', 'Check these against Etsy\'s current fees. All amounts in £.')
    rows = [('Shop name', 'Bramble & Thread' if example else None, None), ('Year', 2026, '0'), ('Your hourly rate £', 12.5, GBP), ('Target profit margin', 0.35, PCT), ('Monthly fixed costs £ (Etsy Plus, software, etc.)', 0, GBP)]
    for i, (k, v, f) in enumerate(rows):
        r = 5 + i
        s.cell(row=r, column=2, value=k).font = font(10, True)
        c = s.cell(row=r, column=3, value=v)
        c.fill, c.border, c.font = fill(CREAM), BOX, font(10, True, SAGE_DEEP)
        if f:
            c.number_format = f
    section_label(s, 11, 2, 'Etsy fees (UK sellers) · check Etsy\'s current fees', merge_to=3)
    fr = [('Listing fee per sale £ ($0.20 converted)', 0.16, GBP), ('Transaction fee', 0.065, '0.0%'), ('Payment processing fee', 0.04, '0.0%'), ('Payment processing fixed fee £', 0.20, GBP),
          ('Regulatory operating fee', 0.0048, '0.00%'), ('VAT on Etsy fees (0% if you give Etsy a UK VAT number)', 0.20, PCT), ('Offsite Ads fee (when an order comes from an ad)', 0.15, PCT)]
    for i, (k, v, f) in enumerate(fr):
        r = 12 + i
        s.cell(row=r, column=2, value=k).font = font(10)
        c = s.cell(row=r, column=3, value=v)
        c.fill, c.border, c.font, c.number_format = fill(CREAM), BOTTOM, font(10), f
    note(s, 12, 5, 'Fees are applied to the order total (item price + postage − discounts). The listing fee is charged again each time an item sells. Etsy may also charge currency conversion if you list in another currency.', 9, merge_to=5, height=60)

    # PRODUCTS
    p = sheet(wb, 'Products', widths=[3, 10, 26, 10, 11, 11, 10, 11, 11, 11, 12, 12, 12, 10, 13])
    title(p, 'Products & pricing', 'Costs per item. Profit and suggested price assume a single-item order with no ads.')
    header(p, 5, ['SKU', 'Product', 'Type', 'Materials £', 'Packaging £', 'Minutes', 'Price £', 'Postage charged £', 'Postage cost £', 'Cost per item £', 'Etsy fees £', 'Profit per sale £', 'Margin', 'Min. price for target margin £'], col=2, height=32)
    input_rows(p, 6, 5 + NP, 2, 15, {5: GBP, 6: GBP, 8: GBP, 9: GBP, 10: GBP})
    for r in range(6, 6 + NP):
        p.cell(row=r, column=11, value=f'=IF(B{r}="","",N(E{r})+N(F{r})+N(G{r})/60*Settings!$C$7)')
        p.cell(row=r, column=12, value=f'=IF(B{r}="","",{fees(f"(N(H{r})+N(I{r}))")})')
        p.cell(row=r, column=13, value=f'=IF(B{r}="","",N(H{r})+N(I{r})-N(J{r})-K{r}-L{r})')
        p.cell(row=r, column=14, value=f'=IF(OR(B{r}="",N(H{r})=0),"",M{r}/H{r})')
        # price so that profit = margin * price: P = (cost + postcost - postage*(1-feepct*v) + fixed*v ) / (1 - feepct*v - margin)
        v = f'(1+{FEE["vat"]})'
        fp = f'({FEE["trans"]}+{FEE["proc"]}+{FEE["reg"]})'
        p.cell(row=r, column=15, value=f'=IF(B{r}="","",ROUNDUP((K{r}+N(J{r})-N(I{r})*(1-{fp}*{v})+({FEE["list"]}+{FEE["procfix"]})*{v})/(1-{fp}*{v}-Settings!$C$8)+0.05,1)-0.05)')
    calc_style(p, 6, 5 + NP, [11, 12, 13, 15], GBP)
    calc_style(p, 6, 5 + NP, [14], PCT)
    dropdown(p, f'D6:D{5 + NP}', ['Physical', 'Digital', 'Made to order'])
    highlight(p, f'M6:N{5 + NP}', 'AND($N6<>"",$N6<Settings!$C$8)', CLAY_LIGHT)
    highlight(p, f'M6:N{5 + NP}', 'AND($M6<>"",$M6<0)', 'F5D0C5')

    # ORDERS
    o = sheet(wb, 'Orders', widths=[3, 12, 13, 10, 24, 6, 12, 12, 11, 10, 11, 11, 11, 12, 8])
    title(o, 'Orders', 'One row per item ordered. Item total = price × quantity actually charged.')
    header(o, 5, ['Date', 'Order no.', 'SKU', 'Product', 'Qty', 'Item total £', 'Postage charged £', 'Discount £', 'Offsite Ad?', 'Postage paid £', 'Costs £', 'Etsy fees £', 'Profit £', 'Month'], col=2, height=32)
    input_rows(o, 6, 5 + NO, 2, 15, {2: DATE, 7: GBP, 8: GBP, 9: GBP, 11: GBP})
    for r in range(6, 6 + NO):
        o.cell(row=r, column=5, value=f'=IF(D{r}="","",IFERROR(INDEX(Products!$C$6:$C${5 + NP},MATCH(D{r},{SKU_RNG},0)),"SKU not found"))')
        o.cell(row=r, column=12, value=f'=IF(D{r}="","",IFERROR(INDEX(Products!$K$6:$K${5 + NP},MATCH(D{r},{SKU_RNG},0)),0)*IF(F{r}="",1,F{r}))')
        tot = f'(N(G{r})+N(H{r})-N(I{r}))'
        o.cell(row=r, column=13, value=f'=IF(G{r}="","",{fees(tot, f"J{r}")})')
        o.cell(row=r, column=14, value=f'=IF(G{r}="","",{tot}-N(K{r})-N(L{r})-M{r})')
        o.cell(row=r, column=15, value=f'=IF(B{r}="","",MONTH(B{r}))')
    calc_style(o, 6, 5 + NO, [5])
    calc_style(o, 6, 5 + NO, [12, 13, 14], GBP)
    calc_style(o, 6, 5 + NO, [15], '0')
    dropdown_ref(o, f'D6:D{5 + NO}', '=' + SKU_RNG)
    dropdown(o, f'J6:J{5 + NO}', ['Yes', 'No'])
    highlight(o, f'N6:N{5 + NO}', 'AND($N6<>"",$N6<0)', 'F5D0C5')

    # INVENTORY
    iv = sheet(wb, 'Inventory', widths=[3, 10, 26, 12, 12, 12, 12, 14, 14, 28])
    title(iv, 'Inventory', 'Stock in hand = opening stock + made or bought − sold. Pink means it\'s time to make or reorder.')
    header(iv, 5, ['SKU', 'Product', 'Opening stock', 'Made / bought', 'Sold', 'In stock', 'Reorder at', 'Status', 'Notes'], col=2, height=32)
    input_rows(iv, 6, 5 + NP, 2, 10)
    for r in range(6, 6 + NP):
        iv.cell(row=r, column=2, value=f'=IF(Products!B{r}="","",Products!B{r})')
        iv.cell(row=r, column=3, value=f'=IF(Products!C{r}="","",Products!C{r})')
        iv.cell(row=r, column=6, value=f'=IF(B{r}="","",SUMIFS(Orders!$F$6:$F${5 + NO},Orders!$D$6:$D${5 + NO},B{r})+COUNTIFS(Orders!$D$6:$D${5 + NO},B{r},Orders!$F$6:$F${5 + NO},""))')
        iv.cell(row=r, column=7, value=f'=IF(B{r}="","",IF(OR(Products!D{r}="Digital",Products!D{r}="Made to order"),"–",N(D{r})+N(E{r})-F{r}))')
        iv.cell(row=r, column=9, value=f'=IF(B{r}="","",IF(Products!D{r}="Digital","Digital",IF(Products!D{r}="Made to order","Made to order",IF(H{r}="","Set a level",IF(G{r}<=H{r},"Reorder","OK")))))')
    calc_style(iv, 6, 5 + NP, [2, 3])
    calc_style(iv, 6, 5 + NP, [6, 7], '0')
    calc_style(iv, 6, 5 + NP, [9])
    highlight(iv, f'B6:J{5 + NP}', '$I6="Reorder"')

    # EXPENSES
    ex = sheet(wb, 'Expenses', widths=[3, 12, 22, 28, 20, 12, 8, 24])
    title(ex, 'Other expenses', 'Supplies bought in bulk, Etsy Ads, equipment, software and anything else.')
    header(ex, 5, ['Date', 'Supplier', 'What', 'Category', 'Amount £', 'Month', 'Notes'], col=2)
    input_rows(ex, 6, 5 + NE, 2, 8, {2: DATE, 6: GBP})
    for r in range(6, 6 + NE):
        ex.cell(row=r, column=7, value=f'=IF(B{r}="","",MONTH(B{r}))')
    calc_style(ex, 6, 5 + NE, [7], '0')
    dropdown(ex, f'E6:E{5 + NE}', ['Materials', 'Packaging', 'Postage supplies', 'Etsy Ads', 'Etsy Plus / subscriptions', 'Equipment', 'Software', 'Photography', 'Craft fairs', 'Other'])

    # MONTHLY + DASHBOARD
    d = sheet(wb, 'Dashboard', tab=CLAY, widths=[3, 16, 14, 3, 14, 14, 3, 14, 14, 3, 14, 14, 3])
    d.page_setup.fitToHeight = 1
    d.cell(row=1, column=2, value='LARKSPUR & CO.').font = font(8, True, CLAY)
    c = d.cell(row=2, column=2, value='=IF(Settings!C5="","My Etsy shop",Settings!C5)&" · "&Settings!C6')
    c.font = font(20, True, SAGE_DEEP)
    d.row_dimensions[2].height = 32
    kpi(d, 4, 2, 'Sales (incl. postage)', f'=SUM(Orders!G6:G{5 + NO})+SUM(Orders!H6:H{5 + NO})-SUM(Orders!I6:I{5 + NO})', color=SAGE_DEEP, bg=SAGE_LIGHT)
    kpi(d, 4, 5, 'Etsy fees', f'=SUM(Orders!M6:M{5 + NO})')
    kpi(d, 4, 8, 'Profit after expenses', f'=SUM(Orders!N6:N{5 + NO})-SUM(Expenses!F6:F{5 + NE})-12*N(Settings!C9)', color=SAGE_DEEP, bg=SAGE_LIGHT)
    kpi(d, 4, 11, 'Items sold', f'=SUM(Orders!F6:F{5 + NO})+COUNTIFS(Orders!D6:D{5 + NO},"<>",Orders!F6:F{5 + NO},"")', fmt='0')
    kpi(d, 7, 2, 'Orders', f'=SUMPRODUCT((Orders!C6:C{5 + NO}<>"")/COUNTIF(Orders!C6:C{5 + NO},Orders!C6:C{5 + NO}&""))', fmt='0')
    kpi(d, 7, 5, 'Average order', '=IF(B8=0,0,B5/B8)', color=SAGE_DEEP, bg=SAGE_LIGHT)
    kpi(d, 7, 8, 'Fees as % of sales', '=IF(B5=0,0,E5/B5)', fmt=PCT)
    kpi(d, 7, 11, 'Items to reorder', f'=COUNTIF(Inventory!I6:I{5 + NP},"Reorder")', fmt='0', color=SAGE_DEEP, bg=SAGE_LIGHT)
    section_label(d, 10, 2, 'By month', merge_to=6)
    for j, h in enumerate(['Month', 'Sales £', '', 'Fees £', 'Profit £']):
        if h:
            d.cell(row=11, column=2 + j, value=h).font = font(9, True, INK_SOFT)
    for i, mn in enumerate(MONTHS):
        r = 12 + i
        d.cell(row=r, column=2, value=mn).font = font(10)
        cs = [(3, f'=SUMIFS(Orders!$G$6:$G${5 + NO},Orders!$O$6:$O${5 + NO},{i + 1})+SUMIFS(Orders!$H$6:$H${5 + NO},Orders!$O$6:$O${5 + NO},{i + 1})-SUMIFS(Orders!$I$6:$I${5 + NO},Orders!$O$6:$O${5 + NO},{i + 1})'),
              (5, f'=SUMIFS(Orders!$M$6:$M${5 + NO},Orders!$O$6:$O${5 + NO},{i + 1})'),
              (6, f'=SUMIFS(Orders!$N$6:$N${5 + NO},Orders!$O$6:$O${5 + NO},{i + 1})-SUMIFS(Expenses!$F$6:$F${5 + NE},Expenses!$G$6:$G${5 + NE},{i + 1})-N(Settings!$C$9)')]
        for col, f in cs:
            c = d.cell(row=r, column=col, value=f)
            c.number_format, c.font = GBP0, font(10)
        for col in range(2, 7):
            d.cell(row=r, column=col).border = BOTTOM
    section_label(d, 10, 8, 'Best sellers', merge_to=12)
    d.cell(row=11, column=8, value='Product').font = font(9, True, INK_SOFT)
    d.cell(row=11, column=12, value='Sold').font = font(9, True, INK_SOFT)
    # helper: sold count + tiny tiebreak in hidden column T
    for r in range(6, 6 + NP):
        c = wb['Inventory'].cell(row=r, column=20, value=f'=IF(B{r}="",-1,N(F{r})+ROW()/100000)')
        c.font = font(8, False, 'FFFFFF')
    for k in range(5):
        r = 12 + k
        big = f'LARGE(Inventory!$T$6:$T${5 + NP},{k + 1})'
        d.cell(row=r, column=8, value=f'=IF({big}<=0,"",INDEX(Inventory!$C$6:$C${5 + NP},MATCH({big},Inventory!$T$6:$T${5 + NP},0)))').font = font(10)
        c = d.cell(row=r, column=12, value=f'=IF(H{r}="","",INT({big}))')
        c.font, c.number_format = font(10, True, SAGE_DEEP), '0'
        for col in range(8, 13):
            d.cell(row=r, column=col).border = BOTTOM
    ch = BarChart()
    ch.type, ch.style = 'col', 10
    ch.title = 'Sales and profit by month'
    ch.add_data(Reference(d, min_col=3, min_row=11, max_row=23), titles_from_data=True)
    ch.add_data(Reference(d, min_col=6, min_row=11, max_row=23), titles_from_data=True)
    ch.set_categories(Reference(d, min_col=2, min_row=12, max_row=23))
    ch.series[0].graphicalProperties.solidFill = SAGE
    ch.series[0].graphicalProperties.line.solidFill = SAGE
    ch.series[1].graphicalProperties.solidFill = CLAY
    ch.series[1].graphicalProperties.line.solidFill = CLAY
    ch.y_axis.numFmt = '"£"#,##0'
    ch.y_axis.majorGridlines = None
    ch.x_axis.delete = False
    ch.y_axis.delete = False
    ch.legend.position = 'b'
    ch.height, ch.width = 7.5, 14
    d.add_chart(ch, 'H18')

    if example:
        random.seed(5)
        prods = [('EMB-01', 'Beginner embroidery kit', 'Physical', 6.20, 0.80, 15, 24, 3.20, 2.70), ('EMB-02', 'Wildflower hoop kit', 'Physical', 7.50, 0.80, 15, 28, 3.20, 2.70),
                 ('HOOP-C', 'Custom pet portrait hoop', 'Made to order', 4.00, 1.20, 180, 65, 3.95, 3.35), ('PAT-01', 'Wildflower pattern PDF', 'Digital', 0, 0, 0, 5.50, 0, 0),
                 ('PAT-02', 'Alphabet sampler PDF', 'Digital', 0, 0, 0, 4.50, 0, 0), ('NDL-01', 'Needle minder', 'Physical', 1.40, 0.40, 10, 8.50, 1.70, 1.10)]
        for i, row in enumerate(prods):
            for j, v in enumerate(row):
                p.cell(row=6 + i, column=2 + j, value=v)
        stock = {0: (40, 60, 12), 1: (30, 30, 10), 5: (40, 0, 15)}
        for i, (a, b_, lvl) in stock.items():
            iv.cell(row=6 + i, column=4, value=a)
            iv.cell(row=6 + i, column=5, value=b_)
            iv.cell(row=6 + i, column=8, value=lvl)
        r = 6
        on = 3001
        for mo in range(1, 11):
            for _ in range(random.randint(8, 16) + mo):
                i = random.choices(range(6), weights=[5, 4, 1, 6, 3, 3])[0]
                pr = prods[i]
                q = random.choice([1, 1, 1, 2])
                day = dt.date(2026, mo, random.randint(1, 28))
                for col, v in zip([2, 3, 4, 6, 7, 8, 9, 10, 11], [day, on, pr[0], q, pr[6] * q, pr[7], random.choice([0, 0, 0, round(pr[6] * q * 0.1, 2)]), random.choice(['No'] * 9 + ['Yes']), pr[8]]):
                    o.cell(row=r, column=col, value=v)
                r += 1
                on += 1
        for i, (mo, sup, what, cat, amt) in enumerate([(1, 'Etsy', 'Etsy Ads', 'Etsy Ads', 15), (2, 'Fabric Land', 'Bulk linen', 'Materials', 64), (3, 'Etsy', 'Etsy Ads', 'Etsy Ads', 20), (5, 'Ikea', 'Photo props', 'Photography', 18), (6, 'Etsy', 'Etsy Ads', 'Etsy Ads', 25), (9, 'Craft fair', 'Pitch fee', 'Craft fairs', 40)]):
            for col, v in zip([2, 3, 4, 5, 6], [dt.date(2026, mo, 10), sup, what, cat, amt]):
                ex.cell(row=6 + i, column=col, value=v)
    wb.active = wb.sheetnames.index('Dashboard') if example else 0
    return wb


if __name__ == '__main__':
    out = sys.argv[1]
    os.makedirs(out, exist_ok=True)
    build(False).save(os.path.join(out, 'Etsy Seller Profit & Inventory.xlsx'))
    build(True).save(os.path.join(out, 'Etsy Seller Profit & Inventory - EXAMPLE.xlsx'))
    print('ok')
