import React from "react";
import {  Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import styles from '../styles/Table.module.css'

export default function Driver() {
  return (
    <>

      <NavigationBar />
      

      <div className="container" style={{ marginTop: 50}}>
        <h2 style={{ textAlign: "center" }}>Ambulance</h2>


        <table className={styles.tables} style={{marginTop: 50}}>
  <thead>
    <tr>
      <th>#</th>
      <th>Vehicle Id</th>
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
</table>


        <div className="container"></div>
      </div>
    </>
  );
}
