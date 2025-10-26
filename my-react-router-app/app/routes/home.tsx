import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatWidget from './components/chatWidget'
export default function Home() {


    const [count,setCount] = useState(0);
    const [hovered, setHovered] = useState(false);
    const [file,setFile] = useState<File | undefined>();
    function handleCount(e: React.MouseEvent<HTMLButtonElement>){
        setCount(count +1);
    }

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

    
    async function handleSubmit(e:React.SyntheticEvent){
        e.preventDefault();

        if (!file) {
            console.error('No file selected');
            return;
        }

        const fd = new FormData();
        fd.append("file", file);

        await axios.post('http://127.0.0.1:8000/translate/', fd, {
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
                {/*<div><button onClick={handleCount}>Welcome times! </button > {count}</div>*/}

                <div
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{ border: hovered ? "1px solid orange" : "none" }}>
                    <button><ChatWidget/></button>
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
