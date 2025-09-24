import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import styles from "./Vacancy.module.scss";
import {
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { API_VACANCIES, API_APPLY } from "../../../constants/apiBase";
import { jwtDecode } from "jwt-decode";
import { useToast } from "../../../shared/context/ToastContext";
import { apiRequest } from "../../../shared/utils/apiRequest";

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
  createdDate: string;
  startDate: string;
  endDate: string;
  vacancyStatus: boolean;
  salaryNegotiable: boolean;
  minSalary: number;
  maxSalary: number;
  companyDto?: {
    companyName: string;
    companyAddress: string;
    companyPhoneNumber: string;
    companyEmail: string;
    companyLogoUrl: string;
    totalEmployees: number;
  };
  employmentType?: { id: number; name: string };
  jobMode?: { id: number; name: string };
  category?: { id: number; name: string };
};

const VacancyInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [appliedVacancies, setAppliedVacancies] = useState<number[]>([]);
  const [isApplying, setIsApplying] = useState(false);
  const toast = useToast();

  const vacancyIdNumber = Number(id);

  const getToken = () => localStorage.getItem("accessToken");

  const handleLogout = useCallback(() => {
    localStorage.removeItem("accessToken");
    toast.showError("Sessiyanız bitib, zəhmət olmasa yenidən daxil olun.");
  }, [toast]);

  /** Fetch vacancy details (public) **/
  useEffect(() => {
    if (!id) return;

    const fetchVacancy = async () => {
      try {
        const res = await fetch(`${API_VACANCIES}/api/vacancies/${id}`);
        if (!res.ok) throw new Error("Failed to fetch vacancy");
        const data = await res.json();
        setVacancy(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVacancy();
  }, [id]);

  /** Fetch applied vacancies (only if logged in) **/
  useEffect(() => {
    const fetchAppliedVacancies = async () => {
      const token = getToken();
      if (!token) return; // <-- skip if not logged in

      try {
        const decoded: { sub: string; exp: number } = (jwtDecode as any)(token);
        const userId = Number(decoded.sub);
        const now = Math.floor(Date.now() / 1000);
        if (!userId || (decoded.exp && decoded.exp < now)) {
          handleLogout();
          return;
        }

        const data: any[] = await apiRequest(
          `${API_APPLY}/api/applications?userId=${userId}`
        );

        const ids = Array.isArray(data)
          ? data
              .map((app: any) => Number(app.vacancyDetails?.id))
              .filter((id) => !isNaN(id))
          : [];

        setAppliedVacancies(ids);
      } catch (err) {
        console.error("Error loading applied vacancies:", err);
      }
    };

    fetchAppliedVacancies();
  }, [handleLogout]);

  /** Handle Apply button click **/
  const handleApply = async () => {
    const token = getToken();
    if (!token) {
      toast.showError("Zəhmət olmasa əvvəlcə daxil olun.");
      return;
    }

    if (appliedVacancies.includes(vacancyIdNumber)) {
      toast.showError("Siz artıq bu vakansiyaya müraciət etmisiniz.");
      return;
    }

    setIsApplying(true);
    try {
      await apiRequest(`${API_APPLY}/api/applications?vacancyId=${id}`, {
        method: "POST",
      });

      setAppliedVacancies((prev) => [...prev, vacancyIdNumber]);
      toast.showSuccess("Uğurla müraciət etdiniz!");
    } catch (err) {
      console.error(err);
      toast.showError(
        "Müraciət zamanı xəta baş verdi. Zəhmət olmasa yenidən cəhd edin."
      );
    } finally {
      setIsApplying(false);
    }
  };

  if (!vacancy) return <div>Loading...</div>;

  return (
    <div className={styles.VacancyInfo}>
      <div className={styles.content}>
        {/* Left section */}
        <div className={styles.left}>
          <div className={styles.headerCard}>
            <div className={styles.logo}>
              <img
                src={
                  vacancy.companyDto?.companyLogoUrl ||
                  "src/website/assets/default_logo.png"
                }
                alt="Company logo"
              />
            </div>
            <div>
              <h2 className={styles.position}>{vacancy.position}</h2>
              <p className={styles.department}>
                {vacancy.category?.name || "Naməlum kateqoriya"}
              </p>
              <p className={styles.meta}>
                <FaMapMarkerAlt />{" "}
                {vacancy.companyDto?.companyName || "Naməlum şirkət"}
              </p>
              <p className={styles.date}>
                Elanın yerləşdirilmə tarixi: {vacancy.createdDate}
              </p>
            </div>
          </div>

          <div className={styles.infoBlock}>
            <h3>Namizədə olan tələblər:</h3>
            <ul>
              {vacancy.requirements
                ? vacancy.requirements
                    .split("\n")
                    .map((item, i) => <li key={i}>{item}</li>)
                : "Məlumat yoxdur."}
            </ul>
          </div>

          <div className={styles.infoBlock}>
            <h3>Ümumi vəzifə öhdəlikləri:</h3>
            <ul>
              {vacancy.responsibilities
                ? vacancy.responsibilities
                    .split("\n")
                    .map((item, i) => <li key={i}>{item}</li>)
                : "Məlumat yoxdur."}
            </ul>
          </div>
        </div>

        {/* Right section */}
        <div className={styles.right}>
          <div className={styles.shareWrapper}>
            <div className={styles.shareButton}>
              <span>Paylaş</span>
              <svg
                className={styles.shareIcon}
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M18 8C19.1046 8 20 7.10457 20 6C20 4.89543 19.1046 4 18 4C16.8954 4 16 4.89543 16 6C16 6.17664 16.0232 6.34731 16.0666 6.50927L8.64294 10.9738C8.2525 10.3794 7.63739 10 6.92857 10C5.86399 10 5 10.8954 5 12C5 13.1046 5.86399 14 6.92857 14C7.63739 14 8.2525 13.6206 8.64294 13.0262L16.0666 17.4907C16.0232 17.6527 16 17.8234 16 18C16 19.1046 16.8954 20 18 20C19.1046 20 20 19.1046 20 18C20 16.8954 19.1046 16 18 16C17.2928 16 16.6785 16.3792 16.2879 16.9733L8.85714 12.5L16.2879 8.02672C16.6785 8.62079 17.2928 9 18 9V8Z"
                  fill="white"
                />
              </svg>
            </div>

            <div className={styles.tooltip}>
              <div className={styles.arrow}></div>
              <div className={styles.icons}>
                <a href="https://x.com/" className={styles.twitter}>
                  <FaTwitter />
                </a>
                <a href="https://www.facebook.com/" className={styles.facebook}>
                  <FaFacebookF />
                </a>
                <a href="https://www.linkedin.com/" className={styles.linkedin}>
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.detailsCard}>
            <h4>Vakansiya detalları</h4>
            <ul>
              <li>
                <strong>Məşğulluq növü:</strong>{" "}
                {vacancy.employmentType?.name || "N/A"}
              </li>
              <li>
                <strong>Təcrübə tələbi:</strong>{" "}
                {vacancy.experienceRequired || "N/A"}
              </li>
              <li>
                <strong>Təhsil:</strong> {vacancy.educationLevel || "N/A"}
              </li>
              <li>
                <strong>Ixtisas:</strong> {vacancy.major || "N/A"}
              </li>
              <li>
                <strong>Dil biliyi:</strong> {vacancy.language || "N/A"}
              </li>
              <li>
                <strong>Komputer bacarıqları:</strong> {vacancy.skills || "N/A"}
              </li>
              <li>
                <strong>Maaş:</strong>{" "}
                {vacancy.salaryNegotiable
                  ? "Razılaşma yolu ilə"
                  : `${vacancy.minSalary} – ${vacancy.maxSalary} AZN`}
              </li>
            </ul>

            <div className={styles.buttonWrapper}>
              {appliedVacancies.includes(vacancyIdNumber) ? (
                <button
                  className={styles.applyBtn}
                  style={{ cursor: "not-allowed" }}
                  disabled
                >
                  MÜRACİƏT OLUNUB
                </button>
              ) : (
                <button
                  onClick={handleApply}
                  className={styles.applyBtn}
                  disabled={isApplying}
                >
                  {isApplying ? "Göndərilir..." : "MÜRACİƏT ET"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacancyInfo;
