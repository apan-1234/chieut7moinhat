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

  // === Thành viên ===
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [showUserForm, setShowUserForm] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(18);
  const [email, setEmail] = useState("");

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

  // === Lấy sản phẩm ===
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });
    if (error) console.error(error.message);
    else setProducts(data || []);
    setLoadingProducts(false);
  };

  // === Lấy user ===
  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("id", { ascending: false });
    if (!error) setUsers(data || []);
    setLoadingUsers(false);
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

      setShowUserForm(false);
      setName("");
      setAge(18);
      setEmail("");
      setFile(null);
      fetchUsers();
    } catch (err: any) {
      alert("Lỗi thêm user: " + err.message);
    }
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
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
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
      )}

      <hr style={{ borderColor: "#555", margin: "30px 0" }} />

      {/* === Phần Thành viên === */}
      <h2 style={{ marginBottom: "10px" }}>Thành Viên</h2>
      {loadingUsers ? (
        <p>Đang tải dữ liệu...</p>
      ) : users.length === 0 ? (
        <p>Hiện chưa có thành viên nào.</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          {users.map((user) => (
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
      )}

      {/* Form thêm user */}
      {showUserForm && role === "admin" && (
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

      {/* Button thêm user (admin) */}
      {role === "admin" && (
        <button
          onClick={() => setShowUserForm(!showUserForm)}
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
          {showUserForm ? "×" : "+"}
        </button>
      )}
    </div>
  );
};

export default Home;
