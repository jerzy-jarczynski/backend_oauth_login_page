const express = require('express');
const router = express.Router();

const ensureAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/user/no-permission');
  }
}

router.get('/logged', ensureAuthenticated, (req, res) => {
  res.render('logged', { user: req.user });
});

router.get('/no-permission', (req, res) => {
  res.render('noPermission');
});

router.get('/profile', ensureAuthenticated, (req, res) => {
  res.render('profile');
});

router.get('/settings', ensureAuthenticated, (req, res) => {
  res.render('settings');
});

module.exports = router;