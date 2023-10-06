import {  useState} from "react";
import { FaStar } from "react-icons/fa";
import { Container, Row, Col, Button, Form, ListGroup, ListGroupItem ,Modal} from "react-bootstrap";
import { faL } from "@fortawesome/free-solid-svg-icons";

const colors = {
  orange: "#FFBA5A",
  gray: "#a9a9a9",
};

function CommentandRating() {
  const [show, setShow] = useState(false);
  const [showRemove, setShowrmove] = useState(false);

  const [rating, setRating] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [error, setError] = useState("");
  const [Updaterror,setUpdateerror]=useState(null)
  const [updateScucces,setUpdatescucces]=useState()
  const [selectindex,setSelectindex]=useState(null)
  const [upatecomment,setUpdatecomment]=useState()

  const handleCloseremove = () => setShowrmove(false);
  const handleShowremove = () => setShowrmove(true);

  const handleClose = () => {
    
    setShow(false)};
  function  handleShow(postId) {
  let com=document.getElementById("posts")
  let text=document.getElementById("textareaa")
  console.log(com.innerHTML)
  // com.innerHTML=text.innerHTML
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts); 
    
    setUpdatescucces("")
    setShow(true)};

  

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleRatingHover = (value) => {
    setHoverValue(value);
  };

  const handleAddPost = () => {
    if (rating === 0 || newPost.body.trim() === "") {
      setError("Please provide a rating and a comment before submitting.");
     
      return;
    }

    setPosts([...posts, { ...newPost, id: Date.now(), rating }]);
    
    setNewPost({ title: "", body: "" });
    setRating(0);
    setError("");
  };

  const handleRemovePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    setShowrmove(false)
    
  };
  
  const handleAddupdate=()=>{
   
    if (rating === 0 || newPost.body.trim() === "") {
      setUpdateerror("Please provide a rating and a comment before submitting.");
      return;
    }
    
      
   else
    setPosts([...posts, { ...newPost, id: Date.now(), rating }]);
    setNewPost({ title: "", body: "" });
    setRating(0);
    setUpdateerror("");
    setUpdatescucces("Update Sucesss")
    
    
      
  }

  return (
    <>
    <Container>
      <div style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)", padding: "20px", borderRadius: "5px" }}>
        <Form.Control as="textarea" placeholder="What is Your Comment"  name="Textcomment" value={newPost.body} onChange={(e) => setNewPost({ ...newPost, body: e.target.value })} />
        <div className="text-center">
          {Array(5)
            .fill()
            .map((_, index) => (
              <FaStar key={index} size={25} style={{ marginRight: "10px", cursor: "pointer" }} color={hoverValue >= index + 1 || rating >= index + 1 ? colors.orange : colors.gray} onClick={() => handleRatingClick(index + 1)} onMouseEnter={() => handleRatingHover(index + 1)} onMouseLeave={() => handleRatingHover(0)} />
            ))}
        </div>
        <div onClick={handleAddPost} className="text-center mt-2" style={{ border: "1px solid gray", padding: "10px 20px", cursor: "pointer", borderRadius: "5px" }}>
          Add Comment
        </div>
      </div>
      <h5 className="text-danger">{error}</h5>
      <Row>
        <Col>
          <ListGroup style={{ marginTop: "20px" }}>
            {posts.map((post) => (
              <ListGroupItem key={post.id}>
                <h2>
                  {Array(post.rating)
                    .fill()
                    .map((_, i) => (
                      <FaStar key={i} color={colors.orange} />
                    ))}
                </h2>
                <p id="posts">{post.body}</p>
                <Button variant="danger" onClick={() => handleShowremove(post.id)}>
                  Remove Rating
                </Button>
                <Modal show={showRemove} onHide={handleCloseremove}>
        <Modal.Header closeButton>
          <Modal.Title>Remove rating</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to remove rating?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseremove}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleRemovePost(post.id)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
 
 
 
                <button className="btn btn-primary" style={{marginLeft:"10px"}} onClick={()=>handleShow(post.id,post.body)}>Edit</button>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
     <Modal.Header closeButton>
       <Modal.Title>Update your rating and comment</Modal.Title>
     </Modal.Header>
     <Modal.Body >   <div style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)", padding: "20px", borderRadius: "5px" }}>
        <Form.Control as="textarea" placeholder="What is Your new Comment" id="textareaa" name="Textcomment"   onChange={(e) => setNewPost({ ...newPost, body: e.target.value })} />
        <div className="text-center">
          {Array(5)
            .fill()
            .map((_, index) => (
              <FaStar key={index} size={25} style={{ marginRight: "10px", cursor: "pointer" }} color={hoverValue >= index + 1 || rating >= index + 1 ? colors.orange : colors.gray} onClick={() => handleRatingClick(index + 1)} onMouseEnter={() => handleRatingHover(index + 1)} onMouseLeave={() => handleRatingHover(0)} />
            ))}
        </div>
        <div onClick={()=>handleAddupdate()} className="text-center mt-2" style={{ border: "1px solid gray", padding: "10px 20px", cursor: "pointer", borderRadius: "5px" }}>
         Update
        </div>
        <h4 className="text-danger">{Updaterror}</h4>
        <h4 className="text-primary">{updateScucces}</h4>
      </div></Modal.Body>
     <Modal.Footer>
       <Button variant="danger" onClick={handleClose}>
         Close
       </Button>
       
       
     </Modal.Footer>
   </Modal>
   
    </Container>
  
 
   </>
  );
}

export default CommentandRating;
