const db = require('../db/queries');

async function getSignUp(req, res) {
  res.render('sign-up-form', { title: 'Sign Up' });
}

async function postSignUp(req, res) {
  const user = req.body;
  const newUser = await db.createNewUser(user);
  console.log(newUser);

  res.redirect('/');
}

module.exports = { getSignUp, postSignUp };
