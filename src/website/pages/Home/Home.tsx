import styles from "./Home.module.scss";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

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

type Vacancy = {
  id: number;
  position: string;
  companyDto: {
    companyName?: string | null;
    companyLogoUrl?: string | null;
  } | null;
  category: {
    name: string;
  };
  vacancyStatus: boolean;
};

export default function Home() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const vacanciesPerPage = 5;

  const popularVacancies = [
    "Frontend Developer",
    "HelpDesk",
    "HR",
    "Satınalma",
    "DevOps Engineer",
  ];

  useEffect(() => {
    const fetchVacancies = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "http://192.168.200.133:8083/api/vacancies/active"
        );
        if (!res.ok) throw new Error("Failed to fetch vacancies");
        const data = await res.json();
        setVacancies(data);
      } catch (error) {
        console.error("Error fetching vacancies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancies();
  }, []);

  // Pagination logic
  const indexOfLastVacancy = currentPage * vacanciesPerPage;
  const indexOfFirstVacancy = indexOfLastVacancy - vacanciesPerPage;
  const currentVacancies = vacancies.slice(
    indexOfFirstVacancy,
    indexOfLastVacancy
  );
  const totalPages = Math.ceil(vacancies.length / vacanciesPerPage);

  return (
    <div className={styles.Home}>
      <div className={styles.HeaderTitle}>
        <h1>Vakansiyalar</h1>
        <p>Gələcəyini bizimlə qur!</p>
      </div>

      <div className={styles.Search}>
        <div className={styles.SearchInputWrapper}>
          <FaSearch className={styles.SearchIcon} />
          <input
            type="text"
            className={styles.SearchInput}
            placeholder="Vakansiya axtar..."
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          />
          {showSuggestions && (
            <ul className={styles.Suggestions}>
              {popularVacancies.map((vacancy, index) => (
                <li key={index}>{vacancy}</li>
              ))}
            </ul>
          )}
        </div>
        <button className={styles.SearchButton}>Axtar</button>
      </div>

      <div className={styles.Filter}>
        <div className={styles.FilterList}>
          <div className={styles.FilterItem}>
            <label>Şirkət</label>
            <div className={styles.SelectWrapper}>
              <select>
                <option>STP MMC</option>
                <option>STP GLOBAL CABLE</option>
                <option>STP ALÜMİNİUM</option>
                <option>STP-AH</option>
                <option>ASSAN-STP PANEL</option>
                <option>SOCAR-STP</option>
                <option>STP POLİMER</option>
                <option>STP METAL</option>
                <option>AZROKSAN</option>
                <option>STP-Btech</option>
              </select>
            </div>
          </div>
          <div className={styles.FilterItem}>
            <label>Kateqoriya</label>
            <div className={styles.SelectWrapper}>
              <select>
                <option>Komputerləşmə</option>
                <option>Biznes və idarəetmə</option>
                <option>Paylama və Logistika</option>
              </select>
            </div>
          </div>
          <div className={styles.FilterItem}>
            <label>İş növləri</label>
            <div className={styles.SelectWrapper}>
              <select>
                <option>Tam iş günü</option>
                <option>Yarım iş günü</option>
                <option>Təcrübə</option>
              </select>
            </div>
          </div>
          <div className={styles.FilterItem}>
            <label>İş imkanları</label>
            <div className={styles.SelectWrapper}>
              <select>
                <option>Filialda işləmək</option>
                <option>Evdən İşləmək</option>
                <option>Ofis işi</option>
                <option>Təcrübə proqramları</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.JobVacanciesSection}>
        <span className={styles.JobVacanciesText}>Vakansiyalar</span>
        <hr className={styles.HorizontalLine} />
      </div>

      <div className={styles.VacancyList}>
        {loading ? (
          <p>Loading vacancies...</p>
        ) : currentVacancies.length === 0 ? (
          <p>No vacancies found.</p>
        ) : (
          currentVacancies.map((vacancy) => (
            <div className={styles.VacancyListItems} key={vacancy.id}>
              <div className={styles.LogoInfo}>
                <img
                  src={
                    vacancy.companyDto?.companyLogoUrl
                      ? vacancy.companyDto.companyLogoUrl
                      : "src/website/assets/default_logo.png"
                  }
                  alt={vacancy.companyDto?.companyName || "Company Logo"}
                  className={styles.VacancyLogo}
                />
                <div className={styles.VacancyInfo}>
                  <h3>{vacancy.position}</h3>
                  <p>{vacancy.companyDto?.companyName || "Naməlum Şirkət"}</p>
                </div>
              </div>
              <Link to={`/vacancy/${vacancy.id}`} className={styles.Applylink}>
                <div className={styles.ApplyBtn}>
                  <h4>Müraciət et</h4>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>

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
    </div>
  );
}
