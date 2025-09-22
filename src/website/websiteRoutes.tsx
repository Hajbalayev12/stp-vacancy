import { Routes, Route } from "react-router-dom";
import WebsiteLayout from "../layouts/WebsiteLayout/WebsiteLayout";

import Home from "./pages/Home/Home";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Companies from "./pages/Companies/Companies";
import Company from "./pages/Company/Company";
import Profile from "./pages/Profile/Profile";
import Vacancy from "./pages/Vacancy/Vacancy";
import Tomorrow from "./pages/Tomorrow/Tomorrow";
import Zerif from "./pages/Zerif/Zerif";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

const WebsiteRoutes = () => {
  return (
    <Routes>
      {/* Pages without layout */}
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword" element={<ResetPassword />} />

      {/* Pages with WebsiteLayout */}
      <Route path="/" element={<WebsiteLayout />}>
        <Route index element={<Home />} />
        <Route path="companies" element={<Companies />} />
        <Route path="company/:id" element={<Company />} />
        <Route path="profile" element={<Profile />} />
        <Route path="vacancy/:id" element={<Vacancy />} />
        <Route path="tomorrow" element={<Tomorrow />} />
        <Route path="zerif" element={<Zerif />} />
      </Route>
    </Routes>
  );
};

export default WebsiteRoutes;
