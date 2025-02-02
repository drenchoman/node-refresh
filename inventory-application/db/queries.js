const pool = require('./pool');

async function getAllEmojis() {
  const { rows } = await pool.query('SELECT * FROM emojis');
  return rows;
}

async function createNewEmoji(emoji) {
  const query = {
    text: 'INSERT INTO emojis(name, description, info_url, category_id, owner_id, emoji_icon) VALUES($1, $2, $3, $4, $5, $6)',
    values: [
      emoji.name,
      emoji.description,
      emoji.info_url,
      Number(emoji.category),
      Number(emoji.owner),
      emoji.emoji_icon,
    ],
  };
  const { rows } = await pool.query(query);
  return rows;
}

module.exports = {
  getAllEmojis,
  createNewEmoji,
};
