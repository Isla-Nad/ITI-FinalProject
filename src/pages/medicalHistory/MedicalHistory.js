import { useEffect, useState } from "react";
import MedicalHistoryForm from "./MedicalHistoryForm";
import { Button, Col, Modal, Row } from "react-bootstrap";
import PatientDataPopup from "./PatientDataPopup";
import "./MedicalHistory.css";
import axios from "axios";
import ConfirmationModal from "../../components/ConfirmationModal";

const MedicalHistory = () => {
  const [MediicalHistory, setMedicalHistory] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ patientName: "", dateOfVisit: "", allergies: "", medicalConditions: "", dentalConditions: "", previousTreatments: "", dentalHygieneHabits: "", specificDentalConcerns: "", file: null });
  const [historyData, setHistoryData] = useState(JSON.parse(localStorage.getItem("HistoryData")) || []);
  const [selectedPatientData, setSelectedPatientData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      const updatedHistoryData = [...historyData];
      updatedHistoryData[selectedIndex] = formData;
      setHistoryData(updatedHistoryData);
      setShowForm(false);
      setEditMode(false);
      setSelectedIndex(null);
    } else {
      setHistoryData([...historyData, formData]);
    }

    setShowForm(false);

    setFormData({ patientName: "", dateOfVisit: "", allergies: "", medicalConditions: "", dentalConditions: "", previousTreatments: "", dentalHygieneHabits: "", specificDentalConcerns: "", file: formData.file });
  };

  const showPatientData = (patientData) => {
    setSelectedPatientData(patientData);
  };

  const closePatientDataPopup = () => {
    setSelectedPatientData(null);
  };

  const editPatientData = (history, index) => {
    setEditMode(true);
    setFormData(history);
    setShowForm(true);
    setSelectedIndex(index);
  };

  const confirmRemoval = () => {
    const updatedHistoryData = [...historyData];
    updatedHistoryData.splice(selectedIndex, 1);
    setHistoryData(updatedHistoryData);

    setShowConfirmationModal(false);
    setSelectedIndex(null);
  };

  const removePatientData = (index) => {
    setShowConfirmationModal(true);
    setSelectedIndex(index);
  };
  const cancelRemoval = () => {
    setShowConfirmationModal(false);
    setSelectedIndex(null);
  };
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/medicalhistory/medicalhistoryapi/")
      .then((response) => {
        setMedicalHistory(response.data);
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("HistoryData", JSON.stringify(historyData));
  // }, [historyData]);

  return (
    <div className="medical-history-container" style={{ flex: "1 0 auto" }}>
      <h2 className="header text-center">Dental History</h2>
      <Row className="grid-header">
        <Col className="grid-col col-1">#</Col>
        <Col className="grid-col">Patient Name</Col>
        <Col className="grid-col">Date of Visit</Col>
        <Col className="grid-col">Actions</Col>
      </Row>
      {/* {historyData.map((history, index) => (
        <Row key={index} className="grid-row">
          <Col className="grid-col col-1">{index + 1}</Col>
          <Col className="grid-col">{history.patientName}</Col>
          <Col className="grid-col">{history.dateOfVisit}</Col>
          <Col className="grid-col gap-2 d-flex">
            <Button onClick={() => showPatientData(history)}>View</Button>
            <Button variant="warning" onClick={() => editPatientData(history, index)}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => removePatientData(index)}>
              Remove
            </Button>
          </Col>
        </Row>
      ))} */}
      {MediicalHistory.map((Medical, id) => (
        <Row key={id} className="grid-row">
          <Col className="grid-col col-1">{Medical.id}</Col>
          <Col className="grid-col">{Medical.patient_name}</Col>
          <Col className="grid-col">{Medical.date_of_visit}</Col>
          <Col className="grid-col gap-2 d-flex">
            <Button onClick={() => showPatientData(Medical.id)}>View</Button>
            <Button variant="warning" onClick={() => editPatientData(Medical.id)}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => removePatientData(Medical.id)}>
              Remove
            </Button>
          </Col>
        </Row>
      ))}
      {showForm ? (
        <Modal show={showForm} onHide={() => setShowForm(false)} size="xl">
          <Modal.Header closeButton={!editMode}>
            <Modal.Title>
              {editMode ? (
                <h3>
                  Edit <span className="text-warning">{formData.patientName}</span>'s History
                </h3>
              ) : (
                <h3>Add New Dental History</h3>
              )}
            </Modal.Title>
          </Modal.Header>
          <MedicalHistoryForm handleChange={handleChange} handleFileChange={handleFileChange} handleSubmit={handleSubmit} patientData={formData} buttonText={editMode ? "Finish Editing" : "Add New Dental History"} />
        </Modal>
      ) : (
        <Button onClick={() => setShowForm(true)} className="add-button m-3">
          Add New Dental History
        </Button>
      )}
      {selectedPatientData && <PatientDataPopup patientData={selectedPatientData} show={selectedPatientData !== null} onHide={closePatientDataPopup} />}
      <ConfirmationModal show={showConfirmationModal} onHide={cancelRemoval} onConfirm={confirmRemoval} text={"Are you sure you want to delete this history?"} />
    </div>
  );
};

export default MedicalHistory;
