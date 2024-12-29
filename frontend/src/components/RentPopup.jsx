import React, { useState, useEffect } from "react";

const RentPopup = (props) => {
  const [fromDate, setFromDate] = useState("");
  const [tillDate, setTillDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [visaNumber, setVisaNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (fromDate && tillDate) {
      const start = new Date(fromDate);
      const end = new Date(tillDate);
      const days = (end - start) / (1000 * 60 * 60 * 24); // Convert ms to days

      if (days > 0) {
        setTotalAmount(days * props.rentalRate);
        setErrorMessage(""); // Clear any error
      } else {
        setTotalAmount(0);
        setErrorMessage("Till Date must be greater than From Date.");
      }
    }
  }, [fromDate, tillDate, props.rentalRate]); //dependecies, we wanan do that every time the from and till date changes

  const handleSubmit = async () => {
    if (!fromDate || !tillDate) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }

    if (new Date(tillDate) <= new Date(fromDate)) {
      setErrorMessage("Till Date must be greater than From Date.");
      return;
    }

    const requestBody = {
      brand: props.brand,
      type: props.type,
      capacity: props.capacity,
      rentalRate: props.rentalRate,
      fromDate,
      tillDate,
      paymentMethod,
      visaNumber: paymentMethod === "Visa" ? visaNumber : null,
      totalAmount,
    };

    try {
      const response = await fetch("http://localhost:5000/rent-car", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        alert("Car rented successfully!");
        props.onCloseModal();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to rent car.");
      }
    } catch (error) {
      setErrorMessage("Failed to rent car. Please try again.");
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: "block" }}
      aria-labelledby="rentCarModal"
      aria-hidden="false"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Rent {props.brand} {props.type}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={props.onCloseModal}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              <strong>Car Details:</strong>
            </p>
            <p>
              <strong>Capacity:</strong> {props.capacity}
            </p>
            <p>
              <strong>Rental Rate:</strong> ${props.rentalRate} per day
            </p>
            <p>
              <strong>Pickup Location:</strong> Alex 21
            </p>
            <p>
              <strong>Total Amount:</strong> ${totalAmount || "N/A"}
            </p>

            {/* Form for rental details */}
            <div className="form-group">
              <label>From Date</label>
              <input
                type="date"
                className="form-control"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group mt-2">
              <label>Till Date</label>
              <input
                type="date"
                className="form-control"
                value={tillDate}
                onChange={(e) => setTillDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group mt-2">
              <label>Payment Method</label>
              <select
                className="form-control"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              >
                <option value="Cash">Cash</option>
                <option value="Visa">Visa</option>
              </select>
            </div>

            {paymentMethod === "Visa" && (
              <div className="form-group">
                <label>Visa Card Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={visaNumber}
                  onChange={(e) => setVisaNumber(e.target.value)}
                  placeholder="Enter Visa card number"
                  required
                />
              </div>
            )}

            {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={props.onCloseModal}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Rent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentPopup;
