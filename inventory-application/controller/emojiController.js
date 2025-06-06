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
  body('emoji_icon')
    .trim()
    .isLength({ min: 1, max: 15 })
    .withMessage(`Emoji icon ${nameLengthErr}`),
  body('category')
    .trim()
    .escape()
    .isNumeric()
    .withMessage('Category must be a number'),
  body('owner')
    .trim()
    .escape()
    .isNumeric()
    .withMessage('Owner must be a number'),
];

async function getEmojis(req, res) {
  const emojis = await db.getAllEmojis();
  res.render('index', { emojis, title: 'View our emojis' });
}

async function getEmoji(req, res) {
  const emoji = await db.getEmoji(req.params.id);

  let name = emoji[0].emoji_name;

  res.render('./emoji/emoji', {
    title: name,
    emoji,
    path: `/emojis/${req.params.id}/delete`,
  });
}

async function deleteEmojiPost(req, res) {
  const emoji = await db.deleteEmoji(Number(req.params.id));
  console.log('deleted emoji');

  res.redirect('/');
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

const postNewEmoji = [
  validateEmoji,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const categories = await db.getAllCategories();
      let owners = await db.getAllOwners();
      let filteredOwners = owners.filter((o) => o.name != null);
      console.log(req.body);
      return res.status(400).render('./emoji/createEmoji', {
        title: 'Add a New Emoji!',
        filteredOwners,
        categories,
        errors: errors.array(),
      });
    }
    const emoji = await db.createNewEmoji(req.body);
    res.redirect('/');
  },
];

module.exports = {
  getEmojis,
  getNewEmoji,
  postNewEmoji,
  deleteEmojiPost,
  getEmoji,
};
