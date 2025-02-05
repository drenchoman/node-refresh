const db = require('../db/queries');
const expressAsyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const alphaErr = 'must only contains letters';
const emptyErr = 'must not be empty';
const nameLengthErr = 'must be between 1 and 15 characters';
const descLengthErr = 'must be beween 1 and 300 characters';

const validateEmoji = [
  body('name')
    .trim()
    .isAlpha()
    .withMessage(`Emoji name ${alphaErr}`)
    .isLength({ min: 1, max: 15 })
    .withMessage(`Emoji name ${nameLengthErr}`)
    .notEmpty()
    .withMessage(`Emoji name ${emptyErr}`),
  body('description')
    .trim()
    .escape()
    .isLength({ min: 1, max: 300 })
    .withMessage(`Description ${descLengthErr}`),
  body('info_url')
    .trim()
    .isURL({ protocols: ['https', 'http'] })
    .withMessage('Url must be http or https'),
];

async function getEmojis(req, res) {
  const emojis = await db.getAllEmojis();
  res.render('index', { emojis, title: 'Hello world' });
}

async function getEmoji(req, res) {
  const emoji = await db.getEmoji(req.params.id);

  let name = emoji[0].emoji_name;

  res.render('./emoji/emoji', { title: name, emoji });
}

async function getNewEmoji(req, res) {
  const categories = await db.getAllCategories();
  let owners = await db.getAllOwners();
  let filteredOwners = owners.filter((o) => o.name != null);

  res.render('./emoji/createEmoji', {
    title: 'Add a New Emoji!',
    filteredOwners,
    categories,
  });
}

async function postNewEmoji(req, res) {
  const emoji = await db.createNewEmoji(req.body);
  res.redirect('/');
}

module.exports = {
  getEmojis,
  getNewEmoji,
  postNewEmoji,
  getEmoji,
};
