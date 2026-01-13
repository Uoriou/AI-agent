import React, { useEffect, useState } from 'react';

type childProps = {
    onComplete? :(isReady:string) => void;
}

export default function UserOptions({ 
    onComplete = (isReady:string)=> console.log(isReady), 
}: childProps) {
    
    const [language,setLanguage]  =useState("");
    function handleOptionChange(e:React.ChangeEvent<HTMLSelectElement>){
        
        const value = e.target.value;
        if (value !== "null") {
            setLanguage(value);
            console.log("OK");
        } 
            //onComplete(target.language);// replaced the boolean with the actual e.target.value
        
    }
    
    return (
        <> {/*It was onComplete(e.target.value) and that was really ok  */}
            <select onChange={(e)=> {handleOptionChange(e)}}>
                
                <option value="Japanese">Japanese</option>
                <option value="null">...</option>
            </select>
        </>
    )
}