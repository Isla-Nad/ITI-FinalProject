function PatientDetails (){
            var user = localStorage.getItem("user")
            var usr = JSON.parse(user)
            console.log(usr.name)
            const input = document.getElementById('username');
            const input2 = document.getElementById('email');

            function editFunc(){
                input.removeAttribute('disabled');
                input2.removeAttribute('disabled');
            }
            function saveFunc(){
                input.setAttribute("disabled","false");
                input2.setAttribute("disabled","false");
            }
    return(
        <>
        
        <div className="container mb-3 d-flex col-lg-12">
            <img src="https://bootdey.com/img/Content/avatar/avatar7.png"
            // style={{border:"solid red 2px"}}
            />
            <div className="col-lg-10">
                <div >
                    <p className="m-2">Edit your information:</p>
                    <div className="mb-3 w-50 m-2">
                        <label htmlFor="username" className="form-label">Name: </label>
                        <input type="text" defaultValue={usr.name}  className="form-control" disabled
                        id="username" />
                    </div>
                    <div className="mb-3 w-50 m-2">
                        <label htmlFor="email" className="form-label">Email address:</label>
                        <input type="email" defaultValue={usr.email} className="form-control" disabled
                         id="email" />
                    </div>
                    <button className="btn btn-warning m-2"
                    onClick={()=>editFunc()}
                    >Edit</button> 
                    <button className="m-2 btn btn-info"
                    onClick={()=>saveFunc()}
                    >Save</button>
                </div>
            </div>
        </div>
        </>
    )
}
export default PatientDetails