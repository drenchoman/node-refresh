const pool = require('./pool');

async function getAllUsernames() {
  const { rows } = await pool.query('SELECT * FROM usernames');
  return rows;
}

async function insertUsername(username) {
  await pool.query('INSERT INTO usernames (username) VALUES ($1)', [
    username,
  ]);
}

async function getUsernameSearch(username) {
  const query = {
    text: 'SELECT * FROM usernames WHERE username = $1',
    values: [username],
  };
  let { rows } = await pool.query(query);
  return rows;
}

module.exports = {
  getAllUsernames,
  insertUsername,
  getUsernameSearch,
};
