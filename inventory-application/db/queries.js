const { deleteEmojiPost } = require('../controller/emojiController');
const pool = require('./pool');

// -- EMOJIS -- \\
async function getAllEmojis() {
  const { rows } = await pool.query('SELECT * FROM emojis');
  return rows;
}

async function getEmoji(id) {
  const query = {
    text: 'SELECT emojis.id AS emoji_id, emojis.name AS emoji_name, emojis.category_id, category.name AS category_name, emojis.emoji_icon, emojis.description, emojis.info_url FROM emojis JOIN category ON emojis.category_id = category.id  WHERE emojis.id = $1',
    values: [id],
  };
  const { rows } = await pool.query(query);
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

async function deleteEmoji(id) {
  const query = {
    text: 'DELETE FROM emojis WHERE id = $1',
    values: [id],
  };
  const { rows } = await pool.query(query);
  return rows;
}

// -- Owners -- \\
async function getAllOwners() {
  const { rows } = await pool.query('SELECT * FROM owner');
  return rows;
}

async function getOwner(id) {
  const query = {
    text: 'SELECT * FROM owner WHERE id = $1',
    values: [id],
  };
  const { rows } = await pool.query(query);
  return rows;
}

async function createNewOwner(owner) {
  const query = {
    text: 'INSERT INTO owner(name) VALUES($1)',
    values: [owner],
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

async function deleteOwner(id) {
  const query = {
    text: 'DELETE FROM owner WHERE id = $1',
    values: [id],
  };
  const { rows } = await pool.query(query);
  return rows;
}

// -- Categories -- \\
async function getAllCategories() {
  const { rows } = await pool.query('SELECT * FROM category');
  return rows;
}

async function deleteCategory(id) {
  const query = {
    text: 'DELETE FROM category WHERE id = $1',
    values: [id],
  };
  const { rows } = await pool.query(query);
  return rows;
}

async function getCategoryEmojis(id) {
  let query = {
    text: 'SELECT emojis.id AS emoji_id, emojis.name AS emoji_name, emojis.emoji_icon, category.name FROM emojis JOIN category ON emojis.category_id = category.id WHERE category_id = $1',
    values: [id],
  };

  const { rows } = await pool.query(query);

  if (rows.length > 0) {
    return rows;
  } else {
    const query = {
      text: 'SELECT * FROM category WHERE id = $1',
      values: [id],
    };
    const { rows } = await pool.query(query);
    return rows;
  }
}

async function createNewCategory(category) {
  const query = {
    text: 'INSERT INTO category(name) VALUES($1)',
    values: [category],
  };
  const { rows } = await pool.query(query);
  return rows;
}

module.exports = {
  getAllEmojis,
  getEmoji,
  createNewEmoji,
  getAllOwners,
  getAllCategories,
  getOwnerEmojis,
  getOwner,
  createNewOwner,
  createNewCategory,
  getCategoryEmojis,
  deleteOwner,
  deleteCategory,
  deleteEmoji,
};
