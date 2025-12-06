// src/Register.tsx
import React, { useState } from "react";
import { supabaseAdmin } from "./supabaseAdmin";
import { useNavigate, Link } from "react-router-dom";
import bcrypt from "bcryptjs";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      // 🔐 Hash mật khẩu trước khi lưu vào DB
      const hashedPassword = await bcrypt.hash(password, 10);

      const { error } = await supabaseAdmin.from("account").insert([
        {
          username,
          email,
          password: hashedPassword,
          role: "user",
        },
      ]);

      if (error) {
        setMessage("❌ Lỗi khi đăng ký: " + error.message);
      } else {
        setMessage("✅ Đăng ký thành công! Đang chuyển hướng...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setMessage("❌ Lỗi hệ thống, vui lòng thử lại!");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="
          w-96 p-6 rounded-xl border border-white/30 
          bg-white/10 backdrop-blur-md shadow-xl text-white
        "
      >
        <h2 className="text-2xl font-bold text-center mb-4">Đăng ký</h2>

        {message && (
          <p className="text-center mb-3 text-green-400">{message}</p>
        )}

        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-2 mb-3 bg-black/40 border border-white/40 rounded text-white"
        />

        <input
          type="email"
          placeholder="Địa chỉ email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-3 bg-black/40 border border-white/40 rounded text-white"
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-3 bg-black/40 border border-white/40 rounded text-white"
        />

        <button
          type="submit"
          className="
            w-full py-2 rounded bg-white/20 border border-white/40 
            hover:bg-white/30 transition
          "
        >
          Đăng ký
        </button>

        <p className="text-sm text-center mt-3">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-300 underline">
            Đăng nhập
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
