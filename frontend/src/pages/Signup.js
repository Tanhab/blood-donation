import React, { useRef, useState, useContext } from "react";
import { Form, Button, Alert, DropdownButton, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios'
import styles from "../styles/Signup.module.css";
import NavigationBar from "../components/NavigationBar";
import { AuthContext } from "../helpers/AuthContext";



export default function Signup() {
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
const { setAuthState } = useContext(AuthContext);
const emailRef = useRef()
const passwordRef = useRef()
const passwordConfirmRef = useRef()
const firstNameRef = useRef();
const lastNameRef = useRef();
const phoneNoRef = useRef();
const bloodGrpRef = useRef();

const [error, setError] = useState("")
const [loading, setLoading] = useState(false)
const navigate = useNavigate();



  function register()
  {
    Axios.post("http://localhost:5001/api/user/",{
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    //   phone_no: phoneNoRef.current.value,
    //   a_id: 1,
    //   blood_group: bloodGrpRef.current.value

    }).then((response) => {
      if (response.data.error) {
        setAlertContent(response.data.error);
        setAlert(true);
        console.log(response.data.error);
      } else {
        localStorage.setItem("token", response.data.token);
        setAuthState(true)
        navigate('/home')
      }
      console.log(response)
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setAlertContent("Password didn't match");
      setAlert(true);
    }
    else
    {
      try {
     
        setAlert(false);
        setLoading(true)
        await register()
      } catch {
        setAlertContent("Failed to create an account");
        setAlert(true);
       
      }
      setLoading(false)
    }

    
  }

  return (
    <>
       <NavigationBar />
      <div className={styles.bg}>
      

        <div className={styles.login}>
          <div className={styles.form}>
            <Form  onSubmit={handleSubmit} className="login-form">
              <Form.Control type="text" placeholder="First name" ref={firstNameRef} required />
              <Form.Control type="text" placeholder="Last name" ref={lastNameRef} required />
              <Form.Control type="email" placeholder="Email" ref={emailRef} required />
              <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                ref={passwordConfirmRef}
                required
              />
                {/* <SelectComponent/> */}
                {alert ? <Alert variant={'danger'}>{alertContent}</Alert> : <></> }
              <Button disabled={loading} type="submit">Sign Up</Button>
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
