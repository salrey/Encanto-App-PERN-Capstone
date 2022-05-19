// DEPENDENCIES
const cors = require("cors");
const express = require("express");
// const passport = require("passport")
// const flash = require("express-flash")
// const session = require("express-session")

// const initializePassport = require('./passport-config');
// initializePassport(passport)

const userController = require("./controllers/userController")
const logInController = require("./controllers/logInController")

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))
// app.use(flash())
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false
// }))
// app.use(passport.initialize())
// app.use(passport.session())

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