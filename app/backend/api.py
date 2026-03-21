from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from typing import Annotated
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from pydantic import BaseModel
import uvicorn
import my_gpt
import parser
import excel
import test


app = FastAPI()

#Handle cors policy :))
origins = [
    "http://localhost:5173",  
    "http://127.0.0.1:5173",
    "http://localhost:3000" 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          
    allow_credentials=True,        
    allow_methods=["*"],            
    allow_headers=["*"],            
)

temp = []


@app.get("/answer")
def get():
    #return {"message": temp}
    return {"message":"OK"}

@app.post("/translate/sentence")
async def post(text:dict):
    
    #Need to receive the data from the frontend
    text_to_translate = text["sentence"]
    ai = my_gpt.AssistedIntelligent(text_to_translate)
    #print() 
    response = parser.unmark(ai.ask())
    print("Here is the response",response)
    temp.append(response)
    
"""Excel file"""  
@app.post("/automate")#Keep in mind that the frontend has changed
async def post(file: Annotated[UploadFile, File()],cell_range:str = Form(...)): 
        language = "Japanese" # default language 
        print(cell_range)
        index = 0
        first = ""
        for i in range(len(cell_range)): # A1:A5
            if i < len(cell_range)-1 and cell_range[i] == ":":
                first  = cell_range[0:i]
                index = i
                break
        second = cell_range[index+1:]
        print(first)
        print(second)
   #try:
        
        if not Path(file.filename).suffix == '.xlsx':
            print("Its not a valid input",file.filename)
            raise HTTPException(status_code=400, detail="Invalid file type")
        else:
            print(file)
            contents = await file.read()  
            print("Downloaded")
            #Open the excel file in the custom class 
            excel_automation = excel.Excel(contents,first,second)
            print("Translating")
            excel_automation.translate(language)
            print("Operation performed")
           
                    
    #except Exception as e:
        
        return None

if __name__ == "__main__":
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
