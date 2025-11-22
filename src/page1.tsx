import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";
import { addToCart } from "./cartService";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

const Page1: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string>("guest");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setRole(parsedUser.role || "guest"); // giữ phân quyền
    }
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });
    if (error) console.error(error.message);
    else setProducts(data || []);
    setLoading(false);
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div style={{ padding: "20px", position: "relative" }}>
      {" "}
      <h1>Danh sách sản phẩm</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((product) => {
          const outOfStock = product.stock === 0;
          return (
            <div
              key={product.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                width: "200px",
                backgroundColor: "#000",
                color: "#fff",
                position: "relative",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                {outOfStock && (
                  <div
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      right: "0",
                      bottom: "0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(0,0,0,0.6)",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "18px",
                      borderRadius: "8px",
                      pointerEvents: "none",
                    }}
                  >
                    Sold Out{" "}
                  </div>
                )}{" "}
              </div>
              <h3 style={{ fontSize: "16px", marginTop: "10px" }}>
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
              <p style={{ fontSize: "13px", color: "#0f0" }}>
                Tồn kho: {product.stock}
              </p>

              <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product, 1);
                  }}
                  style={{
                    flex: 1,
                    background: outOfStock ? "#555" : "orange",
                    border: "none",
                    borderRadius: 5,
                    padding: "5px",
                    color: "#000",
                    fontWeight: "bold",
                    cursor: outOfStock ? "not-allowed" : "pointer",
                  }}
                  disabled={outOfStock}
                >
                  Thêm vào giỏ
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!outOfStock) {
                      addToCart(product, 1);
                      navigate("/cart");
                    }
                  }}
                  style={{
                    flex: 1,
                    background: outOfStock ? "#555" : "red",
                    border: "none",
                    borderRadius: 5,
                    padding: "5px",
                    color: "#fff",
                    fontWeight: "bold",
                    cursor: outOfStock ? "not-allowed" : "pointer",
                  }}
                  disabled={outOfStock}
                >
                  Mua ngay
                </button>
              </div>
            </div>
          );
        })}
      </div>
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
