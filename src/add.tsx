// src/add.tsx
import React, { useState } from "react";
import { supabase } from "./supabaseClient";

const Add: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from("products")
      .insert([{ name, description, price, image }]);

    if (error) setMessage("❌ Lỗi: " + error.message);
    else {
      setMessage("✅ Thêm sản phẩm thành công!");
      setName("");
      setDescription("");
      setPrice(0);
      setImage("");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Thêm sản phẩm mới</h2>
      <form onSubmit={handleAdd}>
        <div>
          <label>Tên sản phẩm:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Mô tả:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Giá (VNĐ):</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Link hình ảnh:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <button type="submit">Thêm sản phẩm</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Add;
