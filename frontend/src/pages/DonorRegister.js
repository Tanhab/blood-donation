import React, { useEffect, useRef, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import { Card,Form, Toast, Alert } from "react-bootstrap";
import Axios from "axios";
import { isExpired, decodeToken } from "react-jwt";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function DonorRegister() {
  const [alert, setAlert] = useState(false);
  const [alert1, setAlert1] = useState(false);
  const [alertContent, setAlertContent] = useState('');
    const [user, setUser] = useState([]);
    const nid_birthCtfRef = useRef()
    const phoneNoRef = useRef()
    const last_donatedRef = useRef()
    const buildingRef = useRef()
    const village_roadRef = useRef()
    const postOfficeRef = useRef()
    const cityRef = useRef()
    const districtRef = useRef()
    const bloodGrpRef = useRef()
    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

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

    const register = async ()=>
    {
        const myDecodedToken = decodeToken(localStorage.getItem('token'));
        let donor = {
            uid : myDecodedToken.id,
            blood_group: bloodGrpRef.current.value

        }
       
        if(nid_birthCtfRef.current.value)
            donor['nid_birthCtf']=nid_birthCtfRef.current.value
        if(buildingRef.current.value)
            donor['building']=buildingRef.current.value
        if(village_roadRef.current.value)
            donor['village_road']=village_roadRef.current.value
        if(postOfficeRef.current.value)
            donor['post_office']=postOfficeRef.current.value
        if(cityRef.current.value)
            donor['city']=cityRef.current.value
        if(districtRef.current.value)
            donor['district']=districtRef.current.value
        if(phoneNoRef.current.value)
            donor['phone_no']=phoneNoRef.current.value
        if(last_donatedRef.current.value)
            donor['last_donated']=last_donatedRef.current.value
        
            Axios.post("http://localhost:5001/api/user/donor/",donor,{
            headers: {
                //"Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + localStorage.getItem("token")
    },
        }).then((response)=>{
            console.log(response)
         
            if(response.data.error){
              setAlertContent(response.data.error);
              setAlert(true);
                setError(response.data.error)
                console.log(response.data.error)
            }
            else{
              
                console.log("successfull")
                console.log(response.data)
                toast.success('Registration Successful! Head back to home page.', {
                  position: "bottom-left",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  })
              
            }
        })
        .catch ((error)=> {
          setAlertContent(error.response.data.message);
          setAlert(true);
            console.log({error2: error.response.data.message})
        })
    }

    async function handleSubmit(e) {
    e.preventDefault()
    console.log("here in handle")
    try {
      setError("")
      setLoading(true)
      await register()
    } catch (error){
      console.log(error)
      setError("Failed to create an account")
    }
    setLoading(false)

    console.log(alert)
  }
  return (
    <>
      <NavigationBar />

      <div className="container ">
        <div className="py-5 text-center">

        {alert ? <Alert variant={'danger'}>{alertContent}</Alert> : <></> }
       
          <img
            className="d-block mx-auto mb-4"
            src="icon.png"
            alt=""
            width="72"
            height="72"
          />
          <h2>Register to be a Donor</h2>
          <p className="lead">
            CRIMSON is there to help you save the life of other people and
            become a potential donor. Fill this short form to register as a potential donor. We will contact you when blood donation is needed of your type.
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

  
        <SelectComponent  />
      
        <div className="mb-3 mt-3">
        <label> Last blood donated </label>
        <Form.Control type="date"
        datatype="dd/mm/yy"
        name = 'last_donated'
        ref={last_donatedRef}
        />
        </div>
        
        <button className="btn btn-danger btn-lg btn-block m-5" onClick={(e)=>handleSubmit(e)} >
            Become a Donor
          </button>
        </Card>
        <ToastContainer />
      </div>
    </>
  );
}
