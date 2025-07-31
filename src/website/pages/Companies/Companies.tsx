import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Companies.module.scss";
import { API_COMPANIES } from "../../../constants/apiBase";

interface Company {
  id: number;
  companyName: string;
  companyLogoUrl: string;
  companyAddress: string;
  activeVacancyCount: number;
}

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${API_COMPANIES}/api/companies/all/company`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setCompanies(data);
        setError(false);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
        setError(true);
      });
  }, []);

  return (
    <div className={styles.Companies}>
      <div className={styles.CompaniesGrid}>
        {companies.length > 0 ? (
          companies.map((company) => (
            <Link to={`/company/${company.id}`} key={company.id}>
              <div className={styles.CompanyItems}>
                <img
                  src={company.companyLogoUrl}
                  alt={company.companyName}
                  className={styles.CompanyLogo}
                />
                <h2>{company.companyName}</h2>
                <p>{company.companyAddress}</p>
                <button>Vakansiya sayı: {company.activeVacancyCount}</button>
              </div>
            </Link>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>
            {error
              ? "Şirkətlər tapılmadı və ya server cavab vermir."
              : "Heç bir şirkət əlavə olunmayıb."}
          </p>
        )}
      </div>
    </div>
  );
}
