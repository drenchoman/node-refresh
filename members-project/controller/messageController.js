const db = require('../db/queries');
const { body, validationResult } = require('express-validator');

exports.postMessage = [
  body('title')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Title must be at least 2 characters long.'),
  body('message')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Message must be at least 1 character long.'),
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('error', errors);
      const messages = await db.getAllMessages();
      return res.render('member', {
        messages: messages,
        user: req.user,
        errors: errors.errors,
      });
    }
    try {
      const message = await db.createNewMessage(req.body, req.user);
      res.redirect('/member');
    } catch (err) {
      console.error(err);
    }
  },
];

exports.deleteMessage = async function (req, res) {
  try {
    const message = await db.deleteMessage(req.body.messageId);
    res.redirect('/member');
  } catch (err) {
    console.error(err);
  }
};

exports.getAllMessages = async function (req, res) {
  if (req.user) {
    res.redirect('/member');
  } else {
    try {
      const messages = await db.getAllMessages();
      res.render('home', {
        messages: messages,
      });
    } catch (err) {
      console.error(err);
    }
  }
};
