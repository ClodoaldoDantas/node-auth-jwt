const express = require("express");
const routes = express.Router();
const authController = require("../controllers/authController");

routes.get("/signup", authController.signupGet);
routes.post("/signup", authController.signupPost);
routes.get("/login", authController.loginGet);
routes.post("/login", authController.loginPost);
routes.get("/logout", authController.logout);

module.exports = routes;
