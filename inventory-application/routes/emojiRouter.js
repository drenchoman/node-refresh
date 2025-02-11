const { Router } = require('express');
const {
  getEmojis,
  getNewEmoji,
  postNewEmoji,
  getEmoji,
  deleteEmojiPost,
} = require('../controller/emojiController');

const emojiRouter = Router();

emojiRouter.get('/', getEmojis);
emojiRouter.get('/emojis/new', getNewEmoji);
emojiRouter.post('/emojis/new', postNewEmoji);
emojiRouter.get('/emojis/:id', getEmoji);
emojiRouter.post('/emojis/:id/delete', deleteEmojiPost);

module.exports = emojiRouter;
