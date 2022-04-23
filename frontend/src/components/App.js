import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login"
import Welcome from "./Welcome";
// import Profile from "./Profile"
// import History from "./History";
// import ContactUs from "./ContactUs";
// import PrivateRoute from "./PrivateRoute";
// import ForgotPassword from "./ForgotPassword";


function App() {
  return (
    <>
        <BrowserRouter>
         
            <Routes>
             
              <Route path="/" element={<Welcome />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
         
            </Routes>
        
        </BrowserRouter>
   </>
  );
}

export default App;

// #749CC2
// #6FB3F8