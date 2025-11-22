import React, { useEffect, useState } from "react";
import { getCart, clearCart } from "./cartService";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
const [cart, setCart] = useState<any[]>([]);
const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");
const navigate = useNavigate();

useEffect(() => {
setCart(getCart());
}, []);

const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

const handlePayment = () => {
if (!name || !phone || !address) {
alert("Vui lòng điền đầy đủ thông tin!");
return;
}

// Demo: in ra thông tin mua hàng và redirect thanh toán Momo
console.log("Thông tin khách hàng:", { name, phone, address, cart, total });

// Clear cart sau khi thanh toán
clearCart();

// Demo redirect (thay bằng link Momo thực tế nếu có)
window.location.href = "https://momo.vn/";

};

if (cart.length === 0) return <h2 style={{ color: "#fff", textAlign: "center" }}>Giỏ hàng đang trống</h2>;

return (
<div style={{ padding: "20px", maxWidth: "700px", margin: "0 auto", color: "#fff" }}> <h1>Thanh toán</h1>

  <div style={{ marginBottom: "20px" }}>
    <h2>Sản phẩm trong giỏ hàng</h2>
    {cart.map(item => (
      <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", background: "#222", padding: "10px", borderRadius: "8px" }}>
        <span>{item.name} x {item.quantity}</span>
        <span>{(item.price * item.quantity).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span>
      </div>
    ))}
    <h3 style={{ textAlign: "right", marginTop: "10px" }}>Tổng: {total.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</h3>
  </div>

  <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "20px" }}>
    <input
      type="text"
      placeholder="Họ tên"
      value={name}
      onChange={(e) => setName(e.target.value)}
      style={{ padding: "10px", borderRadius: "5px", border: "none" }}
    />
    <input
      type="text"
      placeholder="Số điện thoại"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      style={{ padding: "10px", borderRadius: "5px", border: "none" }}
    />
    <input
      type="text"
      placeholder="Địa chỉ"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      style={{ padding: "10px", borderRadius: "5px", border: "none" }}
    />
  </div>

  <button
    onClick={handlePayment}
    style={{
      background: "green",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      width: "100%",
      fontSize: "16px",
      transition: "0.2s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.background = "#00aa00")}
    onMouseLeave={(e) => (e.currentTarget.style.background = "green")}
  >
    Thanh toán bằng Momo
  </button>
</div>

);
};

export default Checkout;
