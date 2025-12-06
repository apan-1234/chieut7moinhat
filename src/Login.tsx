import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate, Link } from "react-router-dom";
import bcrypt from "bcryptjs";

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
        .from("account")
        .select("*")
        .eq("username", username)
        .maybeSingle();

      if (error) {
        setError("❌ Lỗi khi kết nối database.");
        setLoading(false);
        return;
      }

      if (!data) {
        setError("❌ Tài khoản không tồn tại!");
        setLoading(false);
        return;
      }

      // 🔐 So sánh mật khẩu HASH
      const match = await bcrypt.compare(password, data.password);

      if (!match) {
        setError("❌ Sai mật khẩu!");
        setLoading(false);
        return;
      }

      // ✔ Lưu session
      localStorage.setItem("user", JSON.stringify(data));
      window.dispatchEvent(new Event("userUpdated"));

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("❌ Lỗi hệ thống.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="
          w-96 p-6 rounded-xl border border-white/30 
          bg-white/10 backdrop-blur-md shadow-xl text-white
        "
      >
        <h2 className="text-2xl font-bold text-center mb-4">Đăng nhập</h2>

        {error && <p className="text-center mb-3 text-red-400">{error}</p>}

        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-2 mb-3 bg-black/40 border border-white/40 rounded text-white"
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-4 bg-black/40 border border-white/40 rounded text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="
            w-full py-2 rounded bg-white/20 border border-white/40 
            hover:bg-white/30 transition
          "
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        <p className="text-sm text-center mt-3">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-300 underline">
            Đăng ký
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
