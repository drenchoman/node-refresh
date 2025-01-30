const db = require('../db/queries');

async function getUsernames(req, res) {
  if (req.query.searchName) {
    console.log('testing');
    const user = await db.getUsernameSearch(req.query.searchName);
    console.log('user', user);
  } else {
    const usernames = await db.getAllUsernames();
    // console.log('Usernames: ', usernames);
    res.render('index', { usernames, title: 'Cool people below' });
  }
}

async function createUsernameGet(req, res) {
  res.render('user', { title: 'Add a username' });
}

async function createUsernamePost(req, res) {
  const { username } = req.body;
  await db.insertUsername(username);
  res.redirect('/');
}

module.exports = {
  getUsernames,
  createUsernameGet,
  createUsernamePost,
};
