import { useRef, useState } from "react";
import styles from "./Profile.module.scss";
import { FcManager } from "react-icons/fc";
import { TfiEmail } from "react-icons/tfi";
import { FiPhone, FiCamera } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<"vacancies" | "about">(
    "vacancies"
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Rashad Sarkarov",
    email: "Rashadsarkar@gmail.com",
    phone: "+123 456 678 90",
    location: "Baku, Azerbaijan",
    job: "HelpDesk",
  });

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const appliedVacancies = [
    {
      title: "Front-end Developer",
      company: "STP MMC",
      logo: "src/website/assets/stpmmc.png",
    },
    {
      title: "HelpDesk",
      company: "STP MMC",
      logo: "src/website/assets/stpmmc.png",
    },
    {
      title: "HR",
      company: "STP MMC",
      logo: "src/website/assets/stpmmc.png",
    },
  ];

  const savedVacancies = [
    {
      title: "Front-end Developer",
      company: "STP MMC",
      logo: "src/website/assets/stpmmc.png",
    },
    {
      title: "HelpDesk",
      company: "STP MMC",
      logo: "src/website/assets/stpmmc.png",
    },
  ];

  const vacanciesToShow =
    activeTab === "vacancies" ? appliedVacancies : savedVacancies;

  return (
    <div className={styles.Profile}>
      <div className={styles.ProfileCard}>
        <div className={styles.header}>
          <div className={styles.logo} onClick={handleIconClick}>
            <div className={styles.imageWrapper}>
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profil şəkli"
                  className={styles.profilePic}
                />
              ) : (
                <FcManager className={styles.defaultIcon} />
              )}
              <div className={styles.cameraIcon}>
                <FiCamera />
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
          <div>
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.editInput}
                />
                <input
                  type="text"
                  name="job"
                  value={formData.job}
                  onChange={handleInputChange}
                  className={styles.editInput}
                />
                <div className={styles.meta}>
                  <span>
                    <TfiEmail />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={styles.editInput}
                    />
                  </span>
                  <span>
                    <FiPhone />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={styles.editInput}
                    />
                  </span>
                  <span>
                    <IoLocationOutline />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className={styles.editInput}
                    />
                  </span>
                  <button className={styles.editBtn} onClick={handleEditToggle}>
                    Yadda saxla
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1>{formData.name}</h1>
                <p className={styles.sub}>{formData.job}</p>
                <div className={styles.meta}>
                  <span>
                    <TfiEmail /> {formData.email}
                  </span>
                  <span>
                    <FiPhone /> {formData.phone}
                  </span>
                  <span>
                    <IoLocationOutline /> {formData.location}
                  </span>
                  <button className={styles.editBtn} onClick={handleEditToggle}>
                    Profilə düzəliş et
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles.tabs}>
          <span
            className={activeTab === "vacancies" ? styles.active : ""}
            onClick={() => setActiveTab("vacancies")}
          >
            Müraciət olunmuş vakansiyalar
          </span>
          <span
            className={activeTab === "about" ? styles.active : ""}
            onClick={() => setActiveTab("about")}
          >
            Saxlanılmış vakansiyalar
          </span>
        </div>

        <div className={styles.VacancyList}>
          {vacanciesToShow.map((vacancy, index) => (
            <div className={styles.VacancyListItems} key={index}>
              <div className={styles.LogoInfo}>
                <img
                  className={styles.VacancyLogo}
                  src={vacancy.logo}
                  alt={`${vacancy.company} Logo`}
                />
                <div className={styles.VacancyInfo}>
                  <h3>{vacancy.title}</h3>
                  <p>{vacancy.company}</p>
                </div>
              </div>
              <Link to="/vacancy" className={styles.link}>
                <div className={styles.ApplyBtn}>
                  <h4>Ətraflı Bax</h4>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
