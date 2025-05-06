const pool = require('./pool');

async function createNewAlias(alias, hashedPassword) {
  console.log(alias, 'alias');
  const query = {
    text: 'INSERT INTO users(alias, password, status, avatar_id) VALUES ($1, $2, $3, $4)',
    values: [
      alias.alias,
      hashedPassword,
      'Pleb',
      Number(alias.avatar),
    ],
  };
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    console.log('error', err);
  }
}

async function checkAliasExists(alias) {
  const query = {
    text: 'SELECT EXISTS (SELECT 1 FROM users WHERE alias = $1) AS x',
    values: [alias],
  };
  try {
    const { rows } = await pool.query(query);
    return rows[0].x; // returns true or false
  } catch (err) {
    console.log('error', err);
    throw err;
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

async function getAllMessages() {
  const query = {
    text: "SELECT messages.id AS message_id, messages.title, messages.message, TO_CHAR(messages.created_at,'FMMonth DD, YYYY') AS readable_date, users.id AS user_id, users.alias, avatar.name as avatar_name FROM messages JOIN users ON messages.user_id = users.id LEFT JOIN avatar on users.avatar_id = avatar.id ORDER BY messages.created_at DESC",
  };
  try {
    const { rows } = await pool.query(query);
    // console.log('all messages', rows);
    return rows;
  } catch (err) {
    console.error(err);
  }
}

// async function getAvatarName(){
//   const query = {
//     text: "SELECT avatar_name as avatar.name FROM USERS LEFT JOIN avatar on users.avatar_id WHERE"
//   }
// }

async function createNewMessage(message, user) {
  const query = {
    text: 'INSERT INTO messages (user_id, title, message) VALUES ($1, $2, $3)',
    values: [user.id, message.title, message.message],
  };
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    console.error('error', err);
  }
}

async function deleteMessage(id) {
  const query = {
    text: 'DELETE FROM messages WHERE id = $1',
    values: [id],
  };
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    console.error('error', err);
  }
}

module.exports = {
  createNewAlias,
  checkAliasExists,
  confirmMembership,
  getAllMessages,
  createNewMessage,
  deleteMessage,
};
