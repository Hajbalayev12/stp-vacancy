import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <div className={styles.Footer}>
        <div className={styles.FooterWrapper}>
            <div className={styles.FooterContent}>
              <div className={styles.FooterContent_info}>
                <h1>Baş Ofis</h1>
                <p>H.Z. Tağıyev qəsəbəsi, Sumqayıt,<br />Azərbaycan AZ5022</p>
              </div>
              <div className={styles.FooterContent_info}>
                <h1>Çağrı mərkəzi</h1>
                <p>*0990</p>
              </div>
              <div className={styles.FooterContent_info}>
                <h1>E-mail ünvanı</h1>
                <p>info@stpcareer.com</p>
              </div>
            </div>
            <div className={styles.FooterContent_infoDown}>
              <img src="src/assets/stpmmcwhite.png" />
              <p>2025 © Sumqayıt Texnologiyalar Parkı MMC müəlliflik hüquqları qorunur.</p>
            </div>
          </div>
    </div>
  )
}
