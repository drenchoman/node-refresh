const usersStorage = require('../storages/usersStorages');
const { body, validationResult } = require('express-validator');

const alphaErr = 'must only contain letters';
const lengthErr = 'must be between 1 and 10 characters';

const validateUser = [
  body('firstName')
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body('lastName')
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Must be a valid email')
    .escape(),
  body('age')
    .trim()
    .isNumeric()
    .withMessage('Age must be a number')
    .isFloat({ min: 0, max: 110 })
    .withMessage('Age must be between 0 and 110')
    .escape(),
  body('bio')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Bio must be between 1 and 200 characters'),
];

exports.usersListGet = (req, res) => {
  res.render('index', {
    title: 'User List',
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render('createUser', {
    title: 'Create user',
  });
};

exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('createUser', {
        title: 'Create user',
        errors: errors.array(),
      });
    }

    const { firstName, lastName, email, age, bio } = req.body;

    usersStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect('/');
  },
];

exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render('updateUser', {
    title: 'Update user',
    user: user,
  });
};

exports.usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('updateUser', {
        title: 'Update user',
        user: user,
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = req.body;
    usersStorage.updateUser(req.params.id, {
      firstName,
      lastName,
      email,
      age,
      bio,
    });
    res.redirect('/');
  },
];

exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect('/');
};
