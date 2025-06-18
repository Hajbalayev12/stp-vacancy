import React, { useState } from "react";
import styles from "./AddCompany.module.scss";

export default function AddCompany() {
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");
  const [logo, setLogo] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName || !location || !about || !logo) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("companyName", companyName);
    formData.append("location", location);
    formData.append("about", about);
    formData.append("logo", logo);

    // ✅ Send this to your backend (we'll set it up next if needed)
    console.log("Form submitted");
  };

  return (
    <div className={styles.AddCompany}>
      <h2>Add Company</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Company Logo:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLogo(e.target.files?.[0] || null)}
          />
        </label>

        <label>
          Company Name:
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </label>

        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </label>

        <label>
          About Company:
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
          />
        </label>

        <button type="submit">Add Company</button>
      </form>
    </div>
  );
}
