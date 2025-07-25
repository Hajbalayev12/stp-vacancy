import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./Vacancy.module.scss";
import {
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

type Vacancy = {
  id: number;
  position: string;
  experienceRequired: string;
  educationLevel: string;
  major: string;
  language: string;
  skills: string;
  requirements: string;
  responsibilities: string;
  createdDate: string;
  startDate: string;
  endDate: string;
  vacancyStatus: boolean;
  companyDto: {
    companyName: string;
    companyAddress: string;
    companyPhoneNumber: string;
    companyEmail: string;
    companyLogoUrl: string;
    totalEmployees: number;
  };
  employmentType: {
    id: number;
    name: string;
  };
  jobMode: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
};

const VacancyInfo = () => {
  const { id } = useParams();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);

  useEffect(() => {
    fetch(`http://192.168.200.133:8083/api/vacancies/${id}`)
      .then((res) => res.json())
      .then((data) => setVacancy(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!vacancy) return <div>Loading...</div>;

  return (
    <div className={styles.VacancyInfo}>
      <div className={styles.content}>
        {/* Sol tərəf */}
        <div className={styles.left}>
          <div className={styles.headerCard}>
            <div className={styles.logo}>
              <img src={vacancy.companyDto.companyLogoUrl} alt="Company logo" />
            </div>
            <div>
              <h2 className={styles.position}>{vacancy.position}</h2>
              <p className={styles.department}>{vacancy.category.name}</p>
              <p className={styles.meta}>
                <FaMapMarkerAlt /> {vacancy.companyDto.companyName}
              </p>
              <p className={styles.date}>
                Elanın yerləşdirilmə tarixi: {vacancy.createdDate}
              </p>
            </div>
          </div>

          <div className={styles.infoBlock}>
            <h3>Namizədə olan tələblər:</h3>
            <ul>
              {vacancy.requirements.split("\n").map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.infoBlock}>
            <h3>Ümumi vəzifə öhdəlikləri:</h3>
            <ul>
              {vacancy.responsibilities.split("\n").map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* <div className={styles.extraImageSection}>
            <h3>Əlavə Vizual Məlumat</h3>
            <div className={styles.imageRow}>
              <img
                src="src/website/assets/image.png"
                alt="Əlavə Şəkil"
                className={styles.extraImage}
              />
              <img
                src="src/website/assets/NDT.png"
                alt="Əlavə Şəkil"
                className={styles.extraImage}
              />
              <img
                src="src/website/assets/NDT-Technician-Training.jpg"
                alt="Əlavə Şəkil"
                className={styles.extraImage}
              />
            </div>
          </div> */}
        </div>

        {/* Sağ tərəf */}
        <div className={styles.right}>
          <div className={styles.shareWrapper}>
            <div className={styles.shareButton}>
              <span>Paylaş</span>
              <svg
                className={styles.shareIcon}
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M18 8C19.1046 8 20 7.10457 20 6C20 4.89543 19.1046 4 18 4C16.8954 4 16 4.89543 16 6C16 6.17664 16.0232 6.34731 16.0666 6.50927L8.64294 10.9738C8.2525 10.3794 7.63739 10 6.92857 10C5.86399 10 5 10.8954 5 12C5 13.1046 5.86399 14 6.92857 14C7.63739 14 8.2525 13.6206 8.64294 13.0262L16.0666 17.4907C16.0232 17.6527 16 17.8234 16 18C16 19.1046 16.8954 20 18 20C19.1046 20 20 19.1046 20 18C20 16.8954 19.1046 16 18 16C17.2928 16 16.6785 16.3792 16.2879 16.9733L8.85714 12.5L16.2879 8.02672C16.6785 8.62079 17.2928 9 18 9V8Z"
                  fill="white"
                />
              </svg>
            </div>

            <div className={styles.tooltip}>
              <div className={styles.arrow}></div>
              <div className={styles.icons}>
                <a href="https://x.com/" className={styles.twitter}>
                  <FaTwitter />
                </a>
                <a href="https://www.facebook.com/" className={styles.facebook}>
                  <FaFacebookF />
                </a>
                <a href="https://www.linkedin.com/" className={styles.linkedin}>
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.detailsCard}>
            <h4>Vakansiya detalları</h4>
            <ul>
              <li>
                <strong>Məşğulluq növü:</strong> {vacancy.employmentType.name}
              </li>
              <li>
                <strong>Təcrübə tələbi:</strong> {vacancy.experienceRequired}
              </li>
              <li>
                <strong>Təhsil:</strong> {vacancy.educationLevel}
              </li>
              <li>
                <strong>Ixtisas:</strong> {vacancy.major}
              </li>
              <li>
                <strong>Dil biliyi:</strong> {vacancy.language}
              </li>
              <li>
                <strong>Komputer bacarıqları:</strong> {vacancy.skills}
              </li>
            </ul>

            <div className={styles.buttonWrapper}>
              <Link to="/signup" className={styles.link}>
                <button className={styles.applyBtn}>Müraciət Et</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacancyInfo;
