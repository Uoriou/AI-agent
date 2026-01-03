import pandas as pd
from openpyxl import load_workbook
from io import BytesIO
from openpyxl.styles import Alignment

class Excel:

    def __init__(self,file):
        
        input_buf = BytesIO(file)
        wb = load_workbook(input_buf)
        ws = wb.active
        ws["A8"] = "Hooray !!"
        output_buf = BytesIO()
        wb.save(output_buf)


        with open("output.xlsx", "wb") as f:
            f.write(output_buf.getvalue())
        
        

