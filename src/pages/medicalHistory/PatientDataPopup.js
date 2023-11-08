import { Modal, Button, Image } from "react-bootstrap";

function PatientDataPopup(props) {
  return (
    <Modal show={props.show} onHide={props.onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Patient Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <h4>Patient Information</h4>
              <p>
                <strong>Patient Name:</strong> {props.patientData.patient_name}
              </p>
              <p>
                <strong>Date of Visit:</strong> {props.patientData.date_of_visit}
              </p>
              <p>
                <strong>Allergies:</strong> {props.patientData.allergies}
              </p>
              <p>
                <strong>Medical Conditions:</strong> {props.patientData.medical_conditions}
              </p>
              <p>
                <strong>Dental Conditions:</strong> {props.patientData.dental_conditions}
              </p>
              <p>
                <strong>Previous Dental Treatments:</strong> {props.patientData.previous_dental_treatments}
              </p>
            </div>
            <div className="col-md-6">
              <h4>Uploaded Image</h4>
              {props.patientData.image && (
                <div className="file-section">
                  <Image src={`http://localhost:8000${props.patientData.image}`} alt="" className="patient-picture file-embed w-100" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PatientDataPopup;
