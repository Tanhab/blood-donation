import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import styles from "../styles/Search.module.css";
import NavigationBar from "../components/NavigationBar";

export default function DonorSearch() {
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
              <select className="form-control">
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
      <div>
        <h2 style={{ textAlign: "center", marginTop: 50, color: "grey" }}>
          Search for a Donor
        </h2>
        <div style={{ paddingLeft: 400, paddingRight: 400, marginTop: 20 }}>
          <Card style={{ padding: 10 }} className="shadow">
            <Card.Body>
              Advanced Search
              <Form style={{ marginTop: 20 }}>
                <SelectComponent />

                <Form.Control
                  style={{ marginTop: 10 }}
                  type="text"
                  placeholder="District"
                />
                <Form.Control
                  style={{ marginTop: 10 }}
                  type="text"
                  placeholder="Town"
                />
                <Form.Control
                  style={{ marginTop: 10 }}
                  type="text"
                  placeholder="Village/Road"
                />

                <Button
                  style={{ marginTop: 20, backgroundColor: "#FF0000" }}
                  type="submit"
                >
                  Search
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>

        
        <div style={{ padding: 200 }}>
          <h3 style={{ marginTop: -100 }}>User List</h3>
          <div className="row">
            <div className="p-4 col-lg-3">
              <div
                className="card text-white bg-danger mb-3 "
                style={{ maxWidth: 300, marginTop: 20 }}
              >
                <div className="card-body">
                  <h5 className="card-title">John Roe</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
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
                  <h5 className="card-title">John Roe</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <button className="btn btn-sm bg-white">More Info</button>
                </div>
              </div>
            </div>

            <div className="p-4 col-lg-3" >
              <div
                className="card text-white bg-danger mb-3 "
                style={{ maxWidth: 300, marginTop: 20 }}
              >
                <div className="card-body">
                  <h5 className="card-title">John Roe</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <button className="btn btn-sm bg-white">More Info</button>
                </div>
              </div>
            </div>
            <div className="p-4 col-lg-3" >
              <div
                className="card text-white bg-danger mb-3 "
                style={{ maxWidth: 300, marginTop: 20 }}
              >
                <div className="card-body">
                  <h5 className="card-title">John Roe</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <button className="btn btn-sm bg-white">More Info</button>
                </div>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
}
