import { useState} from "react";
import { BsFillChatFill } from "react-icons/bs";

function ChatWidget() {

    return (
        <div>
        {/* Chat Button Component */}
            <div>
            {/* Inner Container */}
                <div
                    style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    }}
                >
                    <BsFillChatFill size={20} color="white" />
                    {/* Button Text */}
                    <span >Chat Now!!</span>
                </div>
            </div>
        </div>
    );
}

export default ChatWidget;
