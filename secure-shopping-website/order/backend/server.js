const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const axios = require("axios");

const app = express();
app.use(helmet());

const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:8081",
  "http://localhost:8082",
  "http://localhost:8083",
  "http://localhost:8084",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "http://localhost:8080",
        "http://localhost:8081",
        "http://localhost:8082",
        "http://localhost:8083",
        "http://localhost:8084",
      ],
      connectSrc: [
        "'self'",
        "http://localhost:5001",
        "http://localhost:5002",
        "http://localhost:5003",
        "http://localhost:5004",
      ],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

app.use(express.json());

const dbPath = path.resolve(__dirname, "../../common/database/database.db");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      name TEXT,
      address TEXT,
      town TEXT,
      email TEXT,
      items TEXT,
      totalAmount REAL,
      orderDate TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )`
  );
});

async function getUserFromAuth(cookie) {
  try {
    const response = await axios.get("http://localhost:5001/api/user", {
      headers: { Cookie: cookie },
    });
    return response.data;
  } catch (err) {
    return null;
  }
}

const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({ error: "No token provided" });
  }
  const user = await getUserFromAuth(req.headers.cookie);
  if (!user || !user.id) {
    return res.status(403).send({ error: "Failed to authenticate token" });
  }
  req.user = user;
  next();
};

app.post("/api/orders", authenticateToken, (req, res) => {
  const { name, address, town, email, items, totalAmount } = req.body;
  const orderDate = new Date().toISOString();
  const user_id = req.user ? req.user.id : null;

  db.run(
    "INSERT INTO orders (user_id, name, address, town, email, items, totalAmount, orderDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      user_id,
      name,
      address,
      town,
      email,
      JSON.stringify(items),
      totalAmount,
      orderDate,
    ],
    function (err) {
      if (err) {
        return res.status(500).send({ error: "Failed to place order" });
      }
      res.json({ message: "Order placed successfully!" });
    }
  );
});

app.get("/api/orders/user/:userId", (req, res) => {
  const { userId } = req.params;
  db.all("SELECT * FROM orders WHERE user_id = ?", [userId], (err, rows) => {
    if (err) {
      return res.status(500).send({ error: "Failed to fetch user orders" });
    }
    res.json(rows);
  });
});

app.get("/api/orders", (req, res) => {
  db.all("SELECT * FROM orders", [], (err, rows) => {
    if (err) {
      return res.status(500).send({ error: "Failed to fetch orders" });
    }
    res.json(rows);
  });
});

app.listen(5004, () => {
  console.log(`Order service listening on port 5004`);
});
