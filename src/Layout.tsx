import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
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
      <div id="head">
        {/* ================== BANNER ================== */}
        <div
          id="banner"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 20px",
            height: "140px",
            backgroundColor: "#111",
            overflow: "hidden",
          }}
        >
          {/* 🟢 Logo bên trái */}
          <div
            id="logo"
            style={{
              flex: "0 0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "20px",
            }}
          >
            <img
              src={anhlogo}
              alt="Logo"
              style={{
                width: "160px",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>

          {/* 🟡 Banner giữa */}
          <div
            id="banner-center"
            style={{
              flex: "1 1 auto",
              textAlign: "center",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              borderRadius: "10px",
            }}
          >
            <img
              src={bannerImg}
              alt="Banner"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                transition: "transform 0.5s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1.0)")
              }
            />
          </div>

          {/* 🔍 Search bên phải */}
          <div
            id="search"
            style={{
              flex: "0 0 250px",
              marginLeft: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <form
              style={{
                display: "flex",
                width: "100%",
              }}
            >
              <input
                type="text"
                placeholder="Tìm kiếm..."
                style={{
                  flex: 1,
                  padding: "8px 10px",
                  fontSize: "14px",
                  borderRadius: "4px 0 0 4px",
                  border: "1px solid #ccc",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "8px 15px",
                  backgroundColor: "#ff6600",
                  color: "white",
                  border: "none",
                  borderRadius: "0 4px 4px 0",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Tìm
              </button>
            </form>
          </div>
        </div>

        {/* ================== NAVIGATION MENU ================== */}
        <div id="nav" style={{ height: "70px", backgroundColor: "black" }}>
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

          {/* Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.15))",
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
