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
    if (error) console.error("Lỗi tải user:", error.message);
    else setUsers(data || []);
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
        position: "relative",
        backgroundColor: "#000",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        Danh sách thành viên
      </h1>

      {/* Danh sách user */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "flex-start",
        }}
      >
        {users.length === 0 ? (
          <p>Hiện chưa có thành viên nào.</p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                width: "200px",
                boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
                backgroundColor: "#000",
                transition: "transform 0.2s ease",
                color: "#fff",
                textAlign: "center",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-4px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <img
                src={user.avatar}
                alt={user.name}
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  objectFit: "cover",
                  height: "200px",
                }}
              />
              <h3 style={{ fontSize: "16px", marginBottom: "5px" }}>
                {user.name}
              </h3>
              <p style={{ fontSize: "13px", color: "#ccc" }}>
                Tuổi: {user.age}
              </p>
              <p style={{ fontSize: "13px", color: "#ccc" }}>{user.job}</p>
              <p style={{ fontSize: "12px", color: "orange" }}>{user.email}</p>
            </div>
          ))
        )}
      </div>

      {/* Form thêm user (hiện khi admin bấm nút +) */}
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
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
            Thêm thành viên
          </h3>
          <input
            type="text"
            placeholder="Tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "6px",
              marginBottom: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="number"
            placeholder="Tuổi"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "6px",
              marginBottom: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "6px",
              marginBottom: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            style={{
              width: "100%",
              padding: "6px",
              marginBottom: "10px",
            }}
          />
          <button
            onClick={handleAddUser}
            style={{
              width: "100%",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              padding: "8px",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Lưu
          </button>
        </div>
      )}

      {/* ✅ Nút dấu cộng nổi chỉ hiện nếu là admin */}
      {role === "admin" && (
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
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
            transition: "transform 0.2s ease, background-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.backgroundColor = "#0056b3";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.backgroundColor = "#007bff";
          }}
        >
          {showForm ? "×" : "+"}
        </button>
      )}
    </div>
  );
};

export default PageUsers;
