import styles from "./Signup.module.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUsers,
  FaClock,
  FaUserFriends,
  FaUser,
  FaPhone,
  FaIdCard,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useToast } from "../../../shared/context/ToastContext";

export default function Signup() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();

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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const phoneRegex = /^\+994(50|51|55|70|77)\d{7}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const idSerialRegex = /^(AA\d{7}|AZE\d{8})$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

    if (!formData.name.trim()) newErrors.name = "Ad boş ola bilməz";
    if (!formData.surname.trim()) newErrors.surname = "Soyad boş ola bilməz";

    if (!formData.email.trim()) newErrors.email = "E-poçt boş ola bilməz";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "E-poçt düzgün formatda deyil";

    if (!formData.password.trim()) newErrors.password = "Şifrə boş ola bilməz";
    else if (!passwordRegex.test(formData.password))
      newErrors.password =
        "Şifrə bir böyük hərf, bir rəqəm və bir xüsusi simvol daxil etməlidir";

    if (formData.password !== formData.confirm_password)
      newErrors.confirm_password = "Şifrələr uyğun deyil";

    if (!formData.phone.trim())
      newErrors.phone = "Əlaqə nömrəsi boş ola bilməz";
    else if (!phoneRegex.test(formData.phone))
      newErrors.phone =
        "Telefon nömrəsi düzgün formatda deyil. +99450XXXXXXX kimi yazın";

    if (!formData.id_serial.trim())
      newErrors.id_serial = "Seriya nömrəsi boş ola bilməz";
    else if (!idSerialRegex.test(formData.id_serial))
      newErrors.id_serial =
        "Seriya nömrəsi 'AA1234567' (7 rəqəm) və ya 'AZE12345678' (8 rəqəm) formatında olmalıdır";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirm_password,
      phone: formData.phone.startsWith("+")
        ? formData.phone.slice(1)
        : formData.phone,
      seriaNumber: formData.id_serial,
      cv: [],
    };

    try {
      const response = await fetch(
        "http://192.168.200.133:8082/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        let errorData = null;
        try {
          errorData = await response.json();
        } catch (jsonError) {
          console.error("Failed to parse error JSON:", jsonError);
        }

        if (
          errorData &&
          typeof errorData.message === "object" &&
          errorData.message !== null
        ) {
          for (const key in errorData.message) {
            if (errorData.message[key]) showError(errorData.message[key]);
          }
        } else {
          showError(errorData?.message || "Xəta baş verdi");
        }
        console.error("Registration error:", errorData);
        return;
      }

      try {
        await response.json();
      } catch (jsonError) {
        console.warn("Failed to parse success JSON response:", jsonError);
      }

      showSuccess("Qeydiyyat uğurla tamamlandı!");
      navigate("/signin");
    } catch (error) {
      showError("Serverə qoşulmaq mümkün olmadı");
      console.error("Network or other error:", error);
    }
  };

  const renderInput = (
    label: string,
    name: string,
    type: string,
    icon: React.ReactNode,
    isPassword = false,
    showPasswordState = false,
    toggleShowPassword?: () => void
  ) => (
    <div className={styles.inputGroup} key={name}>
      <label>{label}</label>
      <div
        className={`${styles.inputWrapper} ${
          errors[name] ? styles.errorBorder : ""
        }`}
      >
        {icon}
        <input
          name={name}
          type={isPassword ? (showPasswordState ? "text" : "password") : type}
          value={formData[name as keyof typeof formData] as string}
          onChange={handleChange}
          placeholder={
            name === "phone"
              ? "+99450XXXXXXX"
              : name === "id_serial"
              ? "AA1234567 və ya AZE12345678"
              : undefined
          }
          autoComplete={isPassword ? "new-password" : undefined}
        />
        {isPassword && toggleShowPassword && (
          <span onClick={toggleShowPassword} style={{ cursor: "pointer" }}>
            {showPasswordState ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
      </div>
      {errors[name] && <span className={styles.error}>{errors[name]}</span>}
    </div>
  );

  return (
    <div className={styles.SignUp}>
      <div className={styles.SignupLeft}>
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
            <p>STP-də yüksək komanda ruhunda əməkdaşlıq</p>
          </div>
        </div>
        <div className={styles.infoBlock}>
          <FaUserFriends />
          <div>
            <h3>Əlavə təminatlar</h3>
            <p>Nəqliyyat, nahar və tibbi siğorta ilə təminat</p>
          </div>
        </div>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.header}>
          <img src="src/website/assets/stpmmc.png" alt="STP MMC" />
          <h1>Yeni hesab yarat!</h1>
        </div>

        <form onSubmit={handleSubmit}>
          {renderInput("Ad", "name", "text", <FaUser />)}
          {renderInput("Soyad", "surname", "text", <FaUser />)}
          {renderInput("Email", "email", "email", <FaEnvelope />)}
          {renderInput(
            "Şifrə",
            "password",
            "password",
            <FaLock />,
            true,
            showPassword,
            togglePasswordVisibility
          )}
          {renderInput(
            "Şifrəni təkrar daxil edin",
            "confirm_password",
            "password",
            <FaLock />,
            true,
            showConfirmPassword,
            toggleConfirmPasswordVisibility
          )}
          {renderInput("Mobil nömrə", "phone", "tel", <FaPhone />)}
          {renderInput("Seriya nömrəsi", "id_serial", "text", <FaIdCard />)}

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
          <Link to="/profile">Profil</Link>
        </div>
      </div>
    </div>
  );
}
