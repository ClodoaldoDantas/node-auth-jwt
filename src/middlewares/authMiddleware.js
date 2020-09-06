const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists and is verified
  if (!token) return res.redirect("/login");

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.log(err.message);
      return res.redirect("/login");
    }

    console.log(decoded);
    next();
  });
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        const user = await User.findById(decoded.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
