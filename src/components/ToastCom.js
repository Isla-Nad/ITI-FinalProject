import { Toast, ToastContainer } from "react-bootstrap";

const ToastCom = (props) => {
  return (
    <ToastContainer className="p-3" style={{ zIndex: 5 }}>
      <Toast onClose={props.setShowToast} show={props.showToast} delay={props.delay} autohide>
        <Toast.Header>
          <strong className="me-auto">Message</strong>
        </Toast.Header>
        <Toast.Body className={props.className}>{props.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastCom;
