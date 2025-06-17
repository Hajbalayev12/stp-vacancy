import styles from "./Signup.module.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUsers,
  FaClock,
  FaUserFriends,
  FaUser,
  FaPhone,
  FaIdCard,
  FaFileAlt,
} from "react-icons/fa";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    id_serial: "",
    cv: null as File | null,
  });

  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    id_serial: "",
    cv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let formIsValid = true;
    const newErrors = { ...errors };

    Object.keys(formData).forEach((field) => {
      const fieldValue = formData[field as keyof typeof formData];
      if (!fieldValue) {
        formIsValid = false;
        newErrors[field as keyof typeof newErrors] = "Bu bölmə doldurulmalıdır";
      } else {
        newErrors[field as keyof typeof newErrors] = "";
      }
    });

    if (formData.password !== formData.confirm_password) {
      formIsValid = false;
      newErrors.confirm_password = "Şifrələr uyğun deyil";
    }

    setErrors(newErrors);

    if (formIsValid) {
      console.log("Form Submitted Successfully");
      // Burada serverə göndərmək və ya redirect edə bilərsən
    }
  };

  return (
    <div className={styles.SignUp}>
      <div className={styles.SignupLeft}>
        <div className={styles.logoWrapper}>
          <img src="src/website/assets/stpmmcwhite.png" alt="STP Logo" />
          <span>Sumqayıt Texnologiylar Parkı</span>
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

      <div className={styles.formContainer}>
        <div className={styles.header}>
          <img src="src/website/assets/stpmmc.png" alt="STP MMC" />
          <h1>Yeni hesab yarat!</h1>
        </div>

        <form
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className={styles.inputGroup}>
            <label>Ad</label>
            <div
              className={`${styles.inputWrapper} ${
                errors.name ? styles.errorBorder : ""
              }`}
            >
              <FaUser />
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label>Soyad</label>
            <div
              className={`${styles.inputWrapper} ${
                errors.surname ? styles.errorBorder : ""
              }`}
            >
              <FaUser />
              <input
                name="surname"
                type="text"
                value={formData.surname}
                onChange={handleChange}
              />
            </div>
            {errors.surname && (
              <span className={styles.error}>{errors.surname}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <div
              className={`${styles.inputWrapper} ${
                errors.email ? styles.errorBorder : ""
              }`}
            >
              <FaEnvelope />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Şifrə</label>
            <div
              className={`${styles.inputWrapper} ${
                errors.password ? styles.errorBorder : ""
              }`}
            >
              <FaLock />
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Şifrəni təkrar daxil edin</label>
            <div
              className={`${styles.inputWrapper} ${
                errors.confirm_password ? styles.errorBorder : ""
              }`}
            >
              <FaLock />
              <input
                name="confirm_password"
                type="password"
                value={formData.confirm_password}
                onChange={handleChange}
              />
            </div>
            {errors.confirm_password && (
              <span className={styles.error}>{errors.confirm_password}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Mobil nömrə</label>
            <div
              className={`${styles.inputWrapper} ${
                errors.phone ? styles.errorBorder : ""
              }`}
            >
              <FaPhone />
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            {errors.phone && (
              <span className={styles.error}>{errors.phone}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Şəxsiyyət vəsiqəsinin seriya nömrəsi</label>
            <div
              className={`${styles.inputWrapper} ${
                errors.id_serial ? styles.errorBorder : ""
              }`}
            >
              <FaIdCard />
              <input
                name="id_serial"
                type="text"
                value={formData.id_serial}
                onChange={handleChange}
              />
            </div>
            {errors.id_serial && (
              <span className={styles.error}>{errors.id_serial}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>CV (PDF/DOC)</label>
            <div
              className={`${styles.inputWrapper} ${
                errors.cv ? styles.errorBorder : ""
              }`}
            >
              <FaFileAlt />
              <input
                name="cv"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
              />
            </div>
            {errors.cv && <span className={styles.error}>{errors.cv}</span>}
          </div>

          <button type="submit">Qeydiyyatdan keç</button>
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
