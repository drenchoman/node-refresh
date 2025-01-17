const { Router } = require('express');
const { getAuthorById } = require('../controllers/authorControllers');

const authorRouter = Router();

authorRouter.get('/', (req, res) => res.send('All Authors'));
authorRouter.get('/:authorId', getAuthorById);

module.exports = authorRouter;
