import React, { useRef, useState, useContext } from "react"
import { Form, Button, Alert, DropdownButton, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Signup.module.css";
import NavigationBar from "../components/NavigationBar";
import Axios from 'axios'
import { AuthContext } from "../helpers/AuthContext";


export default function Login() {
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  function login()
  {

      Axios.post("http://localhost:5001/api/user/login",{
      email: emailRef.current.value,
      password: passwordRef.current.value,
   
    }).then((response) => {
      console.log(response)
      if (response.data.error) {
        setAlertContent(response.data.error);
        setAlert(true);
        console.log(response.data.error);
      } else {
        localStorage.setItem("token", response.data.token);
        setAuthState(true)
        navigate('/home')
      }
     
    }) .catch ((error)=> {
      setAlertContent(error.response.data.message);
      setAlert(true);
        console.log({error2: error.response.data.message})
    })

  }
  async function handleSubmit(e) {
    e.preventDefault()
    console.log("i am here")
    try {
      setError("")
      setLoading(true)
      await login()
      
     
    } catch {
      setAlertContent("Failed to log in");
      setAlert(true);
     
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
            
            {alert ? <Alert variant={'danger'}>{alertContent}</Alert> : <></> }
            <Button disabled={loading} type="submit">login</Button>
            <p className={styles.message}>Not registered? <Link to="/choice">Create an account</Link></p>
          </Form>
        </div>
      </div>
      </div>
    </>
  );
}
