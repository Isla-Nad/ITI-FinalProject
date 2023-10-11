import { useEffect, useRef, useState } from "react";
import { Form, Modal, Pagination, FloatingLabel, Popover, Overlay } from "react-bootstrap";
import "./Register.css";

const Register = (props) => {
  const [errors, setErrors] = useState({});
  const [validatedFields, setValidatedFields] = useState({});
  const [targets, setTargets] = useState({});
  const ref = useRef(null);

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };
    const newValidatedFields = { ...validatedFields };

    switch (fieldName) {
      case "firstName":
        if (!value.trim()) {
          newErrors.firstName = "First Name is required";
        } else if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value)) {
          newErrors.firstName = "Please use only alphanumeric characters, starting with a letter or underscore.";
        } else {
          delete newErrors.firstName;
        }
        newValidatedFields.firstName = true;
        break;
      case "lastName":
        if (!value.trim()) {
          newErrors.lastName = "Last Name is required";
        } else if (!/^[a-zA-Z_][a-zA-Z0-9_]*/.test(value)) {
          newErrors.lastName = "Please use only alphanumeric characters, starting with a letter or underscore.";
        } else {
          delete newErrors.lastName;
        }
        newValidatedFields.lastName = true;
        break;
      case "email":
        if (!value.trim()) {
          newErrors.email = "Email Address is required";
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          newErrors.email = "Please enter a valid email address, like example@example.com.";
        } else {
          delete newErrors.email;
        }
        newValidatedFields.email = true;
        break;
      case "phone":
        if (!value.trim()) {
          newErrors.phone = "Phone Number is required";
        } else if (!/^01[0-9]{9}$/.test(value)) {
          newErrors.phone = "Phone Number must be a valid Egyptian mobile number";
        } else {
          delete newErrors.phone;
        }
        newValidatedFields.phone = true;
        break;
      case "password":
        if (!value.trim()) {
          newErrors.password = "password required";
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)) {
          newErrors.password = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.";
        } else {
          delete newErrors.password;
        }
        newValidatedFields.password = true;
        break;
      case "confirmPassword":
        if (value !== props.formData.password) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
        newValidatedFields.confirmPassword = true;
        break;
      case "clinic":
        if (!value.trim()) {
          newErrors.clinic = "Clinic is required";
        } else {
          delete newErrors.clinic;
        }
        newValidatedFields.clinic = true;
        break;
      default:
        break;
    }

    setErrors(newErrors);
    setValidatedFields(newValidatedFields);
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
      setValidatedFields({});
      props.handleSubmit(e);
    }
  };

  const renderFeedback = (fieldName) => {
    if (validatedFields[fieldName]) {
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
    } else {
      return null;
    }
  };

  return (
    <div>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="firstName" label="First Name" className="mb-3" ref={ref}>
              <Form.Control onBlur={() => setTargets((prevTargets) => ({ ...prevTargets, firstName: null }))} className={validatedFields.firstName ? (errors.firstName ? "is-invalid" : "is-valid") : ""} type="text" name="firstName" value={props.formData.firstName} onChange={handleChange} placeholder="..." required />
              {renderFeedback("firstName")}
            </FloatingLabel>

            <FloatingLabel controlId="lastName" label="Last Name" className="mb-3" ref={ref}>
              <Form.Control onBlur={() => setTargets((prevTargets) => ({ ...prevTargets, lastName: null }))} className={validatedFields.lastName ? (errors.lastName ? "is-invalid" : "is-valid") : ""} type="text" name="lastName" value={props.formData.lastName} onChange={handleChange} placeholder="..." required />
              {renderFeedback("lastName")}
            </FloatingLabel>

            <FloatingLabel controlId="email" label="Email Address" className="mb-3" ref={ref}>
              <Form.Control onBlur={() => setTargets((prevTargets) => ({ ...prevTargets, email: null }))} className={validatedFields.email ? (errors.email ? "is-invalid" : "is-valid") : ""} type="email" name="email" value={props.formData.email} onChange={handleChange} placeholder="..." required />
              {renderFeedback("email")}
            </FloatingLabel>

            <FloatingLabel controlId="phone" label="Phone Number" className="mb-3" ref={ref}>
              <Form.Control onBlur={() => setTargets((prevTargets) => ({ ...prevTargets, phone: null }))} className={validatedFields.phone ? (errors.phone ? "is-invalid" : "is-valid") : ""} type="text" name="phone" value={props.formData.phone} onChange={handleChange} placeholder="..." required />
              {renderFeedback("phone")}
            </FloatingLabel>

            <FloatingLabel controlId="password" label="Password" className="mb-3" ref={ref}>
              <Form.Control onBlur={() => setTargets((prevTargets) => ({ ...prevTargets, password: null }))} className={validatedFields.password ? (errors.password ? "is-invalid" : "is-valid") : ""} type="password" name="password" value={props.formData.password} onChange={handleChange} placeholder="..." required />
              {renderFeedback("password")}
            </FloatingLabel>

            <FloatingLabel controlId="confirmPassword" label="Confirm Password" className="mb-3" ref={ref}>
              <Form.Control onBlur={() => setTargets((prevTargets) => ({ ...prevTargets, confirmPassword: null }))} className={validatedFields.confirmPassword ? (errors.confirmPassword ? "is-invalid" : "is-valid") : ""} type="Password" name="confirmPassword" value={props.formData.confirmPassword} onChange={handleChange} placeholder="..." required />
              {renderFeedback("confirmPassword")}
            </FloatingLabel>

            {props.userType === "doctor" && (
              <FloatingLabel controlId="clinic" label="Clinic" className="mb-3" ref={ref}>
                <Form.Control onBlur={() => setTargets((prevTargets) => ({ ...prevTargets, clinic: null }))} className={validatedFields.clinic ? (errors.clinic ? "is-invalid" : "is-valid") : ""} type="text" name="clinic" value={props.formData.clinic} onChange={handleChange} placeholder="..." required />
                {renderFeedback("clinic")}
              </FloatingLabel>
            )}
            <Form.Control type="submit" value="Signup" className="mt-3 btn btn-outline-success" onClick={props.onClick} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Pagination>
            <Pagination.Item active={props.currentPage} onClick={props.handlePageChange}>
              Patient
            </Pagination.Item>
            <Pagination.Item active={props.currentPage2} onClick={props.handlePageChange2}>
              Doctor
            </Pagination.Item>
          </Pagination>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Register;
