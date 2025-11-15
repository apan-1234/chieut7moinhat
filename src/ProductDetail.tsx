import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useParams, useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  created_at?: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string>("guest");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setRole(parsedUser.role || "guest");
    }
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) console.error("Lỗi tải sản phẩm:", error.message);
    else setProduct(data);

    setLoading(false);
  };

  const deleteProduct = async () => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) console.error("Lỗi xóa sản phẩm:", error.message);
    else navigate("/");
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (!product) return <p>Không tìm thấy sản phẩm</p>;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "20px" }}>
        ← Quay lại
      </button>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "flex-start",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "350px", borderRadius: "10px", objectFit: "cover" }}
        />

        <div>
          <h1>{product.name}</h1>
          <p style={{ fontSize: "15px", color: "#555" }}>{product.description}</p>
          <p style={{ fontWeight: "bold", fontSize: "20px", color: "orange" }}>
            Giá: {product.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
          </p>

          {role === "admin" && (
            <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
              <button
                onClick={() => navigate(`/edit/${product.id}`)}
                style={{ padding: "10px 15px", background: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
              >
                Chỉnh sửa
              </button>

              <button
                onClick={deleteProduct}
                style={{ padding: "10px 15px", background: "red", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
              >
                Xóa
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
