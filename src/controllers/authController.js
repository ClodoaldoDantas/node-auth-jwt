const User = require("../models/User");
const handleErrors = require("../helpers/handleErrors");
const jwt = require("jsonwebtoken");

// (number of days * 24 hours * 60 minutes * 60 seconds)
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: maxAge });
};

module.exports = {
  signupGet(req, res) {
    return res.render("signup");
  },
  async signupPost(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.create({ email, password });
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      return res.status(201).json({ user: user._id });
    } catch (err) {
      const [status, errors] = handleErrors(err);
      return res.status(status).json({ status, errors });
    }
  },
  loginGet(req, res) {
    return res.render("login");
  },
  async loginPost(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      return res.status(200).json({ user: user._id });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },
  logout(req, res) {
    res.cookie("jwt", "", { maxAge: 1 });
    return res.redirect("/");
  },
};
