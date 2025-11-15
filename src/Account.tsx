// src/Account.tsx
import React, { useEffect, useState } from "react";
import { supabaseAdmin } from "./supabaseAdmin";

const Account: React.FC = () => {
  const [accounts, setAccounts] = useState<any[]>([]);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    const { data, error } = await supabaseAdmin.from("ACCOUNT").select("*");
    if (!error) setAccounts(data || []);
  };

  const grantAdmin = async (id: number) => {
    await supabaseAdmin.from("ACCOUNT").update({ role: "admin" }).eq("id", id);
    loadAccounts();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Quản lý tài khoản</h2>
      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Tên đăng nhập</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Vai trò</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc) => (
            <tr key={acc.id}>
              <td className="border p-2">{acc.id}</td>
              <td className="border p-2">{acc.username}</td>
              <td className="border p-2">{acc.email}</td>
              <td className="border p-2">{acc.role}</td>
              <td className="border p-2 text-center">
                {acc.role === "user" && (
                  <button
                    onClick={() => grantAdmin(acc.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Cấp quyền Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Account;
