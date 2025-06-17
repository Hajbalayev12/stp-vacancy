import { Outlet } from "react-router-dom";
import styles from "./WebsiteLayout.module.scss";
import Navbar from "../../website/components/Navbar/Navbar";
import Footer from "../../website/components/Footer/Footer";

const WebsiteLayout = () => {
  return (
    <div className={styles.WebsiteLayout}>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default WebsiteLayout;
