// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import Page1 from "./page1";
import Add from "./add";
import Edit from "./edit";
import PageUsers from "./pageUsers"; // Trang người dùng mới
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Trang mặc định */}
          <Route index element={<Home />} />

          {/* Danh sách sản phẩm */}
          <Route path="page1" element={<Page1 />} />

          {/* Thêm sản phẩm */}
          <Route path="add" element={<Add />} />

          {/* Chỉnh sửa sản phẩm */}
          <Route path="edit/:id" element={<Edit />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
