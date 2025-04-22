const pool = require('./pool');

async function createNewAlias(alias, hashedPassword) {
  const query = {
    text: 'INSERT INTO users(alias, password, status, profile_pic) VALUES ($1, $2, $3, $4)',
    values: [alias.alias, hashedPassword, 'Pleb', 1],
  };
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    console.log('error', err);
  }
}

async function confirmMembership(id) {
  const query = {
    text: 'UPDATE users SET status = $1 WHERE id = $2',
    values: ['Member', id],
  };
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    console.log('error', err);
  }
}

module.exports = { createNewAlias, confirmMembership };
