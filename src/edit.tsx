import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "./supabaseClient";

const Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState("");
  const [stock, setStock] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const [categories, setCategories] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  // Load product + danh mục
  useEffect(() => {
    fetchCategories();
    if (id) fetchProduct();
  }, [id]);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("id");

    if (!error) setCategories(data || []);
  };

  const fetchProduct = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) console.log(error.message);
    else {
      setName(data.name);
      setDescription(data.description);
      setPrice(data.price);
      setImage(data.image);
      setStock(data.stock);
      setCategoryId(data.category_id); // 🟢 load category_id
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from("products")
      .update({
        name,
        description,
        price,
        image,
        stock,
        category_id: categoryId, // 🟢 cập nhật danh mục
      })
      .eq("id", id);

    if (error) setMessage("❌ Lỗi: " + error.message);
    else setMessage("✅ Cập nhật thành công!");
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "0 auto" }}>
      <h2>Chỉnh sửa sản phẩm</h2>

      <form onSubmit={handleUpdate}>
        <label>Tên sản phẩm</label>
        <input
          style={input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Mô tả</label>
        <textarea
          style={input}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Giá (VNĐ)</label>
        <input
          type="number"
          style={input}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <label>Link ảnh</label>
        <input
          style={input}
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <label>Tồn kho</label>
        <input
          type="number"
          style={input}
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
        />

        <label>Danh mục</label>
        <select
          style={input}
          value={categoryId ?? ""}
          onChange={(e) => setCategoryId(Number(e.target.value))}
        >
          <option value="">-- Chọn danh mục --</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button style={button}>Lưu thay đổi</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

const input: React.CSSProperties = {
  width: "100%",
  marginBottom: 10,
  padding: 8,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const button: React.CSSProperties = {
  padding: 10,
  width: "100%",
  background: "#007bff",
  border: "none",
  color: "#fff",
  fontWeight: "bold",
  borderRadius: 6,
  cursor: "pointer",
};

export default Edit;
