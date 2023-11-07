import React, { useState } from "react";
import { Button, Card, FloatingLabel, Form, InputGroup, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CgProfile } from "react-icons/cg";
import ConfirmationModal from "../../components/ConfirmationModal";

const Comments = () => {
  const [formData, setFormData] = useState("");
  const [comments, setComments] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (editIndex === null) {
      setComments([...comments, formData]);
    } else {
      const updatedComments = [...comments];
      updatedComments[editIndex] = formData;
      setComments(updatedComments);
      setEditIndex(null);
    }
    setFormData("");
  };

  const editComment = (index) => {
    setEditIndex(index);
    setFormData(comments[index]);
  };

  const removeComment = (index) => {
    setShowConfirmationModal(true);
    setSelectedIndex(index);
  };

  const confirmRemoval = () => {
    const updatedComments = [...comments];
    updatedComments.splice(selectedIndex, 1);
    setComments(updatedComments);

    setShowConfirmationModal(false);
    setSelectedIndex(null);
  };

  const cancelRemoval = () => {
    setShowConfirmationModal(false);
    setSelectedIndex(null);
  };

  return (
    <>
      <ListGroup className="list-group-flush">
        {comments.map((comment, index) => (
          <>
            <Card.Header>
              <CgProfile /> email, date
            </Card.Header>
            <ListGroup.Item key={index} className=" d-flex justify-content-between w-100 ">
              {comment}
              <div>
                <Button onClick={() => editComment(index)} variant="link" className="ms-2">
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button onClick={() => removeComment(index)} variant="link text-danger" className="ms-2">
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </div>
            </ListGroup.Item>
          </>
        ))}
      </ListGroup>

      <Form onSubmit={onSubmit}>
        <InputGroup className="mt-3">
          <FloatingLabel controlId="floatingTextarea2" label="Leave a comment here">
            <Form.Control as="textarea" style={{ height: "100px" }} name="comment" value={formData} onChange={(e) => setFormData(e.target.value)} autoFocus />
          </FloatingLabel>
          <Button type="submit" variant="outline-secondary" style={{ border: "none" }}>
            {editIndex === null ? <FontAwesomeIcon icon={faArrowRight} /> : <span>Save Edit</span>}
          </Button>
        </InputGroup>
      </Form>

      <ConfirmationModal show={showConfirmationModal} onHide={cancelRemoval} onConfirm={confirmRemoval} text="Are you sure you want to remove this comment?" />
    </>
  );
};

export default Comments;
