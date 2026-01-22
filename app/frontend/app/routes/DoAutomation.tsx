import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router";
import RangeForm from './CellRangeForm';
import FileInput from './FileUpload'

/*Top level parent component of a cell range input and a file upload */

export default function DoAutomation(){
    
    const[test,setTest] = useState("None"); //Change it to boolean i guess 
    const navigate = useNavigate();

    return (

        <>
            <div style= {{display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh',
                gap: "24px" }}
            >

                {/*Get the formData through the props */}
                <FileInput onSelect={setTest}/>
                {test && <button onClick={()=>{
                        navigate("/options")
                    }}>Oi</button>} {/*Nice it works ! */}
                
            </div>
            
        </>
    )
}