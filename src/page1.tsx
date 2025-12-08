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
  category_id: number;
  categories?: { name: string }; // lấy từ join
}

interface Category {
  id: number;
  name: string;
}

const Page1: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<number | "all">("all");
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("guest");

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setRole(parsedUser.role || "guest");
    }

    fetchCategories();
    fetchProducts();
  }, []);

  // Fetch sản phẩm + join danh mục
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*, categories(name)")
      .order("id", { ascending: false });

    if (error) console.error(error);
    else {
      setProducts(data || []);
      setFiltered(data || []);
    }
    setLoading(false);
  };

  // Fetch danh mục
  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (error) console.error(error);
    else setCategories(data || []);
  };

  // Xử lý lọc + tìm kiếm
  useEffect(() => {
    let result = [...products];

    // Tìm theo tên sản phẩm hoặc tên danh mục
    if (search.trim() !== "") {
      const keyword = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(keyword) ||
          item.categories?.name.toLowerCase().includes(keyword)
      );
    }

    // Lọc theo danh mục
    if (categoryFilter !== "all") {
      result = result.filter((item) => item.category_id === categoryFilter);
    }

    setFiltered(result);
  }, [search, categoryFilter, products]);

  if (loading) return <p style={{ padding: 20 }}>Đang tải dữ liệu...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>Danh sách sản phẩm</h1>

      {/* SEARCH + CATEGORY FILTER */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        {/* Search */}
        <input
          type="text"
          placeholder="Tìm sản phẩm hoặc danh mục..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: 6,
            border: "1px solid #aaa",
            fontSize: 16,
          }}
        />

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(
              e.target.value === "all" ? "all" : parseInt(e.target.value)
            )
          }
          style={{
            padding: "10px",
            borderRadius: 6,
            border: "1px solid #aaa",
            width: 200,
            fontSize: 16,
          }}
        >
          <option value="all">Tất cả danh mục</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* PRODUCT LIST */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filtered.map((product) => {
          const outOfStock = product.stock === 0;

          return (
            <div
              key={product.id}
              style={{
                border: "1px solid #333",
                borderRadius: 8,
                padding: 10,
                width: 220,
                backgroundColor: "#000",
                color: "#fff",
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
                    height: 200,
                    objectFit: "cover",
                    borderRadius: 8,
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
                      background: "rgba(0,0,0,0.6)",
                      color: "#fff",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 8,
                    }}
                  >
                    Sold Out
                  </div>
                )}
              </div>

              <h3 style={{ marginTop: 10, fontSize: 16 }}>{product.name}</h3>

              <p style={{ fontSize: 13, color: "#aaa" }}>
                {product.categories?.name || "Không có danh mục"}
              </p>

              <p style={{ fontSize: 14, marginTop: 5 }}>
                {product.description}
              </p>

              <p
                style={{
                  color: "orange",
                  fontWeight: "bold",
                  marginTop: 5,
                }}
              >
                {product.price.toLocaleString("vi-VN")}₫
              </p>

              <p style={{ fontSize: 13, color: "#0f0" }}>
                Tồn kho: {product.stock}
              </p>

              <div style={{ display: "flex", gap: 5, marginTop: 10 }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!outOfStock) addToCart(product, 1);
                  }}
                  disabled={outOfStock}
                  style={{
                    flex: 1,
                    padding: 6,
                    borderRadius: 5,
                    background: outOfStock ? "#444" : "orange",
                    border: "none",
                    fontWeight: "bold",
                    cursor: outOfStock ? "not-allowed" : "pointer",
                  }}
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
                  disabled={outOfStock}
                  style={{
                    flex: 1,
                    padding: 6,
                    borderRadius: 5,
                    background: outOfStock ? "#444" : "red",
                    border: "none",
                    color: "#fff",
                    fontWeight: "bold",
                    cursor: outOfStock ? "not-allowed" : "pointer",
                  }}
                >
                  Mua ngay
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* NÚT THÊM SẢN PHẨM (ADMIN) */}
      {role === "admin" && (
        <button
          onClick={() => navigate("/add")}
          style={{
            position: "fixed",
            bottom: 30,
            right: 30,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "#007bff",
            color: "#fff",
            fontSize: 30,
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

export default Page1;
