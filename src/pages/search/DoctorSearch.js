import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Container } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { setSignal } from "../../store/actions/Signal";
import { useNavigate } from "react-router-dom";

const DoctorSearch = () => {
  const searchQuery = useSelector((state) => state.search);
  const [doctors, setDoctors] = useState([]);
  const signal = useSelector((state) => state.signal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/accounts/search/doctors?search_query=${searchQuery}`)
      .then((response) => {
        console.log("search", response.data);
        setDoctors(response.data);
      })
      .catch((error) => console.log(error));
  }, [searchQuery]);

  return (
    <div style={{ flex: "1 0 auto" }}>
      <Container className="d-flex flex-wrap justify-content-center my-3 gap-2 ">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="col-md-3 col-sm-6 mb-3">
            {doctor.profile_picture ? (
              <Card.Img variant="top" src={`http://localhost:8000${doctor.profile_picture}`} alt="" className="profile-picture p-3 " height={"250px"} />
            ) : (
              <div className="user-icon d-flex justify-content-center align-items-center p-3 h-100">
                <FaUser />
              </div>
            )}
            <Card.Body>
              <Button
                variant="outline-primary"
                onClick={() => {
                  navigate(`/profile/${doctor.id}`);
                  dispatch(setSignal(!signal));
                }}
                className="w-100"
              >
                Dr. {doctor.first_name}
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default DoctorSearch;
