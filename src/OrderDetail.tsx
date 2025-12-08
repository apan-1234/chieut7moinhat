// src/OrderDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "./supabaseClient";

const OrderDetail: React.FC = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    if (!id) return;

    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;
    const user = JSON.parse(storedUser);

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    const { data: itemData } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", id);

    setOrder(orderData);
    setItems(itemData || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading)
    return <h2 style={{ color: "#fff", textAlign: "center" }}>Đang tải...</h2>;

  if (!order) return <h2 style={{ color: "#fff" }}>Không tìm thấy đơn hàng</h2>;

  return (
    <div style={{ padding: "20px", color: "#fff" }}>
      <h1>Chi tiết đơn hàng #{order.id}</h1>

      <p>
        <strong>Tổng tiền:</strong>{" "}
        {Number(order.total).toLocaleString("vi-VN")}₫
      </p>

      <p>
        <strong>Trạng thái:</strong> {order.status}
      </p>

      <h2 style={{ marginTop: "20px" }}>Sản phẩm:</h2>

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            background: "#222",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "15px",
            display: "flex",
            gap: "15px",
          }}
        >
          {item.image && (
            <img
              src={item.image}
              alt=""
              style={{
                width: 80,
                height: 80,
                borderRadius: "6px",
                objectFit: "cover",
              }}
            />
          )}

          <div>
            <h3 style={{ margin: 0 }}>{item.name}</h3>
            <p>Giá: {Number(item.price_at_time).toLocaleString("vi-VN")}₫</p>
            <p>Số lượng: {item.quantity}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderDetail;
