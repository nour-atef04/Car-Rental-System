-- Populate Account Table
INSERT INTO Account (email, password) VALUES
('john.doe@example.com', 'hashed_password_1');

-- Populate Customer Table
-- INSERT INTO Customer (ssn, nationality, fname, minit, lname, customer_phone, email) VALUES


-- Populate Store Table
INSERT INTO Store (store_id, store_phone, street, city, country) VALUES
(1, '1111111111', '123 Main St', 'New York', 'USA'),
(2, '2222222222', '456 Elm St', 'Toronto', 'Canada'),
(3, '3333333333', '789 Oak St', 'Los Angeles', 'USA'),
(4, '4444444444', '456 Maple St', 'San Francisco', 'USA'),
(5, '5555555555', '789 Birch St', 'London', 'UK');

INSERT INTO Employee (store_id, emp_ssn, email, fname, minit, lname, emp_phone)
VALUES (1, '123-45-6789', 'john.doe@example.com', 'John', 'D', 'Doe', '555-1234');

-- Populate Car Table
INSERT INTO Car (vid, type, brand, capacity, status, rental_rate, insurance, store_id, year, color, car_image_url) VALUES
(1, 'SUV', 'Toyota', '5', 'Available', 50.00, 'Full', 1, 2020, 'White', 'https://images.dealer.com/autodata/us/color/2025/USD50TOS202B0/040.jpg?impolicy=resize&w=640'),
(2, 'Sedan', 'Honda', '4', 'Rented', 40.00, 'Partial', 1, 2019, 'Black', 'https://di-sitebuilder-assets.s3.amazonaws.com/Honda/ModelLandingPage/Civic-Sedan/2022/trim-EX.jpg'),
(3, 'Truck', 'Ford', '2', 'Out of Service', 70.00, 'None', 2, 2021, 'Red', 'https://www.villageford.com/static/dealer-14561/966054.jpg'),
(4, 'Compact', 'Chevrolet', '4', 'Available', 30.00, 'Full', 3, 2022, 'Blue', 'https://65e81151f52e248c552b-fe74cd567ea2f1228f846834bd67571e.ssl.cf1.rackcdn.com/ldm-images/2019-Chevrolet-Trax-Pacific-Blue-Metallic.jpg'),
(5, 'Convertible', 'BMW', '2', 'Rented', 90.00, 'Full', 4, 2022, 'Black', 'https://images.dealer.com/ddc/vehicles/2025/BMW/430/Convertible/trim_i_xDrive_1aa987/color/Black%20Sapphire%20Metallic-475-13%2C13%2C13-640-en_US.jpg?impolicy=downsize_bkpt&imdensity=1&w=520'),
(6, 'SUV', 'Nissan', '7', 'Available', 60.00, 'Full', 1, 2021, 'Silver', 'https://di-uploads-pod14.dealerinspire.com/nissanofrichmond/uploads/2018/12/2019-nissan-rogue-brilliant-silver-metallic.jpg'),
(7, 'Sedan', 'Toyota', '5', 'Available', 45.00, 'Partial', 3, 2020, 'Green', 'https://images.hgmsites.net/lrg/2016-toyota-corolla-4-door-sedan-cvt-le-eco-natl-angular-front-exterior-view_100535747_l.jpg'),
(8, 'Compact', 'Honda', '4', 'Available', 25.00, 'Full', 4, 2021, 'Gray', 'https://i.gaw.to/content/photos/52/39/523980-honda-odyssey-2023-elle-aussi-peut-avoir-l-air-cool.jpg'),
(9, 'Convertible', 'Ford', '2', 'Available', 100.00, 'Full', 5, 2023, 'Red', 'https://i.pinimg.com/originals/31/67/a0/3167a026940b81c31f8e3caa1dfea96f.png');

-- Populate Order_place Table
-- INSERT INTO Order_place (order_id, start_day, end_day, payment_type, ssn, nationality, vid) VALUES
-- (301, '2024-12-01 10:00:00', '2024-12-10 10:00:00', 'Credit Card', '123456789', 'USA', 1),
-- (302, '2024-12-05 12:00:00', '2024-12-15 12:00:00', 'Cash', '987654321', 'USA', 2),
-- (303, '2024-12-20 14:00:00', '2024-12-25 14:00:00', 'Debit Card', '567890123', 'Canada', 2),
-- (304, '2024-12-25 12:00:00', '2024-12-30 12:00:00', 'Credit Card', '111222333', 'USA', 3),
-- (305, '2024-12-31 10:00:00', '2025-01-05 10:00:00', 'Cash', '444555666', 'UK', 4);