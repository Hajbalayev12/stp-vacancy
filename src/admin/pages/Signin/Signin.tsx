import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignIn.module.scss";
import {
  FaEnvelope,
  FaLock,
  FaUsers,
  FaClock,
  FaUserFriends,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export default function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  // ❗ Random dəyərlərlə doldur (component yüklənəndə)
  useEffect(() => {
    const randomUsername = `user${Math.floor(Math.random() * 1000)}`;
    const randomPassword = Math.random().toString(36).slice(-8);

    setFormData({
      username: randomUsername,
      password: randomPassword,
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Səhvləri təmizlə
    setErrors({ ...errors, [name]: false });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      username: formData.username === "",
      password: formData.password === "",
    };

    setErrors(newErrors);

    if (!newErrors.username && !newErrors.password) {
      localStorage.setItem("adminToken", "fake-token");
      navigate("/admin/home");
    }
  };

  return (
    <div className={styles.Signin}>
      <div className={styles.SigninLeft}>
        <div className={styles.logoWrapper}>
          <img src="/src/admin/assets/stpmmcwhite.png" alt="STP Logo" />
          <span>Sumqayıt Texnologiylar Parkı Admin Panel</span>
        </div>
        <div className={styles.infoBlock}>
          <FaUsers />
          <div>
            <h3>“STP Admin Panelinə xoş gəlmisiniz”</h3>
          </div>
        </div>
        <div className={styles.infoBlock}>
          <FaClock />
          <div>
            <h3>
              “Admin panelə giriş üçün istifadəçi məlumatlarınızı daxil edin”
            </h3>
          </div>
        </div>
        <div className={styles.infoBlock}>
          <FaUserFriends />
          <div>
            <h3>
              “Yalnız səlahiyyətli istifadəçilər üçün nəzərdə tutulmuşdur”
            </h3>
          </div>
        </div>
      </div>

      <div className={styles.SigninForm}>
        <div className={styles.logoTitle}>
          <img src="/src/admin/assets/Logo.png" alt="STP MMC Logo" />
          <h1>Daxil olun!</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <label>İstifadəçi adı</label>
          <div
            className={`${styles.inputGroup} ${
              errors.username ? styles.errorBorder : ""
            }`}
          >
            <FaEnvelope />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="İstifadəçi adınızı daxil edin"
            />
          </div>
          {errors.username && (
            <span className={styles.errorText}>Bu bölmə doldurulmalıdır</span>
          )}

          <label>Şifrə</label>
          <div
            className={`${styles.inputGroup} ${
              errors.password ? styles.errorBorder : ""
            }`}
          >
            <FaLock />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Şifrənizi daxil edin"
            />
            <span onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && (
            <span className={styles.errorText}>Bu bölmə doldurulmalıdır</span>
          )}

          <button type="submit">Daxil olun</button>
        </form>
      </div>
    </div>
  );
}
