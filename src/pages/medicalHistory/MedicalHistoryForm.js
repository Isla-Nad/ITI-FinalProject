import { Container, Form, Button } from "react-bootstrap";
import translations from "./translations.json";
import { useSelector } from "react-redux";

function MedicalHistoryForm(props) {
  const language = useSelector((state) => state.lang);

  const translate = (key) => {
    return translations[language][key];
  };

  return (
    <Container dir={language === "ar" ? "rtl" : ""}>
      <Form onSubmit={props.handleSubmit}>
        <Form.Group controlId="patient_name">
          <Form.Label>{translate("patientNameLabel")}</Form.Label>
          <Form.Control type="text" name="patient_name" value={props.patientData.patient_name} onChange={props.handleChange} required />
        </Form.Group>

        <Form.Group controlId="date_of_visit">
          <Form.Label>{translate("dateOfVisitLabel")}</Form.Label>
          <Form.Control type="date" name="date_of_visit" value={props.patientData.date_of_visit} onChange={props.handleChange} required />
        </Form.Group>

        <Form.Group controlId="allergies">
          <Form.Label>{translate("allergiesLabel")}</Form.Label>
          <Form.Control type="text" name="allergies" value={props.patientData.allergies} onChange={props.handleChange} />
        </Form.Group>

        <Form.Group controlId="medical_conditions">
          <Form.Label>{translate("medicalConditionsLabel")}</Form.Label>
          <Form.Control type="text" name="medical_conditions" value={props.patientData.medical_conditions} onChange={props.handleChange} />
        </Form.Group>

        <Form.Group controlId="dental_conditions">
          <Form.Label>{translate("dentalConditionsLabel")}</Form.Label>
          <Form.Control type="text" name="dental_conditions" value={props.patientData.dental_conditions} onChange={props.handleChange} />
        </Form.Group>

        <Form.Group controlId="previous_dental_treatments">
          <Form.Label>{translate("previousDentalTreatmentsLabel")}</Form.Label>
          <Form.Control type="text" name="previous_dental_treatments" value={props.patientData.previous_dental_treatments} onChange={props.handleChange} />
        </Form.Group>

        <Form.Group controlId="dental_hygiene_habits">
          <Form.Label>{translate("dentalHygieneHabitsLabel")}</Form.Label>
          <Form.Control as="textarea" rows={4} name="dental_hygiene_habits" value={props.patientData.dental_hygiene_habits} onChange={props.handleChange} />
        </Form.Group>

        <Form.Group controlId="specific_dental_concerns">
          <Form.Label>{translate("specificDentalConcernsLabel")}</Form.Label>
          <Form.Control as="textarea" rows={4} name="specific_dental_concerns" value={props.patientData.specific_dental_concerns} onChange={props.handleChange} />
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>{translate("uploadImageLabel")}</Form.Label>
          <Form.Control type="file" name="image" accept=".jpg, .jpeg, .png" onChange={props.handleFileChange} />
        </Form.Group>

        <Button variant="primary" type="submit" className="my-3">
          {props.buttonText}
        </Button>
      </Form>
    </Container>
  );
}

export default MedicalHistoryForm;
