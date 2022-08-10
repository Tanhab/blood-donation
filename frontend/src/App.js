import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login"
import Welcome from "./pages/Welcome";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import MedicalHistory from "./pages/MedicalHistory"
import Donations from "./pages/Donations";
import MedicalCentreReg from "./pages/MedicalCentreReg"
import MedicalCentre from "./pages/MedicalCentre";
import Driver from "./pages/Driver";
import Ambulance from "./pages/Ambulance"
import DonorSearch from "./pages/DonorSearch";
import BloodS from "./pages/BloodS";
import MedCenS from "./pages/MedCenS";
import AmbS from "./pages/AmbS";
import Notification from "./pages/Notification"
import AmbulanceReg from "./pages/AmbulanceReg";
import DriverReg from "./pages/DriverReg";
import Organization from "./pages/Organization";
import OrgReg from "./pages/OrgReg";
import Settings from "./pages/Settings";
import BloodRequest from "./pages/BloodRequest";
import DonorRegister from "./pages/DonorRegister";
import SignupChoice from "./pages/SignupChoice";
import AdminSignup from "./pages/AdminSignup";
import Test from "./pages/Test";
// import ForgotPassword from "./ForgotPassword";
// import "bootstrap/dist/css/bootstrap.min.css"
import AcceptBloodReq from "./pages/AcceptBloodReq";
import DonorList from "./pages/DonorList";


function App() {

  const [authState, setAuthState] = useState(false);
  
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/user/auth", {
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
            <Route path="/donor" element={<DonorSearch />} />
            <Route path="/blood" element={<BloodS />} />
            <Route path="/med-cen" element={<MedCenS />} />
            <Route path="/amb" element={<AmbS />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/medicalcentre" element={<MedicalCentre />} />
            <Route path="/blood-req" element={<BloodRequest />} />
            <Route path="/donation-req" element={<DonorRegister />} />
            <Route path="/choice" element={<SignupChoice />} />
            <Route path="/admin-signup" element={<AdminSignup />} />
            <Route path="/accept-blood-req/:id" element={<AcceptBloodReq />} />
            {authState && (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/medical-history" element={<MedicalHistory />} />
                <Route
                  path="/medical-centre-reg"
                  element={<MedicalCentreReg />}
                />
                <Route path="/driver" element={<Driver />} />
                <Route path="/driver-reg" element={<DriverReg />} />
                <Route path="/ambulance" element={<Ambulance />} />
                <Route path="/ambulance-reg" element={<AmbulanceReg />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/org" element={<Organization />} />
                <Route path="/org-reg" element={<OrgReg />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/test" element={<Test />} />
                <Route path="/donor-list" element={< DonorList/>}/>
              </>
            )}
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  )
}

export default App;

