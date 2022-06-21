import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import styles from "../styles/Search.module.css";
import NavigationBar from "../components/NavigationBar";

export default function MedCenS() {


  return (
    <>
      <NavigationBar />
      {/* <div className="container" style={{ marginTop: 50 }}>
        <div className={styles.search}>
          <input
            type="text"
            className={styles.searchTerm}
            placeholder="Search for a Donor"
          />
          <button type="submit" className={styles.searchButton}>
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div> */}
      <h2 style={{textAlign: "center", marginTop: 50, color: "grey"}}>
      Search for a Medical Centre
      </h2>
      <div style={{ paddingLeft: 400, paddingRight: 400, marginTop: 20 }}>
        <Card style={{padding:10}} className="shadow">
          <Card.Body>
            Advanced Search
            <Form style={{marginTop:20}} >
           
            <Form.Control  type="text" placeholder="Name" />
              <Form.Control style={{marginTop:10}} type="text" placeholder="District" />
              <Form.Control style={{marginTop:10}} type="text" placeholder="Town" />
              <Form.Control style={{marginTop:10}} type="text" placeholder="Village/Road" />
              

             
              <Button style={{marginTop:20, backgroundColor: "#FF0000"}} type="submit">Search</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
