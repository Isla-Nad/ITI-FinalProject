
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Nav from "./Components/Nav";
import Clinics from "./Pages/clinics/Clinics";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer";


function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clinics" element={<Clinics />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
