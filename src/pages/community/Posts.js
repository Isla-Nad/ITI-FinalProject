import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Posts.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  const handleAddPost = () => {
    setPosts([...posts, { ...newPost, id: Date.now() }]);
    setNewPost({ title: "", body: "" });
  };

  const handleRemovePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  return (
    <div className="posts-container">
      <h1 className="posts-title">Posts</h1>
      <div className="add-post-form">
        <input type="text" placeholder="Title" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
        <textarea placeholder="Body" value={newPost.body} onChange={(e) => setNewPost({ ...newPost, body: e.target.value })} />
        <button onClick={handleAddPost}>Add Post</button>
      </div>
      {loading ? (
        <div className="loading-skeleton"></div>
      ) : (
        <ul className="posts-list">
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              <h2 className="post-title">{post.title}</h2>
              <p className="post-body">{post.body}</p>
              <button onClick={() => handleRemovePost(post.id)}>Remove Post</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Posts;
