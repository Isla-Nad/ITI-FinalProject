import React, { useState } from "react";
import { Button, Card, FloatingLabel, Form, InputGroup, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CgProfile } from "react-icons/cg";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSignal } from "../../store/actions/Signal";
import ToastCom from "../../components/ToastCom";
import translations from "./translations.json";

const Comments = (props) => {
  const authTokens = JSON.parse(localStorage.getItem("authTokens")) || null;
  const currentUser = useSelector((state) => state.user.user);
  const [formData, setFormData] = useState({ text: "" });
  const [selectedCommentToRemove, setSelectedCommentToRemove] = useState(null);
  const [selectedCommentToEdit, setSelectedCommentToEdit] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const signal = useSelector((state) => state.signal);
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const language = useSelector((state) => state.lang);

  const translate = (key) => {
    return translations[language][key];
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      setShowToast(true);
      setErrorMessage(translate("mustBeLogged"));
      return;
    }
    if (selectedCommentToEdit === null) {
      const newCommentwithUser = { ...formData, user: currentUser.id, post: props.post.id };
      axios
        .post(`http://127.0.0.1:8000/community/posts/${props.post.id}/comments/add/`, newCommentwithUser, {
          headers: {
            Authorization: "Bearer " + String(authTokens.access),
          },
        })

        .then((response) => {
          console.log(response.data);
          dispatch(setSignal(!signal));
        })
        .catch((error) => console.log(error));
    } else {
      const newCommentwithUser = { ...formData, user: currentUser.id, post: props.post.id };
      axios
        .put(`http://127.0.0.1:8000/community/posts/${selectedCommentToEdit.post}/comments/edit/${selectedCommentToEdit.id}/`, newCommentwithUser, {
          headers: {
            Authorization: "Bearer " + String(authTokens.access),
          },
        })

        .then((response) => {
          console.log(response.data);
          dispatch(setSignal(!signal));
          setSelectedCommentToEdit(null);
        })
        .catch((error) => console.log(error));
    }
    setFormData({ text: "" });
  };

  const editComment = (comment) => {
    setSelectedCommentToEdit(comment);
    setFormData(comment);
  };

  const removeComment = (comment) => {
    setShowConfirmationModal(true);
    setSelectedCommentToRemove(comment);
  };

  const confirmRemoval = () => {
    axios
      .delete(`http://127.0.0.1:8000/community/posts/${selectedCommentToRemove.post}/comments/delete/${selectedCommentToRemove.id}/`, {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(setSignal(!signal));
        setShowConfirmationModal(false);
        setSelectedCommentToRemove(null);
      })
      .catch((error) => console.log(error));
  };

  const cancelRemoval = () => {
    setShowConfirmationModal(false);
    setSelectedCommentToRemove(null);
  };

  return (
    <>
      <ListGroup className="list-group-flush">
        {props.post.comments.map((comment, index) => (
          <div key={index}>
            <Card.Header>
              <div className="list-group ">
                <div className=" list-group-item w-100 d-flex gap-2 align-items-center justify-content-between ">
                  <h5 className="d-flex gap-2 align-items-center">
                    <CgProfile />
                    {comment.user.is_doctor && "Dr."} {comment.user.first_name} {comment.user.last_name}
                  </h5>
                  <small>{new Date(comment.created_at).toDateString()}</small>
                </div>
              </div>
            </Card.Header>
            <ListGroup.Item className=" d-flex justify-content-between w-100 ">
              {comment.text}
              {currentUser && comment.user.id == currentUser.id && (
                <div>
                  <Button onClick={() => editComment(comment)} variant="link" className="ms-2">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button onClick={() => removeComment(comment)} variant="link text-danger" className="ms-2">
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              )}
            </ListGroup.Item>
          </div>
        ))}
      </ListGroup>

      <Form onSubmit={onSubmit}>
        <InputGroup className="mt-3">
          <FloatingLabel controlId="floatingTextarea2" label={translate("leaveCommentLabel")}>
            <Form.Control as="textarea" style={{ height: "100px" }} name="text" value={formData.text} onChange={(e) => setFormData({ ...formData, text: e.target.value })} />
          </FloatingLabel>
          <Button type="submit" variant="outline-secondary" style={{ border: "none" }}>
            {selectedCommentToEdit === null ? <FontAwesomeIcon icon={faArrowRight} /> : <span>{translate("saveChanges")}</span>}
          </Button>
        </InputGroup>
      </Form>
      <ToastCom
        delay={3000}
        showToast={showToast}
        onClose={() => {
          setShowToast(false);
          setErrorMessage("");
        }}
        message={errorMessage}
        position="top-start"
        className="text-danger"
      />
      <ConfirmationModal show={showConfirmationModal} onHide={cancelRemoval} onConfirm={confirmRemoval} text={translate("confirmRemoveComment")} />
    </>
  );
};

export default Comments;
