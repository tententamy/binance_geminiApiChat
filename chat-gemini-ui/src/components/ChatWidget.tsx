import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { sendMessage } from "../api";
import MessageBubble from "./MessageBubble";
import InputBox from "./InputBox";

type ChatMessage = {
  sender: "user" | "bot";
  text: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = async (msg: string) => {
    setMessages((prev) => [...prev, { sender: "user", text: msg }]);
    setLoading(true);

    try {
      const res = await sendMessage(msg);
      setMessages((prev) => [...prev, { sender: "bot", text: res.answer }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "❌ Lỗi server!" }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="relative">
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-blue-700 transition"
        >
          💬
        </button>
      )}

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-5 right-5 w-96 h-[500px] bg-white border rounded-2xl shadow-2xl flex flex-col">
          {/* Header */}
          <header className="bg-blue-700 text-white p-3 flex justify-between items-center rounded-t-2xl">
            <span className="font-bold">Gemini Chat</span>
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:text-gray-200 text-xl"
            >
              <X className="w-6 h-6 text-red-500 hover:text-red-700" />
            </button>
          </header>

          {/* Chat content */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((m, i) => (
              <MessageBubble key={i} sender={m.sender} text={m.text} />
            ))}

            {loading && (
              <div className="flex gap-2 items-center text-gray-500 italic mb-2">
                <span className="animate-pulse">Bot đang gõ...</span>
              </div>
            )}

            <div ref={chatEndRef}></div>
          </div>

          {/* Input */}
          <InputBox onSend={handleSend} loading={loading} />
        </div>
      )}
    </div>
  );
}
