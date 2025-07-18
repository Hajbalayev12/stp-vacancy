import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import SignIn from "./pages/Signin/Signin";
import Home from "./pages/Home/Home";
import AddCompany from "./pages/AddCompany/AddCompany";
import ProtectedRoute from "./components/ProtectRoute";
import AddVacancy from "./pages/AddVacancy/AddVacancy";
import ViewVacancies from "./pages/ViewVacancies/ViewVacancies";
import ViewCompanies from "./pages/ViewCompanies/ViewCompanies";
import CompanyInfo from "./pages/CompanyInfo/CompanyInfo";
import VacancyInfo from "../admin/pages/VacancyInfo/VacancyInfo";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<Navigate to="/admin/signin" replace />} />
      <Route path="/admin/signin" element={<SignIn />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="home" element={<Home />} />
        <Route path="addcompany" element={<AddCompany />} />
        <Route path="addvacancy" element={<AddVacancy />} />
        <Route path="viewvacancies" element={<ViewVacancies />} />
        <Route path="viewcompanies" element={<ViewCompanies />} />
        <Route path="companyinfo/:id" element={<CompanyInfo />} />
        <Route path="vacancyinfo" element={<VacancyInfo />} />
      </Route>
    </Routes>
  );
}
