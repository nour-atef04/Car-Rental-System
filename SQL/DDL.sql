CREATE DATABASE Car_Rental_System;
USE Car_Rental_System;

CREATE TABLE Account (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Customer (
    ssn VARCHAR(15) NOT NULL, 
    nationality VARCHAR(50) NOT NULL,
    fname VARCHAR(50) NOT NULL,
    minit CHAR(1) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    customer_phone VARCHAR(15) NOT NULL,
    email VARCHAR(255) NOT NULL,
    drivers_license INT NOT NULL
);

CREATE TABLE Employee (
    store_id INT , 
    emp_ssn  VARCHAR(15) NOT NULL,
    email VARCHAR(255) NOT NULL,
    fname VARCHAR(50) NOT NULL,
    minit CHAR(1) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    emp_phone VARCHAR(15) NOT NULL
);

CREATE TABLE Car (
    vid INT AUTO_INCREMENT primary key,
    type VARCHAR(50) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    capacity VARCHAR(10) NOT NULL,
    status VARCHAR(20) NOT NULL,
    rental_rate FLOAT NOT NULL,
    insurance VARCHAR(20) NOT NULL,
    store_id INT NOT NULL,
    year INT NOT NULL,
    color VARCHAR(20) NOT NULL
);

CREATE TABLE Order_place (
    order_id INT AUTO_INCREMENT primary key,
    start_day TIMESTAMP NOT NULL,
    end_day TIMESTAMP NOT NULL,
    payment_type VARCHAR(20),
    ssn VARCHAR(15) NOT NULL,
    nationality VARCHAR(50) NOT NULL,
    vid INT NOT NULL
);

CREATE TABLE Store (
    store_id INT AUTO_INCREMENT primary key,
    store_phone VARCHAR(15) NOT NULL,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL
);



-- Primary and Foreign Keys
ALTER TABLE Account
ADD CONSTRAINT pk_account PRIMARY KEY(email);

ALTER TABLE Customer
ADD CONSTRAINT pk_customer PRIMARY KEY(ssn, nationality);

ALTER TABLE Customer
ADD CONSTRAINT fk_customer FOREIGN KEY(email) REFERENCES Account(email) 
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Employee
ADD CONSTRAINT pk_employee PRIMARY KEY(emp_ssn);

ALTER TABLE Employee
ADD CONSTRAINT fk_employee1 FOREIGN KEY (store_id) REFERENCES Store(store_id)
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE Employee
ADD CONSTRAINT fk_employee2 FOREIGN KEY(email) REFERENCES Account(email) 
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Car
ADD CONSTRAINT fk_car FOREIGN KEY(store_id) REFERENCES Store(store_id) 
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Order_place
ADD CONSTRAINT fk_order_place1 FOREIGN KEY(ssn, nationality) 
REFERENCES Customer(ssn, nationality) 
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Order_place
ADD CONSTRAINT fk_order_place2 FOREIGN KEY(vid) REFERENCES Car(vid) 
ON DELETE CASCADE ON UPDATE CASCADE;

