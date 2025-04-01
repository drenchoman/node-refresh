const db = require('../db/queries');
const passport = require('passport');

async function getLogin(req, res) {
  res.render('login-form', { title: 'Login' });
}

async function postLogin(req, res, next) {
  passport.authenticate('local', (err, username, info) => {
    console.log(username);
    console.log(err);
    console.log(info);
  });
  res.redirect('/');
}

module.exports = { getLogin, postLogin };
