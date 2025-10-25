import React from "react";
import users from "./data/users";

const PageUsers = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>The UnderDog</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              width: "220px",
              textAlign: "center",
              backgroundColor: "#000",
            }}
          >
            <img
              src={user.avatar}
              alt={user.name}
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
            <h3>{user.name}</h3>
            <p>Tuổi: {user.age}</p>
            <p>{user.job}</p>
            <p style={{ color: "blue", fontSize: "0.9em" }}>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageUsers;
