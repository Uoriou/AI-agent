import pandas as pd
from openpyxl import load_workbook
from io import BytesIO
from openpyxl.styles import Alignment
import my_gpt

class Excel:

    def __init__(self,file):
        
        input_buf = BytesIO(file) 
        """wb = load_workbook(input_buf)
        ws = wb.active
        ws["A8"] = "Hooray !!"
        output_buf = BytesIO()
        wb.save(output_buf)"""
        #Get the column to translate using pandas and convert it into a numpy array
        input_buf.seek(0)  
        df = pd.read_excel(input_buf, index_col=None, na_values=['NA'])
        numpy_arr = pd.DataFrame(df)
        print(numpy_arr.to_numpy())
        #call the api 
        #ai = my_gpt.AssistedIntelligent(text_to_translate)
        """
        with open("output.xlsx", "wb") as f:
            f.write(output_buf.getvalue())"""
        
        #Get the column to translate using pandas
       
    

        
        

