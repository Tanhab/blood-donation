import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import styles from "../styles/Table.module.css";

export default function Driver() {
  return (
    <>
      <NavigationBar />

      <div className="container" style={{ marginTop: 50 }}>
        <h2 style={{ textAlign: "center" }}>Driver</h2>


        <Link
            className="btn "
            to="/driver-reg"
            style={{background: 'black', marginTop: 50, color:'white'}}
          >
            {" "}
         Register as Driver
          </Link>

        <table className={styles.tables} style={{marginTop: 10}}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Driving License</th>
              <th>Station</th>
              <th>Vehicle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td>1</td>
              <td>Paul Nigel </td>
              <td>02438957283gvedf</td>
              <td>xyz, skejbdgkvb</td>
              <td>nil</td>
              <td >
                      <button type="button" class="btn btn-success">
                      <i class="fa fa-check" aria-hidden="true"></i>
                      </button>
                      <button type="button" class="btn btn-danger" style={{marginLeft: 10}}>
                      <i class="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Mark Bd </td>
              <td>0243db 8957283</td>
              <td>xyz, skejbdgkvb</td>
              <td>3463637</td>
              <td >
                      <button type="button" class="btn btn-success">
                      <i class="fa fa-check" aria-hidden="true"></i>
                      </button>
                      <button type="button" class="btn btn-danger" style={{marginLeft: 10}}>
                      <i class="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </td>
            </tr>
          </tbody>
        </table>

        <div className="container"></div>
      </div>
    </>
  );
}
