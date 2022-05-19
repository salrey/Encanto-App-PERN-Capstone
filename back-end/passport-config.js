const { getOneUserByEmail, getOneUser } = require('./queries/users')
const bcrypt = require("bcrypt")

const LocalStrategy = require('passport-local').Strategy



function initialize (passport) {

    const authenticateUser = async (email, password, done) => {
        const user = await getOneUserByEmail(email)
        console.log("user from passport: ", user)
        if (!user) {
            return done(null, false, {message: "No user with that email"})
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, {message: "Incorrect Password"})
            }
        }catch (error) {
            return done (error)
        }
    }

    passport.use(new LocalStrategy({usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        done(null, getOneUser(id))
    })
}

module.exports = initialize