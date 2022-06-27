import React, { useEffect, useRef, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import styles from "../styles/Search.module.css";
import NavigationBar from "../components/NavigationBar";
import axios from "axios";
import Donor from "../components/Donor";

export default function DonorSearch() {

  const cityRef = useRef()
  const districtRef = useRef()
  const bloodGrpRef = useRef()
  const [bloodGrp, setBloodGrp] = useState("undefined");
  const [donors, setDonors] = useState([])
  const [query, setQuery] = useState("")

    useEffect(() => {
        console.log("useEffect called")
        let route = "http://localhost:5001/api/search"
        if(query && query.length >0)
            route = `${route}?${query}`
        console.log("route", route)
        axios.get(route)
        .then((response) => {
            console.log(response.data.users)
            if(response.data.users)
                setDonors(response.data.users)
            else 
            setDonors([])
            
        }).catch((error)=>{
            console.log(error)
        })
    }, [query,setDonors])
    

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
              <select className="form-control"
              ref={bloodGrpRef} value={bloodGrp} onChange={(e) => setBloodGrp(e.target.value)}>
                <option selected>Select Blood Group</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
  async function handleSubmit(e){
    e.preventDefault()
     console.log("here in handle")
     let params = {}
     if(bloodGrpRef.current.value  !== "Select Blood Group" )
     params['blood_group'] = bloodGrpRef.current.value
     if(cityRef.current.value)
     params['city'] = cityRef.current.value
     if(districtRef.current.value)
     params['district'] = districtRef.current.value
     let url = ""
    try {
        url = new URLSearchParams(params)
    } catch (error) {
        console.log(error)
    }
    console.log(url.toString())
    setQuery(url.toString())
    donors.map((item,key)=>{
        console.log(key)
    })
     
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
              <Form style={{ marginTop: 20 }} onSubmit={(e)=>handleSubmit(e)}>
                <SelectComponent />
                <Form.Control
                  style={{ marginTop: 10 }}
                  type="text"
                  placeholder="city"
                  ref={cityRef}
                />
                <Form.Control
                  style={{ marginTop: 10 }}
                  type="text"
                  placeholder="District"
                  ref = {districtRef}
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
          <div className="row" >
            {donors.map((item,key)=>{
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
            })}
          </div>
        </div>
      </div>
    </>
  );
}
