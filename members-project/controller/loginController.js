const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const secretCode = '1234';

async function getLogin(req, res) {
  res.render('login', { title: 'Login' });
}

const postLogin = passport.authenticate('local', {
  successRedirect: '/member',
  failureRedirect: '/login',
  failureFlash: true,
});

async function postMember(req, res) {
  const { secretPasscode } = req.body;
  try {
    if (secretPasscode == secretCode) {
      const user = await db.confirmMembership(req.user.id);
      console.log(user);
      res.redirect('/member');
    } else {
      res.render('member', {
        title: 'poopoo',
        user: req.user,
        error: 'Incorrect Passcode',
      });
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = { getLogin, postLogin, postMember };
