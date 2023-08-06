const express = require('express');
const cors = require('cors');
const path = require('path');
const hbs = require('express-handlebars');
const passport = require('passport');
const passportConfig = require('./config/passport');
const session = require('express-session');

const app = express();

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/user/logged', (req, res) => {
  res.render('logged');
});

app.get('/user/no-permission', (req, res) => {
  res.render('noPermission');
});

app.get('/auth/google', (req, res, next) => {
  if (!req.isAuthenticated()) {
    passport.authenticate('google', { scope: ['email', 'profile'] })(req, res, next);
  } else {
    // If the user is already authenticated, redirect them to '/user/logged'.
    res.redirect('/user/logged');
  }
});

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/user/no-permission' }), (req, res) => {
    // After successful authentication, redirect the user to '/user/logged'.
    res.redirect('/user/logged');
});

app.use('/', (req, res) => {
  res.status(404).render('notFound');
});

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});
