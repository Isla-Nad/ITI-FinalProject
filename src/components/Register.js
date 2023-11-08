import { useState } from "react";
import { Form, Modal, Pagination, FloatingLabel, Popover, Overlay } from "react-bootstrap";

const Register = (props) => {
  const [errors, setErrors] = useState({});
  const [targets, setTargets] = useState({});

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "firstName":
        if (!value.trim()) {
          newErrors.firstName = "First Name is required";
        } else if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value)) {
          newErrors.firstName = "Please use only alphanumeric characters, starting with a letter or underscore.";
        } else {
          delete newErrors.firstName;
        }
        break;
      case "lastName":
        if (!value.trim()) {
          newErrors.lastName = "Last Name is required";
        } else if (!/^[a-zA-Z_][a-zA-Z0-9_]*/.test(value)) {
          newErrors.lastName = "Please use only alphanumeric characters, starting with a letter or underscore.";
        } else {
          delete newErrors.lastName;
        }
        break;
      case "email":
        if (!value.trim()) {
          newErrors.email = "Email Address is required";
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          newErrors.email = "Please enter a valid email address, like example@example.com.";
        } else {
          delete newErrors.email;
        }
        break;
      case "phone":
        if (!value.trim()) {
          newErrors.phone = "Phone Number is required";
        } else if (!/^01[0-9]{9}$/.test(value)) {
          newErrors.phone = "Phone Number must be a valid Egyptian mobile number";
        } else {
          delete newErrors.phone;
        }
        break;
      case "password":
        if (!value.trim()) {
          newErrors.password = "password required";
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)) {
          newErrors.password = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.";
        } else {
          delete newErrors.password;
        }
        break;
      case "confirmPassword":
        if (value !== props.formData.password) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      case "clinic":
        if (!value.trim()) {
          newErrors.clinic = "Clinic is required";
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
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="firstName" label="First Name" className="mb-3">
              <Form.Control onBlur={() => setTargets((prevTargets) => ({ ...prevTargets, firstName: null }))} className={errors.firstName || !props.formData.firstName ? "is-invalid" : "is-valid"} type="text" name="firstName" value={props.formData.firstName} onChange={handleChange} placeholder="..." required />
              {renderFeedback("firstName")}
            </FloatingLabel>

            <FloatingLabel controlId="lastName" label="Last Name" className="mb-3">
              <Form.Control onBlur={() => setTargets((prevTargets) => ({ ...prevTargets, lastName: null }))} className={errors.lastName || !props.formData.lastName ? "is-invalid" : "is-valid"} type="text" name="lastName" value={props.formData.lastName} onChange={handleChange} placeholder="..." required />
              {renderFeedback("lastName")}
            </FloatingLabel>

            <FloatingLabel controlId="email" label="Email Address" className="mb-3">
              <Form.Control onBlur={() => setTargets((prevTargets) => ({ ...prevTargets, email: null }))} className={errors.email || !props.formData.email ? "is-invalid" : "is-valid"} type="email" name="email" value={props.formData.email} onChange={handleChange} placeholder="..." required />
              {renderFeedback("email")}
            </FloatingLabel>

            <FloatingLabel controlId="phone" label="Phone Number" className="mb-3">
              <Form.Control onBlur={() => setTargets((prevTargets) => ({ ...prevTargets, phone: null }))} className={errors.phone || !props.formData.phone ? "is-invalid" : "is-valid"} type="text" name="phone" value={props.formData.phone} onChange={handleChange} placeholder="..." required />
              {renderFeedback("phone")}
            </FloatingLabel>

            <FloatingLabel controlId="password" label="Password" className="mb-3">
              <Form.Control onBlur={() => setTargets((prevTargets) => ({ ...prevTargets, password: null }))} className={errors.password || !props.formData.password ? "is-invalid" : "is-valid"} type="password" name="password" value={props.formData.password} onChange={handleChange} placeholder="..." required />
              {renderFeedback("password")}
            </FloatingLabel>

            <FloatingLabel controlId="confirmPassword" label="Confirm Password" className="mb-3">
              <Form.Control onBlur={() => setTargets((prevTargets) => ({ ...prevTargets, confirmPassword: null }))} className={errors.confirmPassword || !props.formData.confirmPassword ? "is-invalid" : "is-valid"} type="Password" name="confirmPassword" value={props.formData.confirmPassword} onChange={handleChange} placeholder="..." required />
              {renderFeedback("confirmPassword")}
            </FloatingLabel>

            {props.userType === "doctor" && (
              <FloatingLabel controlId="clinic" label="Clinic" className="mb-3">
                <Form.Control onBlur={() => setTargets((prevTargets) => ({ ...prevTargets, clinic: null }))} className={errors.clinic || !props.formData.clinic ? "is-invalid" : "is-valid"} type="text" name="clinic" value={props.formData.clinic} onChange={handleChange} placeholder="..." required />
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
