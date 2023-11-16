import { Modal, Button } from "react-bootstrap";

function ConfirmationModal(props) {
  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Removal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.text}
        <p className="text-danger">{props.errorMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={props.onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;
