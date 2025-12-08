import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

interface Category {
  id: number;
  name: string;
  description: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string>("guest");

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setRole(JSON.parse(user).role || "guest");
    }
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("id", { ascending: false });

    if (!error) setCategories(data || []);
    setLoading(false);
  };

  const deleteCategory = async (id: number) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa?")) return;

    const { error } = await supabase.from("categories").delete().eq("id", id);

    if (!error) {
      setCategories(categories.filter((c) => c.id !== id));
      alert("Đã xóa!");
    }
  };

  if (loading) return <p>Đang tải...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>Danh mục</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {categories.map((cate) => (
          <div
            key={cate.id}
            style={{
              padding: 15,
              width: 220,
              borderRadius: 10,
              background: "#000",
              color: "#fff",
              border: "1px solid #333",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/category/${cate.id}`)}
          >
            <h3 style={{ marginBottom: 5 }}>{cate.name}</h3>
            <p style={{ fontSize: 13, color: "#aaa" }}>{cate.description}</p>

            {role === "admin" && (
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/edit-category/${cate.id}`);
                  }}
                  style={{
                    flex: 1,
                    padding: 6,
                    background: "#ffc107",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Sửa
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteCategory(cate.id);
                  }}
                  style={{
                    flex: 1,
                    padding: 6,
                    background: "#dc3545",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  Xoá
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {role === "admin" && (
        <button
          onClick={() => navigate("/add-category")}
          style={{
            position: "fixed",
            bottom: 30,
            right: 30,
            width: 55,
            height: 55,
            borderRadius: "50%",
            background: "#28a745",
            color: "#fff",
            fontSize: 28,
            border: "none",
            cursor: "pointer",
          }}
        >
          +
        </button>
      )}
    </div>
  );
};

export default Categories;
