import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import anhlogo from "./assets/images/Ten-truong-do-1000x159.png";

import img1 from "./assets/images/1.jpg";
import img2 from "./assets/images/2.jpg";
import img3 from "./assets/images/3.jpg";
import img4 from "./assets/images/4.jpg";
import img5 from "./assets/images/5.jpg";

import "./assets/css/main.css";

const slideImages = [img1, img2, img3, img4, img5];

const Layout = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredMenu, setHoveredMenu] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <div id="head" style={{ height: "150px" }}>
        <div
          id="banner"
          style={{
            height: "70px",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          {/* Left Nav */}
          <div id="site" style={{ width: "400px" }}>
            <ul style={{ display: "flex", padding: 0, margin: 0 }}>
              <li style={{ listStyle: "none", padding: "10px" }}>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Trang Chủ
                </Link>
              </li>
              <li style={{ listStyle: "none", padding: "10px" }}>
                <Link
                  to="/page1"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  EGOV
                </Link>
              </li>
              <li style={{ listStyle: "none", padding: "10px" }}>
                <a
                  href="#"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Sinh Viên
                </a>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <div id="logo" style={{ width: "560px", textAlign: "center" }}>
            <img src={anhlogo} alt="Logo" style={{ width: "400px" }} />
          </div>

          {/* Search */}
          <div id="search" style={{ marginLeft: "auto", marginTop: "10px" }}>
            <form style={{ display: "flex" }}>
              <input
                type="text"
                name="q"
                placeholder="Tìm kiếm..."
                style={{ padding: "5px", fontSize: "14px" }}
              />
              <button
                type="submit"
                style={{
                  padding: "5px 10px",
                  marginLeft: "5px",
                  fontSize: "14px",
                }}
              >
                Tìm
              </button>
            </form>
          </div>
        </div>

        {/* Navigation */}
        <div id="nav" style={{ height: "80px", backgroundColor: "brown" }}>
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
            {/* Trang Chủ */}
            <li style={{ margin: "0 20px", position: "relative" }}>
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

            {/* EGOV */}
            <li style={{ margin: "0 20px", position: "relative" }}>
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
                EGOV
              </Link>
            </li>

            {/* Các mục khác giữ nguyên */}
            <li style={{ margin: "0 20px", position: "relative" }}>
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
            <li style={{ margin: "0 20px", position: "relative" }}>
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
                Tuyển Sinh
              </a>
            </li>
            <li style={{ margin: "0 20px", position: "relative" }}>
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
                Liên Hệ
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Slide Show */}
      <div
        id="slide"
        style={{
          width: "100%",
          height: "400px",
          overflow: "hidden",
          position: "relative",
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
              position: "absolute",
              top: 0,
              left: 0,
              opacity: currentSlide === index ? 1 : 0,
              transition: "opacity 1s ease-in-out",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div id="container" className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
