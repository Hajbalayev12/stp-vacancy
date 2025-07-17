import { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaUsers,
  FaClock,
  FaUserFriends,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signin.module.scss";
import { useToast } from "../../../shared/context/ToastContext";

interface FormErrors {
  [key: string]: string | undefined;
}

export default function Signin() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, global: undefined }));
  };

  const validateForm = () => {
    const fieldErrors: FormErrors = {};

    if (!formData.email.trim()) {
      fieldErrors.email = "E-poçt boş ola bilməz";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      fieldErrors.email = "E-poçt düzgün formatda deyil";
    }

    if (!formData.password.trim()) {
      fieldErrors.password = "Şifrə boş ola bilməz";
    }

    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch(
        "http://192.168.200.133:8082/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const contentType = response.headers.get("content-type");
      const isJson = contentType && contentType.includes("application/json");
      const data = isJson ? await response.json() : null;

      if (!response.ok) {
        const message =
          data?.message || data?.error || "Email və ya şifrə yanlışdır.";

        const extractedErrors: FormErrors = {};

        if (typeof message === "string") {
          extractedErrors.global = message;
        } else if (typeof message === "object") {
          for (const key in message) {
            const value = message[key];
            if (typeof value === "string") {
              extractedErrors[key] = value;
            } else if (Array.isArray(value) && typeof value[0] === "string") {
              extractedErrors[key] = value[0];
            }
          }
        }

        setErrors(extractedErrors);

        // Show toast for each error
        Object.values(extractedErrors).forEach((msg) => {
          if (msg) showError(msg);
        });

        return;
      }

      showSuccess("Uğurla daxil oldunuz!");
      // localStorage.setItem("token", data.token); // if needed
      navigate("/");
    } catch (err) {
      showError("Server xətası baş verdi.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.Signin}>
      <div className={styles.SigninLeft}>
        <div className={styles.logoWrapper}>
          <img src="src/website/assets/stpmmcwhite.png" alt="STP Logo" />
          <span>Sumqayıt Texnologiyalar Parkı</span>
        </div>

        <div className={styles.infoBlock}>
          <FaUsers />
          <div>
            <h3>Professional Mühit</h3>
            <p>Yerli və xarici mütəxəssislərlə birgə çalışma imkanı</p>
          </div>
        </div>

        <div className={styles.infoBlock}>
          <FaClock />
          <div>
            <h3>Əməkdaşlıq</h3>
            <p>2000-dən çox işçi kollektivi ilə komanda ruhunda əməkdaşlıq</p>
          </div>
        </div>

        <div className={styles.infoBlock}>
          <FaUserFriends />
          <div>
            <h3>Əlavə təminatlar</h3>
            <p>Gündəlik nəqliyyat, nahar və tibbi siğorta ilə təminat</p>
          </div>
        </div>
      </div>

      <div className={styles.SigninForm}>
        <div className={styles.logoTitle}>
          <img src="src/website/assets/stpmmc.png" alt="STP MMC Logo" />
          <h1>Daxil olun!</h1>
        </div>

        <form onSubmit={handleSubmit}>
          {errors.global && (
            <div className={styles.globalError}>{errors.global}</div>
          )}

          <label>Email adresiniz</label>
          <div
            className={`${styles.inputGroup} ${
              errors.email ? styles.errorBorder : ""
            }`}
          >
            <FaEnvelope />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="info@stp.az"
            />
          </div>
          {errors.email && (
            <span className={styles.errorText}>{errors.email}</span>
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
              placeholder="********"
            />
            <span
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && (
            <span className={styles.errorText}>{errors.password}</span>
          )}

          <div className={styles.forgotPassword}>
            <Link to="/forgotpassword">Şifrənizi unutmusunuz?</Link>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Yoxlanılır..." : "Daxil olun"}
          </button>
        </form>

        <div className={styles.signupLink}>
          <p>
            Hesabınız yoxdur? <Link to="/signup">Qeydiyyatdan keçin</Link>
          </p>
        </div>

        <div className={styles.Links}>
          <Link to="/">Ana Səhifə</Link>
          <Link to="/companies">Şirkətlər</Link>
          <Link to="/profile">Profil</Link>
        </div>
      </div>
    </div>
  );
}
