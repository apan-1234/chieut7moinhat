import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login"); // Nếu chưa đăng nhập → chuyển về login
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Xin chào, <span className="text-blue-600">{user.username}</span> 👋
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Đăng xuất
        </button>
      </div>
        <h2 className="text-xl font-semibold mb-3">Trang chủ</h2>
        <p>
          <strong>Vai trò hiện tại:</strong>{" "}
          <span className="text-green-600 font-semibold">{user.role}</span>
        </p>
    </div>
  );
};

export default Home;
