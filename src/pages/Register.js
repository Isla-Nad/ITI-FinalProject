import React, { useEffect, useState } from 'react';
import Error from '../components/error';
import './register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors,setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // console.log(name,value)
  };

  const validateForm = ()=> {
    const formErrors = {}

    const emailPattern = /^\S+@\S+\.\S+$/;
    if(!emailPattern.test(formData.email))
    {
      formErrors.email = 'Wrong or Invalid email address. Please correct and try again.'
    }

    const passwordPattern = /^.{8,}$/;
    if(!passwordPattern.test(formData.password))
    {
      formErrors.password = 'Minimum 8 characters required'
    }

    // confirm password validation 
    if(formData.password != formData.confirmPassword)
    {
      formErrors.confirmPassword = "Password doesn't match!"
    }
      return formErrors
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // test the 
    setErrors(validateForm())
    const errorsValues =Object.values(errors) ;
    console.log(errorsValues)
    // if (!errorsKeys === 0) {
    //   console.log("NOooo Erorrsssss");
    // }
    // else{
    //   console.log('erroreoreeoreor')
    // }
  };

    // Use useEffect to run code after the state update
  useEffect(() => {
    // Now you can safely access the updated errors state
    const errorsValues = Object.values(errors);
    // console.log(errorsValues);
    // Check if there are errors and handle accordingly
    if (errorsValues.length === 0) {
      localStorage.setItem('userRegistration', JSON.stringify(formData));
    } else {
      console.log("There are errors");
    }
  }, [errors]); // This will run whenever the errors state change


  /// register as a doctor or a Patient
  const [role, setRole] = useState('patient'); // Default to 'patient'

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };
  
  return (
    <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
        <div className="col-md-6 card custom-card">
                <h2 className="text-center">Register</h2>
                <form onSubmit={handleSubmit}  noValidate>
                <div className="form-group">
                      <label>
                        <input
                          type="radio"
                          value="patient"
                          className='form-check-input'
                          checked={role === 'patient'}
                          onChange={handleRoleChange}
                        />
                        Patient
                      </label>
                      <span>&nbsp; &nbsp; &nbsp;</span>
                      <label>
                        <input
                          type="radio"
                          value="doctor"
                          className='form-check-input'
                          checked={role === 'doctor'}
                          onChange={handleRoleChange}
                        />
                        Doctor
                      </label>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email: </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                {errors && <Error error={errors.email} />}
                {role === 'doctor' && (
                  <div className="form-group">
                  <label htmlFor="email">Clinic Name: </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Clinic name"
                    required
                  />
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                  {errors && <Error error={errors.password} />}
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                  />
                  {errors && <Error error={errors.confirmPassword} />}
                </div>
                <div class="d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-primary btn-block">
                  Create Account
                </button>
                </div>
              </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
