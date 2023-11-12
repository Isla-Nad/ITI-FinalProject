import about from '../../icons/about_us.png'
function Aboutus(){
return(
    <>
    <div className='container mt-5' id='about'>
  <div className='row'>
    <div className='col-sm-12 col-lg-6 text-center'>
      <img src={about} alt='' className='img-fluid' style={{width:"600px", height:'500px'}} />
    </div>
    <div className='col-sm-12 col-lg-6 border border-2 border-secondary rounded-1 p-4 py-lg-5'>
      <h1 className='text-center'>About us</h1>
      <p className='fs-4 text-center'>
        Doctor On Demand is the trusted provider of<span style={{color:'aqua'}}> 24/7 </span>virtual healthcare for
        the mind and body, including urgent care, mental health, preventative,
        primary and chronic care, with access to board-certified physicians
        and licensed psychologists through a smartphone, tablet, or computer.
      </p>
    </div>
  </div>
</div>

    </>
)
// < div className=' row   ' style={{display:"flex",justifyContent:"space-evenly",padding:"60px 0px"}} >
//     <div className='image-about col-sm-12  col-lg-3'>
//         <img className='imaage mx-auto d-block  ' src={about} alt='' style={{width:"600px", height:'500px'}}/>

//     </div>
//     <div className='about-text col-sm-11  col-lg-3 ms-5 border border-2 border-seconodary' >
//         <h1 className='text-center'>About us</h1>
//         <p className='fs-4 text-center '>Doctor On Demand is the trusted provider of 24/7 virtual healthcare for 
//         the mind and body, including urgent care, mental health, preventative,
//         primary and chronic care, with access to board-certified physicians 
//         and licensed psychologists through a smartphone, tablet, or computer.</p>

//     </div>
//     </div>
}
export default Aboutus