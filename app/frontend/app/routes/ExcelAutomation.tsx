import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
/*
Excel file is dropped here 
*/

export default function ExcelAutomation(){

    const [file,setFile] = useState<File | undefined>();

    function handleOnChangeFile(e:React.FormEvent<HTMLInputElement>){
        const target = e.target as HTMLInputElement & {
            files: FileList;
        }
        if(target.files){
            console.log('File', target.files);
            setFile(target.files[0]);
        }
    }

    async function handleSubmit(){
        //json or form ? 
        if(!file) return;
        console.log("Sending to the backend")
        const data = {
            sentence:file
        }
        const json = JSON.stringify(data)
        await axios.post('http://127.0.0.1:8000/automate', json, {
            headers: {
                "Content-Type":"application/json",
            },
        }).then( res => {
            console.log("Success",res);
        }).catch(res =>{
            console.log("Failed to post it to the backend", res)
        })
    
    }

    return(
        <>
            <div style= {{display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh',}}
            >
               <div className="text-4xl font-extrabold text-transparent bg-clip-text
                                bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
                   Chose an Excel file 
                </div>
 
                <p className="text-sm text-gray-400 mt-2">
                    Click below to browse
                    <span className="ml-1 text-gray-500">
                        (.xlsx, .xls, .csv)
                    </span>
                </p>

                    <div className="mt-4 flex items-center gap-3">
                        
                        <input
                            type="file"
                            id="excel"
                            accept=".xlsx,.xls,.csv"
                            onChange={handleOnChangeFile}
                            className="hidden"
                        />

                        <label
                            htmlFor="excel"
                            className="inline-flex items-center gap-2
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

                        <button
                            onClick={handleSubmit}
                            className="px-5 py-2.5
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

        </>
    )
}