import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import "./Clinics.css";

const Clinics = () => {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://retoolapi.dev/NxioV4/data")
      .then((response) => {
        setClinics(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container--clinic">
      {loading ? (
        <div className="card loading-skeleton"></div>
      ) : (
        clinics.map((clinic) => (
          <Card key={clinic.id} className="card" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={clinic.image} />
            <Card.Body>
              <Card.Text>{clinic.name}</Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default Clinics;
