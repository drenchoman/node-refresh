const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { body, validationResult } = require('express-validator');

const secretCode = '1234';

exports.getLogin = async function (req, res) {
  res.render('login', { title: 'Login' });
};

exports.postLogin = passport.authenticate('local', {
  successRedirect: '/member',
  failureRedirect: '/login',
  failureFlash: true,
});

exports.getMember = async function (req, res) {
  if (req.user) {
    const messages = await db.getAllMessages();
    res.render('member', {
      user: req.user,
      messages: messages,
    });
  } else {
    res.render('member', {
      user: req.user,
    });
  }
};

exports.postMember = [
  body('secretPasscode')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Secret Passcode cannot be empty')
    .isLength({ min: 4, max: 4 })
    .withMessage('The Secret Passcode is 4 digits long')
    .custom(async (value) => {
      if (value !== secretCode) {
        throw new Error('Incorrect Secret Passcode');
      }
      return true;
    }),
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('member', {
        title: 'One Last Step',
        user: req.user,
        errors: errors.errors,
      });
    }
    try {
      const user = await db.confirmMembership(req.user.id);
      res.redirect('/member');
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
];
