import React from "react";
import backgroundImage from '../images/background.png';

const Cover = () => {
  const bodyStyle = {
    backgroundImage: `url(${backgroundImage})`, 
    backgroundSize: 'fill', 
    backgroundRepeat: "no-repeat", 
  };

  return (
    <body style={bodyStyle}>
      <main className="px-5 m-5 text-light">
        <h1 style={{fontSize : '4rem'}}>Car Rental.</h1>
        <p className="lead">
          Drive the most luxurious cars near you with just a click of a button.<br />
          Easy. Affordable. Fast!
        </p>
        <p className="lead">
          <button
            href="#"
            className="mt-4 btn btn-lg btn-light fw-bold border-white bg-white"
          >
            Register New Account
          </button>
          <button
            href="#"
            className="mt-4 ms-4 btn btn-lg fw-bold border-white text-light"
          >
            Log-in
          </button>
        </p>
      </main>
    </body>
  );
};

export default Cover;
