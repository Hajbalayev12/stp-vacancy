import styles from "./AddVacancy.module.scss";
import { useState, useEffect } from "react";
import { useToast } from "../../../shared/context/ToastContext";
import { API_VACANCIES } from "../../../constants/apiBase";

type Company = { id: number; companyName: string; companyLogoUrl?: string };
type Project = { id: number; projectName: string; projectLogoUrl?: string };
type Option = { id: number; name: string };

const AddVacancy = () => {
  const { showError, showSuccess } = useToast();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Option[]>([]);
  const [employmentTypes, setEmploymentTypes] = useState<Option[]>([]);
  const [jobModes, setJobModes] = useState<Option[]>([]);

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [formData, setFormData] = useState({
    vacancyOrganizationTypeId: 0,
    organizationId: 0,
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

  // Fetch options
  useEffect(() => {
    const fetchFormOptions = async () => {
      try {
        const res = await fetch(
          `${API_VACANCIES}/api/form-options/form-options`
        );
        if (!res.ok) throw new Error("Failed to fetch form options");
        const data = await res.json();
        setCompanies(data.companyDto || []);
        setProjects(data.projectDto || []);
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

  // Update selected company/project for preview
  useEffect(() => {
    if (formData.vacancyOrganizationTypeId === 1) {
      const company =
        companies.find((c) => c.id === formData.organizationId) || null;
      setSelectedCompany(company);
      setSelectedProject(null);
    } else if (formData.vacancyOrganizationTypeId === 2) {
      const project =
        projects.find((p) => p.id === formData.organizationId) || null;
      setSelectedProject(project);
      setSelectedCompany(null);
    }
  }, [
    formData.organizationId,
    formData.vacancyOrganizationTypeId,
    companies,
    projects,
  ]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "vacancyOrganizationTypeId") {
      setFormData((prev) => ({
        ...prev,
        [name]: Number(value),
        organizationId: 0, // reset when type changes
      }));
      return;
    }
    if (name === "minSalary" || name === "maxSalary") {
      setFormData((prev) => ({
        ...prev,
        salaryNegotiable: false,
        [name]: value ? Number(value) : null,
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: name.endsWith("Id") ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1️⃣ Basic validations
    if (![1, 2].includes(formData.vacancyOrganizationTypeId)) {
      showError("Organization type is required.");
      return;
    }

    if (formData.organizationId === 0) {
      showError(
        `Please select a ${
          formData.vacancyOrganizationTypeId === 1 ? "company" : "project"
        }.`
      );
      return;
    }

    if (!formData.position || !formData.experienceRequired) {
      showError("Position and experience are required.");
      return;
    }

    if (!formData.startDate) {
      showError("Start date is required.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (formData.startDate < today) {
      showError("Start date cannot be in the past.");
      return;
    }

    if (formData.endDate && formData.endDate <= formData.startDate) {
      showError("End date must be after start date.");
      return;
    }

    if (!formData.salaryNegotiable) {
      if (formData.minSalary === null || formData.maxSalary === null) {
        showError("Please provide min and max salary or mark as negotiable.");
        return;
      }
      if (formData.minSalary > formData.maxSalary) {
        showError("Min salary cannot be greater than Max salary.");
        return;
      }
    }

    if (formData.categoryId === 0) {
      showError("Job category is required.");
      return;
    }
    if (formData.employmentTypeId === 0) {
      showError("Employment type is required.");
      return;
    }
    if (formData.jobModeId === 0) {
      showError("Job mode is required.");
      return;
    }
    const confirmed = window.confirm(
      "Əminsinizmi ki, bu vakansiyanı yaratmaq istəyirsiniz?"
    );
    if (!confirmed) return;
    try {
      const res = await fetch(`${API_VACANCIES}/api/vacancies/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data: any;
      const text = await res.text(); // read body once
      try {
        data = JSON.parse(text); // try parsing JSON
      } catch {
        data = text; // fallback to plain text
      }

      console.log("Backend response:", data);

      if (res.ok) {
        showSuccess(
          typeof data === "string" ? data : "Vacancy created successfully!"
        );
        // Reset form
        setFormData({
          vacancyOrganizationTypeId: 0,
          organizationId: 0,
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
          minSalary: null,
          maxSalary: null,
          salaryNegotiable: false,
        });
      } else {
        if (typeof data === "string") {
          showError(data); // plain text error
        } else if (data?.message) {
          showError(Object.values(data.message).join(", "));
        } else if (data?.errors) {
          showError(Object.values(data.errors).flat().join(", "));
        } else {
          showError("Something went wrong. Check console for details.");
        }
      }
    } catch (err) {
      console.error("Fetch error:", err);
      showError("Something went wrong. Check console for details.");
    }
  };

  return (
    <div className={styles.AddVacancy}>
      <h2 className={styles.title}>Add New Vacancy</h2>

      {/* Organization Type */}
      <div className={styles.field}>
        <label>
          Organization Type <span>*</span>
        </label>
        <select
          name="vacancyOrganizationTypeId"
          onChange={handleChange}
          value={formData.vacancyOrganizationTypeId}
          required
        >
          <option value={0}>Choose...</option>
          <option value={1}>Company</option>
          <option value={2}>Project</option>
        </select>
      </div>

      {/* Company or Project select */}
      {formData.vacancyOrganizationTypeId === 1 && (
        <div className={styles.companySelectWrapper}>
          <div className={styles.field}>
            <label>
              Select Company <span>*</span>
            </label>
            <select
              name="organizationId"
              onChange={handleChange}
              value={formData.organizationId}
              required
            >
              <option value={0}>Select company</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.companyName}
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
      )}

      {formData.vacancyOrganizationTypeId === 2 && (
        <div className={styles.companySelectWrapper}>
          <div className={styles.field}>
            <label>
              Select Project <span>*</span>
            </label>
            <select
              name="organizationId"
              onChange={handleChange}
              value={formData.organizationId}
              required
            >
              <option value={0}>Select project</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.projectName}
                </option>
              ))}
            </select>
          </div>
          {selectedCompany && (
            <div className={styles.companyPreview}>
              {selectedCompany.companyLogoUrl && (
                <img
                  src={selectedCompany.companyLogoUrl}
                  alt={selectedCompany.companyName}
                  className={styles.companyLogo}
                />
              )}
              <span>{selectedCompany.companyName}</span>
            </div>
          )}
        </div>
      )}

      {/* Vacancy Form */}
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

        {/* Dates */}
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
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              onChange={handleChange}
              value={formData.endDate}
            />
          </div>
        </div>

        {/* Category, Employment, Mode */}
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
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
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
              {employmentTypes.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
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
              {jobModes.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Salary */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Salary Option</label>
            <select
              value={formData.salaryNegotiable ? "negotiable" : "range"}
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  salaryNegotiable: value === "negotiable",
                  minSalary:
                    value === "negotiable" ? null : prev.minSalary ?? 0,
                  maxSalary:
                    value === "negotiable" ? null : prev.maxSalary ?? 0,
                }));
              }}
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
