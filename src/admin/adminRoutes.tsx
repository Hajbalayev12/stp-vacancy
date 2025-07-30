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
import UsersPage from "./pages/Users/Users";
import AddFormOptions from "./pages/AddFormOptions/AddFormOptions";
import ViewFormOptions from "./pages/ViewFormOptions/ViewFormOptions";

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
        <Route path="viewformoptions" element={<ViewFormOptions />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="addformoptions" element={<AddFormOptions />} />
        <Route path="companyinfo/:id" element={<CompanyInfo />} />
        <Route path="vacancyinfo/:vacancyId" element={<VacancyInfo />} />
      </Route>
    </Routes>
  );
}
