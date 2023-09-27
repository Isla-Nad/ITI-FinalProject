import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Clinics from "./pages/clinics/Clinics";
import Posts from "./pages/community/Posts";
import ClinicDetail from "./pages/clinics/ClinicDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/home/Home";



function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/clinics" element={<Clinics />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/clinics/clinicDetails" element={<ClinicDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
