import styles from "./AddVacancy.module.scss";

const AddVacancy = () => {
  return (
    <div className={styles.AddVacancy}>
      <h2 className={styles.title}>Add New Vacancy</h2>
      <form className={styles.form}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>
              Company Name <span>*</span>
            </label>
            <input type="text" placeholder="Name" required />
          </div>
          <div className={styles.field}>
            <label>
              Position <span>*</span>
            </label>
            <input type="text" placeholder="Name" required />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>
              Job Category <span>*</span>
            </label>
            <select required>
              <option value="">Choose...</option>
              <option value="it">IT</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>
              Job Type <span>*</span>
            </label>
            <select required>
              <option value="">Choose...</option>
              <option value="fulltime">Full Time</option>
              <option value="parttime">Part Time</option>
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>
              No. of Vacancy <span>*</span>
            </label>
            <input type="number" placeholder="Number" required />
          </div>
          <div className={styles.field}>
            <label>
              Select Experience <span>*</span>
            </label>
            <select required>
              <option value="">Choose...</option>
              <option value="1">1 yr</option>
              <option value="2">2 yrs</option>
              <option value="3">3+ yrs</option>
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>
              Posted Date <span>*</span>
            </label>
            <input type="date" required />
          </div>
          <div className={styles.field}>
            <label>
              Last Date To Apply <span>*</span>
            </label>
            <input type="date" required />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>
              Close Date <span>*</span>
            </label>
            <input type="date" required />
          </div>
          <div className={styles.field}>
            <label>
              Select Gender <span>*</span>
            </label>
            <select required>
              <option value="">Choose...</option>
              <option value="any">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
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
