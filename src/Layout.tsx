import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import anhlogo from "./assets/images/logo.jpg";

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

  useEffect(() => {
    const interval = setInterval(() => nextSlide(), 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slideImages.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? slideImages.length - 1 : prev - 1));

  return (
    <div
      style={{
        margin: 0,
        fontFamily: "Arial, sans-serif",
        background: "black",
      }}
    >
      {/* ================= HEADER ================= */}
      <div id="head" style={{ height: "200px" }}>
        <div
          id="banner"
          style={{
            height: "115px",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            justifyContent: "space-between",
          }}
        >
          {/* 🟢 Logo giữa */}
          <div id="logo" style={{ flex: 1, textAlign: "center" }}>
            <img src={anhlogo} alt="Logo" style={{ width: "400px" }} />
          </div>

          {/* 🔍 Search bên phải */}
          <div id="search" style={{ marginLeft: "auto", marginTop: "10px" }}>
            <form style={{ display: "flex" }}>
              <input
                type="text"
                name="q"
                placeholder="Tìm kiếm..."
                style={{
                  padding: "5px",
                  fontSize: "14px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "5px 10px",
                  marginLeft: "5px",
                  fontSize: "14px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: "#444",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Tìm
              </button>
            </form>
          </div>
        </div>

        {/* ================== NAVIGATION MENU ================== */}
        <div id="nav" style={{ height: "80px", backgroundColor: "black" }}>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <li style={{ margin: "0 20px" }}>
              <Link
                to="/"
                style={{
                  display: "block",
                  color: "white",
                  padding: "20px 10px",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Trang Chủ
              </Link>
            </li>

            <li style={{ margin: "0 20px" }}>
              <Link
                to="/page1"
                style={{
                  display: "block",
                  color: "white",
                  padding: "20px 10px",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Shop
              </Link>
            </li>

            <li style={{ margin: "0 20px" }}>
              <Link
                to="/users"
                style={{
                  display: "block",
                  color: "white",
                  padding: "20px 10px",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Thành Viên
              </Link>
            </li>

            <li style={{ margin: "0 20px" }}>
              <a
                href="#"
                style={{
                  display: "block",
                  color: "white",
                  padding: "20px 10px",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Giới Thiệu
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ================= SLIDE SHOW ================= */}
      {location.pathname === "/" && (
        <div
          id="slide"
          style={{
            width: "100%",
            height: "500px",
            overflow: "hidden",
            position: "relative",
            backgroundColor: "black",
          }}
        >
          {slideImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                position: "absolute",
                top: 0,
                left: 0,
                opacity: currentSlide === index ? 1 : 0,
                transition: "opacity 1s ease-in-out, transform 6s ease-in-out",
                transform:
                  currentSlide === index ? "scale(1.05)" : "scale(1.0)",
                filter: "brightness(1.1) contrast(1.05)",
              }}
            />
          ))}

          {/* Overlay nhẹ */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.15))",
              pointerEvents: "none",
            }}
          ></div>

          {/* Nút điều hướng */}
          <button
            onClick={prevSlide}
            style={{
              position: "absolute",
              top: "50%",
              left: "20px",
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.4)",
              color: "white",
              border: "none",
              padding: "10px 15px",
              cursor: "pointer",
              fontSize: "22px",
              borderRadius: "5px",
            }}
          >
            &#10094;
          </button>

          <button
            onClick={nextSlide}
            style={{
              position: "absolute",
              top: "50%",
              right: "20px",
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.4)",
              color: "white",
              border: "none",
              padding: "10px 15px",
              cursor: "pointer",
              fontSize: "22px",
              borderRadius: "5px",
            }}
          >
            &#10095;
          </button>
        </div>
      )}

      {/* ================= MAIN CONTENT ================= */}
      <div id="container" className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
