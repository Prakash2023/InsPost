import React ,{useEffect,useState} from "react";
import "../css/Home.css";
import { json, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
export default function Home(){

   var picLink="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
   const navigate=useNavigate();
   const [data,setData]=useState([])
   const [comment,setComment]=useState("");
   const [show, setShow]=useState(false);
   const [item ,setItem]=useState([])
   const notifyA=(msg)=>toast.error(msg,{
      position: "top-center",
    })
    const notifyB=(msg)=>toast.success(msg,{
      position: "top-center",
    })
   useEffect(()=>{
    const token=localStorage.getItem("jwt")
    if(!token)
    {
        navigate("./signup");
    }
    fetch("/allposts",{
      headers:{
         "Authorization": "Bearer "+localStorage.getItem("jwt")
      },
    }).then(res=>res.json())
    .then(result=>setData(result))
    .catch(err=>console.log(err))
   },[])
   const toggleComment=(posts)=>{
      if(show){
         setShow(false);
         // console.log("hide");
      }
      else{
         setItem(posts);
         console.log(item);
         setShow(true)
         // console.log("show");
      }
   }
   const likePost=(id)=>{
      fetch("/like",{
         method:"put",
         headers:{
            "Content-Type":"application/json",
            "Authorization": "Bearer "+localStorage.getItem("jwt")

         },
         body:JSON.stringify({
            postId:id
         })
      }).then(res=>res.json())
      .then((result)=>{
         const newData = data.map((posts)=>{
            if(posts._id==result._id){
               return result
            }
            else{
               return posts
            }
         })
         setData(newData)
         console.log(result)
      })
   }
   const unlikePost=(id)=>{
      fetch("/unlike",{
         method:"put",
         headers:{
            "Content-Type":"application/json",
            "Authorization": "Bearer "+localStorage.getItem("jwt")

         },
         body:JSON.stringify({
            postId:id
         })
      }).then(res=>res.json())
      .then((result)=>{
         const newData = data.map((posts)=>{
            if(posts._id==result._id){
               return result
            }
            else{
               return posts
            }
         })
         setData(newData)
         console.log(result)
      })
   }
   // function to make comment
   const makeComment=(text,id)=>{
      fetch("/comment",{
         method:"put",
         headers:{
            "Content-Type":"application/json",
            "Authorization": "Bearer "+localStorage.getItem("jwt")

         },
         body:JSON.stringify({
            text:text,
            postId:id
         })
      }).then(res=>res.json())
      .then((result)=>{
         const newData = data.map((posts)=>{
            if(posts._id==result._id){
               return result
            }
            else{
               return posts
            }
         })
         setData(newData)
         setComment("");
         notifyB("Comment Posted");
         console.log(result)
      })
   }

   return (
      <div className="Home">
         {data.map((posts)=>{
            return(<div className="card">
            <div className="card-header">
             <div className="card-pic">
                 <img src={posts.postedBy.Photo?posts.postedBy.Photo:picLink} alt=""/>
             </div>
             <h4>
               <Link to={`/profile/${posts.postedBy._id}`}>
               {posts.postedBy.name} </Link> </h4>
            </div>
            <div className="card-image">
               <img src={posts.photo} alt="" />
            </div>
            <div className="card-content">
               {
                  posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id)
                  ?
                  (<span className="material-symbols-outlined
                  material-symbols-outlined-red"
                  onClick={()=>{unlikePost(posts._id)}}>         
                  favorite
                  </span>)
                  :( <span className="material-symbols-outlined"
                  onClick={()=>{likePost(posts._id)}}>         
            favorite
            </span>)
               }
           
      
      <p>{posts.likes.length} Likes</p>
      <p>{posts.body}</p>
      <p style={{fontWeight:"bold",cursor:"pointer"}} onClick={()=>{toggleComment(posts)}}>View all comments</p>
            </div>
            <div className="add-comment">
            <span className="material-symbols-outlined">
      mood
      </span>
      <input type="text" placeholder="Add comment" value={comment} onChange={(e)=>{setComment(e.target.value)}}/>
      <button className="btn-comment" onClick={()=>{makeComment(comment,posts._id)}} >Post</button>
            </div>
            </div>)
         })}
        {/* show comment */}
        { show && (
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
         <input type="text" placeholder="Add comment" value={comment} 
         onChange={(e)=>{
            setComment(e.target.value);
         }}
         />
         <button className="btn-comment"   onClick={()=>{
            makeComment(comment,item._id);
            toggleComment();
         }} >Post</button>
               </div>
                 
               </div>
            </div>
            <div className="close-comment" onClick={()=>{toggleComment()}}>
               <span className="material-symbols-outlined material-symbols-outlined-comment">close</span>
            </div>
           </div>)
        }
       
      </div>
   );
}