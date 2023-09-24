import { Container, Form, Button } from "react-bootstrap";

function MedicalHistoryForm(props) {
  return (
    <Container>
      <Form onSubmit={props.handleSubmit}>
        <Form.Group controlId="patientName">
          <Form.Label>Patient Name:</Form.Label>
          <Form.Control type="text" name="patientName" value={props.patientName} onChange={props.handleChange} required />
        </Form.Group>

        <Form.Group controlId="dateOfVisit">
          <Form.Label>Date of Visit:</Form.Label>
          <Form.Control type="date" name="dateOfVisit" value={props.dateOfVisit} onChange={props.handleChange} required />
        </Form.Group>

        <Form.Group controlId="allergies">
          <Form.Label>Allergies:</Form.Label>
          <Form.Control type="text" name="allergies" value={props.allergies} onChange={props.handleChange} />
        </Form.Group>

        <Form.Group controlId="medicalConditions">
          <Form.Label>Medical Conditions:</Form.Label>
          <Form.Control type="text" name="medicalConditions" value={props.medicalConditions} onChange={props.handleChange} />
        </Form.Group>

        <Form.Group controlId="dentalConditions">
          <Form.Label>Dental Conditions:</Form.Label>
          <Form.Control type="text" name="dentalConditions" value={props.dentalConditions} onChange={props.handleChange} />
        </Form.Group>

        <Form.Group controlId="previousTreatments">
          <Form.Label>Previous Dental Treatments:</Form.Label>
          <Form.Control type="text" name="previousTreatments" value={props.previousTreatments} onChange={props.handleChange} />
        </Form.Group>

        <Form.Group controlId="dentalHygieneHabits">
          <Form.Label>Dental Hygiene Habits:</Form.Label>
          <Form.Control as="textarea" rows={4} name="dentalHygieneHabits" value={props.dentalHygieneHabits} onChange={props.handleChange} />
        </Form.Group>

        <Form.Group controlId="specificDentalConcerns">
          <Form.Label>Specific Dental Concerns:</Form.Label>
          <Form.Control as="textarea" rows={4} name="specificDentalConcerns" value={props.specificDentalConcerns} onChange={props.handleChange} />
        </Form.Group>

        <Form.Group controlId="file">
          <Form.Label>Upload PDF or Image:</Form.Label>
          <Form.Control type="file" accept=".pdf, .jpg, .jpeg, .png" onChange={props.handleFileChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add New Dental History
        </Button>
      </Form>
    </Container>
  );
}

export default MedicalHistoryForm;
