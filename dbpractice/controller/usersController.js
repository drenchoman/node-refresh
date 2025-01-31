const db = require('../db/queries');

async function getUsernames(req, res) {
  const user = await db.getUsernameSearch(req.query.searchName);

  if (user.length == 0) {
    const usernames = await db.getAllUsernames();
    // console.log('Usernames: ', usernames);
    res.render('index', { usernames, title: 'Cool people below' });
  } else {
    res.render('profile', {
      username: user[0].username,
      title: 'Meet',
    });
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

async function deleteUsernamePost(req, res) {
  const id = req.params.id;

  await db.userDelete(id);
  res.redirect('/');
}

module.exports = {
  getUsernames,
  createUsernameGet,
  createUsernamePost,
  deleteUsernamePost,
};
