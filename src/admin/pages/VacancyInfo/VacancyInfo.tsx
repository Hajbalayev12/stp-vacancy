import styles from "./Vacancyinfo.module.scss";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaUsers,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  companyDto: {
    companyName: string;
    companyAddress: string;
    companyPhoneNumber: string;
    companyEmail: string;
    companyLogoUrl: string;
    totalEmployees?: number; // <-- added totalEmployees here
  } | null;
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
  createdDate: string;
  startDate: string;
  endDate: string;
  vacancyStatus: boolean;
};

const Vacancyinfo = () => {
  const { vacancyId } = useParams<{ vacancyId: string }>();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        const res = await fetch(
          `http://192.168.200.133:8083/api/vacancies/${vacancyId}`
        );
        if (!res.ok) throw new Error("Failed to fetch vacancy");
        const data: Vacancy = await res.json();
        setVacancy(data);
      } catch (err) {
        setError("Error loading vacancy data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancy();
  }, [vacancyId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!vacancy) return <p>Vacancy not found.</p>;

  return (
    <div className={styles.container}>
      {/* Header Info */}
      <div className={styles.header}>
        {vacancy.companyDto?.companyLogoUrl && (
          <img
            src={vacancy.companyDto.companyLogoUrl}
            alt={`${vacancy.companyDto.companyName} Logo`}
            className={styles.logo}
          />
        )}
        <div>
          <h1>{vacancy.companyDto?.companyName || "Company Name"}</h1>
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
            <p>{vacancy.companyDto?.companyAddress || "—"}</p>
          </div>
        </div>
        <div className={styles.infoCard}>
          <FaEnvelope className={styles.icon} />
          <div>
            <h4>E-mail</h4>
            <p>{vacancy.companyDto?.companyEmail || "—"}</p>
          </div>
        </div>
        <div className={styles.infoCard}>
          <FaPhoneAlt className={styles.icon} />
          <div>
            <h4>Əlaqə</h4>
            <p>{vacancy.companyDto?.companyPhoneNumber || "—"}</p>
          </div>
        </div>
        <div className={styles.infoCard}>
          <FaUsers className={styles.icon} />
          <div>
            <h4>İşçi sayı</h4>
            <p>{vacancy.companyDto?.totalEmployees ?? "—"}+</p>
          </div>
        </div>
      </div>

      {/* Vacancy Section */}
      <div className={styles.vacancyCard}>
        <h2>{vacancy.position}</h2>
        <p className={styles.subInfo}>
          {vacancy.category?.name} | {vacancy.companyDto?.companyName} | Elanın
          tarixi: {new Date(vacancy.createdDate).toLocaleDateString()}
        </p>

        <div className={styles.section}>
          <h3>Namizədə olan tələblər:</h3>
          <ul>
            {vacancy.requirements.split("\n").map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Ümumi vəzifə öhdəlikləri:</h3>
          <ul>
            {vacancy.responsibilities.split("\n").map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
        </div>

        <div className={styles.detailsGrid}>
          <div>
            <strong>Məşğulluq növü:</strong> {vacancy.employmentType.name}
          </div>
          <div>
            <strong>Təcrübə tələbi:</strong> {vacancy.experienceRequired}
          </div>
          <div>
            <strong>Təhsil:</strong> {vacancy.educationLevel}
          </div>
          <div>
            <strong>İxtisas:</strong> {vacancy.major}
          </div>
          <div>
            <strong>Dil biliyi:</strong> {vacancy.language}
          </div>
          <div>
            <strong>Kompüter bacarıqları:</strong> {vacancy.skills}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vacancyinfo;
