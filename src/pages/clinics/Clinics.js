import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Clinics.css";
import { useDispatch, useSelector } from "react-redux";
import { setSignal } from "../../store/actions/Signal";

const Clinics = () => {
  const [clinics, setClinics] = useState([]);
  // const [loading, setLoading] = useState(true);
  const signal = useSelector((state) => state.signal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/clinics/")
      .then((response) => {
        setClinics(response.data.clinics);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ flex: "1 0 auto" }}>
      <Container className="d-flex flex-wrap justify-content-center my-3 gap-2 ">
        {clinics.map((clinic) => (
          <Card key={clinic.id} className="col-md-3 col-sm-6 mb-3">
            <Card.Img variant="top" src={`http://localhost:8000${clinic.image}`} alt="" className="profile-picture p-3 " height={"250px"} />
            <Card.Body>
              <Button
                variant="outline-primary"
                onClick={() => {
                  navigate(`/clinics/clinicDetails/${clinic.id}`);
                  dispatch(setSignal(!signal));
                }}
                className="w-100"
              >
                {clinic.name}
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default Clinics;
