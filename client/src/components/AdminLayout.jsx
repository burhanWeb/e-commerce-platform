import React from "react";
import AdminSideBar from "../pages/AdminSideBar.jsx"; // Admin sidebar
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div style={{ display: "flex" }}>
      <AdminSideBar />
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
