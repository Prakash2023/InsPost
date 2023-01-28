import React from "react";
import "../css/PostDetail.css";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
export default function PostDetail({item,toggleDetails}){
   const navigate=useNavigate();
   const notifyA=(msg)=>toast.error(msg,{
      position: "top-center",
    })
    const notifyB=(msg)=>toast.success(msg,{
      position: "top-center",
    })
   const removePost=(postId)=>{
      if(window.confirm("Do you really want to delete this post ?")){
         fetch(`/deletePost/${postId}`,{
            method:"delete",
            headers:{
               Authorization:"Bearer "+ localStorage.getItem("jwt")
            },
         })
         .then((res)=>res.json())
         .then((result)=>{
            console.log(result);
            toggleDetails();
            navigate("/")
            notifyB(result.message)
         })
      }
    
   }
    return (
        <div className="showComment">
        <div className="container">
           <div className="postPic">
              <img src={item.photo} alt="/" />
           </div>
              <div className="details">
              <div className="card-header" style={{borderBottom:"1px solid #00000029"}}>
            <div className="card-pic">
                <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60" alt=""/>
            </div>
            <h4>{item.postedBy.name}</h4>
            <div className="deletePost" onClick={()=>{removePost(item._id)}} >
               <span className="material-symbols-outlined">delete</span>
            </div>
            </div>
           
           <div className="comment-section" style={{borderBottom:"1px solid #00000029"}}>
              {
                 item.comments.map((comment)=>{
                      return (
                       <p className="comm">
                       <span className="commenter" style={{fontWeight:"bold"}}>{comment.postedBy.name}{" "}</span>
                       <span className="commentText">{comment.comment}</span>
                    </p>
                      );    
                 })
              }
            
           </div>
              <div className="card-content">
                 <p>{item.likes.length} Likes</p>
                 <p>{item.body}</p>
              </div>
              <div className="add-comment">
           <span className="material-symbols-outlined">
     mood
     </span>
     <input type="text" placeholder="Add comment" 
   //   value={comment} 
   //   onChange={(e)=>{
   //      setComment(e.target.value);
   //   }}
     />
     <button className="btn-comment"  
   //    onClick={()=>{
   //      makeComment(comment,item._id);
   //      toggleComment();
   //   }} 
     >Post</button>
           </div>
             
           </div>
        </div>
        <div className="close-comment" 
         onClick={()=>{toggleDetails();}}
        >
           <span className="material-symbols-outlined material-symbols-outlined-comment">close</span>
        </div>
       </div>
    )
}