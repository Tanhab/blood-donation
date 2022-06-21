import React from "react";
import { Card } from "react-bootstrap";
import styles from "../styles/Search.module.css";
import NavigationBar from "../components/NavigationBar";
import { Routes, Route, useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();

  function goToDonor() {
    navigate("/donor");
  }
  function goToBlood() {
    navigate("/blood");
  }
  function goToMedCen() {
    navigate("/med-cen");
  }
  function goToAmb() {
    navigate("/amb");
  }
  return (
    <>
      <NavigationBar />
      {/* <div className="container" style={{ marginTop: 50 }}>
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
      </div> */}

      <h2 style={{ textAlign: "center", marginTop: 100, color: "grey" }}>
        What can we help you find today?
      </h2>
      <div className="container" style={{ marginTop: 80 }}>
        <ul className={styles.checklist}>
          <li>
            <Card
              onClick={goToDonor}
              className="shadow-sm"
              style={{ padding: 10 }}
            >
              Find Donors
            </Card>
          </li>
          <li>
            <Card
              onClick={goToBlood}
              className="shadow-sm"
              style={{ padding: 10 }}
            >
              Find Blood
            </Card>
          </li>
          <li>
            <Card className="shadow-sm" style={{ padding: 10 }} onClick={goToMedCen}>
              Find Medical Centres
            </Card>
          </li>
          <li>
            <Card className="shadow-sm" style={{ padding: 10 }} onClick={goToAmb}>
              Find Ambulances
            </Card>
          </li>
         
        </ul>
      </div>
    </>
  );
}
