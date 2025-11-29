// src/PageUsers.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { supabaseAdmin } from "./supabaseAdmin";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  age: number;
  job: string;
  email: string;
  avatar: string;
}

const PageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(18);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const role = currentUser?.role || "user";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("id", { ascending: false });

    if (!error) setUsers(data || []);
    setLoading(false);
  };

  const handleAddUser = async () => {
    if (!name || !email || !file) {
      alert("Vui lòng điền đủ thông tin và chọn ảnh.");
      return;
    }

    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabaseAdmin.storage
        .from("users")
        .upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data: avatarData } = supabaseAdmin.storage
        .from("users")
        .getPublicUrl(fileName);

      const { error: insertError } = await supabaseAdmin.from("users").insert([
        {
          name,
          age,
          job: "Rapper",
          email,
          avatar: avatarData.publicUrl,
        },
      ]);

      if (insertError) throw insertError;

      setShowForm(false);
      setName("");
      setAge(18);
      setEmail("");
      setFile(null);
      fetchUsers();
    } catch (err: any) {
      alert("Lỗi thêm user: " + err.message);
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#000",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        Danh sách thành viên
      </h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {users.length === 0 ? (
          <p>Hiện chưa có thành viên nào.</p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              onClick={() => navigate(`/users/${user.id}`)}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                width: "200px",
                backgroundColor: "#000",
                color: "#fff",
                cursor: "pointer",
                textAlign: "center",
                transition: "0.2s",
              }}
            >
              <img
                src={user.avatar}
                alt={user.name}
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  height: "200px",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
              <h3>{user.name}</h3>
              <p style={{ color: "#ccc" }}>Tuổi: {user.age}</p>
              <p style={{ color: "#ccc" }}>{user.job}</p>
              <p style={{ color: "orange" }}>{user.email}</p>
            </div>
          ))
        )}
      </div>

      {/* Form thêm user */}
      {showForm && role === "admin" && (
        <div
          style={{
            position: "fixed",
            bottom: "110px",
            right: "30px",
            backgroundColor: "#fff",
            color: "#000",
            padding: "15px",
            borderRadius: "8px",
            width: "260px",
          }}
        >
          <h3 style={{ textAlign: "center" }}>Thêm thành viên</h3>

          <input
            type="text"
            placeholder="Tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", marginBottom: "8px" }}
          />

          <input
            type="number"
            placeholder="Tuổi"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            style={{ width: "100%", marginBottom: "8px" }}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", marginBottom: "8px" }}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            style={{ width: "100%", marginBottom: "8px" }}
          />

          <button
            onClick={handleAddUser}
            style={{
              width: "100%",
              backgroundColor: "#28a745",
              color: "#fff",
              padding: "8px",
              borderRadius: "4px",
            }}
          >
            Lưu
          </button>
        </div>
      )}

      {role === "admin" && (
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            width: "55px",
            height: "55px",
            borderRadius: "50%",
            backgroundColor: "#007bff",
            color: "#fff",
            fontSize: "28px",
          }}
        >
          {showForm ? "×" : "+"}
        </button>
      )}
    </div>
  );
};

export default PageUsers;
