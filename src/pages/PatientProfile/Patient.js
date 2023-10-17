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
          <button type="button" className="btn btn-secondary m-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Edit personal data
            </button>
            
        </div>
        <div className="col-lg-10">
          <div>
          
            <div id='bio' className="m-3 "/><p className="text-dark"  ><b>About me:</b></p>
              <p className='w-0 border mt-3 p-4' > I am a passionate and creative individual with a strong work ethic and a dedication to excellence. I am always striving to learn new things and to grow as a person.
               I am also a team player and I am always willing to go the extra mile to help my team succeed..
           
            <button type="button" className="btn btn-alert float-end mt-1" data-bs-toggle="modal" data-bs-target="#edit_bio">
              Edit bio
            </button>
            </p> <hr/>
            {/* checkouts:  */}
            <div className="m-3 "/><p className="text-dark"  ><b>My appointments:</b></p>
              <p className='w-0 border mt-3 p-4 center' > No upcomeing appointments!
            </p> <hr/>
            <div/>
            {/* <!-- Modal --> */}
            <div className="modal fade w-75 " id="edit_bio" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                    <textarea className="form-control"></textarea>
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
            <div/>
            
            
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
// All commented code will be deleted in final versionimport { useEffect, useState } from "react";

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
          <button type="button" className="btn btn-secondary m-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Edit personal data
            </button>
            
        </div>
        <div className="col-lg-10">
          <div>
          
            <div id='bio' className="m-3 "/><p className="text-dark"  ><b>About me:</b></p>
              <p className='w-0 border mt-3 p-4' > I am a passionate and creative individual with a strong work ethic and a dedication to excellence. I am always striving to learn new things and to grow as a person.
               I am also a team player and I am always willing to go the extra mile to help my team succeed..
           
            <button type="button" className="btn btn-alert float-end mt-1" data-bs-toggle="modal" data-bs-target="#edit_bio">
              Edit bio
            </button>
            </p> <hr/>
            {/* checkouts:  */}
            <div className="m-3 "/><p className="text-dark"  ><b>My appointments:</b></p>
              <p className='w-0 border mt-3 p-4 center' > No upcomeing appointments!
            </p> <hr/>
            <div/>
            {/* <!-- Modal --> */}
            <div className="modal fade w-75 " id="edit_bio" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                    <textarea className="form-control"></textarea>
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
            <div/>
            
            
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
