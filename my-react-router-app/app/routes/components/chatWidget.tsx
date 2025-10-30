import { useState} from "react";
import { FaExchangeAlt } from "react-icons/fa";

// Make a prop to receive the data 
export default function ChatWidget(text:any) {

    //console.log(text); 
    const [hovered, setHovered] = useState(false);

    return (
        <>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#FF8C00",
                    padding: "12px 24px",
                    borderRadius: "50px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    gap: "10px",
                    border: hovered ? "1px solid white" : "none" 
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                    
                <FaExchangeAlt size={20} color="white"/> 
                <span style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: "16px",
                    letterSpacing: "0.5px"
                }}>
                    
                    Translate
                </span>
                    
            </div> 
        </> 
    );
}


