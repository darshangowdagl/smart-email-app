import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedButton from "../Signup/AnimatedButton";
import "./ContactForm.css";

function ContactForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://neuromail-backend.onrender.com/public/health-check",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text();
      console.log("Server response:", data);
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="contact-container left-120 mt-8 mb-5">
      <h2>Any Queries?</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            type="password"
            name="password"
            placeholder="Your Query"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <AnimatedButton type="submit" text="Submit" />
      </form>
    </div>
  );
}

export default ContactForm;
