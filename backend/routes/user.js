const express = require('express');
const router = express.Router();

// Import user controller
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require('../controllers/user');

// User registration endpoint
router.post('/register', registerUser);

// User login endpoint
router.post('/login', loginUser);

// User get profile endpoint
router.get('/me', getUserProfile);

module.exports = router;
