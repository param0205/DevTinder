const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(err.statusCode).json({
      field: err.field,
      message: err.message,
    });
  }

  // fallback
  res.status(500).json({
    message: "Internal Server Error",
  });
};

module.exports = errorHandler
