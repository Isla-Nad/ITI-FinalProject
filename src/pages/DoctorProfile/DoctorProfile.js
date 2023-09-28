import CommentanRating from "./CommentandRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserNurse } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import { faBriefcaseMedical } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./DoctorProfile.css";

function DentistProfile() {
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
            <div data-bs-spy="scroll" data-bs-target="#sidebar-nav-1" data-bs-smooth-scroll="true" className="scrollspy-example" tabindex="0">
              <div id="profile">
                <h2 className="text-primary">My Profile</h2>
                <hr />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pellentesque turpis eu molestie molestie. Integer tristique quam facilisis urna sagittis pulvinar. Nunc lacinia faucibus nisl, vel sodales elit lobortis nec. Vivamus et odio vel justo dignissim semper. Integer sit amet vehicula est, pellentesque elementum ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a felis eros. Nunc ultricies odio a urna pharetra molestie. Duis vitae arcu nulla. Morbi
                  rhoncus felis non tellus mollis, vel porttitor ante tincidunt. Sed vulputate volutpat fringilla. Sed varius, magna id eleifend rutrum, velit odio sagittis leo, sit amet egestas orci dui vel ex. Phasellus dapibus tempor orci eget semper. Mauris tincidunt dolor nec ipsum eleifend ullamcorper. Donec sed commodo lorem. Vestibulum finibus quam quis urna venenatis pharetra. Ut suscipit velit sit amet turpis convallis consectetur. Praesent tristique vulputate venenatis. Nam vehicula
                  laoreet elit, eget lacinia sapien dignissim non. Nullam in egestas tortor. Vestibulum sit amet elit bibendum odio congue fermentum. Sed volutpat ultricies magna, facilisis pharetra sapien luctus id. In id maximus nibh. Morbi pulvinar sodales urna, et posuere est vulputate ac. Suspendisse facilisis, lacus non placerat mollis, lectus nisi condimentum mi, imperdiet ultrices mi risus vel sapien. Donec sed ligula non massa congue malesuada.
                </p>
              </div>
              <div id="About" className="mt-5">
                <h2 className="text-primary">About The Dentist</h2>
                <hr />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pellentesque turpis eu molestie molestie. Integer tristique quam facilisis urna sagittis pulvinar. Nunc lacinia faucibus nisl, vel sodales elit lobortis nec. Vivamus et odio vel justo dignissim semper. Integer sit amet vehicula est, pellentesque elementum ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a felis eros. Nunc ultricies odio a urna pharetra molestie. Duis vitae arcu nulla. Morbi
                  rhoncus felis non tellus mollis, vel porttitor ante tincidunt. Sed vulputate volutpat fringilla. Sed varius, magna id eleifend rutrum, velit odio sagittis leo, sit amet egestas orci dui vel ex. Phasellus dapibus tempor orci eget semper. Mauris tincidunt dolor nec ipsum eleifend ullamcorper. Donec sed commodo lorem. Vestibulum finibus quam quis urna venenatis pharetra. Ut suscipit velit sit amet turpis convallis consectetur. Praesent tristique vulputate venenatis. Nam vehicula
                  laoreet elit, eget lacinia sapien dignissim non. Nullam in egestas tortor. Vestibulum sit amet elit bibendum odio congue fermentum. Sed volutpat ultricies magna, facilisis pharetra sapien luctus id. In id maximus nibh. Morbi pulvinar sodales urna, et posuere est vulputate ac. Suspendisse facilisis, lacus non placerat mollis, lectus nisi condimentum mi, imperdiet ultrices mi risus vel sapien. Donec sed ligula non massa congue malesuada.
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pellentesque turpis eu molestie molestie. Integer tristique quam facilisis urna sagittis pulvinar. Nunc lacinia faucibus nisl, vel sodales elit lobortis nec. Vivamus et odio vel justo dignissim semper. Integer sit amet vehicula est, pellentesque elementum ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a felis eros. Nunc ultricies odio a urna pharetra molestie. Duis vitae arcu nulla. Morbi
                  rhoncus felis non tellus mollis, vel porttitor ante tincidunt. Sed vulputate volutpat fringilla. Sed varius, magna id eleifend rutrum, velit odio sagittis leo, sit amet egestas orci dui vel ex. Phasellus dapibus tempor orci eget semper. Mauris tincidunt dolor nec ipsum eleifend ullamcorper. Donec sed commodo lorem. Vestibulum finibus quam quis urna venenatis pharetra. Ut suscipit velit sit amet turpis convallis consectetur. Praesent tristique vulputate venenatis. Nam vehicula
                  laoreet elit, eget lacinia sapien dignissim non. Nullam in egestas tortor. Vestibulum sit amet elit bibendum odio congue fermentum. Sed volutpat ultricies magna, facilisis pharetra sapien luctus id. In id maximus nibh. Morbi pulvinar sodales urna, et posuere est vulputate ac. Suspendisse facilisis, lacus non placerat mollis, lectus nisi condimentum mi, imperdiet ultrices mi risus vel sapien. Donec sed ligula non massa congue malesuada.
                </p>
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
