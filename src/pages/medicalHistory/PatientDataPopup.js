import { Modal, Button } from "react-bootstrap";

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
                <strong>Patient Name:</strong> {props.patientData.patientName}
              </p>
              <p>
                <strong>Date of Visit:</strong> {props.patientData.dateOfVisit}
              </p>
              <p>
                <strong>Allergies:</strong> {props.patientData.allergies}
              </p>
              <p>
                <strong>Medical Conditions:</strong> {props.patientData.medicalConditions}
              </p>
              <p>
                <strong>Dental Conditions:</strong> {props.patientData.dentalConditions}
              </p>
              <p>
                <strong>Previous Dental Treatments:</strong> {props.patientData.previousTreatments}
              </p>
            </div>
            <div className="col-md-6">
              <h4>Uploaded File</h4>
              {props.patientData.file && (
                <div className="file-section">
                  <embed src={URL.createObjectURL(props.patientData.file)} type={props.patientData.file.type} className="file-embed w-100" />
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
