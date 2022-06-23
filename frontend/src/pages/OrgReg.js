import React, { useRef, useState, useContext, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";

export default function OrgReg() {
  const [organizationNameValue, setOrganizationNameValue] = useState("");
  const [phoneNoValue, setPhoneNoValue] = useState("");
  const [organizationBranchValue, setOrganizationBranchValue] = useState("");


  const organizationNameRef = useRef();
  const phoneNoRef = useRef();
  const organizationBranchRef = useRef();


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
                  src="https://images.all-free-download.com/images/graphicwebp/city_background_high_buildings_icons_colored_flat_design_6836743.webp"
                />
              </div>
            </div>

            <div className="col-md-9 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Register Organization</h4>
                </div>
                <div className="row mt-2">
                  <div className="col-md-12 mt-2">
                    <label className="labels">Organization Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter organization name"
                      value={organizationNameValue}
                      ref={organizationNameRef}
                      onChange={(e) => setOrganizationNameValue(e.target.value)}
                    />
                  </div>

                  <div className="col-md-12 mt-2">
                    <label className="labels">Organization Branch</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter organization branch"
                      value={organizationBranchValue}
                      ref={organizationBranchRef}
                      onChange={(e) => setOrganizationBranchValue(e.target.value)}
                    />
                  </div>

                  <div className="col-md-12 mt-2">
                    <label className="labels">Hotline</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter phone number"
                      value={phoneNoValue}
                      ref={phoneNoRef}
                      onChange={(e) => setPhoneNoValue(e.target.value)}
                    />
                  </div>

               
                 
              
              <div className="mt-5 text-center">
                <button className="btn btn-danger profile-button" type="button">
                  Save Organization
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
