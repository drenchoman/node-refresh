const { Router } = require('express');
const path = require('node:path');

const usersRouter = Router();

usersRouter.get('/', (req, res) => {
  console.log('Usernames will be logged here - wip');
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

usersRouter.get('/new', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'user.html'));
});

usersRouter.post('/new', (req, res) => {
  console.log('username to be save', req.body.username);
});

module.exports = usersRouter;
