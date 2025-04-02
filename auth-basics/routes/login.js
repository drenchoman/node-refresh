const {
  getLogin,
  postLogin,
} = require('../controller/loginController');
const passport = require('passport');

const { Router } = require('express');

const loginRouter = Router();

loginRouter.get('/', getLogin);
loginRouter.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

module.exports = loginRouter;
