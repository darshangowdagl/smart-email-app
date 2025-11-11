import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeNavbar from '../Home/HomeNavbar';
import AnimatedButton from '../Signup/AnimatedButton';
import './ComposeMail.css';

function ComposeMail() {
  const navigate = useNavigate();
  const [mailData, setMailData] = useState({
    to: '',
    subject: '',
    body: ''
  });

  const handleChange = (e) => {
    setMailData({
      ...mailData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get credentials from localStorage
      const email = localStorage.getItem("email");
      const password = localStorage.getItem("password");
      const credentials = btoa(`${email}:${password}`);
  
      const response = await fetch(
        `https://neuromail-backend.onrender.com/email-app/api/emails/send?from=${email}&to=${mailData.to}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Basic ${credentials}`,
          },
          body: JSON.stringify({
            subject: mailData.subject,
            body: mailData.body,
          }),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send email");
      }
  
      const data = await response.json();
      console.log("Email sent successfully:", data);
      alert("Email sent successfully");
      navigate("/home");
    } catch (error) {
      console.error("Error sending email:", error);
      // You might want to add error handling UI feedback here
      alert(error.message);
    }
  };

  return (
    <>
      <HomeNavbar />
      <div className="back-button" onClick={() => navigate('/home')}>
        <i className="fas fa-arrow-left"></i>
        Back
      </div>
      <div className="compose-container">
        <h2>Compose Mail</h2>
        <form onSubmit={handleSubmit} className="compose-form">
          <div className="form-group">
            <input
              type="email"
              name="to"
              placeholder="To"
              value={mailData.to}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={mailData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="body"
              placeholder="Write your message here..."
              value={mailData.body}
              onChange={handleChange}
              required
              rows="10"
            />
          </div>
          <AnimatedButton type="submit" text="Send" />
        </form>
      </div>
    </>
  );
}

export default ComposeMail;