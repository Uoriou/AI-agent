import React, {useState,useRef } from 'react';
import axios from 'axios';


type responseProps = {
    onReceive?:  (response:string)=>void 
}
export default async function response({
    onReceive = ()=> undefined,
}:responseProps){

    await axios.post('http://127.0.0.1:8000/answer', {
        headers: {
            "Content-Type":"application/json",
        },
    }).then( res => {
        console.log("Success",res);
        onReceive(res.data)
    }).catch(res =>{
        console.log("Failed to deliver the answer", res)
    })

    return (
        <>
            <p>Here is the response</p>  
        </>
    )
}