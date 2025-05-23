import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSignInAlt, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null); // New ref

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

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  // Close dropdown when clicking outside
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav className={styles.Navbar}>
      <div className={styles.NavbarContainer}>
        <div className={styles.Logo}>
          <Link to="/">
            <img src="/src/assets/Logo.png" alt="Logo" />
          </Link>
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

        <ul className={`${styles.navLinks} ${menuOpen ? styles.show : ''}`}>
          {menuOpen && (
            <button className={styles.closeBtn} onClick={() => setMenuOpen(false)}>
              <FaTimes />
            </button>
          )}

          <div className={styles.nav}>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Ana Səhifə</Link></li>
            <li><Link to="/companies" onClick={() => setMenuOpen(false)}>Şirkətlər</Link></li>

            {/* Dropdown with ref */}
            <li
              ref={dropdownRef}
              className={`${styles.dropdown} ${isDropdownOpen ? styles.open : ''}`}
            >
              <span onClick={handleDropdownToggle}>
                Layihələr ▾
              </span>
              {isDropdownOpen && (
                <div className={styles.dropdownBox}>
                  <Link to="/tomorrow" onClick={() => { handleCloseDropdown(); setMenuOpen(false); }}>
                    The power of tomorrow
                  </Link>
                  <Link to="/zerif" onClick={() => { handleCloseDropdown(); setMenuOpen(false); }}>
                    Zərif Mühəndislər
                  </Link>
                </div>
              )}
            </li>

            <li><Link to="/profile" onClick={() => setMenuOpen(false)}>Profil</Link></li>

            {/* Language Selector */}
            <li className={styles.languageItem}>
              <select onChange={handleLanguageChange} value={i18n.language}>
                <option value="az">AZ</option>
                <option value="en">EN</option>
                <option value="ru">RU</option>
              </select>
            </li>
          </div>

          {/* Sign-in and Sign-up buttons */}
          <div className={styles.NavButtons}>
            <Link to="/signin" className={styles.Signin} onClick={() => setMenuOpen(false)}>
              <FaSignInAlt className={styles.icon} />
              {t('Daxil ol')}
            </Link>
            <Link to="/signup" className={styles.Signup} onClick={() => setMenuOpen(false)}>
              <FaUserPlus className={styles.icon} />
              {t('Qeydiyyat')}
            </Link>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
