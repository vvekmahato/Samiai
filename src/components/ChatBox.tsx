"use client";

import { useState } from "react";
import axios from "axios";
import { Message } from "@/types/chat";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (input: string) => {
    if (!input) return;

    const updated = [...messages, { role: "user" as const, content: input }];
    setMessages(updated);
    setLoading(true);

    const res = await axios.post("/api/chat", {
      messages: updated,
    });

    setMessages([
      ...updated,
      { role: "assistant" as const, content: res.data.reply },
    ]);

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">G</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Groq Assistant</h1>
        </div>
        <div className="text-xs text-green-500 font-medium flex items-center gap-1.5 bg-green-50 px-2 py-1 rounded-full border border-green-100">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Active
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 max-w-3xl mx-auto w-full">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-3 py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl">👋</div>
            <p className="text-lg font-medium text-gray-600">How can I help you today?</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} />
          ))
        )}
        {loading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-gray-200 text-gray-500 px-4 py-2 rounded-2xl rounded-tl-none text-sm">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <footer className="bg-white border-t p-4 pb-6 md:pb-8">
        <div className="max-w-3xl mx-auto w-full">
          <ChatInput onSend={sendMessage} loading={loading} />
        </div>
      </footer>
    </div>
  );
}