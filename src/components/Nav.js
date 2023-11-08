import logo from "../icons/logo.png";
import axios from "axios";
import Register from "./Register";
import { Link, useNavigate } from "react-router-dom";
import { Button, Dropdown, FloatingLabel, Form, Overlay, Popover } from "react-bootstrap";
import { FaRegUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { setCurrentUser } from "../store/actions/CurrentUser";
import { useDispatch, useSelector } from "react-redux";
import ToggleTheme from "./ToggleTheme";
import { setSignal } from "../store/actions/Signal";
import ToastCom from "./ToastCom";
import { setSearchQuery } from "../store/actions/SearchQuery";

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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchValue));
    navigate("/doctor/search");
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
            console.log(response.data.user);
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
      <nav className="navbar navbar-expand-lg">
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
                  Community
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/medicalHistory">
                  MedicalHistory
                </Link>
              </li>
            </ul>

            <span className="btn-group fs-2 gap-1 mx-2">
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
                      <Button className="dropdown-item" variant="outline-info" onClick={(e) => setShowRegModal(true)}>
                        New around here? Sign up
                      </Button>
                    </Form>
                  )}
                </Dropdown>
              </div>
            </span>

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
            <form className="d-flex" onSubmit={handleSearchSubmit}>
              <input className="form-control me-2" name="search" placeholder="Search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
              <button className="btn btn-outline-primary" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <ToastCom delay={3000} showToast={showToast} onClose={() => setShowToast(false)} message={errorMessage} className={"text-danger"} />
    </>
  );
}

export default Nav;
