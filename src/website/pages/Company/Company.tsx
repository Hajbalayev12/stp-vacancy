import { useState, useEffect } from "react";
import styles from "./Company.module.scss";
import { Link, useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { API_COMPANIES, API_VACANCIES } from "../../../constants/apiBase";

const StyledPagination = styled(Pagination)(() => ({
  "& .MuiPaginationItem-root": {
    color: "#407bff",
    borderColor: "#407bff",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "#407bff",
      color: "white",
    },
  },
  "& .MuiPaginationItem-root.Mui-selected": {
    backgroundColor: "#407bff",
    color: "white",
    borderColor: "#407bff",
    "&:hover": {
      backgroundColor: "#407bff",
      color: "white",
    },
  },
}));

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
  position: string;
  vacancyOrganizationDto?: {
    name: string;
    logoUrl: string;
  };
  companyDto?: {
    companyName: string;
    companyLogoUrl: string;
  };
}

interface VacancyResponse {
  content: Vacancy[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

const getFullImageUrl = (url?: string) => {
  if (!url) return "/assets/default_logo.png";
  if (url.startsWith("http") || url.startsWith("https")) return url;
  return `${API_VACANCIES}/${url}`;
};

export default function Company() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<"vacancies" | "about">(
    "vacancies"
  );
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const size = 3;

  // Fetch company data
  useEffect(() => {
    if (!id) return;

    fetch(`${API_COMPANIES}/api/organizations/company/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Məlumat alınmadı");
        return res.json();
      })
      .then((data) => setCompanyData(data))
      .catch((err) => {
        console.error("Error fetching company data:", err);
        setError("Şirkət tapılmadı.");
      });
  }, [id]);

  // Fetch company vacancies
  useEffect(() => {
    if (!id) return;

    setLoading(true);

    fetch(
      `${API_VACANCIES}/api/vacancies/active/company/${id}?page=${
        currentPage - 1
      }&size=${size}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Vakansiyalar alınmadı");
        return res.json();
      })
      .then((data: VacancyResponse) => {
        setVacancies(data.content);
        setTotalPages(data.totalPages || 1);
      })
      .catch((err) => {
        console.error("Error fetching vacancies:", err);
      })
      .finally(() => setLoading(false));
  }, [id, currentPage]);

  if (loading) return <div className={styles.Company}>Yüklənir...</div>;
  if (error) return <div className={styles.Company}>{error}</div>;
  if (!companyData) return null;

  return (
    <div className={styles.Company}>
      <div className={styles.companyCard}>
        {/* Company Header */}
        <div className={styles.header}>
          <img
            className={styles.logo}
            src={
              companyData.companyLogoUrl
                ? getFullImageUrl(companyData.companyLogoUrl)
                : "/assets/default_logo.png"
            }
            alt={companyData.companyName || "Company Logo"}
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

        {/* Tabs */}
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

        {/* Vacancies Tab */}
        {activeTab === "vacancies" ? (
          <div className={styles.VacancyList}>
            {vacancies.length > 0 ? (
              <>
                {vacancies.map((vacancy) => {
                  const logoUrl =
                    vacancy.vacancyOrganizationDto?.logoUrl ||
                    vacancy.companyDto?.companyLogoUrl;
                  const companyName =
                    vacancy.vacancyOrganizationDto?.name ||
                    vacancy.companyDto?.companyName ||
                    "Company";

                  return (
                    <div key={vacancy.id} className={styles.VacancyListItems}>
                      <div className={styles.LogoInfo}>
                        <img
                          src={getFullImageUrl(logoUrl)}
                          alt={companyName}
                          className={styles.VacancyLogo}
                        />
                        <div className={styles.VacancyInfo}>
                          <h3>{vacancy.position || "Vakansiya"}</h3>
                          <p>{companyName}</p>
                        </div>
                      </div>
                      <Link
                        to={`/vacancy/${vacancy.id}`}
                        className={styles.Applylink}
                      >
                        <div className={styles.ApplyBtn}>
                          <h4>Ətraflı bax</h4>
                        </div>
                      </Link>
                    </div>
                  );
                })}

                {/* Pagination */}
                <div className={styles.Pagination}>
                  <Stack spacing={2} alignItems="center">
                    <StyledPagination
                      count={totalPages}
                      page={currentPage}
                      onChange={(_, value) => setCurrentPage(value)}
                      showFirstButton
                      showLastButton
                      variant="outlined"
                      shape="rounded"
                    />
                  </Stack>
                </div>
              </>
            ) : (
              <p style={{ textAlign: "center", marginTop: "1rem" }}>
                Bu şirkətdə aktiv vakansiya yoxdur.
              </p>
            )}
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
