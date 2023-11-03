import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserNurse, faAddressCard, faCertificate, faBriefcaseMedical, faPhone, faBookMedical, faStar, faPen } from "@fortawesome/free-solid-svg-icons";
import "./DoctorProfile.css";
import { Link, useParams } from "react-router-dom";
import AppointmentPicker from "./appointments/AppointmentPicker";
import CommentsAndRating from "./CommentsAndRating";
import { Button, Form, Modal } from "react-bootstrap";

function DentistProfile() {
  const { id } = useParams();
  const [dentData, setDentData] = useState({});
  const [dentProf, setDentProf] = useState({});
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(sessionStorage.getItem("loggedInUser")) || null);
  const authTokens = JSON.parse(localStorage.getItem("authTokens")) || null;
  console.log(authTokens);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/accounts/profile/" + id)
      .then((res) => {
        console.log(res.data);
        setDentData(res.data.user);
        setDentProf(res.data.profile);
      })
      .catch((err) => console.log(err));
  }, []);

  const [formData, setFormData] = useState({
    info: "",
    bio: "",
    contact: "",
    profile_picture: null,
    uploaded_certificates: [],
    uploaded_cases: [],
  });
  const [showModal, setShowModal] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profile_picture: file,
    });
  };
  const handleFileChange2 = (e) => {
    const { name, files } = e.target;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append(name, files[i]);
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: formData,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://127.0.0.1:8000/accounts/profile/edit/", formData, {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setShowModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [showCase, setShowCase] = useState(false);
  const [caseFile, setCaseFile] = useState(null);
  const handleCaseChange = (e) => {
    const file = e.target.files[0];
    setCaseFile(file);
  };
  const addCase = () => {
    axios
      .post("http://127.0.0.1:8000/accounts/profile/case/", caseFile, {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div id="sidebar--container">
            {dentProf.profile_picture ? <img src={`http://localhost:8000${dentProf.profile_picture}`} alt="" width={"100%"} /> : <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" width={"100%"} />}
            <ul className="list-group mb-4" id="sidebar-nav-1">
              <li className="list-group-item list-group-item-primary sidebar--list">
                <a className="nav-link ms-3 my-1 " href="#profile">
                  <FontAwesomeIcon icon={faUserNurse} size="2xl" />
                  <span className="ms-4 sidebar--text">Profile</span>
                </a>
              </li>
              <li className="list-group-item list-group-item-primary sidebar--list">
                <a className="nav-link ms-3 my-1 " href="#About">
                  <FontAwesomeIcon icon={faAddressCard} size="2xl" />
                  <span className="ms-4 sidebar--text">Biography</span>
                </a>
              </li>
              <li className="list-group-item list-group-item-primary sidebar--list">
                <a className="nav-link ms-3 my-1 " href="#Certificates">
                  <FontAwesomeIcon icon={faCertificate} size="2xl" />
                  <span className="ms-4 sidebar--text">Certificates</span>
                </a>
              </li>
              <li className="list-group-item list-group-item-primary sidebar--list">
                <a className="nav-link ms-3 my-1 " href="#Cases">
                  <FontAwesomeIcon icon={faBriefcaseMedical} size="2xl" />
                  <span className="ms-4 sidebar--text">Cases</span>
                </a>
              </li>
              <li className="list-group-item list-group-item-primary sidebar--list">
                <a className="nav-link ms-3 my-1 " href="#Contacts">
                  <FontAwesomeIcon icon={faPhone} size="2xl" />
                  <span className="ms-4 sidebar--text">Contacts</span>
                </a>
              </li>
              <li className="list-group-item list-group-item-primary sidebar--list">
                <a className="nav-link ms-3 my-1 " href="#Appointments">
                  <FontAwesomeIcon icon={faBookMedical} size="2xl" />
                  <span className="ms-4 sidebar--text">Appointments</span>
                </a>
              </li>
              <li className="list-group-item list-group-item-primary sidebar--list">
                <a className="nav-link ms-3 my-1 " href="#Rate">
                  <FontAwesomeIcon icon={faStar} size="2xl" />
                  <span className="ms-4 sidebar--text">Reviews</span>
                </a>
              </li>
            </ul>
          </div>
          <div id="profile--container">
            <div data-bs-spy="scroll" data-bs-target="#sidebar-nav-1" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
              <div id="profile">
                <h2 className="text-primary" style={{ fontSize: "4rem" }}>
                  {dentData.first_name} {dentData.last_name}
                </h2>
                <p>{dentProf.info}</p>
                {
                  <Link className="text-dark" to={`/update/${dentData.id}`}>
                    <FontAwesomeIcon icon={faPen} size="lg" />
                  </Link>
                }
              </div>
              <div id="About" className="mt-5">
                <h2 className="text-primary">Biography</h2>
                <hr />
                <p>{dentProf.bio}</p>
              </div>
              <div id="Certificates" className="mt-5">
                <h2 className="text-primary">Certificates</h2>
                <hr />
                <div className="container">
                  <div className="row">
                    <a href="https://marketplace.canva.com/EAFIEvneNCM/1/0/1600w/canva-golden-elegant-certificate-of-appreciation-0bN-aLORS9U.jpg" target="blank" className="col-lg-3 col-md-6 col-sm-12">
                      <img style={{ width: "100%" }} src="https://marketplace.canva.com/EAFIEvneNCM/1/0/1600w/canva-golden-elegant-certificate-of-appreciation-0bN-aLORS9U.jpg" />
                    </a>
                    <a href="https://marketplace.canva.com/EAFIEvneNCM/1/0/1600w/canva-golden-elegant-certificate-of-appreciation-0bN-aLORS9U.jpg" target="blank" className="col-lg-3 col-md-6 col-sm-12">
                      <img style={{ width: "100%" }} src="https://marketplace.canva.com/EAFIEvneNCM/1/0/1600w/canva-golden-elegant-certificate-of-appreciation-0bN-aLORS9U.jpg" />
                    </a>
                    <a href="https://marketplace.canva.com/EAFIEvneNCM/1/0/1600w/canva-golden-elegant-certificate-of-appreciation-0bN-aLORS9U.jpg" target="blank" className="col-lg-3 col-md-6 col-sm-12">
                      <img style={{ width: "100%" }} src="https://marketplace.canva.com/EAFIEvneNCM/1/0/1600w/canva-golden-elegant-certificate-of-appreciation-0bN-aLORS9U.jpg" />
                    </a>
                    <a href="https://marketplace.canva.com/EAFIEvneNCM/1/0/1600w/canva-golden-elegant-certificate-of-appreciation-0bN-aLORS9U.jpg" target="blank" className="col-lg-3 col-md-6 col-sm-12">
                      <img style={{ width: "100%" }} src="https://marketplace.canva.com/EAFIEvneNCM/1/0/1600w/canva-golden-elegant-certificate-of-appreciation-0bN-aLORS9U.jpg" />
                    </a>
                  </div>
                </div>
              </div>
              <div id="Cases" className="mt-5">
                <h2 className="text-primary">Cases</h2>
                <hr />
                <div className="container">
                  <div className="row">
                    <Button className="btn btn-dark w-25 " onClick={() => setShowCase(true)}>
                      add a case
                    </Button>
                    <Modal show={showCase} onHide={() => setShowCase(false)}>
                      <Form.Control type="file" name="case" onChange={handleCaseChange} />
                      <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowCase(false)}>
                          Close
                        </Button>
                        <Button type="submit" variant="primary" onClick={addCase}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    <a href="https://clinicalmastery.com/wp-content/uploads/2017/12/Copy-of-Pre-op-4-768x644-1.png" target="blank" className="col-lg-3 col-md-6 col-sm-12">
                      <img style={{ width: "100%" }} src="https://clinicalmastery.com/wp-content/uploads/2017/12/Copy-of-Pre-op-4-768x644-1.png" />
                    </a>
                    <a href="https://clinicalmastery.com/wp-content/uploads/2017/12/Copy-of-Pre-op-4-768x644-1.png" target="blank" className="col-lg-3 col-md-6 col-sm-12">
                      <img style={{ width: "100%" }} src="https://clinicalmastery.com/wp-content/uploads/2017/12/Copy-of-Pre-op-4-768x644-1.png" />
                    </a>
                    <a href="https://clinicalmastery.com/wp-content/uploads/2017/12/Copy-of-Pre-op-4-768x644-1.png" target="blank" className="col-lg-3 col-md-6 col-sm-12">
                      <img style={{ width: "100%" }} src="https://clinicalmastery.com/wp-content/uploads/2017/12/Copy-of-Pre-op-4-768x644-1.png" />
                    </a>
                    <a href="https://clinicalmastery.com/wp-content/uploads/2017/12/Copy-of-Pre-op-4-768x644-1.png" target="blank" className="col-lg-3 col-md-6 col-sm-12">
                      <img style={{ width: "100%" }} src="https://clinicalmastery.com/wp-content/uploads/2017/12/Copy-of-Pre-op-4-768x644-1.png" />
                    </a>
                  </div>
                </div>
              </div>
              <div id="Contacts" className="mt-5">
                <h2 className="text-primary">Contacts</h2>
                <hr />
                <p>
                  {dentProf.contact}
                  {/* <FontAwesomeIcon icon={faWhatsapp} size="2xl" /> */}
                  {/* <FontAwesomeIcon icon={faFacebook} size="2xl" /> */}
                  {/* <FontAwesomeIcon icon={faInstagram} size="2xl" /> */}
                </p>
              </div>

              <div id="Appointments" className="mt-5">
                <h2 className="text-primary">Appointments</h2>
                <hr />
                <AppointmentPicker id={id} />
              </div>
              <div id="Rate" className="mt-5">
                <h2 className="text-primary">Ratings & Reviews</h2>
                <hr />
                <CommentsAndRating />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Modal.Body>
            <Form.Group>
              <Form.Label>Info</Form.Label>
              <Form.Control type="text" name="info" value={formData.info} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Bio</Form.Label>
              <Form.Control as="textarea" name="bio" value={formData.bio} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Contact</Form.Label>
              <Form.Control type="text" name="contact" value={formData.contact} onChange={handleInputChange} />
            </Form.Group>
            {/* Add other input fields here */}
            <Form.Group>
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="file" name="profile_picture" onChange={handleFileChange} />
            </Form.Group>
            {/* <Form.Group>
              <Form.Label>Uploaded Certificates</Form.Label>
              <Form.Control type="file" name="uploaded_certificates" multiple onChange={handleFileChange2} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Uploaded Cases</Form.Label>
              <Form.Control type="file" name="uploaded_cases" multiple onChange={handleFileChange2} />
            </Form.Group> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Button className="btn btn-primary" onClick={() => setShowModal(true)}>
        Edit Profile
      </Button>
    </>
  );
}

export default DentistProfile;
