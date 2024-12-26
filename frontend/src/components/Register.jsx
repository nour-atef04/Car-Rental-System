import React, { useState } from "react";
import axios from "axios"; // to make HTTP requests (send data from form to backend)
import "./Register.css";
import CustomButton from "./CustomButton";
import backgroundImage from "../images/background.png";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    // initially all empty fields
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [message, setMessage] = useState(""); // store success message
  const [error, setError] = useState(""); // store error message

  // handle changes in the input fields of the form
  const handleChange = (e) => {
    // takes event object 'e' as a param (contains name and value of input element)
    setFormData({
      ...formData, // spreads existing states so that it doesn't overwrite other fields, only update the one that changed
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    // async fn because it involves making an HTTP request to the backend
    e.preventDefault(); // prevent reloading the page
    setMessage(""); // both messages are cleared
    setError("");
    try {
      // making POST request
      const response = await axios.post(
        "http://localhost:5000/register",
        formData
      ); // sends formData to backend API
      setMessage(response.data); // Show success message
      setFormData({
        // resetting form fields
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
      });
    } catch (err) {
      setError(err.response?.data || "Registration failed!"); // If the backend sends an error message in the response, that message is used, o.w, display 'registration failed!'
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
        <h1 className="text-center">
          Welcome{formData.name ? `, ${formData.name}!` : "!"}
        </h1>
        <h3 className="lead">Please fill in all fields to register</h3>
        <form onSubmit={handleSubmit} className="register-form px-5">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="register-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="register-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="register-input"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="register-input"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="register-input"
          />
        </form>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <CustomButton
          onClick={handleSubmit}
          text="Register"
          type="dashboard"
          buttonClass="mt-3 btn fw-bold border-white button-nonsolid"
        />

        <p className="login-link">
          Already have an account?{" "}
          <Link to="/login" className="mx-1" style={{ color: "orange" }}>
            login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
