import styles from './Vacancy.module.scss';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { GoShareAndroid } from "react-icons/go";
const JobCard = () => {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.content}>
        
        {/* Sol tərəf */}
        <div className={styles.left}>
          <div className={styles.headerCard}>
            <div className={styles.logo}>
              <img src="src/assets/stpmmc.png" alt="Company logo" />
            </div>
            <div>
              <h2 className={styles.position}>NDT Technician</h2>
              <p className={styles.department}>Xüsusi Sənaye Layihələri Ofisi</p>
              <p className={styles.meta}>
                <FaMapMarkerAlt /> STP MMC
              </p>
              <p className={styles.date}>Elanın yerləşdirilmə tarixi: 2025-04-15</p>
            </div>
          </div>

          {/* Aşağı hissələr */}
          <div className={styles.infoBlock}>
            <h3>Namizədə olan tələblər:</h3>
            <ul>
              <li>Minimum 2 years of hands-on experience in NDT inspections</li>
              <li>Familiarity with quality systems such as AS9100, NADCAP</li>
              <li>Proficient in reading and interpreting technical documentation in English</li>
              <li>Open to learning, detail-oriented, and strong analytical thinking skills</li>
              <li>Willing to travel and work in shifts when required</li>
            </ul>
          </div>

          <div className={styles.infoBlock}>
            <h3>Ümumi vəzifə öhdəlikləri:</h3>
            <ul>
              <li>Perform inspections using UT, MT, PT, RT, and VT techniques</li>
              <li>Follow inspection plans, technical work instructions, and procedures</li>
              <li>Ensure accurate and timely conformity assessments and reporting</li>
              <li>Conduct periodic checks and calibration of NDT equipment</li>
              <li>Ensure compliance with customer requirements and international quality systems</li>
            </ul>
          </div>

          {/* Əlavə şəkil */}
          <div className={styles.extraImageSection}>
  <h3>Əlavə Vizual Məlumat</h3>
  <div className={styles.imageRow}>
    <img src="src/assets/stpmmcimage1.png" alt="Əlavə Şəkil" className={styles.extraImage} />
    <img src="src/assets/stpmmcimage2.png" alt="Əlavə Şəkil" className={styles.extraImage} />
    <img src="src/assets/stpmmcimage3.png" alt="Əlavə Şəkil" className={styles.extraImage} />
  </div>
</div>

        </div>

        {/* Sağ tərəf */}
        <div className={styles.right}>
          <div className={styles.shareBtn}> <GoShareAndroid />Paylaş</div>

          <div className={styles.detailsCard}>
            <h4>Vakansiya detalları</h4>
            <ul>
              <li><strong>Məşğulluq növü:</strong> Tam ştat</li>
              <li><strong>Təcrübə tələbi:</strong> 1-3 il</li>
              <li><strong>Təhsil:</strong> Ali təhsil - Bakalavr</li>
              <li><strong>Ixtisas:</strong> Bachelor’s degree in a relevant technical field</li>
              <li><strong>Dil biliyi:</strong> İngilis dili - Orta</li>
              <li><strong>Komputer bacarıqları:</strong> Ms Word  ,Ms Excel</li>
            </ul>
            
            <div className={styles.buttonWrapper}>
              <Link to="/signup" className={styles.link}>
                <button className={styles.applyBtn}>Müraciət Et</button>
              </Link>
            </div>
            
          </div>
        </div>
        
      
      
      </div>
      <Footer />
    </div>
  );
};

export default JobCard;
