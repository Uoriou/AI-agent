from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import my_gpt
import parser

app = FastAPI()

origins = [
    "http://localhost:5173",  
    "http://127.0.0.1:5173", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          
    allow_credentials=True,        
    allow_methods=["*"],            
    allow_headers=["*"],            
)

@app.get("/")
def get():#Backend testing
    return {"Hello": "World"}

@app.post("/translate/file")
async def post(file: UploadFile = File(...)):
   
    contents = await file.read()
    # contents is a bytes object
    print(contents[:100])  # print first 100 bytes
    text = contents.decode("utf-8")
    #Might need to convert the files into CSV format 
    ai = my_gpt.AssistedIntelligent(text)
    ai.ask()

@app.post("/translate/sentence")
async def post(text:dict):
    #Need to receive the data from the frontend
    text_to_translate = text["sentence"]
    ai = my_gpt.AssistedIntelligent(text_to_translate)
    print(parser.unmark(ai.ask())) 
  

if __name__ == "__main__":
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
