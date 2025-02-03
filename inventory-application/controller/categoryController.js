const db = require('../db/queries');

async function getCategories(req, res) {
  const categories = await db.getAllCategories();
  res.render('./category/categories', {
    title: 'Browse our Categories',
    categories,
  });
}

async function getNewCategory(req, res) {
  res.render('./category/createCategory', {
    title: 'Add a New Category',
  });
}

async function postNewCategory(req, res) {
  const category = await db.createNewCategory(req.body);
  console.log(category);
  res.redirect('/categories');
}

module.exports = {
  getCategories,
  getNewCategory,
  postNewCategory,
};
