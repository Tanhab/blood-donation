import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Card, Dropdown, DropdownButton, Form } from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { isExpired, decodeToken } from "react-jwt";

const AcceptBloodReq = () => {
  const [medicals, setMedicals] = useState([]);
  const [medicalName, setMedicalName] = useState();
  const [station, setStation] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [blood_request, setBloodReq] = useState([]);
  const [reciepent, setRecipent] = useState([]);
  const dateDonatedRef = useRef();
  const params = useParams();
  const myDecodedToken = decodeToken(localStorage.getItem("token"));
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/request-blood/blood-req/${params.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBloodReq(response.data[0]);
        console.log(response.data);
        return axios.get(
          `http://localhost:5001/api/user/profile/${response.data[0].uid}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
      })
      .then((response) => {
        console.log(response.data);
        setRecipent(response.data);

        return axios.get(
          "http://localhost:5001/api/medical-centre/all-medical-centres",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setMedicals(response.data.medical_centre);
          setIsLoading(false);
        }
      })
      .catch((error) => console.log(error));
  }, [setBloodReq, setMedicals, setIsLoading]);

  const handleMedicalSelect = (e) => {
    console.log(e);
    setStation(e);
    const selcted = medicals.find(({ m_id }) => m_id == e);
    setMedicalName(selcted.name);
  };
  const handleAccept = (e) => {
    e.preventDefault();
    const data = {
      donor: myDecodedToken.id,
      date_donated: dateDonatedRef.current.value,
      medical_centre: station,
    };

    axios
      .post(
        `http://localhost:5001/api/request-blood/accept-req/${params.id}`,
        data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        let data = {
          message: "Your blood request was accepted",
          reciever: reciepent.uid,
          blood_request: blood_request.req_id,
          sender: myDecodedToken.id,
        };
        return axios.post(
          "http://localhost:5001/api/notification/accept",
          data,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
      })
      .then((response) => {
        navigate("/home", { replace: true });
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      {!isLoading && (
        <>
          <NavigationBar />

          <div className="container">
            {/* <p>Blood request details</p>
            {blood_request.completed ? (
              <button type="button" className="btn btn-success">
                Completed
              </button>
            ) : (
              <button type="button" className="btn btn-danger">
                Pending
              </button>
            )} */}

            <div className="row mt-5 ">
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
                <div style={{ position: "relative", textDecoration: "none" }} >
                 
                {blood_request.completed ? (
              <button type="button" className="btn btn btn-success">
                Completed
              </button>
            ) : (
              <button type="button" className="btn btn btn-warning">
                Pending
              </button>
            )}
                </div>

                <h2 className="text-center">Recipient Info </h2>
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
                      {reciepent.first_name} {reciepent.last_name}
                    </div>
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ fontWeight: 700 }}>
                        Nid/BirthCertificate No:{" "}
                      </span>
                      {blood_request.nid_birthCtf}
                    </div>
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ fontWeight: 700 }}>
                        Blood group requested :{" "}
                      </span>
                      {blood_request.blood_group}
                    </div>
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ fontWeight: 700 }}>Building: </span>
                      {blood_request.address.building}
                    </div>
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ fontWeight: 700 }}>Village_road: </span>
                      {blood_request.address.village_road}
                    </div>

                    <div
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ fontWeight: 700 }}>Post_office: </span>
                      {blood_request.address.post_office}
                    </div>

                    <div
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ fontWeight: 700 }}>City: </span>
                      {blood_request.address.city}
                    </div>
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ fontWeight: 700 }}>District: </span>
                      {blood_request.address.district}
                    </div>
               </div>
               <button
                    className="btn btn-danger btn-md"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    Donate blood
                  </button>
              </div>
             
              {!blood_request.completed && (
                <>
                

                  <div className="collapse" id="collapseExample">
                    <div className="card card-body">
                      <div className="mt-5 ">
                        <DropdownButton
                          title={
                            medicalName ? medicalName : "Select Medical Centre"
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
                            );
                          })}
                        </DropdownButton>
                      </div>
                      <div className="mb-3 mt-3">
                        <label> Last blood donated </label>
                        <Form.Control
                          type="date"
                          datatype="dd/mm/yy"
                          name="last_donated"
                          ref={dateDonatedRef}
                        />
                      </div>
                      <button
                        className="btn btn-success col-3"
                        onClick={handleAccept}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AcceptBloodReq;
