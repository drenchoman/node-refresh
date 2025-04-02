const db = require('../db/queries');
const passport = require('passport');

async function getLogin(req, res) {
  res.render('login-form', { title: 'Login' });
}

async function postLogin(req, res, next) {
  await passport.authenticate('local', {
    successRedirect: '/member',
    failureRedirect: '/login',
    failureFlash: true,
  }),
    (req, res, next);
}

module.exports = { getLogin };
