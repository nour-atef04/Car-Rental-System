import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import backgroundImage from "../images/background.png";
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    user_type: "", // employee or customer
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Reset message and error
    setMessage("");
    setError("");

    try {
      // Make POST request to the server for login
      const response = await axios.post(
        "http://localhost:5000/login",
        formData
      );

      setMessage(response.data); // Show success message

      // Reset the form
      setFormData({
        email: "",
        password: "",
        user_type: "",
      });

      // Reset message and error
      setMessage("");
      setError("");

      navigate("/dashboard");
    } catch (err) {
      // Handle any errors (backend validation or server error)
      if (err.response) {
        setError(err.response.data || "Login failed. Please try again.");
      } else {
        setError("Network error, please try again later.");
      }
    }
  };

  const bodyStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "fill",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const formStyle = {
    backdropFilter: "blur(30px)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    color: "white",
  };

  return (
    <div style={bodyStyle}>
      <div style={formStyle} className="container p-5 w-50">
        <h1 className="text-center">Welcome Back!</h1>
        <h3 className="lead">Please fill in all fields to log-in</h3>
        <form onSubmit={handleSubmit} className="login-form px-5 text-center">
          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="login-input"
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="login-input"
          />

          {/* USER TYPE */}
          <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="form-check me-4">
              <input
                className="form-check-input"
                type="radio"
                id="employee"
                name="user_type"
                value="employee"
                onChange={handleChange}
                required
              />
              <label className="form-check-label" htmlFor="employee">
                Employee
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="customer"
                name="user_type"
                value="customer"
                onChange={handleChange}
                required
              />
              <label className="form-check-label" htmlFor="customer">
                Customer
              </label>
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <CustomButton
            text="Log-in"
            buttonClass="mt-3 btn fw-bold border-white button-nonsolid"
          />
        </form>
        {message && <p className="success-message">{message}</p>}
        {error && (
          <p style={{ color: "red" }} className="mt-3 error-message">
            {error}
          </p>
        )}
        <p className="register-link">
          Already have an account?{" "}
          <Link to="/register" className="mx-1" style={{ color: "orange" }}>
            register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
