import React from "react";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ReduceCapacityIcon from "@mui/icons-material/ReduceCapacity";
import "./CSS/CarTile.css";

const CarTile = (props) => {
  return (
    <div className="col">
      <div className="card shadow-sm">
        <div className="card-header">
          <h4 className="car-type">{props.brand}</h4>
          <h5 className="car-brand">{props.type}</h5>
        </div>
        <img
          width="100%"
          height="225"
          src={props.imageURL}
          alt={props.type}
          style={{ objectFit: "cover" }}
        />
        <div className="card-body">
          <p className="card-text">{props.detail}</p>
          <div className="d-flex justify-content-between">
            <div className="capacity d-flex align-items-center">
              <ReduceCapacityIcon className="icon-align" />
              <p>{props.capacity}</p>
            </div>
            <div className="rentalRate d-flex align-items-center">
              <MonetizationOnIcon className="icon-align" />
              <p>{props.rentalRate}</p>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-lg btn-primary rent-btn"
              onClick={props.onRent}
            >
              Rent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarTile;
