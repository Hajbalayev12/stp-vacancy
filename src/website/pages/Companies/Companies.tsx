import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Companies.module.scss";

interface Company {
  id: number;
  companyName: string;
  companyLogoUrl: string;
  companyAddress: string;
  vacancyCount: number;
}

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    fetch("http://192.168.200.133:8081/api/companies/all/company")
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      });
  }, []);

  return (
    <div className={styles.Companies}>
      <div className={styles.CompaniesGrid}>
        {companies.map((company) => (
          <Link to={`/company/${company.id}`} key={company.id}>
            <div className={styles.CompanyItems}>
              <img
                src={company.companyLogoUrl}
                alt={company.companyName}
                className={styles.CompanyLogo}
              />
              <h2>{company.companyName}</h2>
              <p>{company.companyAddress}</p>
              <button>Vakansiya sayı: {company.vacancyCount}</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
