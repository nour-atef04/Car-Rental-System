import React from "react";
// import CustomButton from "./CustomButton";
import backgroundImage from "../images/dashboardBg.png";

const DashboardBackground = ({ searchQuery, onSearchChange }) => {
  const dashboardBg = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "fill",
    backgroundRepeat: "no-repeat",
  };

  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
    // console.log(e.target.value);
  };

  return (
    <div
      className="p-3 p-md-5 m-md-3 text-center text-light"
      style={dashboardBg}
    >
      <div className="col-md-6 p-lg-5 mx-auto my-5">
        <h1 className="display-3 fw-bold">Drive your car now!</h1>
        <div className="d-flex justify-content-center">
          <input
            type="text"
            className="form-control me-3 mt-2"
            placeholder="Search for cars..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ width: "60%" }}
          />
          {/* <CustomButton
            text="Search"
            buttonClass="px-3 btn btn-lg fw-bold border-white button-nonsolid"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardBackground;
