import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import {
  FaTachometerAlt,
  FaUser,
  FaGlobe,
  FaCogs,
  FaTh,
  FaChartLine,
  FaStar,
  FaHeart,
  FaWrench,
  FaWpforms,
  FaTable,
  FaCopy,
  FaChevronDown,
} from "react-icons/fa";
import { LuBuilding2 } from "react-icons/lu";

const menuItems = [
  {
    icon: <FaTachometerAlt />,
    label: "Dashboard",
    subItems: [
      { label: "Jobs", path: "/admin/jobs" },
      { label: "Application", path: "/admin/applications" },
      { label: "Profile", path: "/admin/profile" },
      { label: "Statistics", path: "/admin/statistics" },
      { label: "Companies", path: "/admin/companies" },
    ],
  },
  {
    icon: <LuBuilding2 />,
    label: "Companies",
    subItems: [
      { label: "➕ Add Company", path: "/admin/addcompanies" },
      { label: "View Companies", path: "/admin/companies" },
    ],
  },
  {
    icon: <FaUser />,
    label: "Vacancies",
    subItems: [
      { label: "➕ Add Vacancy", path: "/admin/addvacancy" },
      { label: "View Vacancies", path: "/admin/vacancies" },
    ],
  },
  { icon: <FaGlobe />, label: "Account", badge: "New" },
  { icon: <FaGlobe />, label: "AİKit", badge: "New" },
  { icon: <FaCogs />, label: "CMS" },
  { icon: <FaTh />, label: "Apps" },
  { icon: <FaChartLine />, label: "Charts" },
  { icon: <FaStar />, label: "Bootstrap" },
  { icon: <FaHeart />, label: "Plugins" },
  { icon: <FaWrench />, label: "Widget" },
  { icon: <FaWpforms />, label: "Forms" },
  { icon: <FaTable />, label: "Table" },
  { icon: <FaCopy />, label: "Pages" },
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
              {item.badge && <span className={styles.badge}>New</span>}
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
