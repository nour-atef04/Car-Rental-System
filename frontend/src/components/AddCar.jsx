import React, { useState } from "react";
import axios from "axios";
import "./CSS/AddCar.css";

const AddCar = () => {
  const [formData, setFormData] = useState({
    vid: "",
    type: "",
    brand: "",
    capacity: "",
    status: "",
    rental_rate: "",
    insurance: "",
    store_id: "",
    year: "",
    color: "",
    car_image_url: "",
  });

  const [message, setMessage] = useState(""); // Store success message
  const [error, setError] = useState({}); // Store frontend validation error messages
  const [serverError, setServerError] = useState(""); // Store server error message

  // Helper to validate numeric fields
  const isNumeric = (value) => /^[0-9]+$/.test(value);

  // Helper to validate alphabetic fields
  const isAlphabetic = (value) => /^[A-Za-z\s]+$/.test(value);

  const validateForm = () => {
    const validationErrors = {};

    // Alphabetical validation
    if (!isAlphabetic(formData.type)) {
      validationErrors.type = "Type must contain only letters.";
    }
    if (!isAlphabetic(formData.brand)) {
      validationErrors.brand = "Brand must contain only letters.";
    }
    if (!isAlphabetic(formData.color)) {
      validationErrors.color = "Color must contain only letters.";
    }

    // Numeric validation
    if (!isNumeric(formData.capacity)) {
      validationErrors.capacity = "Capacity must be numeric.";
    }
    if (!isNumeric(formData.rental_rate)) {
      validationErrors.rental_rate = "Rental rate must be numeric.";
    }
    if (!isNumeric(formData.store_id)) {
      validationErrors.store_id = "Store ID must be numeric.";
    }
    if (!isNumeric(formData.year) || formData.year.length !== 4) {
      validationErrors.year = "Year must be a 4-digit number.";
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
          "http://localhost:5000/register-car",
          formData
        );

        setMessage(response.data.message || "Car added successfully!");
        setFormData({
          vid: "",
          type: "",
          brand: "",
          capacity: "",
          status: "",
          rental_rate: "",
          insurance: "",
          store_id: "",
          year: "",
          color: "",
          car_image_url: "",
        });
        setError({});
      } catch (err) {
        if (err.response) {
          setError({});
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
      <div style={formStyle} className="register-car-panel p-5 w-50">
        <h1 className="register-car-title">Add a New Car</h1>
        <form onSubmit={handleSubmit} className="px-5">
          <div className="filters">
            <input
              type="text"
              name="vid"
              placeholder="Vehicle ID"
              value={formData.vid}
              onChange={handleChange}
              required
              className="filter-input"
            />
            <input
              type="text"
              name="type"
              placeholder="Type"
              value={formData.type}
              onChange={handleChange}
              required
              className="filter-input"
            />
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={formData.brand}
              onChange={handleChange}
              required
              className="filter-input"
            />
            <input
              type="number"
              min={1}
              name="capacity"
              placeholder="Capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
              className="filter-input"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-select filter-input"
            >
              <option selected>Select Status</option>
              <option value="Available">Status: Available</option>
              <option value="Rented">Status: Rented</option>
            </select>

            <div class="input-group filter-input">
              <span class="input-group-text">$</span>
              <input
                type="text"
                name="rental_rate"
                className="form-control"
                value={formData.rental_rate}
                onChange={handleChange}
                required
              />
            </div>

            {/* <input
              type="text"
              name="insurance"
              placeholder="Insurance"
              value={formData.insurance}
              onChange={handleChange}
              required
              className="filter-input"
            /> */}

            <select
              name="insurance"
              value={formData.insurance}
              onChange={handleChange}
              className="form-select filter-input"
            >
              <option selected>Select Insurance</option>
              <option value="None">Insurance: None</option>
              <option value="Partial">Insurance: Partial</option>
              <option value="Full">Insurance: Full</option>
            </select>

            <input
              type="text"
              name="store_id"
              placeholder="Store ID"
              value={formData.store_id}
              onChange={handleChange}
              required
              className="filter-input"
            />
            <input
              type="text"
              name="year"
              placeholder="Year"
              value={formData.year}
              onChange={handleChange}
              required
              className="filter-input"
            />
            <input
              type="text"
              name="color"
              placeholder="Color"
              value={formData.color}
              onChange={handleChange}
              required
              className="filter-input"
            />
            <input
              type="text"
              name="car_image_url"
              placeholder="Car Image URL"
              value={formData.car_image_url}
              onChange={handleChange}
              required
              className="filter-input"
            />
          </div>
          <div className="container d-flex flex-column justify-center align-items-center mt-3">
            <button className="apply-button">Add Car</button>
          </div>
        </form>

        {message && <p className="mt-3 success-message">{message}</p>}
        {error &&
          Object.values(error).map((err, index) => (
            <p key={index} style={{ color: "red" }} className="error-message">
              {err}
            </p>
          ))}

        {serverError && (
          <p style={{ color: "red" }} className="mt-3 error-message">
            {serverError}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddCar;
