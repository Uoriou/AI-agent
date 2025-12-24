import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Welcome } from "~/welcome/welcome";
import ExcelAutomation from "./ExcelAutomation";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// Probably this is not working 
module.exports = (
     <React.StrictMode>
        <HashRouter>
        <Routes>
            <Route path="/welcome" element={<Welcome/>} />
        </Routes>
        </HashRouter>
    </React.StrictMode>
)






         

        
   
