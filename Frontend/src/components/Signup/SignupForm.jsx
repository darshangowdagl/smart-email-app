import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AnimatedButton from "./AnimatedButton";
import "./SignupForm.css";

function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
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

  const handleSignupClick = async (e) => {
    e.preventDefault();
    console.log("Attempting signup...");

    try {
      const response = await fetch(
        "https://neuromail-backend.onrender.com/email-app/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.username, // mapping username to name as expected by backend
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();
      console.log("Server Response:", data);

      if (response.ok) {
        console.log("Signup successful:", data.message);
        navigate("/login"); // Redirect to login page after successful signup
      } else {
        console.error("Signup failed:", data.error);
        // Here you might want to show an error message to the user
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSignupClick} className="signup-form">
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
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
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <AnimatedButton type="submit" text="Sign Up" />
        <div className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
