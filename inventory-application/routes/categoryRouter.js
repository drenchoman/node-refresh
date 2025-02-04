const { Router } = require('express');
const {
  getCategories,
  getCategoryEmojis,
  getNewCategory,
  postNewCategory,
} = require('../controller/categoryController');

const categoryRouter = Router();

categoryRouter.get('/', getCategories);
categoryRouter.get('/new', getNewCategory);
categoryRouter.post('/new', postNewCategory);
categoryRouter.get('/:id', getCategoryEmojis);

module.exports = categoryRouter;
