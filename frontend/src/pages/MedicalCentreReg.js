import React, { useRef, useState, useContext, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";


export default function MedicalCentreReg() {

    const [buildingValue, setBuildingValue] = useState("");
    const [villageroadValue, setVillageroadValue] = useState("");
    const [postOfficeValue, setpostOfficeValue] = useState("");
    const [townValue, setTownValue] = useState("");
    const [districtValue, setDistrictValue] = useState("");
    const [longitudeValue, setLongitudeValue] = useState("");
    const [latitudeValue, setLatitudeValue] = useState("");

    const buildingRef = useRef();
    const villlageroadRef = useRef();
    const postOfficeRef = useRef();
    const townRef = useRef();
    const districtRef = useRef();
    const longitudeRef = useRef();
    const latitudeRef = useRef();

    return (
        <>
        <NavigationBar/>
 <form >
      <div className="container rounded  mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="250px"
                src="https://static.vecteezy.com/system/resources/previews/003/608/820/original/medical-center-hospital-building-design-free-vector.jpg"
              />
              
            
            </div>
          </div>
         
          <div className="col-md-9 border-right">
          
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Register Medical Centre</h4>
              </div>
              <div className="row mt-2">
              <div className="col-md-12 mt-2">
                  <label className="labels">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="name"
                    // value={firstNameValue}
                    // ref={firstNameRef}
                    // onChange={(e) => setFirstNameValue(e.target.value)}
                  />
                </div>
            
        
             
              
              
       
                <div className="col-md-12 mt-2">
                  <label className="labels">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter phone number"
                    // value={phoneNoValue}
                    // ref={phoneNoRef}
                    // onChange={(e) => setPhoneNoValue(e.target.value)}
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
                  Save Medical Centre
                </button>
              </div>
            </div>
       
      
        </div>
      </div>
      </form>
      
        
        </>
    )
}