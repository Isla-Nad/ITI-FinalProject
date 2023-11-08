import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserNurse, faAddressCard, faCertificate, faBriefcaseMedical, faPhone, faBookMedical, faStar, faPen } from "@fortawesome/free-solid-svg-icons";
import "./DoctorProfile.css";
import { Link, useParams } from "react-router-dom";
import AppointmentPicker from "./appointments/AppointmentPicker";
import CommentsAndRating from "./CommentsAndRating";

function DentistProfile() {
  const { id } = useParams();
  const [DentData, setDentData] = useState({});
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(sessionStorage.getItem("loggedInUser")) || null);

  useEffect(() => {
    axios
      .get("https://api-generator.retool.com/9WmJCF/ddata/" + id)
      .then((res) => setDentData(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(DentData);

  // const [Mydentist,setMydentist] = useState()
  // setMydentist(DentData[0])
  // console.log(Mydentist)

  return (
    <>
      <div className="container">
        <div className="row">
          <div id="sidebar--container">
            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" width={"100%"} />
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
                  {DentData.FirstName} {DentData.LastName}
                </h2>
                <p>{DentData.dentPosition}</p>
                {loggedInUser && loggedInUser.id == id && (
                  <Link className="text-dark" to={`/update/${DentData.id}`}>
                    <FontAwesomeIcon icon={faPen} size="lg" />
                  </Link>
                )}
              </div>
              <div id="About" className="mt-5">
                <h2 className="text-primary">Biography</h2>
                <hr />
                <p>{DentData.dentDescription}</p>
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
                  {DentData.Contacts}
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
    </>
  );
}

export default DentistProfile;
