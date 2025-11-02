import anthropic
import os
from dotenv import load_dotenv

"""
Project idea 
Translate letters written in German into English
"""

#Instantiate this in api.py 
class AssistedIntelligent:

    content = "" 

    def __init__(self,content:str):
        self.content = content

    def ask(self):
        load_dotenv()
        MY_ENV_VAR = os.getenv("API_KEY")
        client = anthropic.Anthropic(
            api_key=MY_ENV_VAR
        )

        response = client.messages.create(
            model="claude-haiku-4-5", 
            max_tokens=2000, #Adjust this however i want
            messages=[
                {"role": "user", "content":self.content}
            ]
        )
        #print(response.content[0].text)  
        return response.content[0].text 

"""Debugging purpose -- >   
ai = AssistedIntelligent("Is coding good for the brain")
print(ai.ask())"""



