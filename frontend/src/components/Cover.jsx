import React from "react";
import backgroundImage from "../images/background.png";
import CustomButton from "./CustomButton";

const Cover = () => {
  const bodyStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "fill",
    backgroundRepeat: "no-repeat",
    height: "100vh",
  };

  return (
    <div className="p-5" style={bodyStyle}>
      <main className="p-5 text-light">
        <h1 style={{ fontSize: "4rem" }}>Car Rental.</h1>
        <p className="lead">
          Drive the most luxurious cars near you with just a click of a button.
          <br />
          Easy. Affordable. Fast!
        </p>
        <p className="lead">
          <CustomButton
            text="Register New Account"
            type="register"
            buttonClass="mt-4 btn btn-lg btn-light fw-bold button-solid"
          />
          <CustomButton
            text="Log-in"
            type="login"
            buttonClass="mt-4 ms-4 btn btn-lg fw-bold border-white button-nonsolid"
          />
        </p>
      </main>
    </div>
  );
};

export default Cover;
