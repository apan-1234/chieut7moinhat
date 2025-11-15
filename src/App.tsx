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

// ⭐ Import thêm trang chi tiết sản phẩm
import ProductDetail from "./ProductDetail";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Trang mặc định */}
          <Route index element={<Home />} />

          {/* Danh sách sản phẩm */}
          <Route path="page1" element={<Page1 />} />

          {/* ⭐ Trang chi tiết sản phẩm */}
          <Route path="product/:id" element={<ProductDetail />} />

          {/* Thêm sản phẩm */}
          <Route path="add" element={<Add />} />

          {/* Chỉnh sửa sản phẩm */}
          <Route path="edit/:id" element={<Edit />} />

          {/* Quản lý người dùng */}
          <Route path="users" element={<PageUsers />} />

          {/* Auth */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Trang tài khoản */}
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
