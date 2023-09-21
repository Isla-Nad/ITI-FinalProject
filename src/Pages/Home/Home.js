import image from "../../icons/Banner.png";
import Aboutus from "./Aboutus";
import Cometics from "./Cometics";
import OurTeam from "./OurTeam";


function Home() {
  return (
    <>
      <div className="container-image">
        <img src={image} style={{ width: "100%" }} alt="" />
      </div>
      <div className="banner-text">
        <h1>Welcome To Dentos</h1>
        <h3>Every Smiles Everday</h3>
        <p>--because your smile is our passion</p>
      </div>
      <Aboutus/>
      <Cometics/>
      <OurTeam/>
    </>

  );
}
export default Home;
