import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Clinics from "./pages/clinics/Clinics";
import Posts from "./pages/community/Posts";
import ClinicDetail from "./pages/clinics/ClinicDetail";
import Home from "./pages/home/Home";
import MedicalHistory from "./pages/medicalHistory/MedicalHistory";
import ContactUs from "./pages/contactUs/contact";
import Profile from "./pages/Profile/Profile";
import DoctorSearch from "./pages/search/DoctorSearch";
import PageNotFound  from "./pages/errors/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/clinics" element={<Clinics />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/clinics/clinicDetails/:id" element={<ClinicDetail />} />
        <Route path="/medicalHistory" element={<MedicalHistory />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/doctor/search" element={<DoctorSearch />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
