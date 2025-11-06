// src/PageUsers.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { supabaseAdmin } from "./supabaseAdmin";

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

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("id", { ascending: false });
    if (error) {
      console.error("Lỗi tải user:", error.message);
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  const handleAddUser = async () => {
    if (!name || !email || !file) {
      alert("Vui lòng điền đủ thông tin và chọn ảnh.");
      return;
    }
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } =
        await supabaseAdmin.storage.from("users").upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data: avatarData } = supabaseAdmin.storage
        .from("users")
        .getPublicUrl(fileName);
      const avatarUrl = avatarData.publicUrl;

      const { error: insertError } = await supabaseAdmin
        .from("users")
        .insert([{ name, age, job: "Rapper", email, avatar: avatarUrl }]);
      if (insertError) throw insertError;

      // reset form
      setName("");
      setAge(18);
      setEmail("");
      setFile(null);
      setShowForm(false);
      fetchUsers();
    } catch (err: any) {
      alert("Lỗi thêm user: " + err.message);
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Đang tải dữ liệu...</p>;

  // Styles
  const containerStyle: React.CSSProperties = {
    padding: "20px",
    minHeight: "100vh",
    backgroundColor: "#111",
    color: "#fff",
  };
  const gridStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "flex-start",
  };
  const cardStyle: React.CSSProperties = {
    border: "1px solid #444",
    borderRadius: "8px",
    padding: "15px",
    width: "220px",
    textAlign: "center",
    backgroundColor: "#000",
    color: "#fff",
    transition: "transform 0.2s ease",
    cursor: "pointer",
  };
  const cardImageStyle: React.CSSProperties = {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "10px",
  };
  const addButtonStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "55px",
    height: "55px",
    fontSize: "28px",
    fontWeight: "bold",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    cursor: "pointer",
  };
  const formModalStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "100px",
    right: "30px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    zIndex: 1000,
    color: "#000",
    width: "300px",
  };
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px",
    margin: "8px 0",
    boxSizing: "border-box",
  };
  const buttonStyle: React.CSSProperties = {
    padding: "10px 15px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  };

  return (
    <div style={containerStyle}>
      <h1>The UnderDog</h1>

      {users.length === 0 ? (
        <p>Hiện chưa có thành viên nào.</p>
      ) : (
        <div style={gridStyle}>
          {users.map((user) => (
            <div
              key={user.id}
              style={cardStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-4px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <img src={user.avatar} alt={user.name} style={cardImageStyle} />
              <h3>{user.name}</h3>
              <p>Tuổi: {user.age}</p>
              <p>{user.job}</p>
              <p style={{ color: "skyblue", fontSize: "0.9em" }}>
                {user.email}
              </p>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div style={formModalStyle}>
          <h3>Thêm thành viên</h3>
          <input
            style={inputStyle}
            placeholder="Tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            style={inputStyle}
            type="number"
            placeholder="Tuổi"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />
          <input
            style={inputStyle}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={inputStyle}
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <button style={buttonStyle} onClick={handleAddUser}>
            Lưu thành viên
          </button>
        </div>
      )}

      <button style={addButtonStyle} onClick={() => setShowForm(!showForm)}>
        {showForm ? "×" : "+"}
      </button>
    </div>
  );
};

export default PageUsers;
