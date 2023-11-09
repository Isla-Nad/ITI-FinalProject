import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import "./Clinics.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Clinics = () => {
  const [clinics, setClinics] = useState([]);
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/clinics/")
      .then((response) => {
        setClinics(response.data.clinics);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(clinics);
  // const handleClick = () => {
  //   navigate("/clinics/clinicDetails/");
  // };

  return (
    <div style={{ flex: "1 0 auto" }}>
      <div className="container mt-5 --clinic">
        <div className="row">
          {clinics.map((clinic) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mt-3 mb-3">
              <Card>
                <Card.Img variant="top" src={`http://127.0.0.1:8000${clinic.image}`} alt="" style={{ height: "15rem" }} />
                <Card.Body>
                  <Card.Title>{clinic.name}</Card.Title>
                  <Card.Text>{clinic.desc}</Card.Text>
                  <Link to={`/clinics/clinicDetails/${clinic.id}`}>
                    <button className="btn btn-primary">Details</button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clinics;
