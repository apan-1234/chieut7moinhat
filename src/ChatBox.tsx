import React, { useState } from "react";

interface Message {
  role: "user" | "bot";
  content: string;
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);

    const userText = input;
    setInput("");

    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=API_KEY_CUA_BAN",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: userText }] }],
          }),
        }
      );

      const data = await res.json();
      const botText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Xin lỗi, tôi không thể trả lời câu hỏi này.";

      const botMsg: Message = { role: "bot", content: botText };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "❌ Lỗi kết nối API!" },
      ]);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "white",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "#1976d2",
          color: "white",
          padding: "12px",
          fontSize: 18,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        🤖 Chat AI (Gemini)
      </div>

      {/* BODY */}
      <div
        style={{
          flex: 1,
          padding: 12,
          overflowY: "auto",
          background: "#f3f6f9",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              marginBottom: 10,
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "75%",
                padding: "10px 14px",
                borderRadius: 16,
                color: msg.role === "user" ? "#fff" : "#333",
                background:
                  msg.role === "user" ? "#1976d2" : "rgba(0,0,0,0.08)",
                fontSize: 14,
                lineHeight: "20px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div
        style={{
          padding: 10,
          borderTop: "1px solid #ddd",
          display: "flex",
          gap: 10,
          background: "#fff",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập câu hỏi..."
          style={{
            flex: 1,
            padding: "10px 12px",
            border: "1px solid #ccc",
            borderRadius: 20,
            outline: "none",
            fontSize: 14,
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            padding: "0px 18px",
            borderRadius: 20,
            border: "none",
            background: "#1976d2",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
