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
        <h2 style={{ textAlign: "center" }}>Driver</h2>


      

        <table className={styles.tables} style={{marginTop: 50}}>
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Driving License</th>
      <th>Station</th>
      <th>Vehicle</th>
     
   
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Paul Nigel </td>
      <td>02438957283gvedf</td>
      <td>xyz, skejbdgkvb</td>
      <td>nil</td>
      
    
    </tr>
    <tr>
    <td>2</td>
    <td>Mark Bd </td>
      <td>0243db 8957283</td>
      <td>xyz, skejbdgkvb</td>
      <td>3463637</td>
    </tr>
  
  </tbody>
</table>


        <div className="container"></div>
      </div>
    </>
  );
}
