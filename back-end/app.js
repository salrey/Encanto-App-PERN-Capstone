// DEPENDENCIES
const cors = require("cors");
const express = require("express");
// const passport = require("passport");

const userController = require("./controllers/userController");
const logInController = require("./controllers/logInController");
const matchController = require("./controllers/matchController");
// const { initialize } = require("passport");

// match-requests

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(passport.initialize());
// const initializePassport = require('./passport-config');



// ROUTES
app.use("/users", userController);
app.use("/login", logInController);
app.use("/match-requests", matchController);

app.get("/", (_, res) => {
  res.status(200).send("Welcome to EnCanto!");
});

app.get("*", (_, res) => {
  res.status(404).send("This page has not been found");
});


// EXPORT
module.exports = app;