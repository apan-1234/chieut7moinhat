// src/page1.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

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

  useEffect(() => {
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
    <div style={{ padding: "20px" }}>
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
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p style={{ fontWeight: "bold", color: "brown" }}>
              Giá:{" "}
              {product.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page1;
