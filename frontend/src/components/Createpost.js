import {React ,useState,useEffect}from "react";

import "../css/Createpost.css";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function Createpost(){
    const navigate =useNavigate();
    const [body,setBody]=useState("");
    const [image,setImage]=useState("");
    const [url,setUrl]=useState("");
    const notifyA=(msg)=>toast.error(msg,{
        position: "top-center",
      })
      const notifyB=(msg)=>toast.success(msg,{
        position: "top-center",
      })
    useEffect(()=>{
       if(url){
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                body,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{if(data.error){
            notifyA(data.error);
        }else{
            notifyB("Successfully Posted");
            navigate("/");
        }
    })
        .catch(err=>console.log(err))
       }
    },[url])
    //posting image in cloudinary
    const postDetails=()=>{
        console.log(body,image);
        const data=new FormData();
        data.append("file",image);
        data.append("upload_preset","insta-clone");
        data.append("cloud_name","cloud119")
        fetch("https://api.cloudinary.com/v1_1/cloud119/image/upload",
        {
            method:"post",
            body:data
        }).then(res=>res.json())
        .then(data=>setUrl(data.url))
        .catch(err=>console.log(err))
        //saving post to mongodb
      
    }
    const loadfile=(event)=>{
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function() {
          URL.revokeObjectURL(output.src)
    }
}; 
    return(
        <div className="createPost">
            <div className="post-header">
                <h4>Create New Post</h4>
                <button id="post-btn" onClick={()=>{postDetails()}}>Share</button>
            </div>
            <div className="main-div">
                <img id="output" src="https://cdn-icons-png.flaticon.com/512/1160/1160358.png"/>
                <input type="file" accept="image/*" onChange={(event)=>{
                    loadfile(event);
                    setImage(event.target.files[0])
                    }}/>
            </div>
            <div className="details">
                <div className="card-header">
                    <div className="card-pic">
                    <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60" alt=""/>
                    </div>
                    <h4>Ramesh</h4>
                </div>
                <textarea value={body} onChange={(e)=>{
                    setBody(e.target.value)
                }} type="text" placeholder="write a caption.." />
            </div>
        </div>
    );
}