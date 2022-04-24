import React, { useRef, useState, useContext } from "react"
import { Form, Button, Alert, DropdownButton, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios'
import styles from "../styles/Signup.module.css";
import NavigationBar from "./NavigationBar";
import { AuthContext } from "../helpers/AuthContext";



export default function Signup() {

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

  function SelectComponent() {


    const [bloodGrp, setBloodGrp] = useState("");
      return(
          <div>
              <div className="row">
                 
                      
                          <div className="form-row">
                              <div className="form-group col-md-6">
                                  <label>Blood Group:</label>
                                  <select className="form-control" ref={bloodGrpRef} value={bloodGrp} onChange={(e) => setBloodGrp(e.target.value)}>
                                      <option selected>Select Blood Group</option>
                                      <option value="1">O+</option>
                                      <option value="2">O-</option>
                                      <option value="3">A+</option>
                                      <option value="4">A-</option>
                                      <option value="5">B+</option>
                                      <option value="6">B-</option>
                                      <option value="7">AB+</option>
                                      <option value="8">AB-</option>
                                  </select>
                              </div>
                          </div>
                       
                      
               
              </div>
          </div>
      )  
  }

  function register()
  {
    console.log(bloodGrpRef.current.value)
    Axios.post("http://localhost:5000/api/user/",{
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      phone_no: phoneNoRef.current.value,
      a_id: 1,
      blood_group: bloodGrpRef.current.value

    }).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
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
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await register()
      
     
    
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
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
              <Form.Control type="text" placeholder="Phone number" ref={phoneNoRef} required />
              <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                ref={passwordConfirmRef}
                required
              />
   <SelectComponent/>
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
