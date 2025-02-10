const { Router } = require('express');
const {
  getCategories,
  getCategoryEmojis,
  getNewCategory,
  deleteCategoryPost,
  postNewCategory,
} = require('../controller/categoryController');

const categoryRouter = Router();

categoryRouter.get('/', getCategories);
categoryRouter.get('/new', getNewCategory);
categoryRouter.post('/new', postNewCategory);
categoryRouter.get('/:id', getCategoryEmojis);
categoryRouter.post('/:id/delete', deleteCategoryPost);

module.exports = categoryRouter;
