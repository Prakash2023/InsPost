import React ,{useContext} from "react";
import "../css/Navbar.css"
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
function Click() {
  var navbar = document.querySelector(".main-nav ul");
  navbar.classList.toggle("active");
}

function Navbar({login}) {
  const navigate=useNavigate()
  const {setModalOpen}=useContext(LoginContext);
  const loginStatus=()=>{
    const token=localStorage.getItem("jwt");
    if(login||token){
      return [
        <>
             <li>
            <Link to="/profile">Profile</Link>
             </li>
             <li>
            <Link to="/createpost">Create Post</Link>
             </li>
             <li>
            <Link to="/followingpost">My Following</Link>
             </li>
             <li>
            <Link to={""}>
              <button className="primaryBtn" onClick={()=>setModalOpen(true)}>Log out</button>
            </Link>
             </li>

        </>
      ]
    }
    else{
     return [
      <>
        <li>
            <Link to="/signin">SignIn</Link>
          </li>
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
      </>
     ]
    }
  };
  return (
    <header className="main-header">
      <a href="index.html" className="brand-logo">
        <div className="brand-logo-name">
          <h1>Logo</h1>
        </div>
      </a>
      <div href="#" className="toggle-button" onClick={Click}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <nav className="main-nav">
        <ul>
          {loginStatus()}   
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
