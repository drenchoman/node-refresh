const db = require('../db/queries');
const passport = require('passport');

async function getLogin(req, res) {
  res.render('login-form', { title: 'Login' });
}

async function postLogin(req, res) {
  console.log('test');
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/test',
  });
}

module.exports = { getLogin, postLogin };
