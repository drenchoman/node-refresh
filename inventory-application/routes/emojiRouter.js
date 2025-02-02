const { Router } = require('express');
const {
  getEmojis,
  getNewEmoji,
  postNewEmoji,
} = require('../controller/emojiController');

const emojiRouter = Router();

emojiRouter.get('/', getEmojis);
emojiRouter.get('/new', getNewEmoji);
emojiRouter.post('/new', postNewEmoji);

module.exports = emojiRouter;
