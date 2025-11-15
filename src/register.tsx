// src/Register.tsx
import React, { useState } from "react";
import { supabaseAdmin } from "./supabaseAdmin";
import { useNavigate, Link } from "react-router-dom";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabaseAdmin.from("account").insert([
      {
        username,
        email,
        password,
        role: "user",
      },
    ]);

    if (error) {
      setMessage("Lỗi khi đăng ký: " + error.message);
    } else {
      setMessage("Đăng ký thành công! Hãy đăng nhập.");
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Đăng ký</h2>
        {message && (
          <p className="text-sm text-center text-green-600">{message}</p>
        )}
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />
        <input
          type="email"
          placeholder="Địa chỉ email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
        >
          Đăng ký
        </button>
        <p className="text-sm text-center mt-3">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-500">
            Đăng nhập
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
