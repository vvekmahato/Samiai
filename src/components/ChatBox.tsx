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
    <div className="flex flex-col h-screen p-4">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}
      </div>

      <ChatInput onSend={sendMessage} loading={loading} />
    </div>
  );
}