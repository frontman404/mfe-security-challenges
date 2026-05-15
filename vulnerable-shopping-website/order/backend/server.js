const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const axios = require("axios");

const app = express();

app.use(cors());

app.use(express.json());

const dbPath = path.resolve(
  __dirname,
  "../../common/database/vulnerableDatabase.db"
);
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

async function getUserFromAuth(token) {
  try {
    const response = await axios.get("http://localhost:5001/api/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    return null;
  }
}

const authenticateToken = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ error: "No token provided" });
  }
  const user = await getUserFromAuth(token);
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
