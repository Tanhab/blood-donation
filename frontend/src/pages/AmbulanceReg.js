import React, { useRef, useState, useContext, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";

export default function AmbulanceReg() {
  const [vehicleIdValue, setVehicleIdValue] = useState("");
  const [phoneNoValue, setPhoneNoValue] = useState("");
  const [organizationValue, setOrganizationValue] = useState("");


  const vehicleIdRef = useRef();
  const phoneNoRef = useRef();
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
                  width="250px"
                  src="https://www.vectorjunky.com/wp-content/uploads/2017/02/Pr%20122-%20TRI%20-%2025_02_11%20-%20006.jpg"
                />
              </div>
            </div>

            <div className="col-md-9 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Register Ambulance</h4>
                </div>
                <div className="row mt-2">
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
                    <label className="labels">Organization</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter organization name"
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
