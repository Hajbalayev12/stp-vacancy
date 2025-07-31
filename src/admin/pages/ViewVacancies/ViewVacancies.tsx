import styles from "./ViewVacancies.module.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_VACANCIES } from "../../../constants/apiBase";

type Job = {
  id?: number;
  position: string;
  createdDate: string | null;
  startDate: string | null;
  endDate: string | null;
  employmentType: {
    id: number;
    name: string;
  };
  vacancyStatus: boolean;
  companyDto: {
    id: number;
    companyName: string;
    companyLogoUrl: string;
  };
};

const ViewVacancies = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(
          `${API_VACANCIES}/api/vacancies/all/vacancy?sort=createdDate,asc`
        );
        if (!res.ok) throw new Error("Failed to fetch vacancies");
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching vacancies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  const handleRowClick = (id?: number) => {
    if (id) {
      navigate(`/admin/vacancyinfo/${id}`);
    }
  };

  return (
    <div className={styles.ViewVacancies}>
      <div className={styles.header}>
        <h2>Job List</h2>
      </div>

      <div className={styles.tableWrapper}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Company Name</th>
                <th>Company Logo</th>
                <th>Position</th>
                <th>Type</th>
                <th>Created Date</th>
                <th>Start Date</th>
                <th>Last Date To Apply</th>
                <th>Vacancy Id</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr
                  key={job.id ?? index}
                  className={styles.clickableRow}
                  onClick={() => handleRowClick(job.id)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{index + 1}</td>
                  <td>{job.companyDto?.companyName || "—"}</td>
                  <td>
                    {job.companyDto?.companyLogoUrl ? (
                      <img
                        src={job.companyDto.companyLogoUrl}
                        alt={job.companyDto.companyName}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>{job.position}</td>
                  <td>{job.employmentType?.name || "—"}</td>
                  <td>{formatDate(job.createdDate)}</td>
                  <td>{formatDate(job.startDate)}</td>
                  <td>{formatDate(job.endDate)}</td>
                  <td>{job.id ?? "—"}</td>
                  <td>
                    <span
                      className={`${styles.status} ${
                        job.vacancyStatus ? styles.active : styles.inactive
                      }`}
                    >
                      {job.vacancyStatus ? "Aktiv" : "Deaktiv"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewVacancies;
