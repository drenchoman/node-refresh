const db = require('../db/queries');

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

async function postNewCategory(req, res) {
  const category = await db.createNewCategory(req.body);
  res.redirect('/categories');
}

module.exports = {
  getCategories,
  getNewCategory,
  postNewCategory,
  getCategoryEmojis,
};
