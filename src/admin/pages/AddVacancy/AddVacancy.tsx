import styles from "./AddVacancy.module.scss";
import { useState, useEffect } from "react";
import { useToast } from "../../../shared/context/ToastContext";

type Company = {
  id: number;
  companyName: string;
  companyLogoUrl: string;
};

type Option = {
  id: number;
  name: string;
};

const AddVacancy = () => {
  const { showError, showSuccess } = useToast();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const [categories, setCategories] = useState<Option[]>([]);
  const [employmentTypes, setEmploymentTypes] = useState<Option[]>([]);
  const [jobModes, setJobModes] = useState<Option[]>([]);

  const [formData, setFormData] = useState({
    companyId: 0,
    position: "",
    experienceRequired: "",
    educationLevel: "",
    major: "",
    language: "",
    skills: "",
    requirements: "",
    responsibilities: "",
    createdByUserId: 1,
    employmentTypeId: 0,
    jobModeId: 0,
    categoryId: 0,
    startDate: "",
    endDate: "",
  });

  // Fetch all companies and form options on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companiesRes, optionsRes] = await Promise.all([
          fetch("http://192.168.200.133:8081/api/companies/all/company"),
          fetch("http://192.168.200.133:8083/api/vacancies/form-options"),
        ]);
        if (!companiesRes.ok || !optionsRes.ok) {
          throw new Error("Failed to fetch initial data");
        }
        const companiesData = await companiesRes.json();
        const optionsData = await optionsRes.json();

        setCompanies(companiesData);
        setCategories(optionsData.categories || []);
        setEmploymentTypes(optionsData.employmentTypes || []);
        setJobModes(optionsData.jobModes || []);
      } catch (err) {
        console.error(err);
        showError("Failed to load initial data");
      }
    };
    fetchData();
  }, [showError]);

  // Fetch selected company info whenever companyId changes
  useEffect(() => {
    if (formData.companyId === 0) {
      setCompany(null);
      return;
    }
    const fetchCompany = async () => {
      try {
        const res = await fetch(
          `http://192.168.200.133:8081/api/companies/${formData.companyId}`
        );
        if (!res.ok) throw new Error("Failed to fetch company");
        const data = await res.json();
        setCompany(data);
      } catch (err) {
        console.error(err);
        showError("Failed to load company info");
        setCompany(null);
      }
    };
    fetchCompany();
  }, [formData.companyId, showError]);

  // Handle input/select changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.endsWith("Id") ? Number(value) : value,
    }));
  };

  // Submit form data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data to be sent:", formData);

    try {
      const res = await fetch(
        "http://192.168.200.133:8083/api/vacancies/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        showSuccess("Vacancy created successfully!");
        // Optionally reset formData here if needed
      } else {
        showError("Failed to create vacancy.");
      }
    } catch (err) {
      console.error(err);
      showError("Something went wrong.");
    }
  };

  return (
    <div className={styles.AddVacancy}>
      <h2 className={styles.title}>Add New Vacancy</h2>

      {/* Company select + logo/name side by side */}
      <div className={styles.companySelectWrapper}>
        <div className={styles.field}>
          <label>
            Company <span>*</span>
          </label>
          <select
            name="companyId"
            onChange={handleChange}
            value={formData.companyId}
            required
          >
            <option value={0}>Select company</option>
            {companies.map((comp) => (
              <option key={comp.id} value={comp.id}>
                {comp.companyName}
              </option>
            ))}
          </select>
        </div>

        {company && (
          <div className={styles.companyInfo}>
            {company.companyLogoUrl && (
              <img
                src={company.companyLogoUrl}
                alt={`${company.companyName} Logo`}
                className={styles.companyLogo}
              />
            )}
            <h3>{company.companyName}</h3>
          </div>
        )}
      </div>

      {/* The rest of the form */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>
              Position <span>*</span>
            </label>
            <input
              type="text"
              name="position"
              onChange={handleChange}
              value={formData.position}
              required
            />
          </div>
          <div className={styles.field}>
            <label>
              Experience <span>*</span>
            </label>
            <input
              type="text"
              name="experienceRequired"
              onChange={handleChange}
              value={formData.experienceRequired}
              required
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Education Level</label>
            <input
              type="text"
              name="educationLevel"
              onChange={handleChange}
              value={formData.educationLevel}
            />
          </div>
          <div className={styles.field}>
            <label>Major</label>
            <input
              type="text"
              name="major"
              onChange={handleChange}
              value={formData.major}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Language</label>
            <input
              type="text"
              name="language"
              onChange={handleChange}
              value={formData.language}
            />
          </div>
          <div className={styles.field}>
            <label>Skills</label>
            <input
              type="text"
              name="skills"
              onChange={handleChange}
              value={formData.skills}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Requirements</label>
            <textarea
              name="requirements"
              onChange={handleChange}
              value={formData.requirements}
            />
          </div>
          <div className={styles.field}>
            <label>Responsibilities</label>
            <textarea
              name="responsibilities"
              onChange={handleChange}
              value={formData.responsibilities}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>
              Start Date <span>*</span>
            </label>
            <input
              type="date"
              name="startDate"
              onChange={handleChange}
              value={formData.startDate}
              required
            />
          </div>
          <div className={styles.field}>
            <label>
              End Date <span>*</span>
            </label>
            <input
              type="date"
              name="endDate"
              onChange={handleChange}
              value={formData.endDate}
              required
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>
              Job Category <span>*</span>
            </label>
            <select
              name="categoryId"
              onChange={handleChange}
              value={formData.categoryId}
              required
            >
              <option value={0}>Choose...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label>
              Employment Type <span>*</span>
            </label>
            <select
              name="employmentTypeId"
              onChange={handleChange}
              value={formData.employmentTypeId}
              required
            >
              <option value={0}>Choose...</option>
              {employmentTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>
              Job Mode <span>*</span>
            </label>
            <select
              name="jobModeId"
              onChange={handleChange}
              value={formData.jobModeId}
              required
            >
              <option value={0}>Choose...</option>
              {jobModes.map((mode) => (
                <option key={mode.id} value={mode.id}>
                  {mode.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddVacancy;
