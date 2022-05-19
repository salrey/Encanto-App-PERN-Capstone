// DEPENDENCIES
const express = require("express");
const passport = require("passport")
const flash = require("express-flash")
const session = require("express-session")
const {getOneUserByEmail, getEveryUser, getOneUser} = require("../queries/users");

const login = express.Router();
const initializePassport = require('../passport-config');
initializePassport(
    passport,
    getOneUserByEmail,
    getOneUser,
    
)

// MIDDLEWARE
login.use(flash())
login.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
login.use(passport.initialize())
login.use(passport.session())

login.get('/test', async (req, res) => {
    try {
        const allUsers = await getEveryUser();

        res.json({
            success: true,
            payload: allUsers
        }) 
    }catch (err){
        throw err
    }
});

// Get a user for login by email
login.get('/:email', async (req, res) => {
    const { email } = req.params;
    console.log("GET /:email from users");
    try{
        const oneUser = await getOneUserByEmail(email);
        oneUser.result ? 
        res.status(404).send({
            success: false,
            payload: `/User ${email} not found`
        }) : res.json({
            success: true,
            payload: oneUser
        })
    } catch (err) {
        throw err
    }
});

login.post('/', passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/login',
    failureFlash: true
}))

// users.post('/register', async (req, res) => {
//     const { body } = req;
//     console.log("Create new user");
//     try {
//         const hashedPassword = await bcrypt.hash(body.password, 10)
//         const user = await createUser(body, hashedPassword)
//         console.log("hashedPW: ", hashedPassword)
//         console.log("user: ", user)
//         user ? res.json({ 
//             success: true, 
//             payload: user 
//         }) : res.status(404).send({
//             success: false,
//             payload: "/user not found" });
//     } catch(err) {
//         throw err
//     }
// });


module.exports = login