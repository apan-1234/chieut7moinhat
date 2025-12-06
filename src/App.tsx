import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import Page1 from "./page1";
import Add from "./add";
import Edit from "./edit";
import PageUsers from "./pageUsers";
import Login from "./Login";
import Register from "./register";
import Account from "./Account";
import Cart from "./Cart";
import Checkout from "./Checkout";
import ProductDetail from "./ProductDetail";
import UserDetail from "./UserDetail"; // 👈 import UserDetail
import ChatBox from "./ChatBox"; // 👈 Thêm chat box
import ChatBubble from "./ChatBubble"; // 👈 Bong bóng chat

const App: React.FC = () => {
  return (
    <Router>
      {/* Bong bóng chat luôn hiển thị trên mọi trang */}
      <ChatBubble />

      <Routes>
        {/* Layout chính */}
        <Route path="/" element={<Layout />}>
          {/* Trang mặc định */}
          <Route index element={<Home />} />

          {/* Danh sách sản phẩm */}
          <Route path="page1" element={<Page1 />} />

          {/* Chi tiết sản phẩm */}
          <Route path="product/:id" element={<ProductDetail />} />

          {/* Thêm sản phẩm */}
          <Route path="add" element={<Add />} />

          {/* Chỉnh sửa sản phẩm */}
          <Route path="edit/:id" element={<Edit />} />

          {/* Quản lý người dùng */}
          <Route path="users" element={<PageUsers />} />
          {/* Chi tiết user */}
          <Route path="users/:id" element={<UserDetail />} />

          {/* Giỏ hàng */}
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />

          {/* Auth */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Trang tài khoản */}
          <Route path="account" element={<Account />} />

          {/* Chat riêng – nếu muốn mở toàn màn hình */}
          <Route path="chat" element={<ChatBox />} />
        </Route>

        {/* Fallback 404 */}
        <Route
          path="*"
          element={
            <h2 style={{ textAlign: "center", marginTop: "50px" }}>
              Trang không tồn tại
            </h2>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
