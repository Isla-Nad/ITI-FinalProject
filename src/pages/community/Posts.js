import { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import CommunityForm from "./CommunityForm";
import { CgProfile } from "react-icons/cg";
import "./Posts.css";
import ConfirmationModal from "../medicalHistory/ConfirmationModal";
import Comments from "./Comments";
import { AiFillLike } from "react-icons/ai";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", body: "", file: null });
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [like, setLike] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewPost({ ...newPost, file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      const updatedPosts = [...posts];
      updatedPosts[selectedIndex] = newPost;
      setPosts(updatedPosts);
      setShowModal(false);
      setEditMode(false);
      setSelectedIndex(null);
    } else {
      setPosts([...posts, { ...newPost, id: Date.now() }]);
    }
    setNewPost({ title: "", body: "", file: posts.file });
    setShowModal(false);
  };

  const editPost = (post, index) => {
    setEditMode(true);
    setShowModal(true);
    setNewPost(post);
    setSelectedIndex(index);
  };

  const confirmRemoval = () => {
    const updatedPosts = [...posts];
    updatedPosts.splice(selectedIndex, 1);
    setPosts(updatedPosts);

    setShowConfirmationModal(false);
    setSelectedIndex(null);
  };

  const handleRemovePost = (index) => {
    setShowConfirmationModal(true);
    setSelectedIndex(index);
  };

  const cancelRemoval = () => {
    setShowConfirmationModal(false);
    setSelectedIndex(null);
  };

  return (
    <div style={{ flex: "1 0 auto" }}>
      <div onClick={() => setShowModal(true)} className="post--button">
        <CgProfile className="display-3 mx-4" /> What's on your mind?
      </div>
      <CommunityForm posts={newPost} handleChange={handleChange} handleFileChange={handleFileChange} handleAddPost={handleSubmit} handleSubmit={handleSubmit} buttonText="Add New Post" showModal={showModal} onHide={() => setShowModal(false)} ButtonText={editMode ? "Edit" : "post"} closeButton={!editMode} />
      <Container>
        {posts.map((post, index) => (
          <>
            <Card key={post.id} className="post--container">
              <Card.Header>
                <CgProfile className="m-2" />
                email, date
              </Card.Header>
              <Card.Text className="text-center">{post.title}</Card.Text>
              <Container>{post.file && <embed src={URL.createObjectURL(post.file)} type={post.file.type} className="file-embed w-100" />}</Container>
              <Card.Body>
                <Card.Text>{post.body}</Card.Text>
              </Card.Body>
              <Card.Footer className="post--footer">
                <span className="post--likes" onClick={() => setLike(!like)}>
                  Like {like && <AiFillLike />}
                </span>
                <span className="post--comment" onClick={() => setShowComments(!showComments)}>
                  Comment
                </span>
                <span className="post--edit" onClick={() => editPost(post, index)}>
                  Edit
                </span>
                <span className="post--remove" onClick={() => handleRemovePost(index)}>
                  Remove
                </span>
              </Card.Footer>
              {showComments && <Comments />}
            </Card>
          </>
        ))}
      </Container>
      <ConfirmationModal show={showConfirmationModal} onHide={cancelRemoval} onConfirm={confirmRemoval} text="post" />
    </div>
  );
};

export default Posts;
