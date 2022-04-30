import React, { useRef, useState, useContext } from "react"
import { Form, Button, Alert, DropdownButton, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Signup.module.css";
import NavigationBar from "../components/NavigationBar";
import Axios from 'axios'
import { AuthContext } from "../helpers/AuthContext";


export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  function login()
  {

      Axios.post("http://localhost:5000/api/user/login",{
      email: emailRef.current.value,
      password: passwordRef.current.value,
   
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

    try {
      setError("")
      setLoading(true)
      await login()
      
     
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }
  return (
    <>
      <NavigationBar />
      <div className={styles.bg}>
    <br/>
    <br/>
    <br/>
    <div className={styles.login}>
        <div className={styles.form}>
      
          <Form onSubmit={handleSubmit} className="login-form">
          <h4 className=" text-center"><i className="fa fa-user-circle" style={{fontSize:"110px"}}></i></h4>
            <Form.Control type="email" placeholder="Email" ref={emailRef} required/>
            <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
            
            {error && <Alert variant="danger">{error}</Alert>}
            <Button disabled={loading} type="submit">login</Button>
            <p className={styles.message}>Not registered? <Link to="/signup">Create an account</Link></p>
          </Form>
        </div>
      </div>
      </div>
    </>
  );
}
