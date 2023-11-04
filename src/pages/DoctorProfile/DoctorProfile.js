import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserNurse, faAddressCard, faCertificate, faBriefcaseMedical, faPhone, faBookMedical, faStar, faPen } from "@fortawesome/free-solid-svg-icons";
import "./DoctorProfile.css";
import { Link, useParams } from "react-router-dom";
import AppointmentPicker from "./appointments/AppointmentPicker";
import CommentsAndRating from "./CommentsAndRating";
import { Button, Form, Modal } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { BiMessageSquareAdd } from "react-icons/bi";

function DentistProfile() {
  const authTokens = JSON.parse(localStorage.getItem("authTokens")) || null;
  const { id } = useParams();
  const [dentData, setDentData] = useState({});
  const [dentProf, setDentProf] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showCase, setShowCase] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [caseFile, setCaseFile] = useState({});
  const [certificateFile, setCertificateFile] = useState({});
  const [cases, setCases] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [formData, setFormData] = useState({ info: "", bio: "", contact: "", profile_picture: null });
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

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/accounts/profile/case/" + id)
      .then((response) => {
        console.log(response.data);
        setCases([...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get("http://127.0.0.1:8000/accounts/profile/certificate/" + id)
  //     .then((response) => {
  //       console.log(response.data);
  //       setCertificates([...response.data]);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const handleCaseChange = (e) => {
    const file = e.target.files[0];
    setCaseFile({ case: file, user: dentData.id });
  };

  const handleCertificateChange = (e) => {
    const file = e.target.files[0];
    setCertificateFile({ certificate: file, user: dentData.id });
  };

  const addCertificate = () => {
    axios
      .post("http://127.0.0.1:8000/accounts/profile/certificate/", certificateFile, {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setCertificates([...cases, response.data]);
        setShowCertificate(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeCertificate = (certificate_id) => {
    axios
      .delete("http://127.0.0.1:8000/accounts/profile/certificate/delete/" + certificate_id, {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response) => {
        console.log(response.data);
        const filteredcertificates = certificates.filter((cer) => cer.id !== certificate_id);
        setCertificates(filteredcertificates);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addCase = () => {
    axios
      .post("http://127.0.0.1:8000/accounts/profile/case/", caseFile, {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setCases([...cases, response.data]);
        setShowCase(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeCase = (case_id) => {
    axios
      .delete("http://127.0.0.1:8000/accounts/profile/case/delete/" + case_id, {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response) => {
        console.log(response.data);
        const filteredCase = cases.filter((cas) => cas.id !== case_id);
        setCases(filteredCase);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const fetchExistingData = () => {
    axios
      .get("http://127.0.0.1:8000/accounts/profile/" + id)
      .then((response) => {
        setFormData(response.data.profile);
        setShowModal(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://127.0.0.1:8000/accounts/profile/edit/", formData, {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
          "content-type": "multipart/form-data",
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
                <div className=" d-flex justify-content-between align-items-center ">
                  <h2 className="text-primary">Certificates</h2>
                  <Button className=" border-0 " variant="outline-primary" onClick={() => setShowCertificate(true)}>
                    <BiMessageSquareAdd />
                  </Button>
                </div>

                <hr />
                <div className="container">
                  <div className="row">
                    {certificates.map((cer, index) => (
                      <div className="col-4 position-relative ">
                        <Button className="position-absolute end-0 border-0 " variant="outline-danger" onClick={() => removeCertificate(cer.id)}>
                          <FaTrash />
                        </Button>
                        <img src={`http://localhost:8000${cer.certificate}`} alt="" key={index} width="100%" />
                      </div>
                    ))}
                    <Modal centered show={showCertificate} onHide={() => setShowCertificate(false)}>
                      <Modal.Body>
                        <Form.Control type="file" name="certificate" onChange={handleCertificateChange} />
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowCertificate(false)}>
                          Close
                        </Button>
                        <Button type="submit" variant="primary" onClick={addCertificate}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>
              </div>
              <div id="Cases" className="mt-5">
                <div className=" d-flex justify-content-between align-items-center ">
                  <h2 className="text-primary">Cases</h2>
                  <Button className=" border-0 " variant="outline-primary" onClick={() => setShowCase(true)}>
                    <BiMessageSquareAdd />
                  </Button>
                </div>

                <hr />
                <div className="container">
                  <div className="row">
                    {cases.map((cas, index) => (
                      <div className="col-4 position-relative ">
                        <Button className="position-absolute end-0 border-0 " variant="outline-danger" onClick={() => removeCase(cas.id)}>
                          <FaTrash />
                        </Button>
                        <img src={`http://localhost:8000${cas.case}`} alt="" key={index} width="100%" />
                      </div>
                    ))}
                    <Modal centered show={showCase} onHide={() => setShowCase(false)}>
                      <Modal.Body>
                        <Form.Control type="file" name="case" onChange={handleCaseChange} />
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowCase(false)}>
                          Close
                        </Button>
                        <Button type="submit" variant="primary" onClick={addCase}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
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
        <Form onSubmit={handleSubmit}>
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
            <Form.Group>
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="file" name="profile_picture" onChange={handleFileChange} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Form.Control value="Save Changes" type="submit" className="btn btn-outline-dark " />
          </Modal.Footer>
        </Form>
      </Modal>
      <Button className="btn btn-primary" onClick={() => fetchExistingData()}>
        Edit Profile
      </Button>
    </>
  );
}

export default DentistProfile;
