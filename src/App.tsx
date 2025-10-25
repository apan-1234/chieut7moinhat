import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home"; // Trang Home mặc định
import Page1 from "./page1"; // Trang EGOV

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Trang mặc định */}
          <Route index element={<Home />} />
          {/* Trang EGOV */}
          <Route path="page1" element={<Page1 />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
