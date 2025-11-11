import React from "react";
import { Link } from "react-router-dom";
import "./SignupNav.css";

function SignupNav() {
  return (
    <>
      <div className="container">
        <div className="brand">
          <Link to="/" className="flex items-center">
            <div className="logo">
              <img src="/Images/logo.svg" alt="logo" />
            </div>
            <div>
              <h2 className="logo-title">NEUROMAIL</h2>
            </div>
          </Link>
        </div>
        <div className="nav-section">
          <div>
            <Link className="about">About</Link>
          </div>
          <div>
            <Link className="works">How it works</Link>
          </div>
          <div>
            <Link to="/home" className="dashboard">
              Dashboard
            </Link>
          </div>
          <div>
            <Link className="contact">Contact</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupNav;
