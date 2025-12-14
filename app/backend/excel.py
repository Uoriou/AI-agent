import pandas as pd
from openpyxl import load_workbook

data_frame = pd.read_excel("Test.xlsx")
# Load workbook and sheet
wb = load_workbook("Test.xlsx")
if "Sheet2" not in wb.sheetnames:
    wb.create_sheet("Sheet2")
ws = wb["Sheet2"]

text = "Hi"

# Write into rows 5–10 and columns D–H
for row in range(5, 11):          
    for col in ["D", "E", "F", "G", "H"]:
        ws[f"{col}{row}"] = text

# Save changes
wb.save("Test.xlsx")