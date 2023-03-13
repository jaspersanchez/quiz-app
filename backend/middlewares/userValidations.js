const { body } = require('express-validator');
const zxcvbn = require('zxcvbn');
const User = require('../models/User');

exports.validateEmail = () => {
  return body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email address')
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error('Email address is already in use');
      }
      return true;
    });
};

exports.validateUsername = () => {
  return body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters')
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage(
      'Username may only contain letters, numbers, underscores, and dashes'
    );
};

exports.validatePassword = () => {
  return body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .custom((value) => {
      const score = zxcvbn(value).score;
      if (score < 3) {
        throw new Error('Password is too weak');
      }
      return true;
    })
    .withMessage(
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    );
};

exports.validateConfirmPassword = () => {
  return body('confirmPassword')
    .notEmpty()
    .withMessage('Confirm password is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    })
    .withMessage('Passwords do not match');
};
