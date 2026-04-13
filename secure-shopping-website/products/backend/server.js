const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const cookieParser = require("cookie-parser");
const axios = require("axios");

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
app.use(
  "/images",
  express.static(path.join(__dirname, "../../common/public/images"))
);

const dbPath = path.resolve(__dirname, "../../common/database/database.db");
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
