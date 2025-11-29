import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { supabaseAdmin } from "./supabaseAdmin";
import { useParams, useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  age: number;
  job: string;
  email: string;
  avatar: string;
}

const UserDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("guest");

  // Form sửa user
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(0);
  const [job, setJob] = useState("");
  const [email, setEmail] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    const userLocal = localStorage.getItem("user");
    if (userLocal) setRole(JSON.parse(userLocal).role);
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) console.error(error);
    else {
      setUser(data);
      setName(data.name);
      setAge(data.age);
      setJob(data.job);
      setEmail(data.email);
    }

    setLoading(false);
  };

  const handleUpdate = async () => {
    try {
      let avatarUrl = user?.avatar;

      // Có upload file mới thì update ảnh
      if (avatarFile) {
        const fileName = `${Date.now()}_${avatarFile.name}`;
        const { error: uploadErr } = await supabaseAdmin.storage
          .from("users")
          .upload(fileName, avatarFile);

        if (uploadErr) throw uploadErr;

        const { data } = supabaseAdmin.storage
          .from("users")
          .getPublicUrl(fileName);

        avatarUrl = data.publicUrl;
      }

      const { error } = await supabaseAdmin
        .from("users")
        .update({
          name,
          age,
          job,
          email,
          avatar: avatarUrl,
        })
        .eq("id", id);

      if (error) throw error;

      alert("Cập nhật thành công!");
      setEditMode(false);
      fetchUser();
    } catch (err: any) {
      alert("Lỗi cập nhật: " + err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Bạn có chắc muốn xoá thành viên này?")) return;

    const { error } = await supabaseAdmin.from("users").delete().eq("id", id);

    if (error) alert("Lỗi xoá: " + error.message);
    else {
      alert("Đã xoá thành viên!");
      navigate("/users");
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (!user) return <p>Không tìm thấy thành viên.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "20px" }}>
        ← Quay lại
      </button>

      <div style={{ display: "flex", gap: "20px" }}>
        {/* Ảnh avatar */}
        <div style={{ position: "relative" }}>
          <img
            src={user.avatar}
            alt={user.name}
            style={{
              width: "350px",
              height: "350px",
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Nội dung */}
        <div>
          {!editMode ? (
            <>
              <h1>{user.name}</h1>

              <p style={{ fontSize: "15px", color: "#ccc" }}>
                Tuổi: {user.age}
              </p>

              <p style={{ fontSize: "15px", color: "#ccc" }}>{user.job}</p>

              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "orange",
                }}
              >
                {user.email}
              </p>

              {role === "admin" && (
                <div
                  style={{ marginTop: "20px", display: "flex", gap: "10px" }}
                >
                  <button
                    onClick={() => setEditMode(true)}
                    style={{
                      padding: "10px 15px",
                      background: "#007bff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Chỉnh sửa
                  </button>

                  <button
                    onClick={handleDelete}
                    style={{
                      padding: "10px 15px",
                      background: "red",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Xóa
                  </button>
                </div>
              )}
            </>
          ) : (
            // ===== FORM SỬA =====
            <>
              <h2>Chỉnh sửa thành viên</h2>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tên"
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "8px",
                }}
              />

              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                placeholder="Tuổi"
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "8px",
                }}
              />

              <input
                type="text"
                value={job}
                onChange={(e) => setJob(e.target.value)}
                placeholder="Nghề nghiệp"
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "8px",
                }}
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "8px",
                }}
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                style={{ width: "100%", marginBottom: "10px" }}
              />

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={handleUpdate}
                  style={{
                    padding: "10px 15px",
                    background: "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Lưu
                </button>

                <button
                  onClick={() => setEditMode(false)}
                  style={{
                    padding: "10px 15px",
                    background: "gray",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Hủy
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
