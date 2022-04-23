import React from "react";
import { Form, Button, Alert, DropdownButton, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Signup.module.css";
import NavigationBar from "./NavigationBar";
import SelectComponent from "./SelectComponent";

export default function Signup() {
  return (
    <>
      <NavigationBar />
      <div className={styles.bg}>
      

        <div className={styles.login}>
          <div className={styles.form}>
            <Form className="login-form">
              <Form.Control type="text" placeholder="First name" required />
              <Form.Control type="text" placeholder="Last name" required />
              <Form.Control type="email" placeholder="Email" required />
              <Form.Control type="text" placeholder="Phone number" required />
              <Form.Control type="password" placeholder="Password" required />
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                required
              />
   <SelectComponent/>
              <Button type="submit">Sign Up</Button>
              <p className={styles.message}>
                Already registered? <Link to="/login">Login</Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
