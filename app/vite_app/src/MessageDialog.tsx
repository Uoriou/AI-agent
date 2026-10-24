import { useEffect, useRef, useState } from "react";
import { atom, useAtom, useAtomValue } from "jotai"; 


type ShareDialogType = "share" | "collaborationOnly" | "testing"; //  Testing the pop up type


export type DialogProps = {
  
  handleClose: () => void;
  type: ShareDialogType;
};


export const shareDialogStateAtom = atom<
  { isOpen: false } | { isOpen: true; type: ShareDialogType }
>({ isOpen: false });


const DialogDescription = (data:DialogProps)=>{
    // TODO Do something with the passed props 
    return (
        <>
            <div>You dont know how to use it ? You must be dumb</div>
        </>
    )
 }  
// If you want a props with destructuring, write this {handleClose,type}:DialogProps
// If you want to use the props with manual accessing, just pass in a obj var and access it like you would normally do
const DialogInner = (data:DialogProps) => {

    return (
        <>
            <div>
                ohhhhh
            </div>
            {/*<Dialog size="small" onCloseRequest={data.handleClose} title={false}>
                
                <DialogDescription { ...data}/>
            //</Dialog>*/}
            
        </>
        
    )

}

export const MessageDialog  = () =>{

    const [shareDialogState, setShareDialogState] = useAtom(shareDialogStateAtom); //useAtom
    return (

        <>
            {shareDialogState.isOpen && shareDialogState.type === "testing" ? 
            
            <div>{shareDialogState.type}</div>:<div>NONONO bro</div>}

            {/*<DialogInner 

                handleClose={() => setShareDialogState({ isOpen: false })}
                type={shareDialogState.type}
            />*/}

            
        </>
       
    )
}