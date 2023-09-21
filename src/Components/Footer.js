function Footer() {
  return (
    <div className="footer">
      <div className="text text-wite ">
        <i className="fa-solid fa-phone text-white"></i> <h className="text-white">:355462236</h>
      </div>
      <div className="icons">
        <i className="fa-brands fa-facebook fa-xl text-white"></i>
        <i className="fa-brands fa-instagram fa-xl text-white" style={{ paddingLeft: "10px" }}></i>
        <i className="fa-brands fa-twitter fa-xl" style={{ color: "white", paddingLeft: "10px" }}></i>
      </div>
      <p className="text-white" style={{ textAlign: "center", paddingTop: "50px" }}>
        copyright@iti_Dentos
      </p>
    </div>
  );
}

export default Footer;
