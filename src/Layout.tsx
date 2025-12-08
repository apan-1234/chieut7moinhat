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

  // Load user
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    loadUser();
    window.addEventListener("storage", loadUser);
    window.addEventListener("userUpdated", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("userUpdated", loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userUpdated"));
    navigate("/login");
  };

  // Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Cart
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
      {/* HEADER */}
      <div id="head">
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
          <img src={anhlogo} alt="Logo" style={{ width: 160 }} />

          <div
            style={{
              flex: 1,
              margin: "0 20px",
              borderRadius: 10,
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
                padding: 8,
                borderRadius: 4,
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
              { to: "/categories", label: "Danh Mục" }, // ⭐ ĐÃ THÊM LẠI
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
                    fontSize: 16,
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CART */}
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
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>

          {/* LOGIN / LOGOUT */}
          {!user ? (
            <Link
              to="/login"
              style={{
                position: "absolute",
                right: 20,
                background: "green",
                color: "white",
                padding: "10px 15px",
                borderRadius: 6,
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Đăng nhập
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              style={{
                position: "absolute",
                right: 20,
                background: "red",
                color: "white",
                padding: "10px 15px",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Đăng xuất
            </button>
          )}
        </div>
      </div>

      {/* SLIDE (ONLY HOME PAGE) */}
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

      {/* PAGE CONTENT */}
      <div id="container" className="container">
        <Outlet />
      </div>

      {/* FOOTER */}
      <div
        style={{
          marginTop: "60px",
          backgroundColor: "#111",
          color: "white",
          padding: "60px 40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "40px",
            justifyContent: "space-between",
            maxWidth: "1300px",
            margin: "0 auto",
          }}
        >
          <div style={{ flex: "1 1 350px" }}>
            <img src={anhlogo} style={{ width: "200px", marginBottom: 15 }} />
            <p style={{ fontSize: 15, color: "#ccc", lineHeight: 1.6 }}>
              Công ty chúng tôi cung cấp sản phẩm chất lượng cao...
            </p>
          </div>

          <div style={{ flex: "1 1 500px" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31355.82558029258!2d106.65002909379822!3d10.77463956992026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3330bcc7%3A0x4db964d76bf6e18e!2sSaigon%20Zoo%20%26%20Botanical%20Gardens!5e0!3m2!1sen!2s!4v1765206702396!5m2!1sen!2s"
              width="100%"
              height="320"
              style={{
                border: 0,
                borderRadius: 12,
                width: "100%",
                boxShadow: "0 0 15px rgba(255,255,255,0.1)",
              }}
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: 40,
            paddingTop: 20,
            borderTop: "1px solid #333",
            fontSize: 14,
            color: "#888",
          }}
        >
          © 2025 Your Company. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Layout;
