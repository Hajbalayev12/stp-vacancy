import { useState } from "react";
import styles from "./AddFormOptions.module.scss";
import { useToast } from "../../../shared/context/ToastContext";
import { API_VACANCIES } from "../../../constants/apiBase";

const AddFormOptions = () => {
  const [category, setCategory] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [jobMode, setJobMode] = useState("");

  const { showSuccess, showError } = useToast();

  const handleSubmit = async (
    type: "category" | "employmentType" | "jobMode",
    value: string
  ) => {
    if (!value.trim()) {
      showError("Dəyər boş ola bilməz.");
      return;
    }

    const urlMap = {
      category: `${API_VACANCIES}/api/form-options/add/category`,
      employmentType:
        `${API_VACANCIES}/api/form-options/add/employment-type`,
      jobMode: `${API_VACANCIES}/api/form-options/add/job-mode`,
    };

    const url = `${urlMap[type]}?name=${value.trim()}`;

    try {
      const res = await fetch(url, {
        method: "POST",
      });

      if (res.ok) {
        showSuccess(`${type} uğurla əlavə olundu.`);
        if (type === "category") setCategory("");
        if (type === "employmentType") setEmploymentType("");
        if (type === "jobMode") setJobMode("");
      } else {
        const err = await res.json();
        showError(err.message || `${type} əlavə edilərkən xəta baş verdi.`);
      }
    } catch (error) {
      console.error(error);
      showError(`${type} üçün serverlə əlaqə qurulmadı.`);
    }
  };

  return (
    <div className={styles.AddFormOptions}>
      <h2>Form Seçimləri Əlavə Et</h2>

      <div className={styles.optionSection}>
        <label>Kategoriya:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Məsələn: IT"
        />
        <button
          className={styles.submitBtn}
          onClick={() => handleSubmit("category", category)}
        >
          Əlavə et
        </button>
      </div>

      <div className={styles.optionSection}>
        <label>İş Növü (Employment Type):</label>
        <input
          type="text"
          value={employmentType}
          onChange={(e) => setEmploymentType(e.target.value)}
          placeholder="Məsələn: Tam ştat"
        />
        <button
          className={styles.submitBtn}
          onClick={() => handleSubmit("employmentType", employmentType)}
        >
          Əlavə et
        </button>
      </div>

      <div className={styles.optionSection}>
        <label>İş Rejimi (Job Mode):</label>
        <input
          type="text"
          value={jobMode}
          onChange={(e) => setJobMode(e.target.value)}
          placeholder="Məsələn: Onlayn"
        />
        <button
          className={styles.submitBtn}
          onClick={() => handleSubmit("jobMode", jobMode)}
        >
          Əlavə et
        </button>
      </div>
    </div>
  );
};

export default AddFormOptions;
