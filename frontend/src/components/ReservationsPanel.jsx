import React, { useState, useEffect } from "react";
import "./CSS/ReservationsPanel.css";

const ReservationsPanel = () => {
  const [reservations, setReservations] = useState([]);
  const [filters, setFilters] = useState({
    customerName: "",
    customerEmail: "",
    customerFName: "",
    customerLName: "",
    customerMinit: "",
    customerSSN: "",
    customerNationality: "",
    carModel: "",
    carType: "",
    carBrand: "",
    carCapacity: "",
    carStoreId: "",
    carInsurance: "",
    carColor: "",
    paymentType: "",
    status: "all",
    dateFrom: "",
    dateTo: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  useEffect(() => {
    handleApplyFilters();
  }, []); // to have all reservations at mount

  const handleApplyFilters = async () => {
    // Make a request to fetch reservations based on filters
    const queryParams = new URLSearchParams(filters).toString();
    console.log(queryParams);
    const response = await fetch(
      `http://localhost:5000/advanced-search?${queryParams}`
    );
    const data = await response.json();
    setReservations(data.data || []);
  };

  return (
    <>
      <div className="reservations-panel" style={{ width: "90%" }}>
        <h1 className="title">Reservations Panel</h1>
        <div className="filters">
          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={filters.customerName}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="email"
            name="customerEmail"
            placeholder="Customer Email"
            value={filters.customerEmail}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="text"
            name="customerFName"
            placeholder="First Name"
            value={filters.customerFName}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="text"
            name="customerLName"
            placeholder="Last Name"
            value={filters.customerLName}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="text"
            name="customerMinit"
            placeholder="Middle Initial"
            value={filters.customerMinit}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="text"
            name="customerSSN"
            placeholder="SSN"
            value={filters.customerSSN}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="text"
            name="customerNationality"
            placeholder="Nationality"
            value={filters.customerNationality}
            onChange={handleFilterChange}
            className="filter-input"
          />

          <input
            type="text"
            name="carModel"
            placeholder="Car Plate Num"
            value={filters.carModel}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="text"
            name="carType"
            placeholder="Car Type"
            value={filters.carType}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="text"
            name="carBrand"
            placeholder="Car Brand"
            value={filters.carBrand}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="number"
            name="carCapacity"
            placeholder="Car Capacity"
            value={filters.carCapacity}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="text"
            name="carStoreId"
            placeholder="Store ID"
            value={filters.carStoreId}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="text"
            name="carInsurance"
            placeholder="Car Insurance"
            value={filters.carInsurance}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="text"
            name="carColor"
            placeholder="Car Color"
            value={filters.carColor}
            onChange={handleFilterChange}
            className="filter-input"
          />

          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="all">Status</option>
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
          </select>
          <input
            type="date"
            name="dateFrom"
            value={filters.dateFrom}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="date"
            name="dateTo"
            value={filters.dateTo}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <select
            name="paymentType"
            value={filters.paymentType}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">Payment Type</option>
            <option value="visa">Visa</option>
            <option value="cash">Cash</option>
          </select>
          <div className="container d-flex flex-column justify-center align-items-center">
            <button onClick={handleApplyFilters} className="apply-button">
              Apply Filters
            </button>
          </div>
        </div>
        <table className="reservations-table">
          <thead>
            <tr>
              <th>Reservation ID</th>
              <th>Customer Name</th>
              <th>Car Plate Num</th>
              <th>Car Type</th>
              <th>Car Brand</th>
              <th>Car Capacity</th>
              <th>Store ID</th>
              <th>Insurance</th>
              <th>Color</th>
              <th>Pickup Date</th>
              <th>Return Date</th>
              <th>Status</th>
              <th>Payment Status</th>
              <th>Customer Email</th>
              <th>Customer SSN</th>
              <th>Customer Nationality</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={index}>
                <td>{reservation.order_id}</td>
                <td>
                  {reservation.fname} {reservation.minit} {reservation.lname}
                </td>
                <td>{reservation.vid}</td>
                <td>{reservation.type}</td>
                <td>{reservation.brand}</td>
                <td>{reservation.capacity}</td>
                <td>{reservation.store_id}</td>
                <td>{reservation.insurance}</td>
                <td>{reservation.color}</td>
                <td>{reservation.start_day}</td>
                <td>{reservation.end_day}</td>
                <td>{reservation.status}</td>
                <td>{reservation.payment_type}</td>
                <td>{reservation.email}</td>
                <td>{reservation.ssn}</td>
                <td>{reservation.nationality}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReservationsPanel;
