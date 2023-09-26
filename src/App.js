import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Clinics from "./pages/clinics/Clinics";
import Home from "./pages/home/Home";
import Posts from "./pages/community/Posts";
import ClinicDetail from "./pages/clinics/ClinicDetail";
import Register from "./pages/Registration/Register";
import Login from "./pages/Login/Login";
import MedicalHistory from "./pages/medicalHistory/MedicalHistory";
import DentistProfile from "./pages/DoctorProfile/Doctor_Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/clinics" element={<Clinics />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/clinics/clinicDetails" element={<ClinicDetail />} />
          <Route path="/medicalHistory" element={<MedicalHistory />} />
          <Route path="/DoctorProfile/Doctor_Profile" element={<DentistProfile/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
