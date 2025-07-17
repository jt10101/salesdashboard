// Package dependencies
// Express
const express = require("express");
const app = express();
const port = 3000;
// Morgan, Cors, Dotenv
const cors = require("cors");
const logger = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
// Mongoose
const mongoose = require("mongoose");

// Import Routers
const publicRouter = require("./routes/publicRoutes");
const hierarchyRouter = require("./routes/hierarchyRoutes");
const transactionRouter = require("./routes/transactionRoutes");
const targetRouter = require("./routes/targetRoutes");

const authenticator = require("./middleware/authenticator");

// Connection to MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.set("debug", true);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Routes
app.use("/api/public", publicRouter);
app.use(authenticator);
app.use("/api/hierarchy", hierarchyRouter);
app.use("/api/transaction/", transactionRouter);
app.use("/api/target", targetRouter);

// Listener
app.listen(3000, () => {
  console.log(`The express app is ready on port ${port}!`);
});
