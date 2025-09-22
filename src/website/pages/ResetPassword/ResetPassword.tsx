import { useSearchParams, useNavigate, Link } from "react-router-dom";
import styles from "./ResetPassword.module.scss";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../assets/stpmmc.png";
import { API_USERS } from "../../../constants/apiBase";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 👁 şifrəni göstər/gizlət state-ləri
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setMessage("Bütün sahələr doldurulmalıdır");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Şifrələr uyğun deyil");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const url = `${API_USERS}/api/users/reset-password?token=${token}&newPassword=${encodeURIComponent(
        newPassword
      )}&confirmPassword=${encodeURIComponent(confirmPassword)}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Xəta baş verdi");
      }

      setMessage("Şifrəniz uğurla dəyişdirildi!");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (err: any) {
      setMessage(err.message || "Server xətası baş verdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.resetWrapper}>
      {/* ✅ Logo yuxarıda */}
      <img src={logo} alt="Company Logo" className={styles.logo} />

      <h1>🔒 Şifrəni yeniləyin</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Yeni şifrə */}
        <div className={styles.inputGroup}>
          <label>Yeni şifrə</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading}
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Şifrəni təsdiqlə */}
        <div className={styles.inputGroup}>
          <label>Şifrəni təsdiqlə</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Göndərilir..." : "Şifrəni dəyişdir !"}
        </button>
      </form>

      {message && <p className={styles.info}>{message}</p>}

      {/* ✅ Hesabım var linki */}
      <p className={styles.signinText}>
        Hesabım var.{" "}
        <Link to="/signin" className={styles.signinLink}>
          Daxil olmaq
        </Link>
      </p>
    </div>
  );
}
