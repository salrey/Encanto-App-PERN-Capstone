// DEPENDENCIES
const cors = require("cors");
const express = require("express");

const userController = require("./controllers/userController")
const logInContoller = require("./controllers/logInController")

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/users", userController);
app.use("/login", logInController);

app.get("/", (_, res) => {
  res.status(200).send("Welcome to EnCanto!");
});

app.get("*", (_, res) => {
  res.status(404).send("This page has not been found");
});


// EXPORT
module.exports = app;