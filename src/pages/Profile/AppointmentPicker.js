import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Button, Card, ListGroup, Modal } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSignal } from "../../store/actions/Signal";
import ConfirmationModal from "../../components/ConfirmationModal";
import ToastCom from "../../components/ToastCom";

const AppointmentPicker = (props) => {
  const authTokens = JSON.parse(localStorage.getItem("authTokens")) || null;
  const currentUser = useSelector((state) => state.user.user);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedAppointmentToRemove, setSelectedAppointmentToRemove] = useState(null);
  const [selectedAppointmentToBook, setSelectedAppointmentToBook] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [dailyTimeRanges, setDailyTimeRanges] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const totalCards = dailyTimeRanges.length;
  const totalPages = Math.ceil(totalCards / 3);
  const currentCards = dailyTimeRanges.slice(currentPage * 3, (currentPage + 1) * 3);
  const canGoNext = currentPage < totalPages - 1;
  const canGoPrev = currentPage > 0;
  const signal = useSelector((state) => state.signal);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/appointments/" + props.doctor)
      .then((response) => {
        console.log(response.data);
        setDailyTimeRanges(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [signal]);

  const addAppointment = () => {
    const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, "0")}-${selectedDate.getDate().toString().padStart(2, "0")}`;
    const formattedStartTime = startTime.toLocaleTimeString("en-US", { hour12: false });
    const formattedEndTime = endTime.toLocaleTimeString("en-US", { hour12: false });
    const newTimeRange = {
      appointment_date: formattedDate,
      start_time: formattedStartTime,
      end_time: formattedEndTime,
      doctor: currentUser.id,
    };
    axios
      .post("http://127.0.0.1:8000/appointments/add/", newTimeRange, {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(setSignal(!signal));
        setErrorMessage("");
      })
      .catch((error) => {
        console.log(error.response.data.non_field_errors[0]);
        setErrorMessage(error.response.data.non_field_errors[0]);
      });
  };

  const openConfirmationModal = (appointment) => {
    setSelectedAppointmentToRemove(appointment);
    setShowConfirmationModal(true);
  };

  const removeAppointment = () => {
    axios
      .delete("http://127.0.0.1:8000/appointments/delete/" + selectedAppointmentToRemove.id, {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(setSignal(!signal));
        setShowConfirmationModal(false);
      })
      .catch((error) => {
        console.log(error.response.data.non_field_errors[0]);
        setErrorMessage(error.response.data.non_field_errors[0]);
      });
  };

  const sendEmail = (from_name, to_name, message, to_email) => {
    emailjs
      .send(
        "service_nnndbzw",
        "template_ce1tb5j",
        {
          from_name,
          to_name,
          message,
          to_email,
        },
        "lTiqoZrmC_6pX8eLV"
      )
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const bookTimeSlot = () => {
    axios
      .put(
        "http://127.0.0.1:8000/appointments/book/" + selectedAppointmentToBook.id,
        { ...selectedAppointmentToBook, is_booked: true, patient: currentUser.id },
        {
          headers: {
            Authorization: "Bearer " + String(authTokens.access),
          },
        }
      )
      .then((response) => {
        console.log("book", response.data);
        dispatch(setSignal(!signal));
        setShowBookingModal(false);
        sendEmail(currentUser.first_name, props.profileData.first_name, `hello Dr. ${props.profileData.first_name}. ${currentUser.first_name} booked appointment on ${selectedAppointmentToBook.appointment_date} from ${selectedAppointmentToBook.start_time} to ${selectedAppointmentToBook.end_time}`, "islamnady95@gmail.com");
      })
      .catch((error) => {
        console.log(error.response.data.non_field_errors[0]);
        setErrorMessage(error.response.data.non_field_errors[0]);
      });
  };

  useEffect(() => {
    const checkAndDeleteAppointments = () => {
      const formattedDate = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`;
      const formattedTime = new Date().toLocaleTimeString("en-US", { hour12: false });
      for (const card of dailyTimeRanges) {
        if (card.appointment_date === formattedDate) {
          for (const range of card.appointments) {
            console.log(range.start_time, formattedTime);
            if (range.start_time < formattedTime) {
              axios
                .delete("http://127.0.0.1:8000/appointments/delete/" + range.id, {
                  headers: {
                    Authorization: "Bearer " + String(authTokens.access),
                  },
                })
                .then((response) => {
                  console.log(response.data);
                  dispatch(setSignal(!signal));
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          }
        }
      }
    };
    checkAndDeleteAppointments();
    const intervalId = setInterval(checkAndDeleteAppointments, 20 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dailyTimeRanges]);

  return (
    <Container className="mt-2">
      {currentUser && props.doctor == currentUser.id && (
        <div style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)", padding: "20px", borderRadius: "5px" }}>
          <div className="d-flex justify-content-between flex-wrap">
            <div>
              <p>Select Date:</p>
              <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} dateFormat="MM/dd/yyyy" />
            </div>
            <div>
              <p>Select Start Time:</p>
              <DatePicker selected={startTime} onChange={(time) => setStartTime(time)} showTimeSelect showTimeSelectOnly timeIntervals={15} dateFormat="h:mm aa" />
            </div>
            <div>
              <p>Select End Time:</p>
              <DatePicker selected={endTime} onChange={(time) => setEndTime(time)} showTimeSelect showTimeSelectOnly timeIntervals={15} dateFormat="h:mm aa" />
            </div>
          </div>
          <Button onClick={addAppointment} className=" w-100  mt-2" variant="outline-dark">
            Add Appointment
          </Button>
          <div className="text-danger text-center ">{errorMessage}</div>
        </div>
      )}

      <div>
        <hr />

        <Container className="d-flex gap-2 flex-wrap flex-lg-nowrap">
          {currentCards.map((card, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Card.Title className="text-center">
                  Appointment Date: <p>{card.appointment_date}</p>
                </Card.Title>
                <ListGroup className="opacity-75">
                  {card.appointments.map((range, i) => (
                    <div className=" position-relative " key={i}>
                      <ListGroup.Item
                        action
                        variant="primary"
                        onClick={() => {
                          if (!currentUser) {
                            setShowToast(true);
                            setErrorMessage("Must be logged");
                            return;
                          }
                          setSelectedAppointmentToBook(range);
                          setShowBookingModal(true);
                        }}
                        disabled={range.is_booked || (currentUser && currentUser.is_doctor)}
                        className={`text-truncate ${range.is_booked && "text-decoration-line-through"}`}
                      >
                        <strong>From:</strong> {range.start_time} <br /> <strong>To:</strong> {range.end_time}
                      </ListGroup.Item>
                      <hr />
                      {currentUser && props.doctor == currentUser.id && <Button className="btn-close position-absolute end-0 top-0 " onClick={() => openConfirmationModal(range)} variant="danger"></Button>}
                    </div>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          ))}
        </Container>
        <div className="d-flex justify-content-between mt-3">
          <Button variant="secondary" onClick={() => setCurrentPage(currentPage - 1)} disabled={!canGoPrev}>
            Previous
          </Button>
          <Button variant="secondary" onClick={() => setCurrentPage(currentPage + 1)} disabled={!canGoNext}>
            Next
          </Button>
        </div>
      </div>

      <Modal show={showBookingModal} onHide={() => setShowBookingModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Book Time Slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointmentToBook && (
            <p>
              You are booking from <span className="text-warning">{selectedAppointmentToBook.start_time}</span> to <span className="text-warning">{selectedAppointmentToBook.end_time}</span> on <span className="text-info">{selectedAppointmentToBook.appointment_date}</span>.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBookingModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={bookTimeSlot}>
            Book
          </Button>
        </Modal.Footer>
      </Modal>

      <ConfirmationModal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
        onConfirm={() => removeAppointment()}
        text={
          <>
            Are you sure you want to remove the appointment on <span className="text-info"> {selectedAppointmentToRemove?.appointment_date}</span> from <span className="text-warning">{selectedAppointmentToRemove?.start_time}</span> to <span className="text-warning">{selectedAppointmentToRemove?.end_time}</span>?
          </>
        }
      />

      <ToastCom
        position="bottom"
        delay={3000}
        showToast={showToast}
        onClose={() => {
          setShowToast(false);
          setErrorMessage("");
        }}
        message={<p className="text-danger">{errorMessage}</p>}
      />
    </Container>
  );
};

export default AppointmentPicker;
