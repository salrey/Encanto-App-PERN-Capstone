const bcrypt = require("bcrypt");
const LocalStrategy = require('passport-local').Strategy;


function initialize (passport, getOneUserByEmail, getOneUser) {

    const authenticateUser = async (email, password, done) => {
        const user = await getOneUserByEmail(email)
        console.log("What email?: ", email)
        console.log("What is pw ", password)
        console.log("user from passport: ", user)

        if (!user) {
            return done(null, false, {message: "No user with that email"})
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                console.log("hitting bcrypt?: ", user)
                return done(null, user)
            } else {
                return done(null, false, {message: "Incorrect Password"})
            }
        }catch (error) {
            return done (error)
        }
    }
    
    passport.use(new LocalStrategy({usernameField: 'email', session: true}, authenticateUser))
    passport.serializeUser((user, done) => {
        console.log("hitting serializer: ", user)
        return done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        console.log("hitting deserializer: ", id)
        return done(null, getOneUser(id))
    })
}

module.exports = initialize