const errorHandler = (error, req, res, next) => {
  res.status(error.status || 500).json({
    statusText: "error",
    status: error.status || 500,
    message: error.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
