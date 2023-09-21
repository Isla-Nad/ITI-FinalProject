import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import Clinics from "./Pages/clinics/Clinics";
import Home from "./Pages/Home/Home";
import Posts from "./Pages/community/Posts";
import ClinicDetail from "./Pages/Clinic_Detail/Clinic_Detail";
import Login from "./pages/login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/clinics" element={<Clinics />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/clinics/:id" element={<ClinicDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
