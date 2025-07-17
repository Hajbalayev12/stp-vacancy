import styles from "./Vacancyinfo.module.scss";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaUsers,
} from "react-icons/fa";

const Vacancyinfo = () => {
  return (
    <div className={styles.container}>
      {/* Header Info */}
      <div className={styles.header}>
        <img
          src="/src/admin/assets/Logo.png"
          alt="STP MMC Logo"
          className={styles.logo}
        />
        <div>
          <h1>STP MMC</h1>
          <p>
            İnnovativ sənaye texnologiyaları üzrə ixtisaslaşmış lider şirkət
          </p>
        </div>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <FaMapMarkerAlt className={styles.icon} />
          <div>
            <h4>Ünvan</h4>
            <p>Sumqayıt şəhəri, Z.Tağıyev qəsəbəsi</p>
          </div>
        </div>
        <div className={styles.infoCard}>
          <FaEnvelope className={styles.icon} />
          <div>
            <h4>E-mail</h4>
            <p>info@stp.az</p>
          </div>
        </div>
        <div className={styles.infoCard}>
          <FaPhoneAlt className={styles.icon} />
          <div>
            <h4>Əlaqə</h4>
            <p>+994 12 123 45 67</p>
          </div>
        </div>
        <div className={styles.infoCard}>
          <FaUsers className={styles.icon} />
          <div>
            <h4>İşçi sayı</h4>
            <p>800+</p>
          </div>
        </div>
      </div>

      {/* Vacancy Section */}
      <div className={styles.vacancyCard}>
        <h2>NDT Technician</h2>
        <p className={styles.subInfo}>
          Xüsusi Sənaye Layihələri Ofisi | STP MMC | Elanın tarixi: 2025-04-15
        </p>

        <div className={styles.section}>
          <h3>Namizədə olan tələblər:</h3>
          <ul>
            <li>Minimum 2 il NDT yoxlamalarında praktiki təcrübə</li>
            <li>AS9100, NADCAP kimi keyfiyyət sistemləri ilə tanışlıq</li>
            <li>
              Texniki sənədlərin ingilis dilində oxunması və şərh edilməsi
              bacarığı
            </li>
            <li>
              Öyrənməyə açıq, detallara diqqətli və analitik düşüncə bacarığı
            </li>
            <li>Səfərlərə və növbəli işə hazır olmaq</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Ümumi vəzifə öhdəlikləri:</h3>
          <ul>
            <li>UT, MT, PT, RT və VT üsulları ilə yoxlamaların aparılması</li>
            <li>
              Yoxlama planlarının və texniki tapşırıqların icrasına riayət etmək
            </li>
            <li>
              Dəqiqliklə və vaxtında uyğunluğun qiymətləndirilməsi və
              hesabatların hazırlanması
            </li>
            <li>NDT avadanlıqlarının periodik yoxlanması və kalibrasiyası</li>
            <li>
              Müştəri tələblərinə və beynəlxalq keyfiyyət sistemlərinə
              uyğunluğun təmin edilməsi
            </li>
          </ul>
        </div>

        <div className={styles.detailsGrid}>
          <div>
            <strong>Məşğulluq növü:</strong> Tam ştat
          </div>
          <div>
            <strong>Təcrübə tələbi:</strong> 1-3 il
          </div>
          <div>
            <strong>Təhsil:</strong> Ali təhsil - Bakalavr
          </div>
          <div>
            <strong>İxtisas:</strong> Müvafiq texniki sahədə bakalavr dərəcəsi
          </div>
          <div>
            <strong>Dil biliyi:</strong> İngilis dili - Orta
          </div>
          <div>
            <strong>Kompüter bacarıqları:</strong> MS Word, MS Excel
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vacancyinfo;
