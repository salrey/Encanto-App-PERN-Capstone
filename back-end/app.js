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
app.get("/", (_, res) => {
    res.send("Hello, world!");
});

/////////////////////////////////////
// REMOVE AFTER SUCCESSFUL DEPLOYMENT
/////////////////////////////////////
const db = require("./db/dbConfig.js");

app.get("/test", async (_, res) => {
  try {
    const allDays = await db.any("SELECT * FROM test");
    res.json(allDays);
  } catch (err) {
    res.json(err);
  }
});

/////////////////////////////////////
// REMOVE AFTER SUCCESSFUL DEPLOYMENT
/////////////////////////////////////


// ROUTES
// app.use("/apps", userController);


// app.get("/", (_, res) => {
//   res.status(200).send("Welcome to EnCanto!");
// });

// app.get("*", (_, res) => {
//   res.status(404).send("This page has not been found");
// });

// EXPORT
module.exports = app;