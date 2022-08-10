import React, { useEffect, useRef, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import { Card,Form, Toast } from "react-bootstrap";
import Axios from "axios";
import { isExpired, decodeToken } from "react-jwt";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
const {getCurrentUid} = require('../components/Utility')




export default function BloodRequest() {
    const [user, setUser] = useState([]);
    const nid_birthCtfRef = useRef()
    const phoneNoRef = useRef()
    const last_recievedRef = useRef()
    const buildingRef = useRef()
    const village_roadRef = useRef()
    const postOfficeRef = useRef()
    const cityRef = useRef()
    const districtRef = useRef()
    const bloodGrpRef = useRef()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    function SelectComponent() {
    const [bloodGrp, setBloodGrp] = useState("");
    return(
        <div>
            <div className="row">
                <div className="form-row">
                    <div className="form-group" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <div  htmlFor="blood-select">Blood Group: <span style={{color: 'red'}}>*</span></div>
                        <select style={{width: "75%"}} className="form-control" ref={bloodGrpRef} value={bloodGrp} onChange={(e) => setBloodGrp(e.target.value)}>
                            <option defaultValue="undefined">Select Blood Group</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="A+" >A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )  
}
    const getUser = async () => {
        await Axios.get(`http://localhost:5001/api/user/me/`,{
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
      },
      }).then((response) => {
        if (response.data.error) {
          console.log(response.data.error)
        } else {
          setUser(response.data);
        console.log(response.data)
        }
      });
        
    };
    useEffect(() => {
        getUser();
    }, []);

    const requestBlood = async ()=>
    {
        const myDecodedToken = decodeToken(localStorage.getItem('token'));
        let receiver = {
            uid : myDecodedToken.id,
            blood_group: bloodGrpRef.current.value

        }
        if(nid_birthCtfRef.current.value)
            receiver['nid_birthCtf']=nid_birthCtfRef.current.value
        if(buildingRef.current.value)
            receiver['building']=buildingRef.current.value
        if(village_roadRef.current.value)
            receiver['village_road']=village_roadRef.current.value
        if(postOfficeRef.current.value)
            receiver['post_office']=postOfficeRef.current.value
        if(cityRef.current.value)
            receiver['city']=cityRef.current.value
        if(districtRef.current.value)
            receiver['district']=districtRef.current.value
        if(phoneNoRef.current.value)
            receiver['phone_no']=phoneNoRef.current.value
        if(last_recievedRef.current.value)
            receiver['last_received']=last_recievedRef.current.value
        console.log(receiver)
        console.log("ekhono thik")
        
            Axios.post("http://localhost:5001/api/request-blood", receiver, {
              headers: {
                //"Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Bearer " + localStorage.getItem("token")
              },
            })
              .then((response) => {
                console.log(response)
                if (response.data.error) {
                  setError(response.data.error)
                  console.log(response.data.error)
                } else {
                  console.log("successfull")
                  console.log(response.data)
                 
                }

                return axios.post(
                  "http://localhost:5001/api/notification",
                  {
                    message: `${user.first_name} ${user.last_name} is asking for ${response.data.blood_group} blood`,
                    sender: myDecodedToken.id,
                    blood_request: response.data.req_id,
                  },
                  {
                    headers: {
                      //"Content-Type": "application/x-www-form-urlencoded",
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                )
              })
              .then((response) => {
                console.log("notification done")
              })
              .catch((error) => {
                console.log(error)
              })
    }

    async function handleSubmit(e) {
    e.preventDefault()
    console.log("here in handle")
    try {
      setError("")
      setLoading(true)
      await requestBlood()
      toast.success('Blood is Requested Successfully! Head back to home page.', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
    } catch (error){
      console.log(error)
      setError("Failed to create an account")
    }
    setLoading(false)
  }
  return (
    <>
      <NavigationBar />

      <div className="container ">
        <div className="py-5 text-center">
          <img
            className="d-block mx-auto mb-4"
            src="icon.png"
            alt=""
            width="72"
            height="72"
          />
          <h2>Request Blood Donation</h2>
          <p className="lead">
            Request for blood.
          </p>
        </div>

        <Card className="shadow p-5 mb-5">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>First name</label>
              <span style={{color: 'red'}}>*</span>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder= {user.first_name}
                disabled = {true}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>Last name</label>
              <span style={{color: 'red'}}>*</span>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder= {user.last_name}
                disabled = {true}
              />
            </div>
          </div>
          <div className="row">
          <div className="col-md-6 mb-3">
            <label>Email </label>
            <span style={{color: 'red'}}>*</span>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder= {user.email}
              disabled = {true}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Phone number </label>
            <span style={{color: 'red'}}>*</span>
            <input
              type="text"
              className="form-control"
              id="phone_no"
              placeholder="enter your phone no"
              ref={phoneNoRef}
            />
          </div>
          </div>
          <div className="mb-3">
            <label>NID/ Birth Certificate Number </label>
            <span style={{color: 'red'}}>*</span>
            <input
              type="number"
              className="form-control"
              id="nid_birthCtf"
              placeholder="enter your nid or birth certificate number"
              ref={nid_birthCtfRef}
            />
          </div>
         
          
          <div className="row">
            <div className="col-md-6 mb-3">
            <label>Building </label>
            <input
              type="text"
              className="form-control"
              id="building"
              placeholder="Enter Building Name"
              ref={buildingRef}
            />
          
          
          </div>
          <div className="col-md-6 mb-3">
            <label>Village/road </label>
            <input
              type="text"
              className="form-control"
              id="village_road"
              placeholder="enter your village or road name"
              ref={village_roadRef}
            />
          </div>
          </div>
          <div className="row">
          <div className="col-md-6 mb-3">
            <label>Post office </label>
            <input
              type="text"
              className="form-control"
              id="post_office"
              placeholder="enter your Post office"
              ref = {postOfficeRef }
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>City </label>
            <span style={{color: 'red'}}>*</span>
            <input
              type="text"
              className="form-control"
              id="city"
              placeholder="enter your city (Required)"
              required
              ref={cityRef}
            />
          </div>
          </div>
          <div className="mb-3">
            <label>District </label>
            <span style={{color: 'red'}}>*</span>
            <input
              type="text"
              className="form-control"
              id="district"
              placeholder="enter your District(Required)"
              required
              ref={districtRef}
            />
        </div>

        <SelectComponent />
        <div className="mb-3 mt-3">
        <label>Date of blood receiving </label>
        <span style={{color: 'red'}}>*</span>
        <Form.Control type="date"
        name = 'last_received'
        ref={last_recievedRef}
        />
        </div>
        <button className="btn btn-danger btn-lg btn-block m-5" onClick={(e)=>handleSubmit(e)} >
            Request Blood
          </button>
        </Card>
        <ToastContainer />
      </div>
    </>
  );
}
