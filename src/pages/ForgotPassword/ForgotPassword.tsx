import { useState } from 'react'
import { FaEnvelope, FaUsers, FaClock, FaUserFriends } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styles from './ForgotPassword.module.scss'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim() === '') {
      setError(true)
    } else {
      setError(false)
      console.log('Şifrə sıfırlama emaili göndərildi:', email)
    }
  }

  return (
    <div className={styles.Signin}>
      <div className={styles.SigninLeft}>
      <div className={styles.infoBlock}>
          <FaUsers />
          <div>
            <h3>Professional Mühit</h3>
            <p>Yerli və xarici mütəxəssislərlə birgə çalışma imkanı</p>
          </div>
    </div>
        <div className={styles.infoBlock}>
          <FaClock />
          <div>
            <h3>Əməkdaşlıq</h3>
            <p>
              STP Şirkətlər Qrupunda 2000-dən çox işçi kollektivi ilə yüksək
              komanda ruhunda əməkdaşlıq
            </p>
          </div>
        </div>
        <div className={styles.infoBlock}>
          <FaUserFriends />
          <div>
            <h3>Əlavə təminatlar</h3>
            <p>Gündəlik nəqliyyat, nahar və tibbi siğorta ilə təminat</p>
          </div>
        </div>
      </div>

      <div className={styles.SigninForm}>
      <div className={styles.logoTitle}>
          <img src="src/assets/stpmmc.png" alt="STP MMC Logo" />
          <h1>Şifrəni yeniləyin</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Email adresiniz</label>
          <div className={`${styles.inputGroup} ${error ? styles.errorBorder : ''}`}>
            <FaEnvelope />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError(false)
              }}
              placeholder="info@stp.az"
            />
          </div>
          {error && <span className={styles.errorText}>Bu bölmə doldurulmalıdır</span>}

          <button type="submit">Şifrəni Dəyişin</button>
        </form>

        <div className={styles.signupLink}>
          <p>
            Hesabınız var? <Link to="/signin">Daxil olun</Link>
          </p>
        </div>
      </div>
    </div>
  )
}