const db = require('../db/queries');
const bcrypt = require('bcryptjs');

async function getRegister(req, res) {
  res.render('register', { title: 'Register' });
}

async function postRegister(req, res, next) {
  const user = req.body;
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newAlias = await db.createNewAlias(user, hashedPassword);
    res.redirect('/member');
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = { getRegister, postRegister };
