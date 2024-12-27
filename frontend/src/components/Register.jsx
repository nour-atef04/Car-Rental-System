import React, { useState } from "react";
import axios from "axios"; // to make HTTP requests (send data from form to backend)
import "./Register.css";
import CustomButton from "./CustomButton";
import backgroundImage from "../images/background.png";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    // initially all empty fields
    fname: "",
    mname: "",
    lname: "",
    email: "",
    password: "",
    phone: "",
    nationality: "",
    ssn: "",
  });

  const [message, setMessage] = useState(""); // store success message
  const [error, setError] = useState(""); // store error message

  const navigate = useNavigate();

  // handle changes in the input fields of the form
  const handleChange = (e) => {
    // takes event object 'e' as a param (contains name and value of input element)
    setFormData({
      ...formData, // spreads existing states so that it doesn't overwrite other fields, only update the one that changed
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault(); // Prevent default form submission behavior

    // // Reset message and error
    // setMessage("");
    // setError("");

    // // Validate if required fields are empty
    // if (
    //   !formData.fname ||
    //   !formData.mname ||
    //   !formData.lname ||
    //   !formData.email ||
    //   !formData.password ||
    //   !formData.phone ||
    //   !formData.nationality ||
    //   !formData.ssn
    // ) {
    //   setError("Please fill in all required fields.");
    //   return;
    // }

    // try {
      // Make POST request to the server for registration
      // const response = await axios.post(
      //   "http://localhost:5000/register",
      //   formData
      // );

      // setMessage(response.data); // Show success message
      // // Reset the form
      // setFormData({
      //   fname: "",
      //   name: "",
      //   lname: "",
      //   email: "",
      //   password: "",
      //   phone: "",
      //   nationality: "",
      //   ssn: "",
      // });

      // Navigate to the dashboard after successful registration
      navigate("/dashboard");
    // } catch (err) {
    //   // Handle any errors (backend validation or server error)
    //   setError(err.response?.data || "Registration failed!");
    // }
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
        <form
          onSubmit={handleSubmit}
          className="register-form px-5 text-center"
        >
          <div class="row g-3 my-1">
            <div class="col">
              <input
                type="text"
                name="fname"
                placeholder="First Name"
                value={formData.fname}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div class="col">
              <input
                type="text"
                name="mname"
                placeholder="Middle Name"
                value={formData.mname}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div class="col">
              <input
                type="text"
                name="lname"
                placeholder="Last Name"
                value={formData.lname}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          </div>
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
          <div class="row g-2 my-1">
            <div class="col">
              <input
                type="text"
                name="nationality"
                placeholder="Nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div class="col">
              <input
                type="text"
                name="ssn"
                placeholder="SSN"
                value={formData.ssn}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          </div>

          <CustomButton
            text="Register"
            buttonClass="mt-3 btn fw-bold border-white button-nonsolid"
          />
        </form>

        {message && <p className="success-message">{message}</p>}
        {error && (
          <p style={{ color: "red" }} className="mt-3 error-message">
            {error}
          </p>
        )}

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
