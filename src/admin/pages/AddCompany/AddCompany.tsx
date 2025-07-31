import React, { useState } from "react";
import styles from "./AddCompany.module.scss";
import { LuBuilding2 } from "react-icons/lu";
import { useToast } from "../../../shared/context/ToastContext";
import { API_COMPANIES } from "../../../constants/apiBase";

export default function AddCompany() {
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");
  const [voen, setVoen] = useState("");
  const [gmail, setGmail] = useState("");
  const [phone, setPhone] = useState("");
  const [workerNumber, setWorkerNumber] = useState<number | "">("");
  const [logo, setLogo] = useState<File | null>(null);

  const { showError, showSuccess } = useToast();

  // Allowed image MIME types for logo
  const validImageTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/svg+xml",
    "image/gif",
    "image/webp",
  ];

  // Logo input change handler with validation
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setLogo(null);
      return;
    }

    if (!validImageTypes.includes(file.type)) {
      showError(
        "Yalnız JPG, JPEG, PNG, SVG, GIF və WEBP formatlı şəkillər qəbul olunur."
      );
      e.target.value = "";
      setLogo(null);
      return;
    }

    setLogo(file);
  };

  const validateForm = (): boolean => {
    if (!companyName.trim()) {
      showError("Şirkət adı boş ola bilməz");
      return false;
    }
    if (companyName.length < 2 || companyName.length > 100) {
      showError("Şirkət adı 2 ilə 100 simvol arasında olmalıdır");
      return false;
    }
    if (!location.trim()) {
      showError("Konum boş ola bilməz");
      return false;
    }
    if (!about.trim()) {
      showError("Haqqında bölməsi boş ola bilməz");
      return false;
    }
    if (about.length > 500) {
      showError("Haqqında maksimum 500 simvol ola bilər");
      return false;
    }
    if (!voen.trim()) {
      showError("VÖEN boş ola bilməz");
      return false;
    }
    if (voen.length < 6 || voen.length > 15) {
      showError("VÖEN 6 ilə 15 simvol arasında olmalıdır");
      return false;
    }
    if (!gmail.trim()) {
      showError("E-poçt ünvanı boş ola bilməz");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(gmail)) {
      showError("E-poçt ünvanı düzgün formatda deyil");
      return false;
    }
    if (!phone.trim()) {
      showError("Telefon nömrəsi boş ola bilməz");
      return false;
    }
    if (!/^\+994(50|51|55|70|77)[0-9]{7}$/.test(phone)) {
      showError(
        "Telefon nömrəsi '+994' ilə başlayıb, 50, 51, 55, 70, 77 ilə davam etməli və ümumilikdə 13 rəqəm olmalıdır"
      );
      return false;
    }
    if (workerNumber === "" || workerNumber === null) {
      showError("İşçi sayı boş ola bilməz");
      return false;
    }
    if (workerNumber < 0) {
      showError("İşçi sayı 0 və ya daha böyük olmalıdır");
      return false;
    }
    if (!logo) {
      showError("Loqo şəkli seçilməlidir");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const confirmed = window.confirm(
      "Bu şirkəti yaratmaq istədiyinizə əminsiniz?"
    );
    if (!confirmed) return;

    const companyDto = {
      companyName,
      companyAddress: location,
      companyPhoneNumber: phone,
      companyEmail: gmail,
      companyTin: voen,
      companyDescription: about,
      totalEmployees: Number(workerNumber),
    };

    const formData = new FormData();
    formData.append("photo", logo!);

    const companyBlob = new Blob([JSON.stringify(companyDto)], {
      type: "application/json",
    });
    formData.append("companyDto", companyBlob);

    try {
      const response = await fetch(
        `${API_COMPANIES}/api/companies/add/company`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        showSuccess("Şirkət uğurla əlavə olundu!");

        setCompanyName("");
        setLocation("");
        setPhone("");
        setGmail("");
        setVoen("");
        setAbout("");
        setWorkerNumber("");
        setLogo(null);
      } else {
        showError("Xəta baş verdi. Zəhmət olmasa yenidən yoxlayın.");
      }
    } catch (error) {
      console.error("Serverə göndərmə zamanı xəta:", error);
      showError("Serverə qoşulmaq mümkün olmadı.");
    }
  };

  return (
    <div className={styles.AddCompany}>
      <h2>
        <LuBuilding2 /> Şirkət Əlavə Et
      </h2>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <label>
          Şirkət Logosu:
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.svg,.gif,.webp"
            onChange={handleLogoChange}
          />
        </label>

        <label>
          Şirkət Adı:
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </label>

        <label>
          Konum:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>

        <label>
          Şirkət Nömrəsi:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={13}
            placeholder="+994501234567"
          />
        </label>

        <label>
          Şirkət Gmail:
          <input
            type="email"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
          />
        </label>

        <label>
          Şirkət VÖEN:
          <input
            type="text"
            value={voen}
            onChange={(e) => setVoen(e.target.value)}
          />
        </label>

        <label>
          Şirkət Haqqında:
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            maxLength={500}
          />
        </label>

        <label>
          İşçi sayı:
          <input
            type="number"
            value={workerNumber}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "") {
                setWorkerNumber("");
              } else {
                const num = Number(val);
                if (num >= 0) setWorkerNumber(num);
              }
            }}
            min={0}
          />
        </label>

        <button type="submit">✅ Əlavə Et</button>
      </form>
    </div>
  );
}
