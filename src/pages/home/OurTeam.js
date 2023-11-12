import doctor1 from '../../icons/unnamed.jpg'
import doctor2 from '../../icons/clinic-doctor-image.jpg'
import doctor3 from '../../icons/www.postgrad.jpg'
function OurTeam (){
return (
    <>
    <h1 className='text-center' style={{padding:"30px 0px"}}>Our Team</h1>
   
    <div className='iconns1-come  row ' style={{padding:"30px 0px"}}>
     <div className="Icon2-come col-sm-6  col-lg-3 text-center">

  <div className="card-body">
    <img src={doctor1} alt="" style={{width:'200px', height:'200px'}}/>
    <h1>Stella Smith</h1>
    <p>Unversity of Harved Master of Dentistry</p>
    <i className="fa-brands fa-facebook fa-xl text-dark"></i>
    <i className="fa-brands fa-instagram fa-xl text-dark" style={{paddingLeft:"20px"}}></i>
    <i className="fa-brands fa-twitter fa-xl" style={{color: "black", paddingLeft:"20px"}}></i>
    </div>
    
   
 
</div>
<div className="Icon2-come  col-sm-6 col-lg-3 text-center">
  <div className="card-body">
    <img src={doctor2} alt="" style={{width:'200px', height:'200px'}}/>
    <h1>Justin Smith</h1>
    <p>Unversity of Harved Master of Dentistry</p>
    <i className="fa-brands fa-facebook fa-xl text-dark"></i>
    <i className="fa-brands fa-instagram fa-xl text-dark" style={{paddingLeft:"20px"}}></i>
    <i className="fa-brands fa-twitter fa-xl" style={{color: "black", paddingLeft:"20px"}}></i>
    </div>
</div>
<div className="Icon3-come  col-sm-6 col-lg-3 text-center">
  <div className="card-body">
    <img src={doctor3} alt="" style={{width:'200px', height:'200px'}}/>
    <h1>Diana Rexha </h1>
    <p>Unversity of Harved Master of Dentistry</p>
    <i className="fa-brands fa-facebook fa-xl text-dark"></i>
    <i className="fa-brands fa-instagram fa-xl text-dark" style={{paddingLeft:"20px"}}></i>
    <i className="fa-brands fa-twitter fa-xl" style={{color: "black", paddingLeft:"20px"}}></i>
    </div>
</div>


    </div>

    </>
)
}
export default OurTeam;