import { Button, Container, Form, Modal } from "react-bootstrap";

const PostsForm = (props) => {
  return (
    <Container>
      <Modal show={props.showModal} onHide={props.onHide}>
        <Modal.Header closeButton={props.closeButton}>
          <Modal.Title>Add a Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={props.handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title:</Form.Label>
              <Form.Control type="text" name="title" value={props.posts.title} onChange={props.handleChange} required />
            </Form.Group>

            <Form.Group controlId="body">
              <Form.Label>Body:</Form.Label>
              <Form.Control as="textarea" rows={4} name="body" value={props.posts.body} onChange={props.handleChange} required />
            </Form.Group>

            <Form.Group controlId="file">
              <Form.Label>Add Media:</Form.Label>
              <Form.Control type="file" accept=".pdf, .jpg, .jpeg, .png" onChange={props.handleFileChange} />
            </Form.Group>
          </Form>
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
