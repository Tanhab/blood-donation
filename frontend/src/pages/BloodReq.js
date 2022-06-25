import React from "react";
import NavigationBar from "../components/NavigationBar";
import { Card } from "react-bootstrap";

export default function BloodReq() {
  return (
    <>
      <NavigationBar />

      <div className="container ">
  <div className="py-5 text-center">
    <img className="d-block mx-auto mb-4" src="icon.png" alt="" width="72" height="72"/>
    <h2>Request For Blood</h2>
    <p className="lead">CRIMSON is there to help you provide blood from our storage or reach out to more and more potential donors. 
    Fill this short form to request for blood.
</p>
  </div>

  <Card className="shadow p-5 mb-5">

  <div className="row">
          <div className="col-md-6 mb-3">
            <label >First name</label>
            <input type="text" className="form-control" id="firstName" placeholder="enter your first name" value="" required/>
          
          </div>
          <div className="col-md-6 mb-3">
            <label >Last name</label>
            <input type="text" className="form-control" id="lastName" placeholder="enter your last name" value="" required/>
           
          </div>
        </div>
        <div className="mb-3">
          <label >Email </label>
          <input type="email" className="form-control" id="email" placeholder="you@example.com"/>
          
        </div>
        <div className="mb-3">
          <label>Phone number </label>
          <input type="text" className="form-control" id="phone_no" placeholder="enter your phone no"/>
          
        </div>
       
        <div className="mb-3">
          <label>City/Village </label>
          <input type="text" className="form-control" id="city/village" placeholder="enter your address"/>
          
        </div>


        <div className="row">
          <div className="col-md-6 mb-3">
            <label >Blood Group</label>
            <select className="custom-select d-block w-100" style={{height: 38}} id="blood_grp" required>
              <option value="">Choose...</option>
              <option>O+</option>
              <option>O-</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>
      
          </div>
         
          <div className="col-md-6 mb-3">
            <label >Units of Blood</label>
            <input type="text" className="form-control" id="zip" placeholder="" required/>
         
          </div>
        </div>

        <button className="btn btn-danger btn-lg btn-block m-5" type="submit">Create Request</button>
  </Card>

  </div>
    </>
  );
}
