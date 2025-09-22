import styles from "./AddVacancy.module.scss";
import { useState, useEffect } from "react";
import { useToast } from "../../../shared/context/ToastContext";
import { API_VACANCIES } from "../../../constants/apiBase";

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

  // State for form options
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
    minSalary: null as number | null,
    maxSalary: null as number | null,
    salaryNegotiable: false,
  });

  // Fetch form options on mount
  useEffect(() => {
    const fetchFormOptions = async () => {
      try {
        const res = await fetch(
          `${API_VACANCIES}/api/form-options/form-options`
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

  // Update selected company
  useEffect(() => {
    const company = companies.find((c) => c.id === formData.companyId) || null;
    setSelectedCompany(company);
  }, [formData.companyId, companies]);

  // Handle input/select changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Handle min/max salary inputs
    if (name === "minSalary" || name === "maxSalary") {
      setFormData((prev) => ({
        ...prev,
        salaryNegotiable: false,
        [name]: value === "" ? null : Number(value),
      }));
      return;
    }

    // Handle other fields
    setFormData((prev) => ({
      ...prev,
      [name]: name.endsWith("Id") ? Number(value) : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Bu vakansiyanı yaratmaq istədiyinizə əminsinizmi?"
    );
    if (!confirmed) return;

    // Validate min/max salary
    if (
      !formData.salaryNegotiable &&
      formData.minSalary !== null &&
      formData.maxSalary !== null
    ) {
      if (formData.minSalary > formData.maxSalary) {
        showError("Min salary cannot be greater than Max salary.");
        return;
      }
    }

    console.log("Form data to be sent:", formData);

    try {
      const res = await fetch(`${API_VACANCIES}/api/vacancies/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        showSuccess("Vacancy created successfully!");
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

      {/* Company select + logo */}
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

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Position & Experience */}
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

        {/* Education & Major */}
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

        {/* Language & Skills */}
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

        {/* Requirements & Responsibilities */}
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

        {/* Start & End Dates */}
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

        {/* Category & Employment Type */}
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

        {/* Job Mode */}
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

        {/* Salary Section */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Salary Option</label>
            <select
              name="salaryOption"
              onChange={(e) => {
                const value = e.target.value;
                if (value === "negotiable") {
                  setFormData((prev) => ({
                    ...prev,
                    salaryNegotiable: true,
                    minSalary: null,
                    maxSalary: null,
                  }));
                } else {
                  setFormData((prev) => ({
                    ...prev,
                    salaryNegotiable: false,
                    minSalary: 0,
                    maxSalary: 0,
                  }));
                }
              }}
              value={formData.salaryNegotiable ? "negotiable" : "range"}
            >
              <option value="range">Min/Max Salary</option>
              <option value="negotiable">Razılaşma yolu ilə</option>
            </select>
          </div>

          {!formData.salaryNegotiable && (
            <>
              <div className={styles.field}>
                <label>Min Salary</label>
                <input
                  type="number"
                  name="minSalary"
                  onChange={handleChange}
                  value={formData.minSalary ?? ""}
                  min={0}
                />
              </div>
              <div className={styles.field}>
                <label>Max Salary</label>
                <input
                  type="number"
                  name="maxSalary"
                  onChange={handleChange}
                  value={formData.maxSalary ?? ""}
                  min={0}
                />
              </div>
            </>
          )}
        </div>

        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddVacancy;
