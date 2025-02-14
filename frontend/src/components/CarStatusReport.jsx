import React, { useEffect, useState } from "react";
import "./CSS/ReservationsPanel.css";

const CarStatusReport = () => {
  const [reportDate, setReportDate] = useState("");
  const [carStatus, setCarStatus] = useState([]);

  const handleFetchReport = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/reports/cars-status?reportDate=${reportDate}`
      );
      const data = await response.json();
      setCarStatus(data || []);
      console.log(data);
    } catch (error) {
      console.error("Error fetching car status:", error);
    }
  };

  useEffect(() => {
    handleFetchReport();
  }, []);

  return (
    <div className="reservations-panel">
      <h1 className="title">Car Status Report</h1>
      <div className="filters">
        <input
          type="date"
          value={reportDate}
          onChange={(e) => setReportDate(e.target.value)}
          className="filter-input"
        />
        <button onClick={handleFetchReport} className="apply-button">
          Generate Report
        </button>
      </div>
      <table className="reservations-table">
        <thead>
          <tr>
            <th>Car Plate Number</th>
            <th>Type</th>
            <th>Brand</th>
            <th>Capacity</th>
            <th>Color</th>
            <th>Insurance</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {carStatus.map((car, index) => (
            <tr key={index}>
              <td>{car.vid}</td>
              <td>{car.type}</td>
              <td>{car.brand}</td>
              <td>{car.capacity}</td>
              <td>{car.color}</td>
              <td>{car.insurance}</td>
              <td>{car.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarStatusReport;
