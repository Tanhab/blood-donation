import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login"
import Welcome from "./Welcome";
import Profile from "./Profile";
import Search from "./Search";
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
              </>
            )}
            
         
            </Routes>
        
        </BrowserRouter>
        </AuthContext.Provider>
   </>
  );
}

export default App;

