import { FaPhoneAlt, FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer class="text-center text-lg-start mt-5 " style={{ flexShrink: 0 }}>
      <div class="container p-4 pb-0">
        <section>
          <div class="row">
            <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 class="text-uppercase mb-4 font-weight-bold">Information Technology Institute</h6>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem , consectetur adipisicing elit.</p>
            </div>
            <hr class="w-100 clearfix d-md-none" />
            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 class="text-uppercase mb-4 font-weight-bold">Useful links</h6>
              <p>
                <Link to="/" class="text-decoration-none text-info-emphasis">
                  Home
                </Link>
              </p>
              <p>
                <Link href="/about" class="text-decoration-none text-info-emphasis">
                  About
                </Link>
              </p>
              <p>
                <a href="/posts" class="text-decoration-none text-info-emphasis">
                  Community
                </a>
              </p>
            </div>
            <hr class="w-100 clearfix d-md-none" />
            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 class="text-uppercase mb-4 font-weight-bold">Contact</h6>
              <p>
                <i class="fas fa-home mr-3"></i> Teraat El Daswt Street, El Menia
              </p>
              <p>
                <a href="mailto:islamnady95@gmail.com" class="custom-link text-decoration-none" target="_blank">
                  <FaEnvelope />
                  islamnady95@gmail.com
                </a>
              </p>
              <p>
                <a href="tel:(+20)1110639692" class="custom-link text-decoration-none" target="_blank">
                  <FaPhoneAlt />
                  (+20)111 0639692
                </a>
              </p>
            </div>
          </div>
        </section>
        <hr class="my-3" />
        <section class="p-3 pt-0">
          <div class="row d-flex align-items-center">
            <div class="col-md-7 col-lg-8 text-center text-md-start">
              <div class="p-3">
                © 2023 Copyright:
                <a href="https://iti.gov.eg/iti/home" class="text-decoration-none text-danger" target="_blank">
                  iti.gov.eg
                </a>
              </div>
            </div>
            <div class="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
              <a class="btn  btn-floating m-1" role="button" href="https://www.facebook.com/" target="_blank">
                <FaTwitter />
              </a>
              <a class="btn  btn-floating m-1" role="button" href="https://www.twitter.com/" target="_blank">
                <i class="fab fa-twitter"></i>
                <FaFacebookF />
              </a>
              <a class="btn  btn-floating m-1" role="button" href="https://www.google.com/" target="_blank">
                <i class="fab fa-google"></i>
                <FaGoogle />
              </a>
              <a class="btn  btn-floating m-1" role="button" href="https://www.instagram.com/" target="_blank">
                <i class="fab fa-instagram"></i>
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
