import image from "./Banner.png"
function Container(){
return (
<>
<div className="container-image">
    <img src={image} style={{width:"100%"}}/>
</div>
<div className="banner-text">
    <h1>Welcome To Dentos</h1>
    <h3>Every Smiles Everday</h3>
    <p>--because your smile is our passion</p>
   
</div>

</>
)
}
export default Container;