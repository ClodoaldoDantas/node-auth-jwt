// dotenv
require("dotenv").config();

// variables
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
const db = require("./database/connection");
const routes = require("./routes");

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// database connection
db.on("error", (err) => console.log(err));

// routes
routes(app);

// init application
app.listen(3333, () => console.log("Server started"));
