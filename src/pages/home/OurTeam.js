import islam from "./images/islam.png";
import abdullah from "./images/abdullah.jpeg";
import john from "./images/john.jpeg";
import mina from "./images/mina.jpeg";
import gouda from "./images/gouda.jpeg";
import translations from "./translations.json";
import { useSelector } from "react-redux";

function OurTeam() {
  const language = useSelector((state) => state.lang);

  const translate = (key) => {
    return translations[language][key];
  };

  return (
    <>
      <h2 className="text-center Icon2-head" style={{ padding: "30px 0px" }}>
        {translate("ourTeam")}
      </h2>

      <div className="iconns1-come  row " style={{ padding: "30px 0px" }}>
        <div className="Icon2-come col-sm-6  col-lg-3 text-center">
          <div className="card-body">
            <img src={john} alt="" style={{ width: "220px", height: "240px" }} />
            <h1>{translate("john")}</h1>
            <p>{translate("iti")}</p>
            <i className="fa-brands fa-facebook fa-xl text-dark"></i>
            <i className="fa-brands fa-instagram fa-xl text-dark" style={{ paddingLeft: "20px" }}></i>
            <i className="fa-brands fa-twitter fa-xl" style={{ color: "black", paddingLeft: "20px" }}></i>
          </div>
        </div>
        <div className="Icon2-come  col-sm-6 col-lg-3 text-center">
          <div className="card-body">
            <img src={mina} alt="" style={{ width: "220px", height: "240px" }} />
            <h1>{translate("mina")}</h1>
            <p>{translate("iti")}</p>
            <i className="fa-brands fa-facebook fa-xl text-dark"></i>
            <i className="fa-brands fa-instagram fa-xl text-dark" style={{ paddingLeft: "20px" }}></i>
            <i className="fa-brands fa-twitter fa-xl" style={{ color: "black", paddingLeft: "20px" }}></i>
          </div>
        </div>
        <div className="Icon2-come  col-sm-6 col-lg-3 text-center">
          <div className="card-body">
            <img src={gouda} alt="" style={{ width: "220px", height: "240px" }} />
            <h1>{translate("abdelrahman")}</h1>
            <p>{translate("iti")}</p>
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
            <h1>{translate("islam")}</h1>
            <p>{translate("iti")}</p>
            <i className="fa-brands fa-facebook fa-xl text-dark"></i>
            <i className="fa-brands fa-instagram fa-xl text-dark" style={{ paddingLeft: "20px" }}></i>
            <i className="fa-brands fa-twitter fa-xl" style={{ color: "black", paddingLeft: "20px" }}></i>
          </div>
        </div>
        <div className="Icon2-come  col-sm-6 col-lg-3 text-center">
          <div className="card-body">
            <img src={abdullah} alt="" style={{ width: "220px", height: "240px" }} />
            <h1>{translate("abdullah")}</h1>
            <p>{translate("iti")}</p>
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
