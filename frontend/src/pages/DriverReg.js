import React, { useRef, useState, useContext, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";

export default function DriverReg() {
    const [firstNameValue, setFirstNameValue] = useState("");
    const [lastNameValue, setLastNameValue] = useState("");
  const [vehicleIdValue, setVehicleIdValue] = useState("");
  const [drivingLicenseValue, setDrivingLicenseValue] = useState("");
  const [organizationValue, setOrganizationValue] = useState("");

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const vehicleIdRef = useRef();
  const drivingLicenseRef = useRef();
  const organizationRef = useRef();


  return (
    <>
      <NavigationBar />
      <form>
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
                </div>
        

                <div className="row mt-2">
                  <div className="col-md-12 mt-2">
                    <label className="labels">Driving License</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter driving license"
                      value={drivingLicenseValue}
                      ref={drivingLicenseRef}
                      onChange={(e) => setDrivingLicenseValue(e.target.value)}
                    />
                  </div>

    
                  <div className="col-md-12 mt-2">
                    <label className="labels">Vehicle Id</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter vehicle id"
                      value={vehicleIdValue}
                      ref={vehicleIdRef}
                      onChange={(e) => setVehicleIdValue(e.target.value)}
                    />
                  </div>

                  <div className="col-md-12 mt-2">
                    <label className="labels">Station</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter station name"
                      value={organizationValue}
                      ref={organizationRef}
                      onChange={(e) => setOrganizationValue(e.target.value)}
                    />
                  </div>
                 
              
              <div className="mt-5 text-center">
                <button className="btn btn-danger profile-button" type="button">
                  Save Ambulance
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
      </form>
    </>
  );
}
