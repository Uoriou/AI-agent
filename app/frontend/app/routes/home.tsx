import React, { useEffect, useState,useRef } from 'react';
import ChatInput from './components/ChatInput';
import Response from './response';
import ExcelAutomation from './ExcelAutomation';
export default function Home() {

    const [prompted,setPrompted] = useState(false);
    const [answer, setAnswer] = useState<string[]>([]);
    
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
                {/*This also allows a child to pass data to a parent, if you add onSend(func)*/}
                <ChatInput placeholder = "Start typing here" onPromptChange={setPrompted} />
                {prompted && (
                    <>
                        <Response onReceive={setAnswer} />
                        <div>
                            {answer?.map((line: any, i: any) => (
                                <React.Fragment key={i}>
                                {line}
                                <br/>
                                </React.Fragment>
                            ))}
                        </div>
                    </>
                )}
            </div>   
        </>

    )
}
