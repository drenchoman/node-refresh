const { Router } = require('express');
const {
  getEmojis,
  getNewEmoji,
  postNewEmoji,
  getEmoji,
} = require('../controller/emojiController');

const emojiRouter = Router();

emojiRouter.get('/', getEmojis);
emojiRouter.get('/emojis/new', getNewEmoji);
emojiRouter.post('/emojis/new', postNewEmoji);
emojiRouter.get('/emojis/:id', getEmoji);

module.exports = emojiRouter;
