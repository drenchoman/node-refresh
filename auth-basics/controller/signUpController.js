const db = require('../db/queries');
const bcrypt = require('bcryptjs');
async function getSignUp(req, res) {
  res.render('sign-up-form', { title: 'Sign Up' });
}

async function postSignUp(req, res, next) {
  const user = req.body;
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await db.createNewUser(user, hashedPassword);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = { getSignUp, postSignUp };
