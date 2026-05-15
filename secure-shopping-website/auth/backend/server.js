const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
const cookieParser = require("cookie-parser");
const SECRET_KEY = "lazy_key";

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

const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "strict",
  maxAge: 24 * 60 * 60 * 1000, // 1 day
  path: "/",
};

const dbPath = path.resolve(__dirname, "../../common/database/database.db");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT, 
      email TEXT UNIQUE, 
      password TEXT
    )`
  );
});

app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  db.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword],
    function (err) {
      if (err) {
        return res.status(400).send({ error: "Email already exists" });
      }
      res.status(201).send({ auth: true });
    }
  );
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err || !user) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 86400 });
    res.cookie("token", token, cookieOptions);
    res.send({
      auth: true,
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("token", { path: "/" });
  res.send({ success: true });
});

app.get("/api/user", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send({ error: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: "Failed to authenticate token" });
    }

    db.get("SELECT * FROM users WHERE id = ?", [decoded.id], (err, user) => {
      if (err || !user) {
        return res.status(404).send({ error: "User not found" });
      }

      res.send({ id: user.id, name: user.name, email: user.email });
    });
  });
});

app.listen(5001, () => {
  console.log(`Auth service listening on port 5001`);
});
