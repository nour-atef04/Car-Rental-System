import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

const RentPopup = (props) => {
  const [fromDate, setFromDate] = useState("");
  const [tillDate, setTillDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [visaNumber, setVisaNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [store, setStore] = useState(null);
  const [storeError, setStoreError] = useState(null);
  const { user } = useContext(AuthContext);

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

  useEffect(() => {
    const fetchStoreInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/store-info?store_id=${props.storeID}`
        );
        const data = await response.json();
        if (data.success) {
          setStore(data.store);
        } else {
          setStoreError(data.error);
        }
      } catch (err) {
        setStoreError("Failed to fetch store information.");
      }
    };
    if (props.storeID) {
      fetchStoreInfo();
    }
  }, []);

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
      // brand: props.brand,
      // type: props.type,
      // capacity: props.capacity,
      // rentalRate: props.rentalRate,
      // fromDate,
      // tillDate,
      // paymentMethod,
      // visaNumber: paymentMethod === "Visa" ? visaNumber : null,
      // totalAmount,
      vid: props.vid,
      start_day: fromDate,
      end_day: tillDate,
      payment_type: paymentMethod,
      nationality: user.nationality,
      ssn: user.ssn,
    };

    try {
      const response = await fetch("http://localhost:5000/reserve-car", {
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
              <h2>Car Details</h2>
            </p>
            <p>
              <strong>Capacity:</strong> {props.capacity}
            </p>
            <p>
              <strong>Rental Rate:</strong> ${props.rentalRate} per day
            </p>
            {store && (
              <p>
                <p>
                  <strong>Pickup Location:</strong> {store.street}, {store.city}
                  , {store.country}.
                </p>
              </p>
            )}
            {store && (
              <p>
                <strong>Store Phone Number:</strong> {store.store_phone}
              </p>
            )}
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
              <div className="mt-2 form-group">
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
