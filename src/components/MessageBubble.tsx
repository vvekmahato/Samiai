import { Message } from "@/types/chat";

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} group`}>
      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[85%]`}>
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1 px-1">
          {isUser ? "You" : "Assistant"}
        </span>
        <div
          className={`px-4 py-2.5 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed ${
            isUser
              ? "bg-blue-600 text-white rounded-tr-none"
              : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
          }`}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
}