import styles from "./ViewVacancies.module.scss";
import { Link } from "react-router-dom";

const ViewVacancies = () => {
  const jobs = [
    {
      id: 2,
      position: "Entry Level Software Developer",
      type: "Part-Time",
      posted: "13-01-2024",
      lastDate: "25-01-2024",
      closeDate: "26-01-2024",
      status: "Active",
    },
    {
      id: 9,
      position: "Entry Level Software Developer",
      type: "Part-Time",
      posted: "13-01-2024",
      lastDate: "25-01-2024",
      closeDate: "26-01-2024",
      status: "Active",
    },
    {
      id: 4,
      position: "IOS Developer",
      type: "Part-Time",
      posted: "15-01-2024",
      lastDate: "27-01-2024",
      closeDate: "28-01-2024",
      status: "Active",
    },
    {
      id: 11,
      position: "IOS Developer",
      type: "Part-Time",
      posted: "15-01-2024",
      lastDate: "27-01-2024",
      closeDate: "28-01-2024",
      status: "Active",
    },
    {
      id: 3,
      position: "Java Developer",
      type: "Full-Time",
      posted: "13-01-2024",
      lastDate: "26-01-2024",
      closeDate: "27-01-2024",
      status: "InActive",
    },
    {
      id: 10,
      position: "Java Developer",
      type: "Full-Time",
      posted: "13-01-2024",
      lastDate: "26-01-2024",
      closeDate: "27-01-2024",
      status: "InActive",
    },
    {
      id: 7,
      position: "Junior Developer",
      type: "Part-Time",
      posted: "15-01-2024",
      lastDate: "30-01-2024",
      closeDate: "24-01-2024",
      status: "InActive",
    },
    {
      id: 14,
      position: "Junior Developer",
      type: "Part-Time",
      posted: "15-01-2024",
      lastDate: "30-01-2024",
      closeDate: "24-01-2024",
      status: "InActive",
    },
  ];

  return (
    <div className={styles.ViewVacancies}>
      <div className={styles.header}>
        <h2>Job List</h2>
      </div>

      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Position</th>
              <th>Type</th>
              <th>Posted Date</th>
              <th>Last Date To Apply</th>
              <th>Close Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className={styles.clickableRow}>
                <td>
                  <Link to={"/admin/vacancyinfo"}>{job.id}</Link>
                </td>
                <td>
                  <Link to={"/admin/vacancyinfo"}>{job.position}</Link>
                </td>
                <td>{job.type}</td>
                <td>{job.posted}</td>
                <td>{job.lastDate}</td>
                <td>{job.closeDate}</td>
                <td>
                  <span
                    className={`${styles.status} ${
                      job.status === "Active" ? styles.active : styles.inactive
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewVacancies;
