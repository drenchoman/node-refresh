const { Router } = require('express');
const {
  getOwners,
  getNewOwner,
  postNewOwner,
  getOwner,
  deleteOwner,
} = require('../controller/ownerController');

const ownerRouter = Router();

ownerRouter.get('/', getOwners);
ownerRouter.get('/new', getNewOwner);
ownerRouter.post('/new', postNewOwner);
ownerRouter.get('/:id', getOwner);
ownerRouter.post('/:id/delete', deleteOwner);

module.exports = ownerRouter;
