import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../admin/components/Sidebar/Sidebar";
import Navbar from "../../admin/components/Navbar/Navbar";
import styles from "./AdminLayout.module.scss";

export default function AdminLayout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  React.useEffect(() => {
    if (!token) {
      navigate("/admin/signin");
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return (
    <div className={styles.AdminLayout}>
      <Navbar />
      <div className={styles.Main}>
        <Sidebar />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
