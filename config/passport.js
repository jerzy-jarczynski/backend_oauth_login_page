const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// configure passport provider options
passport.use(new GoogleStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: process.env.callbackURL,
}, (accessToken, refreshToken, profile, done) => {
done(null, profile);
}));

// serialize user when saving to session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize user when reading from session
passport.deserializeUser((id, done) => {
  done(null, {id});
});

module.exports = passport;