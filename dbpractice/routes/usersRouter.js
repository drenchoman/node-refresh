const { Router } = require('express');
const {
  getUsernames,
  createUsernameGet,
  createUsernamePost,
  deleteUsernamePost,
} = require('../controller/usersController');
const usersRouter = Router();

usersRouter.get('/', getUsernames);

usersRouter.get('/new', createUsernameGet);

usersRouter.post('/new', createUsernamePost);
usersRouter.post('/:id/delete', deleteUsernamePost);

module.exports = usersRouter;
