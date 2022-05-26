// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const flash = require("express-flash");
const session = require('express-session');
const passport = require("passport");
const methodOverride = require("method-override")
const userController = require("./controllers/userController");
// const logInController = require("./controllers/logInController");
const matchController = require("./controllers/matchController");
// const { initialize } = require("passport");
const { getOneUserByEmail, getOneUser } = require('./queries/users')

// match-requests

// CONFIGURATION
const app = express();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const initializePassport = require('./passport-config');
initializePassport(passport, getOneUserByEmail, getOneUser);

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());
// app.use(methodOverride('_method'))

// ROUTES
app.use("/users", userController);
// app.use("/login", logInController);
app.use("/match-requests", matchController);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//       res.status(err.status || 500);
//       res.render('error', {
//           message: err.message,
//           error: err
//       });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//       message: err.message,
//       error: {}
//   });
// });


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
      // return;
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

app.delete("/logout", (req, res) => {
  console.log("/logout req", req )
  console.log("/logout res", res)
  req.logOut();
  res.redirect('/login')
})

    // (req, res, next);
// });
// app.post('/login', (req, res, next) => {
//     passport.authenticate('local', (err, currentUser, info) => {
        
//         if (err) {
//             res.status(500).json({ message: 'Something went wrong authenticating user' });
//             return;
//         }
//         if (!currentUser) {
//             res.status(401).json(info);
//             return;
//         }
//         console.log("failure details from line 76: ", info)
//         // save user in session
//         req.login(currentUser, () => {
//             console.log("err from loginController: ", err)
//             if (err) {
//                 res.status(500).json({ message: 'Session save went bad.' });
//                 return;
//             } 
//             console.log('---If !err, this should be printed---', req.user);
//             res.status(200).json({errors: false, user: currentUser}); 
//         });
//     })(req, res, next);
// });


app.get("*", (_, res) => {
  res.status(404).send("This page has not been found");
});


// EXPORT
module.exports = app;