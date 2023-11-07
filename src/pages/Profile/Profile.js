import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserNurse, faAddressCard, faCertificate, faBriefcaseMedical, faPhone, faBookMedical, faStar, faPen } from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";
import { useNavigate, useParams } from "react-router-dom";
import AppointmentPicker from "./appointments/AppointmentPicker";
import CommentsAndRating from "./CommentsAndRating";
import { Button, Card, Container, Form, Image, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import { FaTrash, FaUser } from "react-icons/fa";
import { BiMessageSquareAdd } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setSignal } from "../../store/actions/Signal";
import ToastCom from "../../components/ToastCom";
import ConfirmationModal from "../../components/ConfirmationModal";

function Profile() {
  const authTokens = JSON.parse(localStorage.getItem("authTokens")) || null;
  const currentUser = useSelector((state) => state.user.user);
  const { id } = useParams();
  const [profileData, setProfileData] = useState({});
  const [showConfirmationCase, setShowConfirmationCase] = useState(false);
  const [showConfirmationCertificate, setShowConfirmationCertificate] = useState(false);
  const [showConfirmationPic, setShowConfirmationPic] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showPic, setShowPic] = useState(false);
  const [showCase, setShowCase] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [caseFile, setCaseFile] = useState({});
  const [certificateFile, setCertificateFile] = useState({});
  const [cases, setCases] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [formData, setFormData] = useState({ info: "", bio: "", contact: "", first_name: "", last_name: "", phone: "", clinic: "" });
  const [profilePic, setProfilePic] = useState(null);
  const signal = useSelector((state) => state.signal);
  const dispatch = useDispatch();
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/accounts/profile/" + id)
      .then((res) => {
        console.log(res.data);
        setProfileData(res.data);
        setFormData(res.data);
      })
      .catch((err) => console.log(err));
  }, [signal]);

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
  }, [signal]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/accounts/profile/certificate/" + id)
      .then((response) => {
        console.log(response.data);
        setCertificates([...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [signal]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/appointments/booked/" + id)
      .then((response) => {
        console.log(response.data);
        setBookedAppointments([...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [signal]);

  const handleCaseChange = (e) => {
    const file = e.target.files[0];
    setCaseFile({ case: file, user: profileData.id });
  };

  const handleCertificateChange = (e) => {
    const file = e.target.files[0];
    setCertificateFile({ certificate: file, user: profileData.id });
  };

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic({ profile_picture: file });
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
        dispatch(setSignal(!signal));
        setShowCertificate(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeCertificate = () => {
    axios
      .delete("http://127.0.0.1:8000/accounts/profile/certificate/delete/" + selectedId, {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response) => {
        dispatch(setSignal(!signal));
        setShowConfirmationCertificate(false);
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
        dispatch(setSignal(!signal));
        setShowCase(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeCase = () => {
    axios
      .delete("http://127.0.0.1:8000/accounts/profile/case/delete/" + selectedId, {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response) => {
        dispatch(setSignal(!signal));
        setShowConfirmationCase(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editPic = (e) => {
    e.preventDefault();
    axios
      .put("http://127.0.0.1:8000/accounts/profile/edit/pic/", profilePic, {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        dispatch(setSignal(!signal));
        setShowPic(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletePic = () => {
    axios
      .delete("http://127.0.0.1:8000/accounts/profile/delete/pic/", {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response) => {
        dispatch(setSignal(!signal));
        setShowConfirmationPic(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://127.0.0.1:8000/accounts/profile/edit/", formData, {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response) => {
        dispatch(setSignal(!signal));
        setShowModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ flex: "1 0 auto" }}>
      <div className="container">
        <div className="row">
          <div id="sidebar--container">
            <Modal centered show={showPic} onHide={() => setShowPic(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Add a picture</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Control type="file" name="profile_picture" onChange={handlePicChange} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowPic(false)}>
                  Close
                </Button>
                <Button type="submit" variant="primary" onClick={editPic}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            <Container className="profile-picture-container">
              {profileData.profile_picture ? (
                <Image src={`http://localhost:8000${profileData.profile_picture}`} alt="" className="profile-picture" />
              ) : (
                <div className="user-icon">
                  <FaUser />
                </div>
              )}
              {profileData.id === currentUser.id && (
                <div className="profile-picture-actions d-flex justify-content-between w-100 p-3 ">
                  <div className=" border-0 btn btn-outline-primary" onClick={() => setShowPic(true)}>
                    <BiMessageSquareAdd />
                  </div>
                  <div className=" border-0 btn btn-outline-danger" onClick={() => setShowConfirmationPic(true)}>
                    <FaTrash />
                  </div>
                </div>
              )}
            </Container>
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
                <a className="nav-link ms-3 my-1 " href="#Contacts">
                  <FontAwesomeIcon icon={faPhone} size="2xl" />
                  <span className="ms-4 sidebar--text">Contacts</span>
                </a>
              </li>
              {profileData.is_doctor && (
                <>
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
                </>
              )}
              {profileData.is_doctor === false && (
                <>
                  <li className="list-group-item list-group-item-primary sidebar--list">
                    <a className="nav-link ms-3 my-1 " href="#Rate">
                      <FontAwesomeIcon icon={faBookMedical} size="2xl" />
                      <span className="ms-4 sidebar--text">Booked Appointments</span>
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div id="profile--container">
            <div data-bs-spy="scroll" data-bs-target="#sidebar-nav-1" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
              <div id="profile">
                <div className=" d-flex justify-content-between align-items-center ">
                  <h2 className="text-primary" style={{ fontSize: "4rem" }}>
                    {profileData.first_name} {profileData.last_name}
                  </h2>
                  {profileData.id === currentUser.id && (
                    <Button className=" border-0 " variant="outline-primary" onClick={() => setShowModal(true)}>
                      <FontAwesomeIcon icon={faPen} size="lg" />
                    </Button>
                  )}
                </div>
                <hr />
                <p>{profileData.info}</p>
              </div>
              <div id="About" className="mt-5">
                <h2 className="text-primary">Biography</h2>
                <hr />
                <p>{profileData.bio}</p>
              </div>
              <div id="Contacts" className="mt-5">
                <h2 className="text-primary">Contacts</h2>
                <hr />
                <p>
                  {profileData.contact}
                  {/* <FontAwesomeIcon icon={faWhatsapp} size="2xl" /> */}
                  {/* <FontAwesomeIcon icon={faFacebook} size="2xl" /> */}
                  {/* <FontAwesomeIcon icon={faInstagram} size="2xl" /> */}
                </p>
              </div>
              {profileData.is_doctor && (
                <>
                  <div id="Certificates" className="mt-5">
                    <div className=" d-flex justify-content-between align-items-center ">
                      <h2 className="text-primary">Certificates</h2>
                      {profileData.id === currentUser.id && (
                        <Button className=" border-0 " variant="outline-primary" onClick={() => setShowCertificate(true)}>
                          <BiMessageSquareAdd />
                        </Button>
                      )}
                    </div>

                    <hr />
                    <div className="container">
                      <div className="row">
                        {certificates.map((cer, index) => (
                          <div className="col-4 position-relative " key={index}>
                            {profileData.id === currentUser.id && (
                              <Button
                                className="position-absolute end-0 border-0 "
                                variant="outline-danger"
                                onClick={() => {
                                  setSelectedId(cer.id);
                                  setShowConfirmationCertificate(true);
                                }}
                              >
                                <FaTrash />
                              </Button>
                            )}

                            <img src={`http://localhost:8000${cer.certificate}`} alt="" width="100%" />
                          </div>
                        ))}
                        <Modal centered show={showCertificate} onHide={() => setShowCertificate(false)}>
                          <Modal.Header closeButton>
                            <Modal.Title>Add a Certificate</Modal.Title>
                          </Modal.Header>
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
                      {profileData.id === currentUser.id && (
                        <Button className=" border-0 " variant="outline-primary" onClick={() => setShowCase(true)}>
                          <BiMessageSquareAdd />
                        </Button>
                      )}
                    </div>

                    <hr />
                    <div className="container">
                      <div className="row">
                        {cases.map((cas, index) => (
                          <div className="col-4 position-relative " key={index}>
                            {profileData.id === currentUser.id && (
                              <Button
                                className="position-absolute end-0 border-0 "
                                variant="outline-danger"
                                onClick={() => {
                                  setSelectedId(cas.id);
                                  setShowConfirmationCase(true);
                                }}
                              >
                                <FaTrash />
                              </Button>
                            )}
                            <img src={`http://localhost:8000${cas.case}`} alt="" width="100%" />
                          </div>
                        ))}
                        <Modal centered show={showCase} onHide={() => setShowCase(false)}>
                          <Modal.Header closeButton>
                            <Modal.Title>Add a Case</Modal.Title>
                          </Modal.Header>
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

                  <div id="Appointments" className="mt-5">
                    <h2 className="text-primary">Appointments</h2>
                    <hr />
                    <AppointmentPicker id={id} doctor={id} />
                  </div>
                  <div id="Rate" className="mt-5">
                    <h2 className="text-primary">Ratings & Reviews</h2>
                    <hr />
                    <CommentsAndRating reviewed_user={id} />
                  </div>
                </>
              )}
              {profileData.is_doctor === false && (
                <div id="booked-appointments" className="mt-5">
                  <h2 className="text-primary">Booked Appointments</h2>
                  <hr />
                  <div className="d-flex gap-2 flex-wrap flex-lg-nowrap">
                    {bookedAppointments.map((appointment, index) => (
                      <Card key={index}>
                        <Card.Body>
                          <Card.Title className="text-center">
                            Appointment Date: <p>{appointment.appointment_date}</p>
                          </Card.Title>
                          <ListGroup>
                            {appointment.appointments.map((app) => (
                              <ListGroup.Item action variant="primary" key={app.id}>
                                <p>Start Time: {app.start_time}</p>
                                <p>End Time: {app.end_time}</p>
                                <hr />
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        </Card.Body>

                        <Card.Footer>
                          <h4 className="text-center">
                            Doctor: {appointment.doctor.first_name} {appointment.doctor.last_name}
                          </h4>
                        </Card.Footer>
                      </Card>
                    ))}
                  </div>
                  <hr />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Info</Form.Label>
              <Form.Control type="text" name="info" value={formData.info} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Bio</Form.Label>
              <Form.Control as="textarea" name="bio" value={formData.bio} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Contact</Form.Label>
              <Form.Control type="text" name="contact" value={formData.contact} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="first_name" value={formData.first_name} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="last_name" value={formData.last_name} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" value={formData.phone} onChange={handleEditChange} />
            </Form.Group>
            {profileData.is_doctor && (
              <Form.Group>
                <Form.Label>Clinic</Form.Label>
                <Form.Control type="text" name="clinic" value={formData.clinic} onChange={handleEditChange} />
              </Form.Group>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Form.Control value="Save Changes" type="submit" className="btn btn-outline-dark " />
          </Modal.Footer>
        </Form>
      </Modal>

      <ToastCom delay={3000} showToast={showToast} setShowToast={() => setShowToast(false)} message={errorMessage} />

      <ConfirmationModal show={showConfirmationCase} onHide={() => setShowConfirmationCase(false)} text="Are you sure you want to remove this Case?" onConfirm={removeCase} />
      <ConfirmationModal show={showConfirmationCertificate} onHide={() => setShowConfirmationCertificate(false)} text="Are you sure you want to remove this Case?" onConfirm={removeCertificate} />
      <ConfirmationModal show={showConfirmationPic} onHide={() => setShowConfirmationPic(false)} text="Are you sure you want to remove your profile picture?" onConfirm={deletePic} />
    </div>
  );
}

export default Profile;
