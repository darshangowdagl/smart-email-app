import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleSingupClick = () => {
    navigate(`/signup`);
  };

  const handleLoginClick = () => {
    navigate(`/login`);
  };

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

        <div className="btns">
          <button
            className="nav-btn btn-1"
            onClick={() => {
              handleSingupClick();
            }}
          >
            Signup
          </button>
          <button
            className="nav-btn btn-2"
            onClick={() => {
              handleLoginClick();
            }}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
