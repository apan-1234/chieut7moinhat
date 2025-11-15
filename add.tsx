import React, { useState } from "react";
import { supabase } from "./supabaseClient";

const Add: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [message, setMessage] = useState("");

  // Khi chọn file ảnh
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // Thêm sản phẩm
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("⏳ Đang thêm sản phẩm...");

    try {
      let imageUrl = "";

      if (file) {
        const fileName = `${Date.now()}_${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("products")
          .getPublicUrl(fileName);
        imageUrl = data.publicUrl;
      }

      const { error: insertError } = await supabase.from("products").insert([
        {
          name,
          description,
          price,
          image: imageUrl,
        },
      ]);

      if (insertError) throw insertError;

      setMessage("✅ Thêm sản phẩm thành công!");
      setName("");
      setDescription("");
      setPrice(0);
      setFile(null);
      setPreview("");
    } catch (err: any) {
      setMessage("❌ Lỗi: " + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🛍️ Thêm sản phẩm mới</h2>
      <form onSubmit={handleAdd} style={styles.form}>
        <label style={styles.label}>Tên sản phẩm</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Mô tả</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ ...styles.input, height: "80px", resize: "none" }}
        />

        <label style={styles.label}>Giá (VNĐ)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
          style={styles.input}
        />

        <label style={styles.label}>Hình ảnh sản phẩm</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={styles.fileInput}
        />

        {preview && (
          <div style={styles.previewContainer}>
            <img src={preview} alt="preview" style={styles.previewImage} />
          </div>
        )}

        <button type="submit" style={styles.button}>
          ➕ Thêm sản phẩm
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

// CSS
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    background: "#fff",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  title: { textAlign: "center", marginBottom: "20px", color: "#333" },
  form: { display: "flex", flexDirection: "column" },
  label: { fontWeight: "bold", marginBottom: "6px", color: "#444" },
  input: {
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },
  fileInput: { marginBottom: "15px" },
  previewContainer: { textAlign: "center", marginBottom: "15px" },
  previewImage: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "background 0.3s",
  },
  message: {
    marginTop: "15px",
    textAlign: "center",
    fontWeight: "bold",
    color: "#555",
  },
};

export default Add;
