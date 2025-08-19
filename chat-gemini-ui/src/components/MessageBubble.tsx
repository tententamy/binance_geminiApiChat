import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  sender: "user" | "bot";
  text: string;
};

export default function MessageBubble({ sender, text }: Props) {
    const isUser = sender === "user";
  return (
    <div className={`flex items-start gap-2 mb-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {/* Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
          🤖
        </div>
      )}

      <div
        className={`max-w-md px-4 py-2 rounded-2xl shadow-md ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-200 text-gray-900 rounded-bl-none"
        }`}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {text}
        </ReactMarkdown>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          👤
        </div>
      )}
    </div>
  );
}
