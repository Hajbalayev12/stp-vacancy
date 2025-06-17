import styles from "./Tomorrow.module.scss";
import { Link } from "react-router-dom";

export default function Tomorrow() {
  const vacancies = [
    { id: 1, title: "Front-end Developer" },
    { id: 2, title: "HelpDesk" },
    { id: 3, title: "HR" },
    { id: 4, title: "Satınalma" },
    { id: 5, title: "Sistem İnzibatçılığı" },
  ];

  return (
    <div className={styles.ThePower}>
      <div className={styles.searchHeader}>
        <div className={styles.searchInput}>
          <i className="fas fa-search" />
          <input type="text" placeholder="İş" />
        </div>

        <div className={styles.searchSelect}>
          <i className="fas fa-search" />
          <select>
            <option>Şirkət seç</option>
            <option>STP MMC</option>
            <option>STP GLOBAL CABLE</option>
            <option>STP ALUMINIUM</option>
            <option>STP-AH</option>
            <option>STP POLYMER</option>
            <option>STP METAL STRUCTURES</option>
            <option>SOCAR-STP</option>
            <option>ASSAN-STP PANEL</option>
            <option>STP-Btech</option>
            <option>Azroksan</option>
          </select>
        </div>

        <button className={styles.searchButton}>
          <i className="fas fa-search" />
          <span>İş Tap</span>
        </button>
      </div>

      <div className={styles.companyCard}>
        <div className={styles.VacancyList}>
          {vacancies.map((vacancy) => (
            <div className={styles.VacancyListItems} key={vacancy.id}>
              <div className={styles.LogoInfo}>
                <img
                  src="src/website/assets/azroksan.png"
                  alt="vacancy"
                  className={styles.VacancyLogo}
                />
                <div className={styles.VacancyInfo}>
                  <h3>{vacancy.title}</h3>
                  <p>The Power of Tomorrow</p>
                </div>
              </div>
              <Link to="/vacancyinfo" className={styles.Applylink}>
                <div className={styles.ApplyBtn}>
                  <h4>Müraciət et</h4>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
