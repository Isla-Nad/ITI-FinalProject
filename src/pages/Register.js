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
    ////////////////////
  // useEffect(() => {
  //   // Now you can safely access the updated errors state
  //   const errorsValues = Object.values(errors);
  //   // console.log(errorsValues);
  //   // Check if there are errors and handle accordingly
  //   if (errorsValues.length === 0) {
  //     let existingData = JSON.parse(localStorage.getItem('userRegistration')) || [];

  //     if (!Array.isArray(existingData)) {
  //       existingData = [];
  //     }
  //     // Check for duplicate email
  //     const isDuplicate = existingData.some((data) => data.email === formData.email);
  //     if(isDuplicate)
  //       {
  //         console.log('This Email already Taken')
  //       }
  //       else
  //       {
  //         localStorage.setItem('userRegistration', JSON.stringify(formData));
  //       }
  //   } else {
  //     console.log("There are errors");
  //   }
  // }, [errors]); // This will run whenever the errors state change


  /// register as a doctor or a Patient
  const [role, setRole] = useState('patient'); // Default to 'patient'

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };
  ////////////////////////////////////////////////////////////////////////////////////
  /////////////////////get data and save it in localstorage //////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  function validation(name, email, password) {
    if (!name) {
      alert("Enter Name");
      return false;
    } else if (!email) {
      alert("Enter Email");
      return false;
    } else if (!password) {
      alert("Enter Password");
      return false;
    } else {
      return true;
    }
  }
  ///  work first
  var clinic ="";
  function registerNow() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    try{
       var clinic = document.getElementById("clinic").value;
    }
    catch(error){
      var clinic=""
    }
    var validate = validation(name, email, password);
    //obj contain name, mail, pass
    var obj = {
      name,
      email,
      password,
      clinic,
    };
    if (validate) {
      var getUsers = JSON.parse(localStorage.getItem("users"));
      if (getUsers === null) { // if no users
        var allUsers = [];
        //push data as an obj for every user
        allUsers.push(obj);
        // => stringify to save in localstorage
        localStorage.setItem("users", JSON.stringify(allUsers));
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        // window.location.href = "../Login.html";
      } else {
        allUsers = getUsers; // if already there are users
        var flag = true;  // no push if flag false
        for (var i = 0; i < allUsers.length; i++) {
          // => across over all user to avoid email duplication.
          if (allUsers[i].email === obj.email) {
            alert("Email Already used");
            flag = false;
          }
        }
        //add new user  while flag is true
        if (flag === true) {
          allUsers.push(obj);
          localStorage.setItem("users", JSON.stringify(allUsers));
          document.getElementById("name").value = "";
          // document.getElementById("exampleInputEmail1").value = "";
          // document.getElementById("exampleInputPassword1").value = "";
          // window.location.href = "../Login.html"; //redirect me
        }
      }
    }
  }

//////////////////////////////////////////////

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
                {/* for doctors */}
                {role === 'doctor' && (
                  <>
                  <div className="form-group" >
                  <label>Select an option:</label>
                    <select className="form-control" id="clinic">
                      <option value="">Choose...</option>
                        <option  value='Cilinc 1'>
                          Cilinc 1
                        </option>
                        <option  value='Cilinc 1'>
                          Cilinc 2
                        </option>
                    </select>
                  </div>
                  {/* add an image */}
                  <div className="form-group">
                      <label htmlFor="customFile">Medical Syndicate Card:</label>
                      <input type="file" accept="image/*" className="form-control" id="customFile" />
                  </div>
                  </>
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
                <div className="d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-primary btn-block"v 
                onClick={()=>{registerNow()}}
                >
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
