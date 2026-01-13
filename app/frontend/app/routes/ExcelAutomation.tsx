import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import { NavLink } from "react-router";
import UserOptions from './Options';

/*
Excel file is dropped here 
*/

export default function ExcelAutomation(){

    const [file,setFile] = useState<File | undefined>();
    const [isReady,setIsReady]  = useState(false);
    const [language,setLanguage] = useState("");

    function handleOnChangeFile(e:React.FormEvent<HTMLInputElement>){
        const target = e.target as HTMLInputElement & {
            files: FileList;
        }
        if(target.files){
            console.log('File', target.files);
            setFile(target.files[0]);
        }
    }
    //There was an async and await pair, which is the modern way of writing
    function handleSubmit(){
        //json or form ? i think its form 
        if(!file) return;
        const formData = new FormData();
        formData.append("file",file)
        console.log("Sending to the backend")
        //Make sure the link is not 400 bad 
        axios.post("http://localhost:8000/automate", formData, {
            headers: {
                "Content-Type":"multi-part/form-data",
            },
        }).then( res => {
            console.log("Success",res);  
        }).catch(error =>{
           console.error("Upload failed", error); 
        })
    
    }

    return(
        <>
            <div style= {{display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh',
                gap: "24px" }}
            >
                <p className="font-mono text-xl"> 1, Chose an Excel file </p>
                <p className="text-sm text-gray-400 mt-2">
                    Click below to browse
                    <span className="ml-1 text-gray-500">
                        (.xlsx, .xls, .csv)
                    </span>
                </p>
                    {file && (
                        <div>
                            <p>Selected file: {file.name}</p>
                        </div>
                    )}

                    <div className="mt-4 flex items-center gap-3">
                        
                        <input
                            type="file"
                            id="excel"
                            accept=".xlsx,.xls,.csv"
                            onChange={(e) => {handleOnChangeFile(e);setIsReady(true);}}
                            className="hidden"
                        />
                       
                        <label
                            htmlFor="excel"
                            className="inline-flex items-center gap-2
                                    font-mono
                                    px-5 py-2.5
                                    rounded-xl
                                    bg-blue-600 text-white
                                    text-sm font-medium
                                    cursor-pointer
                                    shadow-sm
                                    transition
                                    hover:bg-blue-700
                                    active:scale-95"
                        >
                            Browse file
                        </label>
                        {/*The below code is the same as "handleSubmit" only */}
                        <button
                            onClick={() => {handleSubmit();}}
                            className="px-5 py-2.5
                                    font-mono
                                    rounded-xl
                                    border border-gray-300
                                    text-sm font-medium
                                    text-gray-700
                                    transition
                                    hover:bg-gray-100
                                    active:scale-95"
                           
                        >
                            Upload
                        </button>
                        
                </div>   
                    
            </div>

            <div style= {{display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh',
                gap: "24px" }}
            >{/*Get the language selection though props and store it into an useState ? */} 
                {isReady ? 
                    <div>
                        <p className="font-mono text-xl"> 2, Choose a language </p>
                        <UserOptions onComplete={setLanguage}/>
                       
                    </div>
                    :null 
                }
            </div> {language} 
            
        </>
    )
}