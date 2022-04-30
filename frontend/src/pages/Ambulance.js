import React from "react";
import {  Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

export default function Driver() {
  return (
    <>

      <NavigationBar />
      

      <div className="container" style={{ marginTop: 50}}>
        <h2 style={{ textAlign: "center" }}>Ambulance</h2>


        <Link className="btn btn-dark" style={{marginTop: 50}}
        to="/medicalcentrereg"
        >
            Register Ambulance
        </Link>

        <Table bordered hover style={{marginTop: 10}}>
  <thead>
    <tr>
      <th>#</th>
      <th>Vehical Id</th>
      <th>Organization</th>
      <th>Phone No</th>
     
     
   
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>9283472398</td>
      <td>Popular</td>
      <td>0187345</td>
     
      
    
    </tr>
    <tr>
    <td>2</td>
    <td>9283472398</td>
      <td>Popular</td>
      <td>0187345</td>
    </tr>
  
  </tbody>
</Table>


        <div className="container"></div>
      </div>
    </>
  );
}
