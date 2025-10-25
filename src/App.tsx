import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home"; // Trang chủ mặc định
import Page1 from "./page1"; // Trang sản phẩm (EGOV)
import PageUsers from "./pageUsers"; // Trang người dùng mới

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Trang mặc định */}
          <Route index element={<Home />} />

          {/* Trang sản phẩm */}
          <Route path="page1" element={<Page1 />} />

          {/* Trang người dùng */}
          <Route path="users" element={<PageUsers />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
