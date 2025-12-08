// src/OrderList.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { Link } from "react-router-dom";

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setOrders([]);
      setLoading(false);
      return;
    }
    const user = JSON.parse(storedUser);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) setOrders(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading)
    return <h2 style={{ color: "#fff", textAlign: "center" }}>Đang tải...</h2>;

  return (
    <div style={{ padding: "20px", color: "#fff" }}>
      <h1>Danh sách đơn hàng</h1>

      {orders.length === 0 ? (
        <h3>Chưa có đơn hàng nào</h3>
      ) : (
        <div style={{ marginTop: "20px" }}>
          {orders.map((order) => (
            <Link
              to={`/orders/${order.id}`}
              key={order.id}
              style={{
                display: "block",
                background: "#222",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "10px",
                textDecoration: "none",
                color: "white",
              }}
            >
              <div>ID đơn hàng: {order.id}</div>
              <div>
                Tổng tiền: {Number(order.total).toLocaleString("vi-VN")}₫
              </div>
              <div>Trạng thái: {order.status}</div>
              <div>Ngày tạo: {new Date(order.created_at).toLocaleString()}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;
