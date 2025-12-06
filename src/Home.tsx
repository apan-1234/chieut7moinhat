// src/Home.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { supabaseAdmin } from "./supabaseAdmin";
import { addToCart } from "./cartService";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

interface User {
  id: number;
  name: string;
  age: number;
  job: string;
  email: string;
  avatar: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();

  // === Sản phẩm ===
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productIndex, setProductIndex] = useState(0); // index bắt đầu slide

  // === Thành viên ===
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [userIndex, setUserIndex] = useState(0); // index bắt đầu slide

  const [role, setRole] = useState<string>("guest");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setRole(parsedUser.role || "guest");
    }
    fetchProducts();
    fetchUsers();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });
    if (error) console.error(error.message);
    else setProducts(data || []);
    setLoadingProducts(false);
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("id", { ascending: false });
    if (!error) setUsers(data || []);
    setLoadingUsers(false);
  };

  // === Slide functions ===
  const nextProducts = () => {
    if (productIndex + 5 < products.length) setProductIndex(productIndex + 5);
  };
  const prevProducts = () => {
    if (productIndex - 5 >= 0) setProductIndex(productIndex - 5);
  };
  const nextUsers = () => {
    if (userIndex + 5 < users.length) setUserIndex(userIndex + 5);
  };
  const prevUsers = () => {
    if (userIndex - 5 >= 0) setUserIndex(userIndex - 5);
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      {/* === Phần Sản phẩm === */}
      <h2 style={{ marginBottom: "10px" }}>Sản Phẩm</h2>
      {loadingProducts ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div style={{ position: "relative", marginBottom: "30px" }}>
          {/* Slide products */}
          <div style={{ display: "flex", gap: "20px", overflow: "hidden" }}>
            {products.slice(productIndex, productIndex + 5).map((product) => {
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
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
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
                        Sold Out
                      </div>
                    )}
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
                </div>
              );
            })}
          </div>
          {/* Nút slide */}
          <button
            onClick={prevProducts}
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255,255,255,0.2)",
              border: "none",
              color: "#fff",
              fontSize: "24px",
              cursor: "pointer",
              width: "35px",
              height: "80px",
            }}
          >
            ‹
          </button>
          <button
            onClick={nextProducts}
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255,255,255,0.2)",
              border: "none",
              color: "#fff",
              fontSize: "24px",
              cursor: "pointer",
              width: "35px",
              height: "80px",
            }}
          >
            ›
          </button>
        </div>
      )}

      <hr style={{ borderColor: "#555", margin: "30px 0" }} />

      {/* === Phần Thành viên === */}
      <h2 style={{ marginBottom: "10px" }}>Thành Viên</h2>
      {loadingUsers ? (
        <p>Đang tải dữ liệu...</p>
      ) : users.length === 0 ? (
        <p>Hiện chưa có thành viên nào.</p>
      ) : (
        <div style={{ position: "relative", marginBottom: "30px" }}>
          <div style={{ display: "flex", gap: "20px", overflow: "hidden" }}>
            {users.slice(userIndex, userIndex + 5).map((user) => (
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
            ))}
          </div>
          {/* Nút slide */}
          <button
            onClick={prevUsers}
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255,255,255,0.2)",
              border: "none",
              color: "#fff",
              fontSize: "24px",
              cursor: "pointer",
              width: "35px",
              height: "80px",
            }}
          >
            ‹
          </button>
          <button
            onClick={nextUsers}
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255,255,255,0.2)",
              border: "none",
              color: "#fff",
              fontSize: "24px",
              cursor: "pointer",
              width: "35px",
              height: "80px",
            }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
