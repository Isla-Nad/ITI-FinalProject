import { FaPhoneAlt, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link} from "react-router-dom";


function Footer() {
 
  return (
    <div className="footer" style={{ flexShrink: "0" }}>
      <div className="text text-wite ">
        <FaPhoneAlt className="text-white" /> <span className="text-white">:355462236</span>
        <ul>
       <li> <Link to="/clinics" style={{color:"white"}}>Clinics</Link></li>
      <li> <Link style={{color:"white"}} to="/posts">Posts</Link></li>
       </ul> 
      </div>
     
      <div className="icons">
        <ul>
      <li><Link to="/medicalHistory"style={{ color:"white"}}>MedicalHistoy</Link> </li>     
      <li><Link to="./DoctorProfile" style={{color:"white"}}>Dedical Details</Link></li>
      <li><Link to="./patient" style={{color:"white"}}>Patient Details</Link></li>
      </ul>
       
      </div>
      <FaFacebookF className="text-white mx-2" />
        <FaInstagram className="text-white mx-2" />
        <FaTwitter className="text-white mx-2" /> 
     
      <p className="text-white" style={{ textAlign: "center", paddingTop: "50px" }}>
        copyright@iti_Dentos
      </p>
     
      
    </div>
  );
}

export default Footer;
