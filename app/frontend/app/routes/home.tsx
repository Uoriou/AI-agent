import React, { useEffect, useState,useRef } from 'react';
import { NavLink } from "react-router";

export default function Home() {
    
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
                <NavLink to="/excel" end>
                    Excel Automation
                </NavLink>
            </div>
       
        </>

    )
}
