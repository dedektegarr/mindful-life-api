const express = require("express");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use("/api/v1", router);

// error handlers
app.use(errorHandler);

module.exports = app;
