import React, { useRef, useState, useContext, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import axios from "axios";


export default function Profile() {

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [phoneNoValue, setPhoneNoValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [bloodGroupValue, setBloodGroupValue] = useState("");
  const [buildingValue, setBuildingValue] = useState("");
  const [villageroadValue, setVillageroadValue] = useState("");
  const [postOfficeValue, setpostOfficeValue] = useState("");
  const [townValue, setTownValue] = useState("");
  const [districtValue, setDistrictValue] = useState("");
  const [longitudeValue, setLongitudeValue] = useState("");
  const [latitudeValue, setLatitudeValue] = useState("");

  const emailRef = useRef()
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneNoRef = useRef();
  const bloodGrpRef = useRef();
  const buildingRef = useRef();
  const villlageroadRef = useRef();
  const postOfficeRef = useRef();
  const townRef = useRef();
  const districtRef = useRef();
  const longitudeRef = useRef();
  const latitudeRef = useRef();
 




  useEffect(() => {
  
      axios.get("http://localhost:5001/api/user/me", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
      },
      }).then((response) => {
       
        if (response.data.error) {
          console.log(response.data.error)
        } else {
         
          setFirstNameValue(response.data.first_name)
          setLastNameValue(response.data.last_name)
          setEmailValue(response.data.email)
          setPhoneNoValue(response.data.phone_no)
          setBloodGroupValue(bd(response.data.blood_group))

        }
     
      });
 
   },[]);

   function bd(bloodgrp) {

    if(bloodgrp==='1')
    return 'O+'
    if(bloodgrp==='2')
    return 'O-'
    if(bloodgrp==='3')
    return 'A+'
    if(bloodgrp==='4')
    return 'A-'
    if(bloodgrp==='5')
    return 'B+'
    if(bloodgrp==='6')
    return 'B-'
    if(bloodgrp==='7')
    return 'AB+'
    if(bloodgrp==='8')
    return 'AB-'
   }

  return (
    <>
      <NavigationBar />
      <form >
      <div className="container rounded  mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="250px"
                src="https://img.freepik.com/free-vector/human-blood-transfusion-icon-make-injection-arm_124715-728.jpg"
              />
              
              <h3 style={{color:'red'}}>Donations</h3>
              <span>Number of donations made: 2 </span>
              <span>Number of transfusion done: 0 </span>
            </div>
          </div>
         
          <div className="col-md-5 border-right">
          
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">User Profile</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="first name"
                    value={firstNameValue}
                    ref={firstNameRef}
                    onChange={(e) => setFirstNameValue(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={lastNameValue}
                    ref={lastNameRef}
                    onChange={(e) => setLastNameValue(e.target.value)}
                    placeholder="last name"
                  />
                </div>
        
             
                <div className="col-md-12 mt-2">
                  <label className="labels">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter email address"
                    value={emailValue}
                    ref={emailRef}
                    onChange={(e) => setEmailValue(e.target.value)}
                  />
                </div>
              
       
                <div className="col-md-12 mt-2">
                  <label className="labels">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter phone number"
                    value={phoneNoValue}
                    ref={phoneNoRef}
                    onChange={(e) => setPhoneNoValue(e.target.value)}
                  />
                </div>
                <div className="col-md-12 mt-2">
                  <label className="labels">Blood Group</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter blood group"
                    value={bloodGroupValue}
                    ref={bloodGrpRef}
                    onChange={(e) => setBloodGroupValue(e.target.value)}
                  />
                </div>
                <div className="col-md-12 mt-5">
                  <label className="labels">Building</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter building name"
                    value={buildingValue}
                    ref={buildingRef}
                    onChange={(e) => setBuildingValue(e.target.value)}
                  />
                </div>
                <div className="col-md-12 mt-2">
                  <label className="labels">Village/road</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter village/road name"
                    value={villageroadValue}
                    ref={villlageroadRef}
                    onChange={(e) => setVillageroadValue(e.target.value)}
                  />
                </div>
                <div className="col-md-12 mt-2">
                  <label className="labels">Post office</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter psot office name"
                    value={postOfficeValue}
                    ref={postOfficeRef}
                    onChange={(e) => setpostOfficeValue(e.target.value)}
                  />
                </div>
                <div className="col-md-12 mt-2">
                  <label className="labels">Town</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter town name"
                    value={townValue}
                    ref={townRef}
                    onChange={(e) => setTownValue(e.target.value)}
                  />
                </div>
                <div className="col-md-12 mt-2">
                  <label className="labels">District</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter district name"
                    value={districtValue}
                    ref={districtRef}
                    onChange={(e) => setDistrictValue(e.target.value)}
                  />
                </div>
           
                </div>
              </div>
              <div className="row ">
                <div className="col-md-6">
                  <label className="labels">Longitude</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="longitude"
                    value={longitudeValue}
                    ref={longitudeRef}
                    onChange={(e) => setLongitudeValue(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Latitude</label>
                  <input
                    type="text"
                    className="form-control"
                    value={latitudeValue}
                    ref={latitudeRef}
                    onChange={(e) => setLatitudeValue(e.target.value)}
                    placeholder="latitude"
                  />
                </div>
              </div>
              <div className="mt-5 text-center">
                <button className="btn btn-danger profile-button" type="button">
                  Save Profile
                </button>
              </div>
            </div>
       
          <div className="col-md-4">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center experience">
                <h4>Physical Issues</h4>
              
              </div>
              <br />
              <div className="col-md-12">
                <label className="labels">Physical Illness</label>
                <textarea name="Text1" cols="40" rows="5"></textarea>
              </div>{" "}
              <br />
              <div className="col-md-12">
                <label className="labels">Genetic Issues</label>
                <textarea name="Text1" cols="40" rows="5"></textarea>
              </div>
           

            </div>
          </div>
        </div>
      </div>
      </form>
    </>
  );
}
