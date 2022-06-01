// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const flash = require("express-flash");
const session = require('express-session');
const passport = require("passport");
const initializePassport = require('./passport-config');

const userController = require("./controllers/userController");
const matchController = require("./controllers/matchController");
const { getOneUserByEmail, getOneUser } = require('./queries/users')


// CONFIGURATION
const app = express();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
initializePassport(passport, getOneUserByEmail, getOneUser);


// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());


// ROUTES
app.use("/users", userController);
app.use("/match-requests", matchController);

app.get("/", (_, res) => {
  res.status(200).send("Welcome to EnCanto!");
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, currentUser, info) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong authenticating user' });
      return next(err);
    }
    if (!currentUser) {
      return res.status(401).json(info);
    }
    console.log("failure details from line 76: ", info)
    // save user in session
    req.logIn(currentUser, () => {
      console.log("err from loginController: ", err)
      if (err) {
        res.status(500).json({ message: 'Session save went bad.' });
        return next(err);
      } 
      console.log('---If !err, this should be printed---', req.user);
      res.status(200).json({errors: false, user: currentUser}); 
    });
  })(req, res, next)
})

app.get("*", (_, res) => {
  res.status(404).send("This page has not been found");
});

// EXPORT
module.exports = app;