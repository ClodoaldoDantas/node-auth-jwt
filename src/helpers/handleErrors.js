const handleErrors = (err) => {
  let errors = [];
  let status = 400;

  if (err.errors) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors.push({ code: properties.path, detail: properties.message });
    });
  } else if (err.code === 11000) {
    errors.push({ code: "email", detail: "that email is already registered" });
  } else {
    errors.push({ code: "internal error", detail: "server error" });
    status = 500;
  }

  return [status, errors];
};

module.exports = handleErrors;
