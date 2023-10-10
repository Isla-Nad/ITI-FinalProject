import logo from "../icons/logo.png";
import axios from "axios";
import Register from "./Register";
import { Link, useNavigate } from "react-router-dom";
import { Button, Dropdown, FloatingLabel, Form, Overlay, Popover } from "react-bootstrap";
import { FaRegUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { getUsers } from "../store/actions/GetUsers";
import { useDispatch, useSelector } from "react-redux";
import "./Nav.css";

function Nav() {
  const users = useSelector((state) => state.users.list);
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(sessionStorage.getItem("loggedInUser")) || null);
  const dispatch = useDispatch();
  const [userType, setUserType] = useState("patient");
  const [regFormData, setRegFormData] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", phone: "", clinic: "" });
  const [logFormData, setLogFormData] = useState({ email: "", password: "" });
  const [showRegModal, setShowRegModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorOverlay, setErrorOverlay] = useState({ show: false, message: "" });
  const [target, setTarget] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setErrorOverlay((prevOverlay) => ({
        ...prevOverlay,
        show: false,
      }));
    }, 3000);
  }, [errorOverlay.show]);

  const handlePageChange = (page, type) => {
    setCurrentPage(page);
    setUserType(type);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegFormData({
      ...regFormData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmailExists = users.some((user) => user.email === regFormData.email);
    if (isEmailExists) {
      setErrorOverlay({ show: true, message: "This email already exists. Please use a different email." });
    } else {
      const updatedRegFormData = {
        ...regFormData,
        type: userType,
      };
      axios
        .post("https://retoolapi.dev/J8jOPq/users", updatedRegFormData)
        .then(() => {
          dispatch(getUsers());
          setRegFormData({ lastName: "", firstName: "", email: "", password: "", confirmPassword: "", phone: "", clinic: "" });
          setShowRegModal(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleLogChange = (e) => {
    const { name, value } = e.target;
    setLogFormData({
      ...logFormData,
      [name]: value,
    });
  };

  const handleLogSubmit = (e) => {
    e.preventDefault();
    const user = users.find((user) => user.email === logFormData.email);
    if (!user) {
      setErrorOverlay({ show: true, message: "User not found. Please check your email." });
    } else if (user.password !== logFormData.password) {
      setErrorOverlay({ show: true, message: "Incorrect password. Please try again." });
    } else {
      sessionStorage.setItem("loggedInUser", JSON.stringify(user));
      setLoggedInUser(user);
      setErrorOverlay({ show: false, message: "" });
      setShowDropdown(false);
      if (user.type === "patient") {
        navigate("/patient");
      } else if (user.type === "doctor") {
        navigate(`/DoctorProfile/${user.id}`);
      }
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    setShowDropdown(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-white">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="" style={{ width: "100px", height: "50px" }} />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contactus">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/clinics">
                  Clinics
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/posts">
                  Posts
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/medicalHistory">
                  MedicalHistory
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="./DoctorProfile">
                  Dentist Details
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="./patient">
                  Patient Details
                </Link>
              </li>
            </ul>

            <div className="btn-group">
              <FaRegUserCircle className={`dropdown-toggle fs-3 m-2 login--btn ${showDropdown ? "show" : ""}`} onClick={() => setShowDropdown(!showDropdown)} aria-expanded={showDropdown} aria-controls="user-dropdown" data-bs-toggle="dropdown" data-bs-auto-close="outside" />
              <Dropdown className={`dropdown-menu p-4 ${showDropdown ? "show" : ""}`} id="user-dropdown" show={showDropdown}>
                {loggedInUser ? (
                  <>
                    <h3 className="text-center">
                      Hi, {loggedInUser.type === "doctor" && "Dr."}
                      {loggedInUser.firstName}!
                    </h3>
                    <Form.Control type="submit" value="logout" className="mt-3 btn btn-outline-danger" onClick={handleLogout} />
                  </>
                ) : (
                  <Form onSubmit={handleLogSubmit} style={{ width: "18rem" }}>
                    <FloatingLabel label="Email address" className="mb-3">
                      <Form.Control type="email" name="email" value={logFormData.email} onChange={handleLogChange} placeholder="..." />
                    </FloatingLabel>

                    <FloatingLabel label="Password">
                      <Form.Control type="password" name="password" value={logFormData.password} onChange={handleLogChange} placeholder="..." />
                    </FloatingLabel>

                    <Form.Control type="submit" value="login" className="mt-3 btn btn-outline-success" onClick={(e) => setTarget(e.target)} />
                    <div className="dropdown-divider"></div>
                    <Button className="dropdown-item" variant="outline-info" onClick={(e) => setShowRegModal(true)}>
                      New around here? Sign up
                    </Button>
                  </Form>
                )}
              </Dropdown>
            </div>

            <Register show={showRegModal} onHide={() => setShowRegModal(false)} handleSubmit={handleSubmit} handleChange={handleChange} formData={regFormData} currentPage={currentPage === 1} handlePageChange={() => handlePageChange(1, "patient")} currentPage2={currentPage === 2} handlePageChange2={() => handlePageChange(2, "doctor")} userType={userType} onClick={(e) => setTarget(e.target)} />

            {errorOverlay.show && (
              <Overlay show={errorOverlay.show} onHide={errorOverlay.show === false} target={target} placement="bottom">
                <Popover id="popover-contained">
                  <Popover.Header as="h3" className="text-danger">
                    {errorOverlay.message}
                  </Popover.Header>
                </Popover>
              </Overlay>
            )}
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-primary" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
