"""Recalculate a workbook in LibreOffice and report formula errors.
Usage: python3 -I xlcheck.py file.xlsx [--pdf outdir] [--show Sheet!A1:B5 ...]
"""
import sys, os, subprocess, tempfile, shutil
from openpyxl import load_workbook

src = sys.argv[1]
args = sys.argv[2:]
tmp = tempfile.mkdtemp()
prof = '-env:UserInstallation=file://' + tempfile.mkdtemp()
subprocess.run(['soffice', prof, '--headless', '--calc', '--convert-to', 'xlsx:Calc MS Excel 2007 XML', '--outdir', tmp, src],
               check=True, capture_output=True)
out = os.path.join(tmp, os.path.basename(src))
wb = load_workbook(out, data_only=True)
errs = []
for ws in wb.worksheets:
    for row in ws.iter_rows():
        for c in row:
            if isinstance(c.value, str) and (c.value.startswith('#') and c.value.rstrip('!?/0').upper() in ('#VALUE', '#REF', '#NAME', '#DIV', '#N/A', '#NUM', '#NULL') or c.value.startswith('Err:')):
                errs.append(f'{ws.title}!{c.coordinate}={c.value}')
print('errors:', len(errs))
for e in errs[:40]:
    print('  ', e)
i = 0
while i < len(args):
    if args[i] == '--show':
        sh, rng = args[i + 1].split('!')
        for row in wb[sh][rng]:
            print(' | '.join('' if c.value is None else str(c.value) for c in row))
        i += 2
    elif args[i] == '--pdf':
        od = args[i + 1]
        os.makedirs(od, exist_ok=True)
        subprocess.run(['soffice', prof, '--headless', '--convert-to', 'pdf', '--outdir', od, src], check=True, capture_output=True)
        i += 2
    else:
        i += 1
shutil.rmtree(tmp, ignore_errors=True)
sys.exit(1 if errs else 0)
