"use client";
import React, { useState } from "react";
import { GeneralChat } from "@chaingpt/generalchat";

function Chatbot() {
  const [chats, setChats] = useState([]);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (message.trim() === "") return;

    // Add user's message
    setChats((prev) => [...prev, { text: message, sender: "user" }]);
    setMessage("");

    // Add temporary loading message from bot
    const loadingId = Date.now(); // unique id for the loading message
    setChats((prev) => [
      ...prev,
      { id: loadingId, sender: "bot", loading: true },
    ]);

    try {
      const chat = new GeneralChat({
        apiKey: process.env.NEXT_PUBLIC_CHAINGPT_KEY,
      });

      const res = await chat.createChatBlob({
        question: message,
        chatHistory: "off",
      });

      // Replace loading message with bot response
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === loadingId
            ? { ...chat, text: res.data.bot, loading: false }
            : chat
        )
      );
    } catch (error) {
      console.error("Bot error:", error);
      // Replace loading with error
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === loadingId
            ? {
                ...chat,
                text: "Something went wrong. Please try again.",
                loading: false,
              }
            : chat
        )
      );
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {visible ? (
        <div className="w-[20rem] h-[48rem] bg-white rounded-xl shadow-xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-purple-600 text-white p-3 flex justify-between items-center">
            <h2 className="font-semibold text-lg">Recurx Bot</h2>
            <button
              onClick={() => setVisible(false)}
              className="text-white text-sm hover:text-gray-300"
            >
              ✕
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-white">
            {chats.length === 0 ? (
              <div className="text-gray-500 text-center mt-10">
                Start chatting...
              </div>
            ) : (
              chats.map((chat, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-md max-w-[80%] ${
                    chat.sender === "user"
                      ? "bg-blue-100 ml-auto text-right"
                      : `${chat.loading ? "bg-white" : "bg-slate-100"}`
                  }`}
                >
                  {chat.loading ? (
                    <img
                      className="w-20 h-12 bg-white"
                      src="https://media.tenor.com/53JWSqJt16QAAAAM/waiting-texting.gif"
                      alt="loading"
                    />
                  ) : (
                    <span className="">{chat.text}</span>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Chat Input */}
          <div className="p-2 border-t flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSend}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setVisible(true)}
          className="w-[4rem] h-[4rem] rounded-full bg-white shadow-md border flex items-center justify-center hover:scale-105 transition"
        >
          <img
            src="https://i.pinimg.com/originals/0c/67/5a/0c675a8e1061478d2b7b21b330093444.gif"
            alt="Recurx Bot"
            className="w-full h-full object-cover rounded-full"
          />
        </button>
      )}
    </div>
  );
}

export default Chatbot;
