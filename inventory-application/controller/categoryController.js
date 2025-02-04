const db = require('../db/queries');
const { body, validationResult } = require('express-validator');

const alphaErr = 'must only contain letters';
const lengthErr = 'must be between 1 and 20 characters';

const validateCategory = [
  body('name')
    .trim()
    .isAlpha()
    .withMessage(`Category name ${alphaErr}`)
    .isLength({ min: 1, max: 20 })
    .withMessage(`Category name ${lengthErr}`),
];

async function getCategories(req, res) {
  const categories = await db.getAllCategories();
  res.render('./category/categories', {
    title: 'Browse our Categories',
    categories,
  });
}

async function getCategoryEmojis(req, res) {
  const category = await db.getCategoryEmojis(req.params.id);
  const name = category[0].name;

  res.render('./category/category', {
    title: name,
    category,
  });
}

async function getNewCategory(req, res) {
  res.render('./category/createCategory', {
    title: 'Add a New Category',
  });
}

const postNewCategory = [
  validateCategory,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('./category/createCategory', {
        title: 'Add a New Category',
        errors: errors.array(),
      });
    }
    const { name } = req.body;
    const category = await db.createNewCategory(name);
    res.redirect('/categories');
  },
];

module.exports = {
  getCategories,
  getNewCategory,
  postNewCategory,
  getCategoryEmojis,
};
