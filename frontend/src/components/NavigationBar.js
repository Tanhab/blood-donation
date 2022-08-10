import { useState, useEffect } from "react";
import axios from "axios";
import { isExpired, decodeToken } from "react-jwt";
import { Link, useNavigate, NavLink } from "react-router-dom";
import styles from "../App.css";

export default function NavigationBar() {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState(false);
  const [notifications,setNotifications] = useState([])
  const [unseen,setUnseen] = useState(0)
  const myDecodedToken = decodeToken(localStorage.getItem("token"))


  useEffect(() => {
    axios
      .get("http://localhost:5001/api/user/auth", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
        
        return axios.get(`http://localhost:5001/api/notification/${myDecodedToken.id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
      }).then((response)=>{
        console.log(response)
        setNotifications(response.data) 

        return axios.get(`http://localhost:5001/api/notification/count/${myDecodedToken.id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
      }).then((response) => {
        if (response.data.error) {
          console.log(response.data.error)
        } else {
          console.log("inner")
          console.log(response.data[0]["COUNT(*)"])
          setUnseen(response.data[0]["COUNT(*)"])
          
        }
      })
      .catch(error => console.log(error));
  }, [setNotifications,setUnseen]);

  const logout = () => {
    localStorage.removeItem("token");
  
    setAuthState(false);
  };

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const handleNotificationClick = (id,req_id) =>{
    console.log(id,req_id) 
    axios.put(
      "http://localhost:5001/api/notification",
      {
        notification_id: id,
        reciever: myDecodedToken.id,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    ).then((response)=>{
        navigate(`/accept-blood-req/${req_id}`, {})
    }).catch(error=> console.log(error))
    
  }
  const Close = () => setClick(false);

  return (
    <div>
      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <div className="nav-container">
          <NavLink exact="true" to="/" className="nav-logo">
            <img src="/icon.png" alt="icon" height={40}></img>
            CRIMSON
          </NavLink>
          <span className="badge"> Admin</span>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {/* logged in  */}
            {authState && (
              <>
                <li className="nav-item">
                  <NavLink
                    exact="true"
                    to="/home"
                    //activeClassName="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    <i
                      className="fa fa-home"
                      aria-hidden="true"
                      style={{ marginRight: 5 }}
                    ></i>
                    Home
                  </NavLink>
                </li>

                <li className="dropdown nav-item">
                  <button
                    className="btn "
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ fontSize: '19.2px', marginTop: -7}}
                  >
                    <i className="fa fa-bell" aria-hidden="true"   style={{ marginRight: 5 }}></i>
                    Notifications
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                   {unseen!=0 && (unseen)}
                    </span>
                  </button>
                  <ul className="dropdown-menu ">
                    {
                      notifications.map((item)=>{
                        return (
                         
                          <li key={item.id} style={{backgroundColor: "#D3D3D3", padding: 10}} >
                            <button
                              key={item.id}
                              className="dropdown-item"
                              type="button"
                              onClick={() =>
                                handleNotificationClick(item.id,item.blood_request)
                              }
                            >
                              {item.message}
                            </button>
                          </li>
                         
                        )
                      })
                    }
                    
                  </ul>
                </li>
              </>
            )}

            <li className="nav-item">
              <NavLink
                exact="true"
                to="/search"
                //activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                <i
                  className="fa fa-search"
                  aria-hidden="true"
                  style={{ marginRight: 5 }}
                ></i>
                Search
              </NavLink>
            </li>
            {!authState && (
              <>
                <li className="nav-item">
                  <NavLink
                    exact="true"
                    to="/login"
                    // activeClassName="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    <i
                      className="fa fa-sign-in"
                      aria-hidden="true"
                      style={{ marginRight: 5 }}
                    ></i>
                    Sign In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact="true"
                    to="/signup"
                    // activeClassName="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    <i
                      className="fa fa-sign-in"
                      aria-hidden="true"
                      style={{ marginRight: 5 }}
                    ></i>
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
            {authState && (
              <>
                <li className="nav-item">
                  <NavLink
                    exact="true"
                    to="/"
                    //activeClassName="active"
                    className="nav-links"
                    onClick={logout}
                  >
                    <i
                      className="fa fa-sign-out"
                      aria-hidden="true"
                      style={{ marginRight: 5 }}
                    ></i>
                    Logout
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
    </div>
  )
}
