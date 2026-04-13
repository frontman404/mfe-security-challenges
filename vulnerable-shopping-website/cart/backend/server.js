const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const dbPath = path.resolve(
  __dirname,
  "../../common/database/vulnerableDatabase.db"
);
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productId INTEGER,
      userId INTEGER,
      name TEXT,
      price REAL,
      quantity INTEGER,
      FOREIGN KEY(userId) REFERENCES users(id)
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

app.get("/api/cart", authenticateToken, (req, res) => {
  const userId = req.user.id;
  db.all("SELECT * FROM cart WHERE userId = ?", [userId], (err, rows) => {
    if (err) {
      return res.status(500).send({ error: "Failed to fetch cart items" });
    }
    res.send(rows);
  });
});

app.post("/api/cart/:productId", authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const { name, price } = req.body;

  db.run(
    "INSERT INTO cart (productId, userId, name, price, quantity) VALUES (?, ?, ?, ?, 1)",
    [productId, userId, name, price],
    (err) => {
      if (err) {
        return res.status(500).send({ error: "Failed to add product to cart" });
      }
      res.status(200).send({ message: "Product added to cart" });
    }
  );
});

app.put("/api/cart/:productId", authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  db.run(
    "UPDATE cart SET quantity = quantity + 1 WHERE productId = ? AND userId = ?",
    [productId, userId],
    (err) => {
      if (err) {
        return res
          .status(500)
          .send({ error: "Failed to update product quantity" });
      }
      res.status(200).send({ message: "Product quantity updated" });
    }
  );
});

app.delete("/api/cart/:productId", authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  db.run(
    "DELETE FROM cart WHERE productId = ? AND userId = ?",
    [productId, userId],
    (err) => {
      if (err) {
        return res
          .status(500)
          .send({ error: "Failed to delete product from cart" });
      }
      res.status(200).send({ message: "Product deleted from cart" });
    }
  );
});

app.delete("/api/cart", authenticateToken, (req, res) => {
  const userId = req.user.id;

  db.run("DELETE FROM cart WHERE userId = ?", [userId], (err) => {
    if (err) {
      return res.status(500).send({ error: "Failed to delete cart" });
    }
    res.status(200).send({ message: "Cart deleted" });
  });
});

app.listen(5003, () => {
  console.log(`Cart service listening on port 5003`);
});
