import { useState, useEffect } from "react";
import { FaEnvelope, FaUsers, FaClock, FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./ForgotPassword.module.scss";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [companyName, setCompanyName] = useState(
    "Sumqayıt Texnologiylar Parkı"
  );

  useEffect(() => {
    // Fetch company name from API on page load
    fetch("http://192.168.200.133:8081/api/companies")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Server error");
        }
        return res.text(); // because your API returns plain text (not JSON)
      })
      .then((data) => {
        setCompanyName(data);
      })
      .catch((err) => {
        console.error("API fetch failed:", err);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === "") {
      setError(true);
    } else {
      setError(false);
      console.log("Şifrə sıfırlama emaili göndərildi:", email);
    }
  };

  return (
    <div className={styles.Forgot}>
      <div className={styles.ForgotLeft}>
        <div className={styles.logoWrapper}>
          <img src="src/website/assets/stpmmcwhite.png" alt="STP Logo" />
          <span>{companyName}</span>
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
            <p>
              STP Şirkətlər Qrupunda 2000-dən çox işçi kollektivi ilə yüksək
              komanda ruhunda əməkdaşlıq
            </p>
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

      <div className={styles.ForgotForm}>
        <div className={styles.logoTitle}>
          <img src="src/website/assets/stpmmc.png" alt="STP MMC Logo" />
          <h1>Şifrəni yeniləyin</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Email adresiniz</label>
          <div
            className={`${styles.inputGroup} ${
              error ? styles.errorBorder : ""
            }`}
          >
            <FaEnvelope />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(false);
              }}
              placeholder="info@stp.az"
            />
          </div>
          {error && (
            <span className={styles.errorText}>Bu bölmə doldurulmalıdır</span>
          )}

          <button type="submit">Şifrəni Dəyişin</button>
        </form>

        <div className={styles.signupLink}>
          <p>
            Hesabınız var? <Link to="/signin">Daxil olun</Link>
          </p>
        </div>
        <div className={styles.Links}>
          <Link to="/">Ana Səhifə</Link>
          <Link to="/companies">Şirkətlər</Link>
          <Link to="/profile">Profile</Link>
        </div>
      </div>
    </div>
  );
}
