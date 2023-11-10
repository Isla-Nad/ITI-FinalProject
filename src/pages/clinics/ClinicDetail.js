import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';


function ClinicDetail() {
  const [clinic, setClinic] = useState([]);
  const [cases, setCases] = useState([]);
  const [images, setImages] = useState([]);
  
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/clinics/show/${id}`)
      .then((response) => {
        setClinic(response.data.clinic);
        setCases(response.data.cases);
        setImages(response.data.images);
        // console.log(response.data)
        
      })
      .catch((err) => console.log(err));
  }, [id]);
  // console.log(clinic)
  // console.log(cases)
  return (
    <>
      <div className="container mt-5">
        <div className="row">
                      <div id="carouselExampleCaptions" class="carousel slide">
                <div class="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                {images.map(myimage => (
                  <div class="carousel-item active">
                    <img src={`http://127.0.0.1:8000${myimage.image}`} style={{height:"50rem",width:"100%"}}class="d-block w-100" alt="..."/>
                    <div class="carousel-caption d-none d-md-block">
                      <h5>{myimage.desc}</h5>
                      
                    </div>
                  </div>
                  ))}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
        </div>
      </div>
      <div className=" mt-5">
        <div>
          <h2 style={{ textAlign: "center" }}>Some of our Cases</h2>
        </div>
        <div className="container">
          <div className="row mt-5">
          {cases.map(mycase => (
                <div className="card col-4 ms-3">
                  <img src={`http://127.0.0.1:8000${mycase.image}`} style={{height:"15rem"}} class="card-img-top" alt="..."/>
                  <div className="card-body">
                    <h5 className="card-title">{mycase.title}</h5>
                    <p className="card-text">{mycase.desc}</p>
                  </div>
            </div>
              ))}
              
                
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="text-center">
          <img src="https://medmaldirect.com/media/1871/meet-our-team-icon.png" />
        </div>
        <div className="row m-5">
          <div className="col-4">
            <div class="card mb-3" style={{ width: "540px" }}>
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="https://media.licdn.com/dms/image/C4D03AQE7YScjLU4qhQ/profile-displayphoto-shrink_800_800/0/1584844567410?e=2147483647&v=beta&t=kfCdZUdTLS654Rtigf8QjpaUXT1DyvbaICarBIonbQg" class="img-fluid rounded-start" alt="..." />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Tom Hanks</h5>
                    <p class="card-text">Bachelor of Oral and Dental Medicine, Ain Shams University... Member of the Egyptian Society for Implant Dentistry... Fellowship in Cosmetic Dentistry - University of Genoa - Italy.</p>
                    <p class="card-text">
                      <small class="text-body-secondary">Last updated 3 mins ago</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-4">
            <div class="card mb-3" style={{ width: "540px" }}>
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="https://demo.cherrytheme.com/gems/wp-content/uploads/2018/11/our-team-04.jpg" class="img-fluid rounded-start" alt="..." />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Sarah Williams</h5>
                    <p class="card-text">Bachelor of Oral and Dental Medicine, Ain Shams University... Member of the Egyptian Society for Implant Dentistry... Fellowship in Cosmetic Dentistry - University of Genoa - Italy.</p>
                    <p class="card-text">
                      <small class="text-body-secondary">Last updated 3 mins ago</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-4">
            <div class="card mb-3" style={{ width: "540px" }}>
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="https://documentapi-fargate-documentbucket-15qi4tpdvnhlz.s3.amazonaws.com/207/e79aaab0-9a91-11ea-84ae-17eede58e6c3.jpg" class="img-fluid rounded-start" alt="..." />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">John Sam</h5>
                    <p class="card-text">Bachelor of Oral and Dental Medicine, Ain Shams University... Member of the Egyptian Society for Implant Dentistry... Fellowship in Cosmetic Dentistry - University of Genoa - Italy</p>
                    <p class="card-text">
                      <small class="text-body-secondary">Last updated 3 mins ago</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="mt-5">
          <h2 style={{ textAlign: "center" }}>Contact us on</h2>
        </div>

        <div className="mt-5 row text-center">
          <div className="col-3 mt-4">
            <a href="">
              <img style={{ width: "10rem", height: "10rem" }} src="https://www.chsica.org/wp-content/uploads/2020/10/Facebook-Logo-PNG-Transparent-Like-17-300x300.png" />
            </a>
          </div>
          <div className="col-3 mt-4">
            <a href="">
              <img style={{ width: "10rem", height: "10rem" }} src="https://img.freepik.com/premium-vector/modern-badge-logo-instagram-icon_578229-124.jpg" />
            </a>
          </div>
          <div className="col-3 mt-4">
            <a href="">
              <img style={{ width: "10rem", height: "10rem" }} src="https://static-00.iconduck.com/assets.00/linkedin-icon-2048x2048-ya5g47j2.png" />
            </a>
          </div>
          <div className="col-3 mt-4">
            <a href="">
              <img style={{ width: "10rem", height: "10rem" }} src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Logo_Twitter.png" />
            </a>
          </div>
        </div>
        <div className="mt-5 row text-center">
          <div className="col-6 mt-4">
            <span>
              <img style={{ width: "10rem", height: "10rem" }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png" />
            </span>
            <span style={{ fontSize: "1.3rem" }}>Our Number : </span>
            <span>0123456789</span>
          </div>
          <div className="col-6 mt-4">
            <span>
              <img style={{ width: "10rem", height: "10rem" }} src="https://cdn.icon-icons.com/icons2/2642/PNG/512/google_map_location_logo_icon_159350.png" />
            </span>
            <span style={{ fontSize: "1.3rem" }}>Our Location : </span>
            <span>6 Ali Mubarak St. Asyut</span>
          </div>
        </div>
      </div>

    </>

  );
}

export default ClinicDetail;
