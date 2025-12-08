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

      // Upload ảnh
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
    <div style={styles.container}>
      <h2 style={styles.title}>📁 Thêm danh mục mới</h2>

      <form onSubmit={handleAdd} style={styles.form}>
        <label style={styles.label}>Tên danh mục</label>
        <input
          style={styles.input}
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />

        <label style={styles.label}>Mô tả</label>
        <textarea
          style={{ ...styles.input, height: 80 }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label style={styles.label}>Ảnh đại diện</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={styles.input}
        />

        {preview && (
          <div style={{ textAlign: "center" }}>
            <img src={preview} alt="preview" style={styles.previewImage} />
          </div>
        )}

        <button type="submit" style={styles.button}>
          ➕ Thêm danh mục
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 500,
    margin: "40px auto",
    padding: 30,
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "Arial",
  },
  title: { textAlign: "center", marginBottom: 20 },
  form: { display: "flex", flexDirection: "column" },
  label: { margin: "8px 0 4px", fontWeight: "bold" },
  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
    marginBottom: 15,
  },
  previewImage: {
    width: 150,
    height: 150,
    objectFit: "cover",
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    padding: 12,
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "bold",
  },
  message: { textAlign: "center", marginTop: 15, fontWeight: "bold" },
};

export default AddCategory;
