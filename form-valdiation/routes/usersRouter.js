const { Router } = require('express');
const usersController = require('../controllers/usersController.js');
const usersRouter = Router();

usersRouter.get('/', usersController.usersListGet);
usersRouter.get('/create', usersController.usersCreateGet);
usersRouter.post('/create', usersController.usersCreatePost);

module.exports = usersRouter;
