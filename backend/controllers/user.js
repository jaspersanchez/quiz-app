const { validationResult } = require('express-validator');
const createError = require('http-errors');
const asyncHandler = require('express-async-handler');
const {
  validateEmail,
  validateUsername,
  validatePassword,
  validateConfirmPassword,
} = require('../middlewares/userValidations');
const User = require('../models/User');

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  // Validate user input
  await Promise.all(
    [
      validateEmail(),
      validateUsername(),
      validatePassword(),
      validateConfirmPassword(),
    ].map((validationFn) => validationFn(req))
  );

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw createError(422, { errors: errors.array() });
  }

  const { email, username, password } = req.body;

  // Create new user instance
  const user = new User({ email, username, password });

  // Save user to database
  await user.save();

  // Return created user object
  return res.status(201).json({ user });
});

// Authenticate a user
const loginUser = asyncHandler(async (req, res) => {
  res.send('Login User');
});

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  res.send('Login User');
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
