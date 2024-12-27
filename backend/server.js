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
  const { name, email, password, phone, address } = req.body;

  console.log(req.body);

  // validates the presence of required fields
  if (!name || !email || !password) {
    return res.status(400).send("All fields are required.");
  }

  // hashes password
  const hashedPassword = await bcrypt.hash(password, 10);

  // inserts user data into the DB
  db.query(
    "INSERT INTO customers (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)",
    [name, email, hashedPassword, phone, address],
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
    "SELECT * FROM customers WHERE email = ?",
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

// Starting server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
