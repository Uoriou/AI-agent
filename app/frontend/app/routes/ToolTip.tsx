import React, { useEffect } from 'react';
import '../app.css'

// Now this is modular
export const getTipDiv = ()=>{
    const existingDiv = document.querySelector<HTMLDivElement>(".gpthome-tooltip");
    if (existingDiv) {
        return existingDiv;
    }
    const div = document.createElement("div");
    document.body.appendChild(div);
    div.classList.add("gpthome-tooltip");
    return div;
}

export const updateTipDIv = (
    item: HTMLElement,
    tooltip: HTMLDivElement,
    label: string,
    long: boolean,
)=> {
    const rect = item.getBoundingClientRect();

    tooltip.classList.add("gpthome-tooltip--visible");
    tooltip.style.minWidth = long ? "50ch" : "10ch";
    tooltip.style.maxWidth = long ? "50ch" : "15ch";
    tooltip.style.left = `${rect.left + rect.width / 2}px`;
    tooltip.style.top = `${rect.top - 8}px`;
    tooltip.textContent = label;
}

type ToolTipProps = {
    children:React.ReactNode; //children means that this is a chile element and can have a parent component 
    label:string;
}

export default function ToolTip ({children,label}:ToolTipProps){

    useEffect(() => {
        //Clean up process to prevent memory leak 
        return () =>
          getTipDiv().classList.remove("gpthome-tooltip--visible");
        }, 
    []);

    return (
        <>
            <div
                onPointerEnter={(event) =>
                    updateTipDIv(
                        event.currentTarget as HTMLDivElement, 
                        getTipDiv(),
                        label,
                        false,
                    )
                }
                onPointerLeave={() =>
                    getTipDiv().classList.remove("gpthome-tooltip--visible")
                }
            >  
            {children}
            </div>
        </>
    )
}
