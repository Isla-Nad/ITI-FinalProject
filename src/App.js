import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Clinics from "./pages/clinics/Clinics";
import Posts from "./pages/community/Posts";
import ClinicDetail from "./pages/clinics/ClinicDetail";
<<<<<<< HEAD
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/home/Home";
=======
import Register from "./pages/Registration/Register";
import Login from "./pages/Login/Login";
>>>>>>> e50e45094c3a709b7a2374f8ac5412112ab30e95
import MedicalHistory from "./pages/medicalHistory/MedicalHistory";
import DentistProfile from "./pages/DoctorProfile/DoctorProfile";

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
          <Route path="/DoctorProfile" element={<DentistProfile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
