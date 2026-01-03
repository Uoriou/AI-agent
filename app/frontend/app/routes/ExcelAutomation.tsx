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
        //json or form ? i think its form 
        if(!file) return;
        const formData = new FormData();
        formData.append("file",file)
        console.log("Sending to the backend")
        //Make sure the link is not 400 bad 
        await axios.post("http://localhost:8000/automate", formData, {
            headers: {
                "Content-Type":"multi-part/form-data",
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
                <p className="font-mono text-xl"> Chose an Excel file </p>
                <p className="text-sm text-gray-400 mt-2">
                    Click below to browse
                    <span className="ml-1 text-gray-500">
                        (.xlsx, .xls, .csv)
                    </span>
                </p>
                    <p>{file && <div>{file.name}</div>}</p>
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

                        <button
                            onClick={handleSubmit}
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

        </>
    )
}