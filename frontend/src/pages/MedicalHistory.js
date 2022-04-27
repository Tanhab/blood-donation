import React from "react";
import NavigationBar from "../components/NavigationBar";
import {Table} from "react-bootstrap"

export default function MedicalHistory() {
  return (
    <>
      <NavigationBar />

      <div className="container" style={{ marginTop: 50 }}>
        <h2 style={{ textAlign: "center" }}>Medical History</h2>
        <div className="row" style={{ marginTop: 50 }}>
          <div className="col-xl-6 col-md-12">
            <div
              className="card overflow-hidden shadow"
              style={{ background: "#ffc0cb" }}
            >
              <div className="card-content">
                <div className="card-body cleartfix">
                  <div className="media align-items-stretch">
                    <div className="float-end">
                      <img src="blood-bag.png" alt="icon" width={64} />
                    </div>
                    <div className="media-body">
                      <h3 style={{ color: "red" }}>Last Donated</h3>
                      <span>3 bags of blood</span>
                    </div>
                    <div className="align-right">
                      <h4>3rd April, 2022</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-md-12">
            <div
              className="card overflow-hidden shadow"
              style={{ background: "#ffc0cb" }}
            >
              <div className="card-content">
                <div className="card-body cleartfix">
                  <div className="media align-items-stretch">
                    <div className="float-end">
                      <img src="donor.png" alt="icon" width={64} />
                    </div>
                    <div className="media-body">
                      <h3 style={{ color: "red" }}>Last Received</h3>
                      <span>-------</span>
                    </div>
                    <div className="align-right">
                      <h4>Not yet</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />

        <div className="row">
          <div className="col-xl-6 col-md-12">
            <div className="card overflow-hidden">
              <div className="card-content">
                <div className="card-body cleartfix">
                  <div className="media align-items-stretch">
                    <div className="align-self-center"></div>
                    <div className="media-body">
                      <h4>Last Checked:</h4>
                      <span>2nd April, 2022</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-md-12">
            <div className="card overflow-hidden">
              <div className="card-content">
                <div className="card-body cleartfix">
                  <div className="media align-items-stretch">
                    <div className="align-self-center"></div>
                    <div className="media-body">
                      <h4>Checked At:</h4>
                      <span>Popular Diagnostic Centre</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="card p-3 text-center"> 
          <h3>Status</h3>
          <p>Eligible for donation after 4 months of last donation.</p>
         
          </div>
        </div>

        <br/>
        <br/>

        <h4>Donation and Receving Table</h4>

        <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Date</th>
      <th>Status</th>
   
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>03/04/2022</td>
      <td>Donated blood</td>
    
    </tr>
    <tr>
      <td>2</td>
      <td>24/07/2021</td>
      <td>Donated blood</td>
    </tr>
  
  </tbody>
</Table>
      </div>
    </>
  );
}
