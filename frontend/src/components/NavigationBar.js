import { useState, useEffect } from "react";
import axios from "axios";

import { Link, useNavigate, NavLink } from "react-router-dom";
import styles from "../App.css";

export default function NavigationBar() {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState(false);
  
  useEffect(() => {
    axios.get("http://localhost:5000/api/user/auth", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
    },
    }).then((response) => {
      console.log(response)
      if (response.data.error) {
        setAuthState(false);
      } else {
        setAuthState(true);
      }
   
    });
  }, []);
  console.log(authState)
  const logout = () => {
    localStorage.removeItem("token");
    setAuthState(false);

  };

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  return (
    <div>
      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <img src="icon.png" alt="icon" height={40}></img>
            CRIMSON
          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
          {authState && (
          <li className="nav-item">
                  <NavLink
                    exact
                    to="/home"
                    activeClassName="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    <i
                      class="fa fa-home"
                      aria-hidden="true"
                      style={{ marginRight: 5 }}
                    ></i>
                    Home
                  </NavLink>
                </li>
          )}
            <li className="nav-item">
              <NavLink
                exact
                to="/blog"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                <i
                  class="fa fa-search"
                  aria-hidden="true"
                  style={{ marginRight: 5 }}
                ></i>
                Search
              </NavLink>
            </li>
            {!authState && (
              <li className="nav-item">
                <NavLink
                  exact
                  to="/signup"
                  activeClassName="active"
                  className="nav-links"
                  onClick={click ? handleClick : null}
                >
                  <i
                    class="fa fa-sign-in"
                    aria-hidden="true"
                    style={{ marginRight: 5 }}
                  ></i>
                  Sign Up
                </NavLink>
              </li>
            )}
            {authState && (
              <>
                
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/"
                    activeClassName="active"
                    className="nav-links"
                    onClick={logout}
                  >
                    <i
                      class="fa fa-sign-out"
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
  );
}
