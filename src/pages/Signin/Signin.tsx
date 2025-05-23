import { useState } from 'react'
import {
  FaEnvelope,
  FaLock,
  FaUsers,
  FaClock,
  FaUserFriends,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa'
import { Link } from 'react-router-dom' // Import Link for routing
import styles from './Signin.module.scss'

export default function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: false }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = {
      email: formData.email.trim() === '',
      password: formData.password.trim() === '',
    }

    setErrors(newErrors)

    const hasError = Object.values(newErrors).some((val) => val)
    if (!hasError) {
      console.log('Form submitted:', formData)
    }
  }

  return (
    <div className={styles.Signin}>
      <div className={styles.SigninLeft}>
        <div className={styles.infoBlock}>
          <FaUsers />
          <div>
            <h3>Profesyonal Mühit</h3>
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
          <h1>Daxil olun</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Email adresiniz</label>
          <div
            className={`${styles.inputGroup} ${
              errors.email ? styles.errorBorder : ''
            }`}
          >
            <FaEnvelope />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && (
            <span className={styles.errorText}>Bu bölmə doldurulmalıdır</span>
          )}

          <label>Şifrə</label>
          <div
            className={`${styles.inputGroup} ${
              errors.password ? styles.errorBorder : ''
            }`}
          >
            <FaLock />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <span onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && (
            <span className={styles.errorText}>Bu bölmə doldurulmalıdır</span>
          )}

          <div className={styles.forgotPassword}>
          <Link to="/forgotpassword">Şifrənizi unutmusunuz?</Link>
          </div>

          <button type="submit">Daxil olun</button>
        </form>

        {/* Add the Sign Up link here */}
        <div className={styles.signupLink}>
          <p>Hesabınız yoxdur? <Link to="/signup">Qeydiyyatdan keçin</Link></p>
        </div>
      </div>
    </div>
  )
}
