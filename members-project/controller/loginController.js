const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const passport = require('passport');

async function getLogin(req, res) {
  res.render('login', { title: 'Login' });
}

const postLogin = passport.authenticate('local', {
  successRedirect: '/member',
  failureRedirect: '/login',
  failureFlash: true,
});

module.exports = { getLogin, postLogin };

passport.authenticate;
