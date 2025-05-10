const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

exports.getRegister = function (req, res) {
  res.render('register', { title: 'Register' });
};

exports.postRegister = [
  body('alias')
    .trim()
    .escape()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long.'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long.'),
  body('confirmPassword')
    .trim()
    .isLength({ min: 5 })
    .withMessage(
      'Confirmation Password must be at least 5 characters long.'
    )
    .custom(async (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(
          'Password confirmation does not match password'
        );
      }
      return true;
    }),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('register', {
        title: 'Register',
        errors: errors.errors,
        alias: req.body.alias,
      });
    }
    try {
      const userExists = await db.checkAliasExists(req.body.alias);
      console.log('userexists', userExists);
      if (userExists == true) {
        console.log('user exists');
        return res.render('register', {
          title: 'Register',
          errors: [
            {
              msg: 'Alias already exists',
            },
          ],
        });
      }
      const user = req.body;
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newAlias = await db.createNewAlias(user, hashedPassword);
      res.redirect('/login');
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
];

// async function postRegister(req, res, next) {
//
//   try {
//     // const userExists = await db.
//     const hashedPassword = await bcrypt.hash(user.password, 10);
//     const newAlias = await db.createNewAlias(user, hashedPassword);
//     res.redirect('/login');
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// }
