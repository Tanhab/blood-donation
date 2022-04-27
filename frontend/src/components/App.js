import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login"
import Welcome from "../pages/Welcome";
import Profile from "../pages/Profile";
import Search from "../pages/Search";
import MedicalHistory from "../pages/MedicalHistory"
// import ForgotPassword from "./ForgotPassword";


function App() {

  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/auth", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
      },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      });
  }, []);

  return (
    <>
        <AuthContext.Provider value={{ authState, setAuthState }}>
        <BrowserRouter>
         
            <Routes>
             
              <Route path="/" element={<Welcome />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/search" element={<Search />} />
              {authState && (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/medicalhistory" element={<MedicalHistory/>}/>
              </>
            )}
            
         
            </Routes>
        
        </BrowserRouter>
        </AuthContext.Provider>
   </>
  );
}

export default App;

