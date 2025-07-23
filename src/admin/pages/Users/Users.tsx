import React from "react";
import styles from "./Users.module.scss";
import { User, Mail, Phone, Calendar } from "lucide-react";
import stpLogo from "../../assets/stpmmc.png";

interface UserType {
  id: number;
  name: string;
  email: string;
  phone: string;
  appliedAt: string;
}

const dummyUsers: UserType[] = [
  {
    id: 1,
    name: "Əli Əliyev",
    email: "ali.aliyev@example.com",
    phone: "+994 50 123 45 67",
    appliedAt: "2025-07-01",
  },
  {
    id: 2,
    name: "Leyla Məmmədova",
    email: "leyla.m@example.com",
    phone: "+994 55 765 43 21",
    appliedAt: "2025-07-02",
  },
  {
    id: 3,
    name: "Orxan Rzayev",
    email: "orxan.rz@example.com",
    phone: "+994 70 987 65 43",
    appliedAt: "2025-07-03",
  },
  {
    id: 4,
    name: "Aygün Abbasova",
    email: "aygun.a@example.com",
    phone: "+994 51 321 45 67",
    appliedAt: "2025-07-03",
  },
  {
    id: 5,
    name: "Nigar Hüseynova",
    email: "nigar.huseynova@example.com",
    phone: "+994 55 999 88 77",
    appliedAt: "2025-06-28",
  },
  {
    id: 6,
    name: "Rəşad Məmmədov",
    email: "rashad.m@example.com",
    phone: "+994 70 123 45 89",
    appliedAt: "2025-07-02",
  },
];

export default function UsersPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Müraciət edənlər</h1>
      <div className={styles.contentArea}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  <User size={18} />
                  Ad Soyad
                </th>
                <th>
                  <Mail size={18} />
                  Email
                </th>
                <th>
                  <Phone size={18} />
                  Telefon
                </th>
                <th>
                  <Calendar size={18} />
                  Tarix
                </th>
                <th>Əməliyyat</th>
              </tr>
            </thead>
            <tbody>
              {dummyUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{new Date(user.appliedAt).toLocaleDateString()}</td>
                  <td>
                    <button className={styles.viewBtn}>Ətraflı bax</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.stpSide}>
          <img src={stpLogo} alt="STP Logo" className={styles.logo} />
          <p className={styles.stpText}>Sumqayıt Texnologiyalar Parkı</p>
        </div>
      </div>
    </div>
  );
}
