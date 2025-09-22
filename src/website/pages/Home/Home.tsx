import styles from "./Home.module.scss";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { API_VACANCIES, API_APPLY } from "../../../constants/apiBase";

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
  vacancyLocationDto: {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
    logoUrl?: string | null;
    totalEmployees: number;
  };
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

  const [formOptions, setFormOptions] = useState<FormOptions>({
    categories: [],
    employmentTypes: [],
    jobModes: [],
    companyDto: [],
  });

  const [appliedVacancies, setAppliedVacancies] = useState<number[]>([]);

  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedEmploymentTypeId, setSelectedEmploymentTypeId] = useState("");
  const [selectedJobModeId, setSelectedJobModeId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const vacanciesPerPage = 4;

  const popularVacancies = [
    "Frontend Developer",
    "HelpDesk",
    "HR",
    "Satınalma",
    "DevOps Engineer",
  ];

  const navigate = useNavigate();

  /** Fetch form options **/
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

  /** Fetch applied vacancies on mount and persist after login **/
  useEffect(() => {
    const fetchAppliedVacancies = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const res = await fetch(`${API_APPLY}/api/applications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch applied vacancies");

        const data = await res.json();
        const appliedIds = data.map((app: any) => app.vacancyId);
        setAppliedVacancies(appliedIds);
      } catch (err) {
        console.error("Error fetching applied vacancies:", err);
      }
    };
    fetchAppliedVacancies();
  }, []);

  /** Fetch vacancies when filters, search term, or page changes **/
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

          queryParams.append("page", (currentPage - 1).toString());
          queryParams.append("size", vacanciesPerPage.toString());

          const url = `${API_VACANCIES}/api/vacancies/filter/company?${queryParams.toString()}&sort=id,desc`;

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

  /** Apply to a vacancy **/
  const applyToVacancy = async (vacancyId: number) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Zəhmət olmasa əvvəlcə daxil olun.");
      return;
    }

    if (appliedVacancies.includes(vacancyId)) {
      alert("Siz artıq bu vakansiyaya müraciət etmisiniz.");
      return;
    }

    try {
      const res = await fetch(
        `${API_APPLY}/api/applications?vacancyId=${vacancyId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Müraciət uğursuz oldu");

      try {
        await res.json();
      } catch {}

      alert("Uğurla müraciət etdiniz!");
      setAppliedVacancies((prev) => [...prev, vacancyId]);
    } catch (err) {
      console.error(err);
      alert("Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.");
    }
  };

  return (
    <div className={styles.Home}>
      {/* Header */}
      <div className={styles.HeaderTitle}>
        <h1>Vakansiyalar</h1>
        <p>Gələcəyini bizimlə qur!</p>
      </div>

      {/* Search */}
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

      {/* Filters */}
      <div className={styles.Filter}>
        <div className={styles.FilterList}>
          {/* Company */}
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

          {/* Category */}
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

          {/* Employment Type */}
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

          {/* Job Mode */}
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

      {/* Vacancies */}
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
          vacancies.map((vacancy) => {
            const hasApplied = appliedVacancies.includes(vacancy.id);
            return (
              <div
                key={vacancy.id}
                className={styles.VacancyListItems}
                onClick={() => navigate(`/vacancy/${vacancy.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className={styles.LogoInfo}>
                  <img
                    src={
                      vacancy.vacancyLocationDto?.logoUrl
                        ? vacancy.vacancyLocationDto.logoUrl
                        : "src/website/assets/default_logo.png"
                    }
                    alt={vacancy.vacancyLocationDto?.name || "Company Logo"}
                    className={styles.VacancyLogo}
                  />
                  <div className={styles.VacancyInfo}>
                    <h3>{vacancy.position}</h3>
                    <p>
                      {vacancy.vacancyLocationDto?.name || "Naməlum Şirkət"}
                    </p>
                  </div>
                </div>
                <div
                  className={styles.Applylink}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!hasApplied) applyToVacancy(vacancy.id);
                  }}
                >
                  <div
                    className={styles.ApplyBtn}
                    style={{
                      backgroundColor: hasApplied ? "#ccc" : "#407bff",
                      cursor: hasApplied ? "not-allowed" : "pointer",
                    }}
                  >
                    <h4>{hasApplied ? "Müraciət olunub" : "Müraciət et"}</h4>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

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
    </div>
  );
}
