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
  { to: "/categories", label: "Danh Mục" }, // ✅ THÊM DANH MỤC
  { to: "/users", label: "Thành Viên" },
  { to: "#", label: "Đơn Hàng" },
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