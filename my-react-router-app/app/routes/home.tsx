import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import ChatInput from './components/ChatInput';
import ChatWidget from './components/chatWidget'

export default function Home() {

    const [file,setFile] = useState<File | undefined>();
    const [text, setText] = useState("");
  

    //Get the file / image from the input when on change event is triggered
    function handleOnChangeFile(e:React.FormEvent<HTMLInputElement>){
       
        const target = e.target as HTMLInputElement & {
            files: FileList;
        }
        if(target.files){
            console.log('File', target.files);
            setFile(target.files[0]);
        }
    }  
    
    return(
        <>
            
            <div style={{display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh',}}
            >
                <div>Welcome to my first AI agent project</div>
                <ChatInput placeholder = "Start typing here "/>
                    {text}
                <div>
                    <button 
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            padding: "10px 20px",
                        }}
                    >  
                    </button>
                </div>
                
                <div className="form-group">
                        
                    <label htmlFor="image">File</label>
                    <div className='col-image'>
                        <input type="file" id="image" onChange={handleOnChangeFile}/>
                    </div> 
                </div>

            </div>

            
             
            
        
        </>
    )
}
