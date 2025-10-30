import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import ChatInput from './components/ChatInput';
import ChatWidget from './components/chatWidget'

export default function Home() {


    const [count,setCount] = useState(0);
    const [hovered, setHovered] = useState(false);
    const [file,setFile] = useState<File | undefined>();
    const [text, setText] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

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

    async function handleTranslateButtonClicked(e:React.SyntheticEvent){
        e.preventDefault();

        await axios.post('http://127.0.0.1:8000/translate/sentence',  {
            headers: {
                'Content-Type': '/', //json
            },
        })
    }

    
    /*async function handleSubmitFile(e:React.SyntheticEvent){
        e.preventDefault();

        if (!file) {
            console.error('No file selected');
            return;
        }

        const fd = new FormData();
        fd.append("file", file);

        await axios.post('http://127.0.0.1:8000/translate/file', fd, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            console.log('Upload success', response.data);
        })
        .catch(error => {
            console.error('Upload error', error);
        });
    }*/

     const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
           
        }
    };
    return(
        <>
            
            <div style={{display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh',}}
            >
                <div>Welcome to my first AI agent project</div>
                <ChatInput placeholder = "Start typing here "onSend={() =>setText("Mario")}/>
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
                        onClick={handleTranslateButtonClicked}
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
