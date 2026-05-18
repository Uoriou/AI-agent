import React, { useEffect } from 'react';
import { NavLink } from "react-router";
import ToolTip from './ToolTip';
import '../app.css'

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

    return(
        <>  {/* The commented out code works perfectly*/}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh"
                }}
            >
                {/*<NavLink
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
                </NavLink>*/}
                
                    <NavLink to="/automation"end>
                        <ToolTip label= {"Click here to start "}>
                            Start Excel Automation... 
                        </ToolTip> 
                    </NavLink>
               
                
            </div>
       
        </>

    )
}
