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
  database: "car-rental-system", // database name
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
  // accepts user input from the request body
  const {
    fname,
    minit,
    lname,
    email,
    password,
    customer_phone,
    nationality,
    ssn,
  } = req.body;

  try {
    // hashes password
    const hashedPassword = await bcrypt.hash(password, 10);

    // inserts user data into the CUSTOMER DB
    db.query(
      "INSERT INTO Customer (ssn, nationality, fname, minit, lname, customer_phone, email) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [ssn, nationality, fname, minit, lname, customer_phone, email],
      (err) => {
        if (err) {
          // handles errors and sends appropriate responses to the client (frontend)
          if (err.code === "ER_DUP_ENTRY") {
            // duplicate entry
            return res.status(400).send("Email already exists.");
          }
          return res.status(500).send("Server error, please try again later."); // db error
        }

        // inserts user account (username, password) into the ACCOUNT DB
        db.query(
          "INSERT INTO Account (email, password) VALUES (?, ?)",
          [email, hashedPassword],
          (err) => {
            if (err) {
              return res
                .status(500)
                .send("Server error, please try again later.");
            }
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
  const { email, password, customer_type } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required.");
  }
  if(customer_type){
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
        // Send a success message if credentials are valid
        res.send("Login successful!");
      }
    );
  }
  else{
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
  const { type, brand, capacity, status, rental_rate, insurance, store_id, year, color } = req.body;

  // Check for missing fields
  if (!type || !brand || !capacity || !status || !rental_rate || !insurance || !store_id || !year || !color) {
    return res.status(400).send("All fields are required to register a car.");
  }

  // Insert the car into the Car table
  db.query(
    "INSERT INTO Car (type, brand, capacity, status, rental_rate, insurance, store_id, year, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [type, brand, capacity, status, rental_rate, insurance, store_id, year, color],
    (err) => {
      if (err) {
        return res.status(500).send("Error registering car.");
      }
      res.json({ success: true, message: "Car registered successfully." });
    }
  );
});

// Update Car Status Endpoint when returned
app.put("/update-car-status/:vid", (req, res) => {
  const { vid } = req.params;
  const { status } = req.body;

  // Validate inputs
  if (!vid || !status) {
    return res.status(400).send("new Status and Vehicle ID are required to update the car status.");
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
    return res.status(400).json({ success: false, error: "All fields are required to reserve a car." });
  }

  // Insert reservation into the Order_place table
  db.query(
    "INSERT INTO Order_place (start_day, end_day, payment_type, ssn, nationality, vid) VALUES (?, ?, ?, ?, ?, ?)",
    [start_day, end_day, payment_type, ssn, nationality, vid],
    (err) => {
      if (err) {
        return res.status(500).json({ success: false, error: "Error reserving car." });
      }

      // Update the car's status to 'Reserved'
      db.query(
        "UPDATE Car SET status = 'Reserved' WHERE vid = ?",
        [vid],
        (updateErr) => {
          if (updateErr) {
            return res.status(500).json({ success: false, error: "Error updating car status." });
          }
          res.json({ success: true, message: "Car reserved successfully." });
        }
      );
    }
  );
});


// Search Available Cars Endpoint
app.post("/search-cars", (req, res) => {
  const { type, brand, capacity, year, color } = req.body; // Get form data from the request body

  // Build the query dynamically based on provided filters
  let query = "SELECT * FROM Car WHERE status = 'Available'";
  const params = [];

  if (type) {
    query += " AND type = ?";
    params.push(type);
  }
  if (brand) {
    query += " AND brand = ?";
    params.push(brand);
  }
  if (capacity) {
    query += " AND capacity = ?";
    params.push(capacity);
  }
  if (year) {
    query += " AND year = ?";
    params.push(year);
  }
  if (color) {
    query += " AND color = ?";
    params.push(color);
  }

  // Execute the query
  db.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error searching for cars." });
    }
    res.json({ success: true, cars: results });
  });
});

// Advanced Search Endpoint
app.get("/advanced-search", (req, res) => {
  const { carInfo, customerInfo, reservationDay } = req.query;

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
    WHERE 1 = 1`; // Placeholder to append conditions dynamically
  
  const params = [];

  // Conditions for carInfo (Car table)
  if (carInfo) {
    query += `
      AND (
        Car.vid LIKE ?
        OR Car.type LIKE ? 
        OR Car.brand LIKE ? 
        OR Car.color LIKE ? 
        OR Car.capacity LIKE ? 
        OR Car.status LIKE ? 
        OR Car.rental_rate LIKE ? 
        OR Car.insurance LIKE ? 
        OR Car.store_id LIKE ? 
        OR Car.year LIKE ?
      )`;
    params.push(`%${carInfo}%`, `%${carInfo}%`, `%${carInfo}%`, `%${carInfo}%`, `%${carInfo}%`, `%${carInfo}%`, `%${carInfo}%`, `%${carInfo}%`, `%${carInfo}%`, `%${carInfo}%`);
  }

  // Conditions for customerInfo (Customer table)
  if (customerInfo) {
    query += `
      AND (
        Customer.fname LIKE ? 
        OR Customer.lname LIKE ? 
        OR Customer.customer_phone LIKE ? 
        OR Customer.email LIKE ? 
        OR Customer.ssn LIKE ? 
        OR Customer.nationality LIKE ?
      )`;
    params.push(`%${customerInfo}%`, `%${customerInfo}%`, `%${customerInfo}%`, `%${customerInfo}%`, `%${customerInfo}%`, `%${customerInfo}%`);
  }

  // Condition for reservationDay (Order_place table)
  if (reservationDay) {
    query += ` AND DATE(Order_place.start_day) = ?`;
    params.push(reservationDay);
  }

  // Execute the query
  db.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, error: "Error performing advanced search." });
    }

    res.json({ success: true, data: results });
  });
});


                                              //ADD EMPLOYEE LOGIN//


// Reservations within a specific period
app.get("/reports/reservations-period", (req, res) => {
  const { start_date, end_date } = req.query;

  // Check if start date and end date are provided
  if (!start_date || !end_date) {
    return res.status(400).json({ success: false, message: "Start date and end date are required." });
  }

  const query = `
    SELECT Order_place.*, Customer.*, Car.*
    FROM Order_place
    JOIN Customer ON Order_place.ssn = Customer.ssn AND Order_place.nationality = Customer.nationality
    JOIN Car ON Order_place.vid = Car.vid
    WHERE Order_place.start_day BETWEEN ? AND ? AND Order_place.end_day BETWEEN ? AND ?`;

  db.query(query, [start_date, end_date, start_date, end_date], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Error fetching reservations.", error: err });
    }
    // Return the results as a JSON object
    res.json({ success: true, data: results });
  });
});



// Reservations of a specific car within a period
app.get("/reports/car-reservations", (req, res) => {
  const { vid, start_date, end_date } = req.query;

  // Check if vehicle ID, start date, and end date are provided
  if (!vid || !start_date || !end_date) {
    return res.status(400).json({ success: false, message: "Vehicle ID, start date, and end date are required." });
  }

  const query = `
    SELECT Order_place.*, Car.*
    FROM Order_place
    JOIN Car ON Order_place.vid = Car.vid
    WHERE Order_place.vid = ? AND (Order_place.start_day BETWEEN ? AND ? AND Order_place.end_day BETWEEN ? AND ?)`;

  db.query(query, [vid, start_date, end_date, start_date, end_date], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Error fetching car reservations.", error: err });
    }
    // Return the results as a JSON object
    res.json({ success: true, data: results });
  });
});

//status of all cars on a specific day                 //TO BE REVISED//
app.get("/reports/cars-status", (req, res) => {
  const { specific_date } = req.query;

  if (!specific_date) {
    return res.status(400).send("A specific date is required.");
  }

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
    return res.status(400).json({ success: false, message: "SSN and nationality are required." });
  }

  const query = `
    SELECT Order_place.*, Customer.*, Car.brand, Car.vid, Car.year, Car.type
    FROM Order_place
    JOIN Customer ON Order_place.ssn = Customer.ssn AND Order_place.nationality = Customer.nationality
    JOIN Car ON Order_place.vid = Car.vid
    WHERE Customer.ssn = ? AND Customer.nationality = ?`;

  db.query(query, [ssn, nationality], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Error fetching customer reservations.", error: err });
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
    return res.status(400).json({ success: false, message: "Start date and end date are required." });
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
      return res.status(500).json({ success: false, message: "Error fetching daily payments.", error: err });
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