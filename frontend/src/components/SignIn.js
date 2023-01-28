 import {React,useState,useContext} from "react";
 import { Link ,useNavigate} from "react-router-dom";
 import "../css/SignIn.css";
 import { LoginContext } from "../context/LoginContext";
 import { toast } from 'react-toastify';
 export default function SignIn(){
   const {setUserLogin}=useContext(LoginContext)
   const navigate=useNavigate()
   const emailchker=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
   const [email,setEmail]=useState("");
   const [password,setPassword]=useState("");
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
     
          fetch("/signin",{
            method:"post",
            headers:{
               "Content-Type":"application/json"
            },
            body:JSON.stringify({
               email:email,
               password:password
            })
          }).then(res=>res.json())
          .then(data=>{
            if(data.error){
               notifyA(data.error);
            }
            else{
               notifyB("Signed In Successfully");
               console.log(data)
               localStorage.setItem("jwt",data.token)
               localStorage.setItem("user",JSON.stringify(data.user))

               setUserLogin(true);
               navigate("/");
            }
          
            console.log(data)
         })
    }
    return (
        <div className="login">
        <div className="box-2">
           <div className="login-form">
              <h2>Sign In</h2>
              <div>
              <input type="email" name="email" id="email" value={email} placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} />
              </div>
              
               <div>
               <input type="password" name="password" id="password" value={password} placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} />
               </div>
               <input type="submit" id="submit-btn" onClick={()=>{postData()}} value="Sign In"/>
               <div className="lastpart">
               <p>New User</p>
               <Link to="/signup">SignUp</Link>
               </div>
              
           </div>
           
        </div>
     </div>
    );
 }