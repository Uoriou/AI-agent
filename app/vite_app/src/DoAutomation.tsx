import React, { useEffect, useState,useRef, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router";
import RangeForm from './CellRangeForm';
import FileInput from './FileUpload'

/*Top level parent component of a cell range input and a file upload */

export default function DoAutomation(){
    
    const [file,setFile] = useState<File>(); 
    const [cell,setCell] = useState<string>("");
    const [received,setReceived] = useState<boolean>(false);
    const [translate,setTranslate] = useState<boolean>(false);
    const EXCEL_RANGE_REGEX = /^[A-Z]+[0-9]+(:[A-Z]+[0-9]+)?$/;
    const [range, setRange] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success,setSuccess] = useState<boolean>(false);
    const [isNotSuccess,setIsNotSuccess] = useState<boolean>(false);
    const [isTranslated,setIsTranslated] = useState<boolean>(false)
    
    const handleFile = (data:File)=>{
        setFile(data); // Parent and child data communication
        console.log(data.name)
        setReceived(true); //Render controller
    }

    function handleOnChangeCell(e:any){
        e.preventDefault();
        setRange(e.target.value.toUpperCase())
        setTranslate(true); 
    }

    function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        if(!file && !range){
            console.log("Both missing")
            return;
        }
         
        if (!EXCEL_RANGE_REGEX.test(range)) {
            setError("Invalid Excel range (e.g. C1 or A1:B10)");
            return;
        }
        
        if(!range){
            // ! cell is missing 
            console.log("Cell is missing ")
            return;
        }
        const formData = new FormData();
        if(file && range) {
            setError(null); 
            formData.append("file",file);
            formData.append("cell_range",range);
            console.log("Translating")
        }
        try{
            axios.post("http://localhost:8000/automate", formData, {
            headers: {
                "Content-Type":"multi-part/form-data",
            },
            }).then( res => {
                console.log("Setting success to true");
                setSuccess(true); 
                if (res.status == 200){
                    setIsTranslated(true)
                }
            }).catch((res)=>{
                console.error("Error", res)
                // TODO do a proper error validation 
                setIsNotSuccess(true); 
            })

        }catch{
            alert("Sorry something went wrong with the file selection")
        }
    }

    return (
        <>    
                {/*Get the formData through the props */}
            
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div 
                        className="flex justify-center items-center gap-8 min-h-screen"
                    >
                        <div className="w-1/2 font-mono">
                            <FileInput onSelect={handleFile}/>
                        </div >
                        <div className="w-1/2">

                            <p className="font-mono text-xl"> 2, Select the part of excel cells to translate </p>
                            <label htmlFor="range" style={{ display: "block", marginBottom: 8 }}>
                                Excel cell range
                            </label>
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

                            {translate  && 
                                <button 
                                    type="submit" 
                                    className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-mono rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                                >
                                    Submit
                                </button> 
                            }
                        </div>

                    </div>  
                </form> 
                
                <div className="fixed top-4 left-4 flex flex-col gap-2">
                    {success &&
                        <div role="alert" className="flex p-3 pr-12 text-sm text-white bg-green-600 rounded-md max-w-md relative">
                            File Submitted Successfully
                            <button className="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-1.5 right-1.5" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    }

                    {isNotSuccess && 
                        <div role="alert" className="flex p-3 pr-12 text-sm text-white bg-red-600 rounded-md max-w-md relative">
                            File is not submitted
                            <button className="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-1.5 right-1.5" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    }

                    {isTranslated && 
                        <div role="alert" className="flex p-3 pr-12 text-sm text-white bg-green-600 rounded-md max-w-md relative">
                            Translated 
                            <button className="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-1.5 right-1.5" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    }
                </div>
              
        </>
    )
}