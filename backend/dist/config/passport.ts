// load all the things we need
import * as bcrypt from "bcrypt"
import { UserAuth, User, CustomError } from '../models/models'
import { AccountManager } from '../managers/managers'
var LocalStrategy = require('passport-local').Strategy

module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session at login
    passport.serializeUser(function (user, done) {
        // remove hashed password from user's session information
        let serializedUser = new User(
            user.username,
            user.email,
            user.fName,
            user.lName,
            user.role
        )
        done(null, serializedUser)
    })

    // used to deserialize the user at logout
    passport.deserializeUser(function (user, done) {
        done(null, user)
    })

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
        async function (req, username, password, done) {
            var userAuth: any
            var accountManager = new AccountManager()
            try {
                // find user in the database by username field
                userAuth = await accountManager.getUserAuth(req)
            } catch (err) {
                return done(err, false)
            }
            // check result has been correctly retrieved and elaborated from database
            if (!userAuth || !(userAuth instanceof UserAuth)) {
                var error = new CustomError("LOGIN ERROR",'user not found')
                return done(error, false)
            }
            // match input and user passwords
            // if they don't match, return error
            if (!(bcrypt.compareSync(req.body.password, userAuth.password))) {
                var error = new CustomError("LOGIN ERROR","password not matching")
                return done(error, false)
            }
            // return user correctly logged in
            let user = new User(
                userAuth.username,
                userAuth.email,
                userAuth.firstName,
                userAuth.lastName,
                userAuth.role
            )
            return done(null, user)
        }
    ))

}