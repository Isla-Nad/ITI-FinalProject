import icon1 from "../../icons/Porcelain-Crowns.png";
import icon2 from "../../icons/2441082.png";
import icon3 from "../../icons/3209072.png";
import icon4 from "../../icons/white-filling.png";
import icon5 from "../../icons/2866146.png";
import icon6 from "../../icons/993248.png";

function Cometics() {
  return (
    <>
      <>
        <h2 className="text-center Icon2-head" style={{ padding: "30px 0px" }}>
          We offer a compelte array of general and <br />
          cosmetic services for your oral care{" "}
        </h2>

        <div className="iconns1-come  row " style={{ padding: "30px 0px" }}>
          <div className="Icon2-come col-sm-6  col-lg-3 text-center">
            <div className="card-body">
              <h1>Cera Crown </h1>
              <img src={icon1} alt="" style={{ width: "200px", height: "200px" }} />
              <p>Unversity of Harved Master of Dentistry</p>
              <i className="fa-brands fa-facebook fa-xl text-dark"></i>
              <i className="fa-brands fa-instagram fa-xl text-dark" style={{ paddingLeft: "20px" }}></i>
              <i className="fa-brands fa-twitter fa-xl" style={{ color: "black", paddingLeft: "20px" }}></i>
            </div>
          </div>

          <div className="Icon2-come  col-sm-6 col-lg-3 text-center">
            <div className="card-body">
              <h1>Root Canals</h1>
              <img src={icon2} alt="" style={{ width: "200px", height: "200px" }} />

              <p>Unversity of Harved Master of Dentistry</p>
              <i className="fa-brands fa-facebook fa-xl text-dark"></i>
              <i className="fa-brands fa-instagram fa-xl text-dark" style={{ paddingLeft: "20px" }}></i>
              <i className="fa-brands fa-twitter fa-xl" style={{ color: "black", paddingLeft: "20px" }}></i>
            </div>
          </div>

          <div className="Icon2-come  col-sm-6 col-lg-3 text-center">
            <div className="card-body">
              <h1>Reg-exam</h1>
              <img src={icon3} alt="" style={{ width: "200px", height: "200px" }} />

              <p>Unversity of Harved Master of Dentistry</p>
              <i className="fa-brands fa-facebook fa-xl text-dark"></i>
              <i className="fa-brands fa-instagram fa-xl text-dark" style={{ paddingLeft: "20px" }}></i>
              <i className="fa-brands fa-twitter fa-xl" style={{ color: "black", paddingLeft: "20px" }}></i>
            </div>
          </div>
        </div>
        <div className="iconns1-come  row " style={{ padding: "30px 0px" }}>
          <div className="Icon2-come  col-sm-6 col-lg-3 text-center">
            <div className="card-body">
              <h1>White fillings</h1>
              <img src={icon4} alt="" style={{ width: "200px", height: "200px" }} />
              <p>Unversity of Harved Master of Dentistry</p>
              <i className="fa-brands fa-facebook fa-xl text-dark"></i>
              <i className="fa-brands fa-instagram fa-xl text-dark" style={{ paddingLeft: "20px" }}></i>
              <i className="fa-brands fa-twitter fa-xl" style={{ color: "black", paddingLeft: "20px" }}></i>
            </div>
          </div>
          <div className="Icon2-come  col-sm-6 col-lg-3 text-center">
            <div className="card-body">
              <h1>Dental Care</h1>
              <img src={icon5} alt="" style={{ width: "200px", height: "200px" }} />
              <p>Unversity of Harved Master of Dentistry</p>
              <i className="fa-brands fa-facebook fa-xl text-dark"></i>
              <i className="fa-brands fa-instagram fa-xl text-dark" style={{ paddingLeft: "20px" }}></i>
              <i className="fa-brands fa-twitter fa-xl" style={{ color: "black", paddingLeft: "20px" }}></i>
            </div>
          </div>
          <div className="Icon2-come  col-sm-6 col-lg-3 text-center">
            <div className="card-body">
              <h1>Den implants</h1>
              <img src={icon6} alt="" style={{ width: "200px", height: "200px" }} />
              <p>Unversity of Harved Master of Dentistry</p>
              <i className="fa-brands fa-facebook fa-xl text-dark"></i>
              <i className="fa-brands fa-instagram fa-xl text-dark" style={{ paddingLeft: "20px" }}></i>
              <i className="fa-brands fa-twitter fa-xl" style={{ color: "black", paddingLeft: "20px" }}></i>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
export default Cometics;
