import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const Page1: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string>("guest"); // thêm state role
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy user từ localStorage để biết role
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setRole(parsedUser.role || "guest");
    }
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (error) console.error("Lỗi tải sản phẩm:", error.message);
    else setProducts(data || []);

    setLoading(false);
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div style={{ padding: "20px", position: "relative" }}>
      <h1>Danh sách sản phẩm</h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "flex-start",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              width: "200px",
              boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
              backgroundColor: "#000",
              transition: "transform 0.2s ease",
              color: "#fff",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-4px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                borderRadius: "8px",
                marginBottom: "10px",
                objectFit: "cover",
                height: "200px",
              }}
            />
            <h3 style={{ fontSize: "16px", marginBottom: "5px" }}>
              {product.name}
            </h3>
            <p style={{ fontSize: "13px", color: "#ccc" }}>
              {product.description}
            </p>
            <p style={{ fontWeight: "bold", color: "orange" }}>
              Giá:{" "}
              {product.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>
        ))}
      </div>

      {/* ✅ Nút dấu cộng chỉ hiện nếu là admin */}
      {role === "admin" && (
        <button
          onClick={() => navigate("/add")}
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
          +
        </button>
      )}
    </div>
  );
};

export default Page1;
