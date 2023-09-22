import React, { useState } from 'react';
import Error from '../components/error';


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
      formErrors.email = 'Invalid Email Adress'
    }

    const passwordPattern = /^.{8,}$/;
    if(!passwordPattern.test(formData.password))
    {
      formErrors.password = 'Invalid password'
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
    // console.log(validateForm)
    console.log(errors)
  };

  return (
    <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
        <div className="col-md-6">
            <div className="">
            <div className="">
                <h2 className="text-center">Register</h2>
                <form onSubmit={handleSubmit}  noValidate>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors && <Error error={errors.email} />}
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {errors && <Error error={errors.password} />}
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  {errors && <Error error={errors.confirmPassword} />}
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
