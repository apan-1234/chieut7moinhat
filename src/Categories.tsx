import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

interface Category {
  id: number;
  name: string;
  image: string;
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
      const parsedUser = JSON.parse(user);
      setRole(parsedUser.role || "guest");
    }
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("id", { ascending: false });

    if (error) console.error(error.message);
    else setCategories(data || []);

    setLoading(false);
  };

  if (loading) return <p>Đang tải danh mục...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Danh mục sản phẩm</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {categories.map((cate) => (
          <div
            key={cate.id}
            style={{
              width: "220px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              background: "#111",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/category/${cate.id}`)}
          >
            <img
              src={cate.image}
              alt={cate.name}
              style={{
                width: "100%",
                height: "180px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
            <h3 style={{ marginTop: "10px" }}>{cate.name}</h3>
            <p style={{ fontSize: "13px", color: "#ccc" }}>
              {cate.description}
            </p>
          </div>
        ))}
      </div>

      {role === "admin" && (
        <button
          onClick={() => navigate("/add-category")}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "55px",
            height: "55px",
            fontSize: "28px",
            fontWeight: "bold",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
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
