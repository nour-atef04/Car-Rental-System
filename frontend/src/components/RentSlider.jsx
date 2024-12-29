import React, { useState } from "react";

const RentSlider = ({ onRentChange }) => {

  const [maxRent, setMaxRent] = useState(50);

  const handleRentChange = (event) => {
    const value = event.target.value;
    setMaxRent(value); 
    onRentChange(value);
  };

  return (
    <div className="container w-25">
      <label htmlFor="customRange1" className="form-label">
        Max rent rate ${maxRent}
      </label>
      <input
        type="range"
        className="form-range"
        id="customRange1"
        min="0"
        max="100" 
        step="10"
        onChange={handleRentChange}
      />
    </div>
  );
};

export default RentSlider;
