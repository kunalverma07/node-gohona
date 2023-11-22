require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

const errorMiddleware = require("./middleware/error");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught Exception`);
  process.exit(1);
});

// Middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // to allow all client we use *
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,POST,PUT,PATCH,DELETE"
  ); //these are the allowed methods
  res.setHeader("Access-Control-Allow-Headers", "*"); // allowed headers (Auth for extra data related to authoriaztion)
  next();
});

app.use(express.urlencoded({ extended: false }));

const connectDB = require("./db");

connectDB();

app.get("/", (req, res) => {
  res.send("Backend of Eccomerce GOHONA is Working Fine.");
});

const index = require("./routes/index");

app.use("/api/v1/", index);

// middleware for error
app.use(errorMiddleware);

const PORT = process.env.PORT || 6000;

const server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);

// unhandled Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
