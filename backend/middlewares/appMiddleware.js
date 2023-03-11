const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

const applyMiddlewares = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan("dev"));
};

module.exports = applyMiddlewares;
