import pic1 from '../../icons/rating.png'
import pic2 from '../../icons/post.jpg'
import pic3 from '../../icons/free-dentist-appointment-1594336-1348446.png'



function Services(){

 return (
    <div className='iconns1-come  row ' style={{padding:"30px 0px"}}>
     <div className="Icon2-come col-sm-12  col-lg-3 text-center">

  <div className="card-body">
    <img src={pic1} alt="" style={{width:'200px', height:'200px'}}/>
    <h4>You can add comment and rating to your dr</h4>
    
    </div>
    
   
 
</div>
<div className="Icon2-come  col-sm-12 col-lg-3 text-center">
  <div className="card-body">
    <img src={pic2} alt="" style={{width:'200px', height:'200px'}}/>
    <h4>You can add post on website</h4>
    
    </div>
</div>
<div className="Icon3-come  col-sm-12 col-lg-3 text-center">
  <div className="card-body">
    <img src={pic3} alt="" style={{width:'200px', height:'200px'}}/>
    <h4>You can make appointment online</h4>
   
    </div>
</div>


    </div>
 )
}
export default Services;