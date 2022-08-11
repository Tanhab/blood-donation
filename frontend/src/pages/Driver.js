import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import styles from "../styles/Table.module.css";
import { isExpired, decodeToken } from "react-jwt";

export default function Driver() {
  const myDecodedToken = decodeToken(localStorage.getItem('token'));
  const [drivers,setDrivers] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  

  useEffect(() => {
    axios.get("http://localhost:5001/api/driver/all", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    }).then((response)=>{
      console.log(response.data.drivers)
      setDrivers(response.data.drivers)
      setIsLoading(false)
    }).catch(error=> console.log(error))
  }, [])
  
  return (
    <>
      {!isLoading && (
        <>
          <NavigationBar />
          <div className="container" style={{ marginTop: 50 }}>
            <h2 style={{ textAlign: "center" }}>Driver</h2>

            {myDecodedToken.is_admin === 0 &&     <Link
              className="btn "
              to="/driver-reg"
              style={{ background: "green", marginTop: 50, color: "white" }}
            >
              Register as Driver
            </Link>}

         

            <table className={styles.tables} style={{ marginTop: 50 }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Driving License</th>
                  <th>city </th>
                  <th>District</th>
                  <th>Phone no</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  drivers.map((driver,key)=>{
                    return (
                      <>
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>
                            {driver.first_name} {driver.last_name}{" "}
                          </td>
                          <td>{driver.driving_license}</td>
                          <td>{driver.city}</td>
                          <td>{driver.district}</td>
                          <td>{driver.phone_no}</td>
                          {driver.verified ? (
                            <td style={{ background: "green" }}>
                              <span className="badge text-bg-success">
                                Verified
                              </span>
                            </td>
                          ) : (
                            <td style={{ background: "red" }}>
                              <span className="badge text-bg-success">
                                Not verified
                              </span>
                            </td>
                          )}
                        </tr>
                      </>
                    )
                  })
                }
                
              </tbody>
            </table>

            <div className="container"></div>
          </div>
        </>
      )}
    </>
  )
}
