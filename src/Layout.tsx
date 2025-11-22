import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";

import anhlogo from "./assets/images/logo.jpg";
import bannerImg from "./assets/images/banner.jpg";

import img1 from "./assets/images/1.jpg";
import img2 from "./assets/images/2.jpg";
import img3 from "./assets/images/3.jpg";
import img4 from "./assets/images/4.jpg";
import img5 from "./assets/images/5.jpg";

import "./assets/css/main.css";

const slideImages = [img1, img2, img3, img4, img5];

const Layout = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const interval = setInterval(() => nextSlide(), 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slideImages.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? slideImages.length - 1 : prev - 1));

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total = cart.reduce(
      (sum: number, item: any) => sum + item.quantity,
      0
    );
    setCartCount(total);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("storage", updateCartCount);
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  return (
    <div
      style={{
        margin: 0,
        fontFamily: "Arial, sans-serif",
        background: "black",
      }}
    >
      {" "}
      <div id="head">
        {/* HEADER */}
        <div
          id="banner"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 20px",
            height: "140px",
            backgroundColor: "#111",
          }}
        >
          <img
            src={anhlogo}
            alt="Logo"
            style={{ width: "160px", height: "auto", objectFit: "contain" }}
          />

          <div
            style={{
              flex: 1,
              margin: "0 20px",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <img
              src={bannerImg}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div style={{ width: "250px" }}>
            <input
              type="text"
              placeholder="Tìm kiếm..."
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        </div>

        {/* MENU */}
        <div
          style={{
            height: "70px",
            backgroundColor: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              alignItems: "center",
              margin: 0,
              padding: 0,
            }}
          >
            {[
              { to: "/", label: "Trang Chủ" },
              { to: "/page1", label: "Shop" },
              { to: "/users", label: "Thành Viên" },
              { to: "#", label: "Giới Thiệu" },
            ].map((item, i) => (
              <li key={i} style={{ margin: "0 20px" }}>
                <Link
                  to={item.to}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            to="/cart"
            style={{
              color: "white",
              marginLeft: 20,
              fontSize: 18,
              position: "relative",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            🛒 Giỏ hàng
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-15px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 7px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>

          {user && (
            <button
              onClick={handleLogout}
              style={{
                position: "absolute",
                right: "20px",
                background: "red",
                color: "white",
                padding: "10px 15px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Đăng xuất
            </button>
          )}
        </div>
      </div>
      {/* SLIDE */}
      {location.pathname === "/" && (
        <div
          style={{
            width: "100%",
            height: "500px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {slideImages.map((src, index) => (
            <img
              key={index}
              src={src}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                opacity: currentSlide === index ? 1 : 0,
                transition: "1s",
              }}
            />
          ))}
        </div>
      )}
      <div id="container" className="container">
        <Outlet />
      </div>
      {/* FOOTER */}
      <div
        style={{
          marginTop: "40px",
          backgroundColor: "#111",
          color: "white",
          padding: "40px 20px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 250px", marginBottom: "20px" }}>
          <img
            src={anhlogo}
            alt="Logo Footer"
            style={{ width: "160px", height: "auto", objectFit: "contain" }}
          />
          <p style={{ marginTop: "10px", fontSize: "14px", color: "#ccc" }}>
            Công ty chúng tôi cung cấp sản phẩm chất lượng và dịch vụ uy tín.
          </p>
        </div>

        <div style={{ flex: "2 1 400px", marginBottom: "20px" }}>
          <img
            src={bannerImg}
            alt="Banner Footer"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>

        <div style={{ flex: "1 1 200px", marginBottom: "20px" }}>
          <h3>Liên hệ</h3>
          <p>Email: support@example.com</p>
          <p>Hotline: 0123 456 789</p>
          <p>Địa chỉ: 123 Đường ABC, Quận XYZ</p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
