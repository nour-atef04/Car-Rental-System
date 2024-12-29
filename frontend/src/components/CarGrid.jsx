import React, { useState, useEffect } from "react";
import CarTile from "./CarTile";
import RentPopup from "./RentPopup";

const CarGrid = ({ searchQuery,  maxRent }) => {
  
  // console.log(searchQuery);

  const [cars, setCars] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      const response = await fetch(`http://localhost:5000/search-cars?query=${searchQuery}`);
      const data = await response.json();
      setCars(data.cars);
    };

    fetchCars();
  }, [searchQuery]);

  const handleRent = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmitRent = () => {
    // code yet to handle
    alert("Car rented successfully!");
    setShowModal(false);
  };

  return (
    <div class="py-4">
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {cars.filter((car) => car.rental_rate <= maxRent).map((car, index) => {
            return (
              <CarTile
                key={index}
                id={index}
                vid={car.vid}
                type={car.type}
                brand={car.brand}
                capacity={car.capacity}
                rentalRate={car.rental_rate}
                imageURL={car.car_image_url}
                onRent={() => handleRent(car)}
              />
            );
          })}
        </div>
      </div>

      {showModal && selectedCar && (
        <RentPopup
          vid={selectedCar.vid}
          type={selectedCar.type}
          brand={selectedCar.brand}
          capacity={selectedCar.capacity}
          rentalRate={selectedCar.rental_rate}
          onCloseModal={handleCloseModal}
          onRentClick={handleSubmitRent}
        />
      )}
    </div>
  );
};

export default CarGrid;
