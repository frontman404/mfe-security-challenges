const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const axios = require("axios");
const cookieParser = require("cookie-parser");

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
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

const dbPath = path.resolve(__dirname, "../../common/database/database.db");
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
