import React from "react";
import "./HomeNavbar.css";
import { Link, useNavigate } from "react-router-dom";

function HomeNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    navigate("/login");
  }

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
            <Link to="/about" className="about">
              About
            </Link>
          </div>
          <div>
            <Link to="/working" className="works">
              How it works
            </Link>
          </div>
          <div>
            <Link to="/home" className="dashboard">
              Dashboard
            </Link>
          </div>
          <div>
            <Link to="/contact" className="contact">
              Contact
            </Link>
          </div>
        </div>

        <button
            className="logoutBtn"
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </button>

        <div className="profile">
          <i className="fa-solid fa-user user-icon"></i>
        </div>
      </div>
    </>
  );
}

export default HomeNavbar;
