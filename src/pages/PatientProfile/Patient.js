import { useEffect, useState } from "react";

function PatientDetails() {
  //   var user = localStorage.getItem("user");
  //   var usr = JSON.parse(user);
  // console.log(usr.name)
  ///////////////////////////
  const [selectedImage, setSelectedImage] = useState(null);

  function saveFunc() {
    var input = document.getElementById("newUsername");
    var input2 = document.getElementById("newEmail");
    // usr.name=input.value
    document.getElementById("username").value = input.value;
    document.getElementById("email").value = input2.value;
    console.log("save clicked");
  }
  var image = "https://bootdey.com/img/Content/avatar/avatar7.png";

  function changeImg(e) {
    // here i try to change image using user input, img src changed but image still as it, later i will try using useEffect
    // console.log(document.getElementById("file").value)
    // var newImg= document.getElementById("file").value
    // var img = document.getElementById("userImg")
    // console.log(newImg)
    // img.setAttribute("src", newImg)
    // console.log("hello from change function")
    // console.log(img.src)
    if (e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  }

  return (
    <>
      <div className="container mb-3 d-flex col-lg-12">
        <div>
          <label htmlFor="imgUpload">
            <img src={selectedImage || image} id="userImg" style={{ cursor: "pointer", width: "100%" }} />
            <input type="file" accept="image/*" id="imgUpload" onChange={changeImg} className="d-none" />
          </label>
        </div>
        <div className="col-lg-10">
          <div>
            {/* <p className="m-2">Edit your data</p> */}
            <div className="mb-3 w-50 m-2">
              <label htmlFor="username" className="form-label">
                Name:
              </label>
              <input type="text" className="form-control" disabled id="username" />
            </div>
            <div className="mb-3 w-50 m-2">
              <label htmlFor="email" className="form-label">
                Email address:
              </label>
              <input type="email" className="form-control" disabled id="email" />
            </div>
            {/* <button className="btn btn-warning m-2" onClick={() => editFunc()}>
              Edit
            </button> */}

            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Edit
            </button>
            {/* <!-- Modal --> */}
            <div className="modal fade w-75 " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Modal title
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  {/* main content */}
                  <div className="mb-3 w-75 m-2">
                    <label htmlFor="newUsername" className="form-label">
                      Name:
                    </label>
                    <input type="text" className="form-control" id="newUsername" />
                  </div>
                  <div className="mb-3 w-75 m-2">
                    <label htmlFor="newEmail" className="form-label">
                      Email address:
                    </label>
                    <input type="email" className="form-control" id="newEmail" />
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                      Close
                    </button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => saveFunc()}>
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <button className="m-2 btn btn-info" onClick={() => saveFunc()}>
              Save
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}
export default PatientDetails;
// All commented code will be deleted in final version
