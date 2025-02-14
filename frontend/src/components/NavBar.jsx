import React from "react";
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand bg-dark text-light sticky-top py-3">
      <div className="container">
        <div className="row">
          <div className="col">
            <ul className="navbar-nav">
              <Link
                style={{
                  cursor: "pointer",
                  color: "white",
                  textDecoration: "none",
                }}
                to="/dashboard"
              >
                <li className="px-5 lead fw-bold">CAR RENTALS.</li>
              </Link>
            </ul>
          </div>
        </div>
        <ul className="navbar-nav">
          <li className="px-5">About Us</li>
          <li className="px-5">FAQs</li>
          <li className="px-5">Contact</li>
          <li>
            <CustomButton
              text="Log-out"
              type="login"
              buttonClass="px-5 ms-3 btn btn-sm border-white button-nonsolid"
            />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
