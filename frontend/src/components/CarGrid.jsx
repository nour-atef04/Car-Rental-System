import React from "react";

const CarGrid = () => {
  // Example array of cars
  const cars = Array(5).fill({
    description:
      "CAR DESCRIPTION: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus esse recusandae quibusdam et, unde quis alias architecto ullam officiis inventore tempora, veniam labore ea quos debitis eveniet laborum perferendis?",
  });


  return (

      <div class="py-4">
        <div class="container">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {cars.map((car, index) => (
              <div class="col">
                <div class="card shadow-sm">
                  <svg width="100%" height="225"></svg>
                  <div class="card-body">
                    <p class="card-text">{index}. {car.description}</p>
                    <div class="d-flex justify-content-center">
                      <div class="btn-group">
                        <button
                          type="button"
                          class="btn btn-sm btn-outline-secondary"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          class="btn btn-sm btn-outline-secondary"
                        >
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default CarGrid;