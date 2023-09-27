import { useState } from "react"


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
                < br />
               
                <button type="submit" className="btn btn-info">Login</button>
            </form> 
        </div>

            </>
    )
}
export default Login