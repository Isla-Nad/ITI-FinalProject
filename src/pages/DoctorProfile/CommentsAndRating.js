import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Container, Col, Button, Form, ListGroup, ListGroupItem, Modal } from "react-bootstrap";

const colors = {
  orange: "#FFBA5A",
  gray: "#a9a9a9",
};

function CommentsAndRating() {
  const [show, setShow] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ body: "" });
  const [error, setError] = useState("");
  const [updateError, setUpdateError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleShowRemove = () => setShowRemove(true);
  const handleCloseRemove = () => setShowRemove(false);

  const handleClose = () => {
    setShow(false);
    setSelectedIndex(null);
    setNewComment({ body: "" });
  };

  const handleShow = (index, body) => {
    setSelectedIndex(index);
    setNewComment({ body });
    setRating(comments[index].rating);
    setShow(true);
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleRatingHover = (value) => {
    setHoverValue(value);
  };

  const handleAddComment = () => {
    if (rating === 0 || newComment.body.trim() === "") {
      setError("Please provide a rating and a comment before submitting.");
      return;
    }

    // Get the current date and time
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

    const newCommentWithDate = {
      body: newComment.body,
      rating,
      date: formattedDate,
    };

    setComments([newCommentWithDate, ...comments]); // Add the new comment at the beginning of the array
    setNewComment({ body: "" });
    setRating(0);
    setError("");
  };

  const handleRemoveComment = () => {
    const updatedComments = [...comments];
    updatedComments.splice(selectedIndex, 1);
    setComments(updatedComments);
    setShowRemove(false);
    handleClose();
  };

  const handleAddUpdate = () => {
    if (rating === 0 || newComment.body.trim() === "") {
      setUpdateError("Please provide a rating and a comment before submitting.");
      return;
    }

    const updatedComments = [...comments];
    updatedComments[selectedIndex] = {
      body: newComment.body,
      rating,
      date: comments[selectedIndex].date,
    };
    setComments(updatedComments);
    setNewComment({ body: "" });
    setRating(0);
    setUpdateError("");
    handleClose();
  };

  return (
    <>
      <Container>
        <div style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)", padding: "20px", borderRadius: "5px" }}>
          <Form.Control as="textarea" placeholder="What is Your Comment" name="Textcomment" value={newComment.body} onChange={(e) => setNewComment({ ...newComment, body: e.target.value })} />
          <div className="text-center">
            {Array(5)
              .fill()
              .map((_, index) => (
                <FaStar key={index} size={25} style={{ marginRight: "10px", cursor: "pointer" }} color={hoverValue >= index + 1 || rating >= index + 1 ? colors.orange : colors.gray} onClick={() => handleRatingClick(index + 1)} onMouseEnter={() => handleRatingHover(index + 1)} onMouseLeave={() => handleRatingHover(0)} />
              ))}
          </div>
          <div onClick={handleAddComment} className="text-center mt-2" style={{ border: "1px solid gray", padding: "10px 20px", cursor: "pointer", borderRadius: "5px" }}>
            Add Comment
          </div>
        </div>
        <h5 className="text-danger">{error}</h5>
        <Col>
          <ListGroup style={{ marginTop: "20px" }}>
            {comments.map((comment, index) => (
              <ListGroupItem key={index} className="mb-2">
                <small>{comment.date}</small>
                <h2>
                  {Array(comment.rating)
                    .fill()
                    .map((_, i) => (
                      <FaStar key={i} color={colors.orange} />
                    ))}
                </h2>
                <p>{comment.body}</p>
                <Button variant="danger" onClick={() => handleShowRemove(index)}>
                  Remove
                </Button>
                <button className="btn btn-warning" style={{ marginLeft: "10px" }} onClick={() => handleShow(index, comment.body)}>
                  Edit
                </button>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Modal show={showRemove} onHide={handleCloseRemove}>
          <Modal.Header closeButton>
            <Modal.Title>Remove</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to remove the comment?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseRemove}>
              Close
            </Button>
            <Button variant="primary" onClick={handleRemoveComment}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update your rating and comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)", padding: "20px", borderRadius: "5px" }}>
              <Form.Control as="textarea" placeholder="What is Your new Comment" name="Textcomment" onChange={(e) => setNewComment({ ...newComment, body: e.target.value })} value={newComment.body} />
              <div className="text-center">
                {Array(5)
                  .fill()
                  .map((_, index) => (
                    <FaStar key={index} size={25} style={{ marginRight: "10px", cursor: "pointer" }} color={hoverValue >= index + 1 || rating >= index + 1 ? colors.orange : colors.gray} onClick={() => handleRatingClick(index + 1)} onMouseEnter={() => handleRatingHover(index + 1)} onMouseLeave={() => handleRatingHover(0)} />
                  ))}
              </div>
              <div onClick={handleAddUpdate} className="text-center mt-2" style={{ border: "1px solid gray", padding: "10px 20px", cursor: "pointer", borderRadius: "5px" }}>
                Update
              </div>
              <h4 className="text-danger">{updateError}</h4>
            </div>
          </Modal.Body>
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

export default CommentsAndRating;
