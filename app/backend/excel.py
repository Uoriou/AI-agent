import pandas as pd
from openpyxl import load_workbook
from io import BytesIO
from openpyxl.styles import Alignment
import my_gpt

class Excel:

    # I just added this var here
    block = []
    numpy_arr = []
    wb = None
    ws = None

    def __init__(self,file):
        
        input_buf = BytesIO(file) 
        self.wb = load_workbook(input_buf)
        self.ws = self.wb.active
        #Get the column to translate using pandas and convert it into a numpy array
        input_buf.seek(0)  
        df = pd.read_excel(input_buf, index_col=None, na_values=['NA'])
        self.numpy_arr = pd.DataFrame(df)
       
    def translate(self,language):
        #Put a comma after every cell gets printed
        #call the api, which translate a chunk of texts
        index = 0
        translation_map = {}
        for index in self.numpy_arr.to_numpy(): 
            self.block.append(index[0]) # There was  + ',' 
            #Map Japanese to English 
            for j in self.block:
                translation_map[j] = None
        ai = my_gpt.AssistedIntelligent(self.block,language)
        translated_text = []
        translated_text = ai.ask() #API result
       
        for key, value in zip(self.block, translated_text):
            translation_map[key] = value  
        i = 1 
        output_buf = BytesIO()

        for i, translation in enumerate(translated_text, start=1):
            self.ws[f"B{i}"] = translation

        self.wb.save(output_buf)
        with open("translated_output.xlsx", "wb") as f:
            f.write(output_buf.getvalue())

       
    

        
        

