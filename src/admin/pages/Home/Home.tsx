import styles from "./Home.module.scss";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", vacancy: 120 },
  { name: "Feb", vacancy: 180 },
  { name: "Mar", vacancy: 150 },
  { name: "Apr", vacancy: 200 },
  { name: "May", vacancy: 170 },
  { name: "Jun", vacancy: 220 },
  { name: "Jul", vacancy: 190 },
];

export default function Home() {
  return (
    <div className={styles.Home}>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>342</h3>
          <span className={styles.label}>Interview Schedules</span>
          <span className={styles.changePositive}>
            <FaArrowUp /> +0.5%
          </span>
        </div>
        <div className={styles.card}>
          <h3>984</h3>
          <span className={styles.label}>Applications</span>
        </div>
        <div className={styles.card}>
          <h3>1,567k</h3>
          <span className={styles.label}>Profiles</span>
          <span className={styles.changeNegative}>
            <FaArrowDown /> -2.0%
          </span>
        </div>
        <div className={styles.card}>
          <h3>437</h3>
          <span className={styles.label}>Unread Messages</span>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.chartCard}>
          <div className={styles.header}>
            <h4>Vacancy Status</h4>
            <div className={styles.filters}>
              <button>Daily</button>
              <button>Weekly</button>
              <button className={styles.active}>Monthly</button>
            </div>
          </div>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={data}
                margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="vacancy"
                  stroke="#6200ee"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <img
              src="/src/admin/assets/WhatsApp Image 2025-06-13 at 12.13.40.jpeg"
              alt="Profile"
              className={styles.avatar}
            />
            <div>
              <h4>Farid Bakarov</h4>
              <p>Front-End Developer</p>
              <span>📍 Azerbaijan ,Baku</span>
            </div>
            <button className={styles.profileBtn}>Profil</button>
          </div>

          <div className={styles.skills}>
            <h5>Skills</h5>
            <div className={styles.skill}>
              <span>React js</span>
              <div className={styles.bar}>
                <div style={{ width: "90%" }} />
              </div>
            </div>
            <div className={styles.skill}>
              <span>Responsive style</span>
              <div className={styles.bar}>
                <div style={{ width: "68%", backgroundColor: "#db50c3" }} />
              </div>
            </div>
            <div className={styles.skill}>
              <span>Design</span>
              <div className={styles.bar}>
                <div style={{ width: "85%", backgroundColor: "#657fff" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.activity}>
        <h4>Activity</h4>
        <ul>
          <li>
            <span
              className={styles.dot}
              style={{ background: "#5b38ff" }}
            ></span>{" "}
            Bubles Studios have 5 available positions for you{" "}
            <span>8min ago</span>
          </li>
          <li>
            <span
              className={styles.dot}
              style={{ background: "#ffb74d" }}
            ></span>{" "}
            Elextra Studios has invited you to interview <span>8min ago</span>
          </li>
          <li>
            <span
              className={styles.dot}
              style={{ background: "#00e676" }}
            ></span>{" "}
            Highspeed Design Team has 2 positions for you <span>10min ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
