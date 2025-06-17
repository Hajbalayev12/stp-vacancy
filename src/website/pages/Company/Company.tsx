import { useState } from "react";
import styles from "./Company.module.scss";
import { Link } from "react-router-dom";

interface Vacancy {
  id: number;
  title: string;
  company: string;
}

export default function Company() {
  const [activeTab, setActiveTab] = useState<"vacancies" | "about">(
    "vacancies"
  );

  const vacancies: Vacancy[] = [
    { id: 1, title: "Front-end Developer", company: "STP MMC" },
    { id: 2, title: "HelpDesk", company: "STP MMC" },
    { id: 3, title: "HR", company: "STP MMC" },
    { id: 4, title: "Satınalma", company: "STP MMC" },
    { id: 5, title: "Sistem İnzibatçılığı", company: "STP MMC" },
  ];

  return (
    <div className={styles.Company}>
      <div className={styles.companyCard}>
        <div className={styles.header}>
          <img
            className={styles.logo}
            src="src/website/assets/stpmmc.png"
            alt="Company Logo"
          />
          <div>
            <h1>STP MMC</h1>
            <p className={styles.sub}>Karyeranı Bizimlə Qur!</p>
            <div className={styles.meta}>
              <span>stp.az</span>
              <span>Azərbaycan</span>
              <br />
              <span>İstehsalat / 1500 İşçi</span>
            </div>
          </div>
        </div>

        <div className={styles.tabs}>
          <span
            className={activeTab === "vacancies" ? styles.active : ""}
            onClick={() => setActiveTab("vacancies")}
          >
            Aktiv vakansiyalar
          </span>
          <span
            className={activeTab === "about" ? styles.active : ""}
            onClick={() => setActiveTab("about")}
          >
            Şirkət Haqqında
          </span>
        </div>

        {activeTab === "vacancies" ? (
          <div className={styles.VacancyList}>
            {vacancies.map((vacancy) => (
              <div key={vacancy.id} className={styles.VacancyListItems}>
                <div className={styles.LogoInfo}>
                  <img
                    className={styles.VacancyLogo}
                    src="src/website/assets/stpmmc.png"
                    alt="Vacancy Logo"
                  />
                  <div className={styles.VacancyInfo}>
                    <h3>{vacancy.title}</h3>
                    <p>{vacancy.company}</p>
                  </div>
                </div>
                <Link to="/vacancy" className={styles.Applylink}>
                  <div className={styles.ApplyBtn}>
                    <h4>Müraciət et</h4>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.aboutCompany}>
            <h2>STP MMC haqqında</h2>
            <p>
              STP-Sumqayıt Texnologiyalar Parkı regionda ilk texnopark olmaqla
              yanaşı analoqu olmayan layihədir. 22 dekabr 2009-cu il tarixində
              Azərbaycan Respublikasının prezidenti cənab İlham Əliyev
              tərəfindən Texnoparkın birinci mərhələsi istifadəyə verilmişdir.
              Həmin vaxtdan müəssisə daha da inkişaf etmiş, genişlənmiş və
              30-dan çox yeni istehsal sahələri yaradılmışdır. STP-də əsasən,
              ölkənin neft-qaz, enerji, kənd təsərrüfatı, inşaat sektoru və
              eləcə də digər iqtisadi sahələrdə idxalı azaltmağa yönəldilmiş
              məhsullar istehsal edilir. İstehsalat 50 hektarı qapalı olmaqla
              ümumilikdə 152 hektar ərazini əhatə edir.
            </p>

            <p>
              2020-ci ildə müştəri tələblərinə çevik adaptasiya olunmaq
              məqsədilə şirkətin biznes və təşkilati idarəetmə forması
              dəyişdirilərək şirkətlər qrupuna dəyişdirilib. STP-nin tərkibində
              fəaliyyət göstərən zavod və istehsal sahələri yeni yaradılan
              biznes vahidləri və müştərək şirkətlər olaraq birləşdirilib.
              Hazırda STP-nin nəzarətinə 3 müştərək şirkət, 3 biznes vahidi və 1
              zavod daxildir.
            </p>

            <h3>STP-nin Biznes Vahidləri:</h3>
            <ul>
              <li>STP Global Cable</li>
              <li>STP Alüminium</li>
              <li>STP Polymer</li>
            </ul>

            <h3>STP-nin Müştərək Şirkətləri:</h3>
            <ul>
              <li>SOCAR-STP</li>
              <li>STP AH</li>
              <li>Assan STP Panel</li>
            </ul>

            <h3>STP-nin Zavodları:</h3>
            <ul>
              <li>Qaynaq Quraşdırma Zavodu</li>
              <li>Antikorroziya Örtükləri Zavodu</li>
            </ul>

            <p>
              STP Şirkətlər Qrupu Azərbaycanın daxili bazarının tələbatını tam
              ödəməklə yanaşı, müvafiq məhsulların xarici bazara satışını həyata
              keçirmək gücündədir. STP yalnız bir çox sənaye və
              elektroenergetika sahələri üçün məhsul və mühüm avadanlıqlar
              istehsal edən sənaye mərkəzi deyil, həm də müasir
              texnologiyaların, innovasiyalı mühəndisliyin geniş profilli və
              ekoloji mərkəzidir.
            </p>

            <p>
              Bütün istehsalat sahələri aparıcı dünya istehsalçılarının
              məhsulları olmaqla ən son texnologiyalara əsaslanan avadanlıqlarla
              təchiz olunmuşdur. Yalnız qurğu və avadanlıqlar deyil,
              istehsalatda istifadə edilən xammal da beynəlxalq standartların
              tələblərinə tam cavab verir. Bu səbəbdən də istehsal olunan
              məhsulların keyfiyyəti olduqca yüksəkdir.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
