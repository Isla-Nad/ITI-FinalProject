import image from "../../icons/Banner.png";
import Aboutus from "./Aboutus";
import Cometics from "./Cometics";
import OurTeam from "./OurTeam";
import "../home/Home.css";
import Services from "./Services";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

function Home() {
  const [topRatedDoctors, setTopRatedDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/community/top_rated/doctors/")
      .then((response) => setTopRatedDoctors(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="container-image">
        <img src={image} alt="" />
        <div className="banner-text">
          <h1 className="ba-text">Welcome To Dentos</h1>
          <h3 className="ba-text">Every Smiles Everday</h3>
          <p className="ba-text">--because your smile is our passion</p>
        </div>
      </div>
      <Aboutus />
      <Cometics />
      <Services />
      <h2 className="text-center Icon2-head" style={{ padding: "30px 0px" }}>
        Our Top Five Rated Doctors
      </h2>
      <Container className="d-flex flex-wrap justify-content-center my-3 gap-2 ">
        {topRatedDoctors.map((doctor) => (
          <Card key={doctor.user.id} className="col-md-3 col-sm-6 mb-3 Icon2-come">
            {doctor.profile_picture ? (
              <Card.Img variant="top" src={`http://localhost:8000${doctor.profile_picture}`} alt="" className="profile-picture p-3 " height={"300px"} />
            ) : (
              <div className="user-icon d-flex justify-content-center align-items-center p-3 h-100">
                <FaUser height={"100%"} />
              </div>
            )}
            <Card.Body>
              <Button
                variant="outline-primary"
                onClick={() => {
                  navigate(`/profile/${doctor.user.id}`);
                }}
                className="w-100"
              >
                Dr. {doctor.user.first_name}
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Container>
      <OurTeam />
    </>
  );
}
export default Home;
