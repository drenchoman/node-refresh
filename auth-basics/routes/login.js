const {
  getLogin,
  postLogin,
} = require('../controller/loginController');

const { Router } = require('express');

const loginRouter = Router();

loginRouter.get('/', getLogin);
loginRouter.post('/', postLogin);

module.exports = loginRouter;
