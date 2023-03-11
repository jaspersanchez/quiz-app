require("dotenv").config();
const mongoose = require("mongoose");
const colors = require("colors");
const asyncHandler = require("express-async-handler");

const connectToDatabase = asyncHandler(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(colors.cyan.bold.underline("Connected to database"));
});

module.exports = connectToDatabase;
