"use client";

import { useState } from "react";

export default function ChatInput({
  onSend,
  loading,
}: {
  onSend: (msg: string) => void;
  loading: boolean;
}) {
  const [input, setInput] = useState("");

  return (
    <div className="flex gap-2 mt-4">
      <input
        className="flex-1 border p-2 rounded"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type message..."
      />

      <button
        onClick={() => {
          onSend(input);
          setInput("");
        }}
        disabled={loading}
        className="bg-black text-white px-4 rounded"
      >
        {loading ? "..." : "Send"}
      </button>
    </div>
  );
}