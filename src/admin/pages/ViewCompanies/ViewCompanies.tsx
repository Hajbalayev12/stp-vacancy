import { useEffect, useState } from "react";
import styles from "./Viewcompanies.module.scss";
import { Link } from "react-router-dom";

interface Company {
  id: number;
  name: string;
  companyName?: string;
  companyAddress?: string;
  companyLogoUrl?: string;
  activeVacancyCount?: number; // ✅ added this line
}

const Viewcompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(
          "http://192.168.200.133:8081/api/companies/all/company"
        );

        if (!response.ok) {
          throw new Error("Server error");
        }

        const data = await response.json();

        const mappedData = data.map((company: any) => ({
          ...company,
          name: company.companyName || company.name || "Ad yoxdur",
        }));

        setCompanies(mappedData);
      } catch (err) {
        console.error(err);
        setError("Şirkətləri yükləmək mümkün olmadı.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <div className={styles.viewCompanies}>
        <p>Yüklənir...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.viewCompanies}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.viewCompanies}>
      <h1 className={styles.title}>Şirkətlər</h1>
      <div className={styles.grid}>
        {companies.map((company) => (
          <Link
            to={`/admin/companyinfo/${company.id}`}
            key={company.id}
            className={styles.link}
          >
            <div className={styles.card}>
              <div className={styles.logoContainer}>
                <img
                  src={
                    company.companyLogoUrl &&
                    company.companyLogoUrl !== "string"
                      ? company.companyLogoUrl
                      : "/src/admin/assets/Logo.png"
                  }
                  alt={company.name}
                />
              </div>
              <h3 className={styles.companyName}>{company.name}</h3>
              <p className={styles.companyAddress}>
                {company.companyAddress || "Ünvan mövcud deyil"}
              </p>
              <button>Vakansiya sayı: {company.activeVacancyCount ?? 0}</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Viewcompanies;
