require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const cors = require("cors") 

// allow credentials + specify origin
const allowedOrigins = [
  "http://localhost:5173",
  "https://final-year-project-red-iota.vercel.app",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // 🔹 must allow credentials
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// db connection file
const dbConnection = require("./config/config");
dbConnection();

// all routes
const routes = require("./routes/index.js");
app.use("/api/v1",routes);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is running ",
  });
});

app.listen(5000, (err) => {
  if (err) console.log(err);
  else console.log("its listening PORT http://localhost:5000");
});
