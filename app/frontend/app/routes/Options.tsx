import React, { useEffect, useState } from 'react';


type childProps = {
    onComplete? :(isReady:boolean) => boolean;
}

export default function userOptions({ 
    onComplete = ()=> true
}: childProps) {

    /*This becomes active when a file is uploaded */
    const [ready,setReady]  = useState(false);
    
    //change it to the returned value of onComplete
    return (
        <>
            <select>
                
                <option value="someOption">Some option</option>
                <option value="otherOption">Other option</option>
            </select>

        </>
    )
}