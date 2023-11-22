import { Button, Container, Form, Modal } from "react-bootstrap";
import translations from "./translations.json";
import { useSelector } from "react-redux";

const PostsForm = (props) => {
  const language = useSelector((state) => state.lang);

  const translate = (key) => {
    return translations[language][key];
  };

  return (
    <Container>
      <Modal show={props.showModal} onHide={props.onHide}>
        <Modal.Header closeButton={props.closeButton}>
          <Modal.Title>{translate("addPostTitle")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={props.handleSubmit} dir={language === "ar" ? "rtl" : ""}>
            <Form.Group controlId="title">
              <Form.Label>{translate("titleLabel")}: </Form.Label>
              <Form.Control type="text" name="title" value={props.post.title} onChange={props.handleChange} required />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>{translate("contentLabel")}: </Form.Label>
              <Form.Control as="textarea" rows={4} name="content" value={props.post.content} onChange={props.handleChange} required />
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>{translate("addMediaLabel")}: </Form.Label>
              <Form.Control type="file" accept=".jpg, .jpeg, .png" onChange={props.handleFileChange} />
            </Form.Group>
          </Form>
          <p className="text-danger">{props.errorMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.handleAddPost}>
            {props.ButtonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PostsForm;
