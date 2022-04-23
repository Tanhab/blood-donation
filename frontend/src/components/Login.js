import React from "react";
import { Form, Button, Alert, DropdownButton, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Signup.module.css";
import NavigationBar from "./NavigationBar";


export default function Login() {
  return (
    <>
      <NavigationBar />
      <div className={styles.bg}>
        <br />

        <div className={styles.login}>
          <div className={styles.form}>
            <Form className="login-form">
            
              <Form.Control type="email" placeholder="Email" required />
             
              <Form.Control type="password" placeholder="Password" required />
        
   
              <Button type="submit">Login</Button>
              <p className={styles.message}>
                Not a member yet? <Link to="/signup">Sign Up</Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
