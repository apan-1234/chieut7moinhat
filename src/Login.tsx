// src/Login.tsx
import React, { useState } from "react";
import { supabase } from "./supabaseClient"; // <-- dùng anon client
import { useNavigate, Link } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("account") // <-- thường dùng lowercase table name
        .select("*")
        .eq("username", username)
        .maybeSingle();

      if (error) {
        console.error("Supabase query error:", error);
        setError("Lỗi khi truy vấn dữ liệu (xem console).");
        setLoading(false);
        return;
      }

      if (!data) {
        setError("Tài khoản không tồn tại!");
        setLoading(false);
        return;
      }

      if (data.password !== password) {
        setError("Sai mật khẩu!");
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (err: any) {
      console.error("Unexpected error during login:", err);
      setError("Lỗi hệ thống, vui lòng thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h2>
        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
        )}
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full border p-2 mb-3 rounded"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border p-2 mb-4 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 rounded ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
        <p className="text-sm text-center mt-3">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-500">
            Đăng ký
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
