import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import styles from "../styles/Search.module.css";
import NavigationBar from "../components/NavigationBar";

export default function DonorS() {
  function SelectComponent() {
    //  const [bloodGrp, setBloodGrp] = useState("");
    return (
      <div>
        <div className="row">
          <div className="form-row">
            <div
              className="form-group"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
             
              <select  className="form-control">
                <option selected>Select Blood Group</option>
                <option value="1">O+</option>
                <option value="2">O-</option>
                <option value="3">A+</option>
                <option value="4">A-</option>
                <option value="5">B+</option>
                <option value="6">B-</option>
                <option value="7">AB+</option>
                <option value="8">AB-</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
      Search for a Donor
      </h2>
      <div style={{ paddingLeft: 400, paddingRight: 400, marginTop: 20 }}>
        <Card style={{padding:10}} className="shadow">
          <Card.Body>
            Advanced Search
            <Form style={{marginTop:20}} >
            <SelectComponent  />

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
