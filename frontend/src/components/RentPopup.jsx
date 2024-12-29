import React, { useState, useEffect } from "react";

const RentPopup = (props) => {
  const [paymentMethod, setPaymentMethod] = useState("Cash"); // Default payment method

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
              <strong>Rental Rate:</strong> {props.rentalRate}
            </p>
            <p>
              <strong>Pickup Location:</strong> Alex 21
            </p>

            {/* Form for rental details */}
            <div className="form-group">
              <label>From Date</label>
              <input type="date" className="form-control" required />
            </div>
            <div className="form-group">
              <label>Till Date</label>
              <input type="date" className="form-control" required />
            </div>

            <div className="form-group">
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
                  placeholder="Enter Visa card number"
                  required
                />
              </div>
            )}
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
              onClick={props.handleSubmitRent}
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
