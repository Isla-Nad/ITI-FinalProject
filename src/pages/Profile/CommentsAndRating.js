import { useEffect, useState } from "react";
import { FaEdit, FaStar, FaTrash, FaUser } from "react-icons/fa";
import { Container, Col, Button, Form, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSignal } from "../../store/actions/Signal";
import ToastCom from "../../components/ToastCom";
import translations from "./translations.json";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const language = useSelector((state) => state.lang);

  const translate = (key) => {
    return translations[language][key];
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/community/reviews/" + props.reviewed_user)
      .then((res) => {
        setComments(res.data);
        console.log(res.data);
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
    if (!currentUser) {
      setShowToast(true);
      setErrorMessage(translate("mustBeLogged"));
      return;
    }
    if (rating === 0 || newComment.body.trim() === "") {
      setError(translate("reviewsError"));
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
      .catch((err) => {
        console.log(err);
        setShowToast(true);
        setErrorMessage(err.response.data.detail);
      });

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
      setUpdateError(translate("reviewsError"));
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
          <Form.Control as="textarea" placeholder={translate("reviewsPlaceHolder")} name="Textcomment" value={newComment.body} onChange={(e) => setNewComment({ ...newComment, body: e.target.value })} />
          <div className="text-center">
            {Array(5)
              .fill()
              .map((_, index) => (
                <FaStar key={index} size={25} style={{ marginRight: "10px", cursor: "pointer" }} color={hoverValue >= index + 1 || rating >= index + 1 ? colors.orange : colors.gray} onClick={() => handleRatingClick(index + 1)} onMouseEnter={() => handleRatingHover(index + 1)} onMouseLeave={() => handleRatingHover(0)} />
              ))}
          </div>
          <Button onClick={handleAddComment} className="w-100 mt-2 adding--button">
            {translate("reviewsButton")}
          </Button>
        </div>
        <h5 className="text-danger">{error}</h5>
        <small>
          {translate("overallRating")}: {comments[0]?.overall_rating}
        </small>
        <Col>
          <ListGroup style={{ marginTop: "20px" }}>
            {comments.map((comment, index) => (
              <ListGroupItem key={index} className="mb-2 ">
                <div className="list-group bg-dark-subtle shadow">
                  <div className=" list-group-item w-100 d-flex gap-2 align-items-center ">
                    <FaUser className="" />
                    {comment.reviewing_user.is_doctor && <h4>{translate("dr")}.</h4>}
                    <h4>
                      {comment.reviewing_user.first_name} {comment.reviewing_user.last_name}
                    </h4>
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
                  {currentUser && comment.review.reviewing_user === currentUser.id && (
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
            <Modal.Title>{translate("remove")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{translate("removeConfirmationComments")}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseRemove}>
              {translate("close")}
            </Button>
            <Button variant="primary" onClick={() => handleRemoveComment()}>
              {translate("confirm")}
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{translate("updateReview")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)", padding: "20px", borderRadius: "5px" }}>
              <Form.Control as="textarea" placeholder={translate("reviewsPlaceHolder")} name="Textcomment" onChange={(e) => setUpdateComment({ ...updateComment, comment: e.target.value })} value={updateComment.comment} />
              <div className="text-center">
                {Array(5)
                  .fill()
                  .map((_, index) => (
                    <FaStar key={index} size={25} style={{ marginRight: "10px", cursor: "pointer" }} color={hoverValue >= index + 1 || rating >= index + 1 ? colors.orange : colors.gray} onClick={() => handleRatingClick(index + 1)} onMouseEnter={() => handleRatingHover(index + 1)} onMouseLeave={() => handleRatingHover(0)} />
                  ))}
              </div>
              <div onClick={handleAddUpdate} className="text-center mt-2" style={{ border: "1px solid gray", padding: "10px 20px", cursor: "pointer", borderRadius: "5px" }}>
                {translate("edit")}
              </div>
              <h4 className="text-danger">{updateError}</h4>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              {translate("close")}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

      <ToastCom
        position="top-start"
        className="text-danger"
        delay={3000}
        showToast={showToast}
        onClose={() => {
          setShowToast(false);
          setErrorMessage("");
        }}
        message={<p className="text-danger">{errorMessage}</p>}
      />
    </>
  );
}

export default CommentsAndRating;
