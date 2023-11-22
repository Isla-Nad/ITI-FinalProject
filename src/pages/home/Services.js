import pic1 from "../../icons/rating.png";
import pic2 from "../../icons/post.jpg";
import pic3 from "../../icons/free-dentist-appointment-1594336-1348446.png";
import translations from "./translations.json";
import { useSelector } from "react-redux";

function Services() {
  const language = useSelector((state) => state.lang);

  const translate = (key) => {
    return translations[language][key];
  };

  return (
    <>
      <h2 className="text-center Icon2-head">{translate("ourServices")}</h2>
      <div className="iconns1-come  row " style={{ padding: "30px 0px" }}>
        <div className="Icon2-come col-sm-6  col-lg-3 text-center">
          <div className="card-body">
            <img src={pic1} alt="" style={{ width: "200px", height: "200px" }} />
            <h4>{translate("addCommentAndRating")}</h4>
          </div>
        </div>
        <div className="Icon2-come  col-sm-6 col-lg-3 text-center">
          <div className="card-body">
            <img src={pic2} alt="" style={{ width: "200px", height: "200px" }} />
            <h4>{translate("addPostOnWebsite")}</h4>
          </div>
        </div>
        <div className="Icon2-come  col-sm-6 col-lg-3 text-center">
          <div className="card-body">
            <img src={pic3} alt="" style={{ width: "200px", height: "200px" }} />
            <h4>{translate("makeAppointmentOnline")}</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;
