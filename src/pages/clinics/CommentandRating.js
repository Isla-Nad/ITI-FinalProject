import { useState } from "react";
import { FaStar } from "react-icons/fa";
const colors={
    orange:"#FFBA5A",
    gray:"#a9a9a9"

}
function CommentandRating(){
    const stars=Array(5).fill();
    const [currentValue,setCurrentValue]=useState(0)
    const [hoverValue,setHoverValue]=useState(undefined);
   const [posts, setPosts] = useState([]);
   const [newPost, setNewPost] = useState({ title: "", body: "" });
    const handleClick=value=>{
        setCurrentValue(value)
        console.log(currentValue)
    };
    const handleHover=value=>{
        setHoverValue(value)
    };
   
    const handleAddPost = () => {
        setPosts([...posts, { ...newPost, id: Date.now() }]);
        setNewPost({ title: "", body: "" });
      };
      const handleRemovePost = (postId) => {
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
      };
    

    return (
        <div style={styles.container}>
            <h>Write Comment and Rating </h>
            <div style={styles.stars}>
                {stars.map((_,index)=>{
                    return(
                        <FaStar
                        key={index}
                        size={25}
                        style={{marginRight:"10px",cursor:"pointer"}}
                        color={(hoverValue || currentValue > index ? colors.orange : colors.gray)}
                        onClick={()=>handleClick(index+1)}
                        
                        onChange={()=>handleHover}
                        
                        />
                    )
                })}

            </div>
            <textarea className="form-contol"
            placeholder="Whats is Your Comment" 
            name="Textcomment"
            style={styles.textarea}
            value={newPost.body} onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            >

            </textarea>
            <button  className="btn btn-primary"style={styles.button} onClick={handleAddPost}> Submit</button>
            <ul className="posts-list "  style={{padding:"20px 0px", paddingRight:"40%"}} >
          {posts.map((post,index) => (
            <li key={post.id} className="post-item">
              <h2 className="post-title">{<FaStar  key={index}
                 color={( hoverValue ||currentValue > index ? colors.orange : colors.gray)}
                 value={currentValue.index}

              />}</h2>
              <p className="post-body">{post.body}</p>
              <button onClick={() => handleRemovePost(post.id)} className="btn btn-danger">Remove Rating</button>
            </li>
          ))}
        </ul>
        </div>
    )

}
const styles={
    container:{
    display:"flex",
    flexDirection:"column",
    alginItems:"Center"
    },
    textarea :{
        border:"1px soild #a9a9a9",
        borderRedius:5,
        width:300,
        padding:10

    },
   
    button:{
        border:"1px soild #a9a9a9",
        borderRedius:5,
        width:300,
        padding:10

        }
  
}
export default CommentandRating;