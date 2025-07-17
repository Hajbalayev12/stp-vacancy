import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import { FaTachometerAlt, FaUser, FaChevronDown } from "react-icons/fa";
import { LuBuilding2 } from "react-icons/lu";

const menuItems = [
  {
    icon: <FaTachometerAlt />,
    label: "Dashboard",
    subItems: [{ label: "Home", path: "/admin/home" }],
  },
  {
    icon: <LuBuilding2 />,
    label: "Companies",
    subItems: [
      { label: "➕ Add Company", path: "/admin/addcompany" },
      { label: "View Companies", path: "/admin/viewcompanies" },
    ],
  },
  {
    icon: <FaUser />,
    label: "Vacancies",
    subItems: [
      { label: "➕ Add Vacancy", path: "/admin/addvacancy" },
      { label: "View Vacancies", path: "/admin/viewvacancies" },
    ],
  },
];

export default function Sidebar() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleSubMenu = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.sidebar}>
      <ul className={styles.menu}>
        {menuItems.map((item, index) => (
          <li key={index} className={styles.menuItem}>
            <div
              className={styles.menuHeader}
              onClick={() => item.subItems && toggleSubMenu(index)}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
              {item.subItems && (
                <FaChevronDown
                  className={`${styles.arrow} ${
                    openIndex === index ? styles.rotate : ""
                  }`}
                />
              )}
            </div>

            {item.subItems && (
              <ul
                className={`${styles.subMenu} ${
                  openIndex === index ? styles.show : styles.hide
                }`}
              >
                {item.subItems.map((sub, i) => (
                  <li key={i} className={styles.subMenuItem}>
                    <Link to={sub.path}>{sub.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
