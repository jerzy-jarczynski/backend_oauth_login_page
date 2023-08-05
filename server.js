const express = require('express');
const cors = require('cors');
const path = require('path');
const hbs = require('express-handlebars');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const app = express();

// configure passport provider options
passport.use(new GoogleStrategy({
  clientID: '74507653593-hh05qjnkjvcr5t3egth8sri1j0tg8s19.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:8000/auth/callback'
}, (accessToken, refreshToken, profile, done) => {
done(null, profile);
}));

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

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

app.use('/', (req, res) => {
  res.status(404).render('notFound');
});

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});
