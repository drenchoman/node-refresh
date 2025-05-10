const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { body, validationResult } = require('express-validator');

const secretCode = '1929';

exports.getLogin = async function (req, res) {
  if (req.session.flash) {
    let error = req.session.flash.error;
    res.render('login', { title: 'Login', error: error });
  } else {
    res.render('login', { title: 'Login' });
  }
};

exports.postLogin = [
  body('alias')
    .trim()
    .notEmpty()
    .withMessage('Alias cannot be empty'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password cannot be empty'),

  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('login', {
        title: 'Login',
        errors: errors.errors,
      });
    } else {
      passport.authenticate('local', {
        successRedirect: '/member',
        failureRedirect: '/login',
        failureFlash: true,
      })(req, res, next);
    }
  },
];

// exports.postLogin = passport.authenticate('local', {
//   successRedirect: '/member',
//   failureRedirect: '/login',
//   failureFlash: true,
// });

exports.getMember = async function (req, res) {
  if (req.user) {
    const avatarName = await db.getAvatarName(req.user.avatar_id);
    const messages = await db.getAllMessages();
    res.render('member', {
      user: req.user,
      messages: messages,
      avatarName: avatarName[0],
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
