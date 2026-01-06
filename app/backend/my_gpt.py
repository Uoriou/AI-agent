import anthropic
import os
from dotenv import load_dotenv


#Instantiate this in api.py 
class AssistedIntelligent:

    content = "" 
    language = ""
    block = []

    #Not used this time 
    def __init__(self,content:str):
        self.content = content

    def __init__(self,block:list,language:str):
        self.block = block
        self.language = language
        print("The constructor is valid")

    def ask(self):
        load_dotenv()
        MY_ENV_VAR = os.getenv("API_KEY")
        client = anthropic.Anthropic(
            api_key=MY_ENV_VAR
        )
        # TODO i have to factor in the block of text here as an argument
        if self.content:
            pass
        if len(self.block) != 0:
            chars = ""
            for i in self.block:
                chars+=i
            print(chars)
            
            response = client.messages.create(
                model="claude-haiku-4-5", 
                max_tokens=2000, #Adjust this however i want
                # TODO also allow users to select a language 
                system=f"You are supposed to translate the following sentences separated by the (,) into {self.language}. Be concise and ignore the [].",
                messages=[
                    {"role": "user", "content":chars}
                ]
            )
            return response.content[0].text
            
        return None
        
"""Instantiate it like the following -- >   
ai = AssistedIntelligent("Is coding good for the brain")
print(ai.ask())"""



