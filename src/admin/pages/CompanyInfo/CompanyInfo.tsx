import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./CompanyInfo.module.scss";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaUsers } from "react-icons/fa";
import { useToast } from "../../../shared/context/ToastContext";
import { API_COMPANIES } from "../../../constants/apiBase";

interface TeamMember {
  name: string;
  position: string;
  email: string;
  photoUrl: string;
}

interface Company {
  id: number;
  companyName: string;
  companyAddress: string;
  companyPhoneNumber: string;
  companyEmail: string;
  companyTin: string;
  companyDescription: string;
  totalEmployees: number;
  companyLogoUrl?: string;
  responseTeamMemberDtos?: TeamMember[];
}

interface FormErrors {
  companyName?: string;
  companyAddress?: string;
  companyPhoneNumber?: string;
  companyEmail?: string;
  companyTin?: string;
  companyDescription?: string;
  totalEmployees?: string;
}

const CompanyInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showUpdateSection, setShowUpdateSection] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    companyPhoneNumber: "",
    companyEmail: "",
    companyTin: "",
    companyDescription: "",
    totalEmployees: 0,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");

  const API_BASE_URL = `${API_COMPANIES}/api/organizations/company`;
  const { showError, showSuccess } = useToast();

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    fetch(`${API_BASE_URL}/${id}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) throw new Error("Şirkət tapılmadı.");
          throw new Error(`Məlumat alınmadı: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data: Company) => {
        setCompany(data);
        setFormData({
          companyName: data.companyName || "",
          companyAddress: data.companyAddress || "",
          companyPhoneNumber: data.companyPhoneNumber || "",
          companyEmail: data.companyEmail || "",
          companyTin: data.companyTin || "",
          companyDescription: data.companyDescription || "",
          totalEmployees: data.totalEmployees || 0,
        });
        setLogoPreview(
          data.companyLogoUrl && data.companyLogoUrl !== "string"
            ? data.companyLogoUrl
            : "/src/admin/assets/Logo.png"
        );
        setLogoFile(null);
        setFormErrors({});
      })
      .catch((err) => {
        console.error("Şirkət məlumatları yüklənərkən xəta:", err);
        showError(err.message || "Şirkət məlumatları yüklənə bilmədi.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "companyPhoneNumber") {
      if (value.length > 13) return;
      if (!/^[+\d]*$/.test(value)) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: name === "totalEmployees" ? parseInt(value, 10) || 0 : value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/gif",
        "image/webp",
        "image/jpg",
      ];

      if (!validTypes.includes(file.type)) {
        showError(
          "Yalnız JPG, JPEG, PNG, SVG, GIF və WEBP formatlı şəkillər qəbul olunur."
        );
        e.target.value = "";
        setLogoFile(null);
        setLogoPreview(
          company?.companyLogoUrl && company.companyLogoUrl !== "string"
            ? company.companyLogoUrl
            : "/src/admin/assets/Logo.png"
        );
        return;
      }

      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const hasChanges = () => {
    if (!company) return true;

    const formChanged =
      formData.companyName !== company.companyName ||
      formData.companyAddress !== company.companyAddress ||
      formData.companyPhoneNumber !== company.companyPhoneNumber ||
      formData.companyEmail !== company.companyEmail ||
      formData.companyTin !== company.companyTin ||
      formData.companyDescription !== company.companyDescription ||
      formData.totalEmployees !== company.totalEmployees;

    const fileChanged = logoFile !== null;

    return formChanged || fileChanged;
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.companyName.trim()) {
      errors.companyName = "Şirkətin adı boş ola bilməz";
    } else if (
      formData.companyName.length < 2 ||
      formData.companyName.length > 100
    ) {
      errors.companyName = "Şirkətin adı 2 ilə 100 simvol arasında olmalıdır";
    }

    if (!formData.companyAddress.trim()) {
      errors.companyAddress = "Ünvan boş ola bilməz";
    }

    if (!formData.companyPhoneNumber.trim()) {
      errors.companyPhoneNumber = "Əlaqə nömrəsi boş ola bilməz";
    } else if (
      !/^\+994(50|51|55|70|77)[0-9]{7}$/.test(formData.companyPhoneNumber)
    ) {
      errors.companyPhoneNumber = "Telefon nömrəsi düzgün deyil";
    }

    if (!formData.companyEmail.trim()) {
      errors.companyEmail = "E-poçt ünvanı boş ola bilməz";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.companyEmail)) {
      errors.companyEmail = "E-poçt ünvanı düzgün formatda deyil";
    }

    if (!formData.companyTin.trim()) {
      errors.companyTin = "VÖEN boş ola bilməz";
    } else if (
      formData.companyTin.length < 6 ||
      formData.companyTin.length > 15
    ) {
      errors.companyTin = "VÖEN 6 ilə 15 simvol arasında olmalıdır";
    }

    if (formData.companyDescription.length > 500) {
      errors.companyDescription = "Təsvir maksimum 500 simvol ola bilər";
    }

    if (
      formData.totalEmployees === null ||
      formData.totalEmployees === undefined
    ) {
      errors.totalEmployees = "İşçi sayı boş ola bilməz";
    } else if (formData.totalEmployees < 0) {
      errors.totalEmployees = "İşçi sayı 0 və ya daha böyük olmalıdır";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleUpdate = async () => {
    if (!id) {
      showError("Şirkət ID-si tapılmadı.");
      return;
    }

    if (!hasChanges()) {
      showError("Dəyişiklik edilməyib.");
      return;
    }

    if (!validateForm()) {
      showError("Zəhmət olmasa, bütün sahələri düzgün doldurun.");
      return;
    }

    setIsUpdating(true);
    try {
      const form = new FormData();
      const companyDtoBlob = new Blob([JSON.stringify(formData)], {
        type: "application/json",
      });
      form.append("companyDto", companyDtoBlob);
      if (logoFile) {
        form.append("photo", logoFile);
      }

      const res = await fetch(`${API_BASE_URL}/update/${id}`, {
        method: "PUT",
        body: form,
      });

      const contentType = res.headers.get("content-type");
      let data: any;
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        data = { message: text };
      }

      if (!res.ok) {
        const backendError =
          data?.message?.error ||
          data?.message ||
          "Məlumatları yeniləmək mümkün olmadı.";
        throw new Error(backendError);
      }

      const backendSuccess = data?.message || "Məlumatlar uğurla yeniləndi.";
      showSuccess(backendSuccess);

      const refreshRes = await fetch(
        `${API_BASE_URL}/api/organizations/company/${id}`
      );

      if (!refreshRes.ok) {
        throw new Error("Yenilənmiş məlumatlar alınmadı.");
      }

      const refreshedData = await refreshRes.json();
      setCompany(refreshedData);
      setFormData({
        companyName: refreshedData.companyName || "",
        companyAddress: refreshedData.companyAddress || "",
        companyPhoneNumber: refreshedData.companyPhoneNumber || "",
        companyEmail: refreshedData.companyEmail || "",
        companyTin: refreshedData.companyTin || "",
        companyDescription: refreshedData.companyDescription || "",
        totalEmployees: refreshedData.totalEmployees || 0,
      });
      setLogoPreview(
        refreshedData.companyLogoUrl &&
          refreshedData.companyLogoUrl !== "string"
          ? refreshedData.companyLogoUrl
          : "/src/admin/assets/Logo.png"
      );
      setLogoFile(null);
      setShowUpdateSection(false);
      setFormErrors({});
    } catch (err: any) {
      console.error("Yeniləmə zamanı xəta baş verdi:", err);
      showError(err.message || "Yeniləmə zamanı gözlənilməyən xəta baş verdi.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <div className={styles.CompanyInfo}>Yüklənir...</div>;
  if (!company) return null;

  return (
    <div className={styles.CompanyInfo}>
      <div className={styles.header}>
        <img
          src={logoPreview || "/src/admin/assets/Logo.png"}
          alt="Company Logo"
          className={styles.logo}
        />
        <div>
          <h1>{company.companyName}</h1>
          <p>{company.companyDescription}</p>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.infoBox}>
          <FaMapMarkerAlt />
          <div>
            <h4>Ünvan</h4>
            <p>{company.companyAddress}</p>
          </div>
        </div>
        <div className={styles.infoBox}>
          <FaEnvelope />
          <div>
            <h4>E-mail</h4>
            <p>{company.companyEmail}</p>
          </div>
        </div>
        <div className={styles.infoBox}>
          <FaPhone />
          <div>
            <h4>Əlaqə</h4>
            <p>{company.companyPhoneNumber}</p>
          </div>
        </div>
        <div className={styles.infoBox}>
          <FaUsers />
          <div>
            <h4>İşçi sayı</h4>
            <p>{company.totalEmployees}</p>
          </div>
        </div>
      </div>

      <div className={styles.aboutText}>
        <h2>Haqqımızda</h2>
        <p>{company.companyDescription}</p>
      </div>

      <div className={styles.team}>
        <h2>Komandamız</h2>
        <div className={styles.members}>
          {company.responseTeamMemberDtos?.length ? (
            company.responseTeamMemberDtos.map((member, index) => (
              <div key={index} className={styles.member}>
                <img src={member.photoUrl} alt={member.name} />
                <h4>{member.name}</h4>
                <p>{member.position}</p>
              </div>
            ))
          ) : (
            <p>Komanda üzvləri mövcud deyil.</p>
          )}
        </div>
      </div>

      <button
        className={styles.updateBtn}
        onClick={() => setShowUpdateSection((prev) => !prev)}
      >
        {showUpdateSection ? "Yeniləmə bölməsini gizlət" : "Məlumatları yenilə"}
      </button>

      {showUpdateSection && (
        <div className={styles.updateSection}>
          <h2>Şirkət məlumatlarını yenilə</h2>
          <div className={styles.updateForm}>
            <input
              type="text"
              name="companyName"
              placeholder="Şirkət adı"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
            {formErrors.companyName && (
              <div className={styles.errorText}>{formErrors.companyName}</div>
            )}

            <input
              type="text"
              name="companyAddress"
              placeholder="Ünvan"
              value={formData.companyAddress}
              onChange={handleChange}
              required
            />
            {formErrors.companyAddress && (
              <div className={styles.errorText}>
                {formErrors.companyAddress}
              </div>
            )}

            <input
              type="text"
              name="companyPhoneNumber"
              placeholder="+994501234567"
              value={formData.companyPhoneNumber}
              onChange={handleChange}
              maxLength={13}
              title="Telefon nömrəsi '+994' ilə başlamalı, sonra 50,51,55,70,77 gəlməli və ümumilikdə 13 rəqəm olmalıdır."
              required
            />
            {formErrors.companyPhoneNumber && (
              <div className={styles.errorText}>
                {formErrors.companyPhoneNumber}
              </div>
            )}

            <input
              type="email"
              name="companyEmail"
              placeholder="E-mail"
              value={formData.companyEmail}
              onChange={handleChange}
              required
            />
            {formErrors.companyEmail && (
              <div className={styles.errorText}>{formErrors.companyEmail}</div>
            )}

            <input
              type="text"
              name="companyTin"
              placeholder="VÖEN"
              value={formData.companyTin}
              onChange={handleChange}
              minLength={6}
              maxLength={15}
              required
            />
            {formErrors.companyTin && (
              <div className={styles.errorText}>{formErrors.companyTin}</div>
            )}

            <textarea
              name="companyDescription"
              placeholder="Haqqımızda"
              value={formData.companyDescription}
              onChange={handleChange}
              rows={4}
              maxLength={500}
            />
            {formErrors.companyDescription && (
              <div className={styles.errorText}>
                {formErrors.companyDescription}
              </div>
            )}

            <input
              type="number"
              name="totalEmployees"
              placeholder="İşçi sayı"
              value={formData.totalEmployees}
              onChange={handleChange}
              min={0}
              required
            />
            {formErrors.totalEmployees && (
              <div className={styles.errorText}>
                {formErrors.totalEmployees}
              </div>
            )}

            <div>
              <label>Loqo şəkli:</label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.svg,.gif,.webp"
                onChange={handleLogoChange}
              />
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Loqo Önizləməsi"
                  style={{
                    width: "100px",
                    marginTop: "10px",
                    objectFit: "contain",
                  }}
                />
              )}
            </div>

            <button onClick={handleUpdate} disabled={isUpdating}>
              {isUpdating ? "Yenilənir..." : "Yenilə"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyInfo;
