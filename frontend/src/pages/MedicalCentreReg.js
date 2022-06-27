import axios from "axios";
import React, { useRef, useState, useContext, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";


export default function MedicalCentreReg() {

    const nameRef = useRef()
    const buildingRef = useRef();
    const villlageroadRef = useRef();
    const postOfficeRef = useRef();
    const townRef = useRef();
    const districtRef = useRef();
    const phoneNoRef = useRef();

    const registerMedical = async ()=>{
        let medical  = {}
        if(nameRef.current.value)
            medical['name']=nameRef.current.value
        if(buildingRef.current.value)
            medical['building']=buildingRef.current.value
        if(villlageroadRef.current.value)
            medical['village_road']=villlageroadRef.current.value
        if(postOfficeRef.current.value)
            medical['post_office']=postOfficeRef.current.value
        if(townRef.current.value)
            medical['city']=townRef.current.value
        if(districtRef.current.value)
            medical['district']=districtRef.current.value
        if(phoneNoRef.current.value)
            medical['phone_no']=phoneNoRef.current.value
        
        axios.post("http://localhost:5001/api/medical-centre/",medical)
        .then((response)=>{
            console.log("succesfull")
        }).catch((error)=>{
            console.log(error)
        })
    }

    async function handleSubmit(e){
        e.preventDefault()
        try {
            await registerMedical()
        } catch (error) {
            console.log(error)
        }
    }

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
                    ref={nameRef}
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
                    ref={phoneNoRef}
                    // onChange={(e) => setPhoneNoValue(e.target.value)}
                  />
                </div>
             
                <div className="col-md-12 mt-5">
                  <label className="labels">Building</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter building name"
                    //value={buildingValue}
                    ref={buildingRef}
                    //onChange={(e) => setBuildingValue(e.target.value)}
                  />
                </div>
                <div className="col-md-12 mt-2">
                  <label className="labels">Village/road</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter village/road name"
                    //value={villageroadValue}
                    ref={villlageroadRef}
                    //onChange={(e) => setVillageroadValue(e.target.value)}
                  />
                </div>
                <div className="col-md-12 mt-2">
                  <label className="labels">Post office</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter psot office name"
                    //value={postOfficeValue}
                    ref={postOfficeRef}
                    //onChange={(e) => setpostOfficeValue(e.target.value)}
                  />
                </div>
                <div className="col-md-12 mt-2">
                  <label className="labels">Town</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter town name"
                    //value={townValue}
                    ref={townRef}
                    //onChange={(e) => setTownValue(e.target.value)}
                  />
                </div>
                <div className="col-md-12 mt-2">
                  <label className="labels">District</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter district name"
                    //value={districtValue}
                    ref={districtRef}
                    //onChange={(e) => setDistrictValue(e.target.value)}
                  />
                </div>
           
                </div>
              </div>
              <div className="mt-5 text-center">
                <button className="btn btn-danger profile-button" type="button"
                onClick={(e)=>handleSubmit(e)}>
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