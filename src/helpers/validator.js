exports.isEmail = (email) => {
  const expression = /\S+@\S+/;
  return expression.test(String(email).toLowerCase());
};
