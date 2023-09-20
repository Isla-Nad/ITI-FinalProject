import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./Components/Nav";
import Clinics from "./Pages/clinics/Clinics";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/clinics" element={<Clinics />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
