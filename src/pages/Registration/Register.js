import { useState } from "react"

function Register(){
    const [userdata, setUserData]= useState({
        name:"",
        mail: "",
        username:"",
        password: "",
        repassword:""
        
    })
     // erroe handling
    const [error, setError]=useState({
        nameError:"",
        mailError:"",
        usernameError:"",
        passwordError:"",
        repasswordError:""
    })

    // regex
     //most popular reg for  emails
    let email_reg= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //this reg accept valid names in english and spaces  and arabic language only--coded by Abdullah Ahmed  --
    let name_reg=/^[A-Za-z\s\u0621-\u064A\u0660-\u0669]+$/ 
    //this reg accept characters and numbers and _ only {6 charachter or more}
    let username_reg=/^[a-zA-Z0-9_]{6,}$/
    //password regex
    let pass_reg=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
    const change=(e)=>
        {

        // name function
            if(e.target.name=="name"){

                setUserData({
                    ...userdata,
                    name: e.target.value
                })
                setError({
                    ...error,  //if there are any pervious error  dont clear them
                    nameError: name_reg.test(e.target.value)?"":"input valid name"

                })
            }
        // email function
            else if(e.target.name=="mail"){

                setUserData({
                    ...userdata,
                    mail: e.target.value
                })
                setError({
                    ...error,  
                    mailError: email_reg.test(e.target.value)?"":"input valid email"

                })
            }
        //username function
            else if(e.target.name=="username"){

                setUserData({
                    ...userdata,
                    username: e.target.value
                })
                setError({
                    ...error,  
                    usernameError: username_reg.test(e.target.value)?"":"input valid username"

                })
            }
        //password function
            else if(e.target.name=="password"){

                setUserData({
                    ...userdata,
                    password: e.target.value
                })
                setError({
                    ...error,  
                    passwordError: pass_reg.test(e.target.value)?"":"create a powerful password 💪"

                })
            }
        //retype password function
            else{
                setUserData({
                    ...userdata,
                    repassword: e.target.value 
                })
                setError({
                    ...error,  //if there are any pervious error  dont clear them
                    repasswordError: e.target.value==userdata.password?"":"passwords are doesnt match!"
                })

            }

        }
   const submit=(e)=>{
    e.preventDefault()    //dont forget ()
   }
   function check(){
    let valu=document.getElementById("valu")

    if(myType.value=="doctor"){
      valu.innerHTML='<span>select your spechialization: </span><select name="spech" id="spech" ><option value="beauty">beauty</option><option value="smile">smile</option><option value="remove">remove</option></select>'
      console.log(valu.innerHTML)

    }
    else{
      // console.log("else from func")
      valu.innerHTML=""
    }
   }
    //catchtype from myType
    let myType=document.getElementById("myType")
           function DP(){
              // console.log("changed")
              // console.log(myType.value)
              check()
            }

            
    return(
        <>
        
        <div id="content" align="center" >
            <form  className="col-6 mb-5" onSubmit={(e)=> submit(e)}>

                <h1 className="text-info" >Registration Form</h1>
        {/* name field */}
                <p  align="left">Name: </p>
                <input type="text" id="name" 
                value={userdata.name}
                onChange={ (e) => change(e)}
                className="form-control" name="name"
                />
                <p  className="text-danger ">{error.nameError}</p>
                
        {/* email field */}
                <p  align="left">Email: </p>
                <input type="text" id="mail" 
                value={userdata.mail}
                onChange={ (e) => change(e)}
                className="form-control" name="mail"
                />
                <p  className="text-danger ">{error.mailError}</p>

                <p  align="left">You are: </p>
                <select name="myType" id="myType"  onChange={()=>DP()} >
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>

                </select>


{/* ///////////////////////// */}
                <div id="valu"> result here:
                < br/>
                </div>



{/* ///////////////////////// */}
        {/* usernamefield */}
                <p  align="left">Username: </p>
                <input type="text" id="username" 
                value={userdata.username}
                onChange={ (e) => change(e)}
                className="form-control" name="username"
                />
                <p  className="text-danger ">{error.usernameError}</p>

        {/* password field */}
                <p  align="left">Password: </p>
                <input type="password" id="password" 
                className="form-control" name="password"
                value={userdata.password}
                onChange={ (e) => change(e)}
                />
                 <p  className="text-danger ">{error.passwordError}</p>

        {/* retype password */}
                <p  align="left">Retype Password: </p>
                <input type="password" id="repassword" 
                className="form-control" name="repassword"
                value={userdata.repassword}
                onChange={ (e) => change(e)}
                />
                 <p  className="text-danger ">{error.repasswordError}</p>
                < br />
                <button type="submit" className="btn btn-info" 
                disabled={error.nameError||error.mailError||error.usernameError||error.passwordError||error.repasswordError?true:false}>register</button>
            </form> 
           
        </div>
          </> )

          
   
}
export default Register
