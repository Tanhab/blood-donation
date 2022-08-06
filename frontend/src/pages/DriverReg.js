import axios from "axios";
import React, { useRef, useState, useContext, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"

export default function DriverReg() {
  
  const [medicals, setMedicals] = useState([])
  const [medicalName, setMedicalName] = useState()
  const [station,setStation] = useState()
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const cityRef = useRef()
  const districtRef = useRef()
  const drivingLicenseRef = useRef();
  const phoneNoRef = useRef()
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/medical-centre/all-medical-centres", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error)
        } else {
          console.log(response.data)
          setMedicals(response.data.medical_centre)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [setMedicals])

  const handleMedicalSelect = (e) => {
    console.log(e)
    setStation(e)
    const selcted = medicals.find(({ m_id }) => m_id == e)
    setMedicalName(selcted.name)
  }

  const register = async () => {
    let driver = {}
    if (firstNameRef.current.value)
      driver["first_name"] = firstNameRef.current.value
    if (lastNameRef.current.value) driver["last_name"] = lastNameRef.current.value
    if (cityRef.current.value) driver["city"] = cityRef.current.value
    if (districtRef.current.value) driver["district"] = districtRef.current.value
    if (phoneNoRef.current.value) driver["phone_no"] = phoneNoRef.current.value
    if (drivingLicenseRef.current.value) driver["driving_license"] = drivingLicenseRef.current.value

    driver['station'] = station

    axios.post("http://localhost:5001/api/driver/", driver, {
      headers: {
        //"Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
    })
      .then((response) => {
        console.log(response)
        if (response.data.error) {
          // setAlertContent(response.data.error)
          // setAlert(true)
          // setError(response.data.error)
          console.log(response.data.error)
        } else {
          // setAlertContent("Your registration is successful")
          // setAlert1(true)
          console.log("successfull")
          console.log(response.data)
        }
      })
      .catch((error) => {
        // setAlertContent(error.response.data.message)
        // setAlert(true)
        console.log({ error2: error.response.data.message })
      })
  }


  async function handleSubmit(e) {
    e.preventDefault()
    console.log("here in handle")
    try {
      // setError("")
      // setLoading(true)
      await register()
    } catch (error) {
      console.log(error)
      //setError("Failed to create an account")
    }
    //setLoading(false)

    //console.log(alert)
  }

  return (
    <>
      <NavigationBar />
      <form onSubmit={handleSubmit}>
        <div className="container rounded  mb-5">
          <div className="row">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  className="rounded-circle mt-5"
                  width="300px"
                  src="https://previews.123rf.com/images/pcanzo/pcanzo1610/pcanzo161000038/66603809-in-vector-cartoon-representing-a-funny-ambulance-driver-hurrying-and-driving.jpg"
                />
              </div>
            </div>

            <div className="col-md-9 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Register Driver</h4>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="first name"
                      ref={firstNameRef}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">Last name</label>
                    <input
                      type="text"
                      className="form-control"
                      ref={lastNameRef}
                      placeholder="last name"
                    />
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-md-12 mt-2">
                    <label className="labels">Driving License</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="enter driving license"
                      ref={drivingLicenseRef}
                    />
                  </div>
                  <div className="col-md-12 mt-2">
                    <label className="labels">Phone no</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="enter driving license"
                      ref={phoneNoRef}
                    />
                  </div>

                  <div className="row mt-2">
                    <div className="col-md-6 mt-2">
                      <label className="labels">City</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="enter your current city"
                        ref={cityRef}
                      />
                    </div>

                    <div className="col-md-6 mt-2">
                      <label className="labels">District</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="enter your current district"
                        ref={districtRef}
                      />
                    </div>
                  </div>
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
                  <div className="mt-5 text-center">
                    <button
                      className="btn btn-danger profile-button"
                      type="submit"
                    >
                      Register Driver
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
