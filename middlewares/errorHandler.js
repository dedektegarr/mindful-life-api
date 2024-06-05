const errorHandler = (error, req, res, next) => {
  res.status(error.code || 500).json({
    status: "error",
    code: error.code || 500,
    message: error.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
