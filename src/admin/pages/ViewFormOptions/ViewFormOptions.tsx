import { useEffect, useState } from "react";
import styles from "./ViewFormOptions.module.scss"; // create this file for styling if needed
import { API_VACANCIES } from "../../../constants/apiBase";

type Category = { id: number; name: string };
type EmploymentType = { id: number; name: string };
type JobMode = { id: number; name: string };

type FormOptions = {
  categories: Category[];
  employmentTypes: EmploymentType[];
  jobModes: JobMode[];
};

export default function ViewFormOptions() {
  const [formOptions, setFormOptions] = useState<FormOptions>({
    categories: [],
    employmentTypes: [],
    jobModes: [],
  });

  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchFormOptions = async () => {
      try {
        const res = await fetch(
          `${API_VACANCIES}/api/form-options/form-options`
        );
        const data = await res.json();
        setFormOptions({
          categories: data.categories || [],
          employmentTypes: data.employmentTypes || [],
          jobModes: data.jobModes || [],
        });
      } catch (err) {
        console.error("Error fetching form options:", err);
        setError(true);
      }
    };

    fetchFormOptions();
  }, []);

  return (
    <div className={styles.ViewFormOptions}>
      <h1>Form Options</h1>

      {error ? (
        <p style={{ color: "red" }}>Serverdən məlumat alına bilmədi.</p>
      ) : (
        <>
          <section>
            <h2>Kateqoriyalar</h2>
            <ul>
              {formOptions.categories.map((cat) => (
                <li key={cat.id}>
                  <strong>Ad:</strong> {cat.name}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>İş Növləri (Employment Types)</h2>
            <ul>
              {formOptions.employmentTypes.map((type) => (
                <li key={type.id}>
                  <strong>Ad:</strong> {type.name}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>İş İmkanları (Job Modes)</h2>
            <ul>
              {formOptions.jobModes.map((mode) => (
                <li key={mode.id}>
                  <strong>Ad:</strong> {mode.name}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
