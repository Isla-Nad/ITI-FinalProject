import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import Clinics from "./Pages/clinics/Clinics";
import Home from "./Pages/Home/Home";
import Posts from "./Pages/community/Posts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clinics" element={<Clinics />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
