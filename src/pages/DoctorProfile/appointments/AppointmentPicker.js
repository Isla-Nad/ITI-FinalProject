import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaTrash } from "react-icons/fa";
import { Container, Button, Card, ListGroup, Modal } from "react-bootstrap";
import { compareAsc } from "date-fns";

const AppointmentPicker = () => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedAppointmentToRemove, setSelectedAppointmentToRemove] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [dailyTimeRanges, setDailyTimeRanges] = useState([]);
  const [bookingModalShow, setBookingModalShow] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const isTimeRangeExists = (date, start, end) => {
    const card = dailyTimeRanges.find((range) => range.date === date);
    if (card) {
      return card.ranges.some((range) => range.start === start && range.end === end);
    }
    return false;
  };

  const addAppointment = () => {
    if (startTime < endTime && !isTimeRangeExists(selectedDate.toDateString(), startTime.toLocaleTimeString(), endTime.toLocaleTimeString())) {
      const newTimeRange = {
        date: selectedDate.toDateString(),
        start: startTime.toLocaleTimeString(),
        end: endTime.toLocaleTimeString(),
        booked: false,
      };

      const existingCardIndex = dailyTimeRanges.findIndex((range) => range.date === newTimeRange.date);

      if (existingCardIndex !== -1) {
        const updatedTimeRanges = [...dailyTimeRanges];
        updatedTimeRanges[existingCardIndex].ranges.push(newTimeRange);
        updatedTimeRanges[existingCardIndex].ranges.sort((a, b) => a.start.localeCompare(b.start));

        setDailyTimeRanges(updatedTimeRanges);
      } else {
        setDailyTimeRanges([
          ...dailyTimeRanges,
          {
            date: newTimeRange.date,
            ranges: [newTimeRange],
          },
        ]);
      }
    }
  };

  const openConfirmationModal = (date, start, end) => {
    setSelectedAppointmentToRemove({ date, start, end });
    setShowConfirmationModal(true);
  };

  const removeAppointment = (date, start, end) => {
    const updatedTimeRanges = dailyTimeRanges.map((card) => {
      if (card.date === date) {
        card.ranges = card.ranges.filter((range) => range.start !== start || range.end !== end);
      }
      return card;
    });

    const updatedTimeRangesFiltered = updatedTimeRanges.filter((card) => card.ranges.length > 0);

    setDailyTimeRanges(updatedTimeRangesFiltered);

    setShowConfirmationModal(false);
  };

  const bookTimeSlot = () => {
    if (selectedTimeSlot) {
      const { date, start, end } = selectedTimeSlot;
      const updatedTimeRanges = dailyTimeRanges.map((card) => {
        if (card.date === date) {
          card.ranges = card.ranges.map((range) => {
            if (range.start === start && range.end === end) {
              return { ...range, booked: true };
            }
            return range;
          });
        }
        return card;
      });

      setDailyTimeRanges(updatedTimeRanges);
      setBookingModalShow(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const updatedTimeRanges = dailyTimeRanges.map((card) => {
        if (card.date === now.toDateString()) {
          card.ranges = card.ranges.filter((range) => {
            const end = new Date(range.end);
            return end > now;
          });
        }
        return card;
      });

      const updatedTimeRangesFiltered = updatedTimeRanges.filter((card) => card.ranges.length > 0);

      const updatedTimeRangesFilteredPast = updatedTimeRangesFiltered.filter((card) => {
        const cardDate = new Date(card.date);
        return cardDate >= now;
      });

      setDailyTimeRanges(updatedTimeRangesFilteredPast);
    }, 10000);

    return () => clearInterval(interval);
  }, [dailyTimeRanges]);

  const sortedDailyTimeRanges = [...dailyTimeRanges].sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)));
  const totalCards = sortedDailyTimeRanges.length;
  const totalPages = Math.ceil(totalCards / itemsPerPage);
  const currentCards = sortedDailyTimeRanges.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const canGoNext = currentPage < totalPages - 1;
  const canGoPrev = currentPage > 0;

  return (
    <Container className="mt-2">
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
        <div onClick={addAppointment} className="text-center mt-2" style={{ border: "1px solid gray", padding: "10px 20px", cursor: "pointer", borderRadius: "5px" }}>
          Add Appointment
        </div>
      </div>

      <div>
        <h2 className="mt-2">Available Appointments:</h2>
        <Container className="d-flex gap-2 flex-wrap flex-lg-nowrap">
          {currentCards.map((card, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Card.Title>{card.date}</Card.Title>
                <ListGroup variant="flush">
                  {card.ranges
                    .sort((a, b) => a.start.localeCompare(b.start))
                    .sort((a, b) => a.date.localeCompare(b.date))
                    .map((range, i) => (
                      <ListGroup.Item key={i} className="d-flex">
                        <Button
                          className="ml-2"
                          onClick={() => {
                            if (!range.booked) {
                              setSelectedTimeSlot(range);
                              setBookingModalShow(true);
                            }
                          }}
                          disabled={range.booked}
                        >
                          <strong>From:</strong> {range.start}
                          <br />
                          <strong>To:</strong> {range.end}
                        </Button>
                        <Button className="ml-2" onClick={() => openConfirmationModal(card.date, range.start, range.end)} variant="danger">
                          <FaTrash />
                        </Button>
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              </Card.Body>
            </Card>
          ))}
        </Container>
        <div className="d-flex justify-content-between mt-3">
          <Button variant="secondary" onClick={() => handlePageChange(currentPage - 1)} disabled={!canGoPrev}>
            Previous
          </Button>
          <Button variant="secondary" onClick={() => handlePageChange(currentPage + 1)} disabled={!canGoNext}>
            Next
          </Button>
        </div>
      </div>

      <Modal show={bookingModalShow} onHide={() => setBookingModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Book Time Slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTimeSlot && (
            <p>
              You are booking from <span className="text-warning">{selectedTimeSlot.start}</span> to <span className="text-warning">{selectedTimeSlot.end}</span> on <span className="text-info">{selectedTimeSlot.date}</span>.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setBookingModalShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={bookTimeSlot}>
            Book
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to remove the appointment on <span className="text-info"> {selectedAppointmentToRemove?.date}</span> from <span className="text-warning">{selectedAppointmentToRemove?.start}</span> to <span className="text-warning">{selectedAppointmentToRemove?.end}</span>?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => removeAppointment(selectedAppointmentToRemove.date, selectedAppointmentToRemove.start, selectedAppointmentToRemove.end)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AppointmentPicker;
