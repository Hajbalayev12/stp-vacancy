import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import Companies from './pages/Companies/Companies'
import Company from './pages/Company/Company'
import Profile from './pages/Profile/Profile'
import styles from './App.module.scss';
import Vacancy from './pages/Vacancy/Vacancy'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Tomorrow from './pages/Tomorrow/Tomorrow';
import Zerif from './pages/Zerif/Zerif'
function App() {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/company" element={<Company />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/vacancy" element={<Vacancy />} />
        <Route path="/tomorrow" element={<Tomorrow />} />
        <Route path="/zerif" element={<Zerif />} />
      </Routes>
    </div>
  );
}

export default App;
