import React, { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import styles from "../styles/Table.module.css";
import axios from "axios";

export default function DonorList() {
  const [donors, setDonors] = useState([]);
  const getDonors = async ()=>{
    axios
      .get("http://localhost:5001/api/user/donors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data)

        setDonors(response.data.donors)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    getDonors()
  }, []);

  const verifyDonor = async (nid)=>{
      axios.get(`http://localhost:5001/api/user/verify-donor/${nid}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((response)=>{
        return getDonors()
      }).catch(error => console.log(error))
  }

  console.log(donors);
  return (
    <>
      <NavigationBar />

      <div className="container" style={{ marginTop: 50 }}>
        <h2 style={{ textAlign: "center" }}>Donors</h2>

        <table className={styles.tables} style={{ marginTop: 50 }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Nid/BirthCertificate</th>
              <th>Address</th>
              <th>BloodGroup</th>
              <th>Phone No</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((item,key)=> {
              return (
                <tr>
                  <td>{key + 1}</td>
                  <td>
                    {item.first_name} {item.last_name}
                  </td>
                  <td>{item.nid_birthCtf}</td>
                  <td>
                    {item.address.city},{item.address.district}
                  </td>
                  <td>{item.blood_group}</td>
                  <td>{item.phone_no}</td>
                  <td className="text-center">
                    {item.verified ? (
                      <>
                        <span style={{backgroundColor: "green" }} className="badge text-bg-success">verified</span>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          class="btn btn-success"
                          onClick={() => verifyDonor(item.nid_birthCtf)}
                        >
                          <i className="fa fa-check" aria-hidden="true"></i>
                        </button>
                      </>
                    )}

                    <button
                      type="button"
                      className="btn btn-danger"
                      style={{ marginLeft: 10 }}
                    >
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-warning"
                      style={{ marginLeft: 10 }}
                    >
                      Check eligibility
                    </button>
                  </td>
                </tr>
              )
            })}
           
          </tbody>
        </table>

        <div className="container"></div>
      </div>
    </>
  );
}
