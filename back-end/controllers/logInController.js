// DEPENDENCIES
const express = require("express");
// const flash = require("express-flash");
// const session = require('express-session');
// const passport = require("passport");
const {getOneUserByEmail} = require("../queries/users");
const login = express.Router();
// const initializePassport = require('../passport-config');
// initializePassport(passport)

// MIDDLEWARE

// login.use(flash())
// login.use(
//   session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: true, maxAge: (4 * 60 * 60 * 1000)}
// }))
// login.use(passport.initialize());
// login.use(passport.session());

// Get a user for login by email
// login.get('/:email', async (req, res) => {
//     const { email } = req.params;
//     console.log("GET /:email from users");
//     try{
//         const oneUser = await getOneUserByEmail(email);
//         oneUser.result ? 
//         res.status(404).send({
//             success: false,
//             payload: `/User ${email} not found`
//         }) : res.json({
//             success: true,
//             payload: oneUser
//         })
//     } catch (err) {
//         throw err
//     }
// });

// login.post('/', passport.authenticate('local', {
//     // successRedirect: '/users',
//     // failureRedirect: '/login',
//     failureFlash: true
// }), function(req, res) {
//     res.json(req.user);
//  }
// )

// login.post('/', (req, res, next) => {
//     passport.authenticate('local', (err, theUser, failureDetails) => {
        
//         if (err) {
//             res.status(500).json({ message: 'Something went wrong authenticating user' });
//             return;
//         }
//         if (!theUser) {
//             res.status(401).json(failureDetails);
//             return;
//         }
//         console.log("failure details from line 76: ", failureDetails)
//         // save user in session
//         req.login(theUser, () => {
//             console.log("err from loginController: ", err)
//             if (err) {
//                 res.status(500).json({ message: 'Session save went bad.' });
//                 return;
//             } 
//             console.log('---If !err, this should be printed---', req.user);
//             res.status(200).json({errors: false, user: theUser}); 
//         });
//     })(req, res, next);
// });


// function checkAuthenticated (req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/login')
// }

// function checkNotAuthenticated (req, res, next) {
//     if (req.isAuthenticated()) {
//       return  res.redirect('/users')
//     }
//     next()
// }

// function isLoggedIn(request, response, done) {
//     if (request.user) {
//        return done();
//     }
    
//     return res.redirect("/login");
//  };

module.exports = login