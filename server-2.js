import express from "express"; // creates server and handles HTTP requests
import bcrypt from "bcrypt"; // hashes password
import mysql from "mysql2"; // connects to MYSQL db
import cors from "cors"; // allows frontend to interact with this API
const app = express();

// middleware to parse JSON data and convert them to javascript object
// with this we can easily access the data sent in the request within req.body
app.use(express.json());

// middleware to ensure the API can be accessed from different origins
// without it, browser will block any API requests from frontend
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
  const { ssn , nationality , fname , minit ,lname , customer_phone , email , password } = req.body;

  // validates the presence of required fields
  if (!ssn || !nationality || !fname || !minit || !lname || !customer_phone || !email || !password) {
    return res.status(400).send("All fields are required.");
  }


  // hashes password
  const hashedPassword = await bcrypt.hash(password, 10);

  // inserts user data into the DB
  db.query(
    "INSERT INTO Customer (ssn , nationality , fname , minit ,lname , customer_phone , email) VALUES (?, ?, ?, ?, ?)",
    [ssn , nationality , fname , minit ,lname , customer_phone , email ],
    (err) => {
      if (err) {
        // handles errors and sends appropriate responses to the client (frontend)
        if (err.code === "ER_DUP_ENTRY") {
          // duplicate entry
          return res.status(400).send("Email already exists.");
        }
        return res.status(500).send("Server error."); // db error
      }
      res.send("Registration successful!");
    }
  );
});

// Login Endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required.");
  }

  db.query(
    "SELECT * FROM Account WHERE email = ?",
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
      res.send("Car registered successfully.");
    }
  );
});

// Update Car Status Endpoint
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
      res.send("Car status updated successfully.");
    }
  );
});

// Reserve a Car Endpoint
// app.post("/reserve-car", (req, res) => {
//   const { start_day, end_day, payment_type, ssn, nationality, vid } = req.body;

//   // Validate inputs
//   if (!start_day || !end_day || !payment_type || !ssn || !nationality || !vid) {
//     return res.status(400).send("All fields are required to reserve a car.");
//   }

//   // Insert reservation into the Order_place table
//   db.query(
//     "INSERT INTO Order_place (start_day, end_day, payment_type, ssn, nationality, vid) VALUES (?, ?, ?, ?, ?, ?)",
//     [start_day, end_day, payment_type, ssn, nationality, vid],
//     (err) => {
//       if (err) {
//         return res.status(500).send("Error reserving car.");
//       }
//       res.send("Car reserved successfully.");
//     }
//   );
// });

app.post("/reserve-car", (req, res) => {
  const { start_day, end_day, payment_type, ssn, nationality, vid } = req.body;

  // Validate inputs
  if (!start_day || !end_day || !payment_type || !ssn || !nationality || !vid) {
    return res.status(400).send("All fields are required to reserve a car.");
  }

  // Insert reservation into the Order_place table
  db.query(
    "INSERT INTO Order_place (start_day, end_day, payment_type, ssn, nationality, vid) VALUES (?, ?, ?, ?, ?, ?)",
    [start_day, end_day, payment_type, ssn, nationality, vid],
    (err) => {
      if (err) {
        return res.status(500).send("Error reserving car.");
      }

      // Update the car's status to 'Reserved'
      db.query(
        "UPDATE Car SET status = 'Reserved' WHERE vid = ?",
        [vid],
        (updateErr) => {
          if (updateErr) {
            return res.status(500).send("Error updating car status.");
          }
          res.send("Car reserved successfully.");
        }
      );
    }
  );
});


// Search Available Cars Endpoint
app.get("/search-cars", (req, res) => {
  const { type, brand, capacity, year, color } = req.query;

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

  db.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).send("Error searching for cars.");
    }
    res.send(results);
  });
});

// Advanced Search Endpoint
app.get("/advanced-search", (req, res) => {
  const { carInfo, customerInfo, reservationDay } = req.query;

  let query = `
    SELECT Order_place.*, Customer.*, Car.*
    FROM Order_place
    JOIN Customer ON Order_place.ssn = Customer.ssn AND Order_place.nationality = Customer.nationality
    JOIN Car ON Order_place.vid = Car.vid
    WHERE 1 = 1`; //placeholder to dynamically append conditions without breaking the query
  const params = [];

  if (carInfo) {
    query += " AND (Car.type LIKE ? OR Car.brand LIKE ? OR Car.color LIKE ?)";
    params.push(`%${carInfo}%`, `%${carInfo}%`, `%${carInfo}%`);
  }
  if (customerInfo) {
    query += " AND (Customer.fname LIKE ? OR Customer.lname LIKE ?)";
    params.push(`%${customerInfo}%`, `%${customerInfo}%`);
  }
  if (reservationDay) {
    query += " AND DATE(Order_place.start_day) = ?";
    params.push(reservationDay);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).send("Error performing advanced search.");
    }
    res.send(results);
  });
});

//ADD REPORT PART AND EMPLOYEE LOGIN
//reservations within a specified period
app.get("/reports/reservations-period", (req, res) => {
  const { start_date, end_date } = req.query;

  if (!start_date || !end_date) {
    return res.status(400).send("Start date and end date are required.");
  }

  const query = `
    SELECT Order_place.*, Customer.*, Car.*
    FROM Order_place
    JOIN Customer ON Order_place.ssn = Customer.ssn AND Order_place.nationality = Customer.nationality
    JOIN Car ON Order_place.vid = Car.vid
    WHERE Order_place.start_day BETWEEN ? AND ? OR Order_place.end_day BETWEEN ? AND ?`;

  db.query(query, [start_date, end_date, start_date, end_date], (err, results) => {
    if (err) {
      return res.status(500).send("Error fetching reservations.");
    }
    res.send(results);
  });
});

//reservations of a specific car within a period
app.get("/reports/car-reservations", (req, res) => {
  const { vid, start_date, end_date } = req.query;

  if (!vid || !start_date || !end_date) {
    return res.status(400).send("Vehicle ID, start date, and end date are required.");
  }

  const query = `
    SELECT Order_place.*, Car.*
    FROM Order_place
    JOIN Car ON Order_place.vid = Car.vid
    WHERE Order_place.vid = ? AND (Order_place.start_day BETWEEN ? AND ? OR Order_place.end_day BETWEEN ? AND ?)`;

  db.query(query, [vid, start_date, end_date, start_date, end_date], (err, results) => {
    if (err) {
      return res.status(500).send("Error fetching car reservations.");
    }
    res.send(results);
  });
});

//status of all cars on a specific day
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

//reservations of a specific customer
app.get("/reports/customer-reservations", (req, res) => {
  const { ssn, nationality } = req.query;

  if (!ssn || !nationality) {
    return res.status(400).send("SSN and nationality are required.");
  }

  const query = `
    SELECT Order_place.*, Customer.*, Car.*
    FROM Order_place
    JOIN Customer ON Order_place.ssn = Customer.ssn AND Order_place.nationality = Customer.nationality
    JOIN Car ON Order_place.vid = Car.vid
    WHERE Customer.ssn = ? AND Customer.nationality = ?`;

  db.query(query, [ssn, nationality], (err, results) => {
    if (err) {
      return res.status(500).send("Error fetching customer reservations.");
    }
    res.send(results);
  });
});

//daily payments within a specific period
app.get("/reports/daily-payments", (req, res) => {
  const { start_date, end_date } = req.query;

  if (!start_date || !end_date) {
    return res.status(400).send("Start date and end date are required.");
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
      return res.status(500).send("Error fetching daily payments.");
    }
    res.send(results);
  });
});






// Starting server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
