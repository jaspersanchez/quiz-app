const createError = require('http-errors');

const errorHandler = (app) => {
  // 404 Error handling
  app.use((_req, _res, next) => {
    next(createError(404, '404 Not found'));
  });

  // General error handling
  app.use((error, _req, res, _next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? null : error.stack,
      },
    });
  });
};

module.exports = errorHandler;
