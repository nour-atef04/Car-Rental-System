import React from "react";
import CarTile from "./CarTile";

const CarGrid = () => {
  // Example array of cars
  const cars = Array(5).fill({
    type: "mitsbushi",
    brand: "lancer",
    detail:
      "CAR DESCRIPTION: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus esse recusandae quibusdam et, unde quis alias architecto ullam officiis inventore tempora, veniam labore ea quos debitis eveniet laborum perferendis?",
    rentalRate: 50,
    capacity: 5,
  });

  const handleSeeMore = () => {
    //
  };

  const handleRent = () => {
    //
  };

  return (
    <div class="py-4">
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {cars.map((car, index) => {
            return (
              <CarTile
                id={index}
                vid={car.vid}
                type={car.type}
                brand={car.brand}
                capacity={car.capacity}
                detail={car.detail}
                rentalRate={car.rentalRate}
                status={car.status}
                imageURL={car.imageURL}
                onSeeMore={handleSeeMore}
                onRent={handleRent}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CarGrid;
