import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import styles from "../styles/Search.module.css";
import NavigationBar from "../components/NavigationBar";

export default function AmbS() {


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
      Search for an Ambulance
      </h2>
      <div style={{ paddingLeft: 400, paddingRight: 400, marginTop: 20 }}>
        <Card style={{padding:10}} className="shadow">
          <Card.Body>
            Advanced Search
            <Form style={{marginTop:20}} >
           

              <Form.Control style={{marginTop:10}} type="text" placeholder="Name of Medical Centre" />
              
             
              <Button style={{marginTop:20, backgroundColor: "#FF0000"}} type="submit">Search</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>

      <div style={{ padding: 200 }}>
          <h3 style={{ marginTop: -100 }}>Ambulance List</h3>
          <div className="row">
            <div className="p-4 col-lg-3">
              <div
                className="card text-white bg-danger mb-3 "
                style={{ maxWidth: 300, marginTop: 20 }}
              >
                <div className="card-body">
                  <h5 className="card-title">Popular Diagnostic Centre</h5>
                  <p className="card-text">
                    Available Ambulances: 3
                  </p>
                  <button className="btn btn-sm bg-white">More Info</button>
                </div>
              </div>
            </div>

            <div className="p-4 col-lg-3">
              <div
                className="card text-white bg-danger mb-3 "
                style={{ maxWidth: 300, marginTop: 20 }}
              >
                <div className="card-body">
                  <h5 className="card-title">Central Hospital</h5>
                  <p className="card-text">
                  Available Ambulances: 1
                  </p>
                  <button className="btn btn-sm bg-white">More Info</button>
                </div>
              </div>
            </div>
            </div>
            </div>
    </>
  );
}
