// src/page1.js
import React from "react";
import products from "./data/product";

const Page1 = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Danh sách sản phẩm</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "flex-start",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              width: "200px",
              boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p
              style={{
                fontWeight: "bold",
                color: "brown",
              }}
            >
              Giá:{" "}
              {product.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page1;
