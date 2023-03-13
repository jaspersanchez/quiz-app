require('dotenv').config();
const express = require('express');
const colors = require('colors');
const applyMiddlewares = require('./middlewares/appMiddlewares');
const errorHandler = require('./middlewares/errorHandler');
const connectToDatabase = require('./config/database');

const app = express();
const userRoutes = require('./routes/user');

//Middleware
applyMiddlewares(app);

// Database connection
connectToDatabase();

// Routes
// Mount the user routes
app.use('/api/users', userRoutes);

// Error handling
errorHandler(app);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(colors.magenta.bold.underline(`Server started on port ${port}`))
);
