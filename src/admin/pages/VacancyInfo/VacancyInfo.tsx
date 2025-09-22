import styles from "./Vacancyinfo.module.scss";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaUsers,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_VACANCIES } from "../../../constants/apiBase";
import { useToast } from "../../../shared/context/ToastContext";

type Company = {
  id: number;
  companyName: string;
  companyAddress?: string;
  companyPhoneNumber?: string;
  companyEmail?: string;
  companyLogoUrl?: string;
  totalEmployees?: number;
};

type Option = {
  id: number;
  name: string;
};

type Vacancy = {
  id: number;
  position: string;
  experienceRequired: string;
  educationLevel: string;
  major: string;
  language: string;
  skills: string;
  requirements: string;
  responsibilities: string;
  companyDto: Company | null;
  employmentType: Option | null;
  jobMode: Option | null;
  category: Option | null;
  createdDate: string;
  startDate: string;
  endDate: string;
  vacancyStatus: boolean;
  minSalary: number | null;
  maxSalary: number | null;
  salaryNegotiable: boolean;
};

type FormData = {
  position: string;
  experienceRequired: string;
  educationLevel: string;
  major: string;
  language: string;
  skills: string;
  requirements: string;
  responsibilities: string;
  vacancyStatus: boolean;
  companyId: number;
  categoryId: number;
  employmentTypeId: number;
  jobModeId: number;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  minSalary: number | null;
  maxSalary: number | null;
  salaryNegotiable: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const Vacancyinfo = () => {
  const { vacancyId } = useParams<{ vacancyId: string }>();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showSuccess, showError } = useToast();

  // Options for selects
  const [companies, setCompanies] = useState<Company[]>([]);
  const [categories, setCategories] = useState<Option[]>([]);
  const [employmentTypes, setEmploymentTypes] = useState<Option[]>([]);
  const [jobModes, setJobModes] = useState<Option[]>([]);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().slice(0, 10);

  const [formData, setFormData] = useState<FormData>({
    position: "",
    experienceRequired: "",
    educationLevel: "",
    major: "",
    language: "",
    skills: "",
    requirements: "",
    responsibilities: "",
    vacancyStatus: true,
    companyId: 0,
    categoryId: 0,
    employmentTypeId: 0,
    jobModeId: 0,
    startDate: today,
    endDate: today,
    minSalary: null,
    maxSalary: null,
    salaryNegotiable: true,
  });

  const [initialFormData, setInitialFormData] = useState<FormData>(formData);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showUpdateSection, setShowUpdateSection] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        const res = await fetch(`${API_VACANCIES}/api/vacancies/${vacancyId}`);
        if (!res.ok) throw new Error("Vakansiyanı yükləmək mümkün olmadı.");
        const data: Vacancy = await res.json();

        const vacancyData: FormData = {
          position: data.position || "",
          experienceRequired: data.experienceRequired || "",
          educationLevel: data.educationLevel || "",
          major: data.major || "",
          language: data.language || "",
          skills: data.skills || "",
          requirements: data.requirements || "",
          responsibilities: data.responsibilities || "",
          vacancyStatus: data.vacancyStatus,
          companyId: data.companyDto?.id || 0,
          categoryId: data.category?.id || 0,
          employmentTypeId: data.employmentType?.id || 0,
          jobModeId: data.jobMode?.id || 0,
          startDate: data.startDate || today,
          endDate: data.endDate || today,
          minSalary: data.minSalary,
          maxSalary: data.maxSalary,
          salaryNegotiable: data.salaryNegotiable,
        };

        setFormData(vacancyData);
        setInitialFormData(vacancyData);
        setVacancy(data);
      } catch (err) {
        setError("Vakansiya məlumatları yüklənərkən xəta baş verdi.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchFormOptions = async () => {
      try {
        const res = await fetch(
          `${API_VACANCIES}/api/form-options/form-options`
        );
        if (!res.ok)
          throw new Error("Form seçimlərini yükləmək mümkün olmadı.");

        const data = await res.json();

        setCompanies(data.companyDto || []);
        setCategories(data.categories || []);
        setEmploymentTypes(data.employmentTypes || []);
        setJobModes(data.jobModes || []);
      } catch (err) {
        console.error(err);
        showError("Form seçimləri yüklənərkən xəta baş verdi.");
      }
    };

    fetchVacancy();
    fetchFormOptions();
  }, [vacancyId, showError, today]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target;
    const val =
      type === "checkbox"
        ? checked
        : type === "select-one"
        ? Number(value)
        : value;

    setFormData((prev) => ({ ...prev, [name]: val }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const isChanged = (field: keyof FormData) =>
    formData[field] !== initialFormData[field];

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.position.trim()) errors.position = "Vəzifə boş ola bilməz";
    if (!formData.experienceRequired.trim())
      errors.experienceRequired = "Təcrübə boş ola bilməz";
    if (!formData.educationLevel.trim())
      errors.educationLevel = "Təhsil səviyyəsi boş ola bilməz";
    if (!formData.major.trim()) errors.major = "İxtisas boş ola bilməz";
    if (!formData.language.trim())
      errors.language = "Dil tələbi boş ola bilməz";
    if (!formData.skills.trim()) errors.skills = "Bacarıqlar boş ola bilməz";
    if (!formData.requirements.trim())
      errors.requirements = "Tələblər boş ola bilməz";
    if (!formData.responsibilities.trim())
      errors.responsibilities = "Öhdəliklər boş ola bilməz";

    if (formData.companyId === 0) errors.companyId = "Şirkət seçilməlidir";
    if (formData.categoryId === 0)
      errors.categoryId = "Kateqoriya seçilməlidir";
    if (formData.employmentTypeId === 0)
      errors.employmentTypeId = "Məşğulluq növü seçilməlidir";
    if (formData.jobModeId === 0) errors.jobModeId = "İş rejimi seçilməlidir";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload

    if (!vacancyId) return showError("Vakansiya ID-si tapılmadı.");

    const confirmed = window.confirm(
      "Bu vakansiyanı yeniləmək istədiyinizə əminsinizmi?"
    );
    if (!confirmed) return;

    console.log("Updating vacancy with id:", vacancyId);

    if (!validateForm())
      return showError("Zəhmət olmasa bütün sahələri doldurun.");

    setIsUpdating(true);
    try {
      const bodyToSend = {
        position: formData.position,
        experienceRequired: formData.experienceRequired,
        educationLevel: formData.educationLevel,
        major: formData.major,
        language: formData.language,
        skills: formData.skills,
        requirements: formData.requirements,
        responsibilities: formData.responsibilities,
        companyId: formData.companyId,
        employmentTypeId: formData.employmentTypeId,
        jobModeId: formData.jobModeId,
        categoryId: formData.categoryId,
        startDate: formData.startDate,
        endDate: formData.endDate,
        vacancyStatus: formData.vacancyStatus,
      };

      console.log("Sending this to backend:", bodyToSend);

      const res = await fetch(
        `${API_VACANCIES}/api/vacancies/update/${vacancyId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyToSend),
        }
      );

      const text = await res.text();
      console.log("Response text from backend:", text);

      if (!res.ok) {
        try {
          const errorData = JSON.parse(text);
          throw new Error(errorData.message || text);
        } catch {
          throw new Error(text || "Yeniləmə zamanı xəta baş verdi");
        }
      }

      // Update local vacancy state to reflect changes immediately
      setVacancy((prev) =>
        prev
          ? {
              ...prev,
              ...formData,
              companyDto:
                companies.find((c) => c.id === formData.companyId) || null,
              category:
                categories.find((c) => c.id === formData.categoryId) || null,
              employmentType:
                employmentTypes.find(
                  (e) => e.id === formData.employmentTypeId
                ) || null,
              jobMode:
                jobModes.find((j) => j.id === formData.jobModeId) || null,
            }
          : null
      );

      showSuccess("Vakansiya uğurla yeniləndi");
      setInitialFormData(formData);
      setShowUpdateSection(false);
    } catch (err: any) {
      console.error("Update error:", err);
      showError(err.message || "Xəta baş verdi");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <p>Yüklənir...</p>;
  if (error) return <p>{error}</p>;
  if (!vacancy) return <p>Vakansiya tapılmadı.</p>;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        {vacancy.companyDto?.companyLogoUrl && (
          <img
            src={vacancy.companyDto.companyLogoUrl}
            alt="logo"
            className={styles.logo}
          />
        )}
        <div>
          <h1>{vacancy.companyDto?.companyName}</h1>
          <p>
            İnnovativ sənaye texnologiyaları üzrə ixtisaslaşmış lider şirkət
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <FaMapMarkerAlt className={styles.icon} />
          <div>
            <h4>Ünvan</h4>
            <p>{vacancy.companyDto?.companyAddress || "—"}</p>
          </div>
        </div>
        <div className={styles.infoCard}>
          <FaEnvelope className={styles.icon} />
          <div>
            <h4>E-mail</h4>
            <p>{vacancy.companyDto?.companyEmail || "—"}</p>
          </div>
        </div>
        <div className={styles.infoCard}>
          <FaPhoneAlt className={styles.icon} />
          <div>
            <h4>Əlaqə</h4>
            <p>{vacancy.companyDto?.companyPhoneNumber || "—"}</p>
          </div>
        </div>
        <div className={styles.infoCard}>
          <FaUsers className={styles.icon} />
          <div>
            <h4>İşçi sayı</h4>
            <p>{vacancy.companyDto?.totalEmployees ?? "—"}+</p>
          </div>
        </div>
      </div>

      {/* Vacancy Details */}
      <div className={styles.vacancyCard}>
        <h2>{vacancy.position}</h2>
        <p className={styles.subInfo}>
          {vacancy.category?.name} | {vacancy.companyDto?.companyName} | Elan:{" "}
          {new Date(vacancy.createdDate).toLocaleDateString()}
        </p>

        <div className={styles.section}>
          <h3>Namizədə olan tələblər:</h3>
          <ul>
            {vacancy.requirements.split("\n").map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Ümumi vəzifə öhdəlikləri:</h3>
          <ul>
            {vacancy.responsibilities.split("\n").map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
        </div>

        <div className={styles.detailsGrid}>
          <div>
            <strong>Məşğulluq növü:</strong> {vacancy.employmentType?.name}
          </div>
          <div>
            <strong>Təcrübə:</strong> {vacancy.experienceRequired}
          </div>
          <div>
            <strong>Təhsil:</strong> {vacancy.educationLevel}
          </div>
          <div>
            <strong>İxtisas:</strong> {vacancy.major}
          </div>
          <div>
            <strong>Dil biliyi:</strong> {vacancy.language}
          </div>
          <div>
            <strong>Bacarıqlar:</strong> {vacancy.skills}
          </div>
          <div>
            <strong>Başlama tarixi:</strong> {vacancy.startDate}
          </div>
          <div>
            <strong>Bitmə tarixi:</strong> {vacancy.endDate}
          </div>
          <div>
            <strong>Əmək haqqı:</strong>{" "}
            {vacancy.salaryNegotiable
              ? "Razılaşma yolu ilə"
              : `${vacancy.minSalary} - ${vacancy.maxSalary} AZN`}
          </div>
        </div>
      </div>

      {/* Update Form Toggle */}
      <button
        className={styles.updateBtn}
        onClick={() => setShowUpdateSection((prev) => !prev)}
      >
        {showUpdateSection ? "Yeniləmə bölməsini gizlət" : "Məlumatları yenilə"}
      </button>

      {/* Update Form */}
      {showUpdateSection && (
        <form
          className={styles.updateSection}
          onSubmit={handleUpdate}
          noValidate
        >
          <h3>Vakansiya Məlumatlarını Yenilə</h3>
          <div className={styles.updateForm}>
            {/* Şirkət */}
            <div className={styles.formRow}>
              <label htmlFor="companyId">
                Şirkət <span className={styles.required}>*</span>
              </label>
              <select
                id="companyId"
                name="companyId"
                value={formData.companyId}
                onChange={handleChange}
                className={formErrors.companyId ? styles.errorInput : ""}
                required
              >
                <option value={0}>Şirkət seçin</option>
                {companies.map((comp) => (
                  <option key={comp.id} value={comp.id}>
                    {comp.companyName}
                  </option>
                ))}
              </select>
              {formErrors.companyId && (
                <div className={styles.errorMsg}>{formErrors.companyId}</div>
              )}
            </div>

            {/* Kateqoriya */}
            <div className={styles.formRow}>
              <label htmlFor="categoryId">
                Kateqoriya <span className={styles.required}>*</span>
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className={formErrors.categoryId ? styles.errorInput : ""}
                required
              >
                <option value={0}>Kateqoriya seçin</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {formErrors.categoryId && (
                <div className={styles.errorMsg}>{formErrors.categoryId}</div>
              )}
            </div>

            {/* Məşğulluq növü */}
            <div className={styles.formRow}>
              <label htmlFor="employmentTypeId">
                Məşğulluq növü <span className={styles.required}>*</span>
              </label>
              <select
                id="employmentTypeId"
                name="employmentTypeId"
                value={formData.employmentTypeId}
                onChange={handleChange}
                className={formErrors.employmentTypeId ? styles.errorInput : ""}
                required
              >
                <option value={0}>Seçin</option>
                {employmentTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
              {formErrors.employmentTypeId && (
                <div className={styles.errorMsg}>
                  {formErrors.employmentTypeId}
                </div>
              )}
            </div>

            {/* İş rejimi */}
            <div className={styles.formRow}>
              <label htmlFor="jobModeId">
                İş rejimi <span className={styles.required}>*</span>
              </label>
              <select
                id="jobModeId"
                name="jobModeId"
                value={formData.jobModeId}
                onChange={handleChange}
                className={formErrors.jobModeId ? styles.errorInput : ""}
                required
              >
                <option value={0}>Seçin</option>
                {jobModes.map((mode) => (
                  <option key={mode.id} value={mode.id}>
                    {mode.name}
                  </option>
                ))}
              </select>
              {formErrors.jobModeId && (
                <div className={styles.errorMsg}>{formErrors.jobModeId}</div>
              )}
            </div>

            {/* Vəzifə */}
            <div className={styles.formRow}>
              <label htmlFor="position">
                Vəzifə <span className={styles.required}>*</span>
              </label>
              <input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className={isChanged("position") ? styles.changed : ""}
                required
              />
              {formErrors.position && (
                <div className={styles.errorMsg}>{formErrors.position}</div>
              )}
            </div>

            {/* Təcrübə */}
            <div className={styles.formRow}>
              <label htmlFor="experienceRequired">
                Təcrübə <span className={styles.required}>*</span>
              </label>
              <input
                id="experienceRequired"
                name="experienceRequired"
                value={formData.experienceRequired}
                onChange={handleChange}
                className={
                  isChanged("experienceRequired") ? styles.changed : ""
                }
                required
              />
              {formErrors.experienceRequired && (
                <div className={styles.errorMsg}>
                  {formErrors.experienceRequired}
                </div>
              )}
            </div>

            {/* Təhsil səviyyəsi */}
            <div className={styles.formRow}>
              <label htmlFor="educationLevel">
                Təhsil səviyyəsi <span className={styles.required}>*</span>
              </label>
              <input
                id="educationLevel"
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                className={isChanged("educationLevel") ? styles.changed : ""}
                required
              />
              {formErrors.educationLevel && (
                <div className={styles.errorMsg}>
                  {formErrors.educationLevel}
                </div>
              )}
            </div>

            {/* İxtisas */}
            <div className={styles.formRow}>
              <label htmlFor="major">
                İxtisas <span className={styles.required}>*</span>
              </label>
              <input
                id="major"
                name="major"
                value={formData.major}
                onChange={handleChange}
                className={isChanged("major") ? styles.changed : ""}
                required
              />
              {formErrors.major && (
                <div className={styles.errorMsg}>{formErrors.major}</div>
              )}
            </div>

            {/* Dil tələbi */}
            <div className={styles.formRow}>
              <label htmlFor="language">
                Dil tələbi <span className={styles.required}>*</span>
              </label>
              <input
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className={isChanged("language") ? styles.changed : ""}
                required
              />
              {formErrors.language && (
                <div className={styles.errorMsg}>{formErrors.language}</div>
              )}
            </div>

            {/* Bacarıqlar */}
            <div className={styles.formRow}>
              <label htmlFor="skills">
                Bacarıqlar <span className={styles.required}>*</span>
              </label>
              <input
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className={isChanged("skills") ? styles.changed : ""}
                required
              />
              {formErrors.skills && (
                <div className={styles.errorMsg}>{formErrors.skills}</div>
              )}
            </div>

            {/* Tələblər (textarea) */}
            <div className={styles.formRow}>
              <label htmlFor="requirements">
                Tələblər <span className={styles.required}>*</span>
              </label>
              <textarea
                id="requirements"
                name="requirements"
                rows={4}
                value={formData.requirements}
                onChange={handleChange}
                className={isChanged("requirements") ? styles.changed : ""}
                required
              />
              {formErrors.requirements && (
                <div className={styles.errorMsg}>{formErrors.requirements}</div>
              )}
            </div>

            {/* Öhdəliklər (textarea) */}
            <div className={styles.formRow}>
              <label htmlFor="responsibilities">
                Öhdəliklər <span className={styles.required}>*</span>
              </label>
              <textarea
                id="responsibilities"
                name="responsibilities"
                rows={4}
                value={formData.responsibilities}
                onChange={handleChange}
                className={isChanged("responsibilities") ? styles.changed : ""}
                required
              />
              {formErrors.responsibilities && (
                <div className={styles.errorMsg}>
                  {formErrors.responsibilities}
                </div>
              )}
            </div>

            {/* Başlama tarixi */}
            <div className={styles.formRow}>
              <label htmlFor="startDate">
                Başlama tarixi <span className={styles.required}>*</span>
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={isChanged("startDate") ? styles.changed : ""}
                required
              />
            </div>

            {/* Bitmə tarixi */}
            <div className={styles.formRow}>
              <label htmlFor="endDate">
                Bitmə tarixi <span className={styles.required}>*</span>
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className={isChanged("endDate") ? styles.changed : ""}
                required
              />
            </div>

            {/* Vakansiya aktiv checkbox */}
            <div className={styles.formRowCheckbox}>
              <label htmlFor="vacancyStatus" className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  id="vacancyStatus"
                  name="vacancyStatus"
                  checked={formData.vacancyStatus}
                  onChange={handleChange}
                />
                Vakansiya aktivdir
              </label>
            </div>

            <div className={styles.formRowFullWidth}>
              <button type="submit" disabled={isUpdating}>
                {isUpdating ? "Yenilənir..." : "Yenilə"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Vacancyinfo;
