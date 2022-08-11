import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import { Navigate, useNavigate, useParams } from "react-router-dom";



export default function DonorInfo() {
  const [donor, setDonor] = useState([]);
  const params = useParams();

  useEffect(() => {
    axios
    .get(
      `http://localhost:5001/api/user/donor/${params.id}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
    .then((response) => {

      if(response.data.error)
      {
        console.log(response.data.error)
      }
      else
      {
        console.log(response.data)
        setDonor(response.data)
      }

    })
  },[])

  return (
    <>

      <NavigationBar />
     
      <div className="container row mt-5 ">
              <div
                className="card"
                style={{
                  background: "radial-gradient(#fbc1cc, #fa99b2)",
                  margin: 20,
                  padding: 20,
                  borderRadius: 10,
                  boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.25)",
                  transition: "all 0.2s",
                }}
              >
               

                <h2 className="text-center">Donor Info </h2>
               <div className="container"  style={{
                     padding: 50,
                      display: "grid",
                      gridGap: 10,
                    }}>
               <div
                      style={{
                        border: "1px solid transparent",
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ fontWeight: 700 }}>Name: </span>
                      {donor.first_name} {donor.last_name}
                    </div>
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ fontWeight: 700 }}>
                        Nid/BirthCertificate No:{" "}
                      </span>
                      {donor.nid_birthCtf}
                    </div>
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ fontWeight: 700 }}>
                        Blood group requested :{" "}
                      </span>
                      {donor.blood_group}
                    </div>
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ fontWeight: 700 }}>Phone No: </span>
                      {donor.phone_no}
                    </div>

                    <div
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ fontWeight: 700 }}>City: </span>
                      {donor.adress.city}
                    </div>
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ fontWeight: 700 }}>District: </span>
                      {donor.adress.district}
                    </div>
               </div>
               </div>
               </div>
            
              
          

      
      

     
    </>
  );
}
