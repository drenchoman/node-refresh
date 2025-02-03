const pool = require('./pool');

// -- EMOJIS -- \\
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

// -- Owners -- \\
async function getAllOwners() {
  const { rows } = await pool.query('SELECT * FROM owner');
  return rows;
}

async function createNewOwner(owner) {
  const query = {
    text: 'INSERT INTO owner(name) VALUES($1)',
    values: [owner.name],
  };
  const { rows } = await pool.query(query);
  return rows;
}

async function getOwnerEmojis(id) {
  const query = {
    text: 'SELECT emojis.id AS emoji_id, emojis.name AS emoji_name, emojis.owner_id, owner.name AS owner_name, emojis.emoji_icon FROM emojis JOIN owner ON emojis.owner_id = owner.id WHERE owner_id = $1',
    values: [id],
  };
  const { rows } = await pool.query(query);
  if (rows.length == 0) {
    return false;
  } else {
    return rows;
  }
}

// -- Categories -- \\
async function getAllCategories() {
  const { rows } = await pool.query('SELECT * FROM category');
  return rows;
}

async function createNewCategory(category) {
  const query = {
    text: 'INSERT INTO category(name) VALUES($1)',
    values: [category.name],
  };
  const { rows } = await pool.query(query);
  return rows;
}

module.exports = {
  getAllEmojis,
  createNewEmoji,
  getAllOwners,
  getAllCategories,
  getOwnerEmojis,
  createNewOwner,
  createNewCategory,
};
