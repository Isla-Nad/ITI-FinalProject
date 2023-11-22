import about from "../../icons/about_us.png";
import translations from "./translations.json";
import { useSelector } from "react-redux";

function Aboutus() {
  const language = useSelector((state) => state.lang);

  const translate = (key) => {
    return translations[language][key];
  };

  return (
    <>
      <div className="container mt-5" id="about">
        <div className="row">
          <div className="col-sm-12 col-lg-6 text-center">
            <img src={about} alt="" className="img-fluid" style={{ width: "600px", height: "500px" }} />
          </div>
          <div className="col-sm-12 col-lg-6 border border-2 border-secondary rounded-1 p-4 py-lg-5">
            <h1 className="text-center">{translate("aboutUs")}</h1>
            <p className="fs-4 text-center">{translate("aboutUsDescription")}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Aboutus;
