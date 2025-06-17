import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Companies.module.scss";

export default function Companies() {
  const [companies] = useState([
    {
      name: "STP MMC",
      image: "src/website/assets/stpmmc.png",
      address: "Sumqayıt şəh.,Z.Tağıev qəs.",
      vacancies: 5,
    },
    {
      name: "STP GLOBAL CABLE",
      image: "src/website/assets/stpcable.png",
      address: "Sumqayıt şəh.,Z.Tağıev qəs.",
      vacancies: 5,
    },
    {
      name: "STP ALUMINIUM",
      image: "src/website/assets/aluminium.png",
      address: "Sumqayıt şəh.,Z.Tağıev qəs.",
      vacancies: 5,
    },
    {
      name: "STP-AH",
      image: "src/website/assets/stpah.png",
      address: "Sumqayıt şəh.,Z.Tağıev qəs.",
      vacancies: 5,
    },
    {
      name: "ASSAN-STP PANEL",
      image: "src/website/assets/stppanel.png",
      address: "Sumqayıt şəh.,Z.Tağıev qəs.",
      vacancies: 5,
    },
    {
      name: "STP POLYMER",
      image: "src/website/assets/stppolymer.png",
      address: "Sumqayıt şəh.,Z.Tağıev qəs.",
      vacancies: 5,
    },
    {
      name: "STP METAL STRUCTURES",
      image: "src/website/assets/stpmmc.png",
      address: "Sumqayıt şəh.,Z.Tağıev qəs.",
      vacancies: 5,
    },
    {
      name: "SOCAR-STP",
      image: "src/website/assets/socarstp.png",
      address: "Sumqayıt şəh.,Z.Tağıev qəs.",
      vacancies: 5,
    },
    {
      name: "STP-Btech",
      image: "src/website/assets/stpmmc.png",
      address: "Sumqayıt şəh.,Z.Tağıev qəs.",
      vacancies: 5,
    },
    {
      name: "Azroksan",
      image: "src/website/assets/azroksan.png",
      address: "Sumqayıt şəh.,Z.Tağıev qəs.",
      vacancies: 5,
    },
  ]);

  return (
    <div className={styles.Companies}>
      <div className={styles.CompaniesGrid}>
        {companies.map((company, index) => (
          <Link to="/company" key={index}>
            <div className={styles.CompanyItems}>
              <img src={company.image} alt={company.name} />
              <h2>{company.name}</h2>
              <p>{company.address}</p>
              <button>Vakansiya sayı: {company.vacancies}</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
