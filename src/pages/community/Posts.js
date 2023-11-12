import { useEffect, useState } from "react";
import { Card, Container, Image } from "react-bootstrap";
import PostsForm from "./PostsForm";
import { CgProfile } from "react-icons/cg";
import "./Posts.css";
import Comments from "./Comments";
import { AiFillLike } from "react-icons/ai";
import ConfirmationModal from "../../components/ConfirmationModal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSignal } from "../../store/actions/Signal";

const Posts = () => {
  const authTokens = JSON.parse(localStorage.getItem("authTokens")) || null;
  const currentUser = useSelector((state) => state.user.user);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "", image: null });
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [like, setLike] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const signal = useSelector((state) => state.signal);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/community/posts/")
      .then((response) => {
        console.log(response.data);
        setPosts(response.data);
      })
      .catch((error) => console.log(error));
  }, [signal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewPost({ ...newPost, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      const newPostwithUser = { ...newPost, user: currentUser.id };
      axios
        .put("http://127.0.0.1:8000/community/posts/edit/" + selectedIndex, newPostwithUser, {
          headers: {
            Authorization: "Bearer " + String(authTokens.access),
            "content-type": "multipart/form-data",
          },
        })

        .then((response) => {
          console.log(response.data);
          dispatch(setSignal(!signal));
          setShowModal(false);
          setEditMode(false);
          setSelectedIndex(null);
        })
        .catch((error) => console.log(error));
    } else {
      const newPostwithUser = { ...newPost, user: currentUser.id };
      axios
        .post("http://127.0.0.1:8000/community/posts/add/", newPostwithUser, {
          headers: {
            Authorization: "Bearer " + String(authTokens.access),
            "content-type": "multipart/form-data",
          },
        })

        .then((response) => {
          console.log(response.data);
          dispatch(setSignal(!signal));
        })
        .catch((error) => console.log(error));
    }
    setNewPost({ title: "", content: "", image: posts.image });
    setShowModal(false);
  };

  const editPost = (post, index) => {
    setEditMode(true);
    setShowModal(true);
    setNewPost({ ...post, image: null });
    setSelectedIndex(index);
  };

  const confirmRemoval = () => {
    axios
      .delete("http://127.0.0.1:8000/community/posts/delete/" + selectedIndex, {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(setSignal(!signal));
        setShowConfirmationModal(false);
        setSelectedIndex(null);
      })
      .catch((error) => console.log(error));
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
      <PostsForm post={newPost} handleChange={handleChange} handleFileChange={handleFileChange} handleAddPost={handleSubmit} handleSubmit={handleSubmit} buttonText="Add New Post" showModal={showModal} onHide={() => setShowModal(false)} ButtonText={editMode ? "Edit" : "post"} closeButton={!editMode} />
      <Container>
        {posts.map((post, index) => (
          <>
            <Card key={post.id} className="post--container">
              <Card.Header>
                <CgProfile className="m-2" />
                email, date
              </Card.Header>
              <Card.Text className="text-center">{post.title}</Card.Text>
              <Container>{post.image && <Image src={`http://localhost:8000${post.image}`} alt="" className="file-embed w-100" />}</Container>
              <Card.Body>
                <Card.Text>{post.content}</Card.Text>
              </Card.Body>
              <Card.Footer className="post--footer">
                <span className="post--likes" onClick={() => setLike(!like)}>
                  Like {like && <AiFillLike />}
                </span>
                <span className="post--comment" onClick={() => setShowComments(!showComments)}>
                  Comment
                </span>
                <span className="post--edit" onClick={() => editPost(post, post.id)}>
                  Edit
                </span>
                <span className="post--remove" onClick={() => handleRemovePost(post.id)}>
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
