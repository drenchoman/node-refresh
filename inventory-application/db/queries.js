const pool = require('./pool');

async function getAllEmojis() {
  const { rows } = await pool.query('SELECT * FROM emojis');
  return rows;
}

module.exports = {
  getAllEmojis,
};
