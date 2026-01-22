import React, { useEffect, useState } from 'react';
/* This was initially for language selection but it is used for cell column selection*/
type childProps = {
    onComplete? :(isReady:string) => void;
}

export default function UserOptions({ 
    onComplete = (isReady:string)=> undefined, 
}: childProps) {
    const EXCEL_RANGE_REGEX = /^[A-Z]+[0-9]+(:[A-Z]+[0-9]+)?$/;
    const [range, setRange] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!EXCEL_RANGE_REGEX.test(range)) {
            setError("Invalid Excel range (e.g. C1 or A1:B10)");
            return;
        }
        else{
            setError(null); 
            console.log("Submitted range:", range);
            // send to backend here
        }
    }
      
    
    function handleOptionChange(e:React.ChangeEvent<HTMLSelectElement>){
        
        onComplete(e.target.value);// replaced the boolean with the actual e.target.value
        console.log("Here " ,e.target.value);
        
    }
    
    return (
        <> 

            <div style= {{display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh',
                gap: "24px" }}
            >
                <div>Select the part of excel cells to translate</div>
                {/*Vibe coded the form */}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="range" style={{ display: "block", marginBottom: 8 }}>
                        Excel cell range
                    </label>

                    <input
                        id="range"
                        type="text"
                        value={range}
                        onChange={(e) => setRange(e.target.value.toUpperCase())}
                        placeholder="e.g. A1:B10"
                        style={{ padding: 8, width: 220 }}
                    />

                    {error && (
                        <div style={{ color: "red", marginTop: 6 }}>
                        {error}
                        </div>
                    )}

                    <button type="submit" style={{ marginTop: 12 }}>
                        Submit
                    </button>
                </form>

            </div>
        </>
    )
}