import emailjs from "@emailjs/browser";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserNurse, faAddressCard, faCertificate, faBriefcaseMedical, faPhone, faBookMedical, faStar, faPen } from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppointmentPicker from "./AppointmentPicker";
import CommentsAndRating from "./CommentsAndRating";
import { Button, Card, Container, Form, Image, ListGroup, ListGroupItem, Modal, NavLink, Offcanvas } from "react-bootstrap";
import { FaTrash, FaUser } from "react-icons/fa";
import { BiMessageSquareAdd } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setSignal } from "../../store/actions/Signal";
import ToastCom from "../../components/ToastCom";
import ConfirmationModal from "../../components/ConfirmationModal";
import translations from "./translations.json";

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
  const [bookedAppointmentsDoctor, setBookedAppointmentsDoctor] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [showAccept, setShowAccept] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedAppointments, setSelectedAppointments] = useState(null);
  const [clinics, setClinics] = useState([]);
  const language = useSelector((state) => state.lang);
  const navigate = useNavigate();

  const translate = (key) => {
    return translations[language][key];
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/clinics/")
      .then((response) => {
        setClinics(response.data.clinics);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/accounts/profile/" + id)
      .then((res) => {
        setProfileData(res.data);
        console.log(res.data);
        setFormData(res.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("*");
      });
  }, [signal]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/accounts/profile/case/" + id)
      .then((response) => {
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
        setBookedAppointments([...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [signal]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/appointments/booked/doctor/" + id)
      .then((response) => {
        setBookedAppointmentsDoctor([...response.data]);
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
        console.log(error.response.data.certificate[0]);
        setErrorMessage(error.response.data.certificate[0]);
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
        setErrorMessage(error.response.data.case[0]);
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
        {
          setShowPic(false);
          setErrorMessage("");
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.profile_picture[0]);
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
        setShowToast(true);
        if (error.response.data.phone) {
          setErrorMessage("Phone: " + error.response.data.phone);
        }
        if (error.response.data.first_name) {
          setErrorMessage("First Name: " + error.response.data.first_name);
        }
        if (error.response.data.last_name) {
          setErrorMessage("Last Name: " + error.response.data.last_name);
        }
        console.log(error);
      });
  };

  const sendEmail = (from_name, to_name, message, to_email) => {
    emailjs
      .send(
        "service_nnndbzw",
        "template_ce1tb5j",
        {
          from_name,
          to_name,
          message,
          to_email,
        },
        "lTiqoZrmC_6pX8eLV"
      )
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const acceptAppointment = () => {
    axios
      .put(
        "http://127.0.0.1:8000/appointments/book/accept/" + selectedAppointment.id,
        { ...selectedAppointment, is_accepted: true },
        {
          headers: {
            Authorization: "Bearer " + String(authTokens.access),
          },
        }
      )
      .then((response) => {
        console.log("book", response.data);
        dispatch(setSignal(!signal));
        setShowAccept(false);
        sendEmail(currentUser.first_name, selectedAppointments.patient.first_name, `hello ${selectedAppointments.patient.first_name}. Dr. ${currentUser.first_name} accepted your booked appointment on ${selectedAppointment.appointment_date} from ${selectedAppointment.start_time} to ${selectedAppointment.end_time}`, "islamnady95@gmail.com");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rejectAppointment = () => {
    axios
      .put(
        "http://127.0.0.1:8000/appointments/book/reject/" + selectedAppointment.id,
        { ...selectedAppointment, is_booked: false, patient: null },
        {
          headers: {
            Authorization: "Bearer " + String(authTokens.access),
          },
        }
      )
      .then((response) => {
        console.log("book", response.data);
        dispatch(setSignal(!signal));
        setShowReject(false);
        sendEmail(currentUser.first_name, selectedAppointments.patient.first_name, `hello ${selectedAppointments.patient.first_name}. Dr. ${currentUser.first_name} rejected your booked appointment on ${selectedAppointment.appointment_date} from ${selectedAppointment.start_time} to ${selectedAppointment.end_time}`, "islamnady95@gmail.com");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ flex: "1 0 auto" }} dir={language === "ar" ? "rtl" : ""}>
      <div className="container">
        <div className="row">
          <div id="sidebar--container">
            <Modal
              centered
              show={showPic}
              onHide={() => {
                setShowPic(false);
                setErrorMessage("");
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title>{translate("addPicture")}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Control type="file" name="profile_picture" onChange={handlePicChange} />
                <p className="text-danger">{errorMessage}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowPic(false);
                    setErrorMessage("");
                  }}
                >
                  {translate("close")}
                </Button>
                <Button type="submit" variant="primary" onClick={editPic}>
                  {translate("saveChanges")}
                </Button>
              </Modal.Footer>
            </Modal>

            <Container className="profile-picture-container">
              {profileData.profile_picture ? (
                <Image src={`http://localhost:8000${profileData.profile_picture}`} alt="" className="profile-picture" />
              ) : (
                <div className="user--icon">
                  <FaUser />
                </div>
              )}
              {currentUser && profileData.id === currentUser.id && (
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
            <ul className="list-group mb-4 p-0" id="sidebar-nav-1">
              <li className="list-group-item list-group-item-primary sidebar--list">
                <a className="nav-link ms-3 my-1 " href="#profile">
                  <FontAwesomeIcon icon={faUserNurse} size="2xl" />
                  <span className="ms-4 sidebar--text">{translate("profile")}</span>
                </a>
              </li>
              <li className="list-group-item list-group-item-primary sidebar--list">
                <a className="nav-link ms-3 my-1 " href="#About">
                  <FontAwesomeIcon icon={faAddressCard} size="2xl" />
                  <span className="ms-4 sidebar--text">{translate("biography")}</span>
                </a>
              </li>
              <li className="list-group-item list-group-item-primary sidebar--list">
                <a className="nav-link ms-3 my-1 " href="#Contacts">
                  <FontAwesomeIcon icon={faPhone} size="2xl" />
                  <span className="ms-4 sidebar--text">{translate("contacts")}</span>
                </a>
              </li>
              {profileData.is_doctor && (
                <>
                  <li className="list-group-item list-group-item-primary sidebar--list">
                    <a className="nav-link ms-3 my-1 " href="#Certificates">
                      <FontAwesomeIcon icon={faCertificate} size="2xl" />
                      <span className="ms-4 sidebar--text">{translate("certificates")}</span>
                    </a>
                  </li>
                  <li className="list-group-item list-group-item-primary sidebar--list">
                    <a className="nav-link ms-3 my-1 " href="#Cases">
                      <FontAwesomeIcon icon={faBriefcaseMedical} size="2xl" />
                      <span className="ms-4 sidebar--text">{translate("cases")}</span>
                    </a>
                  </li>

                  <li className="list-group-item list-group-item-primary sidebar--list">
                    <a className="nav-link ms-3 my-1 " href="#Appointments">
                      <FontAwesomeIcon icon={faBookMedical} size="2xl" />
                      <span className="ms-4 sidebar--text">{translate("appointments")}</span>
                    </a>
                  </li>
                  <li className="list-group-item list-group-item-primary sidebar--list">
                    <a className="nav-link ms-3 my-1 " href="#Rate">
                      <FontAwesomeIcon icon={faStar} size="2xl" />
                      <span className="ms-4 sidebar--text">{translate("reviews")}</span>
                    </a>
                  </li>
                </>
              )}
              {profileData.is_doctor === false && (
                <>
                  <li className="list-group-item list-group-item-primary sidebar--list">
                    <a className="nav-link ms-3 my-1 " href="#Rate">
                      <FontAwesomeIcon icon={faBookMedical} size="2xl" />
                      <span className="ms-4 sidebar--text">{translate("bookedAppointments")}</span>
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div id={`${language === "ar" ? "profile--container--ar" : "profile--container"}`}>
            <div data-bs-spy="scroll" data-bs-target="#sidebar-nav-1" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
              <div id="profile">
                <div className=" d-flex justify-content-between align-items-center ">
                  <h2 className="profile--header" style={{ fontSize: "4rem" }}>
                    {profileData.first_name} {profileData.last_name}
                  </h2>
                  {currentUser && profileData.id === currentUser.id && (
                    <Button className=" border-0 " variant="outline-primary" onClick={() => setShowModal(true)}>
                      <FontAwesomeIcon icon={faPen} size="lg" />
                    </Button>
                  )}
                </div>
                <hr />
                <p>{profileData.info}</p>
                {profileData.is_doctor && <p>{translate("clinic")}:</p>}

                {profileData.clinic_data ? (
                  <Link className="badge bg-primary text-wrap link-underline " to={`/clinics/clinicDetails/${profileData.clinic}`}>
                    {profileData.clinic_data.name}
                  </Link>
                ) : (
                  <p>{translate("noClinicData")}</p>
                )}
              </div>
              <div id="About" className="mt-5">
                <h2 className="profile--header">{translate("biography")}</h2>
                <hr />
                <p>{profileData.bio}</p>
              </div>
              <div id="Contacts" className="mt-5">
                <h2 className="profile--header">{translate("contacts")}</h2>
                <hr />
                <p>
                  {profileData.contact}
                  {/* <FontAwesomeIcon icon={faWhatsapp} size="2xl" /> */}
                  {/* <FontAwesomeIcon icon={faFacebook} size="2xl" /> */}
                  {/* <FontAwesomeIcon icon={faInstagram} size="2xl" /> */}
                </p>
                <span className=" text-danger-emphasis ">{translate("phone")}:</span>
                <span> {profileData.phone}</span>
              </div>
              {profileData.is_doctor && (
                <>
                  <div id="Certificates" className="mt-5">
                    <div className=" d-flex justify-content-between align-items-center ">
                      <h2 className="profile--header">{translate("certificates")}</h2>
                      {currentUser && profileData.id === currentUser.id && (
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
                            {currentUser && profileData.id === currentUser.id && (
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
                        <Modal
                          centered
                          show={showCertificate}
                          onHide={() => {
                            setShowCertificate(false);
                            setErrorMessage("");
                          }}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>{translate("addCertificate")}</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form.Control type="file" name="certificate" onChange={handleCertificateChange} />
                            <p className="text-danger">{errorMessage}</p>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              onClick={() => {
                                setShowCertificate(false);
                                setErrorMessage("");
                              }}
                            >
                              {translate("close")}
                            </Button>
                            <Button type="submit" variant="primary" onClick={addCertificate}>
                              {translate("saveChanges")}
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </div>
                  </div>
                  <div id="Cases" className="mt-5">
                    <div className=" d-flex justify-content-between align-items-center ">
                      <h2 className="profile--header">{translate("cases")}</h2>
                      {currentUser && profileData.id === currentUser.id && (
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
                            {currentUser && profileData.id === currentUser.id && (
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
                        <Modal
                          centered
                          show={showCase}
                          onHide={() => {
                            setShowCase(false);
                            setErrorMessage("");
                          }}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>{translate("addCase")}</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form.Control type="file" name="case" onChange={handleCaseChange} />
                            <p className="text-danger">{errorMessage}</p>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              onClick={() => {
                                setShowCase(false);
                                setErrorMessage("");
                              }}
                            >
                              {translate("close")}
                            </Button>
                            <Button type="submit" variant="primary" onClick={addCase}>
                              {translate("saveChanges")}
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </div>
                  </div>

                  <div id="Appointments" className="mt-5">
                    <h2 className="profile--header" onClick={() => setShowCanvas(true)}>
                      {translate("appointments")}
                    </h2>
                    <hr />
                    <AppointmentPicker profileData={profileData} id={id} doctor={id} />
                  </div>
                  <div id="Rate" className="mt-5">
                    <h2 className="profile--header">{translate("reviews")}</h2>
                    <hr />
                    <CommentsAndRating reviewed_user={id} />
                  </div>
                </>
              )}
              {profileData.is_doctor === false && (
                <div id="booked-appointments" className="mt-5">
                  <h2 className="profile--header">{translate("bookedAppointments")}</h2>
                  <hr />
                  <div className="d-flex gap-2 flex-wrap flex-lg-nowrap">
                    {bookedAppointments.map((appointment, index) => (
                      <Card key={index}>
                        <Card.Body>
                          <Card.Title className="text-center">
                            {translate("appointmentDate")}: <p>{appointment.appointment_date}</p>
                          </Card.Title>
                          <ListGroup>
                            {appointment.appointments.map((app) => (
                              <ListGroup.Item action variant="primary" key={app.id}>
                                <p>
                                  {translate("startTime")}: {app.start_time}
                                </p>
                                <p>
                                  {translate("endTime")}: {app.end_time}
                                </p>
                                <hr />
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        </Card.Body>

                        <Card.Footer>
                          <h4 className="text-center">
                            {translate("doctor")}: {appointment.doctor.first_name} {appointment.doctor.last_name}
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
          <Modal.Title>{translate("editProfile")}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditSubmit} dir={language === "ar" ? "rtl" : ""}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>{translate("info")}</Form.Label>
              <Form.Control type="text" name="info" value={formData.info} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>{translate("bio")}</Form.Label>
              <Form.Control as="textarea" name="bio" value={formData.bio} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>{translate("contacts")}</Form.Label>
              <Form.Control type="text" name="contact" value={formData.contact} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>{translate("firstName")}</Form.Label>
              <Form.Control type="text" name="first_name" value={formData.first_name} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>{translate("lastName")}</Form.Label>
              <Form.Control type="text" name="last_name" value={formData.last_name} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>{translate("phone")}</Form.Label>
              <Form.Control type="text" name="phone" value={formData.phone} onChange={handleEditChange} />
            </Form.Group>
            {profileData.is_doctor && (
              <Form.Group>
                <Form.Label>{translate("clinic")}</Form.Label>
                <Form.Select name="clinic" value={formData.clinic} onChange={handleEditChange}>
                  <option value="" disabled>
                    {translate("selectClinic")}
                  </option>
                  {clinics.map((clinic) => (
                    <option key={clinic.id} value={clinic.id}>
                      {clinic.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}
            <p className="text-danger text-center ">{errorMessage}</p>
          </Modal.Body>
          <Modal.Footer>
            <Form.Control value="Save Changes" type="submit" className="btn btn-outline-dark " />
          </Modal.Footer>
        </Form>
      </Modal>
      {currentUser && currentUser.id === profileData.id && (
        <Offcanvas show={showCanvas} onHide={() => setShowCanvas(false)}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>{translate("bookedAppointments")}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body dir={language === "ar" ? "rtl" : ""}>
            {bookedAppointmentsDoctor.map((appointment, index) => (
              <Card key={index} className=" m-2 ">
                <Card.Body>
                  <Card.Title className="text-center">
                    {translate("appointmentDate")}: <p>{appointment.appointment_date}</p>
                  </Card.Title>
                  <ListGroup>
                    {appointment.appointments.map((app) => (
                      <ListGroup.Item action variant="primary" key={app.id}>
                        <p>
                          {translate("startTime")}: {app.start_time}
                        </p>
                        <p>
                          {translate("endTime")}: {app.end_time}
                        </p>
                        {currentUser && currentUser.id == profileData.id && (
                          <div className="d-flex justify-content-around">
                            <button
                              disabled={app.is_accepted}
                              className="btn btn-danger"
                              onClick={() => {
                                setShowReject(true);
                                setSelectedAppointment(app);
                                setSelectedAppointments(appointment);
                              }}
                            >
                              {translate("reject")}
                            </button>
                            <button
                              disabled={app.is_accepted}
                              className="btn btn-primary"
                              onClick={() => {
                                setShowAccept(true);
                                setSelectedAppointment(app);
                                setSelectedAppointments(appointment);
                              }}
                            >
                              {translate("accept")}
                            </button>
                          </div>
                        )}

                        <hr />
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>

                <Card.Footer>
                  <h4 className="text-center">
                    {translate("patient")}: {appointment.patient.first_name} {appointment.patient.last_name}
                  </h4>
                </Card.Footer>
              </Card>
            ))}
          </Offcanvas.Body>
        </Offcanvas>
      )}

      <Modal show={showReject} onHide={() => setShowReject(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {translate("reject")} {translate("TimeSlot")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <p>
              {translate("from")} <span className="text-warning">{selectedAppointment.start_time}</span> {translate("to")} <span className="text-warning">{selectedAppointment.end_time}</span> {translate("on")} <span className="text-info">{selectedAppointment.appointment_date}</span>.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReject(false)}>
            {translate("close")}
          </Button>
          <Button variant="danger" onClick={rejectAppointment}>
            {translate("reject")}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAccept} onHide={() => setShowAccept(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {translate("accept")} {translate("TimeSlot")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <p>
              {translate("from")} <span className="text-warning">{selectedAppointment.start_time}</span> {translate("to")} <span className="text-warning">{selectedAppointment.end_time}</span> {translate("on")} <span className="text-info">{selectedAppointment.appointment_date}</span>.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAccept(false)}>
            {translate("close")}
          </Button>
          <Button variant="primary" onClick={acceptAppointment}>
            {translate("accept")}
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastCom
        position="top-start"
        className="text-danger"
        delay={3000}
        showToast={showToast}
        onClose={() => {
          setShowToast(false);
          setErrorMessage("");
        }}
        message={<p className="text-danger">{errorMessage}</p>}
      />

      <ConfirmationModal show={showConfirmationCase} onHide={() => setShowConfirmationCase(false)} text={translate("removeConfirmationCase")} onConfirm={removeCase} />
      <ConfirmationModal show={showConfirmationCertificate} onHide={() => setShowConfirmationCertificate(false)} text={translate("removeConfirmationCertificate")} onConfirm={removeCertificate} />
      <ConfirmationModal show={showConfirmationPic} onHide={() => setShowConfirmationPic(false)} text={translate("removeConfirmationPicture")} onConfirm={deletePic} />
    </div>
  );
}

export default Profile;
