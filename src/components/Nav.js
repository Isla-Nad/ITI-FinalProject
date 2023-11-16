import logo from "../icons/logo.png";
import axios from "axios";
import Register from "./Register";
import { Link, useNavigate } from "react-router-dom";
import { Button, Dropdown, FloatingLabel, Form, FormControl, InputGroup, ListGroupItem, Overlay, Popover } from "react-bootstrap";
import { FaBuilding, FaClipboardList, FaHome, FaRegUserCircle, FaSearch, FaStethoscope, FaUsers } from "react-icons/fa";
import { useState, useEffect } from "react";
import { setCurrentUser } from "../store/actions/CurrentUser";
import { useDispatch, useSelector } from "react-redux";
import ToggleTheme from "./ToggleTheme";
import { setSignal } from "../store/actions/Signal";
import ToastCom from "./ToastCom";
import { setSearchQuery } from "../store/actions/SearchQuery";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

function Nav() {
  const currentUser = useSelector((state) => state.user.user);
  const [authTokens, setAuthTokens] = useState(JSON.parse(localStorage.getItem("authTokens")) || null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [regFormData, setRegFormData] = useState({ first_name: "", last_name: "", email: "", password: "", confirm_password: "", phone: "", is_doctor: false, clinic: "" });
  const [logFormData, setLogFormData] = useState({ email: "", password: "" });
  const [showRegModal, setShowRegModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorOverlay, setErrorOverlay] = useState({ show: false, message: "" });
  const [target, setTarget] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const signal = useSelector((state) => state.signal);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchCategory, setSearchCategory] = useState("clinics");
  const [activeLink, setActiveLink] = useState("/");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchValue));
    if (searchCategory === "clinics") {
      navigate("/clinics/search");
    } else {
      navigate("/doctor/search");
    }
  };
  const handlePageChange = (page, type) => {
    setCurrentPage(page);
    setRegFormData({
      ...regFormData,
      is_doctor: type,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegFormData({
      ...regFormData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/accounts/register/", regFormData)
      .then(() => {
        setRegFormData({ first_name: "", last_name: "", email: "", password: "", confirm_password: "", phone: "", is_doctor: false, clinic: "" });
        setShowRegModal(false);
      })
      .catch((error) => {
        setShowToast(true);
        console.error(error);
      });
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
    axios
      .post("http://127.0.0.1:8000/accounts/token/", logFormData)
      .then((response) => {
        setAuthTokens(response.data);
        localStorage.setItem("authTokens", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.detail);
        setErrorOverlay({ show: true, message: "Incorrect email or password." });
        setShowToast(true);
      });
  };

  const handleLogout = () => {
    navigate("/");
    setAuthTokens(null);
    localStorage.removeItem("authTokens");
    dispatch(setCurrentUser(null));
    setLoggedInUser(null);
  };

  useEffect(() => {
    {
      authTokens &&
        axios
          .get("http://127.0.0.1:8000/accounts/user/", {
            headers: {
              Authorization: "Bearer " + String(authTokens.access),
            },
          })
          .then((response) => {
            setLoggedInUser(response.data.user);
            dispatch(setCurrentUser(response.data.user));
          })
          .catch((error) => {
            console.log(error);
          });
    }
  }, [authTokens]);

  // const updateToken = () => {
  //   axios
  //     .post("http://127.0.0.1:8000/api/token/refresh/", { refresh: authTokens.refresh })
  //     .then((response) => {
  //       setAuthTokens(response.data);
  //       localStorage.setItem("authTokens", JSON.stringify(response.data));
  //       setLoggedInUser(jwtDecode(response.data.access));
  //     })
  //     .catch((error) => {
  //       handleLogout();
  //       setLoading(false);
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   if (loading) {
  //     updateToken();
  //   }
  //   const interval = setInterval(() => {
  //     if (authTokens) {
  //       updateToken();
  //     }
  //   }, 1000 * 60 * 4);
  //   return () => clearInterval(interval);
  // }, [authTokens, loading]);

  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="" style={{ width: "100px", height: "50px" }} />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex search-bar" onSubmit={handleSearchSubmit}>
              <InputGroup>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" className="category-toggle">
                    {searchCategory === "clinics" ? "Clinics" : "Doctors"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setSearchCategory("clinics")}>Clinics</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSearchCategory("doctors")}>Doctors</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <FormControl required placeholder="Search for Clinics or Doctors..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="search-input" />
                <Button type="submit" variant="outline-secondary" className="search-button">
                  <FaSearch />
                </Button>
              </InputGroup>
            </form>
            <span className="btn-group fs-2 gap-1 mx-2  ">
              <ToggleTheme />
              <div className="btn-group">
                <FaRegUserCircle className="dropdown-toggle nav-link" data-bs-toggle="dropdown" data-bs-auto-close="outside" />
                <Dropdown className={`dropdown-menu p-4 `} id="user-dropdown">
                  {loggedInUser ? (
                    <>
                      <h3 className="text-center">
                        Hi, {loggedInUser.is_doctor && "Dr."}
                        {loggedInUser.first_name}!
                      </h3>
                      <Form.Control
                        type="button"
                        value="Your profile"
                        className="mt-3 btn btn-outline-info"
                        onClick={() => {
                          navigate(`/profile/${loggedInUser.id}`);
                          dispatch(setSignal(!signal));
                        }}
                      />
                      <Form.Control type="button" value="logout" className="mt-3 btn btn-outline-danger" onClick={handleLogout} />
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
                      <div className="w-100 btn btn-outline-dark adding--button" style={{ cursor: "pointer" }} onClick={(e) => setShowRegModal(true)}>
                        New around here? Sign up
                      </div>
                    </Form>
                  )}
                </Dropdown>
              </div>
            </span>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className={`nav-link text-center ${activeLink === "/" ? "active" : ""}`} onClick={() => setActiveLink("/")}>
                  <FaHome className="me-2" /> <small>Home</small>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contactus" className={`nav-link text-center ${activeLink === "/contactus" ? "active" : ""}`} onClick={() => setActiveLink("/contactus")}>
                  <IoChatboxEllipsesOutline className="me-2" /> <small>Contact Us</small>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/doctor/search" className={`nav-link text-center ${activeLink === "/doctor/search" ? "active" : ""}`} onClick={() => setActiveLink("/doctor/search")}>
                  <FaStethoscope className="me-2" /> <small>Doctors</small>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/clinics" className={`nav-link text-center ${activeLink === "/clinics" ? "active" : ""}`} onClick={() => setActiveLink("/clinics")}>
                  <FaBuilding className="me-2" /> <small>Clinics</small>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/posts" className={`nav-link text-center ${activeLink === "/posts" ? "active" : ""}`} onClick={() => setActiveLink("/posts")}>
                  <FaClipboardList className="me-2" /> <small>Community</small>
                </Link>
              </li>
              {loggedInUser && loggedInUser.is_doctor && (
                <li className="nav-item">
                  <Link to="/medicalHistory" className={`nav-link text-center  ${activeLink === "/medicalHistory" ? "active" : ""}`} onClick={() => setActiveLink("/medicalHistory")}>
                    <FaUsers className="me-2" /> <small>Medical History</small>
                  </Link>
                </li>
              )}
            </ul>
            <Register show={showRegModal} onHide={() => setShowRegModal(false)} handleSubmit={handleSubmit} handleChange={handleChange} formData={regFormData} currentPage={currentPage === 1} handlePageChange={() => handlePageChange(1, false)} currentPage2={currentPage === 2} handlePageChange2={() => handlePageChange(2, true)} onClick={(e) => setTarget(e.target)} />

            {errorOverlay.show && (
              <Overlay show={errorOverlay.show} target={target} placement="bottom" rootClose={true} onHide={() => setErrorOverlay({ show: false, message: "" })}>
                <Popover id="popover-contained">
                  <Popover.Header as="h3" className="text-danger">
                    {errorOverlay.message}
                  </Popover.Header>
                </Popover>
              </Overlay>
            )}
          </div>
        </div>
      </nav>
      <ToastCom delay={3000} showToast={showToast} onClose={() => setShowToast(false)} message={errorMessage} className={"text-danger"} />
    </>
  );
}

export default Nav;
