import { useState} from "react";
import { BsFillChatFill } from "react-icons/bs";

function ChatWidget() {

    return (
        <div>
            {/* Inner Container */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#FF8C00",
                    padding: "12px 24px",
                    borderRadius: "50px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    gap: "10px"
                }}
            >
                <BsFillChatFill size={20} color="white" />
                {/* Button Text */}
                <span style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: "16px",
                    letterSpacing: "0.5px"
                }}>
                    Ask anything
                </span>
            </div>
        </div>
    );
}

export default ChatWidget;
