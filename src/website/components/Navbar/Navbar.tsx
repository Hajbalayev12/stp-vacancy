import styles from "./Navbar.module.scss";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaSignInAlt, FaUserPlus, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const { t, i18n } = useTranslation();

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleCloseDropdown = () => {
    setDropdownOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav className={styles.Navbar}>
      <div className={styles.NavbarContainer}>
        <div className={styles.Logo}>
          <NavLink to="/">
            <img src="/src/website/assets/Logo.png" alt="Logo" />
          </NavLink>
        </div>

        <input
          type="checkbox"
          id="check"
          className={styles.Checkbox}
          checked={menuOpen}
          onChange={toggleMenu}
        />
        <label htmlFor="check" className={styles.Checkbtn}>
          <FaBars />
        </label>

        <ul className={`${styles.navLinks} ${menuOpen ? styles.show : ""}`}>
          {menuOpen && (
            <button
              className={styles.closeBtn}
              onClick={() => setMenuOpen(false)}
            >
              <FaTimes />
            </button>
          )}

          <div className={styles.nav}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                Ana Səhifə
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/companies"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                Şirkətlər
              </NavLink>
            </li>

            <li
              ref={dropdownRef}
              className={`${styles.dropdown} ${
                isDropdownOpen ? styles.open : ""
              }`}
            >
              <span onClick={handleDropdownToggle}>Layihələr ▾</span>
              {isDropdownOpen && (
                <div className={styles.dropdownBox}>
                  <NavLink
                    to="/tomorrow"
                    onClick={() => {
                      handleCloseDropdown();
                      setMenuOpen(false);
                    }}
                  >
                    The power of tomorrow
                  </NavLink>
                  <NavLink
                    to="/zerif"
                    onClick={() => {
                      handleCloseDropdown();
                      setMenuOpen(false);
                    }}
                  >
                    Zərif Mühəndislər
                  </NavLink>
                </div>
              )}
            </li>

            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                Profil
              </NavLink>
            </li>

            <li className={styles.languageItem}>
              <select onChange={handleLanguageChange} value={i18n.language}>
                <option value="az">AZ</option>
                <option value="en">EN</option>
                <option value="ru">RU</option>
              </select>
            </li>
          </div>

          <div className={styles.NavButtons}>
            <NavLink
              to="/signin"
              className={styles.Signin}
              onClick={() => setMenuOpen(false)}
            >
              <FaSignInAlt className={styles.icon} />
              {t("Daxil ol")}
            </NavLink>
            <NavLink
              to="/signup"
              className={styles.Signup}
              onClick={() => setMenuOpen(false)}
            >
              <FaUserPlus className={styles.icon} />
              {t("Qeydiyyat")}
            </NavLink>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
