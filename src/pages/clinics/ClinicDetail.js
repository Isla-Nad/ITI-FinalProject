function ClinicDetail() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="text text-center mt-5 mb-5">
            <h2 style={{ fontSize: "3rem", color: "darkblue" }} className="mb-5">
              Elegance Dental Clinic
            </h2>
          </div>
          <div className="mt-5">
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src="https://www.designmantic.com/blog/wp-content/uploads/2018/04/Dental-Clinic-Logo-1280x720.png" className="d-block w-100" alt="..." />
                  <div className="carousel-caption d-none d-md-block">
                    <h3>Quality</h3>
                    <p>Here at Elegance DC, We are committed to providing the highest quality of clinical care and personalized service in a warm and compassionate atmosphere. Our doctors and staff enjoy getting to know each patient and their families, and love creating relationships that last multiple generations.</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="https://endetadental.com/wp-content/uploads/2022/02/Endeta-Dental-13.jpeg" className="d-block w-100" alt="..." />
                  <div className="carousel-caption d-none d-md-block">
                    <h3>Equipments and Devices</h3>
                    <p>We use the latest Equipments</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="https://www.spmswiss.com/wp-content/uploads/2019/08/dental-tools.png" className="d-block w-100" alt="..." />
                  <div className="carousel-caption d-none d-md-block">
                    <h3>Hygiene</h3>
                    <p>hygiene and sanitation is a high priority in our clinic, there is no room for germs</p>
                  </div>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-5">
        <div>
          <h2 style={{ textAlign: "center" }}>Some of our Cases</h2>
        </div>
        <div className="row mt-5">
          <div className="row row-cols-1 row-cols-md-2 g-4">
            <div className="col">
              <div className="card m-5">
                <img src="https://www.bangkokdentalimplant.com/wp-content/uploads/2016/01/case-dr-preeda1.jpg" style={{ height: "30rem", width: "100%" }} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title text-center">Dental Implant</h5>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card m-5">
                <img src="https://www.mcintoshdental.co.nz/wp-content/uploads/2015/05/McIntosh-teeth-whitening-1024x683.jpg" style={{ height: "30rem", width: "100%" }} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title text-center">Teeth Whitining</h5>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card m-5">
                <img src="https://carlyleortho.com/wp-content/uploads/2017/02/iStock-165703401.jpg" style={{ height: "30rem", width: "100%" }} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title text-center">Dental Ortho</h5>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card m-5">
                <img src="https://www.maltepedentalclinic.com/wp-content/uploads/2022/03/Dental_bridge_before-after-1024x1024.jpg" style={{ height: "30rem", width: "100%" }} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title text-center">Dental Bridges</h5>
                </div>
              </div>
            </div>
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
