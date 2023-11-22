import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { setSignal } from "../../store/actions/Signal";
import { useDispatch, useSelector } from "react-redux";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp, FaMapMarker } from "react-icons/fa";
import "./Clinics.css";
import translations from "./translations.json";

function ClinicDetail() {
  const [doctors, setDoctors] = useState([]);
  const [clinic, setClinic] = useState({});
  const [cases, setCases] = useState([]);
  const [images, setImages] = useState([]);
  const signal = useSelector((state) => state.signal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const language = useSelector((state) => state.lang);

  const translate = (key) => {
    return translations[language][key];
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/clinics/show/${id}`)
      .then((response) => {
        console.log(response.data);
        setClinic(response.data.clinic);
        setDoctors(response.data.doctors);
        setCases(response.data.cases);
        setImages(response.data.images);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <h1 className=" text-center ">{clinic.name}</h1>
          <div id="carouselExampleCaptions" className="carousel slide">
            <div className="carousel-indicators">
              {images.map((myimage, index) => (
                <button key={index} type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={index} className={index === 0 ? "active" : ""} aria-current={index === 0 ? "true" : undefined} aria-label={`Slide ${index + 1}`}></button>
              ))}
            </div>
            <div className="carousel-inner">
              {images.map((myimage, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                  <img src={`http://127.0.0.1:8000${myimage.image}`} style={{ height: "50rem", width: "100%" }} className="d-block w-100" alt="..." />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>{myimage.desc}</h5>
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <div className=" mt-5">
        <div>
          <h2 className="text-center Icon2-head">{translate("casesHeading")}</h2>
        </div>
        <div className="container">
          <div className="row mt-5">
            {cases.map((mycase, index) => (
              <div key={index} className="card col-4 ms-3">
                <img src={`http://127.0.0.1:8000${mycase.image}`} style={{ height: "15rem" }} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{mycase.title}</h5>
                  <p className="card-text">{mycase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-center Icon2-head">{translate("doctorsSectionHeading")}</h2>

        <Container className="d-flex flex-wrap justify-content-center my-3 gap-2 ">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="col-md-3 col-sm-6 mb-3">
              {doctor.profile_picture ? (
                <Card.Img variant="top" src={`http://localhost:8000${doctor.profile_picture}`} alt="" className="profile-picture p-3 " height={"250px"} />
              ) : (
                <div className="user-icon d-flex justify-content-center align-items-center p-3 h-100">
                  <FaUser />
                </div>
              )}
              <Card.Body>
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    navigate(`/profile/${doctor.id}`);
                    dispatch(setSignal(!signal));
                  }}
                  className="w-100"
                >
                  Dr. {doctor.first_name}
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Container>
      </div>

      <Container className="mt-5">
        <h2 className="text-center Icon2-head">{translate("contactUsHeading")}</h2>

        <Row className="mt-5 text-center">
          <Col md={3} sm={6} xs={12} className="mt-4 animated-col ">
            <a href="#">
              <FaFacebook size={100} color="#3b5998" />
            </a>
          </Col>
          <Col md={3} sm={6} xs={12} className="mt-4 animated-col ">
            <a href="#">
              <FaInstagram size={100} color="#e4405f" />
            </a>
          </Col>
          <Col md={3} sm={6} xs={12} className="mt-4 animated-col ">
            <a href="#">
              <FaLinkedin size={100} color="#0077b5" />
            </a>
          </Col>
          <Col md={3} sm={6} xs={12} className="mt-4 animated-col ">
            <a href="#">
              <FaTwitter size={100} color="#1da1f2" />
            </a>
          </Col>
        </Row>

        <Row className="mt-5 text-center" dir={language === "ar" ? "rtl" : ""}>
          <Col md={6} sm={12} className="mt-4 animated-col ">
            <span>
              <FaWhatsapp size={100} color="#25D366" />
            </span>
            <span style={{ fontSize: "1.3rem" }}>{translate("ourNumber")} : </span>
            <span>{clinic.phone}</span>
          </Col>
          <Col md={6} sm={12} className="mt-4 animated-col ">
            <span>
              <FaMapMarker size={100} color="#4285F4" />
            </span>
            <span style={{ fontSize: "1.3rem" }}>{translate("ourLocation")} : </span>
            <span>{clinic.address}</span>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ClinicDetail;
