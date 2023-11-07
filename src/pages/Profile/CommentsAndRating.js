import { useEffect, useState } from "react";
import { FaEdit, FaStar, FaTrash, FaUser } from "react-icons/fa";
import { Container, Col, Button, Form, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSignal } from "../../store/actions/Signal";

const colors = {
  orange: "#FFBA5A",
  gray: "#a9a9a9",
};

function CommentsAndRating(props) {
  const authTokens = JSON.parse(localStorage.getItem("authTokens")) || null;
  const currentUser = useSelector((state) => state.user.user);
  const [show, setShow] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ body: "" });
  const [updateComment, setUpdateComment] = useState({});
  const [error, setError] = useState("");
  const [updateError, setUpdateError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const signal = useSelector((state) => state.signal);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/community/reviews/" + props.reviewed_user)
      .then((res) => {
        console.log(res.data);
        setComments(res.data);
      })
      .catch((err) => console.log(err));
  }, [signal]);

  const handleShowRemove = (id) => {
    setShowRemove(true);
    setSelectedIndex(id);
  };
  const handleCloseRemove = () => setShowRemove(false);

  const handleClose = () => {
    setShow(false);
    setSelectedIndex(null);
    setNewComment({ body: "" });
  };

  const handleShowUpdate = (comment) => {
    setUpdateComment(comment);
    setRating(comment.rating);
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

    const newCommentWithDate = {
      reviewed_user: props.reviewed_user,
      reviewing_user: currentUser.id,
      comment: newComment.body,
      rating: rating,
    };
    axios
      .post("http://127.0.0.1:8000/community/reviews/add/", newCommentWithDate, {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(setSignal(!signal));
      })
      .catch((err) => console.log(err));

    setNewComment({ body: "" });
    setRating(0);
    setError("");
  };

  const handleRemoveComment = () => {
    axios
      .delete("http://127.0.0.1:8000/community/reviews/delete/" + selectedIndex, {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(setSignal(!signal));
      })
      .catch((err) => {
        console.log(err.response.data.detail);
        setError(err.response.data.detail);
      });
    setShowRemove(false);
    handleClose();
  };

  const handleAddUpdate = () => {
    if (rating === 0 || updateComment.comment.trim() === "") {
      setUpdateError("Please provide a rating and a comment before submitting.");
      return;
    }
    const newCommentWithDate = {
      reviewed_user: props.reviewed_user,
      reviewing_user: currentUser.id,
      comment: updateComment.comment,
      rating: rating,
    };
    axios
      .put(`http://127.0.0.1:8000/community/reviews/edit/${updateComment.id}`, newCommentWithDate, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(setSignal(!signal));
      })
      .catch((err) => console.log(err));

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
          <Button onClick={handleAddComment} className=" w-100  mt-2" variant="outline-dark">
            Add Comment
          </Button>
        </div>
        <h5 className="text-danger">{error}</h5>

        <Col>
          <ListGroup style={{ marginTop: "20px" }}>
            {comments.map((comment, index) => (
              <ListGroupItem key={index} className="mb-2 ">
                <div className="list-group bg-dark-subtle shadow">
                  <div className=" list-group-item w-100 d-flex gap-2 align-items-center ">
                    <FaUser className="" />
                    <h4>{comment.reviewing_user.first_name}</h4>
                  </div>
                  <small className="text-muted">{new Date(comment.review.created_at).toDateString()}</small>
                </div>

                <div className="star-rating mt-2">
                  {Array(comment.review.rating)
                    .fill()
                    .map((_, i) => (
                      <FaStar key={i} color="gold" />
                    ))}
                </div>
                <p className="mt-2">{comment.review.comment}</p>
                <div className="d-flex justify-content-end">
                  {comment.review.reviewing_user === currentUser.id && (
                    <>
                      <Button variant="outline-danger" className=" border-0 " size="sm" onClick={() => handleShowRemove(comment.review.id)}>
                        <FaTrash />
                      </Button>
                      <Button variant="outline-warning" size="sm" className="ml-2 border-0" onClick={() => handleShowUpdate(comment.review)}>
                        <FaEdit />
                      </Button>
                    </>
                  )}
                </div>
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
            <Button variant="primary" onClick={() => handleRemoveComment()}>
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
              <Form.Control as="textarea" placeholder="What is Your new Comment" name="Textcomment" onChange={(e) => setUpdateComment({ ...updateComment, comment: e.target.value })} value={updateComment.comment} />
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
