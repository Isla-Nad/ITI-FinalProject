import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import "./Clinics.css";
import { useNavigate } from "react-router-dom";

const Clinics = () => {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://retoolapi.dev/NxioV4/data")
      .then((response) => {
        setClinics(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = () => {
    navigate("/clinics/clinicDetails");
  };

  return (
    <div className="container--clinic">
      {loading
        ? [...Array(30)].map((_, index) => <div key={index} className="card loading-skeleton"></div>)
        : clinics.map((clinic) => (
            <Card key={clinic.id} className="card" style={{ width: "18rem" }}>
              <Card.Img variant="top" src={clinic.image} />
              <Card.Body>
                <Card.Text>{clinic.name}</Card.Text>
                <Button variant="primary" onClick={handleClick}>
                  Details
                </Button>
              </Card.Body>
            </Card>
          ))}
        
    </div>
  );
};

export default Clinics;
