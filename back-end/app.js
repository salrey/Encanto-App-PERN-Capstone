// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const flash = require("express-flash");
const passport = require("passport");
const session = require('express-session');
const userController = require("./controllers/userController");
const logInController = require("./controllers/logInController");
const matchController = require("./controllers/matchController");
// const { initialize } = require("passport");

// match-requests

// CONFIGURATION
const app = express();
require("dotenv").config();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(flash())
app.use(
  session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());
const initializePassport = require('./passport-config');
initializePassport(passport)

// ROUTES
app.use("/users", userController);
// app.use("/login", logInController);
app.use("/match-requests", matchController);

app.get("/", (_, res) => {
  res.status(200).send("Welcome to EnCanto!");
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        
        if (err) {
            res.status(500).json({ message: 'Something went wrong authenticating user' });
            return;
        }
        if (!theUser) {
            res.status(401).json(failureDetails);
            return;
        }
        console.log("failure details from line 76: ", failureDetails)
        // save user in session
        req.login(theUser, () => {
            console.log("err from loginController: ", err)
            if (err) {
                res.status(500).json({ message: 'Session save went bad.' });
                return;
            } 
            console.log('---If !err, this should be printed---', req.user);
            res.status(200).json({errors: false, user: theUser}); 
        });
    })(req, res, next);
});


app.get("*", (_, res) => {
  res.status(404).send("This page has not been found");
});


// EXPORT
module.exports = app;