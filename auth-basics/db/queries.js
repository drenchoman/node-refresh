const pool = require('./pool');

async function createNewUser(user, hashedPassword) {
  const query = {
    text: 'INSERT INTO users (username, password) VALUES ($1, $2)',
    values: [user.username, hashedPassword],
  };
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    console.log('error', err);
  }
}

module.exports = {
  createNewUser,
};
