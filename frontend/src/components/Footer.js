  
import React, { useState } from "react";

import { Link, useNavigate, NavLink } from "react-router-dom";
import styles from '../App.css'

export default function Footer() {

    return(
<footer className="footer">
        <div className="container">
          <div className="footer-panel">
            <h2 className="footer-title">CRIMSON</h2>
            <div className="footer-content">
              <div className="footer-about">
                <h3 className="footer-section__title">About us</h3>
                <p className="footer-about__description">
                 Together we can become the lifeblood of the world. Donate blood or 
                 request for blood and help save lives
                </p>
              </div>
              <div className="footer-links-section">
                <div className="footer-link-section">
                  <h3 className="footer-section__title">Section 1</h3>
                  <ul className="footer-link-lists">
                    <li className="footer-link-list-item">
                      <a href="#" className="footer-link">
                      Lorem
                      </a>
                    </li>
                    <li className="footer-link-list-item">
                      <a href="#" className="footer-link">
                        Lorem
                      </a>
                    </li>
                    <li className="footer-link-list-item">
                      <a href="#" className="footer-link">
                      Lorem
                      </a>
                    </li>
                    <li className="footer-link-list-item">
                      <a href="#" className="footer-link">
                        Lorem
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="footer-link-section">
                  <h3 className="footer-section__title">Section 2</h3>
                  <ul className="footer-link-lists">
                    <li className="footer-link-list-item">
                      <a href="#" className="footer-link">
                        Lorem
                      </a>
                    </li>
                    <li className="footer-link-list-item">
                      <a href="#" className="footer-link">
                        Lorem
                      </a>
                    </li>
                    <li className="footer-link-list-item">
                      <a href="#" className="footer-link">
                        Lorem
                      </a>
                    </li>
                    <li className="footer-link-list-item">
                      <a href="#" className="footer-link">
                        Lorem
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="footer-link-section">
                  <h3 className="footer-section__title">Section 3</h3>
                  <ul className="footer-link-lists">
                    <li className="footer-link-list-item">
                      <a href="#" className="footer-link">
                        Lorem
                      </a>
                    </li>
                    <li className="footer-link-list-item">
                      <a href="#" className="footer-link">
                        Lorem
                      </a>
                    </li>
                    <li className="footer-link-list-item">
                      <a href="#" className="footer-link">
                        Lorem
                      </a>
                    </li>
                    <li className="footer-link-list-item">
                      <a href="#" className="footer-link">
                        Lorem
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
}