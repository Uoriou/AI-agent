import { useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import ReactDOM from "react-dom/client";
import "../../modal.css";


type ModalProps = {

    className?: string;
    children: React.ReactNode;
    maxWidth?: number;
    onCloseRequest(): void;
    labelledBy: string;
    closeOnClickOutside?: boolean;
}

export const Modal = (data:ModalProps) => {
    // TODO Try to use useAtom somewhere
    const [portalNode, setPortalNode] = useState<HTMLDivElement | null>(null);
    //const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
    const { closeOnClickOutside = true } = data;
    useLayoutEffect(()=> {
        if (typeof document === "undefined") {
            return;
        }
        const container = document.getElementById("root") ?? document.body; // ? Should the container be the whole document or a div 
        const divCreated = document.createElement("div");
        divCreated.classList.add("excalidraw"); // Added parent css
        container.appendChild(divCreated);
        setPortalNode(divCreated);

        return () => {
            container.removeChild(divCreated);
        };
    },[])

       
    
    if (!portalNode){
        return null;
    } 
    // createPortal is a return value... Interesting
    //Return a React Portal instead of normal JSX"
    return createPortal(

        <div
            //className={"test"} 
            className = "Modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={data.labelledBy}
            /*style={{ // TODO the modal is not showing like the one in Excalidraw
                position: "fixed",
                top: 0,
                left: 0,
                width: "10vw",
                height: "10vh",
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                zIndex: 9999,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}*/
        >
            modal
            {data.children}
        <div
            className="Modal__background"
            onClick={closeOnClickOutside ? data.onCloseRequest : undefined}
        />
        <div
            className="Modal__content Island"
            style={{ "--max-width": `${data.maxWidth}px` } as React.CSSProperties}
            tabIndex={0}
        >
            {data.children}
        </div>
        </div>,
        portalNode
    );

   
}