const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', (req, res, next) => {
  if (!req.isAuthenticated()) {
    passport.authenticate('google', { scope: ['email', 'profile'] })(req, res, next);
  } else {
    // If the user is already authenticated, redirect them to '/user/logged'.
    res.redirect('/user/logged');
  }
});

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/user/no-permission' }), (req, res) => {
    // After successful authentication, redirect the user to '/user/logged'.
    res.redirect('/user/logged');
});

module.exports = router;