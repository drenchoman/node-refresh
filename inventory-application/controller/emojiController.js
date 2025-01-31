const db = require('../db/queries');

async function getEmojis(req, res) {
  const emojis = await db.getAllEmojis();
  console.log(emojis);
  res.render('index', { emojis, title: 'Hello world' });
}

module.exports = {
  getEmojis,
};
