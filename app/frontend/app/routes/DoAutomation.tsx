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
        //TODO  This might affect the backend logic, so double check this 
        const formData = new FormData();
        if(file && range) {
            setError(null); 
            formData.append("file",file);
            formData.append("cell",range);
            console.log("Translating")
        }
        /*try{
            axios.post("http://localhost:8000/automate", formData, {
            headers: {
                "Content-Type":"multi-part/form-data",
            },
            }).then( res => {
                console.log("Success",res); 
                setTranslate(true); 
            }).catch((res)=>{
                console.error("Error")
            })

        }catch{
            alert("Sorry something went wrong with the file selection")
        }*/
    
    }

    return (

        <>
            <div style= {{display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh',
            }}>

                {/*Get the formData through the props */}
            
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <FileInput onSelect={handleFile}/>
                    <p className="font-mono text-xl"> 2, Select the part of excel cells to translate </p>
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


                    {translate  && 
                        <button type="submit" style={{ marginTop: 12 }}>
                            Submit
                        </button> 
                    }
                    
                </form>

               
            
            </div>  
        </>
    )
}