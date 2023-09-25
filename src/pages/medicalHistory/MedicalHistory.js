import { useState } from "react";
import MedicalHistoryForm from "./MedicalHistoryForm";
import { Button, Col, Modal, Row } from "react-bootstrap";
import PatientDataPopup from "./PatientDataPopup";
import "./MedicalHistory.css";
import ConfirmationModal from "./ConfirmationModal";

const MedicalHistory = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    dateOfVisit: "",
    allergies: "",
    medicalConditions: "",
    dentalConditions: "",
    previousTreatments: "",
    dentalHygieneHabits: "",
    specificDentalConcerns: "",
    file: null,
  });
  const [historyData, setHistoryData] = useState([]);
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

    setFormData({
      patientName: "",
      dateOfVisit: "",
      allergies: "",
      medicalConditions: "",
      dentalConditions: "",
      previousTreatments: "",
      dentalHygieneHabits: "",
      specificDentalConcerns: "",
      file: formData.file,
    });
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

  return (
    <div className="medical-history-container" style={{ flex: "1 0 auto" }}>
      <h2 className="header text-center">Dental History</h2>
      <Row className="grid-header">
        <Col className="grid-col col-1">#</Col>
        <Col className="grid-col">Patient Name</Col>
        <Col className="grid-col">Date of Visit</Col>
        <Col className="grid-col">Actions</Col>
      </Row>
      {historyData.map((history, index) => (
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
      ))}
      {showForm ? (
        <Modal show={showForm} onHide={() => setShowForm(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{editMode ? `Edit ${formData.patientName}'s History` : "Add New Dental History"}</Modal.Title>
          </Modal.Header>
          <MedicalHistoryForm handleChange={handleChange} handleFileChange={handleFileChange} handleSubmit={handleSubmit} patientData={formData} buttonText={editMode ? "Finish Editing" : "Add New Dental History"} />
        </Modal>
      ) : (
        <Button onClick={() => setShowForm(true)} className="add-button m-3">
          Add New Dental History
        </Button>
      )}
      {selectedPatientData && <PatientDataPopup patientData={selectedPatientData} show={selectedPatientData !== null} onHide={closePatientDataPopup} />}
      {showConfirmationModal && <ConfirmationModal show={showConfirmationModal} onHide={cancelRemoval} onConfirm={confirmRemoval} />}
    </div>
  );
};

export default MedicalHistory;
