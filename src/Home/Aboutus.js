import about from './icons/hero.jpg'
function Aboutus(){
return(
    < div className=' row ' style={{display:"flex",justifyContent:"space-evenly",padding:"60px 0px"}} >
    <div className='image-about col-sm-12  col-lg-3'>
        <img  src={about} alt='' style={{width:"400px", height:'500px'}}/>

    </div>
    <div className='about-text col-sm-12  col-lg-3 ' >
        <h1>About us</h1>
        <p >Doctor On Demand is the trusted provider of 24/7 virtual healthcare for the mind and body, including urgent care, mental health, preventative, primary and chronic care, with access to board-certified physicians and licensed psychologists through a smartphone, tablet, or computer.</p>

    </div>
    </div>
)

}
export default Aboutus