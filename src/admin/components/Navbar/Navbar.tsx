import styles from "./Navbar.module.scss";
import { FaRegCommentDots, FaBell, FaCog, FaMoon } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className={styles.Navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <img src="/src/admin/assets/Logo.png" alt="STP Logo" />
          <div className={styles.logoText}>
            <h1>Sumqayıt Texnologiyalar Parkı</h1>
            <span>Admin Panel</span>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <FaMoon className={styles.icon} />
        <div className={styles.iconBadge}>
          <FaRegCommentDots />
          <span className={styles.badge}>76</span>
        </div>
        <div className={styles.iconBadge}>
          <FaBell />
          <span className={styles.badge}>4</span>
        </div>
        <div className={styles.iconBadge}>
          <FaCog />
          <span className={styles.badge}>15</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
