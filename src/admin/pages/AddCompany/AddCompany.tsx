import React, { useState } from "react";
import styles from "./AddCompany.module.scss";
import { LuBuilding2 } from "react-icons/lu";
import { API_COMPANIES, API_FILE } from "../../../constants/apiBase";

export default function AddCompany() {
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");
  const [voen, setVoen] = useState("");
  const [gmail, setGmail] = useState("");
  const [phone, setPhone] = useState("");
  const [workerNumber, setWorkerNumber] = useState<number | "">("");
  const [logo, setLogo] = useState<File | null>(null);

  // ✅ Yalnız icazə verilən fayl tipləri
  const validImageTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/svg+xml",
    "image/gif",
    "image/webp",
  ];

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setLogo(null);
      return;
    }
    if (!validImageTypes.includes(file.type)) {
      alert(
        "⚠️ Yalnız JPG, JPEG, PNG, SVG, GIF və WEBP formatlı şəkillər qəbul olunur."
      );
      e.target.value = "";
      setLogo(null);
      return;
    }
    setLogo(file);
  };

  const validateForm = (): boolean => {
    if (!companyName.trim()) {
      alert("⚠️ Şirkət adı boş ola bilməz");
      return false;
    }
    if (companyName.length < 2 || companyName.length > 100) {
      alert("⚠️ Şirkət adı 2 ilə 100 simvol arasında olmalıdır");
      return false;
    }
    if (!location.trim()) {
      alert("⚠️ Konum boş ola bilməz");
      return false;
    }
    if (!about.trim()) {
      alert("⚠️ Haqqında bölməsi boş ola bilməz");
      return false;
    }
    if (about.length > 500) {
      alert("⚠️ Haqqında maksimum 500 simvol ola bilər");
      return false;
    }
    if (!voen.trim()) {
      alert("⚠️ VÖEN boş ola bilməz");
      return false;
    }
    if (voen.length < 6 || voen.length > 15) {
      alert("⚠️ VÖEN 6 ilə 15 simvol arasında olmalıdır");
      return false;
    }
    if (!gmail.trim()) {
      alert("⚠️ E-poçt ünvanı boş ola bilməz");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(gmail)) {
      alert("⚠️ E-poçt ünvanı düzgün formatda deyil");
      return false;
    }
    if (!phone.trim()) {
      alert("⚠️ Telefon nömrəsi boş ola bilməz");
      return false;
    }
    if (!/^\+994(50|51|55|70|77)[0-9]{7}$/.test(phone)) {
      alert(
        "⚠️ Telefon '+994' ilə başlayıb, 50, 51, 55, 70 və ya 77 ilə davam etməli və ümumilikdə 13 rəqəm olmalıdır"
      );
      return false;
    }
    if (workerNumber === "" || workerNumber === null) {
      alert("⚠️ İşçi sayı boş ola bilməz");
      return false;
    }
    if (Number(workerNumber) < 0) {
      alert("⚠️ İşçi sayı 0 və ya daha böyük olmalıdır");
      return false;
    }
    if (!logo) {
      alert("⚠️ Loqo şəkli seçilməlidir");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!confirm(`"${companyName}" şirkətini əlavə etmək istədiyinizə əminsinizmi?`)) return;

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("❌ Giriş etməmisiniz. Əvvəlcə login olun.");
        return;
      }

      // 1️⃣ Şəkili yüklə
      const fileForm = new FormData();
      fileForm.append("file", logo!);

      const fileResp = await fetch(`${API_FILE}/api/files/save-file`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fileForm,
      });

      const fileText = await fileResp.text();
      if (!fileResp.ok) {
        alert(`❌ Şəkil yüklənmədi: ${fileText}`);
        return;
      }
      const photoUrl = fileText.trim();

      // 2️⃣ Şirkət məlumatlarını göndər
      const companyDto = {
        companyName,
        companyAddress: location,
        companyPhoneNumber: phone,
        companyEmail: gmail,
        companyTin: voen,
        companyDescription: about,
        totalEmployees: Number(workerNumber),
        companyLogoKey: photoUrl,
      };

      const companyResp = await fetch(
        `${API_COMPANIES}/api/organizations/company/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(companyDto),
        }
      );

      if (companyResp.ok) {
        alert("✅ Şirkət uğurla əlavə olundu!");
        setCompanyName("");
        setLocation("");
        setPhone("");
        setGmail("");
        setVoen("");
        setAbout("");
        setWorkerNumber("");
        setLogo(null);
      } else {
        const errMsg = await companyResp.text();
        alert(`❌ Şirkət əlavə edilərkən xəta: ${errMsg}`);
      }
    } catch (err) {
      console.error("Server xətası:", err);
      alert("❌ Serverə qoşulmaq mümkün olmadı.");
    }
  };

  return (
    <div className={styles.AddCompany}>
      <h2>
        <LuBuilding2 /> Şirkət Əlavə Et
      </h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Şirkət Logosu:
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.svg,.gif,.webp"
            onChange={handleLogoChange}
            required
          />
        </label>
        <label>
          Şirkət Adı:
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </label>
        <label>
          Konum:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
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
            required
          />
        </label>
        <label>
          Şirkət Gmail:
          <input
            type="email"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            required
          />
        </label>
        <label>
          Şirkət VÖEN:
          <input
            type="text"
            value={voen}
            onChange={(e) => setVoen(e.target.value)}
            required
          />
        </label>
        <label>
          Şirkət Haqqında:
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            maxLength={500}
            required
          />
        </label>
        <label>
          İşçi sayı:
          <input
            type="number"
            value={workerNumber}
            onChange={(e) =>
              setWorkerNumber(e.target.value ? Number(e.target.value) : "")
            }
            min={0}
            required
          />
        </label>
        <button type="submit">✅ Əlavə Et</button>
      </form>
    </div>
  );
}