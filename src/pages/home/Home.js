import image from "../../icons/Banner.png";
import Aboutus from "./Aboutus";
import Cometics from "./Cometics";
import OurTeam from "./OurTeam";
import '../home/Home.css'
import Services from "./Services";


function Home() {
  return (
    <>
      <div className="container-image">
        <img src={image} style={{ width: "100%" }} alt="" />
      </div>
      <div className="banner-text">
        <h1 className="ba-text">Welcome To Dentos</h1>
        <h3 className="ba-text">Every Smiles Everday</h3>
        <p className="ba-text">--because your smile is our passion</p>
      </div>
      <Aboutus/>
      <Cometics/>
      <Services/>
      <OurTeam/>
    </>

  );
}
export default Home;
