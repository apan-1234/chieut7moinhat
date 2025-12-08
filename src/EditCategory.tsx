import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      alert("Không tìm thấy danh mục!");
      navigate("/categories");
      return;
    }

    setName(data.name);
    setDescription(data.description || "");
    setLoading(false);
  };

  const updateCategory = async () => {
    setLoading(true);

    const { error } = await supabase
      .from("categories")
      .update({
        name,
        description,
      })
      .eq("id", id);

    setLoading(false);

    if (error) {
      alert("Cập nhật thất bại!");
    } else {
      alert("Cập nhật thành công!");
      navigate("/categories");
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "auto",
        background: "#111",
        padding: 20,
        borderRadius: 10,
        color: "#fff",
      }}
    >
      <h2>Sửa danh mục</h2>

      <label style={{ display: "block", marginTop: 15 }}>
        Tên danh mục:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginTop: 5,
            borderRadius: 6,
          }}
        />
      </label>

      <label style={{ display: "block", marginTop: 15 }}>
        Mô tả:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginTop: 5,
            borderRadius: 6,
            minHeight: 80,
          }}
        />
      </label>

      <button
        onClick={updateCategory}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          background: "orange",
          fontWeight: "bold",
          borderRadius: 6,
          border: "none",
          cursor: "pointer",
        }}
      >
        Lưu
      </button>

      <button
        onClick={() => navigate("/categories")}
        style={{
          marginLeft: 10,
          marginTop: 20,
          padding: "10px 20px",
          background: "#444",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: 6,
          border: "none",
          cursor: "pointer",
        }}
      >
        Hủy
      </button>
    </div>
  );
};

export default EditCategory;
