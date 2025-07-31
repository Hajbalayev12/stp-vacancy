import styles from "./Home.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { API_VACANCIES } from "../../../constants/apiBase";

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
    id: number;
    name: string;
  };
  vacancyStatus?: boolean;
};

type FormOptions = {
  categories: { id: number; name: string }[];
  employmentTypes: { id: number; name: string }[];
  jobModes: { id: number; name: string }[];
  companyDto: { id: number; companyName: string }[];
};

export default function Home() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(false);

  const vacanciesPerPage = 4;

  const [formOptions, setFormOptions] = useState<FormOptions>({
    categories: [],
    employmentTypes: [],
    jobModes: [],
    companyDto: [],
  });

  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedEmploymentTypeId, setSelectedEmploymentTypeId] = useState("");
  const [selectedJobModeId, setSelectedJobModeId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const popularVacancies = [
    "Frontend Developer",
    "HelpDesk",
    "HR",
    "Satınalma",
    "DevOps Engineer",
  ];

  const navigate = useNavigate();

  // Fetch form options on mount
  useEffect(() => {
    const fetchFormOptions = async () => {
      try {
        const res = await fetch(
          `${API_VACANCIES}/api/form-options/form-options`
        );
        if (!res.ok) throw new Error("Failed to fetch form options");
        const data = await res.json();
        setFormOptions({
          categories: data.categories || [],
          employmentTypes: data.employmentTypes || [],
          jobModes: data.jobModes || [],
          companyDto: data.companyDto || [],
        });
      } catch (err) {
        console.error("Error fetching form options:", err);
      }
    };

    fetchFormOptions();
  }, []);

  // Fetch vacancies when filters or page changes
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchFilteredVacancies = async () => {
        setLoading(true);
        try {
          const queryParams = new URLSearchParams();

          if (selectedCompanyId)
            queryParams.append("companyId", selectedCompanyId);
          if (selectedCategoryId)
            queryParams.append("categoryId", selectedCategoryId);
          if (selectedEmploymentTypeId)
            queryParams.append("employmentTypeId", selectedEmploymentTypeId);
          if (selectedJobModeId)
            queryParams.append("jobModeId", selectedJobModeId);
          if (searchTerm) queryParams.append("vacancyName", searchTerm);

          // Backend expects page index starting from 0
          queryParams.append("page", (currentPage - 1).toString());
          queryParams.append("size", vacanciesPerPage.toString());

          const url = `${API_VACANCIES}/api/vacancies/filter?${queryParams.toString()}&sort=id,desc`;

          const res = await fetch(url);
          if (!res.ok) throw new Error("Failed to fetch filtered vacancies");
          const data = await res.json();

          setVacancies(data.content || []);

          const totalItems = data.totalElements ?? data.content?.length ?? 0;
          const computedPages = Math.ceil(totalItems / vacanciesPerPage);
          setTotalPages(computedPages > 0 ? computedPages : 1);

          setError(false);
        } catch (err) {
          console.error("Error fetching filtered vacancies:", err);
          setVacancies([]);
          setError(true);
          setTotalPages(1);
        } finally {
          setLoading(false);
        }
      };

      fetchFilteredVacancies();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [
    selectedCompanyId,
    selectedCategoryId,
    selectedEmploymentTypeId,
    selectedJobModeId,
    searchTerm,
    currentPage,
  ]);

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
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedCompanyId("");
              setSelectedCategoryId("");
              setSelectedEmploymentTypeId("");
              setSelectedJobModeId("");
              setCurrentPage(1);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          />
          {showSuggestions && (
            <ul className={styles.Suggestions}>
              {popularVacancies.map((vacancy, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSearchTerm(vacancy);
                    setShowSuggestions(false);
                    setCurrentPage(1);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {vacancy}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.Filter}>
        <div className={styles.FilterList}>
          <div className={styles.FilterItem}>
            <label>Şirkət</label>
            <div className={styles.SelectWrapper}>
              <select
                value={selectedCompanyId}
                onChange={(e) => {
                  setSelectedCompanyId(e.target.value);
                  setSearchTerm("");
                  setCurrentPage(1);
                }}
              >
                <option value="">Şirkət seçin</option>
                {formOptions.companyDto.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.companyName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.FilterItem}>
            <label>Kateqoriya</label>
            <div className={styles.SelectWrapper}>
              <select
                value={selectedCategoryId}
                onChange={(e) => {
                  setSelectedCategoryId(e.target.value);
                  setSearchTerm("");
                  setCurrentPage(1);
                }}
              >
                <option value="">Kateqoriya seçin</option>
                {formOptions.categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.FilterItem}>
            <label>İş növləri</label>
            <div className={styles.SelectWrapper}>
              <select
                value={selectedEmploymentTypeId}
                onChange={(e) => {
                  setSelectedEmploymentTypeId(e.target.value);
                  setSearchTerm("");
                  setCurrentPage(1);
                }}
              >
                <option value="">İş növü seçin</option>
                {formOptions.employmentTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.FilterItem}>
            <label>İş imkanları</label>
            <div className={styles.SelectWrapper}>
              <select
                value={selectedJobModeId}
                onChange={(e) => {
                  setSelectedJobModeId(e.target.value);
                  setSearchTerm("");
                  setCurrentPage(1);
                }}
              >
                <option value="">İş imkanı seçin</option>
                {formOptions.jobModes.map((mode) => (
                  <option key={mode.id} value={mode.id}>
                    {mode.name}
                  </option>
                ))}
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
        ) : vacancies.length === 0 ? (
          <p>
            {error
              ? "Vakansiya tapılmadı və ya server cavab vermir."
              : "Heç bir vakansiya tapılmadı."}
          </p>
        ) : (
          vacancies.map((vacancy) => (
            <div
              key={vacancy.id}
              className={styles.VacancyListItems}
              onClick={() => navigate(`/vacancy/${vacancy.id}`)}
              style={{ cursor: "pointer" }}
            >
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
              <Link
                to={`/apply/${vacancy.id}`}
                className={styles.Applylink}
                onClick={(e) => e.stopPropagation()}
              >
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
