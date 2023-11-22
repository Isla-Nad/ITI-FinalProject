import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Modal, Pagination, FloatingLabel, Popover, Overlay } from "react-bootstrap";
import { useSelector } from "react-redux";
import translations from "./translations.json";

const Register = (props) => {
  const [errors, setErrors] = useState({});
  const [clinics, setClinics] = useState([]);
  const [targets, setTargets] = useState({});
  const language = useSelector((state) => state.lang);

  const translate = (key) => {
    return translations[language]["register"][key];
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/clinics/")
      .then((response) => setClinics(response.data.clinics))
      .catch((err) => console.log(err));
  }, []);

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "first_name":
        if (!value.trim()) {
          newErrors.first_name = translate("firstNameRequired");
        } else if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value)) {
          newErrors.first_name = translate("alphanumeric");
        } else {
          delete newErrors.first_name;
        }
        break;
      case "last_name":
        if (!value.trim()) {
          newErrors.last_name = translate("lastNameRequired");
        } else if (!/^[a-zA-Z_][a-zA-Z0-9_]*/.test(value)) {
          newErrors.last_name = translate("alphanumeric");
        } else {
          delete newErrors.last_name;
        }
        break;
      case "email":
        if (!value.trim()) {
          newErrors.email = translate("emailRequired");
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          newErrors.email = translate("emailErrors");
        } else {
          delete newErrors.email;
        }
        break;
      case "phone":
        if (!value.trim()) {
          newErrors.phone = translate("phoneRequired");
        } else if (!/^01[0-9]{9}$/.test(value)) {
          newErrors.phone = translate("phoneErrors");
        } else {
          delete newErrors.phone;
        }
        break;
      case "password":
        if (!value.trim()) {
          newErrors.password = translate("passwordRequired");
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)) {
          newErrors.password = translate("passwordCriteria");
        } else {
          delete newErrors.password;
        }
        break;
      case "confirm_password":
        if (value !== props.formData.password) {
          newErrors.confirm_password = translate("passwordMismatch");
        } else {
          delete newErrors.confirm_password;
        }
        break;
      case "clinic":
        if (!value.trim()) {
          newErrors.clinic = translate("clinicRequired");
        } else {
          delete newErrors.clinic;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    props.handleChange(e);

    validateField(name, value);
    setTargets((prevTargets) => ({
      ...prevTargets,
      [name]: e.target,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formIsValid = Object.keys(errors).length === 0;
    if (formIsValid) {
      props.handleSubmit(e);
    }
  };

  const renderFeedback = (fieldName) => {
    if (errors[fieldName]) {
      return (
        <Overlay show={true} target={targets[fieldName]} rootClose={true} placement="top">
          <Popover id="popover-contained">
            <Popover.Header as="h3" className="text-danger">
              {errors[fieldName]}
            </Popover.Header>
          </Popover>
        </Overlay>
      );
    } else {
      return (
        <Overlay show={true} target={targets[fieldName]} rootClose={true} placement="top">
          <Popover id="popover-contained">
            <Popover.Header as="h3" className="text-success">
              Looks good!
            </Popover.Header>
          </Popover>
        </Overlay>
      );
    }
  };

  return (
    <div>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{translate("title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="first_name" label={translate("firstName")} className="mb-3">
              <Form.Control onBlur={() => setTargets((prevTargets) => ({ ...prevTargets, first_name: null }))} className={errors.first_name || !props.formData.first_name ? "is-invalid" : "is-valid"} type="text" name="first_name" value={props.formData.first_name} onChange={handleChange} placeholder="..." required />
              {renderFeedback("first_name")}
            </FloatingLabel>

            <FloatingLabel controlId="last_name" label={translate("lastName")} className="mb-3">
              <Form.Control onBlur={() => setTargets((prevTargets) => ({ ...prevTargets, last_name: null }))} className={errors.last_name || !props.formData.last_name ? "is-invalid" : "is-valid"} type="text" name="last_name" value={props.formData.last_name} onChange={handleChange} placeholder="..." required />
              {renderFeedback("last_name")}
            </FloatingLabel>

            <FloatingLabel controlId="email" label={translate("email")} className="mb-3">
              <Form.Control onBlur={() => setTargets((prevTargets) => ({ ...prevTargets, email: null }))} className={errors.email || !props.formData.email ? "is-invalid" : "is-valid"} type="email" name="email" value={props.formData.email} onChange={handleChange} placeholder="..." required />
              {renderFeedback("email")}
            </FloatingLabel>

            <FloatingLabel controlId="phone" label={translate("phone")} className="mb-3">
              <Form.Control onBlur={() => setTargets((prevTargets) => ({ ...prevTargets, phone: null }))} className={errors.phone || !props.formData.phone ? "is-invalid" : "is-valid"} type="text" name="phone" value={props.formData.phone} onChange={handleChange} placeholder="..." required />
              {renderFeedback("phone")}
            </FloatingLabel>

            <FloatingLabel controlId="password" label={translate("password")} className="mb-3">
              <Form.Control onBlur={() => setTargets((prevTargets) => ({ ...prevTargets, password: null }))} className={errors.password || !props.formData.password ? "is-invalid" : "is-valid"} type="password" name="password" value={props.formData.password} onChange={handleChange} placeholder="..." required />
              {renderFeedback("password")}
            </FloatingLabel>

            <FloatingLabel controlId="confirm_password" label={translate("confirmPassword")} className="mb-3">
              <Form.Control onBlur={() => setTargets((prevTargets) => ({ ...prevTargets, confirm_password: null }))} className={errors.confirm_password || !props.formData.confirm_password ? "is-invalid" : "is-valid"} type="Password" name="confirm_password" value={props.formData.confirm_password} onChange={handleChange} placeholder="..." required />
              {renderFeedback("confirm_password")}
            </FloatingLabel>

            {props.formData.is_doctor && (
              <FloatingLabel controlId="clinic" label={translate("clinic")} className="mb-3">
                <Form.Select onBlur={() => setTargets((prevTargets) => ({ ...prevTargets, clinic: null }))} name="clinic" value={props.formData.clinic} onChange={handleChange} required>
                  <option value="" disabled>
                    {translate("selectClinic")}
                  </option>
                  {clinics.map((clinic) => (
                    <option key={clinic.id} value={clinic.id}>
                      {clinic.name}
                    </option>
                  ))}
                </Form.Select>
                {renderFeedback("clinic")}
              </FloatingLabel>
            )}
            <Form.Control type="submit" value={translate("signup")} className="mt-3 btn btn-outline-success" onClick={props.onClick} />
            {props.errorMessage}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Pagination>
            <Pagination.Item active={props.currentPage} onClick={props.handlePageChange}>
              {translate("patient")}
            </Pagination.Item>
            <Pagination.Item active={props.currentPage2} onClick={props.handlePageChange2}>
              {translate("doctor")}
            </Pagination.Item>
          </Pagination>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Register;
