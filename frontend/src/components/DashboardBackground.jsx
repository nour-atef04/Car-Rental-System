import React from "react";
import CustomButton from "./CustomButton";
import backgroundImage from "../images/dashboardBg.png";

const DashboardBackground = () => {
  const dashboardBg = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "fill",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div
      className="p-3 p-md-5 m-md-3 text-center text-light"
      style={dashboardBg}
    >
      <div className="col-md-6 p-lg-5 mx-auto my-5">
        <h1 className="display-3 fw-bold">Drive your car now!</h1>
        <CustomButton
          text="Start searching"
          type="search"
          buttonClass="px-3 btn btn-lg fw-bold border-white button-solid"
        />
        <div className="d-flex gap-3 justify-content-center lead fw-normal"></div>
      </div>
    </div>
  );
};

export default DashboardBackground;
