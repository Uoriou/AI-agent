import React, { useEffect,useState } from 'react';
import { NavLink } from "react-router";
import ToolTip from './ToolTip';
import { Modal } from './components/Modal';
import {shareDialogStateAtom,MessageDialog} from './MessageDialog';
import {useAtom } from "jotai";
import { useCallback } from "react";
import '../app.css'

export default function Home() {

    const [open,setOpen] = useState<Boolean>(false);
    const [, setShareDialogState] = useAtom(shareDialogStateAtom);

    // Testing what this call back function does  -- > It actually works 
    const onDialogOpen = useCallback(
        
        () => setShareDialogState({ isOpen: true, type: "testing" }),
        [setShareDialogState],
    );
    const handleOpen = ()=>{
        console.log("Changing the state")
        setShareDialogState({ isOpen: true, type: "testing" })
    }
    return(
        <>  
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh"
                }}
            >
                
                 <NavLink to="/automation"end>
                    <ToolTip label= {"Click here to start "}>
                        Start Excel Automation... 
                    </ToolTip> 
                </NavLink>
                
                <ToolTip label= {"Click here to open a Modal"}>  
                    
                    <button onClick = {onDialogOpen}> {/*This used to open a modal */}
                        Click to open portal that floats over the DOM
                    </button>
                </ToolTip>
               

                {open && <Modal
                    className="test"
                    labelledBy="dialog-title"
                    maxWidth={500}
                    onCloseRequest={() => setOpen(false)}
                    closeOnClickOutside={true}
                >
                    <div>Testing</div>
                </Modal>
                } 

                <MessageDialog /> {/*Use of jotai, it is still conditionally rendered in MessageDialog.tsx */}
            </div>

       
        </>

    )
}
