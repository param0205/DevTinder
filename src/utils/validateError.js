class ValidationError extends Error {
  constructor(field, message) {
    super(message);           // standard Error message
    this.name = "ValidationError";
    this.field = field;       // which field failed
    this.statusCode = 400;
  }
}

module.exports = ValidationError;