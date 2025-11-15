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

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Trang mặc định (Home có logic bảo vệ) */}
          <Route index element={<Home />} />

          {/* Danh sách sản phẩm */}
          <Route path="page1" element={<Page1 />} />

          {/* Thêm sản phẩm */}
          <Route path="add" element={<Add />} />

          {/* Chỉnh sửa sản phẩm */}
          <Route path="edit/:id" element={<Edit />} />

          {/* Trang quản lý người dùng (tùy bạn giữ hoặc bỏ) */}
          <Route path="users" element={<PageUsers />} />

          {/* Trang đăng nhập & đăng ký */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Trang quản lý tài khoản (admin mới xem được, logic xử lý trong Home.tsx) */}
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
