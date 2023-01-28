import {React,useEffect, useState} from "react";
import { Link , useNavigate} from "react-router-dom";
import "../css/SignUp.css"
import { toast } from 'react-toastify';
export default function SignUp(){
   const navigate=useNavigate()
 const [name,setName]=useState("");
 const [email,setEmail]=useState("");
 const [userName,setUserName]=useState("");
 const [password,setPassword]=useState("");
 const emailchker=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
 const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
 const notifyA=(msg)=>toast.error(msg,{
   position: "top-center",
 })
 const notifyB=(msg)=>toast.success(msg,{
   position: "top-center",
 })
 const postData=()=>{
   if(!emailchker.test(email))
   {
      notifyA("Invalid Email");
      return;
   }
   else if (!passRegex.test(password)) {
      notifyA("Password must contain at least 8 characters, including at least 1 number and 1 includes both lower and uppercase letters and special characters for example #,?,!")
      return
    }
       fetch("/signup",{
         method:"post",
         headers:{
            "Content-Type":"application/json"
         },
         body:JSON.stringify({
            name:name,
            userName:userName,
            email:email,
            password:password
         })
       }).then(res=>res.json())
       .then(data=>{
         if(data.error){
            notifyA(data.error);
         }
         else{
            notifyB(data.message);
            navigate("/signin");
         }
       
         console.log(data)
      })
 }
   return( 
   <div className="signup">
      <div className="form-container">
         <div className="form">
            <h2>Sign Up</h2>
            <div>
                <input type="email" name="email" id="email" value={email} placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} />
            </div>
            <div>
                <input type="text" name="name" id="name" value={name} placeholder="Full Name" onChange={(e)=>{setName(e.target.value)}} />

            </div>
            <div>
            <input type="text" name="username" id="username" value={userName} placeholder="Username" onChange={(e)=>{setUserName(e.target.value)}} />
             </div>
             <div>
                <input type="password" name="password" id="password" value={password} placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} />
             </div>
             <input type="submit" id="submit-btn" value="Sign Up" onClick={()=>{postData()}} />
             <div className="form2">
             <p>Already have an account</p>
             <Link to="/signin">SignIn</Link>
             </div>
            
         </div>
         
      </div>
   </div>
   );
}