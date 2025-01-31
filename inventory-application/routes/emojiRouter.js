const { Router } = require('express');
const { getEmojis } = require('../controller/emojiController');

const emojiRouter = Router();

emojiRouter.get('/', getEmojis);

module.exports = emojiRouter;
