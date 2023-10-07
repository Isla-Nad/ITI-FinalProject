import axios from "axios";
import React, { useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

function UpdateDoctorProfile(){



    const {id} = useParams();
    const [values,setValues] = useState({
        id : id,
        FirstName : "",
        LastName : "",
        Position : "",
        dentDescription : ""
    })

    useEffect(()=>{
        axios.get("https://api-generator.retool.com/9WmJCF/ddata/"+id)
        .then(res => {
            setValues({
                ...values,
                FirstName : res.data.FirstName,
                LastName : res.data.LastName,
                dentPosition : res.data.dentPosition,
                dentDescription : res.data.dentDescription

                

            })
        })
        
        .catch(err => console.log(err))

    },[])
// console.log(values)

    const navigate = useNavigate()
    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.put("https://api-generator.retool.com/9WmJCF/ddata/"+id,values)
        .then(res => {
            navigate('/DoctorProfile/'+id)
        })
        .catch(err => console.log(err))
    }


    return(
        <>
        <div className="container" style={{height:"100%"}}>
            <div className="row">

                <form onSubmit={handleSubmit}>
                    <div className="">
                        <h1> Edit Profile </h1>
                    </div>
                    <div className="mb-3 mt-5">
                        <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
                        <input value={values.FirstName} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={e => setValues({...values,FirstName:e.target.value})}/>
                        
                    </div>
                    <div className="mb-3 mt-5">
                        <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
                        <input value={values.LastName} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={e => setValues({...values,LastName:e.target.value})}/>
                        
                    </div>
                    <div className="mb-3 mt-5">
                        <label htmlFor="exampleInputEmail1" className="form-label">Position</label>
                        <input value={values.dentPosition} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={e => setValues({...values,dentPosition:e.target.value})}/>
                        
                    </div>
                    <div className="mb-3 mt-5">
                        <label htmlFor="exampleInputEmail1" className="form-label">About the Dentist</label>
                        <input value={values.dentDescription} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={e => setValues({...values,dentDescription:e.target.value})}/>
                        
                    </div>
                    
                    <button type="submit" className="btn btn-success mt-5">Update</button>
                </form>
            </div>
        </div>
        </>
    )
}




export default UpdateDoctorProfile



