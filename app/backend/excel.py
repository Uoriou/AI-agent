import pandas as pd
from openpyxl import load_workbook


class Excel:

    file = "" 

    def __init__(self,file):
        self.content = file


    def load_excel(self):

        """This is a test and not finalized """
        data_frame = pd.read_excel(self.file)
        print(data_frame)
        
        # Load workbook and sheet
        wb = load_workbook("Test.xlsx")

        if "Sheet2" not in wb.sheetnames:
            wb.create_sheet("Sheet2")
        ws = wb["Sheet2"]

        ws.merge_cells('D5:F11')
        ws["D5"] = "Hi Mario"

        wb.save("Test.xlsx")

