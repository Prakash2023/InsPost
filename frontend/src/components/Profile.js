import React , {useEffect,useState}from "react";
import PostDetail from "./PostDetail";

import "../css/Profile.css";
import ProfilePic from "./ProfilePic";
export default function Profile(){
   var picLink="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
   const [pic,setPic]=useState([])
   const [show,setShow]=useState(false);
   const [posts, setPost]=useState([]);
   const [changePic,setChangePic]=useState(false);
   const [user,setUser]=useState("");
   const toggleDetails=(posts)=>{
      if(show){
         setShow(false);
         // console.log("hide");
      }
      else{
         setPost(posts);
        
         setShow(true)
         // console.log("show");
      }
   }
   const changeprofile=()=>{
      if(changePic){
         setChangePic(false);
      }
      else{
         setChangePic(true);
      }
   }
   useEffect(()=>{
      fetch(`/user/${JSON.parse(localStorage.getItem("user"))._id}`,{
         headers:{
            Authorization:"Bearer "+ localStorage.getItem("jwt")
         }
      })
      .then(res=>res.json())
      .then((result)=>{
         setPic(result.post)
         setUser(result.user)
         console.log(result);
      })
   },[])
   return <div className="profile">
        <div className="profile-frame">
         <div className="profile-pic">
         <img 
         onClick={changeprofile}
         src={user.Photo? user.Photo:picLink} alt=""/>
         </div>
         <div className="profile-data">
            <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
            <div className="profile-info" style={{display:"flex"}}>
               <p>{pic? pic.length:"0"} Posts</p>
               <p>{user.followers? user.followers.length:"0"} followers</p>
               <p>{user.following? user.following.length:"0"} following</p>
            </div>
         </div>
        </div>
        <hr style={{
         width:"90%",
         opacity:"0.8",
         margin:"25px auto"
        }}></hr>
        <div className="gallery">
         {pic.map((pics)=>{
            return <img key={pics._id} src={pics.photo}
            onClick={()=>{
               toggleDetails(pics)
            }}
            className="item" alt="/" />; 
         })}
        </div>
        {
         show &&
        
        <PostDetail item={posts} toggleDetails={toggleDetails}/>
          }
          {
            changePic &&
            <ProfilePic changeprofile={changeprofile}/>
          }

      </div>;
}