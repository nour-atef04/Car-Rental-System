import React, { useState, useContext } from "react";
import axios from "axios"; // to make HTTP requests (send data from form to backend)
import "../components/CSS/Register.css";
import CustomButton from "./CustomButton";
import backgroundImage from "../images/background.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    // initially all empty fields
    fname: "",
    minit: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    customer_phone: "",
    nationality: "",
    ssn: "",
    drivers_license: "",
  });

  const { login } = useContext(AuthContext);
  const [message, setMessage] = useState(""); // store success message
  const [error, setError] = useState(""); // store frontend validation error message
  const [serverError, setServerError] = useState(""); // store server error message

  const navigate = useNavigate();

  // Helper to validate numeric fields
  const isNumeric = (value) => /^[0-9]+$/.test(value);

  // Helper to validate alphabetic fields
  const isAlphabetic = (value) => /^[A-Za-z]+$/.test(value);

  const validateForm = () => {
    const validationErrors = {};

    // Alphabetical validation
    if (!isAlphabetic(formData.fname)) {
      validationErrors.fname = "First name must contain only letters.";
    }
    if (formData.minit && !isAlphabetic(formData.minit)) {
      validationErrors.minit = "Middle initial must be a letter.";
    }
    if (!isAlphabetic(formData.lname)) {
      validationErrors.lname = "Last name must contain only letters.";
    }
    if (!isAlphabetic(formData.nationality)) {
      validationErrors.nationality = "Nationality must contain only letters.";
    }

    // Numeric validation
    if (!isNumeric(formData.ssn)) {
      validationErrors.ssn = "SSN must be numeric.";
    }
    if (!isNumeric(formData.customer_phone)) {
      validationErrors.customer_phone = "Phone number must be numeric.";
    }

    if (formData.customer_phone.length < 11) {
      validationErrors.customer_phone =
        "Phone number must be at least 11 numbers.";
    }

    // Password validation
    if (formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters.";
    }

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    return validationErrors;
  };

  // handle changes in the input fields of the form
  const handleChange = (e) => {
    // takes event object 'e' as a param (contains name and value of input element)
    setFormData({
      ...formData, // spreads existing states so that it doesn't overwrite other fields, only update the one that changed
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setServerError("");
    e.preventDefault(); // Prevent default form submission behavior
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
    } else {
      try {
        // Make POST request to the server for registration
        const response = await axios.post(
          "http://localhost:5000/register",
          formData
        );

        // const user = formData;
        delete formData.password;
        delete formData.confirmPassword;
        login(formData);
        setMessage(response.data); // Show success message

        // Reset the form
        setFormData({
          fname: "",
          minit: "",
          lname: "",
          email: "",
          password: "",
          confirmPassword: "",
          customer_phone: "",
          nationality: "",
          ssn: "",
          drivers_license: "",
        });

        // Reset message and error
        setMessage("");
        setError("");
        setServerError("");

        // Navigate to the dashboard after successful registration
        navigate("/dashboard");
      } catch (err) {
        setMessage("");
        setError("");

        if (err.response) {
          // If the error is from the server
          setServerError(err.response.data || "Server error occurred!");
        } else {
          // If there's no response (network issues, etc.)
          setServerError("Network error occurred!");
        }
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
        <h1 className="text-center">
          Welcome{formData.fname ? `, ${formData.fname}!` : "!"}
        </h1>
        <h3 className="lead">Please fill in all fields to register</h3>
        <form
          onSubmit={handleSubmit}
          className="register-form px-5 text-center"
        >
          {/* FIRST NAME */}
          <div className="row g-3">
            <div className="col">
              <input
                type="text"
                name="fname"
                placeholder="First Name"
                value={formData.fname}
                onChange={handleChange}
                required
                className="register-input"
              />
            </div>

            {/* MIDDLE INITIAL */}
            <div className="col-3">
              <input
                type="text"
                name="minit"
                placeholder="Middle Initial"
                value={formData.minit}
                onChange={handleChange}
                required
                maxlength="1"
                className="register-input"
              />
            </div>

            {/* LAST NAME */}
            <div className="col">
              <input
                type="text"
                name="lname"
                placeholder="Last Name"
                value={formData.lname}
                onChange={handleChange}
                required
                className="register-input"
              />
            </div>
          </div>

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="register-input"
          />

          <div className="row g-3">
            <div className="col">
              {/* PASSWORD */}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="register-input"
              />
            </div>

            <div className="col">
              {/* CONFIRM PASSWORD */}
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="register-input"
              />
            </div>
          </div>

          {/* CUSTOMER PHONE */}
          <input
            type="text"
            name="customer_phone"
            placeholder="Phone"
            value={formData.customer_phone}
            onChange={handleChange}
            required
            className="register-input"
          />

          {/* NATIONALITY */}
          <div className="row g-3">
            <div className="col">
              <input
                type="text"
                name="nationality"
                placeholder="Nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
                className="register-input"
              />
            </div>

            {/* SSN */}
            <div className="col">
              <input
                type="text"
                name="ssn"
                placeholder="SSN"
                value={formData.ssn}
                onChange={handleChange}
                required
                className="register-input"
              />
            </div>

            {/* DRIVER'S LICENSE */}
            <div className="col">
              <input
                type="text"
                name="drivers_license"
                placeholder="Driver's License"
                value={formData.drivers_license}
                onChange={handleChange}
                required
                className="register-input"
              />
            </div>
          </div>

          <CustomButton
            text="Register"
            buttonClass="mt-3 btn fw-bold border-white button-nonsolid"
          />
        </form>

        {message && <p className="mt-3 success-message">{message}</p>}
        {error && (
          <p style={{ color: "red" }} className="mt-3 error-message">
            {Object.values(error).map((err, index) => (
              <p className="m-0" key={index}>
                {err}
              </p>
            ))}
          </p>
        )}

        {serverError && (
          <p style={{ color: "red" }} className="mt-3 error-message">
            {serverError}
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
