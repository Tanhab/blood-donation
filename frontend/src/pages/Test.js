import React, { useState,useEffect } from 'react'
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"
import axios from 'axios'

const Test = () => {

    const [medicals,setMedicals] = useState([])
    const [medicalName,setMedicalName] = useState()
    useEffect(() => {
      axios
        .get("http://localhost:5001/api/medical-centre/all-medical-centres", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error)
          } else {
            console.log(response.data.medical_centre)
            setMedicals(response.data.medical_centre)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }, [setMedicals])
    
    const handleMedicalSelect = (e) => {
      const selcted = medicals.find(({ m_id }) => m_id == e)
      setMedicalName(selcted.name)
    }
  return (
    <div className="d-flex justify-content-center mt-5">
      <DropdownButton
        title={medicalName? medicalName:"Select medical centre"}
        id="dropdown-menu"
        onSelect={handleMedicalSelect}
      >
        {
            medicals.map((medical)=>{
                return (
                  <Dropdown.Item key={medical.m_id} eventKey={`${medical.m_id}`} >{medical.name}</Dropdown.Item>
                )
            })
        }
      </DropdownButton>
    </div>
  )
}

export default Test