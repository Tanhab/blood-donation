import React from "react";
import {  Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

export default function Organization() {
  return (
    <>
      <NavigationBar />

      <div className="container" style={{ marginTop: 50 }}>
        <h2 style={{ textAlign: "center" }}>Organization</h2>


       

        <Table bordered hover style={{marginTop: 50}}>
  <thead>
    <tr>
      <th>#</th>
      <th>Org Name</th>
      <th>Org Branch</th>
      <th>Hotline</th>
     
   
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Popular Donor Centre </td>
      <td>Dhaka Branch</td>
      <td>02438957283</td>
      
      
    
    </tr>
    <tr>
    <td>2</td>
      <td>Popular Donor Centre </td>
      <td>Dhaka Branch</td>
      <td>02438957283</td>
    </tr>
  
  </tbody>
</Table>


        <div className="container"></div>
      </div>
    </>
  );
}
