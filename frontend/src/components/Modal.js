import React from "react";
import {RiCloseLine} from "react-icons/ri"
import "../css/Modal.css";
import { useNavigate } from "react-router-dom";
export default function Modal({setModalOpen}){
    const navigate=useNavigate();
    return (
        <div className="darkbg" onClick={()=>setModalOpen(false)}>
        <div className="centered">
        <div className="modal">
            <div className="modalHeader">
                <h4 className="heading">Confirm</h4>
            </div>
            <button className="closeBtn" onClick={()=>setModalOpen(false)}>
               <RiCloseLine></RiCloseLine>
            </button>
            <div className="modalContent">
                Are you really want to log out ?
            </div>
            <div className="modalActions">
            <div className="actionsContainer">
                <button className="logOutBtn" onClick={()=>{
                    setModalOpen(false);
                    localStorage.clear();
                    navigate("/signin");
                }}>Log Out
                </button>
                <button className="cancelBtn" onClick={()=>setModalOpen(false)}>Cancel</button>
            </div>
            </div>
        </div>
        </div>
        </div>
    )
}