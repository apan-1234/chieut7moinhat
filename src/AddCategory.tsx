import React, { useState } from "react";
import { supabase } from "./supabaseClient";

const AddCategory: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");

  // Chọn ảnh
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  // Thêm danh mục
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("⏳ Đang tạo danh mục...");

    try {
      let imageUrl = "";

      // Upload ảnh nếu có chọn
      if (file) {
        const fileName = `cate_${Date.now()}_${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("categories")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("categories")
          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;
      }

      // Insert danh mục
      const { error: insertError } = await supabase.from("categories").insert([
        {
          name,
          description,
          image: imageUrl,
        },
      ]);

      if (insertError) throw insertError;

      setMessage("✅ Tạo danh mục thành công!");
      setName("");
      setDescription("");
      setFile(null);
      setPreview("");
    } catch (err: any) {
      setMessage("❌ Lỗi: " + err.message);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "0 auto" }}>
      <h2>Thêm danh mục</h2>

      <form onSubmit={handleAdd}>
        <label>Tên danh mục</label>
        <input
          style={input}
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />

        <label>Mô tả</label>
        <textarea
          style={input}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Ảnh đại diện</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={input}
        />

        {preview && (
          <div style={{ textAlign: "center" }}>
            <img
              src={preview}
              alt="preview"
              style={{
                width: 160,
                height: 160,
                objectFit: "cover",
                borderRadius: 10,
                marginBottom: 15,
              }}
            />
          </div>
        )}

        <button style={button}>Tạo danh mục</button>
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

export default AddCategory;
