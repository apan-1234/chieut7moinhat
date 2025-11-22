import React, { useEffect, useState } from "react";
import { getCart, saveCart, removeFromCart } from "./cartService";
import { useNavigate } from "react-router-dom";

const Cart = () => {
const [cart, setCart] = useState<any[]>([]);
const navigate = useNavigate();

useEffect(() => {
setCart(getCart());
}, []);

const updateQuantity = (id: number, amount: number) => {
const newCart = cart.map((item) =>
item.id === id
? { ...item, quantity: Math.max(1, item.quantity + amount) }
: item
);
setCart(newCart);
saveCart(newCart);
};

const removeItem = (id: number) => {
removeFromCart(id);
setCart(getCart());
};

const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

return (
<div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
<h1 style={{ marginBottom: "20px", color: "#fff" }}>Giỏ hàng</h1>
  {cart.length === 0 ? (
    <h3 style={{ color: "#ccc" }}>Giỏ hàng đang trống</h3>
  ) : (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            background: "#1a1a1a",
            padding: "15px",
            borderRadius: "10px",
            gap: "15px",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = "translateY(-5px)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 20px rgba(0,0,0,0.5)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            style={{ width: 100, height: 100, borderRadius: "8px", objectFit: "cover" }}
          />

          <div style={{ flex: 1 }}>
            <h3 style={{ margin: "0 0 5px 0", color: "#fff" }}>{item.name}</h3>
            <p style={{ margin: "0 0 10px 0", color: "orange", fontWeight: "bold" }}>
              {item.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                onClick={() => updateQuantity(item.id, -1)}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "5px",
                  border: "none",
                  background: "#555",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#777")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#555")}
              >
                -
              </button>

              <span style={{ minWidth: "25px", textAlign: "center", color: "#fff" }}>
                {item.quantity}
              </span>

              <button
                onClick={() => updateQuantity(item.id, 1)}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "5px",
                  border: "none",
                  background: "#555",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#777")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#555")}
              >
                +
              </button>

              <button
                onClick={() => removeItem(item.id)}
                style={{
                  marginLeft: "auto",
                  background: "red",
                  color: "#fff",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#ff4444")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "red")}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      ))}

      <h2 style={{ marginTop: "20px", color: "#fff", textAlign: "right" }}>
        Tổng tiền:{" "}
        {total.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
      </h2>

      {/* Nút mua toàn bộ giỏ hàng */}
      <button
        onClick={() => navigate("/checkout")}
        style={{
          marginTop: "20px",
          float: "right",
          background: "green",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#00aa00")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "green")}
      >
        Mua tất cả
      </button>
    </div>
  )}
</div>
);
};

export default Cart;
