import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignal } from "../../store/actions/Signal";
import { Button, Card, Container } from "react-bootstrap";
import axios from "axios";

const ClinicsSearch = () => {
  const searchQuery = useSelector((state) => state.search);
  const [clinics, setClinics] = useState([]);
  const signal = useSelector((state) => state.signal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/clinics/search/clinics?search_query=${searchQuery}`)
      .then((response) => {
        console.log("search", response.data);
        setClinics(response.data);
      })
      .catch((error) => console.log(error));
  }, [searchQuery]);

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

export default ClinicsSearch;
