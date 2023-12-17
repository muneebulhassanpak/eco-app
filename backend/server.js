require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const connectWithDatabase = require("./utils/database-connection");
//Route imports
const authRoutes = require("./routes/auth-route");
const forumRoutes = require("./routes/forum-route");
const userRoutes = require("./routes/user-route");
const adminRoutes = require("./routes/admin-route");

//Connecting with database
connectWithDatabase();

//Making request useable
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/uploads")));
//cors
app.use(
  cors({
    origin: ["http://localhost:5173", "https://web.postman.co"],
    methods: "GET, POST, PUT, DELETE,PATCH",
    credentials: true,
  })
);

// Authentication Routes (Signup, Login )
app.use("/api", authRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/forum", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api/test", (req, res, next) => {
  return res.json({
    message: "Success",
  });
});

//Error Sending back to client side
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
  });
});

//Creating server
const SERVERPORT = process.env.SERVERPORT;

mongoose.connection.once("open", () => {
  app.listen(SERVERPORT, () => {
    console.log(`Server running on ${SERVERPORT}`);
  });
});

mongoose.connection.on("error", () => {
  console.log(
    "Probably due to connection with the database server, Server closed"
  );
  process.exit(1);
});
