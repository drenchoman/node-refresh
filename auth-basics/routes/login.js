const { getLogin } = require('../controller/loginController');
const passport = require('passport');

const { Router } = require('express');

const loginRouter = Router();

loginRouter.get('/', getLogin);
loginRouter.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/member',
    failureRedirect: '/login',
  })
);

module.exports = loginRouter;
