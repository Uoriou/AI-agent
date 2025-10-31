import React, { useState, useRef } from "react";
import ChatWidget from './chatWidget'
import sendBackend from "../SendBackend";

// This defines typescript type for props; what you pass into ChatInput component
//Props can be written in this way to move data across different components / files
// Although i really dont need it now
type ChatInputProps = {
    onSend?: (text: string) => void; //The input props type must be a function that takes a str and returns void or str
    placeholder?: string;
};

export default function ChatInput({
    onSend = (text) => undefined,
    placeholder = "",
}: ChatInputProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmedText = text.trim();
    if (!trimmedText) return;
    onSend(trimmedText);
    // Here probably handle Django request 
    sendBackend(trimmedText)
    console.log(trimmedText)
    //setText(trimmedText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
   
    <div className="w-full p-3 bg-transparent">
        {/*Textarea*/}
      <div className="max-w-3xl mx-auto flex items-end gap-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            className="
              w-full resize-none overflow-hidden 
              bg-white/95 text-gray-900 
              border border-gray-300 rounded-2xl 
              focus:border-blue-400 focus:ring-0 
              py-2 pl-3 pr-12 text-sm leading-relaxed outline-none
              placeholder-gray-500
            "
          />
          <button
            onClick={handleSend}
            disabled={!text.trim()}
          >
            <ChatWidget/>
          </button>
        </div>
      </div>
    </div>
  );
}


    
    

