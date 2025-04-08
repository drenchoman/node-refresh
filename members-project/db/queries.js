const pool = require('./pool');

async function createNewAlias(alias, password) {
  const query = {
    text: 'INSERT INTO users(alias, password) VALUES ($1, $2)',
    values: [alias, password],
  };
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    console.log('error', err);
  }
}

module.exports = { createNewAlias };
