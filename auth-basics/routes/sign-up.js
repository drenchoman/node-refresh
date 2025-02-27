const { getSignUp } = require('../controller/signUpController');
const { Router } = require('express');

const signUpRouter = Router();

signUpRouter.get('/', getSignUp);

module.exports = signUpRouter;
