const validationError = (errorArray) => {
  const errors = {};

  errorArray.forEach((err) => {
    errors[err.path] = err.msg;
  });

  return errors;
};

module.exports = { validationError };
