const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());
//app.use("/public", express.static(path.join(__dirname, "public")));
app.use(
  "/images",
  express.static(path.join(__dirname, "../../common/public/images"))
);

const dbPath = path.resolve(
  __dirname,
  "../../common/database/vulnerableDatabase.db"
);
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      description TEXT,
      category TEXT,
      image TEXT
    )`
  );
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER,
      user_id INTEGER,
      title TEXT,
      grade INTEGER,
      body TEXT,
      FOREIGN KEY(product_id) REFERENCES products(id),
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

app.get("/api/products", (req, res) => {
  db.all("SELECT * FROM products", (err, rows) => {
    if (err) {
      return res.status(500).send({ error: "Failed to fetch products" });
    }

    res.send(rows);
  });
});

app.get("/api/products/:productId/reviews", (req, res) => {
  const { productId } = req.params;
  db.all(
    "SELECT * FROM reviews WHERE product_id = ?",
    [productId],
    (err, rows) => {
      if (err) {
        return res.status(500).send({ error: "Failed to fetch reviews" });
      }
      res.send(rows);
    }
  );
});

app.post("/api/products/:productId/reviews", authenticateToken, (req, res) => {
  const { productId } = req.params;
  const { title, grade, body } = req.body;
  const user_id = req.user.id;

  db.run(
    "INSERT INTO reviews (product_id, user_id, title, grade, body) VALUES (?, ?, ?, ?, ?)",
    [productId, user_id, title, grade, body],
    function (err) {
      if (err) {
        return res.status(500).send({ error: "Failed to create review" });
      }
      res.send({ id: this.lastID });
    }
  );
});

app.listen(5002, () => {
  console.log(`Products service listening on port 5002`);
});
