"""Shared spreadsheet styling for Larkspur & Co. workbooks (Excel + Google Sheets friendly)."""
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.formatting.rule import FormulaRule, CellIsRule
from openpyxl.utils import get_column_letter as L

CLAY, CLAY_DEEP, CLAY_LIGHT = 'CC8B6D', '94502F', 'F3E1D6'
CREAM, INK, INK_SOFT, LINE = 'FBF7F1', '3A352F', '6B655C', 'E2D7C6'
SAGE, SAGE_DEEP, SAGE_LIGHT = '7C8B6B', '47503E', 'E4E9DD'
FONT = 'Arial'
GBP = '"£"#,##0.00'
GBP0 = '"£"#,##0'
DATE = 'dd/mm/yyyy'
PCT = '0%'

fill = lambda c: PatternFill('solid', start_color=c, end_color=c)
thin = Side(style='thin', color=LINE)
BOX = Border(left=thin, right=thin, top=thin, bottom=thin)
BOTTOM = Border(bottom=thin)


def font(size=10, bold=False, color=INK, italic=False):
    return Font(name=FONT, size=size, bold=bold, color=color, italic=italic)


def new_wb():
    wb = Workbook()
    wb.remove(wb.active)
    return wb


def sheet(wb, name, tab=SAGE, widths=None, grid=False):
    ws = wb.create_sheet(name)
    ws.sheet_properties.tabColor = tab
    ws.sheet_view.showGridLines = grid
    ws.sheet_view.zoomScale = 100
    for i, w in enumerate(widths or [], start=1):
        ws.column_dimensions[L(i)].width = w
    ws.page_setup.orientation = 'landscape'
    ws.page_setup.fitToWidth = 1
    ws.page_setup.fitToHeight = 0
    ws.sheet_properties.pageSetUpPr.fitToPage = True
    return ws


def title(ws, text, sub='', kicker='LARKSPUR & CO.', col_to=8, row=1):
    ws.row_dimensions[row].height = 16
    ws.row_dimensions[row + 1].height = 30
    c = ws.cell(row=row, column=1, value=kicker)
    c.font = font(8, True, CLAY)
    c = ws.cell(row=row + 1, column=1, value=text)
    c.font = font(18, True, SAGE_DEEP)
    c.alignment = Alignment(vertical='center')
    if sub:
        c = ws.cell(row=row + 2, column=1, value=sub)
        c.font = font(9, False, INK_SOFT)
    return row + (4 if sub else 3)


def header(ws, row, headers, col=1, color=SAGE_DEEP, height=24):
    ws.row_dimensions[row].height = height
    for i, h in enumerate(headers):
        c = ws.cell(row=row, column=col + i, value=h)
        c.font = font(9, True, 'FFFFFF')
        c.fill = fill(color)
        c.alignment = Alignment(vertical='center', horizontal='left', wrap_text=True, indent=1)
    ws.freeze_panes = ws.cell(row=row + 1, column=col)


def input_rows(ws, r1, r2, c1, c2, fmts=None, band=True):
    """Style an input area. fmts: {col_index: number_format}."""
    fmts = fmts or {}
    for r in range(r1, r2 + 1):
        ws.row_dimensions[r].height = 18
        for c in range(c1, c2 + 1):
            cell = ws.cell(row=r, column=c)
            cell.font = font(10)
            cell.border = BOTTOM
            cell.alignment = Alignment(vertical='center', indent=1)
            if band and (r - r1) % 2 == 1:
                cell.fill = fill(CREAM)
            if c in fmts:
                cell.number_format = fmts[c]


def calc_style(ws, r1, r2, cols, fmt=None):
    for r in range(r1, r2 + 1):
        for c in cols:
            cell = ws.cell(row=r, column=c)
            cell.font = font(10, False, SAGE_DEEP)
            cell.fill = fill(SAGE_LIGHT)
            if fmt:
                cell.number_format = fmt


def dropdown(ws, rng, options, prompt=None):
    src = '"' + ','.join(options) + '"'
    assert len(src) < 255, 'list too long for inline validation'
    dv = DataValidation(type='list', formula1=src, allow_blank=True, showDropDown=False)
    if prompt:
        dv.promptTitle, dv.prompt, dv.showInputMessage = 'Choose', prompt, True
    dv.error, dv.errorTitle, dv.showErrorMessage = 'Please pick from the list (or edit the list on the Settings tab).', 'Not in list', False
    ws.add_data_validation(dv)
    dv.add(rng)


def dropdown_ref(ws, rng, ref):
    dv = DataValidation(type='list', formula1=ref, allow_blank=True)
    dv.showErrorMessage = False
    ws.add_data_validation(dv)
    dv.add(rng)


def kpi(ws, row, col, label, formula, fmt=GBP0, color=CLAY_DEEP, bg=CLAY_LIGHT, span=2):
    """Big number tile: label row + value row, merged across `span` columns."""
    for r in (row, row + 1):
        for c in range(col, col + span):
            ws.cell(row=r, column=c).fill = fill(bg)
    ws.merge_cells(start_row=row, start_column=col, end_row=row, end_column=col + span - 1)
    ws.merge_cells(start_row=row + 1, start_column=col, end_row=row + 1, end_column=col + span - 1)
    a = ws.cell(row=row, column=col, value=label.upper())
    a.font = font(8, True, color)
    a.alignment = Alignment(indent=1, vertical='bottom')
    b = ws.cell(row=row + 1, column=col, value=formula)
    b.font = font(20, True, color)
    b.alignment = Alignment(indent=1, vertical='center')
    b.number_format = fmt
    ws.row_dimensions[row].height = 20
    ws.row_dimensions[row + 1].height = 34


def note(ws, row, col, text, size=9, color=INK_SOFT, bold=False, merge_to=None, height=None):
    c = ws.cell(row=row, column=col, value=text)
    c.font = font(size, bold, color)
    c.alignment = Alignment(wrap_text=True, vertical='top')
    if merge_to:
        ws.merge_cells(start_row=row, start_column=col, end_row=row, end_column=merge_to)
    if height:
        ws.row_dimensions[row].height = height
    return c


def section_label(ws, row, col, text, color=CLAY_DEEP, merge_to=None):
    c = ws.cell(row=row, column=col, value=text.upper())
    c.font = font(9, True, color)
    c.border = Border(bottom=Side(style='medium', color=CLAY))
    if merge_to:
        for cc in range(col + 1, merge_to + 1):
            ws.cell(row=row, column=cc).border = Border(bottom=Side(style='medium', color=CLAY))
    ws.row_dimensions[row].height = 20
    return c


def highlight(ws, rng, formula, color=CLAY_LIGHT, font_color=None, bold=False):
    f = Font(color=font_color, bold=bold) if (font_color or bold) else None
    ws.conditional_formatting.add(rng, FormulaRule(formula=[formula], fill=fill(color), font=f))


def start_here(wb, product, intro, steps, extra=None, tab=CLAY):
    """Instructions sheet shown first."""
    ws = sheet(wb, 'Start here', tab=tab, widths=[3, 30, 90])
    ws.cell(row=2, column=2, value='LARKSPUR & CO.').font = font(8, True, CLAY)
    ws.cell(row=3, column=2, value=product).font = font(22, True, SAGE_DEEP)
    ws.row_dimensions[3].height = 36
    note(ws, 4, 2, intro, 10, INK, merge_to=3, height=46)
    r = 6
    section_label(ws, r, 2, 'How to use it', merge_to=3)
    r += 1
    for i, (h, t) in enumerate(steps, 1):
        ws.cell(row=r, column=2, value=f'{i}. {h}').font = font(10, True, SAGE_DEEP)
        note(ws, r, 3, t, 10, INK)
        ws.cell(row=r, column=2).alignment = Alignment(vertical='top', wrap_text=True)
        ws.row_dimensions[r].height = max(20, 15 * (1 + len(t) // 95))
        r += 1
    r += 1
    section_label(ws, r, 2, 'Colour key', merge_to=3)
    r += 1
    for label, bg, txt in [('Type here', CREAM, 'Cells with a white or cream background are for you to fill in.'),
                           ('Calculated', SAGE_LIGHT, 'Green cells work themselves out. Please don\'t type over them.'),
                           ('Heads up', CLAY_LIGHT, 'Pink highlights flag something that needs attention, such as a renewal coming up.')]:
        c = ws.cell(row=r, column=2, value=label)
        c.fill = fill(bg)
        c.font = font(10, True, INK)
        c.alignment = Alignment(indent=1, vertical='center')
        note(ws, r, 3, txt, 10, INK)
        ws.row_dimensions[r].height = 20
        r += 1
    for block in (extra or []):
        r += 1
        section_label(ws, r, 2, block[0], merge_to=3)
        r += 1
        for line in block[1]:
            note(ws, r, 2, line, 10, INK, merge_to=3, height=max(18, 15 * (1 + len(line) // 120)))
            r += 1
    r += 1
    note(ws, r, 2, '© Larkspur & Co. · larkspurco.uk · For personal use only. Please don\'t share or resell this file.', 8, INK_SOFT, merge_to=3)
    return ws
