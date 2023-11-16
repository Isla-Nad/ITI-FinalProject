import doctor1 from "../../icons/unnamed.jpg";
import doctor2 from "../../icons/clinic-doctor-image.jpg";
import doctor3 from "../../icons/www.postgrad.jpg";
import islam from "./images/islam.png";
import abdullah from "./images/abdullah.jpeg";
import john from "./images/john.jpeg";
import mina from "./images/mina.jpeg";
import gouda from "./images/gouda.jpeg";

function OurTeam() {
  return (
    <>
      <h2 className="text-center Icon2-head" style={{ padding: "30px 0px" }}>
        Our Team
      </h2>

      <div className="iconns1-come  row " style={{ padding: "30px 0px" }}>
        <div className="Icon2-come col-sm-6  col-lg-3 text-center">
          <div className="card-body">
            <img src={john} alt="" style={{ width: "220px", height: "240px" }} />
            <h1>John Sameh</h1>
            <p>Information Technology Institute</p>
            <i className="fa-brands fa-facebook fa-xl text-dark"></i>
            <i className="fa-brands fa-instagram fa-xl text-dark" style={{ paddingLeft: "20px" }}></i>
            <i className="fa-brands fa-twitter fa-xl" style={{ color: "black", paddingLeft: "20px" }}></i>
          </div>
        </div>
        <div className="Icon2-come  col-sm-6 col-lg-3 text-center">
          <div className="card-body">
            <img src={mina} alt="" style={{ width: "220px", height: "240px" }} />
            <h1>Mina Samy</h1>
            <p>Information Technology Institute</p>
            <i className="fa-brands fa-facebook fa-xl text-dark"></i>
            <i className="fa-brands fa-instagram fa-xl text-dark" style={{ paddingLeft: "20px" }}></i>
            <i className="fa-brands fa-twitter fa-xl" style={{ color: "black", paddingLeft: "20px" }}></i>
          </div>
        </div>
        <div className="Icon2-come  col-sm-6 col-lg-3 text-center">
          <div className="card-body">
            <img src={gouda} alt="" style={{ width: "220px", height: "240px" }} />
            <h1>Abdelrahman Gouda</h1>
            <p>Information Technology Institute</p>
            <i className="fa-brands fa-facebook fa-xl text-dark"></i>
            <i className="fa-brands fa-instagram fa-xl text-dark" style={{ paddingLeft: "20px" }}></i>
            <i className="fa-brands fa-twitter fa-xl" style={{ color: "black", paddingLeft: "20px" }}></i>
          </div>
        </div>
      </div>
      <div className="iconns1-come  row " style={{ padding: "30px 0px" }}>
        <div className="Icon2-come col-sm-6  col-lg-3 text-center">
          <div className="card-body">
            <img src={islam} alt="" style={{ width: "220px", height: "240px" }} />
            <h1>Islam Nady</h1>
            <p>Information Technology Institute</p>
            <i className="fa-brands fa-facebook fa-xl text-dark"></i>
            <i className="fa-brands fa-instagram fa-xl text-dark" style={{ paddingLeft: "20px" }}></i>
            <i className="fa-brands fa-twitter fa-xl" style={{ color: "black", paddingLeft: "20px" }}></i>
          </div>
        </div>
        <div className="Icon2-come  col-sm-6 col-lg-3 text-center">
          <div className="card-body">
            <img src={abdullah} alt="" style={{ width: "220px", height: "240px" }} />
            <h1>Abdullah Ahmed</h1>
            <p>Information Technology Institute</p>
            <i className="fa-brands fa-facebook fa-xl text-dark"></i>
            <i className="fa-brands fa-instagram fa-xl text-dark" style={{ paddingLeft: "20px" }}></i>
            <i className="fa-brands fa-twitter fa-xl" style={{ color: "black", paddingLeft: "20px" }}></i>
          </div>
        </div>
      </div>
    </>
  );
}
export default OurTeam;
