import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";

export default function Notification() {
  return (
    <>
      <NavigationBar />

      <div className="container" style={{ marginTop: 50 }}>
        <h2 style={{ textAlign: "center" }}>Notifications</h2>

        <div>
          <div className="box shadow-sm rounded bg-white mb-3">
            <div className="box-title border-bottom p-3">
              <h6 className="m-0">Recent</h6>
            </div>
            <div >
              <div className="p-3 d-flex justify-content-between bg-light border-bottom ">
                <div className="font-weight-bold mr-3">
                  <div>Blood Received</div>

                  <div className="small">
                    You have received blood from our blood bank on 21 June, 2022
                  </div>
                </div>

                <span>
                  <br />
                  <div className="ml-auto text-muted pt-1">-3d</div>
                </span>
              </div>
              <div className="p-3 d-flex justify-content-between">
                <div className="font-weight-bold mr-3">
                  <div>Blood Donated</div>
                  <div className="small">
                    You have donated blood in our blood bank on 16 Jan, 2021
                  </div>
                </div>

                <span>
                  <br />
                  <div className="ml-auto text-muted pt-1">-1yr</div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
