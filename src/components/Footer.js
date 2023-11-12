import { FaPhoneAlt, FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="text-center text-lg-start mt-5 " style={{ flexShrink: 0 }}>
      <div className="container p-4 pb-0">
        <section>
          <div className="row">
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Information Technology Institute</h6>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem , consectetur adipisicing elit.</p>
            </div>
            <hr className="w-100 clearfix d-md-none" />
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Useful links</h6>
              <p>
                <Link to="/" className="text-decoration-none  text-dark">
                  Home
                </Link>
              </p>
              <p>
                <Link to="/#about" className="text-decoration-none text-dark ">
                  About
                </Link>
              </p>
              <p>
                <a href="/posts" className="text-decoration-none text-dark">
                  Community
                </a>
              </p>
            </div>
            <hr className="w-100 clearfix d-md-none" />
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
              <p>
                <i className="fas fa-home mr-3"></i> Teraat El Daswt Street, El Menia
              </p>
              <p>
                <a href="mailto:islamnady95@gmail.com" className="text-decoration-none text-info-emphasis" target="_blank">
                  <FaEnvelope />
                  islamnady95@gmail.com
                </a>
              </p>
              <p>
                <a href="tel:(+20)1110639692" className="text-decoration-none text-info-emphasis" target="_blank">
                  <FaPhoneAlt />
                  (+20)111 0639692
                </a>
              </p>
            </div>
          </div>
        </section>
        <hr className="my-3" />
        <section className="p-3 pt-0">
          <div className="row d-flex align-items-center">
            <div className="col-md-7 col-lg-8 text-center text-md-start">
              <div className="p-3 ">
                © 2023 Copyright:
                <a href="https://iti.gov.eg/iti/home" className="text-decoration-none text-info-emphasis" target="_blank">
                  iti.gov.eg
                </a>
              </div>
            </div>
            <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
              <a className="btn  btn-floating m-1" role="button" href="https://www.facebook.com/" target="_blank">
                <FaTwitter />
              </a>
              <a className="btn  btn-floating m-1" role="button" href="https://www.twitter.com/" target="_blank">
                <i className="fab fa-twitter"></i>
                <FaFacebookF />
              </a>
              <a className="btn  btn-floating m-1" role="button" href="https://www.google.com/" target="_blank">
                <i className="fab fa-google"></i>
                <FaGoogle />
              </a>
              <a className="btn  btn-floating m-1" role="button" href="https://www.instagram.com/" target="_blank">
                <i className="fab fa-instagram"></i>
                <FaInstagram />
              </a>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
