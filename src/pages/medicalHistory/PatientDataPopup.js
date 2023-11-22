import { Modal, Button, Image } from "react-bootstrap";
import translations from "./translations.json";
import { useSelector } from "react-redux";

function PatientDataPopup(props) {
  const language = useSelector((state) => state.lang);

  const translate = (key) => {
    return translations[language][key];
  };

  return (
    <Modal show={props.show} onHide={props.onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>{translate("patientDataTitle")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid" dir={language === "ar" ? "rtl" : ""}>
          <div className="row">
            <div className="col-md-6">
              <h4>{translate("patientInformationTitle")}</h4>
              <p>
                <strong>{translate("patientNameLabel")}</strong> {props.patientData.patient_name}
              </p>
              <p>
                <strong>{translate("dateOfVisitLabel")}</strong> {props.patientData.date_of_visit}
              </p>
              <p>
                <strong>{translate("allergiesLabel")}</strong> {props.patientData.allergies}
              </p>
              <p>
                <strong>{translate("medicalConditionsLabel")}</strong> {props.patientData.medical_conditions}
              </p>
              <p>
                <strong>{translate("dentalConditionsLabel")}</strong> {props.patientData.dental_conditions}
              </p>
              <p>
                <strong>{translate("previousDentalTreatmentsLabel")}</strong> {props.patientData.previous_dental_treatments}
              </p>
            </div>
            <div className="col-md-6">
              <h4>{translate("uploadedImageTitle")}</h4>
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
          {translate("closeButton")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PatientDataPopup;
