import styles from "./AddVacancy.module.scss";
import { useState, useEffect } from "react";
import { useToast } from "../../../shared/context/ToastContext";

type Company = {
  id: number;
  companyName: string;
  companyLogoUrl?: string;
};

type Option = {
  id: number;
  name: string;
};

const AddVacancy = () => {
  const { showError, showSuccess } = useToast();

  // State for all form options
  const [companies, setCompanies] = useState<Company[]>([]);
  const [categories, setCategories] = useState<Option[]>([]);
  const [employmentTypes, setEmploymentTypes] = useState<Option[]>([]);
  const [jobModes, setJobModes] = useState<Option[]>([]);

  // Selected company for logo display
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  // Form state
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

  // Fetch all form options (including companies) on mount
  useEffect(() => {
    const fetchFormOptions = async () => {
      try {
        const res = await fetch(
          "http://192.168.200.133:8083/api/form-options/form-options"
        );
        if (!res.ok) throw new Error("Failed to fetch form options");

        const data = await res.json();

        setCompanies(data.companyDto || []);
        setCategories(data.categories || []);
        setEmploymentTypes(data.employmentTypes || []);
        setJobModes(data.jobModes || []);
      } catch (err) {
        console.error(err);
        showError("Failed to load form options");
      }
    };

    fetchFormOptions();
  }, [showError]);

  // Update selectedCompany whenever companyId or companies changes
  useEffect(() => {
    const company = companies.find((c) => c.id === formData.companyId) || null;
    setSelectedCompany(company);
  }, [formData.companyId, companies]);

  // Handle changes in input/select fields
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
        // Optionally reset form data here:
        // setFormData({
        //   companyId: 0,
        //   position: "",
        //   experienceRequired: "",
        //   educationLevel: "",
        //   major: "",
        //   language: "",
        //   skills: "",
        //   requirements: "",
        //   responsibilities: "",
        //   createdByUserId: 1,
        //   employmentTypeId: 0,
        //   jobModeId: 0,
        //   categoryId: 0,
        //   startDate: "",
        //   endDate: "",
        // });
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

        {selectedCompany && (
          <div className={styles.companyInfo}>
            {selectedCompany.companyLogoUrl && (
              <img
                src={selectedCompany.companyLogoUrl}
                alt={`${selectedCompany.companyName} Logo`}
                className={styles.companyLogo}
              />
            )}
            <h3>{selectedCompany.companyName}</h3>
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
