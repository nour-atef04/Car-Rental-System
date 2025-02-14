import React, { useState } from "react";
import "./CSS/PaymentsPanel.css";

const PaymentsPanel = () => {
  const [payments, setPayments] = useState([]);
  const [dateRange, setDateRange] = useState({
    start_date: "",
    end_date: "",
  });

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prevRange) => ({
      ...prevRange,
      [name]: value,
    }));
  };

  const fetchPayments = async () => {
    const { start_date, end_date } = dateRange;

    if (!start_date || !end_date) {
      alert("Please specify both start and end dates.");
      return;
    }

    try {
      const queryParams = new URLSearchParams(dateRange).toString();
      const response = await fetch(
        `http://localhost:5000/reports/daily-payments?${queryParams}`
      );
      const data = await response.json();

      if (data.success) {
        setPayments(data.data || []);
      } else {
        alert(
          data.message ||
            "Failed to fetch daily payments within the specified time period."
        );
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
      alert("An error occurred while fetching daily payments.");
    }
  };

  return (
    <div className="payments-panel">
      <h1 className="title">Daily Payments Report</h1>
      <div className="filters">
        <input
          type="date"
          name="start_date"
          placeholder="Start Date"
          value={dateRange.start_date}
          onChange={handleDateChange}
          className="filter-input"
        />
        <input
          type="date"
          name="end_date"
          placeholder="End Date"
          value={dateRange.end_date}
          onChange={handleDateChange}
          className="filter-input"
        />
        <button onClick={fetchPayments} className="apply-button">
          Fetch Payments
        </button>
      </div>

      <table className="payments-table">
        <thead>
          <tr>
            <th>Payment Date</th>
            <th>Total Payment</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={index}>
              <td>{payment.payment_date}</td>
              <td>${payment.total_payment.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsPanel;
