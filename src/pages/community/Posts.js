import { useEffect, useState } from "react";
import { Card, Container, Image, Pagination } from "react-bootstrap";
import PostsForm from "./PostsForm";
import { CgProfile } from "react-icons/cg";
import "./Posts.css";
import Comments from "./Comments";
import { AiFillLike } from "react-icons/ai";
import ConfirmationModal from "../../components/ConfirmationModal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSignal } from "../../store/actions/Signal";
import { FaUser } from "react-icons/fa";
import ToastCom from "../../components/ToastCom";

const Posts = () => {
  const authTokens = JSON.parse(localStorage.getItem("authTokens")) || null;
  const currentUser = useSelector((state) => state.user.user);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "", image: null });
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const signal = useSelector((state) => state.signal);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 1;
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return posts.slice(startIndex, endIndex);
  };

  // const { likedPost, likeID } = posts.reduce(
  //   (result, post) => {
  //     if (currentUser) {
  //       const likedLike = post.likes.find((like) => like.user.id === currentUser.id);
  //       if (likedLike) {
  //         result.likedPost = post;
  //         result.likeID = likedLike.id;
  //       }
  //     }
  //     return result;
  //   },
  //   { likedPost: null, likeID: null }
  // );

  const isPostLiked = (postId) => {
    const post = posts.find((p) => p.id === postId);
    if (currentUser) {
      return post.likes.some((like) => like.user.id === currentUser.id);
    }
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/community/posts/")
      .then((response) => {
        console.log("posts", response.data);
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

        .catch((error) => {
          console.log(error);
          setErrorMessage(error.response.data.detail);
        });
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
          setShowModal(false);
          dispatch(setSignal(!signal));
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage(error.response.data.detail);
        });
    }
    setNewPost({ title: "", content: "", image: posts.image });
  };

  const editPost = (post, index) => {
    if (!currentUser) {
      setShowToast(true);
      setErrorMessage("Must be logged");
      return;
    }
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

      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.detail);
      });
  };

  const handleRemovePost = (index) => {
    if (!currentUser) {
      setShowToast(true);
      setErrorMessage("Must be logged");
      return;
    }
    setShowConfirmationModal(true);
    setSelectedIndex(index);
  };

  const cancelRemoval = () => {
    setShowConfirmationModal(false);
    setSelectedIndex(null);
    setErrorMessage("");
  };

  const likePost = (postId) => {
    if (!currentUser) {
      setShowToast(true);
      setErrorMessage("Must be logged");
      return;
    }
    const likePostWithUser = { is_liked: true, user: currentUser.id, post: postId };
    axios
      .post(`http://127.0.0.1:8000/community/posts/${postId}/likes/add/`, likePostWithUser, {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(setSignal(!signal));
      })
      .catch((error) => console.log(error));
  };

  const unlikePost = (postId, likeId) => {
    axios
      .delete(`http://127.0.0.1:8000/community/posts/${postId}/likes/remove/${likeId}/`, {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(setSignal(!signal));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div style={{ flex: "1 0 auto" }}>
      <div
        onClick={() => {
          if (!currentUser) {
            setShowToast(true);
            setErrorMessage("Must be logged");
            return;
          }
          setShowModal(true);
        }}
        className="post--button"
      >
        <CgProfile className="display-3 mx-4" /> What's on your mind?
      </div>

      <PostsForm
        post={newPost}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        handleAddPost={handleSubmit}
        handleSubmit={handleSubmit}
        buttonText="Add New Post"
        showModal={showModal}
        onHide={() => {
          setShowModal(false);
          setErrorMessage("");
        }}
        ButtonText={editMode ? "Edit" : "post"}
        closeButton={!editMode}
        errorMessage={errorMessage}
      />
      <Container>
        {getCurrentPageData().map((post, index) => {
          const likedLike = post.likes.find((like) => like.user.id === currentUser?.id);
          return (
            <Card key={post.id} className="post--container">
              <Card.Header>
                <div className="list-group  ">
                  <div className=" list-group-item w-100 d-flex gap-2 align-items-center ">
                    <FaUser className="" />
                    <h4>
                      {post.user.is_doctor && "Dr."} {post.user.first_name} {post.user.last_name}
                    </h4>
                  </div>
                  <small>{new Date(post.created_at).toDateString()}</small>
                </div>
              </Card.Header>
              <Card.Text className="text-center">{post.title}</Card.Text>
              <Container>{post.image && <Image src={`http://localhost:8000${post.image}`} alt="" className="file-embed w-100" />}</Container>
              <Card.Body>
                <Card.Text>{post.content}</Card.Text>
              </Card.Body>
              <Card.Footer className="post--footer">
                {isPostLiked(post.id) ? (
                  <span className="post--likes" onClick={() => unlikePost(post.id, likedLike.id)}>
                    Unlike <AiFillLike color="blue" /> {post.likes_count}
                  </span>
                ) : (
                  <span className="post--likes" onClick={() => likePost(post.id)}>
                    Like <AiFillLike /> {post.likes_count}
                  </span>
                )}
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
              {showComments && <Comments post={post} />}
            </Card>
          );
        })}
      </Container>
      <Pagination className="justify-content-center my-2 custom-pagination">
        <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </Pagination.Prev>
        {[...Array(totalPages)].map((_, page) => (
          <Pagination.Item key={page + 1} active={currentPage === page + 1} onClick={() => setCurrentPage(page + 1)}>
            {page + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </Pagination.Next>
      </Pagination>
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
      <ConfirmationModal show={showConfirmationModal} onHide={cancelRemoval} onConfirm={confirmRemoval} text="Are you sure you want to remove this post?" errorMessage={errorMessage} />
    </div>
  );
};

export default Posts;
