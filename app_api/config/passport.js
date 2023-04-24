const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const users = mongoose.model('users');

passport.use(new LocalStrategy(
    // Define email user property as username
    { usernameField: 'email' },

    async (username, password, done) => {
        try {
            const user = await users.findOne({ email: username });
            
            // Return error message if no matching username is found
            if (!user) {
                return done(null, false, { message: 'Unrecognized username' });
            }
            
            // If matching username is foudn, check if the entered password matches the saved password
            if (!user.validatePassword(password)) {
                return done(null, false, { message: 'Incorrect password' });
            }

            // Username and password match, log in
            return done(null, user);
        }
        catch (e) {
            return done(e);
        }
    }
));