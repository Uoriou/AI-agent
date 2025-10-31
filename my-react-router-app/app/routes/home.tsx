import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import ChatInput from './components/ChatInput';
import ChatWidget from './components/chatWidget'

export default function Home() {

    const [file,setFile] = useState<File | undefined>();
    const [text, setText] = useState("");

    return(
        <>
            <div style={{display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh',}}
            >
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                    Welcome to my AI Translate Agent
                </div>

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
            </div>    
        </>
    )
}
