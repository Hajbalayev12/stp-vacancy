import styles from './Companies.module.scss'
import Navbar from '../../components/Navbar/Navbar'
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';

export default function Companies() {
  return (
    <div className={styles.Companies}>
      <Navbar />
      <div className={styles.CompaniesGrid}>
        <Link to="/company">
          <div className={styles.CompanyItems}>
            <img src="src/assets/stpmmc.png" alt="" />
            <h2>STP MMC</h2>
            <p>Sumqayıt şəh.,Z.Tağıev <br /> qəs.</p>
            <button>Vakansiya sayı: 5</button>
          </div>
        </Link>
        <Link to="/company">
        <div className={styles.CompanyItems}>
          <img src="src\assets\stpcable.png" alt="" />
          <h2>STP GLOBAL CABLE</h2>
          <p>Sumqayıt şəh.,Z.Tağıev <br /> qəs.</p>
          <button>Vakansiya sayı: 5</button>
        </div>
        </Link>
        <Link to="/company">
        <div className={styles.CompanyItems}>
          <img src="src\assets\aluminium.png" alt="" />
          <h2>STP ALUMINIUM</h2>
          <p>Sumqayıt şəh.,Z.Tağıev <br /> qəs.</p>
          <button>Vakansiya sayı: 5</button>
        </div>
        </Link>
        <Link to="/company">
        <div className={styles.CompanyItems}>
          <img src="src\assets\stpah.png" alt="" />
          <h2>STP-AH</h2>
          <p>Sumqayıt şəh.,Z.Tağıev <br /> qəs.</p>
          <button>Vakansiya sayı: 5</button>
        </div>
        </Link>
        <Link to="/company">
        <div className={styles.CompanyItems}>
          <img src="src\assets\stppanel.png" alt="" />
          <h2>ASSAN-STP PANEL</h2>
          <p>Sumqayıt şəh.,Z.Tağıev <br /> qəs.</p>
          <button>Vakansiya sayı: 5</button>
        </div>
        </Link>
        <Link to="/company">
        <div className={styles.CompanyItems}>
          <img src="src\assets\stppolymer.png" alt="" />
          <h2>STP POLYMER</h2>
          <p>Sumqayıt şəh.,Z.Tağıev <br /> qəs.</p>
          <button>Vakansiya sayı: 5</button>
        </div>
        </Link>
        <Link to="/company">
        <div className={styles.CompanyItems}>
          <img src="src\assets\stpmmc.png" alt="" />
          <h2>STP METAL STRUCTURES</h2>
          <p>Sumqayıt şəh.,Z.Tağıev <br /> qəs.</p>
          <button>Vakansiya sayı: 5</button>
        </div>
        </Link>
        <Link to="/company">
        <div className={styles.CompanyItems}>
          <img src="src\assets\socarstp.png" alt="" />
          <h2>SOCAR-STP</h2>
          <p>Sumqayıt şəh.,Z.Tağıev <br /> qəs.</p>
          <button>Vakansiya sayı: 5</button>
        </div>
        </Link>
        <Link to="/company">
        <div className={styles.CompanyItems}>
          <img src="src\assets\stpmmc.png" alt="" />
          <h2>STP-Btech</h2>
          <p>Sumqayıt şəh.,Z.Tağıev <br /> qəs.</p>
          <button>Vakansiya sayı: 5</button>
        </div>
        </Link>
        <Link to="/company">
        <div className={styles.CompanyItems}>
          <img src="src\assets\azroksan.png" alt="" />
          <h2>Azroksan</h2>
          <p>Sumqayıt şəh.,Z.Tağıev <br /> qəs.</p>
          <button>Vakansiya sayı: 5</button>
        </div>
        </Link>
      </div>
      <Footer />
    </div>
  )
}