import styles from "./Navbar.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaSignInAlt, FaUserPlus, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleDropdownToggle = () => setDropdownOpen((prev) => !prev);
  const handleCloseDropdown = () => setDropdownOpen(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.dispatchEvent(new Event("loginStatusChanged")); // notify change
    setMenuOpen(false);
    navigate("/");
  };

  // Lock scroll on mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  // On mount, check login status and listen for updates
  useEffect(() => {
    const savedLogin = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(savedLogin);

    const handleLoginStatusChange = () => {
      const newStatus = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(newStatus);
    };

    window.addEventListener("loginStatusChanged", handleLoginStatusChange);
    return () => {
      window.removeEventListener("loginStatusChanged", handleLoginStatusChange);
    };
  }, []);

  // Close dropdown on outside click
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <nav className={styles.Navbar}>
      <div className={styles.NavbarContainer}>
        {/* Logo */}
        <div className={styles.Logo}>
          <NavLink to="/">
            <img src="/src/website/assets/Logo.png" alt="Logo" />
          </NavLink>
        </div>

        {/* Top-right Auth Buttons (Desktop view) */}

        {/* Main Navigation Links */}
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
        </ul>

        <div className={styles.NavButtons}>
          {!isLoggedIn ? (
            <>
              <NavLink to="/signin" className={styles.Signin}>
                <FaSignInAlt />
                {t("Daxil ol")}
              </NavLink>
              <NavLink to="/signup" className={styles.Signup}>
                <FaUserPlus />
                {t("Qeydiyyat")}
              </NavLink>
            </>
          ) : (
            <button onClick={handleLogout} className={styles.Signout}>
              Çıxış
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
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
      </div>
    </nav>
  );
};

export default Navbar;
