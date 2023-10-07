import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";



import CommentanRating from "./CommentandRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserNurse } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import { faBriefcaseMedical } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./DoctorProfile.css";
import { Link, useParams } from "react-router-dom";
import UpdateDoctorProfile from "./update";

function DentistProfile() {
  
  const {id} = useParams();
  const [DentData,setDentData] = useState({})
  useEffect (()=> {
    axios.get("https://api-generator.retool.com/9WmJCF/ddata/"+id)
    .then(res => setDentData(res.data))
    .catch(err => console.log(err))
    

  },[])
  console.log(DentData)

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
                <a className="nav-link ms-3 my-1 text-black" href="#profile">
                  <FontAwesomeIcon icon={faUserNurse} size="2xl" />
                  <span className="ms-4 sidebar--text">Profile</span>
                </a>
              </li>
              <li className="list-group-item list-group-item-primary sidebar--list">
                <a className="nav-link ms-3 my-1 text-black" href="#About">
                  <FontAwesomeIcon icon={faAddressCard} size="2xl" />
                  <span className="ms-4 sidebar--text"> About Dentist</span>
                </a>
              </li>
              <li className="list-group-item list-group-item-primary sidebar--list">
                <a className="nav-link ms-3 my-1 text-black" href="#Certificates">
                  <FontAwesomeIcon icon={faCertificate} size="2xl" />
                  <span className="ms-4 sidebar--text"> Certificates</span>
                </a>
              </li>
              <li className="list-group-item list-group-item-primary sidebar--list">
                <a className="nav-link ms-3 my-1 text-black" href="#Cases">
                  <FontAwesomeIcon icon={faBriefcaseMedical} size="2xl" />
                  <span className="ms-4 sidebar--text">Cases</span>{" "}
                </a>
              </li>
              <li className="list-group-item list-group-item-primary sidebar--list">
                <a className="nav-link ms-3 my-1 text-black" href="#Contacts">
                  <FontAwesomeIcon icon={faPhone} size="2xl" />
                  <span className="ms-4 sidebar--text">Contacts</span>{" "}
                </a>
              </li>
              <li className="list-group-item list-group-item-primary sidebar--list">
                <a className="nav-link ms-3 my-1 text-black" href="#Rate">
                  <FontAwesomeIcon icon={faStar} size="2xl" />
                  <span className="ms-4 sidebar--text"> Ratings & Reviews</span>{" "}
                </a>
              </li>
            </ul>
          </div>
          <div id="profile--container">
            <div data-bs-spy="scroll" data-bs-target="#sidebar-nav-1" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
              <div id="profile">
                <h2 className="text-primary">My Profile</h2>
                <hr />
                <p>
                  First Name : {DentData.FirstName}
                </p>
                <p>
                  {/* Last Name : {DentData[0].LastName} */}
                </p>
                <p>
                   {/* Position : {DentData[0].About} */}
                </p>
              </div>
              <div id="About" className="mt-5">
                <h2 className="text-primary">About The Dentist</h2>
                <hr />
                <p>
                  {/* {DentData[0].Description} */}
                </p>
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
                  {/* {DentData[0].Contacts} */}
                </p>
              </div>
              <div id="Update" className="mt-5">
                <h2 className="text-primary">Edit profile</h2>
                <hr />
                <Link className="btn btn-success" to={`/update/${DentData.id}`} >Update Profile</Link>
              </div>
              <div id="Rate" className="mt-5">
                <h2 className="text-primary">Ratings & Reviews</h2>
                <hr />
                <CommentanRating />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DentistProfile;
