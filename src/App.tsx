// src/App.tsx
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
import UserDetail from "./UserDetail";
import ChatBox from "./ChatBox";
import ChatBubble from "./ChatBubble";
import Categories from "./Categories";
import CategoryProducts from "./CategoryProducts";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";

const App: React.FC = () => {
  return (
    <Router>
      <ChatBubble />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="page1" element={<Page1 />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="add" element={<Add />} />
          <Route path="edit/:id" element={<Edit />} />
          <Route path="users" element={<PageUsers />} />
          <Route path="users/:id" element={<UserDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="account" element={<Account />} />
          <Route path="chat" element={<ChatBox />} />
          <Route path="categories" element={<Categories />} />
          <Route path="category/:id" element={<CategoryProducts />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="edit-category/:id" element={<EditCategory />} />
          {/* sửa danh mục */}
        </Route>

        <Route
          path="*"
          element={
            <h2 style={{ textAlign: "center", marginTop: 50 }}>
              Trang không tồn tại
            </h2>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
