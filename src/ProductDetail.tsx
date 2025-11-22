import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useParams, useNavigate } from "react-router-dom";
import { addToCart } from "./cartService";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string>("guest");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setRole(JSON.parse(user).role || "guest");
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    if (error) console.error(error.message);
    else setProduct(data);
    setLoading(false);
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (!product) return <p>Không tìm thấy sản phẩm</p>;

  const outOfStock = product.stock === 0;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "20px" }}>
        ← Quay lại{" "}
      </button>
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ position: "relative" }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "350px",
              borderRadius: "10px",
              objectFit: "cover",
              height: "350px",
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
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.6)",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "24px",
                borderRadius: "10px",
                pointerEvents: "none",
              }}
            >
              Sold Out
            </div>
          )}
        </div>

        <div>
          <h1>{product.name}</h1>
          <p style={{ fontSize: "15px", color: "#555" }}>
            {product.description}
          </p>
          <p style={{ fontWeight: "bold", fontSize: "20px", color: "orange" }}>
            Giá:{" "}
            {product.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
          <p style={{ fontSize: "14px", color: "#0f0" }}>
            Tồn kho: {product.stock}
          </p>

          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button
              onClick={() => addToCart(product, 1)}
              style={{
                padding: "10px 15px",
                background: outOfStock ? "#555" : "orange",
                color: "#000",
                border: "none",
                borderRadius: "5px",
                cursor: outOfStock ? "not-allowed" : "pointer",
                fontWeight: "bold",
              }}
              disabled={outOfStock}
            >
              Thêm vào giỏ
            </button>

            <button
              onClick={() => {
                if (!outOfStock) {
                  addToCart(product, 1);
                  navigate("/cart");
                } else {
                  alert("Sản phẩm đã hết hàng");
                }
              }}
              style={{
                padding: "10px 15px",
                background: outOfStock ? "#555" : "red",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: outOfStock ? "not-allowed" : "pointer",
                fontWeight: "bold",
              }}
              disabled={outOfStock}
            >
              Mua ngay
            </button>
          </div>

          {role === "admin" && (
            <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
              <button
                onClick={() => navigate(`/edit/${product.id}`)}
                style={{
                  padding: "10px 15px",
                  background: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Chỉnh sửa
              </button>

              <button
                onClick={async () => {
                  if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?"))
                    return;
                  const { error } = await supabase
                    .from("products")
                    .delete()
                    .eq("id", id);
                  if (error) console.error(error.message);
                  else navigate("/");
                }}
                style={{
                  padding: "10px 15px",
                  background: "red",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
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
