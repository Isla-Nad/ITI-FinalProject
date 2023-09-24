import Table from "react-bootstrap/Table";
import MedicalHistoryForm from "./MedicalHistoryForm";
import { Button } from "react-bootstrap";
import { useState } from "react";

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
    setHistoryData([...historyData, formData]);

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
  return (
    <div style={{ flex: "1 0 auto", padding: "50px" }}>
      <h2>Submitted Dental History</h2>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>#no</th>
            <th>Patient Name</th>
            <th>Date of Visit</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          {historyData.map((history, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{history.patientName}</td>
              <td>{history.dateOfVisit}</td>
              <td>
                {history.file && (
                  <a href={URL.createObjectURL(history.file)} target="_blank" rel="noopener noreferrer">
                    View File
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showForm ? (
        <MedicalHistoryForm handleChange={handleChange} handleFileChange={handleFileChange} handleSubmit={handleSubmit} patientName={formData.patientName} dateOfVisit={formData.dateOfVisit} allergies={formData.allergies} medicalConditions={formData.medicalConditions} dentalConditions={formData.dentalConditions} previousTreatments={formData.previousTreatments} dentalHygieneHabits={formData.dentalHygieneHabits} specificDentalConcerns={formData.specificDentalConcerns} />
      ) : (
        <Button onClick={() => setShowForm(true)}>Add New Dental History</Button>
      )}
    </div>
  );
};

export default MedicalHistory;
