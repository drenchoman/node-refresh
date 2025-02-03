const { Router } = require('express');
const {
  getOwners,
  getNewOwner,
  postNewOwner,
  getOwner,
} = require('../controller/ownerController');

const ownerRouter = Router();

ownerRouter.get('/', getOwners);
ownerRouter.get('/new', getNewOwner);
ownerRouter.post('/new', postNewOwner);
ownerRouter.get('/:id', getOwner);

module.exports = ownerRouter;
