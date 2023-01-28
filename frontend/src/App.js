// import logo from './src/logo.svg';

import './App.css';
import { useState } from 'react';
import Navbar from "./components/Navbar";
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import {ToastContainer} from 'react-toastify';
import CreatePost from './components/Createpost';
import 'react-toastify/dist/ReactToastify.css';
import React ,{createContext} from 'react';
import { LoginContext } from './context/LoginContext';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Modal from './components/Modal';
import UserProfile from './components/UserProfile';
import MyFollowingPost from './components/MyFollowingPost';
function App() {
  const [userLogin,setUserLogin]=useState(false);
  const [modalOpen,setModalOpen]=useState(false);
  return (
   <BrowserRouter>

   
    <div className="App">
      <LoginContext.Provider value={{setUserLogin,setModalOpen}}>
      <Navbar login={userLogin}/>
    <Routes>
       <Route path="/" element={<Home />}></Route>
       <Route path="/signin" element={<SignIn />}></Route>
       <Route path="/signup" element={<SignUp />}></Route>
       <Route exact path="/profile" element={<Profile />}></Route>
       <Route path="/createpost" element={<CreatePost />}></Route>
       <Route path="/profile/:userid" element={<UserProfile />}></Route>
       <Route path="/followingpost" element={<MyFollowingPost />}></Route>

     
    </Routes>
    <ToastContainer theme='dark'
    />
    {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
    {/* <Modal></Modal> */}
      </LoginContext.Provider>
    
    </div>
    </BrowserRouter>
    
  );
}

export default App;
