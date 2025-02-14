import React, { useState } from "react";
import axios from "axios";
import "./CSS/MarkVehicleModal.css";

const MarkVehicleModal = ({ onClose }) => {
  const [vehicleId, setVehicleId] = useState("");
  const [status, setStatus] = useState("Available"); // default

  const handleSubmit = async () => {
    const vid = vehicleId.trim();
    if (vid) {
      try {
        // Send request to backend to update vehicle status
        await axios.put(
          `http://localhost:5000/update-car-status/?vid=${vid}&status=${status}`
        );
        setVehicleId(""); // Clear the input
        setStatus("Available"); // Reset the status
        alert(
          `Vehicle with plate number ${vid} has been updated successfully.`
        );
        onClose(); // Close the modal after submitting
      } catch (error) {
        alert("Error updating vehicle status");
      }
    } else {
      alert("Please enter a valid Vehicle ID");
    }
  };

  return (
    <div className="mark-vehicle-modal">
      <div className="mark-vehicle-modal-content">
        <span className="mark-vehicle-modal-close" onClick={onClose}>
          &times;
        </span>
        <h2>Enter Vehicle ID</h2>
        <input
          type="text"
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
          placeholder="Enter Vehicle ID"
        />
        <div className="status-label">
          <label>Set Vehicle Status: </label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Available">Available</option>
            <option value="Reserved">Reserved</option>
          </select>
        </div>
        <button onClick={handleSubmit}>Set Status</button>
        <button className="close-modal" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default MarkVehicleModal;
