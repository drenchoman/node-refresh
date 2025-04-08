const db = require('../db/queries');
const bcrypt = require('bcryptjs');

async function getRegister(req, res) {
  res.render('register', { title: 'Register' });
}

async function postRegister(req, res, next) {
  const alias = req.body.alias;
  const password = req.body.password;
  const newAlias = await db.createNewAlias(alias, password);
  res.redirect('/');
}

module.exports = { getRegister, postRegister };
