import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import Home from "./pages/Home/Home";
import SignIn from "./pages/Signin/Signin";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<SignIn />} />
      <Route path="/admin/home" element={<AdminLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}
