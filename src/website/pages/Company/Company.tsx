import { useState, useEffect } from "react";
import styles from "./Company.module.scss";
import { Link, useParams } from "react-router-dom";

interface TeamMember {
  name: string;
  position: string;
  email: string;
  photoUrl: string;
}

interface CompanyData {
  id: number;
  companyName: string;
  companyAddress: string;
  companyPhoneNumber: string;
  companyEmail: string;
  companyTin: string;
  companyDescription: string;
  totalEmployees: number;
  companyLogoUrl: string;
  responseTeamMemberDtos: TeamMember[];
}

interface Vacancy {
  id: number;
  title: string;
  company: string;
}

export default function Company() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<"vacancies" | "about">(
    "vacancies"
  );
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const vacancies: Vacancy[] = [
    { id: 1, title: "Front-end Developer", company: "STP MMC" },
    { id: 2, title: "HelpDesk", company: "STP MMC" },
    { id: 3, title: "HR", company: "STP MMC" },
    { id: 4, title: "Satınalma", company: "STP MMC" },
    { id: 5, title: "Sistem İnzibatçılığı", company: "STP MMC" },
  ];

  useEffect(() => {
    if (!id) return;

    fetch(`http://192.168.200.133:8081/api/companies/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Məlumat alınmadı");
        return res.json();
      })
      .then((data) => setCompanyData(data))
      .catch((err) => {
        console.error("Error fetching company data:", err);
        setError("Şirkət tapılmadı.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className={styles.Company}>Yüklənir...</div>;
  if (error) return <div className={styles.Company}>{error}</div>;
  if (!companyData) return null;

  return (
    <div className={styles.Company}>
      <div className={styles.companyCard}>
        <div className={styles.header}>
          <img
            className={styles.logo}
            src={
              companyData.companyLogoUrl &&
              companyData.companyLogoUrl !== "string"
                ? companyData.companyLogoUrl
                : "/src/website/assets/Logo.png"
            }
            alt="Company Logo"
          />
          <div>
            <h1>{companyData.companyName}</h1>
            <p className={styles.sub}>Karyeranı Bizimlə Qur!</p>
            <div className={styles.meta}>
              <span>{companyData.companyEmail}</span>
              <span>Azərbaycan</span>
              <br />
              <span>İstehsalat / {companyData.totalEmployees} İşçi</span>
            </div>
          </div>
        </div>

        <div className={styles.tabs}>
          <span
            className={activeTab === "vacancies" ? styles.active : ""}
            onClick={() => setActiveTab("vacancies")}
          >
            Aktiv vakansiyalar
          </span>
          <span
            className={activeTab === "about" ? styles.active : ""}
            onClick={() => setActiveTab("about")}
          >
            Şirkət Haqqında
          </span>
        </div>

        {activeTab === "vacancies" ? (
          <div className={styles.VacancyList}>
            {vacancies.map((vacancy) => (
              <div key={vacancy.id} className={styles.VacancyListItems}>
                <div className={styles.LogoInfo}>
                  <img
                    className={styles.VacancyLogo}
                    src={
                      companyData.companyLogoUrl &&
                      companyData.companyLogoUrl !== "string"
                        ? companyData.companyLogoUrl
                        : "/src/website/assets/Logo.png"
                    }
                    alt="Vacancy Logo"
                  />
                  <div className={styles.VacancyInfo}>
                    <h3>{vacancy.title}</h3>
                    <p>{companyData.companyName}</p>
                  </div>
                </div>
                <Link to="/vacancy" className={styles.Applylink}>
                  <div className={styles.ApplyBtn}>
                    <h4>Müraciət et</h4>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.aboutCompany}>
            <h2>{companyData.companyName} haqqında</h2>
            <p>{companyData.companyDescription}</p>
          </div>
        )}
      </div>
    </div>
  );
}
