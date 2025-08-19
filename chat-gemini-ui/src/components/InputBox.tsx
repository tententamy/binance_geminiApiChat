import { useState } from "react";

type Props = {
  onSend: (msg: string) => void;
  loading?: boolean;
};

export default function InputBox({ onSend, loading }: Props) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <div className="flex gap-2 p-3 border-t bg-white">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border rounded-xl px-3 py-2 focus:outline-none"
        placeholder="Nhập câu hỏi..."
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        disabled={loading}
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "..." : "Gửi"}
      </button>
    </div>
  );
}
