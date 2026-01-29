import React, { useEffect, useState } from 'react';
/* This was initially for language selection but it is used for cell column selection*/
/* //!The props are not invoked for some reason in DoAutomation.tsx  */
// TODO move the entire code to FileUpload.tsx
type childProps = {
    onComplete?:(call:string) => void;
    disabled? :boolean;
}

export default function RangeForm({ onComplete,}: childProps) {
    const EXCEL_RANGE_REGEX = /^[A-Z]+[0-9]+(:[A-Z]+[0-9]+)?$/;
    const [range, setRange] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    // I can confirm that this is called 
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!EXCEL_RANGE_REGEX.test(range)) {
            setError("Invalid Excel range (e.g. C1 or A1:B10)");
            return;
        }
        setError(null); 
        onComplete?.(range);
    }

    function handleOnChangeCell(e:any){
        e.preventDefault();
        setRange(e.target.value.toUpperCase())
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
                <p className="font-mono text-xl"> 2, Select the part of excel cells to translate </p>
                <form onSubmit={handleSubmit}> {/* // ? handlesubmit maybe redundunt ? i can have a separate button ? */}
                    <label htmlFor="range" style={{ display: "block", marginBottom: 8 }}>
                        Excel cell range
                    </label>
                   {/* it was setrange()*/}
                        <input
                            id="range"
                            type="text"
                            value={range}
                            onChange={(e) => {handleOnChangeCell(e)}} 
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