import express from "express"; // creates server and handles HTTP requests
import bcrypt from "bcrypt"; // hashes password
import mysql from "mysql2"; // connects to MYSQL db
import cors from "cors"; // allows frontend to interact with this API
const app = express();

// middleware to parse JSON data and convert them to javascript object
app.use(express.json());

// middleware to ensure the API can be accessed from different origins
app.use(cors());

// MySQL connection configuration
const db = mysql.createConnection({
  host: "localhost", // XAMPP default MySQL host
  user: "root", // XAMPP default MySQL user
  password: "", // default is empty for XAMPP
  database: "car_rental_system", // database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
  } else {
    console.log("Connected to MySQL database!");
  }
});

// Register Endpoint
app.post("/register", async (req, res) => {
  // Accepts user input from the request body
  const {
    fname,
    minit,
    lname,
    email,
    password,
    customer_phone,
    nationality,
    ssn,
    drivers_license,
  } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into the Account table first
    db.query(
      "INSERT INTO Account (email, password) VALUES (?, ?)",
      [email, hashedPassword],
      (err, accountResult) => {
        if (err) {
          // Handle errors related to the Account insertion
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).send("Email already exists.");
          }
          return res
            .status(500)
            .send(
              "Server error: Cannot create account. Please try again later."
            );
        }

        // Insert into the Customer table using the email from Account
        db.query(
          "INSERT INTO Customer (ssn, nationality, fname, minit, lname, customer_phone, email, drivers_license) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            ssn,
            nationality,
            fname,
            minit,
            lname,
            customer_phone,
            email,
            drivers_license,
          ],
          (err) => {
            if (err) {
              return res
                .status(500)
                .send(
                  "Server error: Cannot add customer info. Please try again later."
                );
            }

            // Registration successful
            return res.status(200).send("Registration successful!");
          }
        );
      }
    );
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).send("Error during registration, please try again later.");
  }
});

// Employee Register Endpoint
app.post("/emp_register", async (req, res) => {
  const { store_id, emp_ssn, email, password, fname, minit, lname, emp_phone } =
    req.body;

  //console.log(req.body);

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into the Account table first
    db.query(
      "INSERT INTO Account (email, password) VALUES (?, ?)",
      [email, hashedPassword],
      (err) => {
        if (err) {
          return (
            res
              // .status(500)
              // .send(
              //   "Server error: Cannot add employee info. Please try again later."
              // );
              .status(500)
              .send(err.message)
          );
        }

        // Insert into the Employee table using the email from Account
        db.query(
          "INSERT INTO Employee (store_id, emp_ssn, email, fname, minit, lname, emp_phone) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [store_id, emp_ssn, email, fname, minit, lname, emp_phone],
          (err, accountResult) => {
            if (err) {
              // Handle errors related to the Account insertion
              if (err.code === "ER_DUP_ENTRY") {
                return res.status(400).send("Email already exists.");
              }
              return (
                res
                  // .status(500)
                  // .send(
                  //   "Server error: Cannot add employee info. Please try again later."
                  // );
                  .status(500)
                  .send(err.message)
              );
            }

            // Registration successful
            return res.status(200).send("Registration successful!");
          }
        );
      }
    );
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).send("Error during registration, please try again later.");
  }
});

// Login Endpoint
app.post("/login", async (req, res) => {
  const { email, password, user_type } = req.body;

  console.log(req.body);

  if (user_type == "customer") {
    db.query(
      "SELECT * FROM Account NATURAL JOIN Customer WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          return res.status(500).send("Server error, please try again later.");
        }

        if (results.length === 0) {
          return res.status(400).send("Email not found.");
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          return res.status(400).send("Incorrect password. Please try again.");
        }
        // Send a the user to the frontend, but first delete the password for extra protection
        delete user.password;
        res.send(user);
      }
    );
  } else {
    db.query(
      "SELECT * FROM Account NATURAL JOIN Employee WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          return res.status(500).send("Server error, please try again later.");
        }

        if (results.length === 0) {
          return res.status(400).send("Email not found.");
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          return res.status(400).send("Incorrect password. Please try again.");
        }
        // Send a success message if credentials are valid
        res.send("Login successful!");
      }
    );
  }
});

// Register a New Car Endpoint
app.post("/register-car", (req, res) => {
  const {
    vid,
    type,
    brand,
    capacity,
    status,
    rental_rate,
    insurance,
    store_id,
    year,
    color,
    car_image_url,
  } = req.body;

  // console.log(req.body);

  // Insert the car into the Car table
  db.query(
    "INSERT INTO Car (vid, type, brand, capacity, status, rental_rate, insurance, store_id, year, color, car_image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      vid,
      type,
      brand,
      capacity,
      status,
      rental_rate,
      insurance,
      store_id,
      year,
      color,
      car_image_url,
    ],
    (err) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      return res.status(200).send("Registration successful!");
    }
  );
});

// Update Car Status Endpoint when returned
app.put("/update-car-status/", (req, res) => {
  const vid = req.query.vid;
  const status = req.query.status;

  console.log(vid);
  console.log(status);

  // Validate inputs
  if (!vid || !status) {
    return res
      .status(400)
      .send("new Status and Vehicle ID are required to update the car status.");
  }

  // Update the car's status
  db.query(
    "UPDATE Car SET status = ? WHERE vid = ?",
    [status, vid],
    (err, results) => {
      if (err) {
        return res.status(500).send("Error updating car status.");
      }
      if (results.affectedRows === 0) {
        return res.status(404).send("Car not found.");
      }
      res.json({ success: true, message: "Car status updated successfully." });
    }
  );
});

app.post("/reserve-car", (req, res) => {
  const { start_day, end_day, payment_type, ssn, nationality, vid } = req.body;

  // Validate inputs
  if (!start_day || !end_day || !payment_type || !ssn || !nationality || !vid) {
    return res.status(400).json({
      success: false,
      error: "All fields are required to reserve a car.",
    });
  }
  console.log(req.body);

  // Insert reservation into the Order_place table
  db.query(
    "INSERT INTO Order_place (start_day, end_day, payment_type, ssn, nationality, vid) VALUES (?, ?, ?, ?, ?, ?)",
    [start_day, end_day, payment_type, ssn, nationality, vid],
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, error: "Error reserving car." });
      }

      // Update the car's status to 'Reserved'
      db.query(
        "UPDATE Car SET status = 'Reserved' WHERE vid = ?",
        [vid],
        (updateErr) => {
          if (updateErr) {
            return res
              .status(500)
              .json({ success: false, error: "Error updating car status." });
          }
          res.json({ success: true, message: "Car reserved successfully." });
        }
      );
    }
  );
});

app.get("/store-info", (req, res) => {
  const store_id = req.query.store_id;

  if (!store_id) {
    return res
      .status(400)
      .json({ success: false, error: "Store ID is required." });
  }

  const query = `
    SELECT Store.store_phone, Store.street, Store.city, Store.country
    FROM Store
    WHERE Store.store_id = ?
  `;

  // Execute the query
  db.query(query, [store_id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, error: "Error fetching store information." });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Store not found." });
    }

    res.json({ success: true, store: results[0] });
  });
});

// Search Available Cars Endpoint
app.get("/search-cars", (req, res) => {
  const { query } = req.query; // Get the query parameter from the request
  let sqlQuery = "SELECT * FROM Car WHERE status = 'Available'";
  const params = [];

  if (query) {
    // Split the query into words and handle each word individually
    const words = query.split(" ");
    const conditions = [];

    words.forEach((word) => {
      conditions.push(
        "(type LIKE ? OR brand LIKE ? OR capacity LIKE ? OR color LIKE ?)"
      );
      params.push(`%${word}%`, `%${word}%`, `%${word}%`, `%${word}%`);
    });

    // Combine the conditions with AND to ensure all words are matched
    sqlQuery += " AND " + conditions.join(" AND ");
  }

  db.query(sqlQuery, params, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error searching for cars." });
    }
    res.json({ success: true, cars: results });
  });
});

// Advanced Search Endpoint
app.get("/advanced-search", (req, res) => {
  console.log(req.query);
  const {
    customerName,
    customerEmail,
    customerFName,
    customerLName,
    customerMinit,
    customerSSN,
    customerNationality,
    carModel,
    carType,
    carBrand,
    carCapacity,
    carStoreId,
    carInsurance,
    carColor,
    paymentType,
    status,
    dateFrom,
    dateTo,
  } = req.query;

  // Base query structure
  let query = `
    SELECT 
      Order_place.order_id, Order_place.start_day, Order_place.end_day, Order_place.payment_type,
      Customer.ssn, Customer.nationality, Customer.fname, Customer.minit, Customer.lname, Customer.customer_phone, Customer.email,
      Car.vid, Car.type, Car.brand, Car.capacity, Car.status, Car.rental_rate, Car.insurance, Car.store_id, Car.year, Car.color
    FROM Order_place
    JOIN Customer 
      ON Order_place.ssn = Customer.ssn 
      AND Order_place.nationality = Customer.nationality
    JOIN Car 
      ON Order_place.vid = Car.vid
    WHERE 1 = 1`; // Placeholder to dynamically append conditions

  const params = [];

  // Customer Filters
  if (customerName) {
    query += ` AND CONCAT(Customer.fname, ' ', Customer.minit, ' ', Customer.lname) LIKE ?`;
    params.push(`%${customerName}%`);
  }
  if (customerEmail) {
    query += ` AND Customer.email LIKE ?`;
    params.push(`%${customerEmail}%`);
  }
  if (customerFName) {
    query += ` AND Customer.fname LIKE ?`;
    params.push(`%${customerFName}%`);
  }
  if (customerLName) {
    query += ` AND Customer.lname LIKE ?`;
    params.push(`%${customerLName}%`);
  }
  if (customerMinit) {
    query += ` AND Customer.minit LIKE ?`;
    params.push(`%${customerMinit}%`);
  }
  if (customerSSN) {
    query += ` AND Customer.ssn = ?`;
    params.push(customerSSN);
  }
  if (customerNationality) {
    query += ` AND Customer.nationality LIKE ?`;
    params.push(`%${customerNationality}%`);
  }

  // Car Filters
  if (carModel) {
    query += ` AND Car.vid LIKE ?`;
    params.push(`%${carModel}%`);
  }
  if (carType) {
    query += ` AND Car.type LIKE ?`;
    params.push(`%${carType}%`);
  }
  if (carBrand) {
    query += ` AND Car.brand LIKE ?`;
    params.push(`%${carBrand}%`);
  }
  if (carCapacity) {
    query += ` AND Car.capacity = ?`;
    params.push(carCapacity);
  }
  if (carStoreId) {
    query += ` AND Car.store_id = ?`;
    params.push(carStoreId);
  }
  if (carInsurance) {
    query += ` AND Car.insurance = ?`;
    params.push(carInsurance);
  }
  if (carColor) {
    query += ` AND Car.color LIKE ?`;
    params.push(`%${carColor}%`);
  }

  // Order Filters
  if (paymentType) {
    query += ` AND Order_place.payment_type = ?`;
    params.push(paymentType);
  }
  if (status && status !== "all") {
    query += ` AND Car.status = ?`;
    params.push(status);
  }
  if (dateFrom && dateTo) {
    query += ` AND Order_place.start_day BETWEEN ? AND ?`;
    params.push(dateFrom, dateTo);
  } else if (dateFrom) {
    query += ` AND Order_place.start_day >= ?`;
    params.push(dateFrom);
  } else if (dateTo) {
    query += ` AND Order_place.start_day <= ?`;
    params.push(dateTo);
  }

  // Execute the query
  db.query(query, params, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, error: "Error performing advanced search." });
    }

    res.json({ success: true, data: results });
  });
});

// Reservations within a specific period
app.get("/reports/reservations-period", (req, res) => {
  const { start_date, end_date } = req.query;

  // Check if start date and end date are provided
  if (!start_date || !end_date) {
    return res.status(400).json({
      success: false,
      message: "Start date and end date are required.",
    });
  }

  const query = `
    SELECT Order_place.*, Customer.*, Car.*
    FROM Order_place
    JOIN Customer ON Order_place.ssn = Customer.ssn AND Order_place.nationality = Customer.nationality
    JOIN Car ON Order_place.vid = Car.vid
    WHERE Order_place.start_day BETWEEN ? AND ? AND Order_place.end_day BETWEEN ? AND ?`;

  db.query(
    query,
    [start_date, end_date, start_date, end_date],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error fetching reservations.",
          error: err,
        });
      }
      // Return the results as a JSON object
      res.json({ success: true, data: results });
    }
  );
});

// Reservations of a specific car within a period
app.get("/reports/car-reservations", (req, res) => {
  const { vid, start_date, end_date } = req.query;

  // Check if vehicle ID, start date, and end date are provided
  if (!vid || !start_date || !end_date) {
    return res.status(400).json({
      success: false,
      message: "Vehicle ID, start date, and end date are required.",
    });
  }

  const query = `
    SELECT Order_place.*, Car.*
    FROM Order_place
    JOIN Car ON Order_place.vid = Car.vid
    WHERE Order_place.vid = ? AND (Order_place.start_day BETWEEN ? AND ? AND Order_place.end_day BETWEEN ? AND ?)`;

  db.query(
    query,
    [vid, start_date, end_date, start_date, end_date],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error fetching car reservations.",
          error: err,
        });
      }
      // Return the results as a JSON object
      res.json({ success: true, data: results });
    }
  );
});

//status of all cars on a specific day
app.get("/reports/cars-status", (req, res) => {
  const specific_date =
    req.query.reportDate || new Date().toISOString().split("T")[0]; // Default to current date

  const query = `
    SELECT Car.*, 
           CASE 
             WHEN EXISTS (
               SELECT 1 FROM Order_place 
               WHERE Car.vid = Order_place.vid 
                 AND ? BETWEEN Order_place.start_day AND Order_place.end_day
             ) THEN 'Reserved'
             ELSE 'Available'
           END AS status
    FROM Car`;

  db.query(query, [specific_date], (err, results) => {
    if (err) {
      return res.status(500).send("Error fetching car statuses.");
    }
    res.send(results);
  });
});

// Reservations of a specific customer
app.get("/reports/customer-reservations", (req, res) => {
  const { ssn, nationality } = req.query;

  // Check if SSN and nationality are provided
  if (!ssn || !nationality) {
    return res
      .status(400)
      .json({ success: false, message: "SSN and nationality are required." });
  }

  const query = `
    SELECT Order_place.*, Customer.*, Car.brand, Car.vid, Car.year, Car.type
    FROM Order_place
    JOIN Customer ON Order_place.ssn = Customer.ssn AND Order_place.nationality = Customer.nationality
    JOIN Car ON Order_place.vid = Car.vid
    WHERE Customer.ssn = ? AND Customer.nationality = ?`;

  db.query(query, [ssn, nationality], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error fetching customer reservations.",
        error: err,
      });
    }
    // Return the results as a JSON object
    res.json({ success: true, data: results });
  });
});

// Daily payments within a specific period
app.get("/reports/daily-payments", (req, res) => {
  const { start_date, end_date } = req.query;

  // Check if both start_date and end_date are provided
  if (!start_date || !end_date) {
    return res.status(400).json({
      success: false,
      message: "Start date and end date are required.",
    });
  }

  const query = `
    SELECT DATE(Order_place.start_day) AS payment_date, 
           SUM(Car.rental_rate * DATEDIFF(Order_place.end_day, Order_place.start_day)) AS total_payment
    FROM Order_place
    JOIN Car ON Order_place.vid = Car.vid
    WHERE Order_place.start_day BETWEEN ? AND ?
    GROUP BY DATE(Order_place.start_day)`;

  db.query(query, [start_date, end_date], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error fetching daily payments.",
        error: err,
      });
    }
    // Return the results as a JSON object
    res.json({ success: true, data: results });
  });
});

// Starting server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
