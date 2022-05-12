// DEPENDENCIES
const cors = require("cors");
const express = require("express");

const userController = require("./controllers/userController")

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());


// ROUTES
app.use("/users", userController);


app.get("/", (_, res) => {
  res.status(200).send("Welcome to EnCanto!");
});

app.get("*", (_, res) => {
  res.status(404).send("This page has not been found");
});

// EXPORT
module.exports = app;