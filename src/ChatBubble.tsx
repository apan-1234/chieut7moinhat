import React, { useState, useEffect } from "react";
import ChatBox from "./ChatBox";

const ChatBubble: React.FC = () => {
  const [open, setOpen] = useState(false);

  // Tự mở chat sau 1 giây
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* BONG BÓNG CHAT */}
      {!open && (
        <div
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            right: 25,
            bottom: 100,
            width: 65,
            height: 65,
            borderRadius: "50%",
            background: "#1976d2",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            fontSize: 34,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            transition: "0.3s",
            zIndex: 9999,
          }}
        >
          💬
        </div>
      )}

      {/* KHUNG CHAT */}
      {open && (
        <div
          style={{
            position: "fixed",
            right: 25,
            bottom: 25,
            width: 340,
            height: 460,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
            overflow: "hidden",
            animation: "fadeUp 0.35s ease",
            zIndex: 9999,
          }}
        >
          {/* NÚT ĐÓNG */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              right: 10,
              top: 8,
              fontSize: 20,
              cursor: "pointer",
              zIndex: 10,
              color: "#fff",
            }}
          >
            ✖
          </div>

          <ChatBox />
        </div>
      )}

      {/* Animation CSS */}
      <style>
        {`
          @keyframes fadeUp {
            from { transform: translateY(40px); opacity: 0; }
            to   { transform: translateY(0px); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default ChatBubble;
