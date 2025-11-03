import React, {useState,useEffect } from 'react';
import axios from 'axios';

type responseProps = {
    onReceive?:  (response:string[])=>void 
}
export default  function response({
    onReceive = ()=> undefined,
}:responseProps){
    //const[text,setText] = useState("");

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/answer', {
            headers: {
                "Content-Type":"application/json",
            },
        }).then( res => {
            console.log("Success",res.data.message);
            onReceive(res.data.message)
        }).catch(res =>{
            console.log("Failed to deliver the answer", res)
        })
    },[])
    

    return (
        <>  {/*Make it cool */}
            <p>Here is the response</p>
        </>
    )
}