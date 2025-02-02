const db = require('../db/queries');

async function getEmojis(req, res) {
  const emojis = await db.getAllEmojis();
  // console.log(emojis);
  res.render('index', { emojis, title: 'Hello world' });
}

async function getNewEmoji(req, res) {
  res.render('./emoji/createEmoji', { title: 'Add a New Emoji!' });
}

async function postNewEmoji(req, res) {
  const emoji = await db.createNewEmoji(req.body);
  res.redirect('/');
}

module.exports = {
  getEmojis,
  getNewEmoji,
  postNewEmoji,
};
