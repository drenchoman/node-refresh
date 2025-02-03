const db = require('../db/queries');

async function getEmojis(req, res) {
  const emojis = await db.getAllEmojis();
  res.render('index', { emojis, title: 'Hello world' });
}

async function getEmoji(req, res) {
  const emoji = await db.getEmoji(req.params.id);

  let name = emoji[0].emoji_name;

  res.render('./emoji/emoji', { title: name, emoji });
}

async function getNewEmoji(req, res) {
  const categories = await db.getAllCategories();
  let owners = await db.getAllOwners();
  let filteredOwners = owners.filter((o) => o.name != null);

  res.render('./emoji/createEmoji', {
    title: 'Add a New Emoji!',
    filteredOwners,
    categories,
  });
}

async function postNewEmoji(req, res) {
  const emoji = await db.createNewEmoji(req.body);
  res.redirect('/');
}

module.exports = {
  getEmojis,
  getNewEmoji,
  postNewEmoji,
  getEmoji,
};
