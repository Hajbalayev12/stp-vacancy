import styles from "./App.module.scss";
import WebsiteRoutes from "./website/websiteRoutes";
import AdminRoutes from "./admin/adminRoutes";

function App() {
  return (
    <div className={styles.App}>
      <WebsiteRoutes />
      <AdminRoutes />
    </div>
  );
}

export default App;
