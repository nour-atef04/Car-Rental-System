import React, { useState } from "react";
import "./CSS/ReservationsPanel.css";

const ReservationsPanel = () => {
  const [reservations, setReservations] = useState([]);
  const [filters, setFilters] = useState({
    customerName: "",
    carModel: "",
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

  const handleApplyFilters = () => {
    //  fetchReservations();
  };

  return (
    <>
      <div className="reservations-panel">
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
            type="text"
            name="carModel"
            placeholder="Car Model"
            value={filters.carModel}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="all">Any</option>
            <option value="reserved">Reserved</option>
            <option value="picked_up">Picked Up</option>
            <option value="returned">Returned</option>
            <option value="canceled">Canceled</option>
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
          <button onClick={handleApplyFilters} className="apply-button">
            Apply Filters
          </button>
        </div>
        <table className="reservations-table">
          <thead>
            <tr>
              <th>Reservation ID</th>
              <th>Customer Name</th>
              <th>Car Model</th>
              <th>Pickup Date</th>
              <th>Return Date</th>
              <th>Status</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.reservation_id}>
                <td>{reservation.reservation_id}</td>
                <td>{reservation.customer_name}</td>
                <td>{reservation.car_model}</td>
                <td>{reservation.pickup_date}</td>
                <td>{reservation.return_date}</td>
                <td>{reservation.status}</td>
                <td>{reservation.payment_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReservationsPanel;
