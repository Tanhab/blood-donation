import React from "react";
import NavigationBar from "../components/NavigationBar";
import { Table } from "react-bootstrap";
import styles from '../styles/Table.module.css'

export default function Donations() {
  return (
    <>
      <NavigationBar />
      <div className="container" style={{ marginTop: 50 }}>
        <h2 style={{ textAlign: "center"}}>DONATIONS</h2>

<div className="container">


        <img src="https://wallpapercave.com/wp/wp4323504.jpg" alt="image" className="w-100"/>
        </div>
        <table className={styles.tables} style={{marginTop: 50}}>
  <thead>
    <tr>
      <th>#</th>
      <th>Donor</th>
      <th>Recipient</th>
      <th>Date of donation</th>
      <th>Medical Centre</th>
      <th>Status</th>
   
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mike Jr </td>
      <td>Lily James</td>
      <td>03/05/2022</td>
      <td>Popular Diagnostic Centre</td>
      <td>Pending</td>
    
    </tr>
    <tr>
    <td>2</td>
      <td>Jack Smith </td>
      <td>Ruby Grant</td>
      <td>03/04/2022</td>
      <td>Popular Diagnostic Centre</td>
      <td>Completed</td>
    </tr>
  
  </tbody>
</table>

   
      </div>
    </>
  );
}
