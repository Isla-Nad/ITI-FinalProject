import { Toast, ToastContainer } from "react-bootstrap";
import { useSelector } from "react-redux";

const ToastCom = (props) => {
  const language = useSelector((state) => state.lang);

  return (
    <ToastContainer position={props.position} className="p-3" style={{ zIndex: 5 }}>
      <Toast onClose={props.onClose} show={props.showToast} delay={props.delay} autohide>
        <Toast.Header>
          <strong className="me-auto">{language === "en" ? "Message" : "رسالة"}</strong>
        </Toast.Header>
        <Toast.Body className={props.className}>{props.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastCom;
