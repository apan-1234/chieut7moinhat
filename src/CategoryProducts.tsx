import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useParams, useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  stock: number;
}

const CategoryProducts: React.FC = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategory();
    fetchProducts();
  }, []);

  const fetchCategory = async () => {
    const { data } = await supabase
      .from("categories")
      .select("name")
      .eq("id", id)
      .single();

    if (data) setCategoryName(data.name);
  };

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("category_id", id);

    if (data) setProducts(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Sản phẩm thuộc danh mục: {categoryName}</h1>

      <button onClick={() => navigate(-1)} style={{ marginBottom: "15px" }}>
        ⬅ Quay lại
      </button>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              width: "200px",
              padding: "10px",
              background: "#000",
              color: "#fff",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/product/${p.id}`)}
          >
            <img
              src={p.image}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <h3 style={{ marginTop: "10px" }}>{p.name}</h3>
            <p style={{ fontWeight: "bold", color: "orange" }}>
              {p.price.toLocaleString()}đ
            </p>
            <p>Tồn kho: {p.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
