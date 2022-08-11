import React, { useRef, useState, useContext, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import axios from "axios";
import { isExpired, decodeToken } from "react-jwt";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Eligibility() {
  const myDecodedToken = decodeToken(localStorage.getItem('token'));
  const [last_donated, setLastChecked]=useState('')
  const [checked_at, setCheckedAt]= useState('')
  const [phy_illness, setPhyIllness] = useState('')
  const [gen_issues, setGenIssues] = useState('')
  const [medicals, setMedicals] = useState([])
  const [medicalName, setMedicalName] = useState()
  const [station, setStation] = useState()
  const navigate = useNavigate()
  const last_donatedRef = useRef();
  const checked_atRef = useRef();
  const phy_illnessRef = useRef();
  const gen_issuesRef = useRef();

  useEffect(() => {
    toast.success(
      "Registration Successful! Fill up the eligibility form to be verified",
      {
        position: "bottom-left",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    )
    axios.get(
          "http://localhost:5001/api/medical-centre/all-medical-centres",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        
      ).then((response)=>{
        if (response.data.error) {
          console.log(response.data.error)
        } else {
          setMedicals(response.data.medical_centre)
          //setIsLoading(false)
        }
      })
      .catch(error=> console.log(error));
   },[setMedicals]);

   const handleMedicalSelect = (e) => {
     //console.log(e)
     setStation(e)
     const selected = medicals.find(({ m_id }) => m_id == e)
     setMedicalName(selected.name)
   }

   const save = async () =>{
     let  date, place="", ill = "", gen ="";
     if(last_donatedRef.current.value)
     {
         date = last_donatedRef.current.value
     } 
     place = station
     if(phy_illnessRef.current.value)
     {
         ill=phy_illnessRef.current.value
     }
     if(gen_issuesRef.current.value)
     {
         gen=gen_issuesRef.current.value
     }
    axios
      .post(
        "http://localhost:5001/api/medical-history/",
        {
          uid : myDecodedToken.id,
          last_checked: date,
          checked_at: place,
          physical_illness: ill,
          genetical_issues: gen,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error)
        } else {
          console.log(response)
          navigate("/home")
        }
      })
      .catch((error) => console.log(error))
   }

  return (
    <>
      <NavigationBar />
      <form>
        <div className="container rounded  mb-5">
          <div className="row">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  className="rounded-circle mt-5"
                  width="250px"
                  src="https://cdn.pixabay.com/photo/2021/12/01/20/25/blood-drive-6839096_1280.png"
                />
              </div>
            </div>

            <div className="col-md-9 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Eligibility</h4>
                </div>
                <div className="row mt-2">
                  <div className="col-md-12 mt-2">
                    <label className="labels">Checked At</label>
                    <DropdownButton
                      title={
                        medicalName ? medicalName : "Select medical centre"
                      }
                      id="dropdown-menu"
                      onSelect={handleMedicalSelect}
                    >
                      {medicals.map((medical) => {
                        return (
                          <Dropdown.Item
                            key={medical.m_id}
                            eventKey={`${medical.m_id}`}
                          >
                            {medical.name}
                          </Dropdown.Item>
                        )
                      })}
                    </DropdownButton>
                  </div>
                  <div className="col-md-12 mt-2">
                    <label className="labels">Physical Illness</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter physical illness if have any"
                      value={phy_illness}
                      ref={phy_illnessRef}
                      onChange={(e) => setPhyIllness(e.target.value)}
                    />
                  </div>
                  <div className="col-md-12 mt-2">
                    <label className="labels">Genetic issues</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter genetic issues if have any"
                      value={gen_issues}
                      ref={gen_issuesRef}
                      onChange={(e) => setGenIssues(e.target.value)}
                    />
                  </div>

                  <div className="col-md-12 mt-2">
                    <label className="labels">Last Checked</label>
                    <span style={{ color: "red" }}>*</span>

                    <Form.Control
                      type="date"
                      datatype="dd/mm/yy"
                      name="last_donated"
                      ref={last_donatedRef}
                      value={last_donated}
                      onChange={(e) => setLastChecked(e.target.value)}
                    />
                  </div>
                  <div className="mt-5 text-center">
                    <button
                      onClick={save}
                      className="btn btn-danger profile-button"
                      type="button"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
