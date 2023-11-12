import React, { useEffect, useState } from "react";
import MedicalHistoryForm from "./MedicalHistoryForm";
import { Button, Col, Container, Modal, Pagination, Row } from "react-bootstrap";
import PatientDataPopup from "./PatientDataPopup";
import "./MedicalHistory.css";
import axios from "axios";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { setSignal } from "../../store/actions/Signal";
import { BiEdit, BiShow, BiTrash } from "react-icons/bi";

const MedicalHistory = () => {
  const signal = useSelector((state) => state.signal);
  const authTokens = JSON.parse(localStorage.getItem("authTokens")) || null;
  const currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patient_name: "",
    date_of_visit: "",
    allergies: "",
    medical_conditions: "",
    dental_conditions: "",
    previous_dental_treatments: "",
    dental_hygiene_habits: "",
    specific_dental_concerns: "",
    image: null,
  });
  const [historyData, setHistoryData] = useState([]);
  const [selectedPatientData, setSelectedPatientData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 7;
  const totalPages = Math.ceil(historyData.length / ITEMS_PER_PAGE);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return historyData.slice(startIndex, endIndex);
  };

  useEffect(() => {
    if (currentUser) {
      axios
        .get(`http://127.0.0.1:8000/medical/history/${currentUser.id}`, {
          headers: {
            Authorization: "Bearer " + authTokens.access,
          },
        })
        .then((response) => {
          setHistoryData(response.data);
        })
        .catch((err) => console.error(err));
    }
  }, [signal, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataWithDoctor = { ...formData, doctor: currentUser.id };

    if (editMode) {
      const formDataWithDoctor = { ...formData, doctor: currentUser.id };
      axios
        .put(`http://127.0.0.1:8000/medical/history/edit/${selectedIndex}`, formDataWithDoctor, {
          headers: {
            Authorization: "Bearer " + authTokens.access,
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          dispatch(setSignal(!signal));
          setErrorMessage("");
          setShowForm(false);
          setEditMode(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post("http://127.0.0.1:8000/medical/history", formDataWithDoctor, {
          headers: {
            Authorization: "Bearer " + authTokens.access,
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          dispatch(setSignal(!signal));

          setErrorMessage("");
          setShowForm(false);
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage(error.response.data.detail);
        });
    }
    setFormData({
      patient_name: "",
      date_of_visit: "",
      allergies: "",
      medical_conditions: "",
      dental_conditions: "",
      previous_dental_treatments: "",
      dental_hygiene_habits: "",
      specific_dental_concerns: "",
      image: null,
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
    setFormData({ ...history, image: null });
    setShowForm(true);
    setErrorMessage("");
    setSelectedIndex(index);
  };

  const confirmRemoval = () => {
    axios
      .delete(`http://127.0.0.1:8000/medical/history/delete/${selectedIndex}`, {
        headers: {
          Authorization: "Bearer " + authTokens.access,
        },
      })
      .then((response) => {
        dispatch(setSignal(!signal));
        setShowConfirmationModal(false);
        setSelectedIndex(null);
      })
      .catch((err) => console.error(err));
  };

  const removePatientData = (index) => {
    setShowConfirmationModal(true);
    setSelectedIndex(index);
  };

  const cancelRemoval = () => {
    setShowConfirmationModal(false);
    setSelectedIndex(null);
  };

  const onHideForm = () => {
    setShowForm(false);
    setEditMode(false);
    setFormData({
      patient_name: "",
      date_of_visit: "",
      allergies: "",
      medical_conditions: "",
      dental_conditions: "",
      previous_dental_treatments: "",
      dental_hygiene_habits: "",
      specific_dental_concerns: "",
      image: null,
    });
  };

  return (
    <div className="medical-history-container" style={{ flex: "1 0 auto" }}>
      <Container>
        <Button onClick={() => setShowForm(true)} className="add-button my-3">
          Add New Dental History +
        </Button>
        <Row className="grid-header">
          <Col className="grid-col col-1">#</Col>
          <Col className="grid-col">Patient Name</Col>
          <Col className="grid-col">Date of Visit</Col>
          <Col className="grid-col">Actions</Col>
        </Row>
        {getCurrentPageData().map((history, index) => (
          <Row key={index} className="grid-row ">
            <Col className="grid-col col-1 border-end border-secondary ">{index + 1}</Col>
            <Col className="grid-col border-end border-secondary ">{history.patient_name}</Col>
            <Col className="grid-col border-end border-secondary ">{history.date_of_visit}</Col>
            <Col className="grid-col gap-2 d-flex ">
              <BiShow onClick={() => showPatientData(history)} className="icon--actions text-info" />
              <BiEdit onClick={() => editPatientData(history, history.id)} className="icon--actions text-warning" />
              <BiTrash onClick={() => removePatientData(history.id)} className="icon--actions text-danger" />
            </Col>
            <hr className="m-0 opacity-100 " />
          </Row>
        ))}
      </Container>
      <Pagination className="justify-content-center my-2 custom-pagination">
        <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </Pagination.Prev>
        {[...Array(totalPages)].map((_, page) => (
          <Pagination.Item key={page + 1} active={currentPage === page + 1} onClick={() => setCurrentPage(page + 1)}>
            {page + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </Pagination.Next>
      </Pagination>

      <Modal show={showForm} onHide={() => onHideForm()} size="xl">
        <Modal.Header closeButton={!editMode}>
          <Modal.Title>
            {editMode ? (
              <h3>
                Edit <span className="text-warning">{formData.patient_name}</span>'s History
              </h3>
            ) : (
              <h3>Add New Dental History</h3>
            )}
          </Modal.Title>
        </Modal.Header>
        <MedicalHistoryForm handleChange={handleChange} handleFileChange={handleFileChange} handleSubmit={handleSubmit} patientData={formData} buttonText={editMode ? "Finish Editing" : "Add New Dental History"} />
        <p className="text-danger">{errorMessage}</p>
      </Modal>

      {selectedPatientData && <PatientDataPopup patientData={selectedPatientData} show={selectedPatientData !== null} onHide={closePatientDataPopup} />}
      <ConfirmationModal show={showConfirmationModal} onHide={cancelRemoval} onConfirm={confirmRemoval} text={"Are you sure you want to delete this history?"} />
    </div>
  );
};

export default MedicalHistory;
