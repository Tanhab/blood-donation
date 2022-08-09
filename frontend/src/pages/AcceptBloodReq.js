import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Card, Dropdown, DropdownButton, Form } from 'react-bootstrap'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'
import { isExpired, decodeToken } from "react-jwt";

const AcceptBloodReq = () => {
  const [medicals, setMedicals] = useState([])
  const [medicalName, setMedicalName] = useState()
  const [station, setStation] = useState()
  const [isLoading,setIsLoading] = useState(true)
  const [blood_request,setBloodReq] = useState([])
  const [reciepent,setRecipent] = useState([])
  const dateDonatedRef = useRef()
  const params = useParams()
  const myDecodedToken = decodeToken(localStorage.getItem('token'));
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/request-blood/blood-req/${params.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBloodReq(response.data[0])
        console.log(response.data)
        return axios.get(
          `http://localhost:5001/api/user/profile/${response.data[0].uid}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
      })
      .then((response) => {
        console.log(response.data)
        setRecipent(response.data)

        return axios.get(
          "http://localhost:5001/api/medical-centre/all-medical-centres",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error)
        } else {
          
          setMedicals(response.data.medical_centre)
          setIsLoading(false)
        }
      })
      .catch((error) => console.log(error))
  
  }, [setBloodReq,setMedicals,setIsLoading])
  
    const handleMedicalSelect = (e) => {
      console.log(e)
      setStation(e)
      const selcted = medicals.find(({ m_id }) => m_id == e)
      setMedicalName(selcted.name)
    }
  const handleAccept = (e) =>{
    e.preventDefault()
    const data = {
      donor : myDecodedToken.id,
      date_donated: dateDonatedRef.current.value,
      medical_centre : station
    }

    axios.post(
      `http://localhost:5001/api/request-blood/accept-req/${params.id}`,
      data,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    ).then((response)=>{
      let data = {
        message :"Your blood request was accepted",
        reciever : reciepent.uid,
        blood_request : blood_request.req_id,
        sender: myDecodedToken.id
      }
      return axios.post("http://localhost:5001/api/notification/accept", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
    }).then((response)=>{
        navigate('/home',{replace: true})
    }).catch(error=> console.log(error))

  }
  return (
    <>
      {!isLoading && (
        <>
          <NavigationBar />
          <div className="container text-center">
            <p>Blood request details</p>
            {blood_request.completed ? (
              <button type="button" className="btn btn-success">
                Completed
              </button>
            ) : (
              <button type="button" className="btn btn-danger">
                Pending
              </button>
            )}
            <div className="row mt-5 align-self-center">
              <h3>First Name : {reciepent.first_name}</h3>
              <h3>Last Name : {reciepent.last_name}</h3>
              <h3>Nid/BirthCertificate No : {blood_request.nid_birthCtf}</h3>
              <h2 style={{ color: "red" }}>
                Blood group requested : {blood_request.blood_group}
              </h2>
              <h3>building : {blood_request.address.building}</h3>
              <h3>village_road : {blood_request.address.village_road}</h3>
              <h3>post office : {blood_request.address.post_office}</h3>
              <h3>city : {blood_request.address.city}</h3>
              <h3>district : {blood_request.address.district}</h3>
              {!blood_request.completed && (
                <>
                  <button
                    className="btn btn-success col-2 "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    Donate blood
                  </button>
                  <div className="collapse" id="collapseExample">
                    <div className="card card-body">
                      <div className="mt-5 ">
                        <DropdownButton
                          title={
                            medicalName ? medicalName : "Select medical centre"
                          }
                          id="dropdown-menu"
                          onSelect={handleMedicalSelect}
                        >
                          {medicals.map((medical) => {
                            return (
                              <Dropdown.Item
                                key={medical.m_id}
                                eventKey={`${medical.m_id}`}
                              >
                                {medical.name}
                              </Dropdown.Item>
                            )
                          })}
                        </DropdownButton>
                      </div>
                      <div className="mb-3 mt-3">
                        <label> Last blood donated </label>
                        <Form.Control
                          type="date"
                          datatype="dd/mm/yy"
                          name="last_donated"
                          ref={dateDonatedRef}
                        />
                      </div>
                      <button className='btn btn-success col-3' onClick={handleAccept}>
                          submit 
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default AcceptBloodReq