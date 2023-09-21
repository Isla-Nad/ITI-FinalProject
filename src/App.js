
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Nav from "./components/Nav";
import Clinics from "./pages/clinics/Clinics";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer";
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
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
