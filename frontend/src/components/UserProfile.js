import React , {useEffect,useState}from "react";
import PostDetail from "./PostDetail";
import { useParams } from "react-router-dom";
import "../css/Profile.css";
export default function UserProfile(){
  
   var picLink="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
   const [show,setShow]=useState(false);
   const [posts, setPost]=useState([]);
   const {userid}=useParams();
   const [isFollow,setIsFollow]=useState(false);
   const [user,setUser]=useState("");
   const followUser=(userId)=>{
    fetch("/follow",{
      method:"put",
      headers:{
         "Content-Type":"application/json",
         Authorization:"Bearer "+ localStorage.getItem("jwt")
      },
      body:JSON.stringify({
         followId:userId
      })
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data);
      setIsFollow(true);
    })
   }
   const unfollowUser=(userId)=>{
      fetch("/unfollow",{
        method:"put",
        headers:{
           "Content-Type":"application/json",
           Authorization:"Bearer "+ localStorage.getItem("jwt")
        },
        body:JSON.stringify({
           followId:userId
        })
      })
      .then((res)=>res.json())
      .then((data)=>{
        console.log(data);
        setIsFollow(false);
      })
     }

//    const toggleDetails=(posts)=>{
//       if(show){
//          setShow(false);
//          // console.log("hide");
//       }
//       else{
//          setPost(posts);
        
//          setShow(true)
//          // console.log("show");
//       }
//    }
   useEffect(()=>{
      fetch(`/user/${userid}`,{
         headers:{
            Authorization:"Bearer "+ localStorage.getItem("jwt")
         }
      })
      .then(res=>res.json())
      .then((result)=>{
         setUser(result.user) 
         setPost(result.post)
         if(
            result.user.followers.includes(
               JSON.parse(localStorage.getItem("user"))._id)
         ){
            setIsFollow(true);
         }
         
         
      })
   },[isFollow])
   return <div className="profile">
        <div className="profile-frame">
         <div className="profile-pic">
         <img   src={user.Photo? user.Photo:picLink} alt=""/>
         </div>
         <div className="profile-data">
            <div className="profile-heading" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <h1>{user.name}</h1>
            <button className="followBtn"
            onClick={()=>{
               if(isFollow){
                  unfollowUser(user._id)
               }
               else{
                  followUser(user._id)
               }
              }}
            >{isFollow ? "Unfollow":"Follow"}</button>
            </div>
           
            <div className="profile-info" style={{display:"flex"}}>
               <p>{posts.length} Posts</p>
               <p>{user.followers ? user.followers.length : "0"} Followers</p>
               <p>{user.following ? user.following.length : "0"} Following</p>
            </div>
         </div>
        </div>
        <hr style={{
         width:"90%",
         opacity:"0.8",
         margin:"25px auto"
        }}></hr>
        <div className="gallery">
         {posts.map((pics)=>{
            return <img key={pics._id} src={pics.photo}
            // onClick={()=>{
            //    toggleDetails(pics)
            // }}
            className="item" alt="/" />; 
         })}
        </div>
        {/* {
         show &&
        
        <PostDetail item={posts} toggleDetails={toggleDetails}/>
          } */}

      </div>;
}