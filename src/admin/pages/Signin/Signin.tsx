import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignIn.module.scss";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username && password) {
      localStorage.setItem("adminToken", "fake-token");
      navigate("/admin/home");
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <div className={styles.Signin}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Admin Sign In</h2>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.input}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </label>

        <button type="submit" className={styles.button}>
          Sign In
        </button>
      </form>
    </div>
  );
}
