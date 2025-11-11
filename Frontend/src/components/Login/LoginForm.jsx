import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AnimatedButton from '../Signup/AnimatedButton';
import './LoginForm.css';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Attempting login...");

    try {
      const response = await fetch(
        "https://neuromail-backend.onrender.com/email-app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();
      // console.log("Server Response:", data);

      if (response.ok) {
        // Store credentials in localStorage
        localStorage.setItem('email', formData.email);
        localStorage.setItem('password', formData.password);
        
        // Verify storage
        console.log('Stored credentials:', {
          email: localStorage.getItem('email'),
          password: localStorage.getItem('password')
        });

        console.log("Login successful:", data.message);
        navigate("/home");
      } else {
        console.log("Login failed:", data.error);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
};

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
      <form onSubmit={handleSubmit} className="login-form">
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
        <AnimatedButton type="submit" text="Login" />
        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;