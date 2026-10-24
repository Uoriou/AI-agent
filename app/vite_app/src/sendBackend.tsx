import axios from 'axios';


export default async function sendBackend(text:string){

    console.log("Sending to the backend")
    const data = {
        sentence:text
    }
    const json = JSON.stringify(data)
    await axios.post('https://ai-agent-gywv.onrender.com/translate/sentence', json, {
        headers: {
            "Content-Type":"application/json",
        },
    }).then( res => {
        console.log("Success",res);
    }).catch(res =>{
        console.log("Failed to post it to the backend", res)
    })
    
}