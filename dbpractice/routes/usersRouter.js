const { Router } = require('express');
const {
  getUsernames,
  createUsernameGet,
  createUsernamePost,
} = require('../controller/usersController');
const usersRouter = Router();

usersRouter.get('/', getUsernames);

usersRouter.get('/new', createUsernameGet);

usersRouter.post('/new', createUsernamePost);

module.exports = usersRouter;
