-- Populate Account Table
INSERT INTO Account (email, password) VALUES
('john.doe@example.com', 'hashed_password_1');

-- Populate Customer Table
-- INSERT INTO Customer (ssn, nationality, fname, minit, lname, customer_phone, email, drivers_license) VALUES


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
-- (1, 'SUV', 'Toyota', '5', 'Available', 50.00, 'Full', 1, 2020, 'White', 'https://images.dealer.com/autodata/us/color/2025/USD50TOS202B0/040.jpg?impolicy=resize&w=640'),
-- (2, 'Sedan', 'Honda', '4', 'Rented', 40.00, 'Partial', 1, 2019, 'Black', 'https://di-sitebuilder-assets.s3.amazonaws.com/Honda/ModelLandingPage/Civic-Sedan/2022/trim-EX.jpg'),
-- (3, 'Truck', 'Ford', '2', 'Out of Service', 70.00, 'None', 2, 2021, 'Red', 'https://www.villageford.com/static/dealer-14561/966054.jpg'),
-- (4, 'Compact', 'Chevrolet', '4', 'Available', 30.00, 'Full', 3, 2022, 'Blue', 'https://65e81151f52e248c552b-fe74cd567ea2f1228f846834bd67571e.ssl.cf1.rackcdn.com/ldm-images/2019-Chevrolet-Trax-Pacific-Blue-Metallic.jpg'),
-- (5, 'Convertible', 'BMW', '2', 'Rented', 90.00, 'Full', 4, 2022, 'Black', 'https://images.dealer.com/ddc/vehicles/2025/BMW/430/Convertible/trim_i_xDrive_1aa987/color/Black%20Sapphire%20Metallic-475-13%2C13%2C13-640-en_US.jpg?impolicy=downsize_bkpt&imdensity=1&w=520');

('ABC123', 'Sedan', 'Toyota', '5', 'Available', 100.0, 'Full', 1, 2020, 'Red', 'https://dealer-content.s3.amazonaws.com/images/models/toyota/2021/corolla/colors/barcelona-red-metallic.png'),
('BCD234', 'SUV', 'Honda', '7', 'Available', 120.0, 'Partial', 1, 2021, 'Blue', 'https://images.dealer.com/ddc/vehicles/2025/Honda/CR-V/SUV/color/Still%20Night%20Pearl-BM-18,30,46-640-en_US.jpg'),
('CDE345', 'Sedan', 'Ford', '5', 'Available', 90.0, 'None', 3, 2022, 'Black', 'https://cdn.jdpower.com/ChromeImageGallery/Expanded/Transparent/640/2013FRD014b_640/2013FRD014b_640_01.png'),
('DEF456', 'Truck', 'Chevrolet', '2', 'Available', 150.0, 'Full', 4, 2023, 'White', 'https://images.dealer.com/ddc/vehicles/2024/Chevrolet/Silverado%201500/Truck/still/front-left/front-left-640-en_US.jpg'),
('EFG567', 'Sedan', 'BMW', '5', 'Available', 110.0, 'Full', 5, 2020, 'Silver', 'https://www.bmw-egypt.com/content/dam/bmw/common/all-models/3-series/sedan/2022/navigation/bmw-3-series-sedan-lci-modelfinder.png'),
('FGH678', 'SUV', 'Nissan', '7', 'Available', 130.0, 'Partial', 5, 2021, 'Green', 'https://images.dealer.com/ddc/vehicles/2024/Nissan/Pathfinder/SUV/color/Obsidian%20Green%20Pearl-DAN-28,38,30-640-en_US.jpg'),
('GHI789', 'Sedan', 'Audi', '5', 'Available', 125.0, 'Full', 4, 2022, 'Gray', 'https://dealer-content.s3.amazonaws.com/images/models/audi/2021/a4/colors/terra-gray-metallic.png'),
('HIJ890', 'Truck', 'Ram', '2', 'Available', 160.0, 'Full', 4, 2023, 'Yellow', 'https://pictures.dealer.com/r/richardsoncdjramcllc/1698/1885fb6e83b841430fe6c4df2480428ax.jpg'),
('IJK901', 'SUV', 'Mercedes', '7', 'Available', 140.0, 'Partial', 2, 2020, 'Brown', 'https://www.carandbike.com/_next/image?url=https%3A%2F%2Fimages.carandbike.com%2Fcar-images%2Fcolors%2Fmercedes-benz%2Feqe-suv%2Fmercedes-benz-eqe-suv-velvet-brown.jpg%3Fv%3D1695101310&w=750&q=75'),
('JKL012', 'Sedan', 'Volkswagen', '5', 'Available', 95.0, 'None', 1, 2021, 'Red', 'https://www.andymohrvw.com/assets/stock/ColorMatched_01/Transparent/1280/cc_2025VWC03_01_1280/cc_2025VWC030006_01_1280_P8P8.png'),
('KLM123', 'SUV', 'Hyundai', '7', 'Available', 115.0, 'Full', 2, 2022, 'Purple', 'https://images.dealer.com/ddc/vehicles/2025/Hyundai/Palisade/SUV/trim_SE_b18adb/perspective/front-left/2025_76.png'),
('LMN234', 'Truck', 'Ford', '2', 'Available', 155.0, 'Partial', 2, 2023, 'Blue', 'https://di-uploads-pod39.dealerinspire.com/kingsford/uploads/2018/12/2019-Ford-Ranger-Cincinnati-OH-Blue-Left.png'),
('MNO345', 'Sedan', 'Chevrolet', '5', 'Available', 105.0, 'Full', 3, 2020, 'Blue', 'https://images.dealer.com/ddc/vehicles/2025/Chevrolet/Malibu/Sedan/color/Lakeshore%20Blue%20Metallic-GXP-119,141,172-640-en_US.jpg'),
('NOP456', 'SUV', 'Toyota', '7', 'Available', 125.0, 'None', 1, 2021, 'Black', 'https://images.dealer.com/autodata/us/640/color/2024/USD40TOS182A0/202.jpg'),
('OPQ567', 'Truck', 'Ram', '2', 'Available', 165.0, 'Full', 1, 2022, 'Red', 'https://medias.fcacanada.ca/jellies/renditions/2024/800x510/CC24_DT6P98_2TH_PR4_APA_XXX_XXX_XXX.39b80eb84adc79c530b11c4a25dbd55a.png'),
('PQR678', 'Sedan', 'Ford', '5', 'Available', 100.0, 'Partial', 5, 2023, 'White', 'https://www.motortrend.com/uploads/sites/10/2017/10/2018-ford-focus-se-sedan-angular-front.png?w=768&width=768&q=75&format=webp'),
('QRS789', 'SUV', 'Honda', '7', 'Available', 120.0, 'Full', 5, 2020, 'Silver', 'https://dealer-content.s3.amazonaws.com/images/models/honda/2021/cr-v/colors/lunar-silver-metallic.png'),
('STU901', 'Sedan', 'BMW', '5', 'Available', 110.0, 'Partial', 1, 2022, 'Green', 'https://cdn.bmwblog.com/wp-content/uploads/2020/08/isle-man-of-green-bmw-m3.jpg'),
('TUV012', 'SUV', 'Nissan', '7', 'Available', 130.0, 'Full', 2, 2023, 'Yellow', 'https://inv.assets.sincrod.com/ChromeColorMatch/us/WHITE_cc_2025NIS260013_01_1280_XLE.jpg');

-- Populate Order_place Table
-- INSERT INTO Order_place (order_id, start_day, end_day, payment_type, ssn, nationality, vid) VALUES
-- (301, '2024-12-01 10:00:00', '2024-12-10 10:00:00', 'Credit Card', '123456789', 'USA', 1),
-- (302, '2024-12-05 12:00:00', '2024-12-15 12:00:00', 'Cash', '987654321', 'USA', 2),
-- (303, '2024-12-20 14:00:00', '2024-12-25 14:00:00', 'Debit Card', '567890123', 'Canada', 2),
-- (304, '2024-12-25 12:00:00', '2024-12-30 12:00:00', 'Credit Card', '111222333', 'USA', 3),
-- (305, '2024-12-31 10:00:00', '2025-01-05 10:00:00', 'Cash', '444555666', 'UK', 4);