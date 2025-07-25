import styles from "./Home.module.scss";
import { Link, useNavigate } from "react-router-dom";
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
  const vacanciesPerPage = 3;

  const [formOptions, setFormOptions] = useState({
    categories: [],
    employmentTypes: [],
    jobModes: [],
  });

  const [companies, setCompanies] = useState<
    { id: number; companyName: string }[]
  >([]);

  // Filters state
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

  // Fetch form options and companies on mount
  useEffect(() => {
    const fetchFormOptions = async () => {
      try {
        const res = await fetch(
          "http://192.168.200.133:8083/api/form-options/form-options"
        );
        const data = await res.json();
        setFormOptions({
          categories: data.categories || [],
          employmentTypes: data.employmentTypes || [],
          jobModes: data.jobModes || [],
        });
      } catch (err) {
        console.error("Error fetching form options:", err);
      }
    };

    const fetchCompanies = async () => {
      try {
        const res = await fetch(
          "http://192.168.200.133:8081/api/companies/all/company"
        );
        const data = await res.json();
        setCompanies(data || []);
      } catch (err) {
        console.error("Error fetching companies:", err);
      }
    };

    fetchFormOptions();
    fetchCompanies();
  }, []);

  // Fetch vacancies automatically when filters or searchTerm change
  useEffect(() => {
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

        // Add pagination
        const size = 5; // or 10
        queryParams.append("pageNumber", currentPage.toString());
        queryParams.append("size", size.toString());

        const url = `http://192.168.200.133:8083/api/vacancies/filter?${queryParams.toString()}`;
        console.log("Fetching vacancies with URL:", url);

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch filtered vacancies");
        const data = await res.json();

        // Handle API response structure
        setVacancies(Array.isArray(data) ? data : data.content || []);
      } catch (err) {
        console.error("Error fetching filtered vacancies:", err);
        setVacancies([]); // Clear on error
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredVacancies();
  }, [
    selectedCompanyId,
    selectedCategoryId,
    selectedEmploymentTypeId,
    selectedJobModeId,
    searchTerm,
    currentPage, // 👈 make sure this is included
  ]);

  // Pagination logic with safe array check
  const vacanciesArray = Array.isArray(vacancies) ? vacancies : [];
  const indexOfLastVacancy = currentPage * vacanciesPerPage;
  const indexOfFirstVacancy = indexOfLastVacancy - vacanciesPerPage;
  const currentVacancies = vacanciesArray.slice(
    indexOfFirstVacancy,
    indexOfLastVacancy
  );
  const totalPages = Math.ceil(vacanciesArray.length / vacanciesPerPage);

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
            }}
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
        {/* You can remove this button if you want since filters are real-time */}
        {/* <button className={styles.SearchButton} onClick={handleFilterSearch}>
          Axtar
        </button> */}
      </div>

      {/* FILTERS */}
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
                }}
              >
                <option value="">Şirkət seçin</option>
                {companies.map((company) => (
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
                }}
              >
                <option value="">Kateqoriya seçin</option>
                {formOptions.categories.map((cat: any) => (
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
                }}
              >
                <option value="">İş növü seçin</option>
                {formOptions.employmentTypes.map((type: any) => (
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
                onChange={(e) => setSelectedJobModeId(e.target.value)}
              >
                <option value="">İş imkanı seçin</option>
                {formOptions.jobModes.map((mode: any) => (
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
        ) : currentVacancies.length === 0 ? (
          <p>No vacancies found.</p>
        ) : (
          currentVacancies.map((vacancy) => (
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
