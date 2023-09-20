import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./Clinics.css";

const Clinics = () => {
  const [clinics, setClinics] = useState([]);

  useEffect((...args) => {
    axios
      .get("https://retoolapi.dev/NxioV4/data")
      .then((response) => setClinics(response.data)) //
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container--clinic">
      {clinics.map((clinic) => (
        <Card key={clinic.id} style={{ width: "18rem" }}>
          <Card.Img variant="top" src={clinic.image} />
          <Card.Body>
            <Card.Text>{clinic.name}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Clinics;
