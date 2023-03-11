require("dotenv").config();
const express = require("express");
const colors = require("colors");
const applyMiddlewares = require("./middlewares/appMiddleware");
const errorHandler = require("./middlewares/errorMiddleware");
const connectToDatabase = require("./config/database");

const app = express();

//Middleware
applyMiddlewares(app);

// Database connection
connectToDatabase();

// Routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Error handling
errorHandler(app);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(colors.magenta.bold.underline(`Server started on port ${port}`))
);
