import React from "react";
import { Card } from "react-bootstrap";
import styles from "../styles/Search.module.css";

export default function Search() {
  return (
    <>
      <div className="container" style={{ marginTop: 50 }}>
        <div className={styles.search}>
          <input
            type="text"
            className={styles.searchTerm}
            placeholder="What can we help you find today?"
          />
          <button type="submit" className={styles.searchButton}>
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div className="container" style={{ marginTop: 100 }}>
        <ul className={styles.checklist}>
          <li>
              <Card style={{padding:10}}>
              Find Donors
                  </Card></li>
          <li>
          <Card style={{padding:10}}>Find Blood
          
          </Card></li>
          <li>
          <Card style={{padding:10}}>Find Medical Centres</Card></li>
          <li>
          <Card style={{padding:10}}>Find Ambulances</Card></li>
          <li>
          <Card style={{padding:10}}>Find Drivers</Card></li>
        </ul>
      </div>
    </>
  );
}
