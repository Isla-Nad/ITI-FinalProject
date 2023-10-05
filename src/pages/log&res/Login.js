import { useState } from "react";
import { Link } from "react-router-dom";
// import { useHistory } from "react";
function Login(){
    const [userdata, setUserData]= useState({
        mail: "",
        password: ""
    })
     // erroe handling
    const [error, setError]=useState({
        mailError:"",
        passError:""
    })
    // regex
    let reg= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const change=(e)=>{

        if(e.target.name=="mail"){

            setUserData({
                ...userdata,
                mail: e.target.value
            })
            setError({
                ...error,  
                mailError: reg.test(e.target.value)?"":"input valid email"

            })
        }else{
            setUserData({
                ...userdata,
                password: e.target.value 
            })
            setError({
                ...error, 
                passError: e.target.value.length<8&&"min password is 8 character"
            })

        }

    }

    // prevent refresh page
    
   const submit=(e)=>{
    e.preventDefault()   
   }
    reg.test("2asdfffgw2_06fd@sd.com")?console.log("true"):console.log("false");
////////////////////////////// get data from local storage //////////////////////////////
//////////////////////////////////////////////////////////////////////
// const history = useHistory();  waiting to fix it...
function validation(email, password) {
    if (!email) {
      alert("Enter Email");
      return false;
    } else if (!password) {
      alert("Enter Password");
      return false;
    } else {
      return true;
    }
  }
  
  function loginNow() {
    var email = document.getElementById("mail").value;
    var password = document.getElementById("password").value;
    var validate = validation(email, password);
    if (validate) {
      var obj = {
        email,
        password,
      };
  
      var getUsers = JSON.parse(localStorage.getItem("users"));
  
      if (getUsers) {
        var flag = true;
        for (var i = 0; i < getUsers.length; i++) {
          if (
            getUsers[i].email === email &&
            password === getUsers[i].password
          ) {
            localStorage.setItem("user", JSON.stringify(getUsers[i]));
            // history.push('/'); // waiting to fix it... i will use another way temporarily
            window.location.href = "./";

                        flag = false;
          }
        }
        if (flag === true) {
          alert("Invalid Data");
        }
      } else {
        alert("Record end");
      }
    }
  }
  


//////////////////////////////////////////////////////////////////////

    return(
        <>
        
        <div id="content" align="center">
            <form  className="col-sm-6 border col-md-4"
            style={{borderRadius:"5px", padding:"16px", margin:"16px"}}
            onSubmit={(e)=> submit(e)}>

                <h1 className="text-info">welcome back !</h1>
                
                <p  align="left">Email: </p>
                <input type="text" id="mail" 
                value={userdata.mail}
                onChange={ (e) => change(e)}
                className="form-control" name="mail"
                />
                <p  className="text-danger ">{error.mailError}</p>
                < br /> 

                <p  align="left">Password: </p>
                <input type="password" id="password" 
                className="form-control" name="password"
                value={userdata.password}
                onChange={ (e) => change(e)}
                />

                 <p  className="text-danger ">{error.passError}</p>
                <p align="left">not a member? <span className='text-info'> <Link to={"/register"}>register now</Link> </span></p>

                <button type="submit" className="btn btn-info"
                onClick={()=>loginNow()}
                >Login</button>
            </form> 
        </div>

            </>
    )
}
export default Login