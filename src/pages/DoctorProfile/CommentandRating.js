import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Container, Row, Col, Button, Form, ListGroup, ListGroupItem } from "react-bootstrap";

const colors = {
  orange: "#FFBA5A",
  gray: "#a9a9a9",
};

function CommentandRating() {
  const [rating, setRating] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [error, setError] = useState("");

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
  };

  return (
    <Container>
      <div style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)", padding: "20px", borderRadius: "5px" }}>
        <Form.Control as="textarea" placeholder="What is Your Comment" name="Textcomment" value={newPost.body} onChange={(e) => setNewPost({ ...newPost, body: e.target.value })} />
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
                <p>{post.body}</p>
                <Button variant="danger" onClick={() => handleRemovePost(post.id)}>
                  Remove Rating
                </Button>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default CommentandRating;
