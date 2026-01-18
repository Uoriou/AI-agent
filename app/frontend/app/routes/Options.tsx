import React, { useEffect, useState } from 'react';

type childProps = {
    onComplete? :(isReady:string) => void;
}

export default function UserOptions({ 
    onComplete = (isReady:string)=> undefined, 
}: childProps) {
    
    function handleOptionChange(e:React.ChangeEvent<HTMLSelectElement>){
        
        onComplete(e.target.value);// replaced the boolean with the actual e.target.value
        console.log("Here " ,e.target.value);
        
    }
    
    return (
        <> {/*It was  (e)=> {handleOptionChange(e)}and that was really ok  */}
            <select onChange={handleOptionChange}>
                <option value="" disabled>Select the language</option>
                <option value="...">...</option> 
                <option value="Japanese">Japanese</option>
            </select>
            {}
        </>
    )
}