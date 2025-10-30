from fastapi import FastAPI, File, UploadFile
import uvicorn
import my_gpt

app = FastAPI()


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

app.post("/translate/sentence")
async def post():
   return None

if __name__ == "__main__":
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
