const {
  getSignUp,
  postSignUp,
} = require('../controller/signUpController');
const { Router } = require('express');

const signUpRouter = Router();

signUpRouter.get('/', getSignUp);
signUpRouter.post('/', postSignUp);

module.exports = signUpRouter;
