import React, { useEffect } from 'react';
import { NavLink } from "react-router";
import '../app.css'

// This div creation should be in a different file in a component just like in ToolTip in excalidraw
// to make this component usable 
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


export default function Home() {

    useEffect(() => {
    //Clean up process to prevent memory leak 
    return () =>
      getTipDiv().classList.remove("gpthome-tooltip--visible");
    }, []);

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
                <NavLink
                    to="/automation"
                    end
                    onPointerEnter={(event) =>
                        updateTipDIv(
                            event.currentTarget,
                            getTipDiv(),
                            "Click to proceed",
                            false,
                        )
                    }
                    onPointerLeave={() =>
                        getTipDiv().classList.remove("gpthome-tooltip--visible")
                    }
                >
                    Excel Automation
                </NavLink>
            </div>
       
        </>

    )
}
