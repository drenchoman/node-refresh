async function getSignUp(req, res) {
  res.render('sign-up-form', { title: 'test' });
}

module.exports = { getSignUp };
