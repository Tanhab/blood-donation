import React from "react";
import {  Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

export default function MedicalCentre() {
  return (
    <>
      <NavigationBar />

      <div className="container" style={{ marginTop: 50 }}>
        <h2 style={{ textAlign: "center" }}>Medical Centre</h2>


   

        <Table bordered hover style={{marginTop: 50}}>
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Phone No</th>
      <th>Address</th>
     
   
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Popular Diagnostic Centre </td>
      <td>02438957283</td>
      <td>xyz, skejbdgkvb</td>
      
    
    </tr>
    <tr>
    <td>2</td>
    <td>Popular Diagnostic Centre </td>
      <td>02438957283</td>
      <td>xyz, skejbdgkvb</td>
    </tr>
  
  </tbody>
</Table>


        <div className="container"></div>
      </div>
    </>
  );
}
