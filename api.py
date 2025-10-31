from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import my_gpt
import parser

app = FastAPI()

#Handle cors policy :))
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

temp = []

@app.get("/")
def get():#Backend testing
    #When line braker \ is in the text move below ... 
    
    return {"message": temp}

@app.post("/translate/sentence")
async def post(text:dict):
    #Need to receive the data from the frontend
    text_to_translate = text["sentence"]
    ai = my_gpt.AssistedIntelligent(text_to_translate)
    #print() 
    response = parser.unmark(ai.ask())
    print("Here is the response",response)
    temp.append(response)
  

if __name__ == "__main__":
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
