import React, { useState } from "react";
import axios from "axios";
import "./CSS/RegisterEmployeePanel.css";

const RegisterEmployeePanel = () => {
  const [formData, setFormData] = useState({
    store_id: "",
    emp_ssn: "",
    email: "",
    password: "",
    confirm_password: "",
    fname: "",
    minit: "",
    lname: "",
    emp_phone: "",
  });

  const [message, setMessage] = useState(""); // Store success message
  const [error, setError] = useState({}); // Store frontend validation error messages
  const [serverError, setServerError] = useState(""); // Store server error message

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

    // Numeric validation
    if (!isNumeric(formData.emp_ssn)) {
      validationErrors.emp_ssn = "SSN must be numeric.";
    }
    if (!isNumeric(formData.store_id)) {
      validationErrors.emp_ssn = "Store ID must be numeric.";
    }
    if (!isNumeric(formData.emp_phone)) {
      validationErrors.emp_phone = "Phone number must be numeric.";
    }

    if (formData.emp_phone.length < 11) {
      validationErrors.emp_phone = "Phone number must be at least 11 digits.";
    }

    // Password validation
    if (formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters.";
    }

    if (formData.password !== formData.confirm_password) {
      validationErrors.confirm_password = "Passwords do not match.";
    }

    return validationErrors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setServerError("");
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/emp_register",
          formData
        );

        setMessage(
          response.data.message || "Employee registered successfully!"
        );

        setFormData({
          store_id: "",
          emp_ssn: "",
          email: "",
          password: "",
          confirm_password: "",
          fname: "",
          minit: "",
          lname: "",
          emp_phone: "",
        });
        setError({});
      } catch (err) {
        if (err.response) {
          setError("");
          setServerError(err.response.data || "Server error occurred!");
        } else {
          setServerError("Network error occurred!");
        }
      }
    }
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    color: "white",
  };

  return (
    <div>
      <div
        style={formStyle}
        className="register-employee-panel container p-5 w-50"
      >
        <h1 className="register-employee-title">Register a New Employee</h1>
        <form
          onSubmit={handleSubmit}
          className="register-form px-5 text-center"
        >
          {/* STORE ID*/}
          <div className="row g-3">
            <div className="col">
              <input
                type="text"
                name="store_id"
                placeholder="Store ID"
                value={formData.store_id}
                onChange={handleChange}
                required
                className="register-input"
              />
            </div>

            {/* EMPLOYEE SSN */}
            <div className="col">
              <input
                type="text"
                name="emp_ssn"
                placeholder="Employee SSN"
                value={formData.emp_ssn}
                onChange={handleChange}
                required
                className="register-input"
              />
            </div>
          </div>

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
                name="confirm_password"
                placeholder="Confirm Password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
                className="register-input"
              />
            </div>
          </div>

          {/* EMPLOYEE PHONE */}
          <input
            type="text"
            name="emp_phone"
            placeholder="Phone"
            value={formData.emp_phone}
            onChange={handleChange}
            required
            className="register-input"
          />

          <div className="container d-flex flex-column justify-center align-items-center">
            <button className="mt-2 apply-button">Add Employee</button>
          </div>
        </form>

        {message && <p className="mt-3 success-message">{message}</p>}
        {error && (
          <p style={{ color: "red" }} className="mt-3 error-message mb-0">
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
      </div>
    </div>
  );
};

export default RegisterEmployeePanel;
