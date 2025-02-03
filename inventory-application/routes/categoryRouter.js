const { Router } = require('express');
const {
  getCategories,
  getCategoryEmojis,
  getNewCategory,
  postNewCategory,
} = require('../controller/categoryController');

const categoryRouter = Router();

categoryRouter.get('/', getCategories);
categoryRouter.get('/:id', getCategoryEmojis);
categoryRouter.get('/new', getNewCategory);
categoryRouter.post('/new', postNewCategory);

module.exports = categoryRouter;
