import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import translations from "./translations.json";

function ConfirmationModal(props) {
  const language = useSelector((state) => state.lang);

  const translate = (key) => {
    return translations[language]["confirmationModal"][key];
  };

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{translate("title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.text}
        <p className="text-danger">{props.errorMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          {translate("cancelButton")}
        </Button>
        <Button variant="danger" onClick={props.onConfirm}>
          {translate("confirmButton")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;
