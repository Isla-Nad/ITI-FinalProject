import { FaPhoneAlt, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer">
      <div className="text text-wite ">
        <FaPhoneAlt className="text-white" /> <h className="text-white">:355462236</h>
      </div>
      <div className="icons">
        <FaFacebookF className="text-white mx-2" />
        <FaInstagram className="text-white mx-2" />
        <FaTwitter className="text-white mx-2" />
      </div>
      <p className="text-white" style={{ textAlign: "center", paddingTop: "50px" }}>
        copyright@iti_Dentos
      </p>
    </div>
  );
}

export default Footer;
